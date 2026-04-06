import { useState, useCallback, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { QueryResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SQLEditorProps {
  initialValue?: string;
  injectedQuery?: string;
  onExecute: (query: string) => QueryResult;
  onReset?: () => void;
  height?: string;
}

export function SQLEditor({ initialValue = '', injectedQuery, onExecute, onReset, height = '160px' }: SQLEditorProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(initialValue);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // When a sample query is injected from outside, update editor and auto-run it.
  // The injectedQuery includes a \0-delimited suffix to allow re-clicking the same query.
  const injectedRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!injectedQuery || injectedQuery === injectedRef.current) return;
    injectedRef.current = injectedQuery;
    const q = injectedQuery.split('\0')[0];
    setQuery(q);
    setIsExecuting(true);
    setTimeout(() => {
      const res = onExecute(q);
      setResult(res);
      setIsExecuting(false);
    }, 80);
  }, [injectedQuery, onExecute]);

  const handleExecute = useCallback(() => {
    if (!query.trim()) return;
    setIsExecuting(true);
    setTimeout(() => {
      const res = onExecute(query);
      setResult(res);
      setIsExecuting(false);
    }, 80);
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
    <div className="space-y-3">
      {/* Editor */}
      <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-800/80 px-4 py-2 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">{t.sqlEditor}</span>
          </div>
          <kbd className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded font-mono">
            {t.ctrlEnterToRun}
          </kbd>
        </div>
        <div onKeyDown={handleKeyDown}>
          <CodeMirror
            value={query}
            height={height}
            extensions={[sql()]}
            onChange={(value) => setQuery(value)}
            theme="light"
            className="text-sm"
            dir="ltr"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleExecute}
          disabled={isExecuting || !query.trim()}
          className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2.5 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm text-sm"
        >
          {isExecuting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {t.running}
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.runQuery}
            </>
          )}
        </button>

        {onReset && (
          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-1.5 text-sm"
            title={t.resetToOriginal}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {t.reset}
          </button>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="mt-1">
          <ResultTable result={result} />
        </div>
      )}
    </div>
  );
}

function ResultTable({ result }: { result: QueryResult }) {
  const { t } = useLanguage();

  if (result.error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-start gap-2 text-red-700 dark:text-red-400">
          <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <span className="font-medium text-sm">{t.sqlError}</span>
            <pre className="mt-1 text-xs font-mono whitespace-pre-wrap" dir="ltr">{result.error}</pre>
          </div>
        </div>
      </div>
    );
  }

  if (result.values.length === 0) {
    return (
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t.noRowsReturned}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t.rowsReturned(result.values.length)}
        </span>
        <span className="text-xs text-gray-400">{t.columnsCount(result.columns.length)}</span>
      </div>
      <div className="overflow-x-auto max-h-72 overflow-y-auto">
        <table className="w-full text-sm" dir="ltr">
          <thead className="bg-gray-50 dark:bg-gray-700/50 sticky top-0">
            <tr>
              {result.columns.map((col, i) => (
                <th key={i} className="px-3 py-2 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider whitespace-nowrap border-b border-gray-200 dark:border-gray-600">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {result.values.map((row, i) => (
              <tr key={i} className={`hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/50 dark:bg-gray-800/30'}`}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className="px-3 py-2 text-gray-700 dark:text-gray-300 whitespace-nowrap max-w-xs truncate font-mono text-xs cursor-help"
                    title={cell === null ? 'NULL' : String(cell)}
                  >
                    {cell === null ? (
                      <span className="text-gray-400 italic font-sans">NULL</span>
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
