import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface Result {
  columns: string[];
  rows: (string | number | null)[][];
}

interface Example {
  titleEn?: string;
  titleAr?: string;
  code: string;
  result?: Result;
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

  // ─────────────────────────────────────────
  // 1. FOUNDATIONS
  // ─────────────────────────────────────────
  {
    groupEn: '1 · Foundations',
    groupAr: '١ · الأساسيات',
    entries: [
      {
        id: 'select',
        labelEn: 'SELECT',
        labelAr: 'SELECT',
        descEn: 'Retrieves columns from one or more tables. The foundation of every SQL query.',
        descAr: 'يجلب أعمدة من جدول واحد أو أكثر. هو أساس كل استعلام SQL.',
        examples: [
          { titleEn: 'Select specific columns', titleAr: 'تحديد أعمدة بعينها',
            code: 'SELECT name, salary\nFROM employees;',
            result: { columns: ['name', 'salary'], rows: [['Alice', 6000], ['Bob', 4500], ['Carol', 7200]] } },
          { titleEn: 'Select all columns', titleAr: 'تحديد جميع الأعمدة',
            code: 'SELECT * FROM employees;',
            result: { columns: ['id', 'name', 'department', 'salary'], rows: [[1, 'Alice', 'Sales', 6000], [2, 'Bob', 'IT', 4500], [3, 'Carol', 'HR', 7200]] } },
        ],
      },
      {
        id: 'where',
        labelEn: 'WHERE',
        labelAr: 'WHERE',
        descEn: 'Filters rows based on a condition. Only rows that satisfy the condition are returned.',
        descAr: 'يصفّي الصفوف بناءً على شرط. تُرجع فقط الصفوف التي تحقق الشرط.',
        examples: [
          { titleEn: 'Filter by a value', titleAr: 'التصفية بقيمة',
            code: "SELECT name, salary\nFROM employees\nWHERE department = 'Sales';",
            result: { columns: ['name', 'salary'], rows: [['Alice', 6000], ['David', 5500]] } },
          { titleEn: 'Numeric comparison', titleAr: 'مقارنة رقمية',
            code: 'SELECT name, salary\nFROM employees\nWHERE salary > 5000;',
            result: { columns: ['name', 'salary'], rows: [['Alice', 6000], ['Carol', 7200]] } },
        ],
      },
      {
        id: 'order-by',
        labelEn: 'ORDER BY',
        labelAr: 'ORDER BY',
        descEn: 'Sorts the result set by one or more columns, ascending (ASC) or descending (DESC).',
        descAr: 'يرتّب نتائج الاستعلام حسب عمود أو أكثر، تصاعدياً (ASC) أو تنازلياً (DESC).',
        examples: [
          { titleEn: 'Sort by salary descending', titleAr: 'الترتيب بالراتب تنازلياً',
            code: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC;',
            result: { columns: ['name', 'salary'], rows: [['Carol', 7200], ['Alice', 6000], ['David', 5500], ['Bob', 4500]] } },
          { titleEn: 'Sort by multiple columns', titleAr: 'الترتيب بأعمدة متعددة',
            code: 'SELECT name, department, salary\nFROM employees\nORDER BY department ASC, salary DESC;',
            result: { columns: ['name', 'department', 'salary'], rows: [['Carol', 'HR', 7200], ['Bob', 'IT', 4500], ['Alice', 'Sales', 6000], ['David', 'Sales', 5500]] } },
        ],
      },
      {
        id: 'limit',
        labelEn: 'LIMIT / OFFSET',
        labelAr: 'LIMIT / OFFSET',
        descEn: 'LIMIT restricts the number of rows returned. OFFSET skips the first N rows (useful for pagination).',
        descAr: 'LIMIT يحدد عدد الصفوف المُرجعة. OFFSET يتخطى أول N صفوف (مفيد للتصفح بالصفحات).',
        examples: [
          { titleEn: 'Top 5 highest salaries', titleAr: 'أعلى 5 رواتب',
            code: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 5;',
            result: { columns: ['name', 'salary'], rows: [['Carol', 7200], ['Alice', 6000], ['David', 5500], ['Bob', 4500], ['Eve', 3800]] } },
          { titleEn: 'Page 2 (rows 11–20)', titleAr: 'الصفحة الثانية (الصفوف 11–20)',
            code: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 10 OFFSET 10;',
            result: { columns: ['name', 'salary'], rows: [['Kevin', 3000], ['Lisa', 2800], ['Mike', 2700], ['Nina', 2600], ['Oscar', 2500]] } },
        ],
      },
      {
        id: 'distinct',
        labelEn: 'DISTINCT',
        labelAr: 'DISTINCT',
        descEn: 'Removes duplicate rows from the result set, returning only unique values.',
        descAr: 'يزيل الصفوف المكررة من النتائج، ويُرجع فقط القيم الفريدة.',
        examples: [
          { code: 'SELECT DISTINCT department\nFROM employees;',
            result: { columns: ['department'], rows: [['HR'], ['IT'], ['Marketing'], ['Sales']] } },
        ],
      },
      {
        id: 'alias',
        labelEn: 'AS (Alias)',
        labelAr: 'AS (اسم مستعار)',
        descEn: 'Gives a column or table a temporary name to make results more readable.',
        descAr: 'يمنح عموداً أو جدولاً اسماً مؤقتاً لجعل النتائج أكثر وضوحاً.',
        examples: [
          { titleEn: 'Column alias', titleAr: 'اسم مستعار للعمود',
            code: 'SELECT name,\n       salary * 12 AS annual_salary\nFROM employees;',
            result: { columns: ['name', 'annual_salary'], rows: [['Alice', 72000], ['Bob', 54000], ['Carol', 86400]] } },
          { titleEn: 'Table alias', titleAr: 'اسم مستعار للجدول',
            code: 'SELECT e.name, d.name AS dept_name\nFROM employees e\nJOIN departments d ON e.dept_id = d.id;' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 2. FILTERING & OPERATORS
  // ─────────────────────────────────────────
  {
    groupEn: '2 · Filtering & Operators',
    groupAr: '٢ · التصفية والعوامل',
    entries: [
      {
        id: 'and-or',
        labelEn: 'AND / OR / NOT',
        labelAr: 'AND / OR / NOT',
        descEn: 'Combines multiple conditions. AND requires all to be true; OR requires at least one; NOT inverts a condition.',
        descAr: 'يجمع شروطاً متعددة. AND يتطلب تحقق الجميع؛ OR يكفي تحقق واحد؛ NOT يعكس الشرط.',
        examples: [
          { titleEn: 'AND — both conditions must match', titleAr: 'AND — يجب أن يتحقق الشرطان',
            code: "SELECT name FROM employees\nWHERE department = 'Sales'\n  AND salary > 4000;",
            result: { columns: ['name'], rows: [['Alice'], ['David']] } },
          { titleEn: 'OR / NOT', titleAr: 'OR / NOT',
            code: "SELECT name FROM employees\nWHERE department = 'HR'\n   OR department = 'IT';\n\nSELECT name FROM employees\nWHERE NOT department = 'Finance';",
            result: { columns: ['name'], rows: [['Bob'], ['Carol'], ['Eve'], ['Frank']] } },
        ],
      },
      {
        id: 'in',
        labelEn: 'IN / NOT IN',
        labelAr: 'IN / NOT IN',
        descEn: 'Checks if a value matches any value in a list. Cleaner alternative to multiple OR conditions.',
        descAr: 'يتحقق إذا كانت القيمة تتطابق مع أي قيمة في قائمة. بديل أنظف من شروط OR المتعددة.',
        examples: [
          { titleEn: 'Match a list', titleAr: 'مطابقة قائمة',
            code: "SELECT name FROM employees\nWHERE department IN ('Sales', 'HR', 'IT');",
            result: { columns: ['name'], rows: [['Alice'], ['Bob'], ['Carol'], ['David'], ['Eve'], ['Frank']] } },
          { titleEn: 'Exclude a list', titleAr: 'استبعاد قائمة',
            code: "SELECT name FROM employees\nWHERE department NOT IN ('Finance', 'Legal');",
            result: { columns: ['name'], rows: [['Alice'], ['Bob'], ['Carol'], ['David'], ['Eve'], ['Frank']] } },
        ],
      },
      {
        id: 'between',
        labelEn: 'BETWEEN',
        labelAr: 'BETWEEN',
        descEn: 'Filters rows where a value falls within an inclusive range (both endpoints are included).',
        descAr: 'يصفّي الصفوف التي تقع قيمتها ضمن نطاق شامل للطرفين.',
        examples: [
          { code: 'SELECT name, salary\nFROM employees\nWHERE salary BETWEEN 3000 AND 7000;',
            result: { columns: ['name', 'salary'], rows: [['Bob', 4500], ['Eve', 3800], ['Alice', 6000], ['David', 5500]] } },
        ],
      },
      {
        id: 'like',
        labelEn: 'LIKE / ILIKE',
        labelAr: 'LIKE / ILIKE',
        descEn: 'Matches a string pattern. % matches any sequence of characters; _ matches exactly one character. ILIKE is case-insensitive (PostgreSQL).',
        descAr: 'يطابق نمطاً نصياً. % يمثّل أي تسلسل من الحروف؛ _ يمثّل حرفاً واحداً بالضبط. ILIKE لا يفرّق بين الحالات (PostgreSQL).',
        examples: [
          { code: "-- Starts with 'A'\nSELECT name FROM employees WHERE name LIKE 'A%';\n\n-- Contains 'son'\nSELECT name FROM employees WHERE name LIKE '%son%';\n\n-- Case-insensitive (PostgreSQL)\nSELECT name FROM employees WHERE name ILIKE 'alice';",
            result: { columns: ['name (LIKE A%)'], rows: [['Alice'], ['Amanda'], ['Andrew']] } },
        ],
      },
      {
        id: 'is-null',
        labelEn: 'IS NULL / IS NOT NULL',
        labelAr: 'IS NULL / IS NOT NULL',
        descEn: 'Checks whether a column value is NULL (missing/unknown). You cannot use = NULL — you must use IS NULL.',
        descAr: 'يتحقق إذا كانت قيمة العمود NULL (مفقودة/غير معروفة). لا يمكن استخدام = NULL — يجب استخدام IS NULL.',
        examples: [
          { code: '-- Employees with no manager\nSELECT name FROM employees\nWHERE manager_id IS NULL;\n\n-- Employees who have a phone number\nSELECT name FROM employees\nWHERE phone IS NOT NULL;',
            result: { columns: ['name (IS NULL)', 'name (IS NOT NULL)'], rows: [['Carol', 'Alice'], ['Frank', 'Bob'], [null, 'David']] } },
        ],
      },
      {
        id: 'all-any',
        labelEn: 'ALL / ANY / SOME',
        labelAr: 'ALL / ANY / SOME',
        descEn: 'Compare a value against a set returned by a subquery. ANY (= SOME) is true if at least one value matches; ALL is true only if every value matches.',
        descAr: 'يقارن قيمة بمجموعة مُرجعة من استعلام فرعي. ANY (= SOME) صحيح إذا طابقت قيمة واحدة على الأقل؛ ALL صحيح فقط إذا طابقت كل القيم.',
        examples: [
          { titleEn: 'ANY — higher than at least one manager', titleAr: 'ANY — أعلى من مدير واحد على الأقل',
            code: "SELECT name, salary FROM employees\nWHERE salary > ANY (\n  SELECT salary FROM employees\n  WHERE role = 'manager'\n);",
            result: { columns: ['name', 'salary'], rows: [['Alice', 6000], ['Carol', 7200], ['Frank', 9500]] } },
          { titleEn: 'ALL — higher than every manager', titleAr: 'ALL — أعلى من كل المدراء',
            code: "SELECT name, salary FROM employees\nWHERE salary > ALL (\n  SELECT salary FROM employees\n  WHERE role = 'manager'\n);",
            result: { columns: ['name', 'salary'], rows: [['Frank', 9500]] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 3. AGGREGATION & GROUPING
  // ─────────────────────────────────────────
  {
    groupEn: '3 · Aggregation & Grouping',
    groupAr: '٣ · التجميع والتصنيف',
    entries: [
      {
        id: 'count',
        labelEn: 'COUNT',
        labelAr: 'COUNT',
        descEn: 'Counts rows. COUNT(*) counts all rows; COUNT(col) skips NULL values.',
        descAr: 'يعدّ الصفوف. COUNT(*) يعدّ كل الصفوف؛ COUNT(col) يتجاهل قيم NULL.',
        examples: [
          { code: 'SELECT COUNT(*) AS total_employees\nFROM employees;\n\nSELECT COUNT(DISTINCT department) AS dept_count\nFROM employees;',
            result: { columns: ['total_employees', 'dept_count'], rows: [[12, 4]] } },
        ],
      },
      {
        id: 'sum-avg',
        labelEn: 'SUM / AVG',
        labelAr: 'SUM / AVG',
        descEn: 'SUM adds up all values in a column. AVG computes the arithmetic mean. Both ignore NULL values.',
        descAr: 'SUM يجمع كل القيم في عمود. AVG يحسب المتوسط الحسابي. كلاهما يتجاهل قيم NULL.',
        examples: [
          { code: 'SELECT SUM(salary) AS total_payroll,\n       AVG(salary) AS avg_salary\nFROM employees;',
            result: { columns: ['total_payroll', 'avg_salary'], rows: [[63500, 5291.67]] } },
        ],
      },
      {
        id: 'min-max',
        labelEn: 'MIN / MAX',
        labelAr: 'MIN / MAX',
        descEn: 'MIN returns the smallest value; MAX returns the largest. Works on numbers, dates, and strings.',
        descAr: 'MIN يُرجع أصغر قيمة؛ MAX يُرجع أكبر قيمة. يعمل على الأرقام والتواريخ والنصوص.',
        examples: [
          { code: 'SELECT MIN(salary) AS lowest,\n       MAX(salary) AS highest\nFROM employees;',
            result: { columns: ['lowest', 'highest'], rows: [[3200, 9500]] } },
        ],
      },
      {
        id: 'group-by',
        labelEn: 'GROUP BY',
        labelAr: 'GROUP BY',
        descEn: 'Groups rows that share the same value in a column, so aggregate functions are applied per group.',
        descAr: 'يجمّع الصفوف التي لها نفس القيمة في عمود، ليُطبَّق التجميع على كل مجموعة.',
        examples: [
          { titleEn: 'Count and average per department', titleAr: 'العدد والمتوسط لكل قسم',
            code: 'SELECT department,\n       COUNT(*)    AS headcount,\n       AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department;',
            result: { columns: ['department', 'headcount', 'avg_salary'], rows: [['HR', 3, 6200], ['IT', 4, 5800], ['Marketing', 2, 4500], ['Sales', 3, 5766.67]] } },
        ],
      },
      {
        id: 'having',
        labelEn: 'HAVING',
        labelAr: 'HAVING',
        descEn: 'Filters groups after GROUP BY — like WHERE but for aggregated results.',
        descAr: 'يصفّي المجموعات بعد GROUP BY — مثل WHERE لكن على نتائج التجميع.',
        examples: [
          { titleEn: 'Departments with average salary above 5000', titleAr: 'الأقسام بمتوسط راتب فوق 5000',
            code: 'SELECT department, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department\nHAVING AVG(salary) > 5000;',
            result: { columns: ['department', 'avg_salary'], rows: [['HR', 6200], ['IT', 5800], ['Sales', 5766.67]] } },
        ],
      },
      {
        id: 'string-agg',
        labelEn: 'STRING_AGG / GROUP_CONCAT',
        labelAr: 'STRING_AGG / GROUP_CONCAT',
        descEn: 'Concatenates values from multiple rows into a single string with a separator. Called GROUP_CONCAT in MySQL/SQLite.',
        descAr: 'يدمج قيم صفوف متعددة في نص واحد مع فاصل. يُسمى GROUP_CONCAT في MySQL/SQLite.',
        examples: [
          { titleEn: 'List employee names per department', titleAr: 'قائمة الموظفين لكل قسم',
            code: '-- PostgreSQL\nSELECT department,\n       STRING_AGG(name, \', \' ORDER BY name) AS members\nFROM employees\nGROUP BY department;\n\n-- MySQL / SQLite\nSELECT department,\n       GROUP_CONCAT(name ORDER BY name) AS members\nFROM employees\nGROUP BY department;',
            result: { columns: ['department', 'members'], rows: [['HR', 'Carol, Eve, Frank'], ['IT', 'Bob, Dave'], ['Sales', 'Alice, David, George']] } },
        ],
      },
      {
        id: 'rollup-cube',
        labelEn: 'ROLLUP / CUBE / GROUPING SETS',
        labelAr: 'ROLLUP / CUBE / GROUPING SETS',
        descEn: 'Extensions to GROUP BY for multi-dimensional aggregation. ROLLUP produces subtotals along a hierarchy; CUBE produces all combinations.',
        descAr: 'امتدادات لـ GROUP BY للتجميع متعدد الأبعاد. ROLLUP ينتج مجاميع فرعية؛ CUBE ينتج كل التركيبات.',
        examples: [
          { titleEn: 'ROLLUP — subtotals per dept + grand total', titleAr: 'ROLLUP — مجاميع فرعية + كلي',
            code: 'SELECT department, job_title, SUM(salary) AS total\nFROM employees\nGROUP BY ROLLUP(department, job_title);',
            result: { columns: ['department', 'job_title', 'total'], rows: [['HR', 'Analyst', 11400], ['HR', 'Manager', 9500], ['HR', null, 20900], ['IT', 'Engineer', 16300], ['IT', null, 16300], [null, null, 37200]] } },
          { titleEn: 'CUBE — every combination', titleAr: 'CUBE — كل التركيبات',
            code: 'SELECT region, product, SUM(sales)\nFROM sales_data\nGROUP BY CUBE(region, product);',
            result: { columns: ['region', 'product', 'SUM(sales)'], rows: [['East', 'Widget', 12000], ['East', 'Gadget', 8500], ['East', null, 20500], ['West', 'Widget', 9300], ['West', 'Gadget', 7200], ['West', null, 16500], [null, 'Widget', 21300], [null, 'Gadget', 15700], [null, null, 37000]] } },
        ],
      },
      {
        id: 'filter-clause',
        labelEn: 'FILTER (aggregate)',
        labelAr: 'FILTER (داخل التجميع)',
        descEn: 'Adds a WHERE condition to a single aggregate function without affecting the rest of the query. PostgreSQL / SQL Server 2022+ / SQLite 3.30+.',
        descAr: 'يضيف شرط WHERE لدالة تجميع واحدة دون التأثير على بقية الاستعلام.',
        examples: [
          { titleEn: 'Count active vs. inactive in one pass', titleAr: 'عدّ النشطين وغير النشطين معاً',
            code: "SELECT\n  COUNT(*) AS total,\n  COUNT(*) FILTER (WHERE status = 'active')   AS active,\n  COUNT(*) FILTER (WHERE status = 'inactive') AS inactive,\n  AVG(salary) FILTER (WHERE department = 'IT') AS it_avg\nFROM employees;",
            result: { columns: ['total', 'active', 'inactive', 'it_avg'], rows: [[12, 9, 3, 7350]] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 4. JOINS
  // ─────────────────────────────────────────
  {
    groupEn: '4 · Joins',
    groupAr: '٤ · الوصلات (Joins)',
    entries: [
      {
        id: 'inner-join',
        labelEn: 'INNER JOIN',
        labelAr: 'INNER JOIN',
        descEn: 'Returns only rows that have a matching value in both tables.',
        descAr: 'يُرجع فقط الصفوف التي لها قيمة مطابقة في كلا الجدولين.',
        examples: [
          { code: 'SELECT e.name, d.name AS department\nFROM employees e\nINNER JOIN departments d\n  ON e.dept_id = d.id;',
            result: { columns: ['name', 'department'], rows: [['Alice', 'Sales'], ['Bob', 'IT'], ['Carol', 'HR'], ['David', 'Sales']] } },
        ],
      },
      {
        id: 'left-join',
        labelEn: 'LEFT JOIN',
        labelAr: 'LEFT JOIN',
        descEn: 'Returns all rows from the left table, plus matching rows from the right. Non-matching right rows appear as NULL.',
        descAr: 'يُرجع كل صفوف الجدول الأيسر، مع المطابق من الأيمن. الصفوف غير المتطابقة تظهر كـ NULL.',
        examples: [
          { titleEn: 'Customers with or without orders', titleAr: 'العملاء بطلبات أو بدونها',
            code: 'SELECT c.name, o.id AS order_id\nFROM customers c\nLEFT JOIN orders o\n  ON c.id = o.customer_id;',
            result: { columns: ['name', 'order_id'], rows: [['Alice', 1001], ['Alice', 1005], ['Bob', 1008], ['Carol', null]] } },
        ],
      },
      {
        id: 'right-join',
        labelEn: 'RIGHT JOIN',
        labelAr: 'RIGHT JOIN',
        descEn: 'Returns all rows from the right table, plus matching rows from the left. Non-matching left rows appear as NULL.',
        descAr: 'يُرجع كل صفوف الجدول الأيمن، مع المطابق من الأيسر. الصفوف غير المتطابقة تظهر كـ NULL.',
        examples: [
          { code: 'SELECT e.name, d.name AS department\nFROM employees e\nRIGHT JOIN departments d\n  ON e.dept_id = d.id;',
            result: { columns: ['name', 'department'], rows: [['Alice', 'Sales'], ['Bob', 'IT'], ['Carol', 'HR'], [null, 'Marketing']] } },
        ],
      },
      {
        id: 'full-join',
        labelEn: 'FULL OUTER JOIN',
        labelAr: 'FULL OUTER JOIN',
        descEn: 'Returns all rows from both tables. Where there is no match, the missing side is NULL.',
        descAr: 'يُرجع كل صفوف الجدولين. حيث لا توجد مطابقة، يكون الجانب المفقود NULL.',
        examples: [
          { code: 'SELECT e.name, d.name AS department\nFROM employees e\nFULL OUTER JOIN departments d\n  ON e.dept_id = d.id;',
            result: { columns: ['name', 'department'], rows: [['Alice', 'Sales'], ['Bob', 'IT'], ['Carol', 'HR'], [null, 'Marketing'], ['Dave', null]] } },
        ],
      },
      {
        id: 'cross-join',
        labelEn: 'CROSS JOIN',
        labelAr: 'CROSS JOIN',
        descEn: 'Produces the Cartesian product — every row in the left table paired with every row in the right.',
        descAr: 'ينتج الضرب الديكارتي — كل صف في الجدول الأيسر مقترن بكل صف في الأيمن.',
        examples: [
          { code: 'SELECT a.color, b.size\nFROM colors a\nCROSS JOIN sizes b;',
            result: { columns: ['color', 'size'], rows: [['Red', 'S'], ['Red', 'M'], ['Red', 'L'], ['Blue', 'S'], ['Blue', 'M'], ['Blue', 'L']] } },
        ],
      },
      {
        id: 'self-join',
        labelEn: 'Self JOIN',
        labelAr: 'Self JOIN',
        descEn: 'Joins a table to itself using aliases. Useful for hierarchical data like employee–manager relationships.',
        descAr: 'يصل الجدول بنفسه باستخدام أسماء مستعارة. مفيد للبيانات الهرمية مثل علاقة الموظف–المدير.',
        examples: [
          { code: 'SELECT e.name  AS employee,\n       m.name  AS manager\nFROM employees e\nJOIN employees m\n  ON e.manager_id = m.id;',
            result: { columns: ['employee', 'manager'], rows: [['Alice', 'Carol'], ['Bob', 'Carol'], ['David', 'Alice'], ['Eve', 'Carol']] } },
        ],
      },
      {
        id: 'natural-join',
        labelEn: 'NATURAL JOIN',
        labelAr: 'NATURAL JOIN',
        descEn: 'Automatically joins tables on all columns that share the same name. Convenient but fragile — avoid in production when schemas can change.',
        descAr: 'يصل الجداول تلقائياً على كل الأعمدة ذات الاسم المشترك. مريح لكن هش — تجنّبه في الإنتاج عند تغيّر المخططات.',
        examples: [
          { code: '-- Joins on any column with the same name in both tables\nSELECT * FROM employees NATURAL JOIN departments;',
            result: { columns: ['id', 'name', 'dept_id', 'dept_name'], rows: [[1, 'Alice', 2, 'Sales'], [2, 'Bob', 3, 'IT'], [3, 'Carol', 1, 'HR']] } },
        ],
      },
      {
        id: 'lateral-join',
        labelEn: 'LATERAL JOIN',
        labelAr: 'LATERAL JOIN',
        descEn: 'Allows a subquery in FROM to reference columns from preceding tables — like a correlated subquery that can return multiple rows.',
        descAr: 'يتيح لاستعلام فرعي في FROM الإشارة إلى أعمدة من جداول سابقة — مثل استعلام فرعي مرتبط يُرجع صفوفاً متعددة.',
        examples: [
          { titleEn: 'Latest 2 orders per customer', titleAr: 'آخر طلبين لكل عميل',
            code: 'SELECT c.name, o.order_date, o.total\nFROM customers c\nCROSS JOIN LATERAL (\n  SELECT order_date, total\n  FROM orders\n  WHERE customer_id = c.id\n  ORDER BY order_date DESC\n  LIMIT 2\n) o;',
            result: { columns: ['name', 'order_date', 'total'], rows: [['Alice', '2024-04-10', 320], ['Alice', '2024-03-05', 175], ['Bob', '2024-04-01', 890], ['Bob', '2024-02-18', 410]] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 5. SUBQUERIES
  // ─────────────────────────────────────────
  {
    groupEn: '5 · Subqueries',
    groupAr: '٥ · الاستعلامات الفرعية',
    entries: [
      {
        id: 'scalar-subquery',
        labelEn: 'Scalar Subquery',
        labelAr: 'استعلام فرعي مقياسي',
        descEn: 'A subquery that returns exactly one value (one row, one column). Used in WHERE or SELECT.',
        descAr: 'استعلام فرعي يُرجع قيمة واحدة فقط. يُستخدم في WHERE أو SELECT.',
        examples: [
          { titleEn: 'Employees earning above average', titleAr: 'الموظفون فوق المتوسط',
            code: 'SELECT name, salary\nFROM employees\nWHERE salary > (\n  SELECT AVG(salary) FROM employees\n);',
            result: { columns: ['name', 'salary'], rows: [['Alice', 6000], ['Carol', 7200], ['Frank', 9500]] } },
        ],
      },
      {
        id: 'in-subquery',
        labelEn: 'IN Subquery',
        labelAr: 'استعلام فرعي مع IN',
        descEn: 'A subquery that returns a list of values used with IN to filter the outer query.',
        descAr: 'استعلام فرعي يُرجع قائمة قيم تُستخدم مع IN لتصفية الاستعلام الخارجي.',
        examples: [
          { code: 'SELECT name FROM customers\nWHERE id IN (\n  SELECT customer_id\n  FROM orders\n  WHERE total > 1000\n);',
            result: { columns: ['name'], rows: [['Alice'], ['Frank'], ['Grace']] } },
        ],
      },
      {
        id: 'exists',
        labelEn: 'EXISTS / NOT EXISTS',
        labelAr: 'EXISTS / NOT EXISTS',
        descEn: 'EXISTS returns TRUE if the subquery returns at least one row. NOT EXISTS returns TRUE if the subquery returns no rows — the exact opposite.',
        descAr: 'EXISTS يُرجع TRUE إذا أعاد الاستعلام الفرعي صفاً واحداً على الأقل. NOT EXISTS يُرجع TRUE إذا لم يُرجع أي صفوف.',
        examples: [
          { titleEn: 'EXISTS — customers who placed at least one order', titleAr: 'EXISTS — عملاء لديهم طلب واحد على الأقل',
            code: 'SELECT name FROM customers c\nWHERE EXISTS (\n  SELECT 1 FROM orders o\n  WHERE o.customer_id = c.id\n);',
            result: { columns: ['name'], rows: [['Alice'], ['Bob'], ['Frank']] } },
          { titleEn: 'NOT EXISTS — customers who never ordered', titleAr: 'NOT EXISTS — عملاء لم يُقدّموا أي طلب',
            code: 'SELECT name FROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o\n  WHERE o.customer_id = c.id\n);',
            result: { columns: ['name'], rows: [['Carol'], ['Dave']] } },
        ],
      },
      {
        id: 'derived-table',
        labelEn: 'Derived Table (FROM)',
        labelAr: 'جدول مشتق (FROM)',
        descEn: 'A subquery inside FROM that acts as a temporary table for the outer query.',
        descAr: 'استعلام فرعي داخل FROM يعمل كجدول مؤقت للاستعلام الخارجي.',
        examples: [
          { code: 'SELECT dept, avg_salary\nFROM (\n  SELECT department AS dept,\n         AVG(salary)  AS avg_salary\n  FROM employees\n  GROUP BY department\n) AS dept_stats\nWHERE avg_salary > 5000;',
            result: { columns: ['dept', 'avg_salary'], rows: [['HR', 6200], ['IT', 5800], ['Sales', 5766.67]] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 6. SET OPERATIONS
  // ─────────────────────────────────────────
  {
    groupEn: '6 · Set Operations',
    groupAr: '٦ · عمليات المجموعات',
    entries: [
      {
        id: 'union',
        labelEn: 'UNION / UNION ALL',
        labelAr: 'UNION / UNION ALL',
        descEn: 'Combines results of two queries. UNION removes duplicates; UNION ALL keeps them. Both queries must have the same columns.',
        descAr: 'يدمج نتائج استعلامين. UNION يزيل التكرار؛ UNION ALL يحتفظ به. يجب أن يكون لكليهما نفس الأعمدة.',
        examples: [
          { code: '-- Remove duplicates\nSELECT name FROM employees\nUNION\nSELECT name FROM contractors;\n\n-- Keep duplicates\nSELECT city FROM customers\nUNION ALL\nSELECT city FROM suppliers;',
            result: { columns: ['name (UNION — no duplicates)'], rows: [['Alice'], ['Bob'], ['Carol'], ['Dave'], ['Frank']] } },
        ],
      },
      {
        id: 'intersect',
        labelEn: 'INTERSECT',
        labelAr: 'INTERSECT',
        descEn: 'Returns only rows that appear in both query results.',
        descAr: 'يُرجع فقط الصفوف التي تظهر في نتيجتي الاستعلامين.',
        examples: [
          { code: 'SELECT product_id FROM orders_2023\nINTERSECT\nSELECT product_id FROM orders_2024;',
            result: { columns: ['product_id'], rows: [[101], [205], [340]] } },
        ],
      },
      {
        id: 'except',
        labelEn: 'EXCEPT',
        labelAr: 'EXCEPT',
        descEn: 'Returns rows in the first query that do not appear in the second query.',
        descAr: 'يُرجع الصفوف الموجودة في الاستعلام الأول غير الموجودة في الثاني.',
        examples: [
          { code: 'SELECT id FROM all_products\nEXCEPT\nSELECT product_id FROM order_items;',
            result: { columns: ['id'], rows: [[3], [7], [12]] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 7. CONDITIONAL LOGIC
  // ─────────────────────────────────────────
  {
    groupEn: '7 · Conditional Logic',
    groupAr: '٧ · المنطق الشرطي',
    entries: [
      {
        id: 'case-when',
        labelEn: 'CASE WHEN',
        labelAr: 'CASE WHEN',
        descEn: 'An if-then-else expression in SQL. Evaluates conditions top-to-bottom and returns the first matching result.',
        descAr: 'تعبير if-then-else في SQL. يُقيّم الشروط من الأعلى للأسفل ويُرجع أول نتيجة مطابقة.',
        examples: [
          { titleEn: 'Classify salary level', titleAr: 'تصنيف مستوى الراتب',
            code: "SELECT name, salary,\n  CASE\n    WHEN salary >= 8000 THEN 'Senior'\n    WHEN salary >= 5000 THEN 'Mid'\n    ELSE 'Junior'\n  END AS grade\nFROM employees;",
            result: { columns: ['name', 'salary', 'grade'], rows: [['Alice', 6000, 'Mid'], ['Bob', 4500, 'Junior'], ['Carol', 7200, 'Mid'], ['Frank', 9500, 'Senior']] } },
        ],
      },
      {
        id: 'iif',
        labelEn: 'IIF / IF',
        labelAr: 'IIF / IF',
        descEn: 'A shorthand one-line conditional. IIF(condition, true_value, false_value). Works in SQL Server; MySQL uses IF().',
        descAr: 'شرط مختصر في سطر واحد. يعمل في SQL Server؛ MySQL يستخدم IF().',
        examples: [
          { code: "-- SQL Server\nSELECT name,\n       IIF(salary > 5000, 'High', 'Low') AS pay_band\nFROM employees;\n\n-- MySQL\nSELECT name,\n       IF(salary > 5000, 'High', 'Low') AS pay_band\nFROM employees;",
            result: { columns: ['name', 'pay_band'], rows: [['Alice', 'High'], ['Bob', 'Low'], ['Carol', 'High'], ['David', 'High'], ['Eve', 'Low']] } },
        ],
      },
      {
        id: 'coalesce',
        labelEn: 'COALESCE',
        labelAr: 'COALESCE',
        descEn: 'Returns the first non-NULL value from a list of arguments. Useful for providing fallback values.',
        descAr: 'يُرجع أول قيمة غير NULL من قائمة الوسيطات. مفيد لتوفير قيم افتراضية.',
        examples: [
          { code: "SELECT name,\n       COALESCE(phone, mobile, 'N/A') AS contact\nFROM employees;",
            result: { columns: ['name', 'contact'], rows: [['Alice', '555-1001'], ['Bob', '555-2002'], ['Carol', 'N/A'], ['David', '555-4004']] } },
        ],
      },
      {
        id: 'nullif',
        labelEn: 'NULLIF',
        labelAr: 'NULLIF',
        descEn: 'Returns NULL if the two arguments are equal, otherwise returns the first argument. Useful to avoid division by zero.',
        descAr: 'يُرجع NULL إذا تساوى الوسيطان، وإلا يُرجع الوسيط الأول. مفيد لتجنب القسمة على صفر.',
        examples: [
          { code: '-- Avoid division by zero\nSELECT revenue / NULLIF(quantity, 0) AS unit_price\nFROM sales;',
            result: { columns: ['unit_price'], rows: [[25.00], [null], [18.50], [null]] } },
        ],
      },
      {
        id: 'greatest-least',
        labelEn: 'GREATEST / LEAST',
        labelAr: 'GREATEST / LEAST',
        descEn: 'GREATEST returns the largest value from a list of expressions; LEAST returns the smallest. Both ignore NULLs unless all arguments are NULL.',
        descAr: 'GREATEST يُرجع أكبر قيمة من قائمة تعبيرات؛ LEAST يُرجع أصغر قيمة.',
        examples: [
          { code: 'SELECT GREATEST(10, 20, 5)   -- → 20\nSELECT LEAST(10, 20, 5)      -- → 5\n\n-- Cap a discount between 0% and 30%\nSELECT GREATEST(0, LEAST(discount, 0.30)) AS capped\nFROM promotions;',
            result: { columns: ['GREATEST(10,20,5)', 'LEAST(10,20,5)'], rows: [[20, 5]] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 8. CTEs (WITH)
  // ─────────────────────────────────────────
  {
    groupEn: '8 · CTEs (WITH)',
    groupAr: '٨ · CTEs (WITH)',
    entries: [
      {
        id: 'cte',
        labelEn: 'WITH (CTE)',
        labelAr: 'WITH (CTE)',
        descEn: 'A Common Table Expression defines a named temporary result set at the top of a query, making complex queries easier to read.',
        descAr: 'تعبير جدولي مشترك يعرّف مجموعة نتائج مؤقتة مسمّاة في أعلى الاستعلام، مما يجعل الاستعلامات المعقدة أسهل قراءةً.',
        examples: [
          { titleEn: 'Single CTE', titleAr: 'CTE واحد',
            code: 'WITH high_earners AS (\n  SELECT * FROM employees\n  WHERE salary > 8000\n)\nSELECT name, department\nFROM high_earners\nORDER BY salary DESC;',
            result: { columns: ['name', 'department'], rows: [['Frank', 'HR'], ['Grace', 'IT']] } },
          { titleEn: 'Multiple CTEs', titleAr: 'CTEs متعددة',
            code: 'WITH\n  dept_avg AS (\n    SELECT department, AVG(salary) AS avg\n    FROM employees\n    GROUP BY department\n  ),\n  top_depts AS (\n    SELECT department FROM dept_avg\n    WHERE avg > 6000\n  )\nSELECT * FROM top_depts;',
            result: { columns: ['department'], rows: [['HR'], ['IT']] } },
        ],
      },
      {
        id: 'recursive-cte',
        labelEn: 'Recursive CTE',
        labelAr: 'CTE تعاودي',
        descEn: 'A CTE that references itself to traverse hierarchical or graph-like data (e.g., org charts, category trees).',
        descAr: 'CTE يُشير إلى نفسه لاجتياز البيانات الهرمية أو الشبكية (مثل المخططات التنظيمية وأشجار الفئات).',
        examples: [
          { titleEn: 'Employee org chart', titleAr: 'المخطط التنظيمي للموظفين',
            code: 'WITH RECURSIVE org AS (\n  -- Anchor: top-level (no manager)\n  SELECT id, name, manager_id, 0 AS level\n  FROM employees\n  WHERE manager_id IS NULL\n\n  UNION ALL\n\n  -- Recursive: one level down\n  SELECT e.id, e.name, e.manager_id, o.level + 1\n  FROM employees e\n  JOIN org o ON e.manager_id = o.id\n)\nSELECT level, name FROM org ORDER BY level;',
            result: { columns: ['level', 'name'], rows: [[0, 'Carol'], [1, 'Alice'], [1, 'Bob'], [2, 'David'], [2, 'Eve'], [2, 'Frank']] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 9. WINDOW FUNCTIONS
  // ─────────────────────────────────────────
  {
    groupEn: '9 · Window Functions',
    groupAr: '٩ · دوال النوافذ',
    entries: [
      {
        id: 'partition-by',
        labelEn: 'OVER / PARTITION BY',
        labelAr: 'OVER / PARTITION BY',
        descEn: 'OVER turns an aggregate into a window function. PARTITION BY divides rows into groups; the function resets for each partition.',
        descAr: 'OVER يحوّل تجميعاً إلى دالة نافذة. PARTITION BY يقسّم الصفوف إلى مجموعات؛ تُعاد تهيئة الدالة عند كل قسم.',
        examples: [
          { titleEn: 'Syntax template', titleAr: 'قالب الصياغة',
            code: 'function() OVER (\n  PARTITION BY col   -- reset per group\n  ORDER BY col       -- order within window\n  ROWS BETWEEN UNBOUNDED PRECEDING\n            AND CURRENT ROW\n)' },
          { titleEn: 'Salary rank within each department', titleAr: 'ترتيب الراتب داخل كل قسم',
            code: 'SELECT name, department, salary,\n       RANK() OVER (\n         PARTITION BY department\n         ORDER BY salary DESC\n       ) AS dept_rank\nFROM employees;',
            result: { columns: ['name', 'department', 'salary', 'dept_rank'], rows: [['Carol', 'HR', 7200, 1], ['Eve', 'HR', 5800, 2], ['Frank', 'HR', 4200, 3], ['Alice', 'Sales', 6000, 1], ['David', 'Sales', 5500, 2]] } },
        ],
      },
      {
        id: 'row-number',
        labelEn: 'ROW_NUMBER',
        labelAr: 'ROW_NUMBER',
        descEn: 'Assigns a unique sequential integer to each row within a partition. No ties — every row gets a distinct number.',
        descAr: 'يعيّن رقماً تسلسلياً فريداً لكل صف ضمن القسم. لا توجد روابط — كل صف يحصل على رقم مميز.',
        examples: [
          { code: 'SELECT name, department, salary,\n       ROW_NUMBER() OVER (\n         PARTITION BY department\n         ORDER BY salary DESC\n       ) AS row_num\nFROM employees;',
            result: { columns: ['name', 'department', 'salary', 'row_num'], rows: [['Carol', 'HR', 7200, 1], ['Eve', 'HR', 5800, 2], ['Alice', 'Sales', 6000, 1], ['David', 'Sales', 5500, 2], ['Bob', 'IT', 8100, 1]] } },
        ],
      },
      {
        id: 'rank',
        labelEn: 'RANK / DENSE_RANK',
        labelAr: 'RANK / DENSE_RANK',
        descEn: 'RANK leaves gaps after ties (1,1,3). DENSE_RANK does not leave gaps (1,1,2). Both rank rows within a partition.',
        descAr: 'RANK يترك فجوات بعد الروابط (1,1,3). DENSE_RANK لا يترك فجوات (1,1,2).',
        examples: [
          { code: 'SELECT name, salary,\n       RANK()       OVER (ORDER BY salary DESC) AS rnk,\n       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk\nFROM employees;',
            result: { columns: ['name', 'salary', 'rnk', 'dense_rnk'], rows: [['Frank', 9500, 1, 1], ['Carol', 7200, 2, 2], ['Alice', 6000, 3, 3], ['Alice2', 6000, 3, 3], ['David', 5500, 5, 4]] } },
        ],
      },
      {
        id: 'ntile',
        labelEn: 'NTILE',
        labelAr: 'NTILE',
        descEn: 'Divides rows into N roughly equal buckets and assigns each row a bucket number. Useful for percentile-based grouping.',
        descAr: 'يقسّم الصفوف إلى N مجموعات متساوية تقريباً ويعيّن رقم المجموعة لكل صف.',
        examples: [
          { titleEn: 'Salary quartiles', titleAr: 'أرباع الراتب',
            code: 'SELECT name, salary,\n       NTILE(4) OVER (ORDER BY salary) AS quartile\nFROM employees;',
            result: { columns: ['name', 'salary', 'quartile'], rows: [['Eve', 3200, 1], ['Bob2', 4500, 1], ['Bob', 4500, 2], ['David', 5500, 2], ['Alice', 6000, 3], ['Carol', 7200, 3], ['Frank', 9500, 4]] } },
        ],
      },
      {
        id: 'percent-rank',
        labelEn: 'PERCENT_RANK / CUME_DIST',
        labelAr: 'PERCENT_RANK / CUME_DIST',
        descEn: 'PERCENT_RANK gives relative rank as a value 0–1. CUME_DIST gives the fraction of rows with a value ≤ the current row.',
        descAr: 'PERCENT_RANK يعطي الرتبة النسبية كقيمة 0–1. CUME_DIST يعطي نسبة الصفوف بقيمة ≤ الصف الحالي.',
        examples: [
          { code: 'SELECT name, salary,\n       ROUND(PERCENT_RANK() OVER (ORDER BY salary)::NUMERIC, 2) AS pct_rank,\n       ROUND(CUME_DIST()    OVER (ORDER BY salary)::NUMERIC, 2) AS cume_dist\nFROM employees;',
            result: { columns: ['name', 'salary', 'pct_rank', 'cume_dist'], rows: [['Eve', 3200, 0.00, 0.17], ['Bob', 4500, 0.20, 0.33], ['David', 5500, 0.40, 0.50], ['Alice', 6000, 0.60, 0.67], ['Carol', 7200, 0.80, 0.83], ['Frank', 9500, 1.00, 1.00]] } },
        ],
      },
      {
        id: 'lag-lead',
        labelEn: 'LAG / LEAD',
        labelAr: 'LAG / LEAD',
        descEn: 'LAG accesses a value from a previous row; LEAD accesses a value from a following row — without a self-join.',
        descAr: 'LAG يصل إلى قيمة من الصف السابق؛ LEAD يصل إلى قيمة من الصف التالي — دون الحاجة إلى Self JOIN.',
        examples: [
          { titleEn: 'Compare each sale to the previous one', titleAr: 'مقارنة كل مبيعة بالسابقة',
            code: 'SELECT order_date, revenue,\n       LAG(revenue,  1) OVER (ORDER BY order_date) AS prev_revenue,\n       LEAD(revenue, 1) OVER (ORDER BY order_date) AS next_revenue\nFROM daily_sales;',
            result: { columns: ['order_date', 'revenue', 'prev_revenue', 'next_revenue'], rows: [['2024-01-01', 1200, null, 980], ['2024-01-02', 980, 1200, 1450], ['2024-01-03', 1450, 980, 870], ['2024-01-04', 870, 1450, null]] } },
        ],
      },
      {
        id: 'first-last-value',
        labelEn: 'FIRST_VALUE / LAST_VALUE',
        labelAr: 'FIRST_VALUE / LAST_VALUE',
        descEn: 'Return the first or last value in the window frame. For LAST_VALUE you must extend the frame to UNBOUNDED FOLLOWING.',
        descAr: 'يُرجع أول أو آخر قيمة في إطار النافذة. لـ LAST_VALUE يجب توسيع الإطار إلى UNBOUNDED FOLLOWING.',
        examples: [
          { code: 'SELECT name, department, salary,\n  FIRST_VALUE(salary) OVER (\n    PARTITION BY department ORDER BY salary DESC\n  ) AS highest_in_dept,\n  LAST_VALUE(salary) OVER (\n    PARTITION BY department ORDER BY salary DESC\n    ROWS BETWEEN UNBOUNDED PRECEDING\n              AND UNBOUNDED FOLLOWING\n  ) AS lowest_in_dept\nFROM employees;',
            result: { columns: ['name', 'department', 'salary', 'highest_in_dept', 'lowest_in_dept'], rows: [['Carol', 'HR', 7200, 7200, 4200], ['Eve', 'HR', 5800, 7200, 4200], ['Frank', 'HR', 4200, 7200, 4200], ['Alice', 'Sales', 6000, 6000, 4800], ['David', 'Sales', 4800, 6000, 4800]] } },
        ],
      },
      {
        id: 'running-total',
        labelEn: 'Running Total / Moving Avg',
        labelAr: 'مجموع تراكمي / متوسط متحرك',
        descEn: 'Use SUM() or AVG() OVER with ORDER BY to compute a running (cumulative) total or a moving average over a row window.',
        descAr: 'استخدم SUM() أو AVG() مع OVER و ORDER BY لحساب مجموع تراكمي أو متوسط متحرك.',
        examples: [
          { code: 'SELECT order_date, revenue,\n       SUM(revenue) OVER (ORDER BY order_date)\n         AS running_total,\n       AVG(revenue) OVER (\n         ORDER BY order_date\n         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\n       ) AS moving_avg_7d\nFROM daily_sales;',
            result: { columns: ['order_date', 'revenue', 'running_total', 'moving_avg_7d'], rows: [['2024-01-01', 1200, 1200, 1200], ['2024-01-02', 980, 2180, 1090], ['2024-01-03', 1450, 3630, 1210], ['2024-01-04', 870, 4500, 1125]] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 10. STRING FUNCTIONS
  // ─────────────────────────────────────────
  {
    groupEn: '10 · String Functions',
    groupAr: '١٠ · دوال النصوص',
    entries: [
      {
        id: 'upper-lower',
        labelEn: 'UPPER / LOWER',
        labelAr: 'UPPER / LOWER',
        descEn: 'Converts all characters in a string to uppercase or lowercase.',
        descAr: 'يحوّل جميع أحرف النص إلى حروف كبيرة أو صغيرة.',
        examples: [
          { code: "SELECT UPPER('hello')  -- → 'HELLO'\nSELECT LOWER('WORLD')  -- → 'world'",
            result: { columns: ["UPPER('hello')", "LOWER('WORLD')"], rows: [['HELLO', 'world']] } },
        ],
      },
      {
        id: 'left-right',
        labelEn: 'LEFT / RIGHT',
        labelAr: 'LEFT / RIGHT',
        descEn: 'Extracts N characters from the left or right end of a string.',
        descAr: 'يستخرج N حروف من بداية النص أو نهايته.',
        examples: [
          { code: "SELECT LEFT('Hello World', 5)   -- → 'Hello'\nSELECT RIGHT('Hello World', 5)  -- → 'World'\n\n-- Extract area code\nSELECT LEFT(phone, 3) AS area_code FROM customers;",
            result: { columns: ["LEFT('Hello World',5)", "RIGHT('Hello World',5)"], rows: [['Hello', 'World']] } },
        ],
      },
      {
        id: 'length',
        labelEn: 'LENGTH',
        labelAr: 'LENGTH',
        descEn: 'Returns the number of characters in a string.',
        descAr: 'يُرجع عدد الأحرف في النص.',
        examples: [
          { code: "SELECT LENGTH('SQL')       -- → 3\nSELECT name, LENGTH(name) AS name_len\nFROM employees;",
            result: { columns: ['name', 'name_len'], rows: [['Alice', 5], ['Bob', 3], ['Carol', 5], ['David', 5]] } },
        ],
      },
      {
        id: 'substring',
        labelEn: 'SUBSTRING',
        labelAr: 'SUBSTRING',
        descEn: 'Extracts a portion of a string starting at a given position for a given length.',
        descAr: 'يستخرج جزءاً من النص بدءاً من موضع معين لطول معين.',
        examples: [
          { code: "SELECT SUBSTRING('Hello World', 1, 5) -- → 'Hello'\nSELECT SUBSTR('Hello', 2)             -- → 'ello'",
            result: { columns: ["SUBSTRING(1,5)", "SUBSTR(2)"], rows: [['Hello', 'ello']] } },
        ],
      },
      {
        id: 'concat',
        labelEn: 'CONCAT / ||',
        labelAr: 'CONCAT / ||',
        descEn: 'Joins two or more strings together. The || operator is the SQL standard alternative.',
        descAr: 'يدمج نصّين أو أكثر معاً. عامل || هو البديل القياسي في SQL.',
        examples: [
          { code: "SELECT CONCAT(first_name, ' ', last_name) AS full_name\nFROM employees;\n\n-- SQL standard:\nSELECT first_name || ' ' || last_name AS full_name\nFROM employees;",
            result: { columns: ['full_name'], rows: [['Alice Smith'], ['Bob Jones'], ['Carol Brown']] } },
        ],
      },
      {
        id: 'trim',
        labelEn: 'TRIM / LTRIM / RTRIM',
        labelAr: 'TRIM / LTRIM / RTRIM',
        descEn: 'Removes leading and/or trailing whitespace (or specified characters) from a string.',
        descAr: 'يزيل المسافات البيضاء (أو أحرفاً محددة) من بداية و/أو نهاية النص.',
        examples: [
          { code: "SELECT TRIM('  hello  ')  -- → 'hello'\nSELECT LTRIM(' hello')    -- → 'hello'\nSELECT RTRIM('hello ')    -- → 'hello'",
            result: { columns: ['TRIM', 'LTRIM', 'RTRIM'], rows: [['hello', 'hello', 'hello']] } },
        ],
      },
      {
        id: 'replace',
        labelEn: 'REPLACE',
        labelAr: 'REPLACE',
        descEn: 'Replaces all occurrences of a substring within a string with another substring.',
        descAr: 'يستبدل كل تكرارات نص فرعي داخل نص بنص فرعي آخر.',
        examples: [
          { code: "SELECT REPLACE('2024-01-15', '-', '/') -- → '2024/01/15'\n\nSELECT REPLACE(phone, ' ', '') AS clean_phone\nFROM customers;",
            result: { columns: ["REPLACE('-','/')"], rows: [['2024/01/15']] } },
        ],
      },
      {
        id: 'lpad-rpad',
        labelEn: 'LPAD / RPAD',
        labelAr: 'LPAD / RPAD',
        descEn: 'Pads a string on the left or right to a given length with a specified fill character.',
        descAr: 'يُحشو النص من اليسار أو اليمين بحرف محدد حتى يصل إلى الطول المطلوب.',
        examples: [
          { code: "SELECT LPAD('42', 6, '0')    -- → '000042'\nSELECT RPAD('hello', 8, '.') -- → 'hello...'\n\nSELECT LPAD(id::TEXT, 8, '0') AS order_code\nFROM orders;",
            result: { columns: ["LPAD('42',6,'0')", "RPAD('hello',8,'.')"], rows: [['000042', 'hello...']] } },
        ],
      },
      {
        id: 'position',
        labelEn: 'POSITION / CHARINDEX',
        labelAr: 'POSITION / CHARINDEX',
        descEn: 'Returns the 1-based position of the first occurrence of a substring inside a string. Returns 0 if not found.',
        descAr: 'يُرجع موضع أول ظهور (يبدأ من 1) لنص فرعي داخل نص. يُرجع 0 إذا لم يُوجد.',
        examples: [
          { code: "-- Standard SQL\nSELECT POSITION('@' IN 'user@example.com')  -- → 5\n\n-- SQL Server\nSELECT CHARINDEX('@', 'user@example.com')   -- → 5",
            result: { columns: ["POSITION('@')", "CHARINDEX('@')"], rows: [[5, 5]] } },
        ],
      },
      {
        id: 'split-part',
        labelEn: 'SPLIT_PART / SUBSTRING_INDEX',
        labelAr: 'SPLIT_PART / SUBSTRING_INDEX',
        descEn: 'Splits a string by a delimiter and returns the Nth part. SPLIT_PART is PostgreSQL; SUBSTRING_INDEX is MySQL.',
        descAr: 'يقسّم نصاً بفاصل ويُرجع الجزء رقم N.',
        examples: [
          { code: "-- PostgreSQL\nSELECT SPLIT_PART('john.doe@email.com', '@', 1)  -- → 'john.doe'\nSELECT SPLIT_PART('john.doe@email.com', '@', 2)  -- → 'email.com'\n\n-- MySQL\nSELECT SUBSTRING_INDEX('a,b,c,d', ',', 2)        -- → 'a,b'",
            result: { columns: ['SPLIT_PART part 1', 'SPLIT_PART part 2'], rows: [['john.doe', 'email.com']] } },
        ],
      },
      {
        id: 'reverse',
        labelEn: 'REVERSE / REPEAT',
        labelAr: 'REVERSE / REPEAT',
        descEn: 'REVERSE returns the characters of a string in reverse order. REPEAT repeats a string N times.',
        descAr: 'REVERSE يُرجع أحرف النص بترتيب معكوس. REPEAT يكرر نصاً N مرة.',
        examples: [
          { code: "SELECT REVERSE('Hello')       -- → 'olleH'\nSELECT REPEAT('ab', 3)        -- → 'ababab'\nSELECT REPEAT('-', 20)        -- separator line",
            result: { columns: ["REVERSE('Hello')", "REPEAT('ab',3)"], rows: [['olleH', 'ababab']] } },
        ],
      },
      {
        id: 'regexp',
        labelEn: 'REGEXP / SIMILAR TO',
        labelAr: 'REGEXP / SIMILAR TO',
        descEn: 'Matches a string against a regular expression pattern. More powerful than LIKE — supports character classes, repetition, and alternation.',
        descAr: 'يطابق نصاً مع نمط تعبير نمطي. أقوى من LIKE — يدعم فئات الأحرف والتكرار والتبديل.',
        examples: [
          { code: "-- PostgreSQL: ~ operator\nSELECT name FROM employees\nWHERE name ~ '^A.*n$';    -- starts with A, ends with n\n\n-- Case-insensitive\nSELECT name FROM employees\nWHERE name ~* 'alice';\n\n-- MySQL / SQLite\nSELECT name FROM employees\nWHERE name REGEXP '^A.*n$';",
            result: { columns: ['name (^A.*n$)'], rows: [['Alan'], ['Adrian']] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 11. DATE & TIME
  // ─────────────────────────────────────────
  {
    groupEn: '11 · Date & Time',
    groupAr: '١١ · التاريخ والوقت',
    entries: [
      {
        id: 'current-date',
        labelEn: 'CURRENT_DATE / NOW',
        labelAr: 'CURRENT_DATE / NOW',
        descEn: 'Returns the current date or the current date and time.',
        descAr: 'يُرجع التاريخ الحالي أو التاريخ والوقت الحاليين.',
        examples: [
          { code: 'SELECT CURRENT_DATE;        -- date only\nSELECT CURRENT_TIMESTAMP;   -- date + time\nSELECT NOW();               -- date + time',
            result: { columns: ['CURRENT_DATE', 'NOW()'], rows: [['2024-01-15', '2024-01-15 09:32:14']] } },
        ],
      },
      {
        id: 'extract',
        labelEn: 'EXTRACT / DATE_PART',
        labelAr: 'EXTRACT / DATE_PART',
        descEn: 'Extracts a specific part (year, month, day, hour…) from a date or timestamp.',
        descAr: 'يستخرج جزءاً محدداً (سنة، شهر، يوم، ساعة…) من تاريخ أو طابع زمني.',
        examples: [
          { code: "SELECT EXTRACT(YEAR  FROM hire_date) AS yr,\n       EXTRACT(MONTH FROM hire_date) AS mo,\n       EXTRACT(DOW   FROM hire_date) AS day_of_week\nFROM employees;\n\nSELECT DATE_PART('hour', created_at) AS hr\nFROM orders;",
            result: { columns: ['yr', 'mo', 'day_of_week'], rows: [[2021, 3, 1], [2022, 7, 5], [2020, 11, 0]] } },
        ],
      },
      {
        id: 'date-trunc',
        labelEn: 'DATE_TRUNC',
        labelAr: 'DATE_TRUNC',
        descEn: 'Truncates a timestamp to the specified precision (month, year, week…), zeroing out smaller units.',
        descAr: 'يقتطع طابعاً زمنياً إلى الدقة المحددة (شهر، سنة، أسبوع…)، ويجعل الوحدات الأصغر صفراً.',
        examples: [
          { code: "SELECT DATE_TRUNC('month', created_at) AS month_start,\n       COUNT(*) AS orders\nFROM orders\nGROUP BY DATE_TRUNC('month', created_at)\nORDER BY month_start;",
            result: { columns: ['month_start', 'orders'], rows: [['2024-01-01', 42], ['2024-02-01', 38], ['2024-03-01', 57], ['2024-04-01', 61]] } },
        ],
      },
      {
        id: 'date-arithmetic',
        labelEn: 'Date Arithmetic',
        labelAr: 'العمليات الحسابية على التاريخ',
        descEn: 'Add or subtract intervals from dates. Subtract two dates to get the difference in days.',
        descAr: 'يُضيف أو يطرح فترات زمنية من التواريخ. طرح تاريخين يعطي الفرق بالأيام.',
        examples: [
          { code: "-- Add 30 days\nSELECT hire_date + INTERVAL '30 days' FROM employees;\n\n-- Subtract 1 year\nSELECT NOW() - INTERVAL '1 year';\n\n-- Days between dates\nSELECT end_date - start_date AS duration_days\nFROM projects;",
            result: { columns: ['duration_days'], rows: [[90], [180], [45], [365]] } },
        ],
      },
      {
        id: 'datediff',
        labelEn: 'DATEDIFF / DATE_ADD',
        labelAr: 'DATEDIFF / DATE_ADD',
        descEn: 'DATEDIFF calculates the difference between two dates. DATE_ADD adds a time interval to a date. Both are MySQL / SQL Server functions.',
        descAr: 'DATEDIFF يحسب الفرق بين تاريخين. DATE_ADD يضيف فترة زمنية لتاريخ. كلاهما دوال MySQL / SQL Server.',
        examples: [
          { titleEn: 'MySQL', titleAr: 'MySQL',
            code: "SELECT DATEDIFF('2024-12-31', '2024-01-01')    -- → 365\nSELECT DATE_ADD('2024-01-15', INTERVAL 3 MONTH) -- → 2024-04-15\nSELECT DATE_SUB(NOW(), INTERVAL 7 DAY);",
            result: { columns: ['DATEDIFF', 'DATE_ADD +3M'], rows: [[365, '2024-04-15']] } },
          { titleEn: 'SQL Server', titleAr: 'SQL Server',
            code: "SELECT DATEDIFF(DAY, '2024-01-01', '2024-12-31')  -- → 365\nSELECT DATEADD(MONTH, 3, '2024-01-15')            -- → 2024-04-15",
            result: { columns: ['DATEDIFF', 'DATEADD +3M'], rows: [[365, '2024-04-15']] } },
        ],
      },
      {
        id: 'age',
        labelEn: 'AGE() — PostgreSQL',
        labelAr: 'AGE() — PostgreSQL',
        descEn: 'Returns the interval between two timestamps expressed in years, months, and days. Used to compute age or tenure.',
        descAr: 'يُرجع الفترة بين طابعين زمنيين معبّراً عنها بالسنوات والأشهر والأيام. يُستخدم لحساب العمر أو مدة الخدمة.',
        examples: [
          { code: "SELECT AGE(birth_date) AS age FROM employees;\n-- → '32 years 4 months 12 days'\n\nSELECT AGE('2024-12-31', '2020-06-15');\n-- → '4 years 6 months 16 days'",
            result: { columns: ['age'], rows: [['32 years 4 months 12 days'], ['28 years 1 month 5 days'], ['4 years 6 months 16 days']] } },
        ],
      },
      {
        id: 'strftime',
        labelEn: 'STRFTIME — SQLite',
        labelAr: 'STRFTIME — SQLite',
        descEn: 'SQLite\'s date formatting function. Formats a date/time value using format codes similar to C\'s strftime.',
        descAr: 'دالة تنسيق التاريخ في SQLite. تُنسّق قيمة تاريخ/وقت باستخدام رموز تنسيق.',
        examples: [
          { code: "SELECT STRFTIME('%Y-%m-%d', 'now')       -- → '2024-01-15'\nSELECT STRFTIME('%d/%m/%Y', hire_date)   -- → '15/01/2024'\nSELECT STRFTIME('%Y', hire_date) AS yr\nFROM employees;",
            result: { columns: ['yr'], rows: [['2021'], ['2022'], ['2020']] } },
        ],
      },
      {
        id: 'to-char',
        labelEn: 'TO_CHAR / TO_DATE',
        labelAr: 'TO_CHAR / TO_DATE',
        descEn: 'TO_CHAR formats a date or number as a string using a format mask. TO_DATE parses a string into a date.',
        descAr: 'TO_CHAR يُنسّق تاريخاً أو رقماً كنص باستخدام قالب تنسيق. TO_DATE يحوّل نصاً إلى تاريخ.',
        examples: [
          { code: "SELECT TO_CHAR(hire_date, 'DD Mon YYYY')  -- → '15 Jan 2024'\nFROM employees;\n\nSELECT TO_CHAR(salary, 'FM999,999.00')    -- → '6,000.00'\nFROM employees;\n\nSELECT TO_DATE('15-01-2024', 'DD-MM-YYYY');",
            result: { columns: ['TO_CHAR (date)', 'TO_CHAR (salary)'], rows: [['15 Mar 2021', '6,000.00'], ['01 Jul 2022', '4,500.00'], ['22 Nov 2020', '7,200.00']] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 12. MATH & NUMERIC
  // ─────────────────────────────────────────
  {
    groupEn: '12 · Math & Numeric',
    groupAr: '١٢ · الرياضيات والأرقام',
    entries: [
      {
        id: 'round',
        labelEn: 'ROUND / TRUNC',
        labelAr: 'ROUND / TRUNC',
        descEn: 'ROUND rounds a number to N decimal places. TRUNC truncates (cuts off) without rounding.',
        descAr: 'ROUND يقرّب رقماً إلى N منزلة عشرية. TRUNC يقتطع دون تقريب.',
        examples: [
          { code: 'SELECT ROUND(3.14159, 2)   -- → 3.14\nSELECT ROUND(3.567, 0)    -- → 4\nSELECT TRUNC(3.9)         -- → 3',
            result: { columns: ['ROUND(3.14159,2)', 'ROUND(3.567,0)', 'TRUNC(3.9)'], rows: [[3.14, 4, 3]] } },
        ],
      },
      {
        id: 'abs',
        labelEn: 'ABS',
        labelAr: 'ABS',
        descEn: 'Returns the absolute (positive) value of a number.',
        descAr: 'يُرجع القيمة المطلقة (الموجبة) لرقم.',
        examples: [
          { code: 'SELECT ABS(-42)   -- → 42\nSELECT ABS(42)    -- → 42\n\nSELECT ABS(price - cost) AS margin FROM products;',
            result: { columns: ['ABS(-42)', 'ABS(42)'], rows: [[42, 42]] } },
        ],
      },
      {
        id: 'ceil-floor',
        labelEn: 'CEIL / FLOOR',
        labelAr: 'CEIL / FLOOR',
        descEn: 'CEIL rounds up to the nearest integer; FLOOR rounds down.',
        descAr: 'CEIL يقرّب إلى أكبر عدد صحيح؛ FLOOR يقرّب إلى أصغر عدد صحيح.',
        examples: [
          { code: 'SELECT CEIL(4.1)    -- → 5\nSELECT CEIL(-4.9)   -- → -4\nSELECT FLOOR(4.9)   -- → 4\nSELECT FLOOR(-4.1)  -- → -5',
            result: { columns: ['CEIL(4.1)', 'CEIL(-4.9)', 'FLOOR(4.9)', 'FLOOR(-4.1)'], rows: [[5, -4, 4, -5]] } },
        ],
      },
      {
        id: 'mod',
        labelEn: 'MOD / %',
        labelAr: 'MOD / %',
        descEn: 'Returns the remainder after division. Useful for even/odd checks and cyclic operations.',
        descAr: 'يُرجع باقي القسمة. مفيد لفحص الزوجية والعمليات الدورية.',
        examples: [
          { code: 'SELECT MOD(10, 3)     -- → 1\nSELECT 10 % 3         -- → 1\n\n-- Even-numbered rows only\nSELECT * FROM employees WHERE MOD(id, 2) = 0;',
            result: { columns: ['MOD(10,3)', '10 % 3'], rows: [[1, 1]] } },
        ],
      },
      {
        id: 'power-sqrt',
        labelEn: 'POWER / SQRT',
        labelAr: 'POWER / SQRT',
        descEn: 'POWER raises a number to an exponent. SQRT computes the square root.',
        descAr: 'POWER يرفع رقماً إلى أس. SQRT يحسب الجذر التربيعي.',
        examples: [
          { code: 'SELECT POWER(2, 10)   -- → 1024\nSELECT SQRT(144)     -- → 12\n\n-- Euclidean distance\nSELECT SQRT(POWER(x2-x1,2) + POWER(y2-y1,2)) AS dist\nFROM coordinates;',
            result: { columns: ['POWER(2,10)', 'SQRT(144)'], rows: [[1024, 12]] } },
        ],
      },
      {
        id: 'log-ln',
        labelEn: 'LOG / LN / EXP',
        labelAr: 'LOG / LN / EXP',
        descEn: 'LOG computes base-10 (or custom-base) logarithm. LN is the natural logarithm (base e). EXP raises e to a power.',
        descAr: 'LOG يحسب لوغاريتم الأساس 10 أو أساس مخصص. LN هو اللوغاريتم الطبيعي. EXP يرفع e إلى قوة.',
        examples: [
          { code: "SELECT LOG(100)        -- → 2  (base 10)\nSELECT LOG(2, 1024)    -- → 10 (log base 2)\nSELECT LN(EXP(1))      -- → 1  (natural log)\nSELECT EXP(1)          -- → 2.718... (Euler's e)",
            result: { columns: ['LOG(100)', 'LOG(2,1024)', 'LN(EXP(1))', 'EXP(1)'], rows: [[2, 10, 1, '2.718...']] } },
        ],
      },
      {
        id: 'sign',
        labelEn: 'SIGN',
        labelAr: 'SIGN',
        descEn: 'Returns -1 if the number is negative, 0 if zero, and 1 if positive.',
        descAr: 'يُرجع -1 إذا كان الرقم سالباً، 0 إذا كان صفراً، و1 إذا كان موجباً.',
        examples: [
          { code: "SELECT SIGN(-42)   -- → -1\nSELECT SIGN(0)     -- → 0\nSELECT SIGN(99)    -- → 1\n\nSELECT product,\n  CASE SIGN(revenue - cost)\n    WHEN  1 THEN 'Profit'\n    WHEN  0 THEN 'Break-even'\n    WHEN -1 THEN 'Loss'\n  END AS result\nFROM products;",
            result: { columns: ['SIGN(-42)', 'SIGN(0)', 'SIGN(99)'], rows: [[-1, 0, 1]] } },
        ],
      },
      {
        id: 'random',
        labelEn: 'RANDOM / RAND',
        labelAr: 'RANDOM / RAND',
        descEn: 'Generates a random floating-point number between 0 and 1. Use with ORDER BY to shuffle rows.',
        descAr: 'يولّد رقماً عشرياً عشوائياً بين 0 و1. استخدمه مع ORDER BY للترتيب العشوائي.',
        examples: [
          { code: '-- PostgreSQL\nSELECT RANDOM()               -- → 0.573...\nSELECT FLOOR(RANDOM() * 100)  -- random integer 0–99\n\n-- MySQL\nSELECT RAND()\n\n-- Shuffle rows\nSELECT * FROM employees ORDER BY RANDOM() LIMIT 5;',
            result: { columns: ['RANDOM()', 'FLOOR(RANDOM()*100)'], rows: [['0.573...', 57]] } },
        ],
      },
      {
        id: 'cast',
        labelEn: 'CAST / ::',
        labelAr: 'CAST / ::',
        descEn: 'Converts a value from one data type to another. :: is the PostgreSQL shorthand.',
        descAr: 'يحوّل قيمة من نوع بيانات إلى آخر. :: هو الصياغة المختصرة في PostgreSQL.',
        examples: [
          { code: "-- Standard SQL\nSELECT CAST('2024-01-15' AS DATE);\nSELECT CAST(price AS INTEGER);\nSELECT CAST(id AS VARCHAR);\n\n-- PostgreSQL shorthand\nSELECT '2024-01-15'::DATE;\nSELECT price::INTEGER;",
            result: { columns: ['CAST(date)', 'CAST(price→INT)', 'CAST(id→VARCHAR)'], rows: [['2024-01-15', 45, '42']] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 13. DDL — DATA DEFINITION
  // ─────────────────────────────────────────
  {
    groupEn: '13 · DDL — Data Definition',
    groupAr: '١٣ · DDL — تعريف البيانات',
    entries: [
      {
        id: 'create-table',
        labelEn: 'CREATE TABLE',
        labelAr: 'CREATE TABLE',
        descEn: 'Defines a new table with columns, data types, and constraints.',
        descAr: 'يعرّف جدولاً جديداً مع الأعمدة وأنواع البيانات والقيود.',
        examples: [
          { code: 'CREATE TABLE employees (\n  id        INTEGER      PRIMARY KEY,\n  name      VARCHAR(100) NOT NULL,\n  salary    DECIMAL(10,2) DEFAULT 0,\n  dept_id   INTEGER      REFERENCES departments(id),\n  hire_date DATE\n);',
            result: { columns: ['Status'], rows: [['CREATE TABLE']] } },
        ],
      },
      {
        id: 'constraints',
        labelEn: 'Constraints',
        labelAr: 'القيود (Constraints)',
        descEn: 'Rules enforced on columns to maintain data integrity: PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL, DEFAULT.',
        descAr: 'قواعد مفروضة على الأعمدة للحفاظ على سلامة البيانات.',
        examples: [
          { code: "CREATE TABLE orders (\n  id          INTEGER      PRIMARY KEY,\n  customer_id INTEGER      NOT NULL\n                           REFERENCES customers(id),\n  status      VARCHAR(20)  NOT NULL\n                           DEFAULT 'pending'\n                           CHECK (status IN ('pending','shipped','delivered')),\n  total       DECIMAL(10,2) CHECK (total >= 0),\n  email       VARCHAR(255) UNIQUE\n);",
            result: { columns: ['Status'], rows: [['CREATE TABLE']] } },
        ],
      },
      {
        id: 'alter-table',
        labelEn: 'ALTER TABLE',
        labelAr: 'ALTER TABLE',
        descEn: 'Modifies an existing table: add/drop/rename columns or rename the table itself.',
        descAr: 'يعدّل جدولاً موجوداً: يضيف/يحذف/يعيد تسمية أعمدة أو يعيد تسمية الجدول نفسه.',
        examples: [
          { code: '-- Add a column\nALTER TABLE employees ADD COLUMN email VARCHAR(255);\n\n-- Drop a column\nALTER TABLE employees DROP COLUMN email;\n\n-- Rename a column\nALTER TABLE employees RENAME COLUMN salary TO base_salary;',
            result: { columns: ['Status'], rows: [['ALTER TABLE']] } },
        ],
      },
      {
        id: 'drop-table',
        labelEn: 'DROP TABLE',
        labelAr: 'DROP TABLE',
        descEn: 'Permanently removes a table and all its data. IF EXISTS prevents an error if the table does not exist.',
        descAr: 'يحذف جدولاً وكل بياناته بشكل دائم. IF EXISTS يمنع الخطأ إذا لم يكن الجدول موجوداً.',
        examples: [
          { code: 'DROP TABLE IF EXISTS temp_results;',
            result: { columns: ['Status'], rows: [['DROP TABLE']] } },
        ],
      },
      {
        id: 'create-index',
        labelEn: 'CREATE INDEX',
        labelAr: 'CREATE INDEX',
        descEn: 'Creates an index to speed up queries on frequently searched columns.',
        descAr: 'ينشئ فهرساً لتسريع الاستعلامات على الأعمدة الأكثر بحثاً.',
        examples: [
          { code: 'CREATE INDEX idx_emp_dept\n  ON employees(dept_id);\n\nCREATE UNIQUE INDEX idx_emp_email\n  ON employees(email);',
            result: { columns: ['Status'], rows: [['CREATE INDEX']] } },
        ],
      },
      {
        id: 'create-sequence',
        labelEn: 'CREATE SEQUENCE',
        labelAr: 'CREATE SEQUENCE',
        descEn: 'Generates an auto-incrementing series of numbers. Used to produce unique IDs.',
        descAr: 'يولّد سلسلة أرقام تتزايد تلقائياً. يُستخدم لإنتاج معرّفات فريدة.',
        examples: [
          { code: "CREATE SEQUENCE order_id_seq\n  START WITH 1000\n  INCREMENT BY 1;\n\n-- Use it\nINSERT INTO orders (id, customer_id)\nVALUES (NEXTVAL('order_id_seq'), 5);\n\nSELECT CURRVAL('order_id_seq');",
            result: { columns: ['currval'], rows: [[1000]] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 14. DML — DATA MANIPULATION
  // ─────────────────────────────────────────
  {
    groupEn: '14 · DML — Data Manipulation',
    groupAr: '١٤ · DML — معالجة البيانات',
    entries: [
      {
        id: 'insert',
        labelEn: 'INSERT INTO',
        labelAr: 'INSERT INTO',
        descEn: 'Adds one or more rows to a table.',
        descAr: 'يضيف صفاً أو أكثر إلى جدول.',
        examples: [
          { code: "-- Single row\nINSERT INTO employees (name, salary, dept_id)\nVALUES ('Alice', 6000, 2);\n\n-- Multiple rows\nINSERT INTO employees (name, salary)\nVALUES ('Bob', 5000),\n       ('Carol', 7000);\n\n-- Insert from SELECT\nINSERT INTO archive_orders\nSELECT * FROM orders WHERE status = 'closed';",
            result: { columns: ['Rows Affected'], rows: [[1], [2]] } },
        ],
      },
      {
        id: 'update',
        labelEn: 'UPDATE',
        labelAr: 'UPDATE',
        descEn: 'Modifies existing rows. Always use WHERE to avoid updating every row in the table.',
        descAr: 'يعدّل الصفوف الموجودة. استخدم WHERE دائماً لتجنب تحديث كل صفوف الجدول.',
        examples: [
          { code: "UPDATE employees\nSET salary  = salary * 1.1,\n    dept_id = 3\nWHERE department = 'Sales'\n  AND salary < 5000;",
            result: { columns: ['Rows Affected'], rows: [[3]] } },
        ],
      },
      {
        id: 'update-join',
        labelEn: 'UPDATE with JOIN',
        labelAr: 'UPDATE مع JOIN',
        descEn: 'Updates rows in one table based on values from another table. Syntax differs between MySQL and PostgreSQL.',
        descAr: 'يُحدّث صفوفاً في جدول بناءً على قيم من جدول آخر.',
        examples: [
          { titleEn: 'MySQL / SQL Server', titleAr: 'MySQL / SQL Server',
            code: "UPDATE employees e\nJOIN departments d ON e.dept_id = d.id\nSET e.location = d.location\nWHERE d.name = 'Engineering';",
            result: { columns: ['Rows Affected'], rows: [[5]] } },
          { titleEn: 'PostgreSQL (UPDATE FROM)', titleAr: 'PostgreSQL (UPDATE FROM)',
            code: "UPDATE employees e\nSET location = d.location\nFROM departments d\nWHERE e.dept_id = d.id\n  AND d.name = 'Engineering';",
            result: { columns: ['Rows Affected'], rows: [[5]] } },
        ],
      },
      {
        id: 'delete',
        labelEn: 'DELETE',
        labelAr: 'DELETE',
        descEn: 'Removes rows from a table. Without WHERE, all rows are deleted — always double-check your condition.',
        descAr: 'يحذف صفوفاً من جدول. بدون WHERE تُحذف كل الصفوف — تحقق دائماً من الشرط.',
        examples: [
          { code: "DELETE FROM employees\nWHERE id = 42;\n\nDELETE FROM orders\nWHERE status = 'cancelled'\n  AND created_at < '2023-01-01';",
            result: { columns: ['Rows Affected'], rows: [[1], [14]] } },
        ],
      },
      {
        id: 'truncate',
        labelEn: 'TRUNCATE',
        labelAr: 'TRUNCATE',
        descEn: 'Removes all rows from a table instantly. Much faster than DELETE with no WHERE. Cannot be rolled back in most engines.',
        descAr: 'يحذف كل صفوف الجدول فوراً. أسرع بكثير من DELETE بدون WHERE. لا يمكن التراجع عنه في معظم المحركات.',
        examples: [
          { code: 'TRUNCATE TABLE logs;\n\n-- PostgreSQL: restart identity columns\nTRUNCATE TABLE orders RESTART IDENTITY;\n\n-- Truncate multiple tables\nTRUNCATE TABLE orders, order_items;',
            result: { columns: ['Status'], rows: [['TRUNCATE TABLE']] } },
        ],
      },
      {
        id: 'upsert',
        labelEn: 'UPSERT (INSERT ON CONFLICT)',
        labelAr: 'UPSERT (INSERT ON CONFLICT)',
        descEn: 'Inserts a row; if a conflict (duplicate key) occurs, updates the existing row instead.',
        descAr: 'يُدرج صفاً؛ إذا حدث تعارض (مفتاح مكرر) يُحدّث الصف الموجود عوضاً عن ذلك.',
        examples: [
          { titleEn: 'PostgreSQL', titleAr: 'PostgreSQL',
            code: "INSERT INTO products (id, name, price)\nVALUES (1, 'Widget', 9.99)\nON CONFLICT (id)\nDO UPDATE SET\n  name  = EXCLUDED.name,\n  price = EXCLUDED.price;",
            result: { columns: ['Rows Affected'], rows: [[1]] } },
          { titleEn: 'SQLite', titleAr: 'SQLite',
            code: "INSERT OR REPLACE INTO products (id, name, price)\nVALUES (1, 'Widget', 9.99);",
            result: { columns: ['Rows Affected'], rows: [[1]] } },
        ],
      },
      {
        id: 'merge',
        labelEn: 'MERGE',
        labelAr: 'MERGE',
        descEn: 'Synchronises a target table with a source in one statement: INSERT when no match, UPDATE when match, optionally DELETE.',
        descAr: 'يزامن جدول هدف مع مصدر في جملة واحدة: INSERT عند عدم التطابق، UPDATE عند التطابق.',
        examples: [
          { code: 'MERGE INTO inventory AS target\nUSING shipment    AS source\n  ON target.product_id = source.product_id\nWHEN MATCHED THEN\n  UPDATE SET quantity = target.quantity + source.quantity\nWHEN NOT MATCHED THEN\n  INSERT (product_id, quantity)\n  VALUES (source.product_id, source.quantity);',
            result: { columns: ['Rows Updated', 'Rows Inserted'], rows: [[7, 3]] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 15. TRANSACTIONS
  // ─────────────────────────────────────────
  {
    groupEn: '15 · Transactions',
    groupAr: '١٥ · المعاملات',
    entries: [
      {
        id: 'commit',
        labelEn: 'BEGIN / COMMIT',
        labelAr: 'BEGIN / COMMIT',
        descEn: 'BEGIN starts a transaction block. COMMIT saves all changes made since BEGIN permanently.',
        descAr: 'BEGIN يبدأ كتلة معاملة. COMMIT يحفظ كل التغييرات المُجراة منذ BEGIN بشكل دائم.',
        examples: [
          { code: 'BEGIN;\n  UPDATE accounts\n    SET balance = balance - 500\n    WHERE id = 1;\n  UPDATE accounts\n    SET balance = balance + 500\n    WHERE id = 2;\nCOMMIT;',
            result: { columns: ['Status'], rows: [['COMMIT — 2 rows updated']] } },
        ],
      },
      {
        id: 'rollback',
        labelEn: 'ROLLBACK',
        labelAr: 'ROLLBACK',
        descEn: 'Undoes all changes made in the current transaction, reverting to the state before BEGIN.',
        descAr: 'يتراجع عن كل التغييرات في المعاملة الحالية، ويعود إلى الحالة قبل BEGIN.',
        examples: [
          { code: 'BEGIN;\n  DELETE FROM orders WHERE customer_id = 99;\n  -- Oops, wrong customer!\nROLLBACK;   -- nothing was deleted',
            result: { columns: ['Status'], rows: [['ROLLBACK — 0 rows affected']] } },
        ],
      },
      {
        id: 'savepoint',
        labelEn: 'SAVEPOINT',
        labelAr: 'SAVEPOINT',
        descEn: 'Creates a named checkpoint inside a transaction so you can roll back to that point without cancelling the whole transaction.',
        descAr: 'ينشئ نقطة تفتيش مسمّاة داخل المعاملة لتتمكن من التراجع إليها دون إلغاء المعاملة كلها.',
        examples: [
          { code: "BEGIN;\n  INSERT INTO logs VALUES ('step 1');\n  SAVEPOINT step1;\n  INSERT INTO logs VALUES ('step 2');\n  ROLLBACK TO SAVEPOINT step1;\n  -- step 2 undone, step 1 still there\nCOMMIT;",
            result: { columns: ['Status'], rows: [['SAVEPOINT created — step 2 rolled back, step 1 committed']] } },
        ],
      },
      {
        id: 'isolation-levels',
        labelEn: 'Isolation Levels',
        labelAr: 'مستويات العزل',
        descEn: 'Controls how/when changes in a transaction are visible to other concurrent transactions. Higher isolation = fewer anomalies but lower performance.',
        descAr: 'يتحكم في كيفية/متى تكون التغييرات مرئية للمعاملات المتزامنة. العزل الأعلى = أخطاء أقل لكن أداء أبطأ.',
        examples: [
          { titleEn: '4 levels — least to most strict', titleAr: '4 مستويات — من الأقل إلى الأكثر صرامة',
            code: "SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;\n-- Dirty reads allowed (fastest, least safe)\n\nSET TRANSACTION ISOLATION LEVEL READ COMMITTED;\n-- Default in most DBs. No dirty reads.\n\nSET TRANSACTION ISOLATION LEVEL REPEATABLE READ;\n-- Same row read twice = same result.\n\nSET TRANSACTION ISOLATION LEVEL SERIALIZABLE;\n-- Fully isolated (safest, slowest).",
            result: { columns: ['Level', 'Dirty Read', 'Non-repeatable', 'Phantom'], rows: [['READ UNCOMMITTED', 'Yes', 'Yes', 'Yes'], ['READ COMMITTED', 'No', 'Yes', 'Yes'], ['REPEATABLE READ', 'No', 'No', 'Yes'], ['SERIALIZABLE', 'No', 'No', 'No']] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 16. VIEWS & PERFORMANCE
  // ─────────────────────────────────────────
  {
    groupEn: '16 · Views & Performance',
    groupAr: '١٦ · المناظير والأداء',
    entries: [
      {
        id: 'views',
        labelEn: 'CREATE VIEW',
        labelAr: 'CREATE VIEW',
        descEn: 'A view is a saved query that acts like a virtual table. It does not store data — it reruns the query each time.',
        descAr: 'المنظور (View) هو استعلام محفوظ يعمل كجدول افتراضي. لا يخزن بيانات — يُعيد تشغيل الاستعلام في كل مرة.',
        examples: [
          { code: "CREATE VIEW active_employees AS\n  SELECT * FROM employees\n  WHERE status = 'active';\n\n-- Use it like a table\nSELECT * FROM active_employees\nWHERE department = 'IT';\n\nDROP VIEW IF EXISTS active_employees;",
            result: { columns: ['id', 'name', 'department', 'salary'], rows: [[2, 'Bob', 'IT', 4500], [8, 'Grace', 'IT', 8100], [11, 'Ian', 'IT', 6700]] } },
        ],
      },
      {
        id: 'materialized-view',
        labelEn: 'MATERIALIZED VIEW',
        labelAr: 'MATERIALIZED VIEW',
        descEn: 'Like a regular view but stores the query result physically on disk. Must be refreshed manually. Much faster to query for expensive computations.',
        descAr: 'مثل المنظور العادي لكنه يخزن نتيجة الاستعلام فيزيائياً على القرص. يجب تحديثه يدوياً.',
        examples: [
          { code: "CREATE MATERIALIZED VIEW monthly_revenue AS\n  SELECT DATE_TRUNC('month', order_date) AS month,\n         SUM(total) AS revenue\n  FROM orders\n  GROUP BY 1;\n\n-- Refresh when data changes\nREFRESH MATERIALIZED VIEW monthly_revenue;\n\nSELECT * FROM monthly_revenue ORDER BY month;",
            result: { columns: ['month', 'revenue'], rows: [['2024-01-01', 42500], ['2024-02-01', 38200], ['2024-03-01', 57800], ['2024-04-01', 61100]] } },
        ],
      },
      {
        id: 'explain',
        labelEn: 'EXPLAIN',
        labelAr: 'EXPLAIN',
        descEn: 'Shows the execution plan for a query without running it. EXPLAIN ANALYZE actually runs it and shows real timings.',
        descAr: 'يُظهر خطة تنفيذ الاستعلام دون تشغيله. EXPLAIN ANALYZE يُشغّله فعلياً ويُظهر الأوقات الحقيقية.',
        examples: [
          { code: 'EXPLAIN\nSELECT * FROM employees WHERE dept_id = 2;\n\nEXPLAIN ANALYZE\nSELECT * FROM orders WHERE total > 1000;',
            result: { columns: ['QUERY PLAN'], rows: [['Seq Scan on employees  (cost=0.00..1.12 rows=3 width=...)'], ['  Filter: (dept_id = 2)'], ['Planning Time: 0.05 ms'], ['Execution Time: 0.12 ms']] } },
        ],
      },
      {
        id: 'generate-series',
        labelEn: 'GENERATE_SERIES',
        labelAr: 'GENERATE_SERIES',
        descEn: 'PostgreSQL function that generates a set of rows from start to stop with an optional step. Useful for date ranges and test data.',
        descAr: 'دالة PostgreSQL تولّد مجموعة صفوف من البداية إلى النهاية مع خطوة اختيارية.',
        examples: [
          { code: "-- Numbers 1 to 10\nSELECT * FROM GENERATE_SERIES(1, 10);\n\n-- Every day in January 2024\nSELECT day::DATE\nFROM GENERATE_SERIES(\n  '2024-01-01'::DATE,\n  '2024-01-31'::DATE,\n  INTERVAL '1 day'\n) AS t(day);",
            result: { columns: ['generate_series'], rows: [[1], [2], [3], ['...'], [10]] } },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────
  // 17. ADMINISTRATION & SECURITY
  // ─────────────────────────────────────────
  {
    groupEn: '17 · Administration & Security',
    groupAr: '١٧ · الإدارة والأمان',
    entries: [
      {
        id: 'grant-revoke',
        labelEn: 'GRANT / REVOKE',
        labelAr: 'GRANT / REVOKE',
        descEn: 'GRANT gives a user or role permission on a database object. REVOKE removes that permission.',
        descAr: 'GRANT يمنح مستخدماً أو دوراً صلاحية على كائن قاعدة بيانات. REVOKE يسحب تلك الصلاحية.',
        examples: [
          { code: "GRANT SELECT ON employees TO analyst_user;\n\nGRANT SELECT, INSERT, UPDATE, DELETE\n  ON orders TO app_user;\n\nGRANT SELECT ON ALL TABLES IN SCHEMA public TO reader;\n\nREVOKE DELETE ON orders FROM app_user;",
            result: { columns: ['Status'], rows: [['GRANT'], ['GRANT'], ['GRANT'], ['REVOKE']] } },
        ],
      },
      {
        id: 'describe',
        labelEn: 'DESCRIBE / DESC',
        labelAr: 'DESCRIBE / DESC',
        descEn: 'Shows the columns, data types, nullability, and keys of a table. Works in MySQL; SQLite uses PRAGMA.',
        descAr: 'يعرض أعمدة الجدول وأنواع البيانات وقابلية القيم الفارغة والمفاتيح.',
        examples: [
          { titleEn: 'MySQL / MariaDB', titleAr: 'MySQL / MariaDB',
            code: 'DESCRIBE employees;\nDESC employees;',
            result: { columns: ['Field', 'Type', 'Null', 'Key', 'Default'], rows: [['id', 'int', 'NO', 'PRI', null], ['name', 'varchar(100)', 'NO', '', null], ['salary', 'decimal(10,2)', 'YES', '', '0.00'], ['dept_id', 'int', 'YES', 'MUL', null]] } },
          { titleEn: 'SQLite — PRAGMA', titleAr: 'SQLite — PRAGMA',
            code: 'PRAGMA table_info(employees);\n-- Returns: cid, name, type, notnull, dflt_value, pk',
            result: { columns: ['cid', 'name', 'type', 'notnull', 'dflt_value', 'pk'], rows: [[0, 'id', 'INTEGER', 1, null, 1], [1, 'name', 'VARCHAR(100)', 1, null, 0], [2, 'salary', 'DECIMAL(10,2)', 0, '0', 0], [3, 'dept_id', 'INTEGER', 0, null, 0]] } },
        ],
      },
      {
        id: 'show-tables',
        labelEn: 'SHOW TABLES / \\dt',
        labelAr: 'SHOW TABLES / \\dt',
        descEn: 'Lists all tables in the current database. Syntax differs by engine.',
        descAr: 'يُدرج كل الجداول في قاعدة البيانات الحالية. تختلف الصياغة حسب المحرك.',
        examples: [
          { titleEn: 'MySQL', titleAr: 'MySQL', code: 'SHOW TABLES;',
            result: { columns: ['Tables_in_mydb'], rows: [['customers'], ['departments'], ['employees'], ['orders']] } },
          { titleEn: 'PostgreSQL (psql)', titleAr: 'PostgreSQL (psql)',
            code: '\\dt          -- list tables\n\\dt public.*  -- tables in public schema',
            result: { columns: ['Schema', 'Name', 'Type', 'Owner'], rows: [['public', 'customers', 'table', 'admin'], ['public', 'employees', 'table', 'admin'], ['public', 'orders', 'table', 'admin']] } },
          { titleEn: 'SQLite', titleAr: 'SQLite',
            code: ".tables\n\n-- or via SQL:\nSELECT name FROM sqlite_master\nWHERE type = 'table'\nORDER BY name;",
            result: { columns: ['name'], rows: [['customers'], ['departments'], ['employees'], ['orders']] } },
        ],
      },
      {
        id: 'show-columns',
        labelEn: 'SHOW COLUMNS',
        labelAr: 'SHOW COLUMNS',
        descEn: 'Lists all columns of a table with their type, nullability, default, and key info. MySQL / MariaDB specific.',
        descAr: 'يُدرج كل أعمدة جدول مع نوعها وقابلية القيم الفارغة والقيمة الافتراضية. خاص بـ MySQL / MariaDB.',
        examples: [
          { code: 'SHOW COLUMNS FROM employees;\n\n-- Equivalent\nSHOW FIELDS FROM employees;',
            result: { columns: ['Field', 'Type', 'Null', 'Key', 'Default', 'Extra'], rows: [['id', 'int', 'NO', 'PRI', null, 'auto_increment'], ['name', 'varchar(100)', 'NO', '', null, ''], ['salary', 'decimal(10,2)', 'YES', '', '0.00', ''], ['dept_id', 'int', 'YES', 'MUL', null, '']] } },
        ],
      },
      {
        id: 'information-schema',
        labelEn: 'INFORMATION_SCHEMA',
        labelAr: 'INFORMATION_SCHEMA',
        descEn: 'A standard set of read-only views available in PostgreSQL, MySQL, and SQL Server that expose metadata about all tables, columns, and constraints.',
        descAr: 'مجموعة قياسية من المناظير للقراءة فقط تكشف البيانات الوصفية لكل الجداول والأعمدة والقيود.',
        examples: [
          { titleEn: 'List all tables', titleAr: 'عرض كل الجداول',
            code: "SELECT table_name, table_type\nFROM information_schema.tables\nWHERE table_schema = 'public'\nORDER BY table_name;",
            result: { columns: ['table_name', 'table_type'], rows: [['customers', 'BASE TABLE'], ['departments', 'BASE TABLE'], ['employees', 'BASE TABLE'], ['orders', 'BASE TABLE'], ['active_employees', 'VIEW']] } },
          { titleEn: 'List all columns of a table', titleAr: 'عرض كل أعمدة جدول',
            code: "SELECT column_name,\n       data_type,\n       is_nullable,\n       column_default\nFROM information_schema.columns\nWHERE table_name = 'employees'\nORDER BY ordinal_position;",
            result: { columns: ['column_name', 'data_type', 'is_nullable', 'column_default'], rows: [['id', 'integer', 'NO', null], ['name', 'character varying', 'NO', null], ['salary', 'numeric', 'YES', '0'], ['dept_id', 'integer', 'YES', null]] } },
        ],
      },
      {
        id: 'sqlite-master',
        labelEn: 'sqlite_master (SQLite)',
        labelAr: 'sqlite_master (SQLite)',
        descEn: 'The built-in metadata table in SQLite. Stores the CREATE statements for every table, index, view, and trigger in the database.',
        descAr: 'جدول البيانات الوصفية المدمج في SQLite. يخزن جمل CREATE لكل جدول وفهرس ومنظور ومشغّل.',
        examples: [
          { titleEn: 'List all tables', titleAr: 'عرض كل الجداول',
            code: "SELECT name, sql\nFROM sqlite_master\nWHERE type = 'table'\nORDER BY name;",
            result: { columns: ['name', 'sql'], rows: [['customers', 'CREATE TABLE customers (...)'], ['employees', 'CREATE TABLE employees (...)'], ['orders', 'CREATE TABLE orders (...)']] } },
          { titleEn: 'See CREATE statement for a table', titleAr: 'عرض جملة CREATE لجدول معين',
            code: "SELECT sql\nFROM sqlite_master\nWHERE type = 'table'\n  AND name = 'employees';",
            result: { columns: ['sql'], rows: [['CREATE TABLE employees (id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL, salary DECIMAL(10,2) DEFAULT 0, dept_id INTEGER, hire_date DATE)']] } },
        ],
      },
      {
        id: 'pg-catalog',
        labelEn: 'pg_catalog (PostgreSQL)',
        labelAr: 'pg_catalog (PostgreSQL)',
        descEn: 'PostgreSQL system catalog tables and psql backslash commands for inspecting the database structure.',
        descAr: 'جداول كتالوج نظام PostgreSQL وأوامر psql لفحص بنية قاعدة البيانات.',
        examples: [
          { titleEn: 'psql shortcuts', titleAr: 'اختصارات psql',
            code: '\\d  employees    -- describe table (columns + indexes)\n\\d+ employees    -- verbose: includes storage & comments\n\\df              -- list functions\n\\di              -- list indexes',
            result: { columns: ['Column', 'Type', 'Nullable', 'Default'], rows: [['id', 'integer', 'not null', null], ['name', 'character varying(100)', 'not null', null], ['salary', 'numeric(10,2)', '', '0'], ['dept_id', 'integer', '', null]] } },
          { titleEn: 'Query system catalog', titleAr: 'استعلام كتالوج النظام',
            code: "SELECT tablename, tableowner\nFROM pg_tables\nWHERE schemaname = 'public';",
            result: { columns: ['tablename', 'tableowner'], rows: [['customers', 'admin'], ['departments', 'admin'], ['employees', 'admin'], ['orders', 'admin']] } },
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
  const [search, setSearch] = useState('');

  const query = search.trim().toLowerCase();
  const filteredGroups = query
    ? GROUPS.map(group => ({
        ...group,
        entries: group.entries.filter(e =>
          e.labelEn.toLowerCase().includes(query) ||
          e.labelAr.includes(search.trim()) ||
          e.descEn.toLowerCase().includes(query) ||
          e.descAr.includes(search.trim())
        ),
      })).filter(g => g.entries.length > 0)
    : GROUPS;

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
          <nav className={`w-56 flex-shrink-0 flex flex-col bg-gray-50 dark:bg-gray-800/60 ${isRTL ? 'border-l' : 'border-r'} border-gray-200 dark:border-gray-700`}>
            {/* Search bar */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <div className="relative">
                <svg
                  className={`absolute top-2 ${isRTL ? 'right-2.5' : 'left-2.5'} w-3.5 h-3.5 text-gray-400`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={lang === 'ar' ? 'ابحث... مثال: SELECT' : 'Search... e.g. JOIN'}
                  dir="auto"
                  className={`w-full ${isRTL ? 'pr-8 pl-3' : 'pl-8 pr-3'} py-1.5 text-xs rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-500 focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 transition-colors`}
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className={`absolute top-2 ${isRTL ? 'left-2.5' : 'right-2.5'} text-gray-400 hover:text-gray-600 dark:hover:text-gray-200`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Nav list */}
            <div className="flex-1 overflow-y-auto py-2">
              {filteredGroups.length === 0 ? (
                <p className="px-4 py-6 text-xs text-center text-gray-400 dark:text-gray-500">
                  {lang === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                </p>
              ) : (
                filteredGroups.map(group => (
                  <div key={group.groupEn} className="mb-1">
                    <p className={`px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 ${isRTL ? 'text-right' : ''}`}>
                      {lang === 'ar' ? group.groupAr : group.groupEn}
                    </p>
                    {group.entries.map(entry => {
                      const isActive = entry.id === selectedId;
                      return (
                        <button
                          key={entry.id}
                          onClick={() => { setSelectedId(entry.id); setSearch(''); }}
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
                ))
              )}
            </div>
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
                    {ex.result && (
                      <div className="mt-2 overflow-hidden rounded-xl border border-emerald-200 dark:border-emerald-900/40">
                        <div className="bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 border-b border-emerald-200 dark:border-emerald-900/40 flex items-center gap-1.5">
                          <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18" />
                          </svg>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                            {lang === 'ar' ? 'النتيجة' : 'Result'}
                          </span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs" dir="ltr">
                            <thead>
                              <tr className="bg-emerald-50/60 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30">
                                {ex.result.columns.map(col => (
                                  <th key={col} className="px-3 py-1.5 text-left font-semibold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                                    {col}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {ex.result.rows.map((row, ri) => (
                                <tr key={ri} className="border-b border-emerald-50 dark:border-emerald-900/20 last:border-0 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-colors">
                                  {row.map((cell, ci) => (
                                    <td key={ci} className="px-3 py-1.5 text-gray-700 dark:text-gray-300 font-mono whitespace-nowrap">
                                      {cell === null ? <span className="text-gray-400 dark:text-gray-500 italic">NULL</span> : String(cell)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
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
