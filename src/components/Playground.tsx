import { useState } from 'react';
import { SQLEditor } from './SQLEditor';
import { DatabaseSchema } from './DatabaseSchema';
import { DVDRentalSchema } from './DVDRentalSchema';
import { QueryResult } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { usePlaygroundSQL } from '../hooks/usePlaygroundSQL';
import { dvdRentalSQL } from '../data/dvdRental';

type ActiveDb = 'company' | 'dvd';

interface PlaygroundProps {
  onExecute: (query: string) => QueryResult;
  onReset: () => void;
}

const COMPANY_SAMPLE_QUERIES = [
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

const DVD_SAMPLE_QUERIES = [
  {
    query: `SELECT f.title, COUNT(r.rental_id) AS times_rented
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id, f.title
ORDER BY times_rented DESC
LIMIT 10;`,
  },
  {
    query: `SELECT c.name AS category, ROUND(SUM(p.amount), 2) AS revenue
FROM category c
JOIN film_category fc ON c.category_id = fc.category_id
JOIN film f ON fc.film_id = f.film_id
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY c.name
ORDER BY revenue DESC;`,
  },
  {
    query: `SELECT c.first_name || ' ' || c.last_name AS customer,
       COUNT(r.rental_id) AS rentals,
       ROUND(SUM(p.amount), 2) AS total_paid
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY c.customer_id
ORDER BY total_paid DESC
LIMIT 10;`,
  },
  {
    query: `SELECT f.title,
       GROUP_CONCAT(a.first_name || ' ' || a.last_name, ', ') AS cast
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
GROUP BY f.film_id, f.title
LIMIT 10;`,
  },
  {
    query: `SELECT c.name AS category,
       COUNT(DISTINCT f.film_id) AS films,
       ROUND(AVG(f.rental_rate), 2) AS avg_rate
FROM category c
JOIN film_category fc ON c.category_id = fc.category_id
JOIN film f ON fc.film_id = f.film_id
GROUP BY c.name
ORDER BY films DESC;`,
  },
  {
    query: `SELECT s.first_name || ' ' || s.last_name AS staff,
       COUNT(p.payment_id) AS transactions,
       ROUND(SUM(p.amount), 2) AS total_collected
FROM staff s
JOIN payment p ON s.staff_id = p.staff_id
GROUP BY s.staff_id;`,
  },
];

export function Playground({ onExecute, onReset }: PlaygroundProps) {
  const { t } = useLanguage();
  const [activeDb, setActiveDb] = useState<ActiveDb>('company');

  const dvd = usePlaygroundSQL(dvdRentalSQL);

  const currentExecute = activeDb === 'company' ? onExecute : dvd.executeQuery;
  const currentReset   = activeDb === 'company' ? onReset  : dvd.resetDatabase;

  const sampleQueries    = activeDb === 'company' ? COMPANY_SAMPLE_QUERIES  : DVD_SAMPLE_QUERIES;
  const sampleLabels     = activeDb === 'company' ? t.sampleQueryLabels     : t.dvdRentalSampleQueryLabels;
  const initialQuery     = activeDb === 'company' ? t.playgroundInitialQuery : t.dvdRentalInitialQuery;

  const isLoading = activeDb === 'dvd' && dvd.loading;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between gap-3 flex-wrap">
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

          {/* DB selector */}
          <div className="flex items-center gap-1 bg-white/10 rounded-xl p-1">
            <button
              onClick={() => setActiveDb('company')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeDb === 'company'
                  ? 'bg-white text-violet-700 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {t.companyDb}
            </button>
            <button
              onClick={() => setActiveDb('dvd')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeDb === 'dvd'
                  ? 'bg-white text-violet-700 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {t.dvdRentalDb}
            </button>
          </div>
        </div>
      </div>

      {/* Loading overlay for DVD DB init */}
      {isLoading && (
        <div className="flex items-center justify-center gap-3 py-6 text-gray-500 dark:text-gray-400">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="text-sm">{t.loadingDb}</span>
        </div>
      )}

      {!isLoading && (
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
                key={activeDb}
                initialValue={initialQuery}
                onExecute={currentExecute}
                onReset={currentReset}
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
                {sampleQueries.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => currentExecute(item.query)}
                    className="text-left w-full p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors group border border-transparent hover:border-indigo-200 dark:hover:border-indigo-700"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                          {sampleLabels[idx] ?? item.query.split('\n')[0].trim()}
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
            {activeDb === 'company' ? <DatabaseSchema /> : <DVDRentalSchema />}
          </div>
        </div>
      )}
    </div>
  );
}
