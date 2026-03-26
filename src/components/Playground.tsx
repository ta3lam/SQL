import { SQLEditor } from './SQLEditor';
import { DatabaseSchema } from './DatabaseSchema';
import { QueryResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface PlaygroundProps {
  onExecute: (query: string) => QueryResult;
  onReset: () => void;
}

const SAMPLE_QUERIES = [
  {
    query: `SELECT e.name, e.job_title, e.salary, d.name AS department
FROM employees e
JOIN departments d ON e.department_id = d.id
ORDER BY e.salary DESC;`,
  },
  {
    query: `SELECT status,
       COUNT(*) AS orders,
       ROUND(SUM(total_amount), 2) AS total_revenue,
       ROUND(AVG(total_amount), 2) AS avg_order
FROM orders
GROUP BY status
ORDER BY total_revenue DESC;`,
  },
  {
    query: `SELECT p.name, COUNT(*) AS times_ordered,
       SUM(oi.quantity) AS units_sold
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.id, p.name
ORDER BY units_sold DESC
LIMIT 5;`,
  },
  {
    query: `SELECT c.name, c.loyalty_tier,
       COUNT(o.id) AS orders,
       ROUND(SUM(o.total_amount), 2) AS lifetime_value
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.loyalty_tier
ORDER BY lifetime_value DESC;`,
  },
  {
    query: `SELECT e.name, e.salary, e.department_id,
  ROUND((SELECT AVG(salary) FROM employees sub
         WHERE sub.department_id = e.department_id), 0) AS dept_avg
FROM employees e
WHERE e.salary > (
  SELECT AVG(salary) FROM employees sub
  WHERE sub.department_id = e.department_id
)
ORDER BY e.department_id, e.salary DESC;`,
  },
  {
    query: `SELECT e.name AS employee, e.job_title,
       COALESCE(m.name, 'Top Level') AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
ORDER BY manager, employee;`,
  },
];

export function Playground({ onExecute, onReset }: PlaygroundProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl p-5 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">{t.sqlPlayground}</h1>
            <p className="text-violet-200 text-sm">{t.playgroundSubtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Editor + sample queries */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t.queryEditor}
            </h2>
            <SQLEditor
              initialValue={t.playgroundInitialQuery}
              onExecute={onExecute}
              onReset={onReset}
              height="220px"
            />
          </div>

          {/* Sample queries */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.sampleQueries}
            </h2>
            <div className="grid gap-2">
              {SAMPLE_QUERIES.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onExecute(item.query)}
                  className="text-left w-full p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors group border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                        {t.sampleQueryLabels[idx] ?? item.query.split('\n')[0].trim()}
                      </p>
                      <code className="text-xs text-gray-400 dark:text-gray-500 font-mono line-clamp-1 mt-0.5" dir="ltr">
                        {item.query.split('\n')[0].trim()}...
                      </code>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schema */}
        <div className="lg:col-span-1">
          <DatabaseSchema />
        </div>
      </div>
    </div>
  );
}
