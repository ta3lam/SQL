import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface Example {
  titleEn?: string;
  titleAr?: string;
  code: string;
}

interface Entry {
  id: string;
  labelEn: string;
  labelAr: string;
  descEn: string;
  descAr: string;
  examples: Example[];
}

interface Group {
  groupEn: string;
  groupAr: string;
  entries: Entry[];
}

const GROUPS: Group[] = [
  {
    groupEn: 'Basic Queries',
    groupAr: 'الاستعلامات الأساسية',
    entries: [
      {
        id: 'select',
        labelEn: 'SELECT',
        labelAr: 'SELECT',
        descEn: 'Retrieves columns from one or more tables. The foundation of every SQL query.',
        descAr: 'يجلب أعمدة من جدول واحد أو أكثر. هو أساس كل استعلام SQL.',
        examples: [
          {
            titleEn: 'Select specific columns',
            titleAr: 'تحديد أعمدة بعينها',
            code: 'SELECT name, salary\nFROM employees;',
          },
          {
            titleEn: 'Select all columns',
            titleAr: 'تحديد جميع الأعمدة',
            code: 'SELECT * FROM employees;',
          },
        ],
      },
      {
        id: 'where',
        labelEn: 'WHERE',
        labelAr: 'WHERE',
        descEn: 'Filters rows based on a condition. Only rows that satisfy the condition are returned.',
        descAr: 'يصفّي الصفوف بناءً على شرط. تُرجع فقط الصفوف التي تحقق الشرط.',
        examples: [
          {
            titleEn: 'Filter by a value',
            titleAr: 'التصفية بقيمة',
            code: "SELECT name, salary\nFROM employees\nWHERE department = 'Sales';",
          },
          {
            titleEn: 'Numeric comparison',
            titleAr: 'مقارنة رقمية',
            code: 'SELECT name, salary\nFROM employees\nWHERE salary > 5000;',
          },
        ],
      },
      {
        id: 'order-by',
        labelEn: 'ORDER BY',
        labelAr: 'ORDER BY',
        descEn: 'Sorts the result set by one or more columns, ascending (ASC) or descending (DESC).',
        descAr: 'يرتّب نتائج الاستعلام حسب عمود أو أكثر، تصاعدياً (ASC) أو تنازلياً (DESC).',
        examples: [
          {
            titleEn: 'Sort by salary descending',
            titleAr: 'الترتيب بالراتب تنازلياً',
            code: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC;',
          },
          {
            titleEn: 'Sort by multiple columns',
            titleAr: 'الترتيب بأعمدة متعددة',
            code: 'SELECT name, department, salary\nFROM employees\nORDER BY department ASC, salary DESC;',
          },
        ],
      },
      {
        id: 'limit',
        labelEn: 'LIMIT / OFFSET',
        labelAr: 'LIMIT / OFFSET',
        descEn: 'LIMIT restricts the number of rows returned. OFFSET skips the first N rows (useful for pagination).',
        descAr: 'LIMIT يحدد عدد الصفوف المُرجعة. OFFSET يتخطى أول N صفوف (مفيد للتصفح بالصفحات).',
        examples: [
          {
            titleEn: 'Top 5 highest salaries',
            titleAr: 'أعلى 5 رواتب',
            code: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 5;',
          },
          {
            titleEn: 'Page 2 (rows 11–20)',
            titleAr: 'الصفحة الثانية (الصفوف 11–20)',
            code: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 10 OFFSET 10;',
          },
        ],
      },
      {
        id: 'distinct',
        labelEn: 'DISTINCT',
        labelAr: 'DISTINCT',
        descEn: 'Removes duplicate rows from the result set, returning only unique values.',
        descAr: 'يزيل الصفوف المكررة من النتائج، ويُرجع فقط القيم الفريدة.',
        examples: [
          {
            titleEn: 'Unique departments',
            titleAr: 'الأقسام الفريدة',
            code: 'SELECT DISTINCT department\nFROM employees;',
          },
        ],
      },
      {
        id: 'alias',
        labelEn: 'AS (Alias)',
        labelAr: 'AS (اسم مستعار)',
        descEn: 'Gives a column or table a temporary name to make results more readable.',
        descAr: 'يمنح عموداً أو جدولاً اسماً مؤقتاً لجعل النتائج أكثر وضوحاً.',
        examples: [
          {
            titleEn: 'Column alias',
            titleAr: 'اسم مستعار للعمود',
            code: 'SELECT name,\n       salary * 12 AS annual_salary\nFROM employees;',
          },
          {
            titleEn: 'Table alias',
            titleAr: 'اسم مستعار للجدول',
            code: 'SELECT e.name, d.name AS dept_name\nFROM employees e\nJOIN departments d ON e.dept_id = d.id;',
          },
        ],
      },
    ],
  },
  {
    groupEn: 'Filtering',
    groupAr: 'التصفية',
    entries: [
      {
        id: 'and-or',
        labelEn: 'AND / OR / NOT',
        labelAr: 'AND / OR / NOT',
        descEn: 'Combines multiple conditions. AND requires all to be true; OR requires at least one; NOT inverts a condition.',
        descAr: 'يجمع شروطاً متعددة. AND يتطلب تحقق الجميع؛ OR يكفي تحقق واحد؛ NOT يعكس الشرط.',
        examples: [
          {
            titleEn: 'AND — both conditions must match',
            titleAr: 'AND — يجب أن يتحقق الشرطان',
            code: "SELECT name FROM employees\nWHERE department = 'Sales'\n  AND salary > 4000;",
          },
          {
            titleEn: 'OR / NOT',
            titleAr: 'OR / NOT',
            code: "SELECT name FROM employees\nWHERE department = 'HR'\n   OR department = 'IT';\n\nSELECT name FROM employees\nWHERE NOT department = 'Finance';",
          },
        ],
      },
      {
        id: 'in',
        labelEn: 'IN / NOT IN',
        labelAr: 'IN / NOT IN',
        descEn: 'Checks if a value matches any value in a list. Cleaner alternative to multiple OR conditions.',
        descAr: 'يتحقق إذا كانت القيمة تتطابق مع أي قيمة في قائمة. بديل أنظف من شروط OR المتعددة.',
        examples: [
          {
            titleEn: 'Match a list',
            titleAr: 'مطابقة قائمة',
            code: "SELECT name FROM employees\nWHERE department IN ('Sales', 'HR', 'IT');",
          },
          {
            titleEn: 'Exclude a list',
            titleAr: 'استبعاد قائمة',
            code: "SELECT name FROM employees\nWHERE department NOT IN ('Finance', 'Legal');",
          },
        ],
      },
      {
        id: 'between',
        labelEn: 'BETWEEN',
        labelAr: 'BETWEEN',
        descEn: 'Filters rows where a value falls within an inclusive range (both endpoints are included).',
        descAr: 'يصفّي الصفوف التي تقع قيمتها ضمن نطاق شامل للطرفين.',
        examples: [
          {
            titleEn: 'Salary range',
            titleAr: 'نطاق الراتب',
            code: 'SELECT name, salary\nFROM employees\nWHERE salary BETWEEN 3000 AND 7000;',
          },
        ],
      },
      {
        id: 'like',
        labelEn: 'LIKE / ILIKE',
        labelAr: 'LIKE / ILIKE',
        descEn: 'Matches a string pattern. % matches any sequence of characters; _ matches exactly one character. ILIKE is case-insensitive (PostgreSQL).',
        descAr: 'يطابق نمطاً نصياً. % يمثّل أي تسلسل من الحروف؛ _ يمثّل حرفاً واحداً بالضبط. ILIKE لا يفرّق بين الحالات (PostgreSQL).',
        examples: [
          {
            titleEn: 'Pattern matching',
            titleAr: 'مطابقة النمط',
            code: "-- Starts with 'A'\nSELECT name FROM employees WHERE name LIKE 'A%';\n\n-- Contains 'son'\nSELECT name FROM employees WHERE name LIKE '%son%';\n\n-- Exactly 5 characters\nSELECT name FROM employees WHERE name LIKE '_____';",
          },
        ],
      },
      {
        id: 'is-null',
        labelEn: 'IS NULL / IS NOT NULL',
        labelAr: 'IS NULL / IS NOT NULL',
        descEn: 'Checks whether a column value is NULL (missing/unknown). You cannot use = NULL — you must use IS NULL.',
        descAr: 'يتحقق إذا كانت قيمة العمود NULL (مفقودة/غير معروفة). لا يمكن استخدام = NULL — يجب استخدام IS NULL.',
        examples: [
          {
            titleEn: 'Find missing values',
            titleAr: 'البحث عن القيم المفقودة',
            code: '-- Employees with no manager\nSELECT name FROM employees\nWHERE manager_id IS NULL;\n\n-- Employees who have a phone number\nSELECT name FROM employees\nWHERE phone IS NOT NULL;',
          },
        ],
      },
    ],
  },
  {
    groupEn: 'Aggregation',
    groupAr: 'التجميع',
    entries: [
      {
        id: 'count',
        labelEn: 'COUNT',
        labelAr: 'COUNT',
        descEn: 'Counts rows. COUNT(*) counts all rows; COUNT(col) skips NULL values.',
        descAr: 'يعدّ الصفوف. COUNT(*) يعدّ كل الصفوف؛ COUNT(col) يتجاهل قيم NULL.',
        examples: [
          {
            code: 'SELECT COUNT(*) AS total_employees\nFROM employees;\n\nSELECT COUNT(DISTINCT department) AS dept_count\nFROM employees;',
          },
        ],
      },
      {
        id: 'sum-avg',
        labelEn: 'SUM / AVG',
        labelAr: 'SUM / AVG',
        descEn: 'SUM adds up all values in a column. AVG computes the arithmetic mean. Both ignore NULL values.',
        descAr: 'SUM يجمع كل القيم في عمود. AVG يحسب المتوسط الحسابي. كلاهما يتجاهل قيم NULL.',
        examples: [
          {
            code: 'SELECT SUM(salary)  AS total_payroll,\n       AVG(salary)  AS avg_salary\nFROM employees;',
          },
        ],
      },
      {
        id: 'min-max',
        labelEn: 'MIN / MAX',
        labelAr: 'MIN / MAX',
        descEn: 'MIN returns the smallest value; MAX returns the largest. Works on numbers, dates, and strings.',
        descAr: 'MIN يُرجع أصغر قيمة؛ MAX يُرجع أكبر قيمة. يعمل على الأرقام والتواريخ والنصوص.',
        examples: [
          {
            code: 'SELECT MIN(salary) AS lowest,\n       MAX(salary) AS highest\nFROM employees;',
          },
        ],
      },
      {
        id: 'group-by',
        labelEn: 'GROUP BY',
        labelAr: 'GROUP BY',
        descEn: 'Groups rows that share the same value in a column, so aggregate functions are applied per group.',
        descAr: 'يجمّع الصفوف التي لها نفس القيمة في عمود، ليُطبَّق التجميع على كل مجموعة.',
        examples: [
          {
            titleEn: 'Count and average salary per department',
            titleAr: 'العدد ومتوسط الراتب لكل قسم',
            code: 'SELECT department,\n       COUNT(*)      AS headcount,\n       AVG(salary)   AS avg_salary\nFROM employees\nGROUP BY department;',
          },
        ],
      },
      {
        id: 'having',
        labelEn: 'HAVING',
        labelAr: 'HAVING',
        descEn: 'Filters groups after GROUP BY — like WHERE but for aggregated results.',
        descAr: 'يصفّي المجموعات بعد GROUP BY — مثل WHERE لكن على نتائج التجميع.',
        examples: [
          {
            titleEn: 'Departments with average salary above 5000',
            titleAr: 'الأقسام التي متوسط راتبها فوق 5000',
            code: 'SELECT department, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department\nHAVING AVG(salary) > 5000;',
          },
        ],
      },
    ],
  },
  {
    groupEn: 'JOINs',
    groupAr: 'الوصلات (JOINs)',
    entries: [
      {
        id: 'inner-join',
        labelEn: 'INNER JOIN',
        labelAr: 'INNER JOIN',
        descEn: 'Returns only rows that have a matching value in both tables.',
        descAr: 'يُرجع فقط الصفوف التي لها قيمة مطابقة في كلا الجدولين.',
        examples: [
          {
            code: 'SELECT e.name, d.name AS department\nFROM employees e\nINNER JOIN departments d\n  ON e.dept_id = d.id;',
          },
        ],
      },
      {
        id: 'left-join',
        labelEn: 'LEFT JOIN',
        labelAr: 'LEFT JOIN',
        descEn: 'Returns all rows from the left table, plus matching rows from the right. Non-matching right rows appear as NULL.',
        descAr: 'يُرجع كل صفوف الجدول الأيسر، مع المطابق من الأيمن. الصفوف غير المتطابقة تظهر كـ NULL.',
        examples: [
          {
            titleEn: 'Customers with or without orders',
            titleAr: 'العملاء بطلبات أو بدونها',
            code: 'SELECT c.name, o.id AS order_id\nFROM customers c\nLEFT JOIN orders o\n  ON c.id = o.customer_id;',
          },
        ],
      },
      {
        id: 'right-join',
        labelEn: 'RIGHT JOIN',
        labelAr: 'RIGHT JOIN',
        descEn: 'Returns all rows from the right table, plus matching rows from the left. Non-matching left rows appear as NULL.',
        descAr: 'يُرجع كل صفوف الجدول الأيمن، مع المطابق من الأيسر. الصفوف غير المتطابقة تظهر كـ NULL.',
        examples: [
          {
            code: 'SELECT e.name, d.name AS department\nFROM employees e\nRIGHT JOIN departments d\n  ON e.dept_id = d.id;',
          },
        ],
      },
      {
        id: 'full-join',
        labelEn: 'FULL OUTER JOIN',
        labelAr: 'FULL OUTER JOIN',
        descEn: 'Returns all rows from both tables. Where there is no match, the missing side is NULL.',
        descAr: 'يُرجع كل صفوف الجدولين. حيث لا توجد مطابقة، يكون الجانب المفقود NULL.',
        examples: [
          {
            code: 'SELECT e.name, d.name AS department\nFROM employees e\nFULL OUTER JOIN departments d\n  ON e.dept_id = d.id;',
          },
        ],
      },
      {
        id: 'cross-join',
        labelEn: 'CROSS JOIN',
        labelAr: 'CROSS JOIN',
        descEn: 'Produces the Cartesian product — every row in the left table paired with every row in the right.',
        descAr: 'ينتج الضرب الديكارتي — كل صف في الجدول الأيسر مقترن بكل صف في الأيمن.',
        examples: [
          {
            code: 'SELECT a.color, b.size\nFROM colors a\nCROSS JOIN sizes b;',
          },
        ],
      },
      {
        id: 'self-join',
        labelEn: 'Self JOIN',
        labelAr: 'Self JOIN',
        descEn: 'Joins a table to itself using aliases. Useful for hierarchical data like employee–manager relationships.',
        descAr: 'يصل الجدول بنفسه باستخدام أسماء مستعارة. مفيد للبيانات الهرمية مثل علاقة الموظف–المدير.',
        examples: [
          {
            code: 'SELECT e.name   AS employee,\n       m.name   AS manager\nFROM employees e\nJOIN employees m\n  ON e.manager_id = m.id;',
          },
        ],
      },
    ],
  },
  {
    groupEn: 'Subqueries',
    groupAr: 'الاستعلامات الفرعية',
    entries: [
      {
        id: 'scalar-subquery',
        labelEn: 'Scalar Subquery',
        labelAr: 'استعلام فرعي مقياسي',
        descEn: 'A subquery that returns exactly one value (one row, one column). Used in WHERE or SELECT.',
        descAr: 'استعلام فرعي يُرجع قيمة واحدة فقط. يُستخدم في WHERE أو SELECT.',
        examples: [
          {
            titleEn: 'Employees earning above average',
            titleAr: 'الموظفون فوق المتوسط',
            code: 'SELECT name, salary\nFROM employees\nWHERE salary > (\n  SELECT AVG(salary) FROM employees\n);',
          },
        ],
      },
      {
        id: 'in-subquery',
        labelEn: 'IN Subquery',
        labelAr: 'استعلام فرعي مع IN',
        descEn: 'A subquery that returns a list of values used with IN to filter the outer query.',
        descAr: 'استعلام فرعي يُرجع قائمة قيم تُستخدم مع IN لتصفية الاستعلام الخارجي.',
        examples: [
          {
            code: 'SELECT name FROM customers\nWHERE id IN (\n  SELECT customer_id\n  FROM orders\n  WHERE total > 1000\n);',
          },
        ],
      },
      {
        id: 'exists',
        labelEn: 'EXISTS',
        labelAr: 'EXISTS',
        descEn: 'Returns TRUE if the subquery returns at least one row. Often faster than IN for large datasets.',
        descAr: 'يُرجع TRUE إذا أعاد الاستعلام الفرعي صفاً واحداً على الأقل. غالباً أسرع من IN على البيانات الكبيرة.',
        examples: [
          {
            titleEn: 'Customers who placed at least one order',
            titleAr: 'العملاء الذين قدّموا طلباً واحداً على الأقل',
            code: 'SELECT name FROM customers c\nWHERE EXISTS (\n  SELECT 1 FROM orders o\n  WHERE o.customer_id = c.id\n);',
          },
        ],
      },
      {
        id: 'derived-table',
        labelEn: 'Derived Table (FROM)',
        labelAr: 'جدول مشتق (FROM)',
        descEn: 'A subquery inside FROM that acts as a temporary table for the outer query.',
        descAr: 'استعلام فرعي داخل FROM يعمل كجدول مؤقت للاستعلام الخارجي.',
        examples: [
          {
            code: 'SELECT dept, avg_salary\nFROM (\n  SELECT department AS dept,\n         AVG(salary)  AS avg_salary\n  FROM employees\n  GROUP BY department\n) AS dept_stats\nWHERE avg_salary > 5000;',
          },
        ],
      },
    ],
  },
  {
    groupEn: 'Set Operations',
    groupAr: 'عمليات المجموعات',
    entries: [
      {
        id: 'union',
        labelEn: 'UNION / UNION ALL',
        labelAr: 'UNION / UNION ALL',
        descEn: 'Combines results of two queries. UNION removes duplicates; UNION ALL keeps them. Both queries must have the same number and type of columns.',
        descAr: 'يدمج نتائج استعلامين. UNION يزيل التكرار؛ UNION ALL يحتفظ به. يجب أن يكون لكليهما نفس عدد الأعمدة وأنواعها.',
        examples: [
          {
            code: '-- Remove duplicates\nSELECT name FROM employees\nUNION\nSELECT name FROM contractors;\n\n-- Keep duplicates\nSELECT city FROM customers\nUNION ALL\nSELECT city FROM suppliers;',
          },
        ],
      },
      {
        id: 'intersect',
        labelEn: 'INTERSECT',
        labelAr: 'INTERSECT',
        descEn: 'Returns only rows that appear in both query results.',
        descAr: 'يُرجع فقط الصفوف التي تظهر في نتيجتي الاستعلامين.',
        examples: [
          {
            code: 'SELECT product_id FROM orders_2023\nINTERSECT\nSELECT product_id FROM orders_2024;',
          },
        ],
      },
      {
        id: 'except',
        labelEn: 'EXCEPT',
        labelAr: 'EXCEPT',
        descEn: 'Returns rows in the first query that do not appear in the second query.',
        descAr: 'يُرجع الصفوف الموجودة في الاستعلام الأول غير الموجودة في الثاني.',
        examples: [
          {
            code: 'SELECT id FROM all_products\nEXCEPT\nSELECT product_id FROM order_items;',
          },
        ],
      },
    ],
  },
  {
    groupEn: 'CTEs (WITH)',
    groupAr: 'CTEs (WITH)',
    entries: [
      {
        id: 'cte',
        labelEn: 'WITH (CTE)',
        labelAr: 'WITH (CTE)',
        descEn: 'A Common Table Expression defines a named temporary result set at the top of a query, making complex queries easier to read.',
        descAr: 'تعبير جدولي مشترك يعرّف مجموعة نتائج مؤقتة مسمّاة في أعلى الاستعلام، مما يجعل الاستعلامات المعقدة أسهل قراءةً.',
        examples: [
          {
            titleEn: 'Single CTE',
            titleAr: 'CTE واحد',
            code: 'WITH high_earners AS (\n  SELECT * FROM employees\n  WHERE salary > 8000\n)\nSELECT name, department\nFROM high_earners\nORDER BY salary DESC;',
          },
          {
            titleEn: 'Multiple CTEs',
            titleAr: 'CTEs متعددة',
            code: 'WITH\n  dept_avg AS (\n    SELECT department, AVG(salary) AS avg\n    FROM employees\n    GROUP BY department\n  ),\n  top_depts AS (\n    SELECT department FROM dept_avg\n    WHERE avg > 6000\n  )\nSELECT * FROM top_depts;',
          },
        ],
      },
      {
        id: 'recursive-cte',
        labelEn: 'Recursive CTE',
        labelAr: 'CTE تعاودي',
        descEn: 'A CTE that references itself to traverse hierarchical or graph-like data (e.g., org charts, category trees).',
        descAr: 'CTE يُشير إلى نفسه لاجتياز البيانات الهرمية أو الشبكية (مثل المخططات التنظيمية وأشجار الفئات).',
        examples: [
          {
            titleEn: 'Employee org chart',
            titleAr: 'المخطط التنظيمي للموظفين',
            code: 'WITH RECURSIVE org AS (\n  -- Anchor: top-level employees\n  SELECT id, name, manager_id, 0 AS level\n  FROM employees\n  WHERE manager_id IS NULL\n\n  UNION ALL\n\n  -- Recursive: one level down\n  SELECT e.id, e.name, e.manager_id, o.level + 1\n  FROM employees e\n  JOIN org o ON e.manager_id = o.id\n)\nSELECT level, name FROM org ORDER BY level;',
          },
        ],
      },
    ],
  },
  {
    groupEn: 'Window Functions',
    groupAr: 'دوال النوافذ',
    entries: [
      {
        id: 'row-number',
        labelEn: 'ROW_NUMBER',
        labelAr: 'ROW_NUMBER',
        descEn: 'Assigns a unique sequential integer to each row within a partition. No ties — every row gets a distinct number.',
        descAr: 'يعيّن رقماً تسلسلياً فريداً لكل صف ضمن القسم. لا توجد روابط — كل صف يحصل على رقم مميز.',
        examples: [
          {
            code: 'SELECT name, department, salary,\n       ROW_NUMBER() OVER (\n         PARTITION BY department\n         ORDER BY salary DESC\n       ) AS rank_in_dept\nFROM employees;',
          },
        ],
      },
      {
        id: 'rank',
        labelEn: 'RANK / DENSE_RANK',
        labelAr: 'RANK / DENSE_RANK',
        descEn: 'RANK leaves gaps after ties (1,1,3). DENSE_RANK does not leave gaps (1,1,2). Both rank rows within a partition.',
        descAr: 'RANK يترك فجوات بعد الروابط (1,1,3). DENSE_RANK لا يترك فجوات (1,1,2). كلاهما يرتّب الصفوف داخل القسم.',
        examples: [
          {
            code: 'SELECT name, salary,\n       RANK()       OVER (ORDER BY salary DESC) AS rnk,\n       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk\nFROM employees;',
          },
        ],
      },
      {
        id: 'lag-lead',
        labelEn: 'LAG / LEAD',
        labelAr: 'LAG / LEAD',
        descEn: 'LAG accesses a value from a previous row; LEAD accesses a value from a following row — without a self-join.',
        descAr: 'LAG يصل إلى قيمة من الصف السابق؛ LEAD يصل إلى قيمة من الصف التالي — دون الحاجة إلى Self JOIN.',
        examples: [
          {
            titleEn: 'Compare each sale to the previous one',
            titleAr: 'مقارنة كل مبيعة بالسابقة',
            code: 'SELECT order_date, revenue,\n       LAG(revenue, 1)  OVER (ORDER BY order_date) AS prev_revenue,\n       LEAD(revenue, 1) OVER (ORDER BY order_date) AS next_revenue\nFROM daily_sales;',
          },
        ],
      },
      {
        id: 'running-total',
        labelEn: 'Running Total / Moving Avg',
        labelAr: 'مجموع تراكمي / متوسط متحرك',
        descEn: 'Use SUM() or AVG() OVER with ORDER BY to compute a running (cumulative) total or moving average.',
        descAr: 'استخدم SUM() أو AVG() مع OVER و ORDER BY لحساب مجموع تراكمي أو متوسط متحرك.',
        examples: [
          {
            code: 'SELECT order_date, revenue,\n       SUM(revenue) OVER (ORDER BY order_date)\n         AS running_total,\n       AVG(revenue) OVER (\n         ORDER BY order_date\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ) AS moving_avg_7d\nFROM daily_sales;',
          },
        ],
      },
      {
        id: 'partition-by',
        labelEn: 'PARTITION BY',
        labelAr: 'PARTITION BY',
        descEn: 'Divides result rows into groups (partitions) for window functions. The function resets for each partition.',
        descAr: 'يقسّم صفوف النتائج إلى مجموعات لدوال النوافذ. تُعاد تهيئة الدالة عند كل قسم.',
        examples: [
          {
            titleEn: 'Salary rank within each department',
            titleAr: 'ترتيب الراتب داخل كل قسم',
            code: 'SELECT name, department, salary,\n       RANK() OVER (\n         PARTITION BY department\n         ORDER BY salary DESC\n       ) AS dept_rank\nFROM employees;',
          },
        ],
      },
    ],
  },
  {
    groupEn: 'String Functions',
    groupAr: 'دوال النصوص',
    entries: [
      {
        id: 'upper-lower',
        labelEn: 'UPPER / LOWER',
        labelAr: 'UPPER / LOWER',
        descEn: 'Converts all characters in a string to uppercase or lowercase.',
        descAr: 'يحوّل جميع أحرف النص إلى حروف كبيرة أو صغيرة.',
        examples: [
          {
            code: "SELECT UPPER('hello')  -- → 'HELLO'\nSELECT LOWER('WORLD')  -- → 'world'\n\nSELECT UPPER(name) AS name_upper\nFROM employees;",
          },
        ],
      },
      {
        id: 'length',
        labelEn: 'LENGTH',
        labelAr: 'LENGTH',
        descEn: 'Returns the number of characters in a string.',
        descAr: 'يُرجع عدد الأحرف في النص.',
        examples: [
          {
            code: "SELECT LENGTH('SQL')       -- → 3\nSELECT name, LENGTH(name) AS name_len\nFROM employees;",
          },
        ],
      },
      {
        id: 'substring',
        labelEn: 'SUBSTRING',
        labelAr: 'SUBSTRING',
        descEn: 'Extracts a portion of a string starting at a given position for a given length.',
        descAr: 'يستخرج جزءاً من النص بدءاً من موضع معين لطول معين.',
        examples: [
          {
            code: "SELECT SUBSTRING('Hello World', 1, 5) -- → 'Hello'\nSELECT SUBSTR('Hello', 2)             -- → 'ello'",
          },
        ],
      },
      {
        id: 'concat',
        labelEn: 'CONCAT / ||',
        labelAr: 'CONCAT / ||',
        descEn: 'Joins two or more strings together. The || operator is the SQL standard alternative.',
        descAr: 'يدمج نصّين أو أكثر معاً. عامل || هو البديل القياسي في SQL.',
        examples: [
          {
            code: "SELECT CONCAT(first_name, ' ', last_name) AS full_name\nFROM employees;\n\n-- SQL standard:\nSELECT first_name || ' ' || last_name AS full_name\nFROM employees;",
          },
        ],
      },
      {
        id: 'trim',
        labelEn: 'TRIM / LTRIM / RTRIM',
        labelAr: 'TRIM / LTRIM / RTRIM',
        descEn: 'Removes leading and/or trailing whitespace (or specified characters) from a string.',
        descAr: 'يزيل المسافات البيضاء (أو أحرفاً محددة) من بداية و/أو نهاية النص.',
        examples: [
          {
            code: "SELECT TRIM('  hello  ')  -- → 'hello'\nSELECT LTRIM(' hello')    -- → 'hello'\nSELECT RTRIM('hello ')    -- → 'hello'",
          },
        ],
      },
      {
        id: 'replace',
        labelEn: 'REPLACE',
        labelAr: 'REPLACE',
        descEn: 'Replaces all occurrences of a substring within a string with another substring.',
        descAr: 'يستبدل كل تكرارات نص فرعي داخل نص بنص فرعي آخر.',
        examples: [
          {
            code: "SELECT REPLACE('2024-01-15', '-', '/') -- → '2024/01/15'\n\nSELECT REPLACE(phone, ' ', '') AS clean_phone\nFROM customers;",
          },
        ],
      },
    ],
  },
  {
    groupEn: 'Date & Time',
    groupAr: 'التاريخ والوقت',
    entries: [
      {
        id: 'current-date',
        labelEn: 'CURRENT_DATE / NOW',
        labelAr: 'CURRENT_DATE / NOW',
        descEn: 'Returns the current date or the current date and time.',
        descAr: 'يُرجع التاريخ الحالي أو التاريخ والوقت الحاليين.',
        examples: [
          {
            code: 'SELECT CURRENT_DATE;        -- date only\nSELECT CURRENT_TIMESTAMP;   -- date + time\nSELECT NOW();               -- date + time',
          },
        ],
      },
      {
        id: 'extract',
        labelEn: 'EXTRACT / DATE_PART',
        labelAr: 'EXTRACT / DATE_PART',
        descEn: 'Extracts a specific part (year, month, day, hour…) from a date or timestamp.',
        descAr: 'يستخرج جزءاً محدداً (سنة، شهر، يوم، ساعة…) من تاريخ أو طابع زمني.',
        examples: [
          {
            code: "SELECT EXTRACT(YEAR  FROM hire_date) AS yr,\n       EXTRACT(MONTH FROM hire_date) AS mo,\n       EXTRACT(DAY   FROM hire_date) AS dy\nFROM employees;\n\nSELECT DATE_PART('hour', created_at) AS hr\nFROM orders;",
          },
        ],
      },
      {
        id: 'date-trunc',
        labelEn: 'DATE_TRUNC',
        labelAr: 'DATE_TRUNC',
        descEn: 'Truncates a timestamp to the specified precision (month, year, week…), zeroing out smaller units.',
        descAr: 'يقتطع طابعاً زمنياً إلى الدقة المحددة (شهر، سنة، أسبوع…)، ويجعل الوحدات الأصغر صفراً.',
        examples: [
          {
            code: "SELECT DATE_TRUNC('month', created_at) AS month_start,\n       COUNT(*) AS orders\nFROM orders\nGROUP BY DATE_TRUNC('month', created_at)\nORDER BY month_start;",
          },
        ],
      },
      {
        id: 'date-arithmetic',
        labelEn: 'Date Arithmetic',
        labelAr: 'العمليات الحسابية على التاريخ',
        descEn: 'Add or subtract intervals from dates. Subtract two dates to get the difference in days.',
        descAr: 'يُضيف أو يطرح فترات زمنية من التواريخ. طرح تاريخين يعطي الفرق بالأيام.',
        examples: [
          {
            code: "-- Add 30 days\nSELECT hire_date + INTERVAL '30 days' FROM employees;\n\n-- Subtract 1 year\nSELECT NOW() - INTERVAL '1 year';\n\n-- Days between two dates\nSELECT end_date - start_date AS duration_days\nFROM projects;",
          },
        ],
      },
    ],
  },
  {
    groupEn: 'Conditional',
    groupAr: 'المنطق الشرطي',
    entries: [
      {
        id: 'case-when',
        labelEn: 'CASE WHEN',
        labelAr: 'CASE WHEN',
        descEn: 'An if-then-else expression in SQL. Evaluates conditions top-to-bottom and returns the first matching result.',
        descAr: 'تعبير if-then-else في SQL. يُقيّم الشروط من الأعلى للأسفل ويُرجع أول نتيجة مطابقة.',
        examples: [
          {
            titleEn: 'Classify salary level',
            titleAr: 'تصنيف مستوى الراتب',
            code: "SELECT name, salary,\n  CASE\n    WHEN salary >= 8000 THEN 'Senior'\n    WHEN salary >= 5000 THEN 'Mid'\n    ELSE 'Junior'\n  END AS grade\nFROM employees;",
          },
        ],
      },
      {
        id: 'coalesce',
        labelEn: 'COALESCE',
        labelAr: 'COALESCE',
        descEn: 'Returns the first non-NULL value from a list of arguments. Useful for providing fallback values.',
        descAr: 'يُرجع أول قيمة غير NULL من قائمة الوسيطات. مفيد لتوفير قيم افتراضية.',
        examples: [
          {
            code: "SELECT name,\n       COALESCE(phone, mobile, 'N/A') AS contact\nFROM employees;",
          },
        ],
      },
      {
        id: 'nullif',
        labelEn: 'NULLIF',
        labelAr: 'NULLIF',
        descEn: 'Returns NULL if the two arguments are equal, otherwise returns the first argument. Useful to avoid division by zero.',
        descAr: 'يُرجع NULL إذا تساوى الوسيطان، وإلا يُرجع الوسيط الأول. مفيد لتجنب القسمة على صفر.',
        examples: [
          {
            code: '-- Avoid division by zero\nSELECT revenue / NULLIF(quantity, 0) AS unit_price\nFROM sales;',
          },
        ],
      },
    ],
  },
  {
    groupEn: 'DDL — Define Structure',
    groupAr: 'DDL — تعريف البنية',
    entries: [
      {
        id: 'create-table',
        labelEn: 'CREATE TABLE',
        labelAr: 'CREATE TABLE',
        descEn: 'Defines a new table with columns, data types, and constraints.',
        descAr: 'يعرّف جدولاً جديداً مع الأعمدة وأنواع البيانات والقيود.',
        examples: [
          {
            code: 'CREATE TABLE employees (\n  id        INTEGER      PRIMARY KEY,\n  name      VARCHAR(100) NOT NULL,\n  salary    DECIMAL(10,2) DEFAULT 0,\n  dept_id   INTEGER      REFERENCES departments(id),\n  hire_date DATE\n);',
          },
        ],
      },
      {
        id: 'alter-table',
        labelEn: 'ALTER TABLE',
        labelAr: 'ALTER TABLE',
        descEn: 'Modifies an existing table: add/drop/rename columns or rename the table itself.',
        descAr: 'يعدّل جدولاً موجوداً: يضيف/يحذف/يعيد تسمية أعمدة أو يعيد تسمية الجدول نفسه.',
        examples: [
          {
            code: '-- Add a column\nALTER TABLE employees ADD COLUMN email VARCHAR(255);\n\n-- Drop a column\nALTER TABLE employees DROP COLUMN email;\n\n-- Rename a column\nALTER TABLE employees RENAME COLUMN salary TO base_salary;',
          },
        ],
      },
      {
        id: 'drop-table',
        labelEn: 'DROP TABLE',
        labelAr: 'DROP TABLE',
        descEn: 'Permanently removes a table and all its data. IF EXISTS prevents an error if the table does not exist.',
        descAr: 'يحذف جدولاً وكل بياناته بشكل دائم. IF EXISTS يمنع الخطأ إذا لم يكن الجدول موجوداً.',
        examples: [
          {
            code: 'DROP TABLE IF EXISTS temp_results;\n\n-- Delete all rows but keep the table\nTRUNCATE TABLE logs;',
          },
        ],
      },
      {
        id: 'create-index',
        labelEn: 'CREATE INDEX',
        labelAr: 'CREATE INDEX',
        descEn: 'Creates an index to speed up queries on frequently searched columns.',
        descAr: 'ينشئ فهرساً لتسريع الاستعلامات على الأعمدة الأكثر بحثاً.',
        examples: [
          {
            code: 'CREATE INDEX idx_emp_dept\n  ON employees(dept_id);\n\nCREATE UNIQUE INDEX idx_emp_email\n  ON employees(email);',
          },
        ],
      },
    ],
  },
  {
    groupEn: 'DML — Modify Data',
    groupAr: 'DML — تعديل البيانات',
    entries: [
      {
        id: 'insert',
        labelEn: 'INSERT INTO',
        labelAr: 'INSERT INTO',
        descEn: 'Adds one or more rows to a table.',
        descAr: 'يضيف صفاً أو أكثر إلى جدول.',
        examples: [
          {
            code: "-- Single row\nINSERT INTO employees (name, salary, dept_id)\nVALUES ('Alice', 6000, 2);\n\n-- Multiple rows\nINSERT INTO employees (name, salary)\nVALUES ('Bob', 5000),\n       ('Carol', 7000);",
          },
        ],
      },
      {
        id: 'update',
        labelEn: 'UPDATE',
        labelAr: 'UPDATE',
        descEn: 'Modifies existing rows. Always use WHERE to avoid updating every row in the table.',
        descAr: 'يعدّل الصفوف الموجودة. استخدم WHERE دائماً لتجنب تحديث كل صفوف الجدول.',
        examples: [
          {
            code: 'UPDATE employees\nSET salary  = salary * 1.1,\n    dept_id = 3\nWHERE department = \'Sales\'\n  AND salary < 5000;',
          },
        ],
      },
      {
        id: 'delete',
        labelEn: 'DELETE',
        labelAr: 'DELETE',
        descEn: 'Removes rows from a table. Without WHERE, all rows are deleted. Always double-check your condition.',
        descAr: 'يحذف صفوفاً من جدول. بدون WHERE تُحذف كل الصفوف. تحقق دائماً من الشرط قبل التنفيذ.',
        examples: [
          {
            code: "DELETE FROM employees\nWHERE id = 42;\n\nDELETE FROM orders\nWHERE status = 'cancelled'\n  AND created_at < '2023-01-01';",
          },
        ],
      },
    ],
  },
  {
    groupEn: 'Transactions',
    groupAr: 'المعاملات',
    entries: [
      {
        id: 'commit',
        labelEn: 'BEGIN / COMMIT',
        labelAr: 'BEGIN / COMMIT',
        descEn: 'BEGIN starts a transaction block. COMMIT saves all changes made since BEGIN permanently.',
        descAr: 'BEGIN يبدأ كتلة معاملة. COMMIT يحفظ كل التغييرات المُجراة منذ BEGIN بشكل دائم.',
        examples: [
          {
            code: 'BEGIN;\n  UPDATE accounts\n    SET balance = balance - 500\n    WHERE id = 1;\n  UPDATE accounts\n    SET balance = balance + 500\n    WHERE id = 2;\nCOMMIT;',
          },
        ],
      },
      {
        id: 'rollback',
        labelEn: 'ROLLBACK',
        labelAr: 'ROLLBACK',
        descEn: 'Undoes all changes made in the current transaction, reverting to the state before BEGIN.',
        descAr: 'يتراجع عن كل التغييرات في المعاملة الحالية، ويعود إلى الحالة قبل BEGIN.',
        examples: [
          {
            code: 'BEGIN;\n  DELETE FROM orders WHERE customer_id = 99;\n  -- Oops, wrong customer!\nROLLBACK;   -- nothing was deleted',
          },
        ],
      },
      {
        id: 'savepoint',
        labelEn: 'SAVEPOINT',
        labelAr: 'SAVEPOINT',
        descEn: 'Creates a named checkpoint inside a transaction so you can roll back to that point without cancelling the whole transaction.',
        descAr: 'ينشئ نقطة تفتيش مسمّاة داخل المعاملة لتتمكن من التراجع إليها دون إلغاء المعاملة كلها.',
        examples: [
          {
            code: "BEGIN;\n  INSERT INTO logs VALUES ('step 1');\n  SAVEPOINT step1;\n  INSERT INTO logs VALUES ('step 2');\n  ROLLBACK TO SAVEPOINT step1;\n  -- step 2 undone, step 1 still there\nCOMMIT;",
          },
        ],
      },
    ],
  },
  {
    groupEn: 'Misc & Casting',
    groupAr: 'متفرقات وتحويل الأنواع',
    entries: [
      {
        id: 'cast',
        labelEn: 'CAST / ::',
        labelAr: 'CAST / ::',
        descEn: 'Converts a value from one data type to another. :: is the PostgreSQL shorthand.',
        descAr: 'يحوّل قيمة من نوع بيانات إلى آخر. :: هو الصياغة المختصرة في PostgreSQL.',
        examples: [
          {
            code: "-- Standard SQL\nSELECT CAST('2024-01-15' AS DATE);\nSELECT CAST(price AS INTEGER);\n\n-- PostgreSQL shorthand\nSELECT '2024-01-15'::DATE;\nSELECT price::INTEGER;",
          },
        ],
      },
      {
        id: 'views',
        labelEn: 'CREATE VIEW',
        labelAr: 'CREATE VIEW',
        descEn: 'A view is a saved query that acts like a virtual table. It does not store data — it reruns the query each time.',
        descAr: 'المنظور (View) هو استعلام محفوظ يعمل كجدول افتراضي. لا يخزن بيانات — يُعيد تشغيل الاستعلام في كل مرة.',
        examples: [
          {
            code: "CREATE VIEW active_employees AS\n  SELECT * FROM employees\n  WHERE status = 'active';\n\n-- Use it like a table\nSELECT * FROM active_employees\nWHERE department = 'IT';\n\nDROP VIEW IF EXISTS active_employees;",
          },
        ],
      },
      {
        id: 'explain',
        labelEn: 'EXPLAIN',
        labelAr: 'EXPLAIN',
        descEn: 'Shows the execution plan for a query without running it. EXPLAIN ANALYZE actually runs it and shows real timings.',
        descAr: 'يُظهر خطة تنفيذ الاستعلام دون تشغيله. EXPLAIN ANALYZE يُشغّله فعلياً ويُظهر الأوقات الحقيقية.',
        examples: [
          {
            code: 'EXPLAIN\nSELECT * FROM employees WHERE dept_id = 2;\n\nEXPLAIN ANALYZE\nSELECT * FROM orders WHERE total > 1000;',
          },
        ],
      },
    ],
  },
];

// Flat list of all entries for quick lookup
const ALL_ENTRIES: (Entry & { groupEn: string; groupAr: string })[] = GROUPS.flatMap(g =>
  g.entries.map(e => ({ ...e, groupEn: g.groupEn, groupAr: g.groupAr }))
);

interface CheatSheetProps {
  onClose: () => void;
}

export function CheatSheet({ onClose }: CheatSheetProps) {
  const { lang, isRTL } = useLanguage();
  const [selectedId, setSelectedId] = useState(ALL_ENTRIES[0].id);

  const selected = ALL_ENTRIES.find(e => e.id === selectedId)!;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Window */}
      <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden w-[95vw] max-w-5xl h-[90vh] ${isRTL ? 'direction-rtl' : ''}`}>

        {/* Title bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className={`flex items-center gap-2.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                {lang === 'ar' ? 'ورقة مرجعية SQL' : 'SQL Cheat Sheet'}
              </h2>
              <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight">
                {lang === 'ar' ? 'من الأساسيات إلى المتقدم' : 'Basic to Advanced Reference'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body: sidebar + content */}
        <div className={`flex flex-1 overflow-hidden ${isRTL ? 'flex-row-reverse' : ''}`}>

          {/* Left nav */}
          <nav className={`w-52 flex-shrink-0 overflow-y-auto bg-gray-50 dark:bg-gray-800/60 ${isRTL ? 'border-l' : 'border-r'} border-gray-200 dark:border-gray-700 py-3`}>
            {GROUPS.map(group => (
              <div key={group.groupEn} className="mb-1">
                <p className={`px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 ${isRTL ? 'text-right' : ''}`}>
                  {lang === 'ar' ? group.groupAr : group.groupEn}
                </p>
                {group.entries.map(entry => {
                  const isActive = entry.id === selectedId;
                  return (
                    <button
                      key={entry.id}
                      onClick={() => setSelectedId(entry.id)}
                      className={`w-full px-4 py-1.5 text-xs transition-colors ${isRTL ? 'text-right' : 'text-left'} ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold border-r-2 border-indigo-500'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200'
                      }`}
                    >
                      {lang === 'ar' ? entry.labelAr : entry.labelEn}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Right content */}
          <div className={`flex-1 overflow-y-auto p-8 ${isRTL ? 'text-right' : ''}`}>
            {/* Breadcrumb */}
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              {lang === 'ar' ? selected.groupAr : selected.groupEn}
              {' › '}
              {lang === 'ar' ? selected.labelAr : selected.labelEn}
            </p>

            {/* Statement heading */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-mono">
              {lang === 'ar' ? selected.labelAr : selected.labelEn}
            </h1>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-7" dir="auto">
              {lang === 'ar' ? selected.descAr : selected.descEn}
            </p>

            {/* Examples */}
            <div className="space-y-5">
              {selected.examples.map((ex, i) => {
                const exTitle = lang === 'ar' ? ex.titleAr : ex.titleEn;
                return (
                  <div key={i}>
                    {exTitle && (
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                        {lang === 'ar' ? 'مثال' : 'Example'}{selected.examples.length > 1 ? ` ${i + 1}` : ''} — {exTitle}
                      </p>
                    )}
                    {!exTitle && selected.examples.length > 1 && (
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                        {lang === 'ar' ? `مثال ${i + 1}` : `Example ${i + 1}`}
                      </p>
                    )}
                    {!exTitle && selected.examples.length === 1 && (
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                        {lang === 'ar' ? 'مثال' : 'Example'}
                      </p>
                    )}
                    <pre className="text-sm font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl px-5 py-4 overflow-x-auto whitespace-pre leading-relaxed border border-indigo-100 dark:border-indigo-900/60 text-left" dir="ltr">
                      {ex.code}
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
