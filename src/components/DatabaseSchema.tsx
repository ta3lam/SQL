import { useState } from 'react';

const tables = [
  {
    name: 'employees',
    nameAr: 'الموظفين',
    columns: [
      { name: 'id', type: 'INTEGER', key: 'PK' },
      { name: 'name', type: 'TEXT', key: '' },
      { name: 'department', type: 'TEXT', key: '' },
      { name: 'dept_id', type: 'INTEGER', key: 'FK' },
      { name: 'salary', type: 'REAL', key: '' },
      { name: 'age', type: 'INTEGER', key: '' },
      { name: 'hire_date', type: 'TEXT', key: '' },
    ]
  },
  {
    name: 'departments',
    nameAr: 'الأقسام',
    columns: [
      { name: 'id', type: 'INTEGER', key: 'PK' },
      { name: 'dept_name', type: 'TEXT', key: '' },
      { name: 'location', type: 'TEXT', key: '' },
    ]
  },
  {
    name: 'projects',
    nameAr: 'المشاريع',
    columns: [
      { name: 'id', type: 'INTEGER', key: 'PK' },
      { name: 'project_name', type: 'TEXT', key: '' },
      { name: 'budget', type: 'REAL', key: '' },
      { name: 'start_date', type: 'TEXT', key: '' },
      { name: 'dept_id', type: 'INTEGER', key: 'FK' },
    ]
  }
];

export function DatabaseSchema() {
  const [expandedTable, setExpandedTable] = useState<string | null>('employees');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg">هيكل قاعدة البيانات</h3>
            <p className="text-cyan-100 text-sm">الجداول المتاحة للتدريب</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {tables.map((table) => (
          <div key={table.name} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedTable(expandedTable === table.name ? null : table.name)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800 dark:text-gray-200">{table.nameAr}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400" dir="ltr">{table.name}</p>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${expandedTable === table.name ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedTable === table.name && (
              <div className="p-3 bg-white dark:bg-gray-800">
                <table className="w-full text-sm" dir="ltr">
                  <thead>
                    <tr className="text-gray-500 dark:text-gray-400">
                      <th className="text-left py-1 px-2">Column</th>
                      <th className="text-left py-1 px-2">Type</th>
                      <th className="text-left py-1 px-2">Key</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.columns.map((col) => (
                      <tr key={col.name} className="border-t border-gray-100 dark:border-gray-700">
                        <td className="py-2 px-2 font-mono text-gray-700 dark:text-gray-300">{col.name}</td>
                        <td className="py-2 px-2 text-gray-500 dark:text-gray-400">{col.type}</td>
                        <td className="py-2 px-2">
                          {col.key && (
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              col.key === 'PK' 
                                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            }`}>
                              {col.key}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
