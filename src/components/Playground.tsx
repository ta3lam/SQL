import { SQLEditor } from './SQLEditor';
import { DatabaseSchema } from './DatabaseSchema';
import { QueryResult } from '../types';

interface PlaygroundProps {
  onExecute: (query: string) => QueryResult;
  onReset: () => void;
}

export function Playground({ onExecute, onReset }: PlaygroundProps) {
  return (
    <div className="space-y-6" dir="rtl">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">ساحة التجريب</h1>
            <p className="text-violet-200">جرّب استعلامات SQL الخاصة بك هنا</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              محرر الاستعلامات
            </h2>
            <SQLEditor
              initialValue="SELECT * FROM employees;"
              onExecute={onExecute}
              onReset={onReset}
            />
          </div>

          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              استعلامات مفيدة للتجربة
            </h2>
            <div className="grid gap-3">
              {[
                { query: 'SELECT * FROM employees;', desc: 'عرض جميع الموظفين' },
                { query: 'SELECT * FROM departments;', desc: 'عرض جميع الأقسام' },
                { query: 'SELECT name, salary FROM employees WHERE salary > 6000;', desc: 'الموظفين براتب أعلى من 6000' },
                { query: 'SELECT department, COUNT(*) as count FROM employees GROUP BY department;', desc: 'عدد الموظفين في كل قسم' },
                { query: 'SELECT e.name, d.dept_name FROM employees e JOIN departments d ON e.dept_id = d.id;', desc: 'ربط الموظفين بالأقسام' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <code className="flex-1 text-sm text-gray-600 dark:text-gray-300 font-mono" dir="ltr">
                    {item.query}
                  </code>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <DatabaseSchema />
        </div>
      </div>
    </div>
  );
}
