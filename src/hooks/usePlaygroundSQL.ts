import { useState, useEffect, useCallback, useRef } from 'react';
import initSqlJs, { Database } from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { QueryResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export function usePlaygroundSQL(customInitSQL: string) {
  const { t } = useLanguage();
  const [db, setDb] = useState<Database | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dbRef = useRef<Database | null>(null);

  // FIX BUG 2: tRef keeps translations current without making initDatabase depend on t.
  // Previously, t in deps → language switch re-ran initDatabase → DB wiped.
  const tRef = useRef(t);
  useEffect(() => { tRef.current = t; }, [t]);

  const initDatabase = useCallback(async () => {
    try {
      setLoading(true);
      const SQL = await initSqlJs({ locateFile: () => sqlWasmUrl });
      const newDb = new SQL.Database();

      // Run statements one-by-one to avoid sql.js WASM limits on large strings.
      // Split on ; followed by newline, strip comment lines, then run each.
      // Wrap INSERT statements in a single transaction for ~50x faster bulk load.
      const stmts = customInitSQL
        .split(/;\r?\n/)
        .map(s =>
          s.split('\n')
           .filter(line => !line.trim().startsWith('--'))
           .join('\n')
           .trim()
        )
        .filter(s => s.length > 0);

      newDb.run('BEGIN;');
      for (const stmt of stmts) {
        newDb.run(stmt + ';');
      }
      newDb.run('COMMIT;');

      dbRef.current = newDb;
      setDb(newDb);
      setError(null);
    } catch (err) {
      setError(tRef.current.dbInitError);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [customInitSQL]); // t removed: language changes no longer re-init the DB

  useEffect(() => {
    initDatabase();
    return () => { if (dbRef.current) dbRef.current.close(); };
  }, [initDatabase]);

  const executeQuery = useCallback((query: string): QueryResult => {
    if (!dbRef.current) {
      return { columns: [], values: [], error: tRef.current.dbNotAvailable };
    }

    try {
      const stmts = query.split(';').map(s => s.trim()).filter(Boolean);
      let lastResult: QueryResult = { columns: [], values: [] };

      for (const stmt of stmts) {
        const results = dbRef.current.exec(stmt);
        const upper = stmt.trim().toUpperCase();

        if (results.length === 0) {
          const changed = dbRef.current.getRowsModified();
          if (
            upper.startsWith('INSERT') ||
            upper.startsWith('UPDATE') ||
            upper.startsWith('DELETE') ||
            upper.startsWith('CREATE') ||
            upper.startsWith('DROP') ||
            upper.startsWith('ALTER') ||
            upper.startsWith('BEGIN') ||
            upper.startsWith('COMMIT') ||
            upper.startsWith('ROLLBACK') ||
            upper.startsWith('PRAGMA')
          ) {
            lastResult = {
              columns: ['Result'],
              values: [[tRef.current.querySuccess(changed)]],
            };
          } else {
            lastResult = { columns: [], values: [] };
          }
        } else {
          lastResult = {
            columns: results[0].columns,
            values: results[0].values,
          };
        }
      }

      return lastResult;
    } catch (err) {
      return {
        columns: [],
        values: [],
        error: err instanceof Error ? err.message : tRef.current.queryFailed,
      };
    }
  }, []); // tRef never changes reference, safe with empty deps

  const resetDatabase = useCallback(() => {
    if (dbRef.current) dbRef.current.close();
    initDatabase();
  }, [initDatabase]);

  return { db, loading, error, executeQuery, resetDatabase };
}
