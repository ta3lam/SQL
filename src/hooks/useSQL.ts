import { useState, useEffect, useCallback, useRef } from 'react';
import initSqlJs, { Database } from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { initSQL } from '../data/database';
import { QueryResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export function useSQL() {
  const { t } = useLanguage();
  const [db, setDb] = useState<Database | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dbRef = useRef<Database | null>(null);

  const initDatabase = useCallback(async () => {
    try {
      setLoading(true);
      const SQL = await initSqlJs({ locateFile: () => sqlWasmUrl });
      const newDb = new SQL.Database();
      newDb.run(initSQL);
      dbRef.current = newDb;
      setDb(newDb);
      setError(null);
    } catch (err) {
      setError(t.dbInitError);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    initDatabase();
    return () => { if (dbRef.current) dbRef.current.close(); };
  }, [initDatabase]);

  const executeQuery = useCallback((query: string): QueryResult => {
    if (!dbRef.current) {
      return { columns: [], values: [], error: t.dbNotAvailable };
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
              values: [[t.querySuccess(changed)]],
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
        error: err instanceof Error ? err.message : t.queryFailed,
      };
    }
  }, [t]);

  const resetDatabase = useCallback(() => {
    if (dbRef.current) dbRef.current.close();
    initDatabase();
  }, [initDatabase]);

  return { db, loading, error, executeQuery, resetDatabase };
}
