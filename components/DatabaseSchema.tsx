import { useState } from 'react';

const tables = [
  {
    name: 'departments',
    description: '6 rows — company departments',
    color: 'blue',
    columns: [
      { name: 'id',         type: 'INTEGER', key: 'PK' },
      { name: 'name',       type: 'TEXT',    key: '' },
      { name: 'location',   type: 'TEXT',    key: '' },
      { name: 'budget',     type: 'REAL',    key: '' },
      { name: 'manager_id', type: 'INTEGER', key: 'FK→employees' },
    ],
  },
  {
    name: 'employees',
    description: '25 rows — staff with salaries & managers',
    color: 'indigo',
    columns: [
      { name: 'id',            type: 'INTEGER', key: 'PK' },
      { name: 'name',          type: 'TEXT',    key: '' },
      { name: 'email',         type: 'TEXT',    key: 'UNIQUE' },
      { name: 'department_id', type: 'INTEGER', key: 'FK→departments' },
      { name: 'manager_id',    type: 'INTEGER', key: 'FK→employees' },
      { name: 'job_title',     type: 'TEXT',    key: '' },
      { name: 'salary',        type: 'REAL',    key: '' },
      { name: 'hire_date',     type: 'TEXT',    key: '' },
      { name: 'is_active',     type: 'INTEGER', key: '' },
    ],
  },
  {
    name: 'customers',
    description: '20 rows — registered customers',
    color: 'emerald',
    columns: [
      { name: 'id',           type: 'INTEGER', key: 'PK' },
      { name: 'name',         type: 'TEXT',    key: '' },
      { name: 'email',        type: 'TEXT',    key: 'UNIQUE' },
      { name: 'city',         type: 'TEXT',    key: '' },
      { name: 'country',      type: 'TEXT',    key: '' },
      { name: 'phone',        type: 'TEXT',    key: '' },
      { name: 'joined_date',  type: 'TEXT',    key: '' },
      { name: 'loyalty_tier', type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'categories',
    description: '5 rows — product categories',
    color: 'amber',
    columns: [
      { name: 'id',          type: 'INTEGER', key: 'PK' },
      { name: 'name',        type: 'TEXT',    key: '' },
      { name: 'description', type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'products',
    description: '20 rows — items for sale',
    color: 'orange',
    columns: [
      { name: 'id',             type: 'INTEGER', key: 'PK' },
      { name: 'name',           type: 'TEXT',    key: '' },
      { name: 'category_id',    type: 'INTEGER', key: 'FK→categories' },
      { name: 'price',          type: 'REAL',    key: '' },
      { name: 'stock_quantity', type: 'INTEGER', key: '' },
      { name: 'supplier',       type: 'TEXT',    key: '' },
      { name: 'is_available',   type: 'INTEGER', key: '' },
    ],
  },
  {
    name: 'orders',
    description: '30 rows — customer purchase orders',
    color: 'pink',
    columns: [
      { name: 'id',           type: 'INTEGER', key: 'PK' },
      { name: 'customer_id',  type: 'INTEGER', key: 'FK→customers' },
      { name: 'order_date',   type: 'TEXT',    key: '' },
      { name: 'status',       type: 'TEXT',    key: '' },
      { name: 'total_amount', type: 'REAL',    key: '' },
      { name: 'notes',        type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'order_items',
    description: '54 rows — line items per order',
    color: 'purple',
    columns: [
      { name: 'id',         type: 'INTEGER', key: 'PK' },
      { name: 'order_id',   type: 'INTEGER', key: 'FK→orders' },
      { name: 'product_id', type: 'INTEGER', key: 'FK→products' },
      { name: 'quantity',   type: 'INTEGER', key: '' },
      { name: 'unit_price', type: 'REAL',    key: '' },
    ],
  },
];

const COLOR_MAP: Record<string, string> = {
  blue:   'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  emerald:'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  amber:  'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  pink:   'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
  purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
};

export function DatabaseSchema() {
  const [expandedTable, setExpandedTable] = useState<string | null>('employees');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Database Schema</h3>
            <p className="text-cyan-100 text-xs">7 tables — click to expand</p>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="p-3 space-y-1.5">
        {tables.map((table) => {
          const colorClass = COLOR_MAP[table.color] || COLOR_MAP.blue;
          const isExpanded = expandedTable === table.name;

          return (
            <div key={table.name} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedTable(isExpanded ? null : table.name)}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-700/40 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="font-mono text-sm font-semibold text-gray-800 dark:text-gray-200">{table.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{table.description}</p>
                  </div>
                </div>
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isExpanded && (
                <div className="bg-white dark:bg-gray-800/50 px-3 pb-2 pt-1" dir="ltr">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700">
                        <th className="text-left py-1.5 pr-3 font-medium">Column</th>
                        <th className="text-left py-1.5 pr-3 font-medium">Type</th>
                        <th className="text-left py-1.5 font-medium">Key</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.columns.map((col) => (
                        <tr key={col.name} className="border-t border-gray-50 dark:border-gray-700/50">
                          <td className="py-1.5 pr-3 font-mono text-gray-700 dark:text-gray-300 font-medium">
                            {col.name}
                          </td>
                          <td className="py-1.5 pr-3 text-gray-400 dark:text-gray-500">
                            {col.type}
                          </td>
                          <td className="py-1.5">
                            {col.key && (
                              <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                col.key === 'PK'
                                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                  : col.key === 'UNIQUE'
                                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
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
          );
        })}
      </div>
    </div>
  );
}
