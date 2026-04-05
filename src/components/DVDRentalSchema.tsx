import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const tables = [
  {
    name: 'film',
    color: 'violet',
    columns: [
      { name: 'film_id',          type: 'INTEGER', key: 'PK' },
      { name: 'title',            type: 'TEXT',    key: '' },
      { name: 'description',      type: 'TEXT',    key: '' },
      { name: 'release_year',     type: 'INTEGER', key: '' },
      { name: 'language_id',      type: 'INTEGER', key: 'FK→language' },
      { name: 'rental_duration',  type: 'INTEGER', key: '' },
      { name: 'rental_rate',      type: 'REAL',    key: '' },
      { name: 'length',           type: 'INTEGER', key: '' },
      { name: 'replacement_cost', type: 'REAL',    key: '' },
      { name: 'rating',           type: 'TEXT',    key: '' },
      { name: 'last_update',      type: 'TEXT',    key: '' },
      { name: 'special_features', type: 'TEXT',    key: '' },
      { name: 'fulltext',         type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'actor',
    color: 'pink',
    columns: [
      { name: 'actor_id',   type: 'INTEGER', key: 'PK' },
      { name: 'first_name', type: 'TEXT',    key: '' },
      { name: 'last_name',  type: 'TEXT',    key: '' },
      { name: 'last_update',type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'film_actor',
    color: 'fuchsia',
    columns: [
      { name: 'actor_id',   type: 'INTEGER', key: 'FK→actor' },
      { name: 'film_id',    type: 'INTEGER', key: 'FK→film' },
      { name: 'last_update',type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'category',
    color: 'amber',
    columns: [
      { name: 'category_id', type: 'INTEGER', key: 'PK' },
      { name: 'name',        type: 'TEXT',    key: '' },
      { name: 'last_update', type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'film_category',
    color: 'orange',
    columns: [
      { name: 'film_id',     type: 'INTEGER', key: 'FK→film' },
      { name: 'category_id', type: 'INTEGER', key: 'FK→category' },
      { name: 'last_update', type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'language',
    color: 'teal',
    columns: [
      { name: 'language_id', type: 'INTEGER', key: 'PK' },
      { name: 'name',        type: 'TEXT',    key: '' },
      { name: 'last_update', type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'customer',
    color: 'emerald',
    columns: [
      { name: 'customer_id', type: 'INTEGER', key: 'PK' },
      { name: 'store_id',    type: 'INTEGER', key: 'FK→store' },
      { name: 'first_name',  type: 'TEXT',    key: '' },
      { name: 'last_name',   type: 'TEXT',    key: '' },
      { name: 'email',       type: 'TEXT',    key: '' },
      { name: 'address_id',  type: 'INTEGER', key: 'FK→address' },
      { name: 'activebool',  type: 'INTEGER', key: '' },
      { name: 'create_date', type: 'TEXT',    key: '' },
      { name: 'last_update', type: 'TEXT',    key: '' },
      { name: 'active',      type: 'INTEGER', key: '' },
    ],
  },
  {
    name: 'rental',
    color: 'blue',
    columns: [
      { name: 'rental_id',    type: 'INTEGER', key: 'PK' },
      { name: 'rental_date',  type: 'TEXT',    key: '' },
      { name: 'inventory_id', type: 'INTEGER', key: 'FK→inventory' },
      { name: 'customer_id',  type: 'INTEGER', key: 'FK→customer' },
      { name: 'return_date',  type: 'TEXT',    key: '' },
      { name: 'staff_id',     type: 'INTEGER', key: 'FK→staff' },
      { name: 'last_update',  type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'payment',
    color: 'indigo',
    columns: [
      { name: 'payment_id',   type: 'INTEGER', key: 'PK' },
      { name: 'customer_id',  type: 'INTEGER', key: 'FK→customer' },
      { name: 'staff_id',     type: 'INTEGER', key: 'FK→staff' },
      { name: 'rental_id',    type: 'INTEGER', key: 'FK→rental' },
      { name: 'amount',       type: 'REAL',    key: '' },
      { name: 'payment_date', type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'inventory',
    color: 'cyan',
    columns: [
      { name: 'inventory_id', type: 'INTEGER', key: 'PK' },
      { name: 'film_id',      type: 'INTEGER', key: 'FK→film' },
      { name: 'store_id',     type: 'INTEGER', key: 'FK→store' },
      { name: 'last_update',  type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'store',
    color: 'red',
    columns: [
      { name: 'store_id',         type: 'INTEGER', key: 'PK' },
      { name: 'manager_staff_id', type: 'INTEGER', key: 'FK→staff' },
      { name: 'address_id',       type: 'INTEGER', key: 'FK→address' },
      { name: 'last_update',      type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'staff',
    color: 'rose',
    columns: [
      { name: 'staff_id',    type: 'INTEGER', key: 'PK' },
      { name: 'first_name',  type: 'TEXT',    key: '' },
      { name: 'last_name',   type: 'TEXT',    key: '' },
      { name: 'address_id',  type: 'INTEGER', key: 'FK→address' },
      { name: 'email',       type: 'TEXT',    key: '' },
      { name: 'store_id',    type: 'INTEGER', key: 'FK→store' },
      { name: 'active',      type: 'INTEGER', key: '' },
      { name: 'username',    type: 'TEXT',    key: '' },
      { name: 'password',    type: 'TEXT',    key: '' },
      { name: 'last_update', type: 'TEXT',    key: '' },
      { name: 'picture',     type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'address',
    color: 'lime',
    columns: [
      { name: 'address_id',  type: 'INTEGER', key: 'PK' },
      { name: 'address',     type: 'TEXT',    key: '' },
      { name: 'address2',    type: 'TEXT',    key: '' },
      { name: 'district',    type: 'TEXT',    key: '' },
      { name: 'city_id',     type: 'INTEGER', key: 'FK→city' },
      { name: 'postal_code', type: 'TEXT',    key: '' },
      { name: 'phone',       type: 'TEXT',    key: '' },
      { name: 'last_update', type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'city',
    color: 'sky',
    columns: [
      { name: 'city_id',     type: 'INTEGER', key: 'PK' },
      { name: 'city',        type: 'TEXT',    key: '' },
      { name: 'country_id',  type: 'INTEGER', key: 'FK→country' },
      { name: 'last_update', type: 'TEXT',    key: '' },
    ],
  },
  {
    name: 'country',
    color: 'green',
    columns: [
      { name: 'country_id',  type: 'INTEGER', key: 'PK' },
      { name: 'country',     type: 'TEXT',    key: '' },
      { name: 'last_update', type: 'TEXT',    key: '' },
    ],
  },
];

const COLOR_MAP: Record<string, string> = {
  violet:  'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
  pink:    'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-900/30 dark:text-fuchsia-400',
  amber:   'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  orange:  'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  teal:    'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
  emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  blue:    'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  indigo:  'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
  cyan:    'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
  red:     'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  rose:    'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
  lime:    'bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400',
  sky:     'bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400',
  green:   'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
};

export function DVDRentalSchema() {
  const { t } = useLanguage();
  const [expandedTable, setExpandedTable] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm" dir="ltr">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-sm">{t.dvdRentalDb}</h3>
            <p className="text-violet-200 text-xs">{t.dvdRentalTablesCount}</p>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="p-3 space-y-1.5">
        {tables.map((table) => {
          const colorClass = COLOR_MAP[table.color] || COLOR_MAP.blue;
          const isExpanded = expandedTable === table.name;
          const description = t.dvdTableDescriptions[table.name] || '';

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
                    <p className="text-xs text-gray-400 dark:text-gray-500">{description}</p>
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
                        <th className="text-left py-1.5 pr-3 font-medium">{t.columnHeader}</th>
                        <th className="text-left py-1.5 pr-3 font-medium">{t.typeHeader}</th>
                        <th className="text-left py-1.5 font-medium">{t.keyHeader}</th>
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
