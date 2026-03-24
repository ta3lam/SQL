import { useState, useEffect, useCallback, useRef } from 'react';
import initSqlJs, { Database } from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { initSQL } from '../data/database';
import { QueryResult } from '../types';

export function useSQL() {
  const [db, setDb] = useState<Database | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dbRef = useRef<Database | null>(null);

  const initDatabase = useCallback(async () => {
    try {
      setLoading(true);
      const SQL = await initSqlJs({
        // Use a bundled local WASM file to avoid external network/CSP failures.
        locateFile: () => sqlWasmUrl
      });
      
      const newDb = new SQL.Database();
      newDb.run(initSQL);
      dbRef.current = newDb;
      setDb(newDb);
      setError(null);
    } catch (err) {
      setError('فشل في تحميل قاعدة البيانات');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initDatabase();
    
    return () => {
      if (dbRef.current) {
        dbRef.current.close();
      }
    };
  }, [initDatabase]);

  const executeQuery = useCallback((query: string): QueryResult => {
    if (!dbRef.current) {
      return { columns: [], values: [], error: 'قاعدة البيانات غير متاحة' };
    }

    try {
      const results = dbRef.current.exec(query);
      
      if (results.length === 0) {
        // Check if it's a modification query
        const upperQuery = query.trim().toUpperCase();
        if (upperQuery.startsWith('INSERT') || 
            upperQuery.startsWith('UPDATE') || 
            upperQuery.startsWith('DELETE')) {
          const changes = dbRef.current.getRowsModified();
          return { 
            columns: ['تم التنفيذ'], 
            values: [[`تم تعديل ${changes} سجل(ات) بنجاح`]] 
          };
        }
        return { columns: [], values: [], error: 'لا توجد نتائج' };
      }

      return {
        columns: results[0].columns,
        values: results[0].values
      };
    } catch (err) {
      return {
        columns: [],
        values: [],
        error: err instanceof Error ? err.message : 'خطأ في تنفيذ الاستعلام'
      };
    }
  }, []);

  const resetDatabase = useCallback(() => {
    if (dbRef.current) {
      dbRef.current.close();
    }
    initDatabase();
  }, [initDatabase]);

  return { db, loading, error, executeQuery, resetDatabase };
}
