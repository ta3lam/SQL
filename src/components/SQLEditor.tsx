import { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { QueryResult } from '../types';

interface SQLEditorProps {
  initialValue?: string;
  onExecute: (query: string) => QueryResult;
  onReset?: () => void;
}

export function SQLEditor({ initialValue = '', onExecute, onReset }: SQLEditorProps) {
  const [query, setQuery] = useState(initialValue);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = useCallback(() => {
    if (!query.trim()) return;
    
    setIsExecuting(true);
    setTimeout(() => {
      const res = onExecute(query);
      setResult(res);
      setIsExecuting(false);
    }, 100);
  }, [query, onExecute]);

  const handleReset = useCallback(() => {
    setQuery(initialValue);
    setResult(null);
    if (onReset) onReset();
  }, [initialValue, onReset]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleExecute();
    }
  }, [handleExecute]);

  return (
    <div className="space-y-4">
      <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            محرر SQL
          </span>
          <span className="text-xs text-gray-500">
            Ctrl+Enter للتنفيذ
          </span>
        </div>
        <div onKeyDown={handleKeyDown}>
          <CodeMirror
            value={query}
            height="150px"
            extensions={[sql()]}
            onChange={(value) => setQuery(value)}
            theme="light"
            className="text-sm"
            dir="ltr"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleExecute}
          disabled={isExecuting || !query.trim()}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          {isExecuting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              جاري التنفيذ...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              تنفيذ الاستعلام
            </>
          )}
        </button>
        
        <button
          onClick={handleReset}
          className="px-6 py-3 rounded-lg font-medium border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          إعادة تعيين
        </button>
      </div>

      {result && (
        <div className="mt-4">
          <ResultTable result={result} />
        </div>
      )}
    </div>
  );
}

interface ResultTableProps {
  result: QueryResult;
}

function ResultTable({ result }: ResultTableProps) {
  if (result.error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">خطأ:</span>
          <span dir="ltr">{result.error}</span>
        </div>
      </div>
    );
  }

  if (result.values.length === 0) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>لا توجد نتائج للعرض</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
          النتائج ({result.values.length} سجل)
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full" dir="ltr">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {result.columns.map((col, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider border-b border-gray-200 dark:border-gray-600"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {result.values.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap"
                  >
                    {cell === null ? (
                      <span className="text-gray-400 italic">NULL</span>
                    ) : (
                      String(cell)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
