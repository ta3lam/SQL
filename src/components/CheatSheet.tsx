import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface CheatItem {
  descEn: string;
  descAr: string;
  code: string;
}

interface CheatSection {
  titleEn: string;
  titleAr: string;
  items: CheatItem[];
}

const SECTIONS: CheatSection[] = [
  {
    titleEn: '1. SELECT Basics',
    titleAr: '١. أساسيات SELECT',
    items: [
      {
        descEn: 'Select all columns',
        descAr: 'تحديد جميع الأعمدة',
        code: 'SELECT * FROM table_name;',
      },
      {
        descEn: 'Select specific columns',
        descAr: 'تحديد أعمدة بعينها',
        code: 'SELECT col1, col2 FROM table_name;',
      },
      {
        descEn: 'Column alias',
        descAr: 'تسمية العمود باسم مستعار',
        code: 'SELECT salary * 12 AS annual_salary\nFROM employees;',
      },
      {
        descEn: 'Remove duplicates',
        descAr: 'إزالة التكرارات',
        code: 'SELECT DISTINCT department FROM employees;',
      },
      {
        descEn: 'Sort results',
        descAr: 'ترتيب النتائج',
        code: 'SELECT * FROM employees\nORDER BY salary DESC, name ASC;',
      },
      {
        descEn: 'Limit & offset rows',
        descAr: 'تحديد عدد الصفوف والإزاحة',
        code: 'SELECT * FROM employees LIMIT 10;\nSELECT * FROM employees LIMIT 10 OFFSET 20;',
      },
    ],
  },
  {
    titleEn: '2. Filtering (WHERE)',
    titleAr: '٢. التصفية (WHERE)',
    items: [
      {
        descEn: 'Comparison operators',
        descAr: 'عوامل المقارنة',
        code: '=   <>   <   >   <=   >=',
      },
      {
        descEn: 'Combine conditions',
        descAr: 'تجميع الشروط',
        code: "WHERE age > 30 AND dept = 'Sales'\nWHERE age < 25 OR dept = 'HR'\nWHERE NOT status = 'inactive'",
      },
      {
        descEn: 'Match a list of values',
        descAr: 'مطابقة قائمة من القيم',
        code: "WHERE dept IN ('Sales', 'HR', 'IT')\nWHERE dept NOT IN ('Finance')",
      },
      {
        descEn: 'Range check',
        descAr: 'فحص نطاق',
        code: 'WHERE salary BETWEEN 3000 AND 7000',
      },
      {
        descEn: 'Pattern matching (LIKE)',
        descAr: 'مطابقة النمط (LIKE)',
        code: "WHERE name LIKE 'A%'       -- starts with A\nWHERE email LIKE '%@gmail.com'\nWHERE code LIKE '_-___'    -- _ = any 1 char\nWHERE name ILIKE 'alice'   -- case-insensitive",
      },
      {
        descEn: 'NULL checks',
        descAr: 'فحص القيم الفارغة',
        code: 'WHERE manager_id IS NULL\nWHERE phone IS NOT NULL',
      },
    ],
  },
  {
    titleEn: '3. Aggregates & Grouping',
    titleAr: '٣. التجميعات والتصنيف',
    items: [
      {
        descEn: 'Aggregate functions',
        descAr: 'دوال التجميع',
        code: 'COUNT(*)      -- count all rows\nCOUNT(col)    -- count non-NULL\nSUM(col)      AVG(col)\nMIN(col)      MAX(col)',
      },
      {
        descEn: 'Group rows',
        descAr: 'تجميع الصفوف',
        code: 'SELECT dept, COUNT(*) AS headcount,\n       AVG(salary) AS avg_pay\nFROM employees\nGROUP BY dept;',
      },
      {
        descEn: 'Filter groups (HAVING)',
        descAr: 'تصفية المجموعات (HAVING)',
        code: 'SELECT dept, AVG(salary) AS avg_pay\nFROM employees\nGROUP BY dept\nHAVING AVG(salary) > 5000;',
      },
      {
        descEn: 'Count distinct values',
        descAr: 'عدّ القيم الفريدة',
        code: 'SELECT COUNT(DISTINCT country) FROM customers;',
      },
    ],
  },
  {
    titleEn: '4. JOINs',
    titleAr: '٤. الوصلات (JOINs)',
    items: [
      {
        descEn: 'INNER JOIN — matching rows only',
        descAr: 'INNER JOIN — الصفوف المتطابقة فقط',
        code: 'SELECT e.name, d.dept_name\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.id;',
      },
      {
        descEn: 'LEFT JOIN — all left rows + matches',
        descAr: 'LEFT JOIN — كل صفوف اليسار + المتطابقة',
        code: 'SELECT c.name, o.order_id\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id;',
      },
      {
        descEn: 'RIGHT JOIN — all right rows + matches',
        descAr: 'RIGHT JOIN — كل صفوف اليمين + المتطابقة',
        code: 'SELECT e.name, d.dept_name\nFROM employees e\nRIGHT JOIN departments d ON e.dept_id = d.id;',
      },
      {
        descEn: 'FULL OUTER JOIN — all rows from both',
        descAr: 'FULL OUTER JOIN — كل الصفوف من الجانبين',
        code: 'SELECT e.name, d.dept_name\nFROM employees e\nFULL OUTER JOIN departments d ON e.dept_id = d.id;',
      },
      {
        descEn: 'CROSS JOIN — every combination',
        descAr: 'CROSS JOIN — كل تركيبة ممكنة',
        code: 'SELECT a.name, b.name\nFROM team_a a CROSS JOIN team_b b;',
      },
      {
        descEn: 'Self JOIN — table joined to itself',
        descAr: 'Self JOIN — الجدول مع نفسه',
        code: 'SELECT e.name, m.name AS manager\nFROM employees e\nJOIN employees m ON e.manager_id = m.id;',
      },
    ],
  },
  {
    titleEn: '5. Subqueries',
    titleAr: '٥. الاستعلامات الفرعية',
    items: [
      {
        descEn: 'Scalar subquery (single value)',
        descAr: 'استعلام فرعي مقياسي (قيمة واحدة)',
        code: 'SELECT name, salary\nFROM employees\nWHERE salary > (\n  SELECT AVG(salary) FROM employees\n);',
      },
      {
        descEn: 'IN subquery',
        descAr: 'استعلام فرعي مع IN',
        code: 'SELECT name FROM customers\nWHERE id IN (\n  SELECT customer_id FROM orders\n  WHERE total > 1000\n);',
      },
      {
        descEn: 'EXISTS subquery',
        descAr: 'استعلام فرعي مع EXISTS',
        code: 'SELECT name FROM customers c\nWHERE EXISTS (\n  SELECT 1 FROM orders o\n  WHERE o.customer_id = c.id\n);',
      },
      {
        descEn: 'Subquery in FROM (derived table)',
        descAr: 'استعلام فرعي في FROM (جدول مشتق)',
        code: 'SELECT dept, avg_salary\nFROM (\n  SELECT dept, AVG(salary) AS avg_salary\n  FROM employees\n  GROUP BY dept\n) AS dept_stats\nWHERE avg_salary > 5000;',
      },
    ],
  },
  {
    titleEn: '6. Set Operations',
    titleAr: '٦. عمليات المجموعات',
    items: [
      {
        descEn: 'UNION — combine, remove duplicates',
        descAr: 'UNION — دمج مع إزالة التكرار',
        code: 'SELECT name FROM employees\nUNION\nSELECT name FROM contractors;',
      },
      {
        descEn: 'UNION ALL — combine, keep duplicates',
        descAr: 'UNION ALL — دمج مع الاحتفاظ بالتكرار',
        code: 'SELECT city FROM customers\nUNION ALL\nSELECT city FROM suppliers;',
      },
      {
        descEn: 'INTERSECT — rows in both results',
        descAr: 'INTERSECT — الصفوف المشتركة',
        code: 'SELECT id FROM table_a\nINTERSECT\nSELECT id FROM table_b;',
      },
      {
        descEn: 'EXCEPT — rows in first but not second',
        descAr: 'EXCEPT — صفوف الأول دون الثاني',
        code: 'SELECT id FROM all_users\nEXCEPT\nSELECT id FROM active_users;',
      },
    ],
  },
  {
    titleEn: '7. CTEs (WITH)',
    titleAr: '٧. التعبيرات الجدولية المشتركة (WITH)',
    items: [
      {
        descEn: 'Basic CTE',
        descAr: 'CTE أساسي',
        code: 'WITH high_earners AS (\n  SELECT * FROM employees\n  WHERE salary > 8000\n)\nSELECT name, dept FROM high_earners;',
      },
      {
        descEn: 'Multiple CTEs',
        descAr: 'CTEs متعددة',
        code: 'WITH\n  dept_avg AS (\n    SELECT dept, AVG(salary) AS avg\n    FROM employees GROUP BY dept\n  ),\n  top_depts AS (\n    SELECT dept FROM dept_avg\n    WHERE avg > 6000\n  )\nSELECT * FROM top_depts;',
      },
      {
        descEn: 'Recursive CTE (hierarchy/tree)',
        descAr: 'CTE تعاودي (هرمي / شجري)',
        code: 'WITH RECURSIVE org AS (\n  -- anchor: top-level (no manager)\n  SELECT id, name, manager_id, 0 AS lvl\n  FROM employees WHERE manager_id IS NULL\n  UNION ALL\n  -- recursive: employees one level down\n  SELECT e.id, e.name, e.manager_id, o.lvl+1\n  FROM employees e\n  JOIN org o ON e.manager_id = o.id\n)\nSELECT * FROM org ORDER BY lvl;',
      },
    ],
  },
  {
    titleEn: '8. Window Functions',
    titleAr: '٨. دوال النوافذ',
    items: [
      {
        descEn: 'Syntax template',
        descAr: 'قالب الصياغة',
        code: 'function() OVER (\n  PARTITION BY col    -- reset per group\n  ORDER BY col        -- order within window\n  ROWS BETWEEN UNBOUNDED PRECEDING\n            AND CURRENT ROW\n)',
      },
      {
        descEn: 'Ranking',
        descAr: 'الترتيب',
        code: 'ROW_NUMBER()  OVER (ORDER BY salary DESC) -- unique\nRANK()        OVER (ORDER BY salary DESC) -- gaps on ties\nDENSE_RANK()  OVER (ORDER BY salary DESC) -- no gaps\nNTILE(4)      OVER (ORDER BY salary DESC) -- quartiles',
      },
      {
        descEn: 'Running total / partition average',
        descAr: 'مجموع تراكمي / متوسط النافذة',
        code: 'SUM(salary) OVER (ORDER BY hire_date)\nAVG(salary) OVER (PARTITION BY dept\n                  ORDER BY hire_date)',
      },
      {
        descEn: 'LAG & LEAD — access adjacent rows',
        descAr: 'LAG و LEAD — الوصول إلى صفوف مجاورة',
        code: 'LAG(salary,  1, 0) OVER (ORDER BY hire_date)\nLEAD(salary, 1, 0) OVER (ORDER BY hire_date)',
      },
      {
        descEn: 'FIRST_VALUE & LAST_VALUE',
        descAr: 'FIRST_VALUE و LAST_VALUE',
        code: 'FIRST_VALUE(salary) OVER (\n  PARTITION BY dept ORDER BY hire_date\n)\nLAST_VALUE(salary) OVER (\n  PARTITION BY dept ORDER BY hire_date\n  ROWS BETWEEN UNBOUNDED PRECEDING\n            AND UNBOUNDED FOLLOWING\n)',
      },
    ],
  },
  {
    titleEn: '9. String Functions',
    titleAr: '٩. دوال النصوص',
    items: [
      {
        descEn: 'Case conversion',
        descAr: 'تحويل الحالة',
        code: "UPPER('hello')   → 'HELLO'\nLOWER('WORLD')   → 'world'",
      },
      {
        descEn: 'Length',
        descAr: 'الطول',
        code: "LENGTH('SQL')    → 3",
      },
      {
        descEn: 'Substring',
        descAr: 'جزء من النص',
        code: "SUBSTRING('Hello World', 1, 5) → 'Hello'\nSUBSTR('Hello', 2)             → 'ello'",
      },
      {
        descEn: 'Concatenation',
        descAr: 'دمج النصوص',
        code: "CONCAT(first_name, ' ', last_name)\nfirst_name || ' ' || last_name   -- standard",
      },
      {
        descEn: 'Trim whitespace',
        descAr: 'إزالة المسافات',
        code: "TRIM('  hello  ')  → 'hello'\nLTRIM(' hello')    → 'hello'\nRTRIM('hello ')    → 'hello'",
      },
      {
        descEn: 'Replace & find position',
        descAr: 'الاستبدال وإيجاد الموضع',
        code: "REPLACE('2024-01-15', '-', '/') → '2024/01/15'\nPOSITION('@' IN 'user@mail.com') → 5",
      },
    ],
  },
  {
    titleEn: '10. Date & Time',
    titleAr: '١٠. التاريخ والوقت',
    items: [
      {
        descEn: 'Current date / timestamp',
        descAr: 'التاريخ / الطابع الزمني الحالي',
        code: 'CURRENT_DATE       -- date only\nCURRENT_TIMESTAMP  -- date + time (UTC)\nNOW()              -- date + time (local)',
      },
      {
        descEn: 'Extract parts',
        descAr: 'استخراج أجزاء',
        code: "EXTRACT(YEAR  FROM hire_date)\nEXTRACT(MONTH FROM hire_date)\nEXTRACT(DOW   FROM hire_date)  -- day of week\nDATE_PART('hour', created_at)",
      },
      {
        descEn: 'Truncate to period',
        descAr: 'اقتطاع إلى فترة',
        code: "DATE_TRUNC('month', created_at) -- 1st of month\nDATE_TRUNC('year',  created_at) -- Jan 1\nDATE_TRUNC('week',  created_at) -- Monday",
      },
      {
        descEn: 'Date arithmetic',
        descAr: 'العمليات الحسابية على التاريخ',
        code: "hire_date + INTERVAL '30 days'\nNOW() - INTERVAL '1 year'\nend_date - start_date  -- days difference",
      },
    ],
  },
  {
    titleEn: '11. Conditional Logic',
    titleAr: '١١. المنطق الشرطي',
    items: [
      {
        descEn: 'CASE expression',
        descAr: 'تعبير CASE',
        code: "SELECT name,\n  CASE\n    WHEN salary >= 8000 THEN 'Senior'\n    WHEN salary >= 5000 THEN 'Mid'\n    ELSE 'Junior'\n  END AS grade\nFROM employees;",
      },
      {
        descEn: 'Simple CASE (value match)',
        descAr: 'CASE البسيط (مطابقة قيمة)',
        code: "CASE status\n  WHEN 'A' THEN 'Active'\n  WHEN 'I' THEN 'Inactive'\n  ELSE 'Unknown'\nEND",
      },
      {
        descEn: 'COALESCE — first non-NULL value',
        descAr: 'COALESCE — أول قيمة غير فارغة',
        code: "COALESCE(phone, mobile, 'N/A')",
      },
      {
        descEn: 'NULLIF — return NULL when equal',
        descAr: 'NULLIF — إرجاع NULL عند التساوي',
        code: 'NULLIF(quantity, 0)  -- avoids ÷ by zero\nNULLIF(code, \'\')    -- treat empty as NULL',
      },
    ],
  },
  {
    titleEn: '12. DDL — Data Definition',
    titleAr: '١٢. DDL — تعريف البيانات',
    items: [
      {
        descEn: 'Create a table',
        descAr: 'إنشاء جدول',
        code: 'CREATE TABLE employees (\n  id        INTEGER PRIMARY KEY,\n  name      VARCHAR(100) NOT NULL,\n  salary    DECIMAL(10,2) DEFAULT 0,\n  dept_id   INTEGER REFERENCES departments(id),\n  hire_date DATE\n);',
      },
      {
        descEn: 'Add / drop a column',
        descAr: 'إضافة / حذف عمود',
        code: 'ALTER TABLE employees\n  ADD COLUMN email VARCHAR(255);\n\nALTER TABLE employees\n  DROP COLUMN email;',
      },
      {
        descEn: 'Rename column / table',
        descAr: 'إعادة تسمية عمود / جدول',
        code: 'ALTER TABLE employees\n  RENAME COLUMN salary TO base_salary;\n\nALTER TABLE employees RENAME TO staff;',
      },
      {
        descEn: 'Drop a table',
        descAr: 'حذف جدول',
        code: 'DROP TABLE IF EXISTS temp_data;\nTRUNCATE TABLE logs;  -- delete all rows fast',
      },
      {
        descEn: 'Create index',
        descAr: 'إنشاء فهرس',
        code: 'CREATE INDEX idx_emp_dept\n  ON employees(dept_id);\n\nCREATE UNIQUE INDEX idx_emp_email\n  ON employees(email);',
      },
    ],
  },
  {
    titleEn: '13. DML — Data Manipulation',
    titleAr: '١٣. DML — معالجة البيانات',
    items: [
      {
        descEn: 'Insert rows',
        descAr: 'إدراج صفوف',
        code: "INSERT INTO employees (name, salary, dept_id)\nVALUES ('Alice', 6000, 2);\n\n-- Multi-row insert\nINSERT INTO employees (name, salary)\nVALUES ('Bob', 5000), ('Carol', 7000);",
      },
      {
        descEn: 'Insert from a SELECT',
        descAr: 'إدراج من استعلام SELECT',
        code: 'INSERT INTO archive_orders\nSELECT * FROM orders\nWHERE status = \'closed\';',
      },
      {
        descEn: 'Update rows',
        descAr: 'تحديث صفوف',
        code: 'UPDATE employees\nSET salary  = salary * 1.1,\n    dept_id = 3\nWHERE dept_id = 1 AND salary < 5000;',
      },
      {
        descEn: 'Delete rows',
        descAr: 'حذف صفوف',
        code: "DELETE FROM employees WHERE id = 42;\nDELETE FROM orders WHERE status = 'cancelled';",
      },
    ],
  },
  {
    titleEn: '14. Transactions',
    titleAr: '١٤. المعاملات',
    items: [
      {
        descEn: 'Commit a transaction',
        descAr: 'تأكيد معاملة',
        code: 'BEGIN;\n  UPDATE accounts\n    SET balance = balance - 100\n    WHERE id = 1;\n  UPDATE accounts\n    SET balance = balance + 100\n    WHERE id = 2;\nCOMMIT;',
      },
      {
        descEn: 'Rollback on error',
        descAr: 'التراجع عند الخطأ',
        code: 'BEGIN;\n  DELETE FROM orders WHERE customer_id = 99;\n  -- something went wrong:\nROLLBACK;',
      },
      {
        descEn: 'Savepoints',
        descAr: 'نقاط الحفظ',
        code: 'BEGIN;\n  INSERT INTO logs VALUES (\'step1\');\n  SAVEPOINT step1;\n  INSERT INTO logs VALUES (\'step2\');\n  ROLLBACK TO SAVEPOINT step1;\nCOMMIT;',
      },
    ],
  },
  {
    titleEn: '15. Type Casting & Misc',
    titleAr: '١٥. تحويل الأنواع وأخرى',
    items: [
      {
        descEn: 'CAST function (standard SQL)',
        descAr: 'دالة CAST (SQL قياسي)',
        code: "CAST('2024-01-15' AS DATE)\nCAST(price AS INTEGER)\nCAST(id AS VARCHAR)",
      },
      {
        descEn: 'PostgreSQL :: shorthand',
        descAr: 'الصياغة المختصرة :: في PostgreSQL',
        code: "'2024-01-15'::DATE\nprice::INTEGER\nid::TEXT",
      },
      {
        descEn: 'Views',
        descAr: 'المناظير (Views)',
        code: 'CREATE VIEW active_employees AS\n  SELECT * FROM employees\n  WHERE status = \'active\';\n\nDROP VIEW IF EXISTS active_employees;',
      },
      {
        descEn: 'EXPLAIN (query plan)',
        descAr: 'EXPLAIN (خطة الاستعلام)',
        code: 'EXPLAIN SELECT * FROM employees\nWHERE dept_id = 2;\n\nEXPLAIN ANALYZE ...',
      },
    ],
  },
];

interface CheatSheetProps {
  onClose: () => void;
}

export function CheatSheet({ onClose }: CheatSheetProps) {
  const { lang } = useLanguage();
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));

  function toggleSection(i: number) {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  function expandAll() {
    setOpenSections(new Set(SECTIONS.map((_, i) => i)));
  }

  function collapseAll() {
    setOpenSections(new Set());
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                {lang === 'ar' ? 'ورقة مرجعية SQL' : 'SQL Cheat Sheet'}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {lang === 'ar' ? 'من الأساسيات إلى المتقدم' : 'Basic to Advanced Reference'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {lang === 'ar' ? 'توسيع الكل' : 'Expand all'}
            </button>
            <button
              onClick={collapseAll}
              className="text-xs text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {lang === 'ar' ? 'طي الكل' : 'Collapse all'}
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {SECTIONS.map((section, i) => {
            const isOpen = openSections.has(i);
            const title = lang === 'ar' ? section.titleAr : section.titleEn;
            return (
              <div
                key={i}
                className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
              >
                {/* Section header */}
                <button
                  onClick={() => toggleSection(i)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/80 transition-colors text-left"
                >
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    {title}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Section items */}
                {isOpen && (
                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {section.items.map((item, j) => (
                      <div key={j} className="px-4 py-3">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">
                          {lang === 'ar' ? item.descAr : item.descEn}
                        </p>
                        <pre className="text-xs font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg px-3 py-2.5 overflow-x-auto whitespace-pre leading-relaxed border border-indigo-100 dark:border-indigo-900/50">
                          {item.code}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <p className="text-xs text-center text-gray-400 dark:text-gray-500">
            {lang === 'ar'
              ? 'ملاحظة: بعض الدوال تختلف بحسب نظام قواعد البيانات (SQLite / PostgreSQL / MySQL)'
              : 'Note: some functions vary by database engine (SQLite / PostgreSQL / MySQL)'}
          </p>
        </div>
      </div>
    </div>
  );
}
