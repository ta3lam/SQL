import { Lesson } from '../types';

export const lessonsP4: Lesson[] = [
  // ════════════════════════════════════════════════════
  //  LEVEL 9 — ADVANCED SQL
  // ════════════════════════════════════════════════════
  {
    id: 34,
    title: 'UNION, INTERSECT, EXCEPT',
    titleAr: 'UNION و INTERSECT و EXCEPT',
    description: 'Combine result sets from multiple queries using set operations.',
    descriptionAr: 'دمج نتائج استعلامات متعددة باستخدام عمليات المجموعات.',
    content: `
## Set Operations

SQL supports three ways to combine the results of two queries into a single result set. These are called **set operations**, borrowed from mathematical set theory.

**Rule:** Both queries must have the **same number of columns** with **compatible data types**.

---

## UNION — Combine and Remove Duplicates

\`UNION\` stacks the results of two queries and removes duplicate rows.

\`\`\`sql
-- All unique locations (from departments AND employees' cities)
-- (hypothetical — showing the concept)
SELECT location AS place FROM departments
UNION
SELECT city FROM customers;

-- All contacts: employees AND customers
SELECT name, email, 'Employee' AS source
FROM employees
WHERE email IS NOT NULL
UNION
SELECT name, email, 'Customer' AS source
FROM customers
WHERE email IS NOT NULL
ORDER BY name;
\`\`\`

---

## UNION ALL — Combine Without Removing Duplicates

\`UNION ALL\` is faster because it doesn't check for duplicates. Use it when:
- You know there are no duplicates
- You want to keep duplicates intentionally

\`\`\`sql
-- Combine all names (keep duplicates if any)
SELECT name FROM employees
UNION ALL
SELECT name FROM customers;
-- Returns all 25 + 20 = 45 rows, with duplicates kept
\`\`\`

\`\`\`sql
-- Monthly revenue from all sources
SELECT 'Product' AS source, SUM(total_amount) AS revenue
FROM orders WHERE status = 'delivered'
UNION ALL
SELECT 'Subscription', 0
-- Useful for reports combining different revenue streams
\`\`\`

---

## INTERSECT — Only Rows in BOTH Results

\`INTERSECT\` returns rows that appear in **both** query results.

\`\`\`sql
-- Customers who are BOTH Gold tier AND placed an order this year
SELECT name FROM customers WHERE loyalty_tier = 'Gold'
INTERSECT
SELECT c.name FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.order_date >= '2024-01-01';

-- Names that appear in BOTH employees AND customers tables
SELECT name FROM employees
INTERSECT
SELECT name FROM customers;
-- Returns names that appear in both tables
\`\`\`

---

## EXCEPT — Rows in First But NOT Second

\`EXCEPT\` returns rows from the first query that do **not** appear in the second.

\`\`\`sql
-- Gold customers who have NOT placed an order
SELECT name FROM customers WHERE loyalty_tier = 'Gold'
EXCEPT
SELECT c.name FROM customers c
JOIN orders o ON c.id = o.customer_id;

-- Products never ordered (alternative to NOT IN / NOT EXISTS)
SELECT name FROM products
EXCEPT
SELECT DISTINCT p.name
FROM products p
JOIN order_items oi ON p.id = oi.product_id;
\`\`\`

---

## Practical Uses

\`\`\`sql
-- Audit: find employees missing from payroll (hypothetical example)
SELECT id FROM employees WHERE is_active = 1
EXCEPT
SELECT employee_id FROM payroll_processed;

-- Build a combined contact list
SELECT name, email, 'Team Member' AS type FROM employees WHERE email IS NOT NULL
UNION
SELECT name, email, 'Client' AS type FROM customers WHERE email IS NOT NULL
ORDER BY type, name;

-- Report: orders and their category — include "no category" with UNION
SELECT o.id, cat.name AS category
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
JOIN categories cat ON p.category_id = cat.id
WHERE o.status = 'delivered'
UNION ALL
SELECT o.id, 'Uncategorized'
FROM orders o
WHERE NOT EXISTS (
  SELECT 1 FROM order_items oi WHERE oi.order_id = o.id
)
ORDER BY o.id;
\`\`\`

---

## Set Operations vs JOIN

| Need | Use |
|------|-----|
| Combine rows from same-structure queries | UNION / UNION ALL |
| Find common records between two sets | INTERSECT |
| Exclude a set from another | EXCEPT |
| Match rows on a condition | JOIN |
| Add columns from another table | JOIN |
    `,
    contentAr: `
## عمليات المجموعات Set Operations

يدعم SQL ثلاث طرق لدمج نتائج استعلامين في نتيجة واحدة. تُسمى هذه **عمليات المجموعات**، مستعارة من نظرية المجموعات الرياضية.

**القاعدة:** يجب أن يكون لكلا الاستعلامين **نفس عدد الأعمدة** مع **أنواع بيانات متوافقة**.

---

## UNION — الدمج مع إزالة التكرارات

\`UNION\` يجمع نتائج استعلامين ويُزيل الصفوف المكررة.

\`\`\`sql
-- جميع المواقع الفريدة (من الأقسام ومدن العملاء)
-- (مثال توضيحي)
SELECT location AS place FROM departments
UNION
SELECT city FROM customers;

-- جميع جهات الاتصال: الموظفون والعملاء
SELECT name, email, 'Employee' AS source
FROM employees
WHERE email IS NOT NULL
UNION
SELECT name, email, 'Customer' AS source
FROM customers
WHERE email IS NOT NULL
ORDER BY name;
\`\`\`

---

## UNION ALL — الدمج بدون إزالة التكرارات

\`UNION ALL\` أسرع لأنه لا يتحقق من التكرارات. استخدمه عندما:
- تعلم أنه لا توجد تكرارات
- تريد الاحتفاظ بالتكرارات عمداً

\`\`\`sql
-- دمج جميع الأسماء (الاحتفاظ بالتكرارات إن وُجدت)
SELECT name FROM employees
UNION ALL
SELECT name FROM customers;
-- يُعيد 25 + 20 = 45 صفاً مع الاحتفاظ بالتكرارات
\`\`\`

\`\`\`sql
-- الإيراد الشهري من جميع المصادر
SELECT 'Product' AS source, SUM(total_amount) AS revenue
FROM orders WHERE status = 'delivered'
UNION ALL
SELECT 'Subscription', 0
-- مفيد للتقارير التي تجمع مصادر إيراد مختلفة
\`\`\`

---

## INTERSECT — الصفوف الموجودة في كلا النتيجتين

\`INTERSECT\` يُعيد الصفوف التي تظهر في **كلا** نتيجتي الاستعلام.

\`\`\`sql
-- العملاء الذين هم في مستوى Gold وأيضاً قدّموا طلباً هذا العام
SELECT name FROM customers WHERE loyalty_tier = 'Gold'
INTERSECT
SELECT c.name FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.order_date >= '2024-01-01';

-- الأسماء التي تظهر في جدولَي employees وcustomers
SELECT name FROM employees
INTERSECT
SELECT name FROM customers;
-- يُعيد الأسماء المشتركة في الجدولين
\`\`\`

---

## EXCEPT — الصفوف في الأول غير الموجودة في الثاني

\`EXCEPT\` يُعيد الصفوف من الاستعلام الأول التي **لا تظهر** في الثاني.

\`\`\`sql
-- عملاء Gold الذين لم يُقدّموا طلباً
SELECT name FROM customers WHERE loyalty_tier = 'Gold'
EXCEPT
SELECT c.name FROM customers c
JOIN orders o ON c.id = o.customer_id;

-- المنتجات التي لم يُطلب عليها أبداً (بديل لـ NOT IN / NOT EXISTS)
SELECT name FROM products
EXCEPT
SELECT DISTINCT p.name
FROM products p
JOIN order_items oi ON p.id = oi.product_id;
\`\`\`

---

## استخدامات عملية

\`\`\`sql
-- تدقيق: العثور على موظفين غائبين من كشف الرواتب (مثال افتراضي)
SELECT id FROM employees WHERE is_active = 1
EXCEPT
SELECT employee_id FROM payroll_processed;

-- بناء قائمة جهات اتصال موحدة
SELECT name, email, 'Team Member' AS type FROM employees WHERE email IS NOT NULL
UNION
SELECT name, email, 'Client' AS type FROM customers WHERE email IS NOT NULL
ORDER BY type, name;

-- تقرير: الطلبات وتصنيفها — تضمين "بدون تصنيف" باستخدام UNION
SELECT o.id, cat.name AS category
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
JOIN categories cat ON p.category_id = cat.id
WHERE o.status = 'delivered'
UNION ALL
SELECT o.id, 'Uncategorized'
FROM orders o
WHERE NOT EXISTS (
  SELECT 1 FROM order_items oi WHERE oi.order_id = o.id
)
ORDER BY o.id;
\`\`\`

---

## عمليات المجموعات مقابل JOIN

| الحاجة | استخدم |
|------|-----|
| دمج صفوف من استعلامات بنفس البنية | UNION / UNION ALL |
| إيجاد السجلات المشتركة بين مجموعتين | INTERSECT |
| استبعاد مجموعة من أخرى | EXCEPT |
| مطابقة الصفوف بشرط | JOIN |
| إضافة أعمدة من جدول آخر | JOIN |
    `,
    example: `-- Build a complete contact directory from both employees and customers
SELECT
  name,
  COALESCE(email, 'no-email') AS email,
  'Employee' AS role,
  job_title AS detail
FROM employees
WHERE is_active = 1

UNION ALL

SELECT
  name,
  COALESCE(email, 'no-email') AS email,
  'Customer' AS role,
  loyalty_tier AS detail
FROM customers

ORDER BY role, name;`,
    exercises: [
      {
        id: 1,
        question: 'Using UNION, combine the names from the employees table and the names from the customers table into one list. Include a "source" column showing "Employee" or "Customer".',
        questionAr: 'باستخدام UNION، ادمج أسماء جدول employees وأسماء جدول customers في قائمة واحدة. أضف عموداً "source" يُظهر "Employee" أو "Customer".',
        hint: "SELECT name, 'Employee' AS source FROM employees UNION SELECT name, 'Customer' AS source FROM customers",
        hintAr: "SELECT name, 'Employee' AS source FROM employees UNION SELECT name, 'Customer' AS source FROM customers",
        expectedQuery: "SELECT name, 'Employee' AS source FROM employees UNION SELECT name, 'Customer' AS source FROM customers ORDER BY name",
        checkFunction: (result, q = '') => result.length > 0 && /UNION/i.test(q),
      },
      {
        id: 2,
        question: 'Using EXCEPT, find all customer names that do NOT appear in the employees table.',
        questionAr: 'باستخدام EXCEPT، أوجد جميع أسماء العملاء التي لا تظهر في جدول employees.',
        hint: 'SELECT name FROM customers EXCEPT SELECT name FROM employees',
        hintAr: 'SELECT name FROM customers EXCEPT SELECT name FROM employees',
        expectedQuery: 'SELECT name FROM customers EXCEPT SELECT name FROM employees',
        checkFunction: (result, q = '') => result.length > 0 && /EXCEPT/i.test(q),
      },
    ],
  },

  {
    id: 35,
    title: 'Views',
    titleAr: 'العروض Views',
    description: 'Create reusable virtual tables — simplify complex queries and enforce security.',
    descriptionAr: 'إنشاء جداول افتراضية قابلة لإعادة الاستخدام — لتبسيط الاستعلامات المعقدة وتطبيق الأمان.',
    content: `
## What is a View?

A **view** is a stored SQL query that you can reference like a table. It doesn't store data — every time you query a view, the underlying query is re-executed.

Think of a view as a **named query** or **virtual table**.

---

## Benefits of Views

1. **Simplicity** — hide complex JOINs behind a simple name
2. **Security** — expose only specific columns (hide sensitive data like salary)
3. **Consistency** — everyone uses the same definition for a business concept
4. **Reusability** — write the query once, use it everywhere
5. **Backward compatibility** — rename tables without breaking application queries

---

## CREATE VIEW

\`\`\`sql
-- Create a view combining employee and department info
CREATE VIEW employee_details AS
SELECT
  e.id,
  e.name,
  e.email,
  e.job_title,
  e.salary,
  e.hire_date,
  d.name AS department,
  d.location
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE e.is_active = 1;

-- Now use it like a table
SELECT * FROM employee_details;
SELECT name, salary FROM employee_details WHERE department = 'Engineering';
SELECT department, COUNT(*), AVG(salary) FROM employee_details GROUP BY department;
\`\`\`

\`\`\`sql
-- View for order summary (no need to join every time)
CREATE VIEW order_summary AS
SELECT
  o.id          AS order_id,
  c.name        AS customer,
  c.country,
  c.loyalty_tier,
  o.order_date,
  o.status,
  o.total_amount,
  COUNT(oi.id)  AS line_items
FROM orders o
JOIN customers c   ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, c.name, c.country, c.loyalty_tier, o.order_date, o.status, o.total_amount;

-- Easy to query now
SELECT * FROM order_summary WHERE status = 'delivered' AND total_amount > 500;
\`\`\`

---

## CREATE VIEW IF NOT EXISTS

\`\`\`sql
CREATE VIEW IF NOT EXISTS active_employees AS
SELECT * FROM employees WHERE is_active = 1;
\`\`\`

---

## DROP VIEW

\`\`\`sql
DROP VIEW employee_details;
DROP VIEW IF EXISTS employee_details;  -- safe version
\`\`\`

---

## Updating Views (Updatable Views)

Simple views over a single table can sometimes be updated:

\`\`\`sql
-- Simple view: can update through it
CREATE VIEW active_employees AS
SELECT id, name, salary FROM employees WHERE is_active = 1;

-- This updates the underlying employees table
UPDATE active_employees SET salary = 90000 WHERE id = 2;

-- Complex views (with JOINs, GROUP BY, aggregates) are NOT updatable
\`\`\`

---

## Security Use Case: Hide Salary

\`\`\`sql
-- Full table has salary — only HR should see it
-- Create a view that hides salary for other teams
CREATE VIEW employees_public AS
SELECT id, name, email, job_title, department_id, hire_date
FROM employees;
-- No salary column exposed!

-- Grant this view to other teams instead of the raw table
-- (In production databases, you'd use GRANT SELECT ON employees_public TO team_role)
\`\`\`

---

## Limitations of Views

- Cannot use \`ORDER BY\` inside view definition (in most databases)
- Performance: view is re-executed every time (no caching — use Materialized Views in PostgreSQL for that)
- SQLite: views are read-only (cannot INSERT/UPDATE through a view)
    `,
    contentAr: `
## ما هو العرض View؟

**العرض (view)** هو استعلام SQL مخزَّن يمكنك الرجوع إليه مثل جدول. لا يُخزِّن بيانات — في كل مرة تستعلم عن view، يُعاد تنفيذ الاستعلام الأساسي.

فكّر في الـ view كـ **استعلام مُسمَّى** أو **جدول افتراضي**.

---

## فوائد العروض Views

1. **البساطة** — إخفاء عمليات JOIN المعقدة خلف اسم بسيط
2. **الأمان** — عرض أعمدة محددة فقط (إخفاء البيانات الحساسة كالراتب)
3. **الاتساق** — يستخدم الجميع نفس التعريف لمفهوم تجاري
4. **إعادة الاستخدام** — اكتب الاستعلام مرة واحدة، استخدمه في كل مكان
5. **التوافق مع الإصدارات السابقة** — إعادة تسمية الجداول دون كسر استعلامات التطبيق

---

## CREATE VIEW

\`\`\`sql
-- إنشاء view يدمج معلومات الموظفين والأقسام
CREATE VIEW employee_details AS
SELECT
  e.id,
  e.name,
  e.email,
  e.job_title,
  e.salary,
  e.hire_date,
  d.name AS department,
  d.location
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE e.is_active = 1;

-- الآن استخدمه مثل جدول
SELECT * FROM employee_details;
SELECT name, salary FROM employee_details WHERE department = 'Engineering';
SELECT department, COUNT(*), AVG(salary) FROM employee_details GROUP BY department;
\`\`\`

\`\`\`sql
-- View لملخص الطلبات (لا حاجة لعملية JOIN في كل مرة)
CREATE VIEW order_summary AS
SELECT
  o.id          AS order_id,
  c.name        AS customer,
  c.country,
  c.loyalty_tier,
  o.order_date,
  o.status,
  o.total_amount,
  COUNT(oi.id)  AS line_items
FROM orders o
JOIN customers c   ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, c.name, c.country, c.loyalty_tier, o.order_date, o.status, o.total_amount;

-- سهل الاستعلام الآن
SELECT * FROM order_summary WHERE status = 'delivered' AND total_amount > 500;
\`\`\`

---

## CREATE VIEW IF NOT EXISTS

\`\`\`sql
CREATE VIEW IF NOT EXISTS active_employees AS
SELECT * FROM employees WHERE is_active = 1;
\`\`\`

---

## DROP VIEW

\`\`\`sql
DROP VIEW employee_details;
DROP VIEW IF EXISTS employee_details;  -- النسخة الآمنة
\`\`\`

---

## تحديث العروض (Updatable Views)

يمكن أحياناً تحديث العروض البسيطة على جدول واحد:

\`\`\`sql
-- View بسيط: يمكن التحديث من خلاله
CREATE VIEW active_employees AS
SELECT id, name, salary FROM employees WHERE is_active = 1;

-- هذا يُحدِّث جدول employees الأساسي
UPDATE active_employees SET salary = 90000 WHERE id = 2;

-- العروض المعقدة (مع JOIN أو GROUP BY أو تجميعات) غير قابلة للتحديث
\`\`\`

---

## حالة استخدام الأمان: إخفاء الراتب

\`\`\`sql
-- الجدول الكامل يحتوي على الراتب — يجب أن يراه فريق HR فقط
-- إنشاء view يُخفي الراتب للفرق الأخرى
CREATE VIEW employees_public AS
SELECT id, name, email, job_title, department_id, hire_date
FROM employees;
-- لا يوجد عمود salary ظاهر!

-- امنح هذا الـ view للفرق الأخرى بدلاً من الجدول الأصلي
-- (في قواعد البيانات الإنتاجية: GRANT SELECT ON employees_public TO team_role)
\`\`\`

---

## قيود العروض Views

- لا يمكن استخدام \`ORDER BY\` داخل تعريف الـ view (في معظم قواعد البيانات)
- الأداء: يُعاد تنفيذ الـ view في كل مرة (لا يوجد تخزين مؤقت — استخدم Materialized Views في PostgreSQL لذلك)
- SQLite: العروض للقراءة فقط (لا يمكن INSERT/UPDATE من خلال view)
    `,
    example: `-- Create and use a comprehensive order analysis view
CREATE VIEW IF NOT EXISTS order_analysis AS
SELECT
  o.id,
  c.name            AS customer,
  c.loyalty_tier,
  o.order_date,
  o.status,
  o.total_amount,
  COUNT(oi.id)      AS line_items,
  SUM(oi.quantity)  AS total_units
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id;

-- Use the view
SELECT loyalty_tier, COUNT(*) AS orders, ROUND(AVG(total_amount), 2) AS avg_order
FROM order_analysis
WHERE status = 'delivered'
GROUP BY loyalty_tier
ORDER BY avg_order DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Create a view called "engineering_team" that shows only employees from department_id = 1 with columns: id, name, job_title, salary.',
        questionAr: 'أنشئ view بالاسم "engineering_team" يعرض فقط الموظفين من department_id = 1 مع الأعمدة: id وname وjob_title وsalary.',
        hint: 'CREATE VIEW engineering_team AS SELECT id, name, job_title, salary FROM employees WHERE department_id = 1',
        hintAr: 'CREATE VIEW engineering_team AS SELECT id, name, job_title, salary FROM employees WHERE department_id = 1',
        expectedQuery: 'CREATE VIEW IF NOT EXISTS engineering_team AS SELECT id, name, job_title, salary FROM employees WHERE department_id = 1',
        checkFunction: (_r, q = '') => /CREATE\s+(?:OR\s+REPLACE\s+)?VIEW\s+(?:IF\s+NOT\s+EXISTS\s+)?engineering_team/i.test(q),
      },
      {
        id: 2,
        question: 'Create a view "product_catalog" joining products and categories, showing: product name, price, stock_quantity, and category name.',
        questionAr: 'أنشئ view بالاسم "product_catalog" يربط جدولَي products وcategories، ويعرض: اسم المنتج والسعر وstock_quantity واسم التصنيف.',
        hint: 'JOIN categories ON products.category_id = categories.id',
        hintAr: 'JOIN categories ON products.category_id = categories.id',
        expectedQuery: 'CREATE VIEW IF NOT EXISTS product_catalog AS SELECT p.name, p.price, p.stock_quantity, c.name AS category FROM products p JOIN categories c ON p.category_id = c.id',
        checkFunction: (_r, q = '') => /CREATE\s+(?:OR\s+REPLACE\s+)?VIEW\s+(?:IF\s+NOT\s+EXISTS\s+)?product_catalog/i.test(q),
      },
    ],
  },

  {
    id: 36,
    title: 'Indexes',
    titleAr: 'الفهارس Indexes',
    description: 'Speed up queries with indexes — how they work, when to use them, and their trade-offs.',
    descriptionAr: 'تسريع الاستعلامات باستخدام الفهارس indexes — كيف تعمل، ومتى تستخدمها، ومقايضاتها.',
    content: `
## What is an Index?

An **index** is a separate data structure that the database maintains alongside a table to speed up row lookups. Think of it like a book's index — instead of reading every page to find "SQL", you jump directly to the page number.

Without an index: the DB reads every row (**full table scan**). O(n) time.
With an index: the DB jumps directly to matching rows. O(log n) time.

---

## CREATE INDEX

\`\`\`sql
-- Basic index on a single column
CREATE INDEX idx_employees_department
ON employees (department_id);

-- Index on salary (for range queries and sorting)
CREATE INDEX idx_employees_salary
ON employees (salary);

-- Index on a string column
CREATE INDEX idx_customers_email
ON customers (email);

-- Prevent duplicates AND speed lookups
CREATE UNIQUE INDEX idx_employees_email
ON employees (email);

-- Composite index (multiple columns)
CREATE INDEX idx_orders_customer_date
ON orders (customer_id, order_date);
-- ✅ Helps queries like: WHERE customer_id = X AND order_date > Y
-- ✅ Also helps: WHERE customer_id = X (leftmost column)
-- ❌ Does NOT help: WHERE order_date > Y (second column only)
\`\`\`

---

## When Indexes Help

\`\`\`sql
-- ✅ Equality lookups (= operator)
SELECT * FROM employees WHERE id = 5;            -- PK index
SELECT * FROM customers WHERE email = 'x@y.com'; -- email index

-- ✅ Range queries
SELECT * FROM orders WHERE order_date >= '2024-01-01';

-- ✅ JOIN conditions (foreign keys should always be indexed)
SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id;
-- customer_id should be indexed

-- ✅ ORDER BY (if sorted column is indexed)
SELECT * FROM employees ORDER BY salary DESC;

-- ✅ WHERE + ORDER BY on same column
SELECT * FROM employees WHERE department_id = 1 ORDER BY salary;
\`\`\`

---

## When Indexes DON'T Help

\`\`\`sql
-- ❌ Leading wildcard LIKE
SELECT * FROM employees WHERE name LIKE '%Alice%';
-- Can't use index — must scan from start of string

-- ❌ Functions on indexed column (wraps the column)
SELECT * FROM employees WHERE UPPER(name) = 'ALICE JOHNSON';
-- Breaks the index! Use: WHERE name = 'Alice Johnson' instead

-- ❌ Low-cardinality columns with many matches
SELECT * FROM employees WHERE is_active = 1;  -- 24 of 25 rows!
-- Index is useless — faster to scan the whole table

-- ❌ Very small tables
-- Index overhead > savings for tables with < ~1000 rows
\`\`\`

---

## Index Trade-Offs

| Benefit | Cost |
|---------|------|
| Faster SELECT | Slower INSERT / UPDATE / DELETE |
| Faster ORDER BY | Extra disk/memory storage |
| Faster JOIN | Index maintenance overhead |

Every time you INSERT, UPDATE, or DELETE a row, ALL indexes on that table are updated. On write-heavy tables with many indexes, this can be significant.

---

## DROP INDEX

\`\`\`sql
DROP INDEX idx_employees_department;
DROP INDEX IF EXISTS idx_employees_department;
\`\`\`

---

## Seeing Existing Indexes (SQLite)

\`\`\`sql
-- List all indexes in the database
SELECT name, tbl_name, sql
FROM sqlite_master
WHERE type = 'index'
ORDER BY tbl_name;
\`\`\`

---

## Index Strategy Guidelines

1. **Always index Primary Keys** (done automatically)
2. **Index Foreign Keys** — join performance
3. **Index columns in WHERE clauses** used frequently
4. **Index columns in ORDER BY** if sorting large result sets
5. **Composite indexes**: put most selective column first
6. **Don't over-index** — every index slows writes
7. **Test with EXPLAIN QUERY PLAN** to see if indexes are used:

\`\`\`sql
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE department_id = 1;
-- Shows: SCAN TABLE (no index) or SEARCH TABLE USING INDEX
\`\`\`
    `,
    contentAr: `
## ما هو الفهرس Index؟

**الفهرس (index)** هو هيكل بيانات منفصل تحتفظ به قاعدة البيانات جنباً إلى جنب مع الجدول لتسريع البحث عن الصفوف. فكّر فيه كفهرس الكتاب — بدلاً من قراءة كل صفحة للعثور على "SQL"، تقفز مباشرة إلى رقم الصفحة.

بدون index: قاعدة البيانات تقرأ كل صف (**full table scan**). وقت O(n).
مع index: قاعدة البيانات تقفز مباشرة إلى الصفوف المطابقة. وقت O(log n).

---

## CREATE INDEX

\`\`\`sql
-- index أساسي على عمود واحد
CREATE INDEX idx_employees_department
ON employees (department_id);

-- index على الراتب (لاستعلامات النطاق والترتيب)
CREATE INDEX idx_employees_salary
ON employees (salary);

-- index على عمود نصي
CREATE INDEX idx_customers_email
ON customers (email);

-- منع التكرارات وتسريع البحث
CREATE UNIQUE INDEX idx_employees_email
ON employees (email);

-- index مركّب (أعمدة متعددة)
CREATE INDEX idx_orders_customer_date
ON orders (customer_id, order_date);
-- ✅ يساعد الاستعلامات مثل: WHERE customer_id = X AND order_date > Y
-- ✅ يساعد أيضاً: WHERE customer_id = X (العمود الأول فقط)
-- ❌ لا يساعد: WHERE order_date > Y (العمود الثاني فقط)
\`\`\`

---

## متى تُفيد الفهارس

\`\`\`sql
-- ✅ البحث بالمساواة (عامل =)
SELECT * FROM employees WHERE id = 5;            -- index المفتاح الأساسي
SELECT * FROM customers WHERE email = 'x@y.com'; -- index البريد الإلكتروني

-- ✅ استعلامات النطاق
SELECT * FROM orders WHERE order_date >= '2024-01-01';

-- ✅ شروط JOIN (المفاتيح الخارجية يجب دائماً أن تكون مفهرسة)
SELECT * FROM orders o JOIN customers c ON o.customer_id = c.id;
-- customer_id يجب أن يكون مفهرساً

-- ✅ ORDER BY (إذا كان العمود المُرتَّب مفهرساً)
SELECT * FROM employees ORDER BY salary DESC;

-- ✅ WHERE + ORDER BY على نفس العمود
SELECT * FROM employees WHERE department_id = 1 ORDER BY salary;
\`\`\`

---

## متى لا تُفيد الفهارس

\`\`\`sql
-- ❌ LIKE مع wildcard في البداية
SELECT * FROM employees WHERE name LIKE '%Alice%';
-- لا يمكن استخدام الـ index — يجب المسح من بداية النص

-- ❌ الدوال على عمود مفهرس (تُغلّف العمود)
SELECT * FROM employees WHERE UPPER(name) = 'ALICE JOHNSON';
-- يُكسر الـ index! استخدم: WHERE name = 'Alice Johnson' بدلاً من ذلك

-- ❌ الأعمدة ذات التمييز المنخفض مع كثير من التطابقات
SELECT * FROM employees WHERE is_active = 1;  -- 24 من 25 صفاً!
-- الـ index عديم الفائدة — أسرع مسح الجدول كله

-- ❌ الجداول الصغيرة جداً
-- تكلفة الـ index > الفائدة للجداول التي تحتوي أقل من ~1000 صف
\`\`\`

---

## مقايضات الفهارس Index Trade-Offs

| الفائدة | التكلفة |
|---------|------|
| SELECT أسرع | INSERT / UPDATE / DELETE أبطأ |
| ORDER BY أسرع | تخزين إضافي على القرص/الذاكرة |
| JOIN أسرع | تكلفة صيانة الـ index |

في كل مرة تُنفِّذ فيها INSERT أو UPDATE أو DELETE، تُحدَّث **كل** الفهارس على ذلك الجدول. في الجداول كثيرة الكتابة ذات الفهارس الكثيرة، قد يكون هذا مؤثراً.

---

## DROP INDEX

\`\`\`sql
DROP INDEX idx_employees_department;
DROP INDEX IF EXISTS idx_employees_department;
\`\`\`

---

## عرض الفهارس الموجودة (SQLite)

\`\`\`sql
-- عرض جميع الفهارس في قاعدة البيانات
SELECT name, tbl_name, sql
FROM sqlite_master
WHERE type = 'index'
ORDER BY tbl_name;
\`\`\`

---

## إرشادات استراتيجية الفهارس

1. **فهرَس المفاتيح الأساسية دائماً** (يتم تلقائياً)
2. **فهرَس المفاتيح الخارجية** — لأداء JOIN
3. **فهرَس الأعمدة في جمل WHERE** المستخدمة بكثرة
4. **فهرَس الأعمدة في ORDER BY** عند فرز نتائج كبيرة
5. **الفهارس المركّبة**: ضع العمود الأكثر تمييزاً أولاً
6. **لا تُفرِط في الفهرسة** — كل index يُبطِّئ الكتابة
7. **اختبر باستخدام EXPLAIN QUERY PLAN** لترى إذا كانت الفهارس مستخدمة:

\`\`\`sql
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE department_id = 1;
-- يُظهر: SCAN TABLE (لا index) أو SEARCH TABLE USING INDEX
\`\`\`
    `,
    example: `-- Create indexes to speed up common queries, then verify
CREATE INDEX IF NOT EXISTS idx_employees_dept
ON employees (department_id);

CREATE INDEX IF NOT EXISTS idx_orders_status_date
ON orders (status, order_date);

CREATE INDEX IF NOT EXISTS idx_order_items_product
ON order_items (product_id);

-- Verify indexes exist
SELECT name, tbl_name
FROM sqlite_master
WHERE type = 'index'
ORDER BY tbl_name;`,
    exercises: [
      {
        id: 1,
        question: 'Create an index on the orders table for the customer_id column.',
        questionAr: 'أنشئ index على جدول orders لعمود customer_id.',
        hint: 'CREATE INDEX idx_orders_customer ON orders (customer_id)',
        hintAr: 'CREATE INDEX idx_orders_customer ON orders (customer_id)',
        expectedQuery: 'CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders (customer_id)',
        checkFunction: (_r, q = '') => /CREATE\s+INDEX/i.test(q) && /orders/i.test(q) && /customer_id/i.test(q),
      },
      {
        id: 2,
        question: 'Create a composite index on order_items for (order_id, product_id).',
        questionAr: 'أنشئ index مركّباً على جدول order_items للأعمدة (order_id, product_id).',
        hint: 'CREATE INDEX idx_order_items_order_product ON order_items (order_id, product_id)',
        hintAr: 'CREATE INDEX idx_order_items_order_product ON order_items (order_id, product_id)',
        expectedQuery: 'CREATE INDEX IF NOT EXISTS idx_order_items_order_product ON order_items (order_id, product_id)',
        checkFunction: (_r, q = '') => /CREATE\s+INDEX/i.test(q) && /order_items/i.test(q),
      },
    ],
  },

  {
    id: 37,
    title: 'Transactions',
    titleAr: 'المعاملات Transactions',
    description: 'ACID properties, BEGIN/COMMIT/ROLLBACK — ensure data consistency in multi-step operations.',
    descriptionAr: 'خصائص ACID وأوامر BEGIN/COMMIT/ROLLBACK — لضمان اتساق البيانات في العمليات متعددة الخطوات.',
    content: `
## What is a Transaction?

A **transaction** is a group of SQL operations that are treated as a single unit of work. Either **all operations succeed**, or **all are rolled back** — there's no partial completion.

Classic example: bank transfer
\`\`\`sql
-- Without transaction: if step 2 fails, money disappears!
UPDATE accounts SET balance = balance - 500 WHERE id = 1;  -- Step 1: deduct
UPDATE accounts SET balance = balance + 500 WHERE id = 2;  -- Step 2: add
-- If the server crashes between step 1 and 2: $500 is gone!

-- With transaction: both succeed or both fail
BEGIN;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;
-- If step 2 fails: ROLLBACK restores step 1 automatically
\`\`\`

---

## The ACID Properties

Transactions guarantee four properties:

### A — Atomicity
Either ALL operations complete, or NONE do. No partial state.

### C — Consistency
A transaction moves the database from one valid state to another valid state. All constraints remain satisfied.

### I — Isolation
Concurrent transactions don't see each other's intermediate states. Each transaction appears to run alone.

### D — Durability
Once committed, changes survive system failures (power outage, crash). Data is written to disk.

---

## BEGIN, COMMIT, ROLLBACK

\`\`\`sql
-- Explicit transaction
BEGIN;
  -- Multiple operations
  INSERT INTO orders (customer_id, order_date, status, total_amount)
  VALUES (1, '2024-07-15', 'pending', 499.99);

  INSERT INTO order_items (order_id, product_id, quantity, unit_price)
  VALUES (LAST_INSERT_ROWID(), 1, 1, 499.99);

  UPDATE products
  SET stock_quantity = stock_quantity - 1
  WHERE id = 1;
COMMIT;  -- All three operations committed together

-- ROLLBACK: undo everything since BEGIN
BEGIN;
  DELETE FROM orders WHERE id = 5;
  -- Oops, wrong query!
ROLLBACK;  -- Order id=5 is restored
\`\`\`

---

## SAVEPOINT — Partial Rollback

\`\`\`sql
BEGIN;
  INSERT INTO orders VALUES (100, 1, '2024-01-01', 'pending', 100);
  
  SAVEPOINT after_order;  -- Save current state
  
  INSERT INTO order_items VALUES (200, 100, 1, 1, 1299.99);
  -- Hmm, wrong product
  
  ROLLBACK TO after_order;  -- Roll back to savepoint, order still exists
  
  INSERT INTO order_items VALUES (200, 100, 2, 1, 29.99);  -- Correct product
  
COMMIT;  -- Both insertions (order + correct item) committed
\`\`\`

---

## Auto-Commit

In SQLite and most databases, each statement runs in its own auto-committed transaction unless you explicitly BEGIN:

\`\`\`sql
-- Each statement is its own transaction
UPDATE employees SET salary = 90000 WHERE id = 2;  -- auto-committed immediately
\`\`\`

---

## Transaction Isolation Levels

Different levels of isolation affect how transactions see concurrent changes:

| Level | Dirty Read | Non-repeatable Read | Phantom Read |
|-------|-----------|---------------------|--------------|
| READ UNCOMMITTED | Possible | Possible | Possible |
| READ COMMITTED | ❌ | Possible | Possible |
| REPEATABLE READ | ❌ | ❌ | Possible |
| SERIALIZABLE | ❌ | ❌ | ❌ |

SQLite uses **DEFERRED**, **IMMEDIATE**, or **EXCLUSIVE** lock modes instead of these levels.

---

## Practical Transaction Examples

\`\`\`sql
-- Safe order placement
BEGIN;
  -- 1. Create order
  INSERT INTO orders (customer_id, order_date, status, total_amount)
  VALUES (3, date('now'), 'pending', 349.99);

  -- 2. Add order item
  INSERT INTO order_items (order_id, product_id, quantity, unit_price)
  VALUES (LAST_INSERT_ROWID(), 15, 1, 349.99);

  -- 3. Reduce stock
  UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = 15;

  -- 4. Check stock didn't go negative (SQLite: check manually)
  -- If negative, we'd ROLLBACK
COMMIT;

-- Safe bulk update with verification
BEGIN;
  UPDATE employees SET salary = salary * 1.05 WHERE department_id = 3;
  -- Verify: no salaries went above a cap
  -- SELECT COUNT(*) FROM employees WHERE salary > 200000 → must be 0
COMMIT;  -- or ROLLBACK if something looks wrong
\`\`\`
    `,
    contentAr: `
## ما هي المعاملة Transaction؟

**المعاملة (transaction)** هي مجموعة من عمليات SQL تُعامَل كوحدة عمل واحدة. إما أن **تنجح جميع العمليات**، أو **تُلغى جميعها** — لا يوجد إتمام جزئي.

مثال كلاسيكي: تحويل بنكي
\`\`\`sql
-- بدون transaction: إذا فشلت الخطوة 2، اختفت الأموال!
UPDATE accounts SET balance = balance - 500 WHERE id = 1;  -- الخطوة 1: خصم
UPDATE accounts SET balance = balance + 500 WHERE id = 2;  -- الخطوة 2: إضافة
-- إذا تعطّل الخادم بين الخطوتين 1 و2: اختفل 500 دولار!

-- مع transaction: كلتا العمليتان تنجحان أو تفشلان
BEGIN;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;
-- إذا فشلت الخطوة 2: ROLLBACK يُعيد الخطوة 1 تلقائياً
\`\`\`

---

## خصائص ACID

تضمن المعاملات أربع خصائص:

### A — الذرية Atomicity
إما أن تكتمل **جميع** العمليات، أو لا تكتمل أيٌّ منها. لا حالة جزئية.

### C — الاتساق Consistency
تنقل المعاملة قاعدة البيانات من حالة صالحة إلى حالة صالحة أخرى. تبقى جميع القيود مُستوفاة.

### I — العزل Isolation
المعاملات المتزامنة لا ترى الحالات الوسيطة لبعضها. تبدو كل معاملة وكأنها تعمل بمفردها.

### D — الديمومة Durability
بعد التنفيذ (COMMIT)، تصمد التغييرات أمام أعطال النظام (انقطاع الكهرباء، التعطل). تُكتب البيانات على القرص.

---

## BEGIN وCOMMIT وROLLBACK

\`\`\`sql
-- معاملة صريحة
BEGIN;
  -- عمليات متعددة
  INSERT INTO orders (customer_id, order_date, status, total_amount)
  VALUES (1, '2024-07-15', 'pending', 499.99);

  INSERT INTO order_items (order_id, product_id, quantity, unit_price)
  VALUES (LAST_INSERT_ROWID(), 1, 1, 499.99);

  UPDATE products
  SET stock_quantity = stock_quantity - 1
  WHERE id = 1;
COMMIT;  -- العمليات الثلاث مُنفَّذة معاً

-- ROLLBACK: تراجع عن كل شيء منذ BEGIN
BEGIN;
  DELETE FROM orders WHERE id = 5;
  -- عذراً، استعلام خاطئ!
ROLLBACK;  -- يُستعاد الطلب id=5
\`\`\`

---

## SAVEPOINT — التراجع الجزئي

\`\`\`sql
BEGIN;
  INSERT INTO orders VALUES (100, 1, '2024-01-01', 'pending', 100);

  SAVEPOINT after_order;  -- حفظ الحالة الحالية

  INSERT INTO order_items VALUES (200, 100, 1, 1, 1299.99);
  -- هممم، منتج خاطئ

  ROLLBACK TO after_order;  -- تراجع إلى نقطة الحفظ، لا يزال الطلب موجوداً

  INSERT INTO order_items VALUES (200, 100, 2, 1, 29.99);  -- المنتج الصحيح

COMMIT;  -- كلا الإدراجين (الطلب + العنصر الصحيح) مُنفَّذان
\`\`\`

---

## Auto-Commit

في SQLite ومعظم قواعد البيانات، تعمل كل جملة في معاملتها الخاصة ذات التنفيذ التلقائي ما لم تبدأ بـ BEGIN صريح:

\`\`\`sql
-- كل جملة هي معاملتها الخاصة
UPDATE employees SET salary = 90000 WHERE id = 2;  -- مُنفَّذة تلقائياً فوراً
\`\`\`

---

## مستويات عزل المعاملات Transaction Isolation Levels

تؤثر مستويات العزل المختلفة على كيفية رؤية المعاملات للتغييرات المتزامنة:

| المستوى | Dirty Read | Non-repeatable Read | Phantom Read |
|-------|-----------|---------------------|--------------|
| READ UNCOMMITTED | ممكن | ممكن | ممكن |
| READ COMMITTED | ❌ | ممكن | ممكن |
| REPEATABLE READ | ❌ | ❌ | ممكن |
| SERIALIZABLE | ❌ | ❌ | ❌ |

يستخدم SQLite أوضاع القفل **DEFERRED** و**IMMEDIATE** و**EXCLUSIVE** بدلاً من هذه المستويات.

---

## أمثلة عملية للمعاملات

\`\`\`sql
-- تسجيل طلب بأمان
BEGIN;
  -- 1. إنشاء الطلب
  INSERT INTO orders (customer_id, order_date, status, total_amount)
  VALUES (3, date('now'), 'pending', 349.99);

  -- 2. إضافة عنصر الطلب
  INSERT INTO order_items (order_id, product_id, quantity, unit_price)
  VALUES (LAST_INSERT_ROWID(), 15, 1, 349.99);

  -- 3. تقليل المخزون
  UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = 15;

  -- 4. التحقق من عدم سلبية المخزون (SQLite: التحقق يدوياً)
  -- إذا كان سالباً، سنُنفِّذ ROLLBACK
COMMIT;

-- تحديث مجمّع آمن مع التحقق
BEGIN;
  UPDATE employees SET salary = salary * 1.05 WHERE department_id = 3;
  -- تحقق: لا رواتب تجاوزت الحد الأقصى
  -- SELECT COUNT(*) FROM employees WHERE salary > 200000 → يجب أن يكون 0
COMMIT;  -- أو ROLLBACK إذا بدا شيء خاطئاً
\`\`\`
    `,
    example: `-- Simulate a complete order transaction
BEGIN;

-- Create a new order
INSERT INTO orders (id, customer_id, order_date, status, total_amount)
VALUES (31, 5, date('now'), 'processing', 119.98);

-- Add items
INSERT INTO order_items (id, order_id, product_id, quantity, unit_price)
VALUES (55, 31, 2, 2, 29.99),
       (56, 31, 3, 1, 59.99);

-- Reduce stock
UPDATE products SET stock_quantity = stock_quantity - 2 WHERE id = 2;
UPDATE products SET stock_quantity = stock_quantity - 1 WHERE id = 3;

COMMIT;

-- Verify everything is consistent
SELECT o.id, o.status, o.total_amount,
       SUM(oi.quantity * oi.unit_price) AS calculated_total
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE o.id = 31
GROUP BY o.id;`,
    exercises: [
      {
        id: 1,
        question: 'Write a transaction that inserts a new order (id=32, customer_id=10, today\'s date, status="pending", total_amount=200) and then commits it.',
        questionAr: 'اكتب معاملة transaction تُدرج طلباً جديداً (id=32، customer_id=10، تاريخ اليوم، status="pending"، total_amount=200) ثم تُنفِّذها.',
        hint: "BEGIN; INSERT INTO orders ...; COMMIT;",
        hintAr: "BEGIN; INSERT INTO orders ...; COMMIT;",
        expectedQuery: "BEGIN; INSERT INTO orders (id, customer_id, order_date, status, total_amount) VALUES (32, 10, date('now'), 'pending', 200); COMMIT;",
        checkFunction: (_r, q = '') => /BEGIN/i.test(q) && /INSERT\s+INTO\s+orders/i.test(q) && /COMMIT/i.test(q),
      },
    ],
  },

  {
    id: 38,
    title: 'Window Functions',
    titleAr: 'دوال النافذة Window Functions',
    description: 'ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, and PARTITION BY — analytics without collapsing rows.',
    descriptionAr: 'ROW_NUMBER وRANK وDENSE_RANK وLEAD وLAG وPARTITION BY — تحليلات بدون طي الصفوف.',
    content: `
## Window Functions

**Window functions** perform calculations across a set of rows **related to the current row** — without collapsing the rows into one (unlike GROUP BY aggregates).

The "window" is defined by the \`OVER()\` clause, which specifies which rows to include in the calculation for each row.

---

## The OVER() Clause

\`\`\`sql
function_name() OVER (
  [PARTITION BY column]   -- define groups (like GROUP BY but keeps all rows)
  [ORDER BY column]       -- define order within the window
  [ROWS/RANGE frame]      -- optional: define the window frame
)
\`\`\`

---

## Aggregate Functions as Window Functions

\`\`\`sql
-- Add the overall average salary as a column on each row
SELECT
  name,
  department_id,
  salary,
  AVG(salary) OVER ()              AS company_avg,
  AVG(salary) OVER (PARTITION BY department_id) AS dept_avg,
  salary - AVG(salary) OVER (PARTITION BY department_id) AS vs_dept_avg
FROM employees
ORDER BY department_id, salary DESC;
\`\`\`

Note: the rows are NOT collapsed — you still get 25 rows.

---

## ROW_NUMBER()

Assigns a sequential row number within a partition. Numbers restart for each partition. No ties.

\`\`\`sql
-- Number employees within each department by salary (1 = highest earner)
SELECT
  name,
  department_id,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS row_num
FROM employees
ORDER BY department_id, row_num;

-- Practical: get the highest-paid employee per department
SELECT *
FROM (
  SELECT
    name, department_id, salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn
  FROM employees
) ranked
WHERE rn = 1;
\`\`\`

---

## RANK() and DENSE_RANK()

Both rank rows by value. The difference is how ties are handled:

\`\`\`sql
-- Difference between RANK and DENSE_RANK on tied salaries
SELECT
  name,
  salary,
  RANK()       OVER (ORDER BY salary DESC) AS rank_with_gaps,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- RANK:       1, 1, 3, 4, 4, 6  (skips numbers after ties)
-- DENSE_RANK: 1, 1, 2, 3, 3, 4  (no gaps)
\`\`\`

---

## LEAD() and LAG()

Access the value of a row N positions ahead or behind the current row.

\`\`\`sql
-- Compare each employee's salary with the next and previous
SELECT
  name,
  salary,
  LAG(salary, 1)  OVER (ORDER BY salary) AS prev_salary,
  LEAD(salary, 1) OVER (ORDER BY salary) AS next_salary,
  salary - LAG(salary, 1) OVER (ORDER BY salary) AS salary_gap_from_prev
FROM employees
ORDER BY salary;

-- Default value when no previous/next row:
LAG(salary, 1, 0) OVER (ORDER BY salary)  -- 0 if no previous row
\`\`\`

---

## SUM / COUNT with PARTITION BY

\`\`\`sql
-- Running total of orders per customer over time
SELECT
  id           AS order_id,
  customer_id,
  order_date,
  total_amount,
  SUM(total_amount) OVER (
    PARTITION BY customer_id
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM orders
ORDER BY customer_id, order_date;

-- Percentage of total revenue per status
SELECT
  status,
  total_amount,
  ROUND(total_amount / SUM(total_amount) OVER () * 100, 2) AS pct_of_all
FROM orders
WHERE status = 'delivered'
ORDER BY total_amount DESC;
\`\`\`

---

## NTILE() — Quartiles and Percentiles

\`\`\`sql
-- Divide employees into 4 salary quartiles
SELECT
  name,
  salary,
  NTILE(4) OVER (ORDER BY salary) AS quartile
FROM employees
ORDER BY salary;
-- Quartile 1 = lowest salaries, Quartile 4 = highest
\`\`\`

---

## Window Functions vs GROUP BY

| Feature | GROUP BY | Window Function |
|---------|----------|-----------------|
| Returns one row per group | ✅ Yes | ❌ No — keeps all rows |
| Can access individual row values | ❌ No | ✅ Yes |
| Can compare row to its group | ❌ Hard | ✅ Easy |
| Requires subquery for row-level | ✅ Yes | ❌ No |
    `,
    contentAr: `
## دوال النافذة Window Functions

**دوال النافذة (window functions)** تُجري حسابات عبر مجموعة من الصفوف **المرتبطة بالصف الحالي** — دون طي الصفوف في صف واحد (على عكس تجميعات GROUP BY).

"النافذة" تُحدَّد بجملة \`OVER()\` التي تُحدد الصفوف التي تُشمل في الحساب لكل صف.

---

## جملة OVER()

\`\`\`sql
function_name() OVER (
  [PARTITION BY column]   -- تعريف المجموعات (مثل GROUP BY لكن يحتفظ بجميع الصفوف)
  [ORDER BY column]       -- تعريف الترتيب داخل النافذة
  [ROWS/RANGE frame]      -- اختياري: تعريف إطار النافذة
)
\`\`\`

---

## دوال التجميع كدوال نافذة

\`\`\`sql
-- إضافة متوسط الراتب الإجمالي كعمود على كل صف
SELECT
  name,
  department_id,
  salary,
  AVG(salary) OVER ()              AS company_avg,
  AVG(salary) OVER (PARTITION BY department_id) AS dept_avg,
  salary - AVG(salary) OVER (PARTITION BY department_id) AS vs_dept_avg
FROM employees
ORDER BY department_id, salary DESC;
\`\`\`

ملاحظة: الصفوف **لا تُطوى** — لا تزال تحصل على 25 صفاً.

---

## ROW_NUMBER()

يُعيِّن رقم صف تسلسلي داخل قسم (partition). تبدأ الأرقام من جديد لكل قسم. لا توجد تعادلات.

\`\`\`sql
-- ترقيم الموظفين داخل كل قسم حسب الراتب (1 = أعلى راتب)
SELECT
  name,
  department_id,
  salary,
  ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS row_num
FROM employees
ORDER BY department_id, row_num;

-- تطبيق عملي: الحصول على أعلى مرتب في كل قسم
SELECT *
FROM (
  SELECT
    name, department_id, salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn
  FROM employees
) ranked
WHERE rn = 1;
\`\`\`

---

## RANK() وDENSE_RANK()

كلتاهما تُرتِّب الصفوف حسب القيمة. الفرق في كيفية التعامل مع التعادلات:

\`\`\`sql
-- الفرق بين RANK وDENSE_RANK على الرواتب المتساوية
SELECT
  name,
  salary,
  RANK()       OVER (ORDER BY salary DESC) AS rank_with_gaps,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- RANK:       1, 1, 3, 4, 4, 6  (يتخطى الأرقام بعد التعادلات)
-- DENSE_RANK: 1, 1, 2, 3, 3, 4  (بدون فجوات)
\`\`\`

---

## LEAD() وLAG()

الوصول إلى قيمة صف N مواضع أمام أو خلف الصف الحالي.

\`\`\`sql
-- مقارنة راتب كل موظف بالتالي والسابق
SELECT
  name,
  salary,
  LAG(salary, 1)  OVER (ORDER BY salary) AS prev_salary,
  LEAD(salary, 1) OVER (ORDER BY salary) AS next_salary,
  salary - LAG(salary, 1) OVER (ORDER BY salary) AS salary_gap_from_prev
FROM employees
ORDER BY salary;

-- القيمة الافتراضية عند عدم وجود صف سابق/تالٍ:
LAG(salary, 1, 0) OVER (ORDER BY salary)  -- 0 إذا لم يكن هناك صف سابق
\`\`\`

---

## SUM / COUNT مع PARTITION BY

\`\`\`sql
-- المجموع التراكمي للطلبات لكل عميل عبر الزمن
SELECT
  id           AS order_id,
  customer_id,
  order_date,
  total_amount,
  SUM(total_amount) OVER (
    PARTITION BY customer_id
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM orders
ORDER BY customer_id, order_date;

-- نسبة الإيراد الإجمالي لكل حالة
SELECT
  status,
  total_amount,
  ROUND(total_amount / SUM(total_amount) OVER () * 100, 2) AS pct_of_all
FROM orders
WHERE status = 'delivered'
ORDER BY total_amount DESC;
\`\`\`

---

## NTILE() — الأرباع والنسب المئوية

\`\`\`sql
-- تقسيم الموظفين إلى 4 أرباع حسب الراتب
SELECT
  name,
  salary,
  NTILE(4) OVER (ORDER BY salary) AS quartile
FROM employees
ORDER BY salary;
-- الربع 1 = أقل الرواتب، الربع 4 = أعلى الرواتب
\`\`\`

---

## دوال النافذة مقابل GROUP BY

| الميزة | GROUP BY | Window Function |
|---------|----------|-----------------|
| تُعيد صفاً واحداً لكل مجموعة | ✅ نعم | ❌ لا — تحتفظ بجميع الصفوف |
| يمكن الوصول إلى قيم الصف الفردي | ❌ لا | ✅ نعم |
| يمكن مقارنة الصف بمجموعته | ❌ صعب | ✅ سهل |
| تتطلب استعلاماً فرعياً للمستوى الصفي | ✅ نعم | ❌ لا |
    `,
    example: `-- Rank employees by salary within their department
SELECT
  e.name,
  d.name                                                         AS dept,
  e.salary,
  RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS dept_rank,
  ROUND(AVG(e.salary) OVER (PARTITION BY e.department_id), 0)    AS dept_avg,
  ROUND(e.salary - AVG(e.salary) OVER (PARTITION BY e.department_id), 0) AS vs_dept_avg,
  DENSE_RANK() OVER (ORDER BY e.salary DESC)                     AS company_rank
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.is_active = 1
ORDER BY d.name, dept_rank;`,
    exercises: [
      {
        id: 1,
        question: 'Use ROW_NUMBER() to rank employees by salary (highest first) globally (no partition). Show name, salary, and row_num.',
        questionAr: 'استخدم ROW_NUMBER() لترتيب الموظفين حسب الراتب (الأعلى أولاً) على مستوى الشركة (بدون partition). أظهر name وsalary وrow_num.',
        hint: 'ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num',
        hintAr: 'ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num',
        expectedQuery: 'SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num FROM employees ORDER BY row_num',
        checkFunction: (result, q = '') => result.length > 0 && /OVER\s*\(/i.test(q),
      },
      {
        id: 2,
        question: 'For each order, show the total_amount, and compute the running total of total_amount ordered by order_date.',
        questionAr: 'لكل طلب، أظهر total_amount، واحسب المجموع التراكمي لـ total_amount مرتباً حسب order_date.',
        hint: 'SUM(total_amount) OVER (ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)',
        hintAr: 'SUM(total_amount) OVER (ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)',
        expectedQuery: 'SELECT id, order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM orders ORDER BY order_date',
        checkFunction: (result, q = '') => result.length > 0 && /OVER\s*\(/i.test(q),
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 10 — EXPERT SQL
  // ════════════════════════════════════════════════════
  {
    id: 39,
    title: 'CTEs — WITH Clause',
    titleAr: 'التعابير الجدولية المشتركة CTEs — WITH',
    description: 'Common Table Expressions for readable, reusable subqueries and recursive queries.',
    descriptionAr: 'التعابير الجدولية المشتركة (CTEs) لاستعلامات فرعية مقروءة وقابلة لإعادة الاستخدام والاستعلامات التكرارية.',
    content: `
## CTEs — Common Table Expressions

A **CTE** (Common Table Expression) is a named, temporary result set defined with the \`WITH\` keyword. It exists only for the duration of the single query it precedes.

CTEs make complex queries dramatically more readable by breaking them into named steps.

---

## Basic CTE Syntax

\`\`\`sql
WITH cte_name AS (
  -- your subquery here
  SELECT ...
)
SELECT * FROM cte_name;
\`\`\`

---

## Single CTE

\`\`\`sql
-- Without CTE: hard to read
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- With CTE: clearly states "what is the average?" as a named step
WITH company_avg AS (
  SELECT AVG(salary) AS avg_sal FROM employees
)
SELECT e.name, e.salary, ca.avg_sal,
       e.salary - ca.avg_sal AS diff
FROM employees e
CROSS JOIN company_avg ca
WHERE e.salary > ca.avg_sal
ORDER BY diff DESC;
\`\`\`

---

## Multiple CTEs

\`\`\`sql
WITH
-- Step 1: Summarize orders per customer
customer_orders AS (
  SELECT
    customer_id,
    COUNT(*)         AS order_count,
    SUM(total_amount) AS total_spent
  FROM orders
  WHERE status = 'delivered'
  GROUP BY customer_id
),
-- Step 2: Join with customer info
customer_profile AS (
  SELECT
    c.name,
    c.loyalty_tier,
    co.order_count,
    ROUND(co.total_spent, 2) AS total_spent
  FROM customers c
  JOIN customer_orders co ON c.id = co.customer_id
)
-- Step 3: Final query — top customers
SELECT *
FROM customer_profile
ORDER BY total_spent DESC
LIMIT 10;
\`\`\`

---

## CTE vs Derived Table vs View

\`\`\`sql
-- Derived table (messy for complex logic)
SELECT * FROM (
  SELECT customer_id, SUM(total_amount) AS total FROM orders GROUP BY customer_id
) AS t WHERE t.total > 500;

-- CTE (much cleaner)
WITH customer_totals AS (
  SELECT customer_id, SUM(total_amount) AS total
  FROM orders GROUP BY customer_id
)
SELECT * FROM customer_totals WHERE total > 500;

-- View (persistent, for repeated use)
CREATE VIEW high_value_customers AS
SELECT customer_id, SUM(total_amount) AS total
FROM orders GROUP BY customer_id HAVING SUM(total_amount) > 500;
\`\`\`

| Feature | CTE | Derived Table | View |
|---------|-----|--------------|------|
| Readable | ✅ High | ❌ Low | ✅ High |
| Reuse in query | ✅ Multiple times | ❌ Once | ✅ Everywhere |
| Persists after query | ❌ No | ❌ No | ✅ Yes |

---

## Recursive CTEs

A recursive CTE can reference itself to traverse hierarchical data:

\`\`\`sql
WITH RECURSIVE org_chart AS (
  -- Base case: top-level employees (no manager)
  SELECT
    id,
    name,
    manager_id,
    job_title,
    1 AS level,
    name AS path
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive case: employees with a manager found in previous step
  SELECT
    e.id,
    e.name,
    e.manager_id,
    e.job_title,
    oc.level + 1,
    oc.path || ' → ' || e.name
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT
  level,
  REPLACE(printf('%' || (level*2) || 's', ''), ' ', '  ') || name AS indented_name,
  job_title,
  path
FROM org_chart
ORDER BY path;
\`\`\`

---

## Analytics with CTEs

\`\`\`sql
-- Monthly revenue trend with % change from previous month
WITH monthly_revenue AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    SUM(total_amount) AS revenue
  FROM orders
  WHERE status = 'delivered'
  GROUP BY strftime('%Y-%m', order_date)
),
with_prev AS (
  SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_revenue
  FROM monthly_revenue
)
SELECT
  month,
  ROUND(revenue, 2) AS revenue,
  ROUND(prev_revenue, 2) AS prev_month,
  ROUND((revenue - prev_revenue) / prev_revenue * 100, 1) AS pct_change
FROM with_prev
ORDER BY month;
\`\`\`
    `,
    contentAr: `
## التعابير الجدولية المشتركة CTEs

**CTE** (Common Table Expression — تعبير جدولي مشترك) هو مجموعة نتائج مؤقتة مُسمَّاة تُعرَّف بالكلمة المفتاحية \`WITH\`. يوجد فقط طوال مدة الاستعلام الواحد الذي يسبقه.

تجعل CTEs الاستعلامات المعقدة أكثر قابلية للقراءة بكثير من خلال تقسيمها إلى خطوات مُسمَّاة.

---

## بنية CTE الأساسية

\`\`\`sql
WITH cte_name AS (
  -- استعلامك الفرعي هنا
  SELECT ...
)
SELECT * FROM cte_name;
\`\`\`

---

## CTE فردي

\`\`\`sql
-- بدون CTE: صعب القراءة
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- مع CTE: يُوضِّح "ما هو المتوسط؟" كخطوة مُسمَّاة
WITH company_avg AS (
  SELECT AVG(salary) AS avg_sal FROM employees
)
SELECT e.name, e.salary, ca.avg_sal,
       e.salary - ca.avg_sal AS diff
FROM employees e
CROSS JOIN company_avg ca
WHERE e.salary > ca.avg_sal
ORDER BY diff DESC;
\`\`\`

---

## CTEs متعددة

\`\`\`sql
WITH
-- الخطوة 1: تلخيص الطلبات لكل عميل
customer_orders AS (
  SELECT
    customer_id,
    COUNT(*)         AS order_count,
    SUM(total_amount) AS total_spent
  FROM orders
  WHERE status = 'delivered'
  GROUP BY customer_id
),
-- الخطوة 2: ربط معلومات العميل
customer_profile AS (
  SELECT
    c.name,
    c.loyalty_tier,
    co.order_count,
    ROUND(co.total_spent, 2) AS total_spent
  FROM customers c
  JOIN customer_orders co ON c.id = co.customer_id
)
-- الخطوة 3: الاستعلام النهائي — أفضل العملاء
SELECT *
FROM customer_profile
ORDER BY total_spent DESC
LIMIT 10;
\`\`\`

---

## CTE مقابل Derived Table مقابل View

\`\`\`sql
-- Derived table (فوضوي للمنطق المعقد)
SELECT * FROM (
  SELECT customer_id, SUM(total_amount) AS total FROM orders GROUP BY customer_id
) AS t WHERE t.total > 500;

-- CTE (أكثر نظافة بكثير)
WITH customer_totals AS (
  SELECT customer_id, SUM(total_amount) AS total
  FROM orders GROUP BY customer_id
)
SELECT * FROM customer_totals WHERE total > 500;

-- View (دائم، للاستخدام المتكرر)
CREATE VIEW high_value_customers AS
SELECT customer_id, SUM(total_amount) AS total
FROM orders GROUP BY customer_id HAVING SUM(total_amount) > 500;
\`\`\`

| الميزة | CTE | Derived Table | View |
|---------|-----|--------------|------|
| قابلية القراءة | ✅ عالية | ❌ منخفضة | ✅ عالية |
| إعادة الاستخدام في الاستعلام | ✅ مرات متعددة | ❌ مرة واحدة | ✅ في كل مكان |
| يبقى بعد الاستعلام | ❌ لا | ❌ لا | ✅ نعم |

---

## CTEs التكرارية Recursive CTEs

يمكن لـ CTE التكراري أن يُشير إلى نفسه لاجتياز البيانات الهرمية:

\`\`\`sql
WITH RECURSIVE org_chart AS (
  -- الحالة الأساسية: الموظفون ذوو المستوى الأعلى (بلا مدير)
  SELECT
    id,
    name,
    manager_id,
    job_title,
    1 AS level,
    name AS path
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- الحالة التكرارية: الموظفون الذين لديهم مدير وُجد في الخطوة السابقة
  SELECT
    e.id,
    e.name,
    e.manager_id,
    e.job_title,
    oc.level + 1,
    oc.path || ' → ' || e.name
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT
  level,
  REPLACE(printf('%' || (level*2) || 's', ''), ' ', '  ') || name AS indented_name,
  job_title,
  path
FROM org_chart
ORDER BY path;
\`\`\`

---

## التحليلات مع CTEs

\`\`\`sql
-- اتجاه الإيراد الشهري مع نسبة التغيير من الشهر السابق
WITH monthly_revenue AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    SUM(total_amount) AS revenue
  FROM orders
  WHERE status = 'delivered'
  GROUP BY strftime('%Y-%m', order_date)
),
with_prev AS (
  SELECT
    month,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_revenue
  FROM monthly_revenue
)
SELECT
  month,
  ROUND(revenue, 2) AS revenue,
  ROUND(prev_revenue, 2) AS prev_month,
  ROUND((revenue - prev_revenue) / prev_revenue * 100, 1) AS pct_change
FROM with_prev
ORDER BY month;
\`\`\`
    `,
    example: `-- Multi-step analysis: identify high-value customer segments
WITH
order_stats AS (
  SELECT
    customer_id,
    COUNT(*)                AS order_count,
    ROUND(SUM(total_amount), 2) AS lifetime_value,
    MAX(order_date)         AS last_order_date
  FROM orders
  WHERE status <> 'cancelled'
  GROUP BY customer_id
),
customer_segments AS (
  SELECT
    c.name,
    c.loyalty_tier,
    c.country,
    os.order_count,
    os.lifetime_value,
    CASE
      WHEN os.lifetime_value > 1000 THEN 'VIP'
      WHEN os.lifetime_value > 400  THEN 'Regular'
      ELSE 'Occasional'
    END AS segment
  FROM customers c
  JOIN order_stats os ON c.id = os.customer_id
)
SELECT segment, COUNT(*) AS customers, ROUND(AVG(lifetime_value), 2) AS avg_ltv
FROM customer_segments
GROUP BY segment
ORDER BY avg_ltv DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Write a CTE called "dept_stats" that computes average salary per department, then select departments where avg salary > $75,000.',
        questionAr: 'اكتب CTE باسم "dept_stats" يحسب متوسط الراتب لكل قسم، ثم اختر الأقسام التي يتجاوز فيها متوسط الراتب 75,000 دولار.',
        hint: 'WITH dept_stats AS (SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id) SELECT * FROM dept_stats WHERE avg_sal > 75000',
        hintAr: 'WITH dept_stats AS (SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id) SELECT * FROM dept_stats WHERE avg_sal > 75000',
        expectedQuery: 'WITH dept_stats AS (SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id) SELECT * FROM dept_stats WHERE avg_sal > 75000',
        checkFunction: (result, q = '') => result.length > 0 && /WITH\s+\w+\s+AS/i.test(q),
      },
      {
        id: 2,
        question: 'Write a CTE called "customer_spending" that sums total_amount per customer. Then join with customers table to show customer name and their total spending, sorted by spending descending.',
        questionAr: 'اكتب CTE باسم "customer_spending" يجمع total_amount لكل عميل. ثم اربطه بجدول customers لعرض اسم العميل وإجمالي إنفاقه، مرتباً تنازلياً.',
        hint: 'WITH customer_spending AS (...) SELECT c.name, cs.total FROM customers c JOIN customer_spending cs ON c.id = cs.customer_id',
        hintAr: 'WITH customer_spending AS (...) SELECT c.name, cs.total FROM customers c JOIN customer_spending cs ON c.id = cs.customer_id',
        expectedQuery: 'WITH customer_spending AS (SELECT customer_id, SUM(total_amount) AS total FROM orders GROUP BY customer_id) SELECT c.name, cs.total FROM customers c JOIN customer_spending cs ON c.id = cs.customer_id ORDER BY cs.total DESC',
        checkFunction: (result, q = '') => result.length > 0 && /WITH\s+\w+\s+AS/i.test(q) && /JOIN/i.test(q),
      },
    ],
  },

  {
    id: 40,
    title: 'Query Optimization & EXPLAIN',
    titleAr: 'تحسين الاستعلامات Query Optimization وEXPLAIN',
    description: 'Understand query plans, identify bottlenecks, and write efficient SQL.',
    descriptionAr: 'فهم خطط تنفيذ الاستعلامات، وتحديد الاختناقات، وكتابة SQL فعّال.',
    content: `
## Query Optimization

Writing SQL that works is easy. Writing SQL that's **fast** on large data requires understanding how the database executes your query.

---

## EXPLAIN QUERY PLAN (SQLite)

\`EXPLAIN QUERY PLAN\` shows how SQLite will execute a query — without running it:

\`\`\`sql
-- Understand how this query will run
EXPLAIN QUERY PLAN
SELECT e.name, d.name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.salary > 80000;

-- Output might show:
-- SCAN TABLE employees
-- SEARCH TABLE departments USING INTEGER PRIMARY KEY (rowid=?)
\`\`\`

Look for:
- **SCAN TABLE** — full table scan (bad for large tables, may need index)
- **SEARCH TABLE USING INDEX** — index used (good!)
- **SEARCH TABLE USING INTEGER PRIMARY KEY** — primary key lookup (best!)

---

## The 10 Most Impactful Optimization Rules

### 1. Always SELECT Only What You Need

\`\`\`sql
-- ❌ Returns 25 columns across network
SELECT * FROM employees;

-- ✅ Returns only 2 columns needed
SELECT name, salary FROM employees;
\`\`\`

### 2. Use Indexes for Frequently Filtered Columns

\`\`\`sql
CREATE INDEX idx_employees_dept ON employees (department_id);
-- Now WHERE department_id = X is instant instead of full scan
\`\`\`

### 3. Avoid Functions on Indexed Columns in WHERE

\`\`\`sql
-- ❌ Breaks the index — full scan
WHERE UPPER(name) = 'ALICE JOHNSON'

-- ✅ Index can be used
WHERE name = 'Alice Johnson'
\`\`\`

### 4. Use EXISTS Instead of COUNT for Existence Checks

\`\`\`sql
-- ❌ Counts all matching rows — unnecessary work
SELECT * FROM customers
WHERE (SELECT COUNT(*) FROM orders WHERE customer_id = customers.id) > 0;

-- ✅ Stops at first match
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
\`\`\`

### 5. Filter Early with WHERE, Not HAVING

\`\`\`sql
-- ❌ Groups ALL rows, then filters
SELECT department_id, COUNT(*)
FROM employees
GROUP BY department_id
HAVING department_id IN (1, 2, 3);

-- ✅ Filter first, then group (fewer rows to aggregate)
SELECT department_id, COUNT(*)
FROM employees
WHERE department_id IN (1, 2, 3)
GROUP BY department_id;
\`\`\`

### 6. Prefer JOINs Over Subqueries When Possible

\`\`\`sql
-- ❌ Correlated subquery runs once per row (N queries)
SELECT name,
  (SELECT name FROM departments d WHERE d.id = e.department_id)
FROM employees e;

-- ✅ JOIN runs once (1 query)
SELECT e.name, d.name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
\`\`\`

### 7. Use LIMIT When You Don't Need All Rows

\`\`\`sql
-- ❌ Loads 1 million rows to show only 10
SELECT * FROM big_table ORDER BY created_at DESC;

-- ✅
SELECT * FROM big_table ORDER BY created_at DESC LIMIT 10;
\`\`\`

### 8. Avoid DISTINCT When Not Necessary

\`DISTINCT\` sorts and deduplicates the entire result — expensive. Use only when you actually expect duplicates.

### 9. Composite Indexes — Column Order Matters

\`\`\`sql
-- Index: (status, order_date)
-- ✅ Uses index: WHERE status = 'delivered' AND order_date > X
-- ✅ Uses index: WHERE status = 'delivered'  (first column only)
-- ❌ Skips index: WHERE order_date > X       (second column only — no match)
\`\`\`

### 10. Batch Inserts Instead of Row-by-Row

\`\`\`sql
-- ❌ 1000 INSERT statements
INSERT INTO logs VALUES (1, 'event1');
INSERT INTO logs VALUES (2, 'event2');
...

-- ✅ One INSERT with multiple rows
INSERT INTO logs VALUES (1, 'event1'), (2, 'event2'), ...;

-- Or wrap in a transaction:
BEGIN;
  -- all 1000 inserts
COMMIT;  -- 100x faster than auto-commit per row
\`\`\`
    `,
    contentAr: `
## تحسين الاستعلامات Query Optimization

كتابة SQL يعمل سهلة. كتابة SQL **سريع** على البيانات الكبيرة يتطلب فهم كيفية تنفيذ قاعدة البيانات للاستعلام.

---

## EXPLAIN QUERY PLAN في SQLite

\`EXPLAIN QUERY PLAN\` يُظهر كيف سيُنفِّذ SQLite الاستعلام — دون تشغيله فعلياً:

\`\`\`sql
-- فهم كيفية تشغيل هذا الاستعلام
EXPLAIN QUERY PLAN
SELECT e.name, d.name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.salary > 80000;

-- قد يُظهر الإخراج:
-- SCAN TABLE employees
-- SEARCH TABLE departments USING INTEGER PRIMARY KEY (rowid=?)
\`\`\`

ابحث عن:
- **SCAN TABLE** — مسح جدول كامل (سيء للجداول الكبيرة، قد تحتاج index)
- **SEARCH TABLE USING INDEX** — تم استخدام index (جيد!)
- **SEARCH TABLE USING INTEGER PRIMARY KEY** — بحث بالمفتاح الأساسي (الأفضل!)

---

## أهم 10 قواعد للتحسين

### 1. اختر فقط ما تحتاجه

\`\`\`sql
-- ❌ يُعيد 25 عموداً عبر الشبكة
SELECT * FROM employees;

-- ✅ يُعيد عمودين فقط
SELECT name, salary FROM employees;
\`\`\`

### 2. استخدم الفهارس للأعمدة المُصفَّاة بكثرة

\`\`\`sql
CREATE INDEX idx_employees_dept ON employees (department_id);
-- الآن WHERE department_id = X فوري بدلاً من مسح كامل
\`\`\`

### 3. تجنب الدوال على الأعمدة المفهرسة في WHERE

\`\`\`sql
-- ❌ يُكسر الـ index — مسح كامل
WHERE UPPER(name) = 'ALICE JOHNSON'

-- ✅ يمكن استخدام الـ index
WHERE name = 'Alice Johnson'
\`\`\`

### 4. استخدم EXISTS بدلاً من COUNT للتحقق من الوجود

\`\`\`sql
-- ❌ يعدّ جميع الصفوف المطابقة — عمل غير ضروري
SELECT * FROM customers
WHERE (SELECT COUNT(*) FROM orders WHERE customer_id = customers.id) > 0;

-- ✅ يتوقف عند أول تطابق
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
\`\`\`

### 5. الفلترة المبكرة باستخدام WHERE وليس HAVING

\`\`\`sql
-- ❌ يُجمِّع جميع الصفوف ثم يُفلتر
SELECT department_id, COUNT(*)
FROM employees
GROUP BY department_id
HAVING department_id IN (1, 2, 3);

-- ✅ يُفلتر أولاً ثم يُجمِّع (صفوف أقل للتجميع)
SELECT department_id, COUNT(*)
FROM employees
WHERE department_id IN (1, 2, 3)
GROUP BY department_id;
\`\`\`

### 6. فضِّل JOINs على الاستعلامات الفرعية Subqueries حيثما أمكن

\`\`\`sql
-- ❌ استعلام فرعي مُترابط يعمل مرة لكل صف (N استعلام)
SELECT name,
  (SELECT name FROM departments d WHERE d.id = e.department_id)
FROM employees e;

-- ✅ JOIN يعمل مرة واحدة (استعلام واحد)
SELECT e.name, d.name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
\`\`\`

### 7. استخدم LIMIT عندما لا تحتاج كل الصفوف

\`\`\`sql
-- ❌ يُحمِّل مليون صف لعرض 10 فقط
SELECT * FROM big_table ORDER BY created_at DESC;

-- ✅
SELECT * FROM big_table ORDER BY created_at DESC LIMIT 10;
\`\`\`

### 8. تجنب DISTINCT عند عدم الحاجة

\`DISTINCT\` يُرتِّب ويُزيل تكرارات النتيجة كلها — مكلف. استخدمه فقط عندما تتوقع فعلاً تكرارات.

### 9. الفهارس المركّبة — ترتيب الأعمدة مهم

\`\`\`sql
-- index: (status, order_date)
-- ✅ يستخدم index: WHERE status = 'delivered' AND order_date > X
-- ✅ يستخدم index: WHERE status = 'delivered'  (العمود الأول فقط)
-- ❌ يتجاهل index: WHERE order_date > X       (العمود الثاني فقط — لا تطابق)
\`\`\`

### 10. الإدراج المجمّع بدلاً من صف بصف

\`\`\`sql
-- ❌ 1000 جملة INSERT
INSERT INTO logs VALUES (1, 'event1');
INSERT INTO logs VALUES (2, 'event2');
...

-- ✅ INSERT واحد مع صفوف متعددة
INSERT INTO logs VALUES (1, 'event1'), (2, 'event2'), ...;

-- أو اجمعها في معاملة transaction:
BEGIN;
  -- جميع الـ 1000 إدراج
COMMIT;  -- أسرع 100 مرة من auto-commit لكل صف
\`\`\`
    `,
    example: `-- See the query plan for a JOIN query
EXPLAIN QUERY PLAN
SELECT
  e.name,
  d.name AS dept,
  e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.salary > 80000
ORDER BY e.salary DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Write EXPLAIN QUERY PLAN for a query that selects all orders where customer_id = 1.',
        questionAr: 'اكتب EXPLAIN QUERY PLAN لاستعلام يختار جميع الطلبات حيث customer_id = 1.',
        hint: 'EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 1',
        hintAr: 'EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 1',
        expectedQuery: 'EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 1',
        checkFunction: (result, q = '') => result.length > 0 && /EXPLAIN/i.test(q),
      },
    ],
  },

  {
    id: 41,
    title: 'Database Design & Normalization',
    titleAr: 'تصميم قواعد البيانات والتسوية Normalization',
    description: '1NF, 2NF, 3NF — design databases that scale, avoid anomalies, and are easy to maintain.',
    descriptionAr: '1NF و2NF و3NF — تصميم قواعد بيانات قابلة للتوسع، تتجنب الشذوذات، وسهلة الصيانة.',
    content: `
## Database Design

Good database design makes everything easier: simpler queries, faster performance, easier maintenance, fewer bugs. Poor design leads to data duplication, inconsistencies, and headaches.

---

## The Problem: Unnormalized Data

Imagine storing everything in one table:

\`\`\`sql
-- ❌ Unnormalized (everything in one table)
CREATE TABLE orders_bad (
  order_id     INTEGER,
  customer_name TEXT,      -- What if they change their name?
  customer_email TEXT,     -- Duplicated in every order!
  product1_name TEXT,      -- Limited to 3 products per order
  product1_qty  INTEGER,
  product1_price REAL,
  product2_name TEXT,
  product2_qty  INTEGER,
  product2_price REAL,
  product3_name TEXT,      -- Can't have a 4th product
  product3_qty  INTEGER,
  product3_price REAL
);
\`\`\`

Problems:
- **Update anomaly**: changing a customer's email requires updating many rows
- **Delete anomaly**: deleting an order might lose customer info
- **Insert anomaly**: can't store a customer without an order
- **Limited**: only 3 products per order

---

## First Normal Form (1NF)

**Rules:**
1. No repeating groups (like product1, product2, product3)
2. Each cell has a single, atomic value
3. Each row has a unique identifier (primary key)

\`\`\`sql
-- ✅ 1NF: each product gets its own row
CREATE TABLE order_items (
  id         INTEGER PRIMARY KEY,
  order_id   INTEGER,
  product_id INTEGER,
  quantity   INTEGER,
  unit_price REAL
);
\`\`\`

---

## Second Normal Form (2NF)

**Rules:**
1. Must already be in 1NF
2. Every non-key column must depend on the **whole** primary key (not just part of it)

This applies when the primary key is composite.

\`\`\`sql
-- ❌ Violates 2NF: product_name depends only on product_id, not the full PK
CREATE TABLE order_items_bad (
  order_id     INTEGER,
  product_id   INTEGER,
  product_name TEXT,    -- ← depends only on product_id!
  quantity     INTEGER,
  unit_price   REAL,
  PRIMARY KEY (order_id, product_id)
);

-- ✅ 2NF: separate product details into their own table
CREATE TABLE products (
  id   INTEGER PRIMARY KEY,
  name TEXT,
  price REAL
);

CREATE TABLE order_items (
  order_id   INTEGER,
  product_id INTEGER REFERENCES products(id),
  quantity   INTEGER,
  unit_price REAL,  -- snapshot of price at time of purchase
  PRIMARY KEY (order_id, product_id)
);
\`\`\`

---

## Third Normal Form (3NF)

**Rules:**
1. Must be in 2NF
2. No **transitive dependencies** — non-key columns must not depend on other non-key columns

\`\`\`sql
-- ❌ Violates 3NF: state depends on zip_code, not on customer_id
CREATE TABLE customers_bad (
  id       INTEGER PRIMARY KEY,
  name     TEXT,
  zip_code TEXT,
  state    TEXT     -- ← depends on zip_code, not id!
);

-- ✅ 3NF: separate zip → state into its own table
CREATE TABLE zip_codes (
  zip_code TEXT PRIMARY KEY,
  state    TEXT,
  city     TEXT
);

CREATE TABLE customers (
  id       INTEGER PRIMARY KEY,
  name     TEXT,
  zip_code TEXT REFERENCES zip_codes(zip_code)
);
\`\`\`

---

## Entity-Relationship Design

Key concepts when designing a schema:

### One-to-Many (1:N)
One department has many employees. One order has many items.
\`\`\`sql
-- Employee has one department; department has many employees
employees.department_id → departments.id
\`\`\`

### Many-to-Many (N:M)
A product can be in many orders; an order can have many products.
Requires a **junction table**:
\`\`\`sql
-- order_items is the junction table
orders ← order_items → products
\`\`\`

### One-to-One (1:1)
One employee has one employment contract. Rare — often just merged into one table.

---

## Denormalization: Breaking Rules Deliberately

Sometimes you intentionally denormalize for performance:

\`\`\`sql
-- Storing total_amount on orders even though it can be computed from order_items
-- This is a deliberate denormalization for read performance
orders.total_amount = SUM(order_items.quantity * order_items.unit_price)
-- Trade-off: faster reads, but must keep in sync on writes
\`\`\`

---

## Our Training Database: Was It Designed Well?

\`\`\`sql
-- Yes! Let's verify:
-- ✅ 1NF: each order item is a separate row in order_items
-- ✅ 2NF: all non-key columns depend on the full key
-- ✅ 3NF: no transitive dependencies
-- ✅ FK constraints defined
-- ✅ Sensible defaults and NOT NULL where required
-- ✅ Junction table for orders ↔ products (order_items)
\`\`\`
    `,
    contentAr: `
## تصميم قواعد البيانات Database Design

التصميم الجيد لقاعدة البيانات يُسهِّل كل شيء: استعلامات أبسط، أداء أسرع، صيانة أسهل، أخطاء أقل. التصميم السيئ يؤدي إلى تكرار البيانات وعدم الاتساق والصعوبات.

---

## المشكلة: بيانات غير مُسوَّاة Unnormalized

تخيّل تخزين كل شيء في جدول واحد:

\`\`\`sql
-- ❌ غير مُسوَّاة (كل شيء في جدول واحد)
CREATE TABLE orders_bad (
  order_id     INTEGER,
  customer_name TEXT,      -- ماذا لو غيّر اسمه؟
  customer_email TEXT,     -- مكرر في كل طلب!
  product1_name TEXT,      -- محدود بـ 3 منتجات لكل طلب
  product1_qty  INTEGER,
  product1_price REAL,
  product2_name TEXT,
  product2_qty  INTEGER,
  product2_price REAL,
  product3_name TEXT,      -- لا يمكن إضافة منتج رابع
  product3_qty  INTEGER,
  product3_price REAL
);
\`\`\`

المشاكل:
- **شذوذ التحديث**: تغيير بريد عميل يتطلب تحديث صفوف كثيرة
- **شذوذ الحذف**: حذف طلب قد يفقد معلومات العميل
- **شذوذ الإدراج**: لا يمكن تخزين عميل بدون طلب
- **محدودية**: 3 منتجات فقط لكل طلب

---

## الشكل الطبيعي الأول 1NF (First Normal Form)

**القواعد:**
1. لا مجموعات متكررة (مثل product1، product2، product3)
2. كل خلية تحتوي قيمة واحدة ذرية
3. كل صف له معرِّف فريد (مفتاح أساسي)

\`\`\`sql
-- ✅ 1NF: كل منتج يحصل على صفه الخاص
CREATE TABLE order_items (
  id         INTEGER PRIMARY KEY,
  order_id   INTEGER,
  product_id INTEGER,
  quantity   INTEGER,
  unit_price REAL
);
\`\`\`

---

## الشكل الطبيعي الثاني 2NF (Second Normal Form)

**القواعد:**
1. يجب أن يكون في 1NF
2. كل عمود غير مفتاح يجب أن يعتمد على **المفتاح كاملاً** (وليس جزء منه)

ينطبق هذا عندما يكون المفتاح الأساسي مركّباً.

\`\`\`sql
-- ❌ ينتهك 2NF: product_name يعتمد على product_id فقط، وليس المفتاح كاملاً
CREATE TABLE order_items_bad (
  order_id     INTEGER,
  product_id   INTEGER,
  product_name TEXT,    -- ← يعتمد على product_id فقط!
  quantity     INTEGER,
  unit_price   REAL,
  PRIMARY KEY (order_id, product_id)
);

-- ✅ 2NF: فصل تفاصيل المنتج في جدولها الخاص
CREATE TABLE products (
  id   INTEGER PRIMARY KEY,
  name TEXT,
  price REAL
);

CREATE TABLE order_items (
  order_id   INTEGER,
  product_id INTEGER REFERENCES products(id),
  quantity   INTEGER,
  unit_price REAL,  -- لقطة للسعر وقت الشراء
  PRIMARY KEY (order_id, product_id)
);
\`\`\`

---

## الشكل الطبيعي الثالث 3NF (Third Normal Form)

**القواعد:**
1. يجب أن يكون في 2NF
2. لا **تبعيات عابرة** — الأعمدة غير المفتاح يجب ألا تعتمد على أعمدة غير مفتاح أخرى

\`\`\`sql
-- ❌ ينتهك 3NF: state يعتمد على zip_code، وليس على customer_id
CREATE TABLE customers_bad (
  id       INTEGER PRIMARY KEY,
  name     TEXT,
  zip_code TEXT,
  state    TEXT     -- ← يعتمد على zip_code، وليس id!
);

-- ✅ 3NF: فصل zip → state في جدولها الخاص
CREATE TABLE zip_codes (
  zip_code TEXT PRIMARY KEY,
  state    TEXT,
  city     TEXT
);

CREATE TABLE customers (
  id       INTEGER PRIMARY KEY,
  name     TEXT,
  zip_code TEXT REFERENCES zip_codes(zip_code)
);
\`\`\`

---

## تصميم العلاقات Entity-Relationship Design

المفاهيم الأساسية عند تصميم مخطط قاعدة البيانات:

### واحد إلى متعدد (1:N) One-to-Many
قسم واحد يملك موظفين كثيرين. طلب واحد يحتوي عناصر كثيرة.
\`\`\`sql
-- الموظف ينتمي لقسم واحد؛ القسم يملك موظفين كثيرين
employees.department_id → departments.id
\`\`\`

### متعدد إلى متعدد (N:M) Many-to-Many
يمكن أن يكون المنتج في طلبات كثيرة؛ الطلب يمكن أن يحتوي منتجات كثيرة.
يتطلب **جدول وصل (junction table)**:
\`\`\`sql
-- order_items هو جدول الوصل
orders ← order_items → products
\`\`\`

### واحد إلى واحد (1:1) One-to-One
موظف واحد يملك عقد عمل واحد. نادر — غالباً يُدمج في جدول واحد.

---

## إلغاء التسوية Denormalization: كسر القواعد عمداً

أحياناً تُلغي التسوية عمداً لتحسين الأداء:

\`\`\`sql
-- تخزين total_amount في orders رغم إمكانية حسابه من order_items
-- هذا إلغاء تسوية متعمد لتحسين أداء القراءة
orders.total_amount = SUM(order_items.quantity * order_items.unit_price)
-- المقايضة: قراءة أسرع، لكن يجب المزامنة عند الكتابة
\`\`\`

---

## قاعدة بياناتنا التدريبية: هل صُمِّمت بشكل جيد؟

\`\`\`sql
-- نعم! لنتحقق:
-- ✅ 1NF: كل عنصر طلب صف منفصل في order_items
-- ✅ 2NF: جميع الأعمدة غير المفتاح تعتمد على المفتاح كاملاً
-- ✅ 3NF: لا تبعيات عابرة
-- ✅ قيود FK مُعرَّفة
-- ✅ قيم افتراضية منطقية وNOT NULL حيث لزم
-- ✅ جدول وصل للطلبات ↔ المنتجات (order_items)
\`\`\`
    `,
    example: `-- Prove the schema is well-designed: complex query works naturally
SELECT
  c.name              AS customer,
  COUNT(DISTINCT o.id) AS orders,
  COUNT(oi.id)         AS line_items,
  SUM(oi.quantity)     AS units,
  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS calculated_total,
  ROUND(SUM(o.total_amount) / COUNT(DISTINCT o.id), 2) AS avg_order_value
FROM customers c
JOIN orders o      ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
WHERE o.status = 'delivered'
GROUP BY c.id, c.name
ORDER BY calculated_total DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Inspect the schema: query sqlite_master to see all CREATE TABLE statements.',
        questionAr: 'افحص المخطط: استعلم عن sqlite_master لرؤية جميع جمل CREATE TABLE.',
        hint: "SELECT sql FROM sqlite_master WHERE type = 'table' ORDER BY name",
        hintAr: "SELECT sql FROM sqlite_master WHERE type = 'table' ORDER BY name",
        expectedQuery: "SELECT name, sql FROM sqlite_master WHERE type = 'table' ORDER BY name",
        checkFunction: (result, q = '') => result.length > 0 && /sqlite_master/i.test(q),
      },
    ],
  },

  {
    id: 42,
    title: 'Real-World Project: E-Commerce Analytics',
    titleAr: 'مشروع حقيقي: تحليلات التجارة الإلكترونية',
    description: 'Combine everything you have learned in a complete business analytics project.',
    descriptionAr: 'اجمع كل ما تعلمته في مشروع تحليل أعمال متكامل.',
    content: `
## Capstone Project: E-Commerce Analytics Dashboard

You've learned everything. Now apply it all in a realistic business scenario.

**Business Context:** You're the data analyst at a growing e-commerce company. The CEO wants a comprehensive report before a board meeting. Your job is to extract insights from the database.

---

## Challenge 1: Revenue Overview

\`\`\`sql
-- Total revenue, order count, and average order value
-- Broken down by order status
SELECT
  status,
  COUNT(*)                        AS orders,
  ROUND(SUM(total_amount), 2)     AS total_revenue,
  ROUND(AVG(total_amount), 2)     AS avg_order_value,
  ROUND(MIN(total_amount), 2)     AS min_order,
  ROUND(MAX(total_amount), 2)     AS max_order
FROM orders
GROUP BY status
ORDER BY total_revenue DESC;
\`\`\`

---

## Challenge 2: Top 5 Customers by Lifetime Value

\`\`\`sql
WITH customer_ltv AS (
  SELECT
    c.id,
    c.name,
    c.loyalty_tier,
    c.country,
    COUNT(DISTINCT o.id)              AS total_orders,
    ROUND(SUM(o.total_amount), 2)     AS lifetime_value,
    MAX(o.order_date)                 AS last_order_date
  FROM customers c
  JOIN orders o ON c.id = o.customer_id
  WHERE o.status <> 'cancelled'
  GROUP BY c.id, c.name, c.loyalty_tier, c.country
)
SELECT *
FROM customer_ltv
ORDER BY lifetime_value DESC
LIMIT 5;
\`\`\`

---

## Challenge 3: Best-Selling Products

\`\`\`sql
SELECT
  p.name                              AS product,
  cat.name                            AS category,
  COUNT(DISTINCT oi.order_id)         AS orders,
  SUM(oi.quantity)                    AS units_sold,
  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue,
  p.stock_quantity                    AS stock_remaining
FROM order_items oi
JOIN products p    ON oi.product_id = p.id
JOIN categories cat ON p.category_id = cat.id
JOIN orders o      ON oi.order_id = o.id
WHERE o.status IN ('delivered', 'shipped')
GROUP BY p.id, p.name, cat.name, p.stock_quantity
ORDER BY units_sold DESC
LIMIT 10;
\`\`\`

---

## Challenge 4: Monthly Growth

\`\`\`sql
WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    COUNT(*)                      AS orders,
    ROUND(SUM(total_amount), 2)   AS revenue
  FROM orders
  WHERE status = 'delivered'
  GROUP BY strftime('%Y-%m', order_date)
),
with_growth AS (
  SELECT
    month,
    orders,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_revenue
  FROM monthly
)
SELECT
  month,
  orders,
  revenue,
  COALESCE(ROUND((revenue - prev_revenue) / prev_revenue * 100, 1), 0) AS growth_pct
FROM with_growth
ORDER BY month;
\`\`\`

---

## Challenge 5: Customer Segmentation (RFM Analysis)

RFM = Recency, Frequency, Monetary — a classic segmentation model.

\`\`\`sql
WITH rfm AS (
  SELECT
    c.id,
    c.name,
    c.loyalty_tier,
    CAST(julianday('now') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days,
    COUNT(DISTINCT o.id)            AS frequency,
    ROUND(SUM(o.total_amount), 2)   AS monetary
  FROM customers c
  LEFT JOIN orders o ON c.id = o.customer_id AND o.status <> 'cancelled'
  GROUP BY c.id, c.name, c.loyalty_tier
)
SELECT
  name,
  loyalty_tier,
  recency_days,
  frequency,
  monetary,
  CASE
    WHEN recency_days <= 30 AND frequency >= 3 AND monetary >= 500 THEN 'Champion'
    WHEN recency_days <= 60 AND frequency >= 2                     THEN 'Loyal'
    WHEN recency_days <= 90                                        THEN 'Potential'
    WHEN recency_days > 90 AND frequency >= 2                      THEN 'At Risk'
    ELSE 'Lost'
  END AS segment
FROM rfm
ORDER BY monetary DESC;
\`\`\`

---

## Challenge 6: Inventory Alert

\`\`\`sql
-- Products needing restocking based on order velocity
WITH order_velocity AS (
  SELECT
    p.id,
    p.name,
    p.stock_quantity,
    p.supplier,
    COUNT(oi.id)         AS times_ordered,
    SUM(oi.quantity)     AS units_sold_total
  FROM products p
  LEFT JOIN order_items oi ON p.id = oi.product_id
  LEFT JOIN orders o ON oi.order_id = o.id AND o.status IN ('delivered', 'shipped')
  GROUP BY p.id, p.name, p.stock_quantity, p.supplier
)
SELECT
  name,
  supplier,
  stock_quantity,
  units_sold_total,
  CASE
    WHEN stock_quantity = 0         THEN '🔴 OUT OF STOCK'
    WHEN stock_quantity < 30        THEN '🟡 LOW STOCK'
    ELSE                                 '🟢 OK'
  END AS stock_status
FROM order_velocity
WHERE p.is_available = 1
ORDER BY stock_quantity ASC;
\`\`\`

---

## You've Mastered SQL!

You've covered:
- ✅ All DML: SELECT, INSERT, UPDATE, DELETE
- ✅ All DDL: CREATE, ALTER, DROP
- ✅ Filtering: WHERE, HAVING, BETWEEN, IN, LIKE, IS NULL
- ✅ Aggregation: COUNT, SUM, AVG, MIN, MAX, GROUP BY
- ✅ All JOIN types: INNER, LEFT, RIGHT, FULL, SELF, CROSS
- ✅ Subqueries: scalar, IN, EXISTS, correlated, derived tables
- ✅ Functions: string, date, CASE, COALESCE, NULLIF
- ✅ Advanced: Window Functions, CTEs, Views, Indexes, Transactions
- ✅ Design: Normalization, ERD, 1NF/2NF/3NF

**Next steps:** Practice on real datasets (Kaggle), contribute to open source projects, get certified (PostgreSQL, MySQL), or build a project that uses a database!
    `,
    contentAr: `
## مشروع التخرج: لوحة تحليلات التجارة الإلكترونية

لقد تعلمت كل شيء. الآن طبّق كل ذلك في سيناريو أعمال واقعي.

**السياق التجاري:** أنت محلل بيانات في شركة تجارة إلكترونية نامية. يريد الرئيس التنفيذي تقريراً شاملاً قبل اجتماع مجلس الإدارة. مهمتك استخراج رؤى من قاعدة البيانات.

---

## التحدي 1: نظرة عامة على الإيرادات

\`\`\`sql
-- إجمالي الإيراد وعدد الطلبات ومتوسط قيمة الطلب
-- مُقسَّمة حسب حالة الطلب
SELECT
  status,
  COUNT(*)                        AS orders,
  ROUND(SUM(total_amount), 2)     AS total_revenue,
  ROUND(AVG(total_amount), 2)     AS avg_order_value,
  ROUND(MIN(total_amount), 2)     AS min_order,
  ROUND(MAX(total_amount), 2)     AS max_order
FROM orders
GROUP BY status
ORDER BY total_revenue DESC;
\`\`\`

---

## التحدي 2: أفضل 5 عملاء حسب القيمة الكاملة

\`\`\`sql
WITH customer_ltv AS (
  SELECT
    c.id,
    c.name,
    c.loyalty_tier,
    c.country,
    COUNT(DISTINCT o.id)              AS total_orders,
    ROUND(SUM(o.total_amount), 2)     AS lifetime_value,
    MAX(o.order_date)                 AS last_order_date
  FROM customers c
  JOIN orders o ON c.id = o.customer_id
  WHERE o.status <> 'cancelled'
  GROUP BY c.id, c.name, c.loyalty_tier, c.country
)
SELECT *
FROM customer_ltv
ORDER BY lifetime_value DESC
LIMIT 5;
\`\`\`

---

## التحدي 3: المنتجات الأكثر مبيعاً

\`\`\`sql
SELECT
  p.name                              AS product,
  cat.name                            AS category,
  COUNT(DISTINCT oi.order_id)         AS orders,
  SUM(oi.quantity)                    AS units_sold,
  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue,
  p.stock_quantity                    AS stock_remaining
FROM order_items oi
JOIN products p    ON oi.product_id = p.id
JOIN categories cat ON p.category_id = cat.id
JOIN orders o      ON oi.order_id = o.id
WHERE o.status IN ('delivered', 'shipped')
GROUP BY p.id, p.name, cat.name, p.stock_quantity
ORDER BY units_sold DESC
LIMIT 10;
\`\`\`

---

## التحدي 4: النمو الشهري

\`\`\`sql
WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    COUNT(*)                      AS orders,
    ROUND(SUM(total_amount), 2)   AS revenue
  FROM orders
  WHERE status = 'delivered'
  GROUP BY strftime('%Y-%m', order_date)
),
with_growth AS (
  SELECT
    month,
    orders,
    revenue,
    LAG(revenue) OVER (ORDER BY month) AS prev_revenue
  FROM monthly
)
SELECT
  month,
  orders,
  revenue,
  COALESCE(ROUND((revenue - prev_revenue) / prev_revenue * 100, 1), 0) AS growth_pct
FROM with_growth
ORDER BY month;
\`\`\`

---

## التحدي 5: تقسيم العملاء بتحليل RFM

RFM = Recency (الحداثة) وFrequency (التكرار) وMonetary (الإنفاق) — نموذج تقسيم كلاسيكي.

\`\`\`sql
WITH rfm AS (
  SELECT
    c.id,
    c.name,
    c.loyalty_tier,
    CAST(julianday('now') - julianday(MAX(o.order_date)) AS INTEGER) AS recency_days,
    COUNT(DISTINCT o.id)            AS frequency,
    ROUND(SUM(o.total_amount), 2)   AS monetary
  FROM customers c
  LEFT JOIN orders o ON c.id = o.customer_id AND o.status <> 'cancelled'
  GROUP BY c.id, c.name, c.loyalty_tier
)
SELECT
  name,
  loyalty_tier,
  recency_days,
  frequency,
  monetary,
  CASE
    WHEN recency_days <= 30 AND frequency >= 3 AND monetary >= 500 THEN 'Champion'
    WHEN recency_days <= 60 AND frequency >= 2                     THEN 'Loyal'
    WHEN recency_days <= 90                                        THEN 'Potential'
    WHEN recency_days > 90 AND frequency >= 2                      THEN 'At Risk'
    ELSE 'Lost'
  END AS segment
FROM rfm
ORDER BY monetary DESC;
\`\`\`

---

## التحدي 6: تنبيه المخزون

\`\`\`sql
-- المنتجات التي تحتاج إعادة تخزين بناءً على معدل الطلبات
WITH order_velocity AS (
  SELECT
    p.id,
    p.name,
    p.stock_quantity,
    p.supplier,
    COUNT(oi.id)         AS times_ordered,
    SUM(oi.quantity)     AS units_sold_total
  FROM products p
  LEFT JOIN order_items oi ON p.id = oi.product_id
  LEFT JOIN orders o ON oi.order_id = o.id AND o.status IN ('delivered', 'shipped')
  GROUP BY p.id, p.name, p.stock_quantity, p.supplier
)
SELECT
  name,
  supplier,
  stock_quantity,
  units_sold_total,
  CASE
    WHEN stock_quantity = 0         THEN '🔴 OUT OF STOCK'
    WHEN stock_quantity < 30        THEN '🟡 LOW STOCK'
    ELSE                                 '🟢 OK'
  END AS stock_status
FROM order_velocity
WHERE p.is_available = 1
ORDER BY stock_quantity ASC;
\`\`\`

---

## لقد أتقنت SQL!

لقد غطّيت:
- ✅ جميع DML: SELECT وINSERT وUPDATE وDELETE
- ✅ جميع DDL: CREATE وALTER وDROP
- ✅ الفلترة: WHERE وHAVING وBETWEEN وIN وLIKE وIS NULL
- ✅ التجميع: COUNT وSUM وAVG وMIN وMAX وGROUP BY
- ✅ جميع أنواع JOIN: INNER وLEFT وRIGHT وFULL وSELF وCROSS
- ✅ الاستعلامات الفرعية: scalar وIN وEXISTS والمترابطة والمشتقة
- ✅ الدوال: النصية والتاريخية وCASE وCOALESCE وNULLIF
- ✅ المتقدم: Window Functions وCTEs والعروض Views والفهارس Indexes والمعاملات Transactions
- ✅ التصميم: التسوية Normalization وERD و1NF/2NF/3NF

**الخطوات التالية:** تدرَّب على مجموعات بيانات حقيقية (Kaggle)، ساهم في مشاريع مفتوحة المصدر، احصل على شهادة (PostgreSQL، MySQL)، أو ابنِ مشروعاً يستخدم قاعدة بيانات!
    `,
    example: `-- The ultimate query: combine everything!
WITH
product_sales AS (
  SELECT
    p.id,
    p.name,
    cat.name AS category,
    SUM(oi.quantity) AS units,
    ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue,
    RANK() OVER (PARTITION BY p.category_id ORDER BY SUM(oi.quantity * oi.unit_price) DESC) AS cat_rank
  FROM order_items oi
  JOIN products p ON oi.product_id = p.id
  JOIN categories cat ON p.category_id = cat.id
  JOIN orders o ON oi.order_id = o.id
  WHERE o.status IN ('delivered', 'shipped')
  GROUP BY p.id, p.name, cat.name, p.category_id
)
SELECT category, name, units, revenue,
       CASE WHEN cat_rank = 1 THEN '🏆 Best Seller' ELSE '' END AS award
FROM product_sales
ORDER BY category, cat_rank;`,
    exercises: [
      {
        id: 1,
        question: 'Write a query to find the top 3 highest-revenue product categories (from delivered+shipped orders only). Show category name, total revenue, and number of unique orders.',
        questionAr: 'اكتب استعلاماً لإيجاد أعلى 3 فئات منتجات من حيث الإيراد (من الطلبات المُسلَّمة والمشحونة فقط). أظهر اسم الفئة والإيراد الإجمالي وعدد الطلبات الفريدة.',
        hint: 'JOIN order_items → products → categories, filter by status, GROUP BY category, ORDER BY revenue DESC LIMIT 3',
        hintAr: 'JOIN order_items → products → categories، فلترة حسب status، GROUP BY category، ORDER BY revenue DESC LIMIT 3',
        expectedQuery: "SELECT cat.name AS category, ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue, COUNT(DISTINCT o.id) AS orders FROM order_items oi JOIN products p ON oi.product_id = p.id JOIN categories cat ON p.category_id = cat.id JOIN orders o ON oi.order_id = o.id WHERE o.status IN ('delivered', 'shipped') GROUP BY cat.id, cat.name ORDER BY revenue DESC LIMIT 3",
        checkFunction: (result, q = '') => result.length > 0 && /JOIN/i.test(q) && /GROUP\s+BY/i.test(q) && /LIMIT/i.test(q),
      },
      {
        id: 2,
        question: 'Write a CTE that calculates lifetime spending per customer, then find customers in the Gold tier who have spent more than $400 total.',
        questionAr: 'اكتب CTE يحسب إجمالي الإنفاق لكل عميل، ثم أوجد عملاء مستوى Gold الذين أنفقوا أكثر من 400 دولار إجمالاً.',
        hint: "WITH ltv AS (SELECT customer_id, SUM(total_amount) AS total FROM orders WHERE status <> 'cancelled' GROUP BY customer_id) SELECT c.name, ltv.total FROM customers c JOIN ltv ON c.id = ltv.customer_id WHERE c.loyalty_tier = 'Gold' AND ltv.total > 400",
        hintAr: "WITH ltv AS (SELECT customer_id, SUM(total_amount) AS total FROM orders WHERE status <> 'cancelled' GROUP BY customer_id) SELECT c.name, ltv.total FROM customers c JOIN ltv ON c.id = ltv.customer_id WHERE c.loyalty_tier = 'Gold' AND ltv.total > 400",
        expectedQuery: "WITH ltv AS (SELECT customer_id, SUM(total_amount) AS total FROM orders WHERE status <> 'cancelled' GROUP BY customer_id) SELECT c.name, ltv.total FROM customers c JOIN ltv ON c.id = ltv.customer_id WHERE c.loyalty_tier = 'Gold' AND ltv.total > 400 ORDER BY ltv.total DESC",
        checkFunction: (result, q = '') => result.length > 0 && /WITH\s+\w+\s+AS/i.test(q) && /JOIN/i.test(q),
      },
    ],
  },
];
