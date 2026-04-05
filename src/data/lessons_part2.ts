import { Lesson } from '../types';

export const lessonsP2: Lesson[] = [
  {
    id: 16,
    title: 'UPDATE',
    titleAr: 'تعديل البيانات UPDATE',
    description: 'Modify existing rows safely — single values, multiple columns, computed updates, and the WHERE danger.',
    descriptionAr: 'تعديل الصفوف الموجودة بأمان — قيمة واحدة، أعمدة متعددة، تحديثات محسوبة، وخطر نسيان WHERE.',
    content: `
## UPDATE — Modifying Existing Data

\`UPDATE\` changes values in existing rows. It's one of the most powerful — and potentially dangerous — SQL commands.

\`\`\`sql
UPDATE table_name
SET column1 = value1,
    column2 = value2
WHERE condition;
\`\`\`

---

## ⚠️ The Golden Rule: ALWAYS Use WHERE

\`\`\`sql
-- ❌ CATASTROPHIC: updates EVERY employee's salary to 0!
UPDATE employees SET salary = 0;

-- ✅ Update only one specific employee
UPDATE employees SET salary = 85000 WHERE id = 4;

-- ✅ Professional practice: run SELECT first to verify which rows will be affected
SELECT * FROM employees WHERE id = 4;
-- If result looks right, then run the UPDATE
UPDATE employees SET salary = 85000 WHERE id = 4;
\`\`\`

---

## Updating Multiple Columns

\`\`\`sql
-- Update several fields at once
UPDATE employees
SET job_title   = 'Senior Software Engineer',
    salary      = 88000
WHERE id = 4;

-- Update customer info
UPDATE customers
SET city         = 'San Francisco',
    country      = 'USA',
    loyalty_tier = 'Silver'
WHERE id = 8;
\`\`\`

---

## Computed Updates

You can use expressions referencing the current value:

\`\`\`sql
-- Give all Engineering employees a 10% raise
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = 1;

-- Deduct 5% from expensive products
UPDATE products
SET price = price * 0.95
WHERE price > 200;

-- Increase stock by 50 for a supplier's products
UPDATE products
SET stock_quantity = stock_quantity + 50
WHERE supplier = 'TechCorp';

-- Mark orders as delivered if they were shipped over 7 days ago
-- (SQLite uses date functions)
UPDATE orders
SET status = 'delivered'
WHERE status = 'shipped'
  AND order_date < date('now', '-7 days');
\`\`\`

---

## Updating Based on Another Table (Subquery)

\`\`\`sql
-- Set all employees in the 'Legal' department to inactive
UPDATE employees
SET is_active = 0
WHERE department_id = (
  SELECT id FROM departments WHERE name = 'Legal'
);

-- Give a bonus to employees in departments with high budgets
UPDATE employees
SET salary = salary * 1.05
WHERE department_id IN (
  SELECT id FROM departments WHERE budget > 400000
);
\`\`\`

---

## Safe Update Pattern

Before any UPDATE, verify with SELECT:

\`\`\`sql
-- Step 1: SEE what will change
SELECT id, name, salary, salary * 1.15 AS new_salary
FROM employees
WHERE department_id = 5 AND salary < 70000;

-- Step 2: If the above looks right, execute the UPDATE
UPDATE employees
SET salary = salary * 1.15
WHERE department_id = 5 AND salary < 70000;

-- Step 3: Verify the change
SELECT id, name, salary FROM employees
WHERE department_id = 5 AND salary < 70000;
-- Should return 0 rows now (all were updated above the threshold)
\`\`\`

---

## RETURNING Clause (PostgreSQL)

See the updated values immediately:

\`\`\`sql
-- PostgreSQL only
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = 1
RETURNING id, name, salary AS new_salary;
\`\`\`

---

## Common Mistakes

\`\`\`sql
-- ❌ Updating to a string when column expects a number
UPDATE products SET price = 'free' WHERE id = 1;
-- SQLite: stores text 'free', numeric operations will fail

-- ❌ Forgetting WHERE — the most common and costly mistake
UPDATE orders SET status = 'cancelled';  -- ALL orders cancelled!

-- ❌ Using = NULL instead of IS NULL in WHERE
UPDATE employees SET bonus = 500 WHERE manager_id = NULL;
-- Returns 0 rows updated! Should be: WHERE manager_id IS NULL

-- ✅ Correct NULL check in UPDATE
UPDATE employees SET bonus = 500 WHERE manager_id IS NULL;
\`\`\`
    `,
    contentAr: `
## UPDATE — تعديل البيانات الموجودة

يُستخدم \`UPDATE\` لتغيير القيم في الصفوف الموجودة. إنه من أقوى أوامر SQL — وأكثرها خطورة إذا أُسيء استخدامه.

\`\`\`sql
UPDATE table_name
SET column1 = value1,
    column2 = value2
WHERE condition;
\`\`\`

---

## ⚠️ القاعدة الذهبية: استخدم WHERE دائماً

\`\`\`sql
-- ❌ كارثي: يُحدِّث راتب كل موظف إلى 0!
UPDATE employees SET salary = 0;

-- ✅ تحديث موظف واحد محدد
UPDATE employees SET salary = 85000 WHERE id = 4;

-- ✅ الممارسة الاحترافية: شغّل SELECT أولاً للتحقق من الصفوف التي ستتأثر
SELECT * FROM employees WHERE id = 4;
-- إذا كانت النتيجة صحيحة، نفّذ UPDATE
UPDATE employees SET salary = 85000 WHERE id = 4;
\`\`\`

---

## تحديث أعمدة متعددة

\`\`\`sql
-- تحديث عدة حقول دفعة واحدة
UPDATE employees
SET job_title   = 'Senior Software Engineer',
    salary      = 88000
WHERE id = 4;

-- تحديث بيانات عميل
UPDATE customers
SET city         = 'San Francisco',
    country      = 'USA',
    loyalty_tier = 'Silver'
WHERE id = 8;
\`\`\`

---

## التحديثات المحسوبة

يمكنك استخدام تعبيرات تُشير إلى القيمة الحالية:

\`\`\`sql
-- منح جميع موظفي الهندسة زيادة 10%
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = 1;

-- خصم 5% من المنتجات الغالية
UPDATE products
SET price = price * 0.95
WHERE price > 200;

-- زيادة المخزون بمقدار 50 لمنتجات المورد TechCorp
UPDATE products
SET stock_quantity = stock_quantity + 50
WHERE supplier = 'TechCorp';

-- تحديث الطلبات إلى "مُسلَّمة" إذا شُحنت منذ أكثر من 7 أيام
-- (SQLite يستخدم دوال التاريخ)
UPDATE orders
SET status = 'delivered'
WHERE status = 'shipped'
  AND order_date < date('now', '-7 days');
\`\`\`

---

## التحديث بناءً على جدول آخر (Subquery)

\`\`\`sql
-- تعيين جميع موظفي قسم "Legal" كغير نشطين
UPDATE employees
SET is_active = 0
WHERE department_id = (
  SELECT id FROM departments WHERE name = 'Legal'
);

-- منح مكافأة للموظفين في الأقسام ذات الميزانية العالية
UPDATE employees
SET salary = salary * 1.05
WHERE department_id IN (
  SELECT id FROM departments WHERE budget > 400000
);
\`\`\`

---

## نمط التحديث الآمن

قبل أي UPDATE، تحقق بـ SELECT:

\`\`\`sql
-- الخطوة 1: شاهد ما الذي سيتغير
SELECT id, name, salary, salary * 1.15 AS new_salary
FROM employees
WHERE department_id = 5 AND salary < 70000;

-- الخطوة 2: إذا بدت النتيجة صحيحة، نفّذ UPDATE
UPDATE employees
SET salary = salary * 1.15
WHERE department_id = 5 AND salary < 70000;

-- الخطوة 3: تحقق من التغيير
SELECT id, name, salary FROM employees
WHERE department_id = 5 AND salary < 70000;
-- يجب أن تعود 0 صفوف الآن (تم تحديث الكل فوق الحد)
\`\`\`

---

## جملة RETURNING (PostgreSQL فقط)

شاهد القيم المحدَّثة فوراً:

\`\`\`sql
-- PostgreSQL فقط
UPDATE employees
SET salary = salary * 1.10
WHERE department_id = 1
RETURNING id, name, salary AS new_salary;
\`\`\`

---

## أخطاء شائعة

\`\`\`sql
-- ❌ تحديث بنص نصي في عمود يتوقع رقماً
UPDATE products SET price = 'free' WHERE id = 1;
-- SQLite: تخزّن النص 'free'، ستفشل العمليات الحسابية

-- ❌ نسيان WHERE — الخطأ الأكثر شيوعاً وتكلفةً
UPDATE orders SET status = 'cancelled';  -- جميع الطلبات ملغاة!

-- ❌ استخدام = NULL بدلاً من IS NULL في WHERE
UPDATE employees SET bonus = 500 WHERE manager_id = NULL;
-- لا يُعيد أي صفوف! يجب أن يكون: WHERE manager_id IS NULL

-- ✅ فحص NULL الصحيح في UPDATE
UPDATE employees SET bonus = 500 WHERE manager_id IS NULL;
\`\`\`
    `,
    example: `-- Safe update: preview first, then update
-- Preview: which employees get a raise?
SELECT id, name, salary, ROUND(salary * 1.08, 2) AS proposed_salary
FROM employees
WHERE department_id = 2;

-- Execute: give Marketing team an 8% raise
UPDATE employees
SET salary = ROUND(salary * 1.08, 2)
WHERE department_id = 2;

-- Verify
SELECT id, name, salary FROM employees WHERE department_id = 2;`,
    exercises: [
      {
        id: 1,
        question: "Update the status of order with id=11 from 'pending' to 'processing'.",
        questionAr: "حدِّث حالة الطلب ذي id=11 من 'pending' إلى 'processing'.",
        hint: "UPDATE orders SET status = 'processing' WHERE id = 11",
        hintAr: "UPDATE orders SET status = 'processing' WHERE id = 11",
        expectedQuery: "UPDATE orders SET status = 'processing' WHERE id = 11",
        checkFunction: () => true,
      },
      {
        id: 2,
        question: 'Increase the price of all products from supplier "BookHouse" by 5%.',
        questionAr: 'زِد سعر جميع المنتجات من المورد "BookHouse" بنسبة 5%.',
        hint: "UPDATE products SET price = price * 1.05 WHERE supplier = 'BookHouse'",
        hintAr: "UPDATE products SET price = price * 1.05 WHERE supplier = 'BookHouse'",
        expectedQuery: "UPDATE products SET price = price * 1.05 WHERE supplier = 'BookHouse'",
        checkFunction: () => true,
      },
      {
        id: 3,
        question: 'Update customer id=4 to set loyalty_tier to "Silver" and update their phone to "555-9999".',
        questionAr: 'حدِّث بيانات العميل id=4 لضبط loyalty_tier على "Silver" وتحديث رقم هاتفه إلى "555-9999".',
        hint: 'UPDATE customers SET loyalty_tier = ..., phone = ... WHERE id = 4',
        hintAr: 'UPDATE customers SET loyalty_tier = ..., phone = ... WHERE id = 4',
        expectedQuery: "UPDATE customers SET loyalty_tier = 'Silver', phone = '555-9999' WHERE id = 4",
        checkFunction: () => true,
      },
    ],
  },

  {
    id: 17,
    title: 'DELETE',
    titleAr: 'حذف البيانات DELETE',
    description: 'Remove rows safely, understand cascades, and know when to use TRUNCATE vs DELETE.',
    descriptionAr: 'حذف الصفوف بأمان، فهم الحذف المتسلسل (CASCADE)، ومعرفة متى تستخدم TRUNCATE مقابل DELETE.',
    content: `
## DELETE — Removing Rows

\`DELETE FROM\` removes rows that match a condition.

\`\`\`sql
DELETE FROM table_name
WHERE condition;
\`\`\`

---

## ⚠️ The Same Golden Rule: ALWAYS Use WHERE

\`\`\`sql
-- ❌ CATASTROPHIC: deletes ALL rows in the table!
DELETE FROM orders;

-- ✅ Delete a specific order
DELETE FROM orders WHERE id = 12;

-- ✅ Always SELECT first
SELECT * FROM orders WHERE id = 12;
-- Verify it's the right row, then delete
DELETE FROM orders WHERE id = 12;
\`\`\`

---

## Deleting Multiple Rows

\`\`\`sql
-- Delete all cancelled orders
DELETE FROM orders WHERE status = 'cancelled';

-- Delete inactive employees
DELETE FROM employees WHERE is_active = 0;

-- Delete old low-value orders
DELETE FROM orders
WHERE total_amount < 50
  AND order_date < '2024-03-01';

-- Delete all products from a discontinued supplier
DELETE FROM products WHERE supplier = 'OldSupplier';
\`\`\`

---

## DELETE with Subquery

\`\`\`sql
-- Delete all order_items for a specific order
DELETE FROM order_items
WHERE order_id IN (
  SELECT id FROM orders WHERE status = 'cancelled'
);
-- Then delete the orders themselves
DELETE FROM orders WHERE status = 'cancelled';
-- ⚠️ Order matters: delete child rows before parent rows!

-- Delete employees who work in departments that are closing
DELETE FROM employees
WHERE department_id IN (
  SELECT id FROM departments WHERE name = 'Legal'
);
\`\`\`

---

## Foreign Key Cascades

If foreign keys are set up with \`ON DELETE CASCADE\`:

\`\`\`sql
-- With CASCADE: deleting a customer automatically deletes their orders
DELETE FROM customers WHERE id = 8;
-- If orders.customer_id has ON DELETE CASCADE, all of customer 8's orders are deleted too

-- Without CASCADE: you must delete child rows first
DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE customer_id = 8);
DELETE FROM orders WHERE customer_id = 8;
DELETE FROM customers WHERE id = 8;
\`\`\`

---

## DELETE vs TRUNCATE vs DROP

\`\`\`sql
-- DELETE: precise, can use WHERE, can rollback
DELETE FROM logs WHERE created_at < '2023-01-01';

-- TRUNCATE: removes ALL rows instantly, cannot use WHERE
-- Fast for large tables, resets auto-increment in MySQL
TRUNCATE TABLE temp_logs;  -- Not available in SQLite, use DELETE

-- DROP: removes the entire table permanently
DROP TABLE temp_logs;  -- Table is gone forever
\`\`\`

| | DELETE | TRUNCATE | DROP |
|---|--------|----------|------|
| Uses WHERE | ✅ | ❌ | ❌ |
| Can rollback | ✅ | ❌ (usually) | ❌ |
| Keeps table | ✅ | ✅ | ❌ |
| Speed (millions of rows) | Slow | Very fast | Instant |
| Fires triggers | ✅ | ❌ | ❌ |

---

## Soft Delete Pattern

In production, data is often too valuable to hard-delete. Instead, use a soft delete:

\`\`\`sql
-- Add a deleted_at timestamp (NULL = not deleted)
ALTER TABLE employees ADD COLUMN deleted_at TEXT;

-- "Delete" an employee (soft)
UPDATE employees SET deleted_at = CURRENT_TIMESTAMP WHERE id = 23;

-- Query "active" employees
SELECT * FROM employees WHERE deleted_at IS NULL;

-- Restore a soft-deleted employee
UPDATE employees SET deleted_at = NULL WHERE id = 23;
\`\`\`

This is used by almost every major SaaS application — it gives an audit trail and an "undo" capability.

---

## Practical Cleanup Example

\`\`\`sql
-- Clean up test data: remove any customers with 'test' in their email
-- Step 1: See what will be deleted
SELECT * FROM customers WHERE email LIKE '%test%';

-- Step 2: Delete safely
DELETE FROM customers WHERE email LIKE '%test%';

-- Step 3: Verify
SELECT COUNT(*) FROM customers WHERE email LIKE '%test%';
-- Should return 0
\`\`\`
    `,
    contentAr: `
## DELETE — حذف الصفوف

يُستخدم \`DELETE FROM\` لحذف الصفوف التي تطابق شرطاً معيناً.

\`\`\`sql
DELETE FROM table_name
WHERE condition;
\`\`\`

---

## ⚠️ نفس القاعدة الذهبية: استخدم WHERE دائماً

\`\`\`sql
-- ❌ كارثي: يحذف جميع الصفوف من الجدول!
DELETE FROM orders;

-- ✅ حذف طلب محدد
DELETE FROM orders WHERE id = 12;

-- ✅ شغّل SELECT أولاً
SELECT * FROM orders WHERE id = 12;
-- تحقق أن هذا هو الصف الصحيح، ثم احذفه
DELETE FROM orders WHERE id = 12;
\`\`\`

---

## حذف صفوف متعددة

\`\`\`sql
-- حذف جميع الطلبات الملغاة
DELETE FROM orders WHERE status = 'cancelled';

-- حذف الموظفين غير النشطين
DELETE FROM employees WHERE is_active = 0;

-- حذف الطلبات القديمة منخفضة القيمة
DELETE FROM orders
WHERE total_amount < 50
  AND order_date < '2024-03-01';

-- حذف جميع منتجات المورد المتوقف
DELETE FROM products WHERE supplier = 'OldSupplier';
\`\`\`

---

## DELETE مع Subquery

\`\`\`sql
-- حذف جميع عناصر الطلب (order_items) لطلب محدد
DELETE FROM order_items
WHERE order_id IN (
  SELECT id FROM orders WHERE status = 'cancelled'
);
-- ثم حذف الطلبات نفسها
DELETE FROM orders WHERE status = 'cancelled';
-- ⚠️ الترتيب مهم: احذف الصفوف الفرعية قبل الصفوف الأصلية!

-- حذف الموظفين في الأقسام المُغلَقة
DELETE FROM employees
WHERE department_id IN (
  SELECT id FROM departments WHERE name = 'Legal'
);
\`\`\`

---

## الحذف المتسلسل عبر FOREIGN KEY (Foreign Key Cascades)

إذا كانت المفاتيح الخارجية مُعرَّفة بـ \`ON DELETE CASCADE\`:

\`\`\`sql
-- مع CASCADE: حذف عميل يحذف تلقائياً طلباته
DELETE FROM customers WHERE id = 8;
-- إذا كان orders.customer_id يحمل ON DELETE CASCADE، تُحذف جميع طلبات العميل 8 أيضاً

-- بدون CASCADE: يجب حذف الصفوف الفرعية أولاً
DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE customer_id = 8);
DELETE FROM orders WHERE customer_id = 8;
DELETE FROM customers WHERE id = 8;
\`\`\`

---

## DELETE مقابل TRUNCATE مقابل DROP

\`\`\`sql
-- DELETE: دقيق، يقبل WHERE، يمكن التراجع عنه (rollback)
DELETE FROM logs WHERE created_at < '2023-01-01';

-- TRUNCATE: يحذف جميع الصفوف فوراً، لا يقبل WHERE
-- سريع للجداول الكبيرة، يُعيد تشغيل auto-increment في MySQL
TRUNCATE TABLE temp_logs;  -- غير متوفر في SQLite، استخدم DELETE

-- DROP: يحذف الجدول بالكامل نهائياً
DROP TABLE temp_logs;  -- الجدول اختفى للأبد
\`\`\`

| | DELETE | TRUNCATE | DROP |
|---|--------|----------|------|
| يقبل WHERE | ✅ | ❌ | ❌ |
| يمكن التراجع (rollback) | ✅ | ❌ (عادةً) | ❌ |
| يحتفظ بالجدول | ✅ | ✅ | ❌ |
| السرعة (ملايين صفوف) | بطيء | سريع جداً | فوري |
| يُطلق triggers | ✅ | ❌ | ❌ |

---

## نمط الحذف الناعم (Soft Delete)

في بيئات الإنتاج، البيانات ثمينة جداً للحذف الفعلي. استخدم الحذف الناعم بدلاً من ذلك:

\`\`\`sql
-- أضف عمود deleted_at (NULL = لم يُحذف)
ALTER TABLE employees ADD COLUMN deleted_at TEXT;

-- "حذف" موظف (ناعم)
UPDATE employees SET deleted_at = CURRENT_TIMESTAMP WHERE id = 23;

-- استعلام الموظفين "النشطين"
SELECT * FROM employees WHERE deleted_at IS NULL;

-- استعادة موظف محذوف ناعماً
UPDATE employees SET deleted_at = NULL WHERE id = 23;
\`\`\`

تستخدم هذا النمط تقريباً كل تطبيقات SaaS الكبيرة — فهو يوفر سجلاً تدقيقياً وإمكانية "التراجع".

---

## مثال تنظيف عملي

\`\`\`sql
-- تنظيف بيانات الاختبار: احذف العملاء الذين يحتوي بريدهم على 'test'
-- الخطوة 1: انظر ما الذي سيُحذف
SELECT * FROM customers WHERE email LIKE '%test%';

-- الخطوة 2: احذف بأمان
DELETE FROM customers WHERE email LIKE '%test%';

-- الخطوة 3: تحقق
SELECT COUNT(*) FROM customers WHERE email LIKE '%test%';
-- يجب أن تُعيد 0
\`\`\`
    `,
    example: `-- Delete the inactive contractor (Wendy Allen, id=23)
-- Step 1: Check who we're deleting
SELECT * FROM employees WHERE is_active = 0;

-- Step 2: Delete
DELETE FROM employees WHERE is_active = 0;

-- Step 3: Verify
SELECT COUNT(*) AS active_count FROM employees WHERE is_active = 1;`,
    exercises: [
      {
        id: 1,
        question: 'Delete all orders with status "cancelled".',
        questionAr: 'احذف جميع الطلبات ذات الحالة "cancelled".',
        hint: "DELETE FROM orders WHERE status = 'cancelled'",
        hintAr: "DELETE FROM orders WHERE status = 'cancelled'",
        expectedQuery: "DELETE FROM orders WHERE status = 'cancelled'",
        checkFunction: () => true,
      },
      {
        id: 2,
        question: 'Delete all products that are not available (is_available = 0).',
        questionAr: 'احذف جميع المنتجات غير المتاحة (is_available = 0).',
        hint: 'DELETE FROM products WHERE is_available = 0',
        hintAr: 'DELETE FROM products WHERE is_available = 0',
        expectedQuery: 'DELETE FROM products WHERE is_available = 0',
        checkFunction: () => true,
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 5 — AGGREGATE FUNCTIONS
  // ════════════════════════════════════════════════════
  {
    id: 18,
    title: 'Aggregate Functions',
    titleAr: 'دوال التجميع Aggregate Functions',
    description: 'COUNT, SUM, AVG, MIN, MAX — compute summary statistics over groups of rows.',
    descriptionAr: 'COUNT، SUM، AVG، MIN، MAX — حساب إحصائيات ملخصة على مجموعات من الصفوف.',
    content: `
## Aggregate Functions

Aggregate functions compute a single result from multiple rows. They're the foundation of analytics and reporting in SQL.

---

## The Five Core Aggregates

| Function | Description | NULL handling |
|----------|-------------|---------------|
| \`COUNT(*)\` | Count all rows | Includes NULLs |
| \`COUNT(col)\` | Count non-NULL values | Excludes NULLs |
| \`SUM(col)\` | Sum of values | Ignores NULLs |
| \`AVG(col)\` | Average of values | Ignores NULLs |
| \`MIN(col)\` | Smallest value | Ignores NULLs |
| \`MAX(col)\` | Largest value | Ignores NULLs |

---

## COUNT — Counting Rows

\`\`\`sql
-- Count all rows in the table
SELECT COUNT(*) AS total_employees FROM employees;
-- Returns: 25

-- Count only rows where email is not NULL
SELECT COUNT(email) AS employees_with_email FROM employees;
-- Returns: 23 (2 employees have NULL email)

-- The difference reveals missing data!
SELECT
  COUNT(*)        AS total,
  COUNT(email)    AS with_email,
  COUNT(*) - COUNT(email) AS missing_email
FROM employees;

-- Count with a filter
SELECT COUNT(*) AS active_count
FROM employees
WHERE is_active = 1;

-- COUNT DISTINCT: count unique values
SELECT COUNT(DISTINCT department_id) AS num_departments
FROM employees;
-- Returns: 5 (ignores NULL dept, ignores duplicates)

SELECT COUNT(DISTINCT country) AS countries_served
FROM customers;
\`\`\`

---

## SUM — Totals

\`\`\`sql
-- Total payroll
SELECT SUM(salary) AS total_payroll FROM employees;

-- Total revenue from delivered orders
SELECT SUM(total_amount) AS delivered_revenue
FROM orders
WHERE status = 'delivered';

-- Total stock value across all products
SELECT SUM(price * stock_quantity) AS total_inventory_value
FROM products
WHERE is_available = 1;

-- Revenue by month (using SUBSTR for SQLite date extraction)
SELECT SUBSTR(order_date, 1, 7) AS month,
       SUM(total_amount)        AS monthly_revenue
FROM orders
WHERE status = 'delivered'
GROUP BY SUBSTR(order_date, 1, 7)
ORDER BY month;
\`\`\`

---

## AVG — Averages

\`\`\`sql
-- Average salary across all employees
SELECT AVG(salary) AS avg_salary FROM employees;

-- Average with ROUND for cleaner output
SELECT ROUND(AVG(salary), 2) AS avg_salary FROM employees;

-- Average order value (only delivered orders)
SELECT ROUND(AVG(total_amount), 2) AS avg_order_value
FROM orders
WHERE status = 'delivered';

-- ⚠️ AVG ignores NULLs — if "missing" means 0, use COALESCE!
SELECT AVG(COALESCE(total_amount, 0)) AS avg_with_zeros
FROM orders;
-- vs
SELECT AVG(total_amount) AS avg_ignore_nulls
FROM orders;
\`\`\`

---

## MIN and MAX — Extremes

\`\`\`sql
-- Salary range
SELECT
  MIN(salary) AS lowest_salary,
  MAX(salary) AS highest_salary,
  MAX(salary) - MIN(salary) AS salary_range
FROM employees;

-- Earliest and latest order dates
SELECT
  MIN(order_date) AS first_order,
  MAX(order_date) AS last_order
FROM orders;

-- Cheapest and most expensive products
SELECT
  MIN(price) AS cheapest,
  MAX(price) AS most_expensive
FROM products
WHERE is_available = 1;

-- MIN/MAX work on strings too (alphabetical)
SELECT
  MIN(name) AS first_alphabetically,
  MAX(name) AS last_alphabetically
FROM employees;
\`\`\`

---

## Combining Multiple Aggregates

\`\`\`sql
-- Complete employee salary statistics
SELECT
  COUNT(*)                    AS headcount,
  COUNT(DISTINCT department_id) AS departments,
  ROUND(MIN(salary), 0)       AS min_salary,
  ROUND(MAX(salary), 0)       AS max_salary,
  ROUND(AVG(salary), 0)       AS avg_salary,
  ROUND(SUM(salary), 0)       AS total_payroll
FROM employees
WHERE is_active = 1;
\`\`\`

---

## DISTINCT with Aggregates

\`\`\`sql
-- Total orders vs unique customers who ordered
SELECT
  COUNT(*)                AS total_orders,
  COUNT(DISTINCT customer_id) AS unique_customers
FROM orders;

-- Average distinct product prices (not per order, but distinct products)
SELECT AVG(DISTINCT price) FROM products;
\`\`\`
    `,
    contentAr: `
## دوال التجميع (Aggregate Functions)

تحسب دوال التجميع نتيجة واحدة من صفوف متعددة. إنها أساس التحليلات وإعداد التقارير في SQL.

---

## دوال التجميع الخمس الأساسية

| الدالة | الوصف | معالجة NULL |
|--------|-------|-------------|
| \`COUNT(*)\` | عدد جميع الصفوف | تشمل NULL |
| \`COUNT(col)\` | عدد القيم غير NULL | تستثني NULL |
| \`SUM(col)\` | مجموع القيم | تتجاهل NULL |
| \`AVG(col)\` | متوسط القيم | تتجاهل NULL |
| \`MIN(col)\` | أصغر قيمة | تتجاهل NULL |
| \`MAX(col)\` | أكبر قيمة | تتجاهل NULL |

---

## COUNT — عدّ الصفوف

\`\`\`sql
-- عدّ جميع الصفوف في الجدول
SELECT COUNT(*) AS total_employees FROM employees;
-- النتيجة: 25

-- عدّ الصفوف فقط حيث البريد الإلكتروني ليس NULL
SELECT COUNT(email) AS employees_with_email FROM employees;
-- النتيجة: 23 (موظفان لديهما email بقيمة NULL)

-- الفرق يكشف البيانات المفقودة!
SELECT
  COUNT(*)        AS total,
  COUNT(email)    AS with_email,
  COUNT(*) - COUNT(email) AS missing_email
FROM employees;

-- عدّ مع فلتر
SELECT COUNT(*) AS active_count
FROM employees
WHERE is_active = 1;

-- COUNT DISTINCT: عدّ القيم الفريدة
SELECT COUNT(DISTINCT department_id) AS num_departments
FROM employees;
-- النتيجة: 5 (يتجاهل NULL، يتجاهل المكررات)

SELECT COUNT(DISTINCT country) AS countries_served
FROM customers;
\`\`\`

---

## SUM — المجاميع

\`\`\`sql
-- إجمالي الرواتب
SELECT SUM(salary) AS total_payroll FROM employees;

-- إجمالي الإيرادات من الطلبات المُسلَّمة
SELECT SUM(total_amount) AS delivered_revenue
FROM orders
WHERE status = 'delivered';

-- إجمالي قيمة المخزون لجميع المنتجات
SELECT SUM(price * stock_quantity) AS total_inventory_value
FROM products
WHERE is_available = 1;

-- الإيرادات الشهرية (باستخدام SUBSTR لاستخراج التاريخ في SQLite)
SELECT SUBSTR(order_date, 1, 7) AS month,
       SUM(total_amount)        AS monthly_revenue
FROM orders
WHERE status = 'delivered'
GROUP BY SUBSTR(order_date, 1, 7)
ORDER BY month;
\`\`\`

---

## AVG — المتوسطات

\`\`\`sql
-- متوسط الراتب لجميع الموظفين
SELECT AVG(salary) AS avg_salary FROM employees;

-- متوسط مع ROUND لإخراج أنظف
SELECT ROUND(AVG(salary), 2) AS avg_salary FROM employees;

-- متوسط قيمة الطلب (الطلبات المُسلَّمة فقط)
SELECT ROUND(AVG(total_amount), 2) AS avg_order_value
FROM orders
WHERE status = 'delivered';

-- ⚠️ AVG تتجاهل NULL — إذا كان "المفقود" يعني 0، استخدم COALESCE!
SELECT AVG(COALESCE(total_amount, 0)) AS avg_with_zeros
FROM orders;
-- مقابل
SELECT AVG(total_amount) AS avg_ignore_nulls
FROM orders;
\`\`\`

---

## MIN وMAX — القيم القصوى

\`\`\`sql
-- نطاق الرواتب
SELECT
  MIN(salary) AS lowest_salary,
  MAX(salary) AS highest_salary,
  MAX(salary) - MIN(salary) AS salary_range
FROM employees;

-- أقدم وأحدث تاريخ طلب
SELECT
  MIN(order_date) AS first_order,
  MAX(order_date) AS last_order
FROM orders;

-- المنتج الأرخص والأغلى
SELECT
  MIN(price) AS cheapest,
  MAX(price) AS most_expensive
FROM products
WHERE is_available = 1;

-- MIN/MAX تعمل على النصوص أيضاً (ترتيب أبجدي)
SELECT
  MIN(name) AS first_alphabetically,
  MAX(name) AS last_alphabetically
FROM employees;
\`\`\`

---

## دمج دوال تجميع متعددة

\`\`\`sql
-- إحصائيات رواتب الموظفين الكاملة
SELECT
  COUNT(*)                    AS headcount,
  COUNT(DISTINCT department_id) AS departments,
  ROUND(MIN(salary), 0)       AS min_salary,
  ROUND(MAX(salary), 0)       AS max_salary,
  ROUND(AVG(salary), 0)       AS avg_salary,
  ROUND(SUM(salary), 0)       AS total_payroll
FROM employees
WHERE is_active = 1;
\`\`\`

---

## DISTINCT مع دوال التجميع

\`\`\`sql
-- إجمالي الطلبات مقابل العملاء الفريدين الذين طلبوا
SELECT
  COUNT(*)                AS total_orders,
  COUNT(DISTINCT customer_id) AS unique_customers
FROM orders;

-- متوسط أسعار المنتجات الفريدة (ليس لكل طلب، بل للمنتجات الفريدة)
SELECT AVG(DISTINCT price) FROM products;
\`\`\`
    `,
    example: `-- Full product catalog statistics
SELECT
  COUNT(*)                      AS total_products,
  COUNT(DISTINCT category_id)   AS categories,
  ROUND(MIN(price), 2)          AS cheapest,
  ROUND(MAX(price), 2)          AS most_expensive,
  ROUND(AVG(price), 2)          AS avg_price,
  SUM(stock_quantity)           AS total_units_in_stock,
  ROUND(SUM(price * stock_quantity), 2) AS total_inventory_value
FROM products
WHERE is_available = 1;`,
    exercises: [
      {
        id: 1,
        question: 'Find the total revenue (SUM of total_amount) from all delivered orders.',
        questionAr: 'أوجد إجمالي الإيرادات (SUM لـ total_amount) من جميع الطلبات المُسلَّمة.',
        hint: "SELECT SUM(total_amount) FROM orders WHERE status = 'delivered'",
        hintAr: "SELECT SUM(total_amount) FROM orders WHERE status = 'delivered'",
        expectedQuery: "SELECT SUM(total_amount) FROM orders WHERE status = 'delivered'",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find the highest salary, lowest salary, and average salary (rounded to 2 decimals) for all active employees.',
        questionAr: 'أوجد أعلى راتب وأدنى راتب ومتوسط الراتب (مقرَّباً لمنزلتين عشريتين) لجميع الموظفين النشطين.',
        hint: 'Use MAX, MIN, and ROUND(AVG(...), 2)',
        hintAr: 'استخدم MAX وMIN وROUND(AVG(...), 2)',
        expectedQuery: 'SELECT MAX(salary), MIN(salary), ROUND(AVG(salary), 2) FROM employees WHERE is_active = 1',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Count how many orders were placed by unique customers.',
        questionAr: 'أحصِ عدد الطلبات التي وضعها عملاء فريدون (غير متكررين).',
        hint: 'Use COUNT(DISTINCT customer_id)',
        hintAr: 'استخدم COUNT(DISTINCT customer_id)',
        expectedQuery: 'SELECT COUNT(DISTINCT customer_id) FROM orders',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 19,
    title: 'GROUP BY',
    titleAr: 'التجميع GROUP BY',
    description: 'Group rows by column values and compute aggregates per group — the heart of data analysis.',
    descriptionAr: 'تجميع الصفوف حسب قيم الأعمدة وحساب دوال التجميع لكل مجموعة — قلب تحليل البيانات.',
    content: `
## GROUP BY

\`GROUP BY\` divides rows into groups based on unique values in one or more columns, then applies aggregate functions to each group separately.

Without GROUP BY, an aggregate function collapses ALL rows into a single result. With GROUP BY, you get one result **per group**.

---

## Basic Syntax

\`\`\`sql
SELECT grouping_column, aggregate_function(other_column)
FROM table_name
GROUP BY grouping_column;
\`\`\`

---

## Simple Grouping

\`\`\`sql
-- Employee count per department
SELECT department_id, COUNT(*) AS headcount
FROM employees
GROUP BY department_id;

-- Average salary per department
SELECT department_id, ROUND(AVG(salary), 0) AS avg_salary
FROM employees
GROUP BY department_id;

-- Number of orders per status
SELECT status, COUNT(*) AS count
FROM orders
GROUP BY status;

-- Total revenue per order status
SELECT status, ROUND(SUM(total_amount), 2) AS total
FROM orders
GROUP BY status
ORDER BY total DESC;
\`\`\`

---

## GROUP BY with Multiple Columns

Group by a combination — one row per unique combination:

\`\`\`sql
-- Employee count by (department, active status)
SELECT department_id, is_active, COUNT(*) AS count
FROM employees
GROUP BY department_id, is_active
ORDER BY department_id, is_active;

-- Revenue by (status, month)
SELECT
  status,
  SUBSTR(order_date, 1, 7) AS month,
  COUNT(*)                 AS order_count,
  SUM(total_amount)        AS revenue
FROM orders
GROUP BY status, SUBSTR(order_date, 1, 7)
ORDER BY month, status;
\`\`\`

---

## The SELECT Rule with GROUP BY

**Critical rule:** In a SELECT with GROUP BY, every column must either:
1. Be in the GROUP BY clause, OR
2. Be inside an aggregate function

\`\`\`sql
-- ❌ WRONG: 'name' is neither grouped nor aggregated
SELECT department_id, name, COUNT(*)
FROM employees
GROUP BY department_id;
-- Error: 'name' not in GROUP BY (in strict databases)
-- SQLite allows this but returns an arbitrary name — unreliable!

-- ✅ CORRECT: all columns are either grouped or aggregated
SELECT department_id, COUNT(*) AS count, MAX(salary) AS top_salary
FROM employees
GROUP BY department_id;
\`\`\`

---

## GROUP BY with WHERE

\`WHERE\` filters rows BEFORE grouping:

\`\`\`sql
-- Average salary per department — ONLY for active employees
SELECT department_id, ROUND(AVG(salary), 0) AS avg_salary
FROM employees
WHERE is_active = 1          -- filter BEFORE grouping
GROUP BY department_id
ORDER BY avg_salary DESC;

-- Products sold per category — only completed orders
SELECT p.category_id,
       COUNT(*)           AS items_sold,
       SUM(oi.quantity)   AS units_sold
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'delivered'
GROUP BY p.category_id;
\`\`\`

---

## Grouping by Expressions

\`\`\`sql
-- Orders per month (extract YYYY-MM from date string)
SELECT
  SUBSTR(order_date, 1, 7) AS year_month,
  COUNT(*)                 AS orders,
  ROUND(SUM(total_amount), 2) AS revenue
FROM orders
GROUP BY SUBSTR(order_date, 1, 7)
ORDER BY year_month;

-- Employees per year hired
SELECT
  SUBSTR(hire_date, 1, 4) AS year,
  COUNT(*) AS new_hires
FROM employees
GROUP BY SUBSTR(hire_date, 1, 4)
ORDER BY year;

-- Products by price tier
SELECT
  CASE
    WHEN price < 50  THEN 'Budget (< $50)'
    WHEN price < 200 THEN 'Mid ($50-200)'
    ELSE                  'Premium (> $200)'
  END AS price_tier,
  COUNT(*) AS products
FROM products
GROUP BY
  CASE
    WHEN price < 50  THEN 'Budget (< $50)'
    WHEN price < 200 THEN 'Mid ($50-200)'
    ELSE                  'Premium (> $200)'
  END;
\`\`\`

---

## NULL in GROUP BY

NULL values form their own group:

\`\`\`sql
SELECT department_id, COUNT(*) AS count
FROM employees
GROUP BY department_id;
-- The NULL department appears as its own row: NULL | 1
\`\`\`
    `,
    contentAr: `
## GROUP BY

يُقسِّم \`GROUP BY\` الصفوف إلى مجموعات بناءً على القيم الفريدة في عمود أو أكثر، ثم يُطبِّق دوال التجميع على كل مجموعة بشكل منفصل.

بدون GROUP BY، تُلخِّص دالة التجميع جميع الصفوف في نتيجة واحدة. أما مع GROUP BY، فتحصل على نتيجة **لكل مجموعة**.

---

## الصياغة الأساسية

\`\`\`sql
SELECT grouping_column, aggregate_function(other_column)
FROM table_name
GROUP BY grouping_column;
\`\`\`

---

## التجميع البسيط

\`\`\`sql
-- عدد الموظفين لكل قسم
SELECT department_id, COUNT(*) AS headcount
FROM employees
GROUP BY department_id;

-- متوسط الراتب لكل قسم
SELECT department_id, ROUND(AVG(salary), 0) AS avg_salary
FROM employees
GROUP BY department_id;

-- عدد الطلبات لكل حالة
SELECT status, COUNT(*) AS count
FROM orders
GROUP BY status;

-- إجمالي الإيرادات لكل حالة طلب
SELECT status, ROUND(SUM(total_amount), 2) AS total
FROM orders
GROUP BY status
ORDER BY total DESC;
\`\`\`

---

## GROUP BY بأعمدة متعددة

التجميع بمجموعة من القيم — صف واحد لكل مجموعة فريدة:

\`\`\`sql
-- عدد الموظفين حسب (القسم، حالة النشاط)
SELECT department_id, is_active, COUNT(*) AS count
FROM employees
GROUP BY department_id, is_active
ORDER BY department_id, is_active;

-- الإيرادات حسب (الحالة، الشهر)
SELECT
  status,
  SUBSTR(order_date, 1, 7) AS month,
  COUNT(*)                 AS order_count,
  SUM(total_amount)        AS revenue
FROM orders
GROUP BY status, SUBSTR(order_date, 1, 7)
ORDER BY month, status;
\`\`\`

---

## قاعدة SELECT مع GROUP BY

**قاعدة أساسية:** في SELECT مع GROUP BY، يجب على كل عمود إما:
1. أن يكون في جملة GROUP BY، أو
2. أن يكون داخل دالة تجميع

\`\`\`sql
-- ❌ خطأ: 'name' ليست مُجمَّعة ولا داخل دالة تجميع
SELECT department_id, name, COUNT(*)
FROM employees
GROUP BY department_id;
-- خطأ: 'name' ليست في GROUP BY (في قواعد البيانات الصارمة)
-- SQLite تسمح بهذا لكنها تُعيد اسماً عشوائياً — غير موثوق!

-- ✅ صحيح: جميع الأعمدة إما مُجمَّعة أو داخل دالة تجميع
SELECT department_id, COUNT(*) AS count, MAX(salary) AS top_salary
FROM employees
GROUP BY department_id;
\`\`\`

---

## GROUP BY مع WHERE

يُرشِّح \`WHERE\` الصفوف قبل التجميع:

\`\`\`sql
-- متوسط الراتب لكل قسم — للموظفين النشطين فقط
SELECT department_id, ROUND(AVG(salary), 0) AS avg_salary
FROM employees
WHERE is_active = 1          -- تصفية قبل التجميع
GROUP BY department_id
ORDER BY avg_salary DESC;

-- المنتجات المباعة لكل فئة — الطلبات المكتملة فقط
SELECT p.category_id,
       COUNT(*)           AS items_sold,
       SUM(oi.quantity)   AS units_sold
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'delivered'
GROUP BY p.category_id;
\`\`\`

---

## التجميع بالتعبيرات

\`\`\`sql
-- الطلبات شهرياً (استخراج YYYY-MM من سلسلة التاريخ)
SELECT
  SUBSTR(order_date, 1, 7) AS year_month,
  COUNT(*)                 AS orders,
  ROUND(SUM(total_amount), 2) AS revenue
FROM orders
GROUP BY SUBSTR(order_date, 1, 7)
ORDER BY year_month;

-- الموظفون المُوظَّفون سنوياً
SELECT
  SUBSTR(hire_date, 1, 4) AS year,
  COUNT(*) AS new_hires
FROM employees
GROUP BY SUBSTR(hire_date, 1, 4)
ORDER BY year;

-- المنتجات حسب فئة السعر
SELECT
  CASE
    WHEN price < 50  THEN 'Budget (< $50)'
    WHEN price < 200 THEN 'Mid ($50-200)'
    ELSE                  'Premium (> $200)'
  END AS price_tier,
  COUNT(*) AS products
FROM products
GROUP BY
  CASE
    WHEN price < 50  THEN 'Budget (< $50)'
    WHEN price < 200 THEN 'Mid ($50-200)'
    ELSE                  'Premium (> $200)'
  END;
\`\`\`

---

## NULL في GROUP BY

تُشكِّل قيم NULL مجموعة خاصة بها:

\`\`\`sql
SELECT department_id, COUNT(*) AS count
FROM employees
GROUP BY department_id;
-- يظهر قسم NULL كصف مستقل: NULL | 1
\`\`\`
    `,
    example: `-- Comprehensive department analysis
SELECT
  d.name                        AS department,
  COUNT(e.id)                   AS headcount,
  ROUND(MIN(e.salary), 0)       AS min_salary,
  ROUND(MAX(e.salary), 0)       AS max_salary,
  ROUND(AVG(e.salary), 0)       AS avg_salary,
  ROUND(SUM(e.salary), 0)       AS total_payroll
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id
GROUP BY d.id, d.name
ORDER BY total_payroll DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Count the number of employees in each department (group by department_id).',
        questionAr: 'أحصِ عدد الموظفين في كل قسم (جمِّع بـ department_id).',
        hint: 'GROUP BY department_id with COUNT(*)',
        hintAr: 'GROUP BY department_id مع COUNT(*)',
        expectedQuery: 'SELECT department_id, COUNT(*) AS headcount FROM employees GROUP BY department_id',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find the total number of orders and total revenue per order status.',
        questionAr: 'أوجد إجمالي عدد الطلبات وإجمالي الإيرادات لكل حالة طلب.',
        hint: 'GROUP BY status with COUNT(*) and SUM(total_amount)',
        hintAr: 'GROUP BY status مع COUNT(*) وSUM(total_amount)',
        expectedQuery: 'SELECT status, COUNT(*) AS orders, SUM(total_amount) AS revenue FROM orders GROUP BY status',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Find the number of products per category (category_id) and their average price, sorted by average price descending.',
        questionAr: 'أوجد عدد المنتجات لكل فئة (category_id) ومتوسط سعرها، مرتبةً تنازلياً بحسب متوسط السعر.',
        hint: 'GROUP BY category_id with COUNT and AVG, then ORDER BY',
        hintAr: 'GROUP BY category_id مع COUNT وAVG، ثم ORDER BY',
        expectedQuery: 'SELECT category_id, COUNT(*) AS products, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category_id ORDER BY avg_price DESC',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 20,
    title: 'HAVING',
    titleAr: 'شرط HAVING',
    description: 'Filter groups after aggregation — the difference between WHERE and HAVING.',
    descriptionAr: 'تصفية المجموعات بعد التجميع — الفرق بين WHERE وHAVING.',
    content: `
## HAVING — Filtering Groups

\`HAVING\` filters groups **after** \`GROUP BY\` has been applied. While \`WHERE\` filters individual rows before grouping, \`HAVING\` filters groups after aggregation.

---

## WHERE vs HAVING — The Key Difference

\`\`\`sql
-- WHERE: filters rows BEFORE grouping (cannot use aggregates)
SELECT department_id, COUNT(*) AS count
FROM employees
WHERE salary > 70000       -- filters individual rows first
GROUP BY department_id;

-- HAVING: filters groups AFTER aggregation (CAN use aggregates)
SELECT department_id, COUNT(*) AS count
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 3;       -- filters groups with more than 3 employees

-- BOTH together: WHERE filters rows first, then GROUP BY groups, then HAVING filters groups
SELECT department_id, ROUND(AVG(salary), 0) AS avg_sal
FROM employees
WHERE is_active = 1                -- Step 1: keep only active employees
GROUP BY department_id             -- Step 2: group them
HAVING AVG(salary) > 70000;       -- Step 3: keep only groups with high avg salary
\`\`\`

---

## Common HAVING Examples

\`\`\`sql
-- Departments with more than 4 employees
SELECT department_id, COUNT(*) AS headcount
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 4;

-- Product categories with average price over $100
SELECT category_id, ROUND(AVG(price), 2) AS avg_price
FROM products
GROUP BY category_id
HAVING AVG(price) > 100;

-- Customers with more than 1 order
SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 1
ORDER BY order_count DESC;

-- Departments with total payroll over $300k
SELECT department_id,
       COUNT(*)         AS employees,
       SUM(salary)      AS total_payroll
FROM employees
GROUP BY department_id
HAVING SUM(salary) > 300000
ORDER BY total_payroll DESC;

-- Status groups with average order value above $200
SELECT status, ROUND(AVG(total_amount), 2) AS avg_value
FROM orders
GROUP BY status
HAVING AVG(total_amount) > 200;
\`\`\`

---

## HAVING with Multiple Conditions

\`\`\`sql
-- Departments with 3-6 employees AND average salary above $65k
SELECT department_id,
       COUNT(*)                AS headcount,
       ROUND(AVG(salary), 0)  AS avg_salary
FROM employees
GROUP BY department_id
HAVING COUNT(*) BETWEEN 3 AND 6
   AND AVG(salary) > 65000;

-- Categories with more than 3 products AND total stock over 200 units
SELECT category_id,
       COUNT(*)            AS products,
       SUM(stock_quantity) AS total_stock
FROM products
WHERE is_available = 1
GROUP BY category_id
HAVING COUNT(*) > 3
   AND SUM(stock_quantity) > 200;
\`\`\`

---

## Can You Use Aliases in HAVING?

In most databases (including SQLite): **NO** — HAVING runs before SELECT finalizes aliases.

\`\`\`sql
-- ❌ Usually fails or unreliable
SELECT department_id, COUNT(*) AS headcount
FROM employees
GROUP BY department_id
HAVING headcount > 3;  -- 'headcount' alias not available in strict mode

-- ✅ Always safe: repeat the expression
SELECT department_id, COUNT(*) AS headcount
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 3;
\`\`\`

---

## Full Query Clause Order (Execution vs Written)

**Written order:**
\`\`\`sql
SELECT department_id, COUNT(*), AVG(salary)
FROM employees
WHERE is_active = 1
GROUP BY department_id
HAVING AVG(salary) > 70000
ORDER BY AVG(salary) DESC
LIMIT 3;
\`\`\`

**Execution order:**
1. FROM — get the table
2. WHERE — filter individual rows
3. GROUP BY — form groups
4. HAVING — filter groups
5. SELECT — compute columns
6. ORDER BY — sort
7. LIMIT — cap results
    `,
    contentAr: `
## HAVING — تصفية المجموعات

يُصفِّي \`HAVING\` المجموعات **بعد** تطبيق \`GROUP BY\`. بينما يُصفِّي \`WHERE\` الصفوف الفردية قبل التجميع، يُصفِّي \`HAVING\` المجموعات بعد التجميع.

---

## WHERE مقابل HAVING — الفرق الأساسي

\`\`\`sql
-- WHERE: يُصفِّي الصفوف قبل التجميع (لا يمكن استخدام دوال التجميع)
SELECT department_id, COUNT(*) AS count
FROM employees
WHERE salary > 70000       -- تصفية الصفوف الفردية أولاً
GROUP BY department_id;

-- HAVING: يُصفِّي المجموعات بعد التجميع (يمكن استخدام دوال التجميع)
SELECT department_id, COUNT(*) AS count
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 3;       -- تصفية المجموعات ذات أكثر من 3 موظفين

-- كلاهما معاً: WHERE يُصفِّي الصفوف أولاً، ثم GROUP BY يُجمِّع، ثم HAVING يُصفِّي المجموعات
SELECT department_id, ROUND(AVG(salary), 0) AS avg_sal
FROM employees
WHERE is_active = 1                -- الخطوة 1: الموظفون النشطون فقط
GROUP BY department_id             -- الخطوة 2: التجميع
HAVING AVG(salary) > 70000;       -- الخطوة 3: المجموعات ذات متوسط راتب مرتفع فقط
\`\`\`

---

## أمثلة شائعة على HAVING

\`\`\`sql
-- الأقسام التي بها أكثر من 4 موظفين
SELECT department_id, COUNT(*) AS headcount
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 4;

-- فئات المنتجات ذات متوسط سعر يتجاوز $100
SELECT category_id, ROUND(AVG(price), 2) AS avg_price
FROM products
GROUP BY category_id
HAVING AVG(price) > 100;

-- العملاء الذين لديهم أكثر من طلب واحد
SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 1
ORDER BY order_count DESC;

-- الأقسام التي يتجاوز إجمالي رواتبها $300k
SELECT department_id,
       COUNT(*)         AS employees,
       SUM(salary)      AS total_payroll
FROM employees
GROUP BY department_id
HAVING SUM(salary) > 300000
ORDER BY total_payroll DESC;

-- مجموعات الحالة ذات متوسط قيمة طلب يتجاوز $200
SELECT status, ROUND(AVG(total_amount), 2) AS avg_value
FROM orders
GROUP BY status
HAVING AVG(total_amount) > 200;
\`\`\`

---

## HAVING بشروط متعددة

\`\`\`sql
-- الأقسام التي بها 3-6 موظفين ومتوسط راتب يتجاوز $65k
SELECT department_id,
       COUNT(*)                AS headcount,
       ROUND(AVG(salary), 0)  AS avg_salary
FROM employees
GROUP BY department_id
HAVING COUNT(*) BETWEEN 3 AND 6
   AND AVG(salary) > 65000;

-- الفئات التي بها أكثر من 3 منتجات وإجمالي مخزون يتجاوز 200 وحدة
SELECT category_id,
       COUNT(*)            AS products,
       SUM(stock_quantity) AS total_stock
FROM products
WHERE is_available = 1
GROUP BY category_id
HAVING COUNT(*) > 3
   AND SUM(stock_quantity) > 200;
\`\`\`

---

## هل يمكن استخدام الأسماء المستعارة في HAVING؟

في معظم قواعد البيانات (بما فيها SQLite): **لا** — يعمل HAVING قبل أن يُنهي SELECT معالجة الأسماء المستعارة.

\`\`\`sql
-- ❌ قد يفشل أو غير موثوق
SELECT department_id, COUNT(*) AS headcount
FROM employees
GROUP BY department_id
HAVING headcount > 3;  -- الاسم المستعار 'headcount' غير متاح في الوضع الصارم

-- ✅ آمن دائماً: كرِّر التعبير
SELECT department_id, COUNT(*) AS headcount
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 3;
\`\`\`

---

## ترتيب جمل الاستعلام الكامل (التنفيذ مقابل الكتابة)

**ترتيب الكتابة:**
\`\`\`sql
SELECT department_id, COUNT(*), AVG(salary)
FROM employees
WHERE is_active = 1
GROUP BY department_id
HAVING AVG(salary) > 70000
ORDER BY AVG(salary) DESC
LIMIT 3;
\`\`\`

**ترتيب التنفيذ:**
1. FROM — احصل على الجدول
2. WHERE — صفِّ الصفوف الفردية
3. GROUP BY — كوِّن المجموعات
4. HAVING — صفِّ المجموعات
5. SELECT — احسب الأعمدة
6. ORDER BY — رتِّب
7. LIMIT — حدِّد النتائج
    `,
    example: `-- Suppliers with more than 2 products AND average price > $80
SELECT
  supplier,
  COUNT(*)              AS product_count,
  ROUND(AVG(price), 2)  AS avg_price,
  MIN(price)            AS cheapest,
  MAX(price)            AS most_expensive
FROM products
WHERE is_available = 1
GROUP BY supplier
HAVING COUNT(*) >= 2
   AND AVG(price) > 50
ORDER BY avg_price DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Find departments that have more than 4 employees.',
        questionAr: 'أوجد الأقسام التي لديها أكثر من 4 موظفين.',
        hint: 'GROUP BY department_id HAVING COUNT(*) > 4',
        hintAr: 'GROUP BY department_id HAVING COUNT(*) > 4',
        expectedQuery: 'SELECT department_id, COUNT(*) AS headcount FROM employees GROUP BY department_id HAVING COUNT(*) > 4',
        checkFunction: (result) => (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find customers who have placed more than 2 orders.',
        questionAr: 'أوجد العملاء الذين وضعوا أكثر من طلبين.',
        hint: 'GROUP BY customer_id HAVING COUNT(*) > 2',
        hintAr: 'GROUP BY customer_id HAVING COUNT(*) > 2',
        expectedQuery: 'SELECT customer_id, COUNT(*) AS orders FROM orders GROUP BY customer_id HAVING COUNT(*) > 2',
        checkFunction: (result) => (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Find product categories where the average price is between $50 and $200.',
        questionAr: 'أوجد فئات المنتجات التي يتراوح متوسط سعرها بين $50 و$200.',
        hint: 'HAVING AVG(price) BETWEEN 50 AND 200',
        hintAr: 'HAVING AVG(price) BETWEEN 50 AND 200',
        expectedQuery: 'SELECT category_id, ROUND(AVG(price), 2) AS avg_price FROM products GROUP BY category_id HAVING AVG(price) BETWEEN 50 AND 200',
        checkFunction: (result) => (result) => result.length > 0,
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 6 — JOINs
  // ════════════════════════════════════════════════════
  {
    id: 21,
    title: 'Introduction to JOINs',
    titleAr: 'مقدمة إلى عمليات JOIN',
    description: 'Why JOINs exist, the relational model, table aliases, and cartesian products.',
    descriptionAr: 'لماذا توجد عمليات JOIN، النموذج العلائقي، أسماء مستعارة للجداول، والضرب الديكارتي.',
    content: `
## Why JOINs Exist

Real databases store data across multiple tables to avoid **redundancy**. Instead of storing the department name in every employee row, you store a \`department_id\` and look up the name in the departments table when needed.

JOINs let you **combine rows from two or more tables** based on a related column.

---

## Without JOIN — The Cartesian Product

If you list multiple tables in FROM without a JOIN condition, you get a **cartesian product** — every row from table A paired with every row from table B:

\`\`\`sql
-- ❌ Cartesian product: 25 employees × 6 departments = 150 rows!
SELECT e.name, d.name
FROM employees e, departments d;
-- This is almost never what you want

-- ✅ With a JOIN condition: only matching pairs
SELECT e.name, d.name
FROM employees e
JOIN departments d ON e.department_id = d.id;
-- Returns 24 rows (1 employee has NULL department_id)
\`\`\`

---

## Table Aliases

When JOINing, always use table aliases to:
- Avoid ambiguous column names
- Write shorter queries

\`\`\`sql
-- Without aliases: verbose and error-prone
SELECT employees.name, departments.name, employees.salary
FROM employees JOIN departments ON employees.department_id = departments.id;

-- With aliases: clean and standard
SELECT e.name, d.name, e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id;
\`\`\`

---

## The ON Clause

\`ON\` specifies how tables are related. Almost always it's:
\`\`\`
child_table.foreign_key = parent_table.primary_key
\`\`\`

\`\`\`sql
-- employees.department_id links to departments.id
SELECT e.name, d.name AS dept_name
FROM employees e
JOIN departments d ON e.department_id = d.id;

-- orders.customer_id links to customers.id
SELECT o.id, c.name AS customer_name, o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id;

-- order_items.product_id links to products.id
SELECT oi.order_id, p.name AS product, oi.quantity, oi.unit_price
FROM order_items oi
JOIN products p ON oi.product_id = p.id;
\`\`\`

---

## USING Clause (Shorthand)

If both tables have the same column name for the join key:

\`\`\`sql
-- If both tables had a column called 'department_id':
SELECT e.name, d.name
FROM employees e
JOIN departments d USING (department_id);
-- Equivalent to ON e.department_id = d.department_id
\`\`\`

---

## Resolving Ambiguous Column Names

When both tables have a column with the same name, you must qualify it:

\`\`\`sql
-- ❌ Ambiguous: both tables have 'name'
SELECT name FROM employees e JOIN departments d ON e.department_id = d.id;
-- Error: ambiguous column name: name

-- ✅ Qualified with table alias
SELECT e.name AS employee, d.name AS department
FROM employees e
JOIN departments d ON e.department_id = d.id;
\`\`\`
    `,
    contentAr: `
## لماذا توجد عمليات JOIN؟

تُخزِّن قواعد البيانات الحقيقية البيانات عبر جداول متعددة لتجنب **التكرار**. بدلاً من تخزين اسم القسم في كل صف من صفوف الموظفين، تُخزِّن \`department_id\` وتبحث عن الاسم في جدول departments عند الحاجة.

تُتيح لك عمليات JOIN **دمج صفوف من جدولين أو أكثر** بناءً على عمود مرتبط.

---

## بدون JOIN — الضرب الديكارتي (Cartesian Product)

إذا ذكرت جداول متعددة في FROM بدون شرط JOIN، ستحصل على **ضرب ديكارتي** — كل صف من الجدول A مقترن بكل صف من الجدول B:

\`\`\`sql
-- ❌ ضرب ديكارتي: 25 موظف × 6 أقسام = 150 صف!
SELECT e.name, d.name
FROM employees e, departments d;
-- هذا ليس ما تريده في الغالب

-- ✅ مع شرط JOIN: الأزواج المتطابقة فقط
SELECT e.name, d.name
FROM employees e
JOIN departments d ON e.department_id = d.id;
-- تُعيد 24 صفاً (موظف واحد لديه NULL في department_id)
\`\`\`

---

## الأسماء المستعارة للجداول (Table Aliases)

عند استخدام JOIN، استخدم دائماً أسماء مستعارة للجداول لـ:
- تجنب أسماء الأعمدة الغامضة
- كتابة استعلامات أقصر

\`\`\`sql
-- بدون أسماء مستعارة: مطوّل وعرضة للأخطاء
SELECT employees.name, departments.name, employees.salary
FROM employees JOIN departments ON employees.department_id = departments.id;

-- مع أسماء مستعارة: نظيف وقياسي
SELECT e.name, d.name, e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id;
\`\`\`

---

## جملة ON

تُحدِّد \`ON\` كيف ترتبط الجداول. في الغالب تكون:
\`\`\`
child_table.foreign_key = parent_table.primary_key
\`\`\`

\`\`\`sql
-- employees.department_id يرتبط بـ departments.id
SELECT e.name, d.name AS dept_name
FROM employees e
JOIN departments d ON e.department_id = d.id;

-- orders.customer_id يرتبط بـ customers.id
SELECT o.id, c.name AS customer_name, o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.id;

-- order_items.product_id يرتبط بـ products.id
SELECT oi.order_id, p.name AS product, oi.quantity, oi.unit_price
FROM order_items oi
JOIN products p ON oi.product_id = p.id;
\`\`\`

---

## جملة USING (اختصار)

إذا كان لدى الجدولين نفس اسم عمود مفتاح JOIN:

\`\`\`sql
-- إذا كان لدى الجدولين عمود باسم 'department_id':
SELECT e.name, d.name
FROM employees e
JOIN departments d USING (department_id);
-- مكافئ لـ ON e.department_id = d.department_id
\`\`\`

---

## حل تعارض أسماء الأعمدة

عندما يكون لدى الجدولين عمود بنفس الاسم، يجب تأهيله:

\`\`\`sql
-- ❌ غامض: لدى الجدولين عمود 'name'
SELECT name FROM employees e JOIN departments d ON e.department_id = d.id;
-- خطأ: اسم عمود غامض: name

-- ✅ مُؤهَّل باسم مستعار للجدول
SELECT e.name AS employee, d.name AS department
FROM employees e
JOIN departments d ON e.department_id = d.id;
\`\`\`
    `,
    example: `-- Basic join: employees with their department names
SELECT
  e.id,
  e.name          AS employee,
  e.job_title,
  d.name          AS department,
  d.location,
  e.salary
FROM employees e
JOIN departments d ON e.department_id = d.id
ORDER BY d.name, e.salary DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Join the orders table with the customers table to show order id, customer name, order date, and status.',
        questionAr: 'اضمم جدول orders مع جدول customers لعرض معرّف الطلب واسم العميل وتاريخ الطلب والحالة.',
        hint: 'JOIN customers c ON o.customer_id = c.id',
        hintAr: 'JOIN customers c ON o.customer_id = c.id',
        expectedQuery: 'SELECT o.id, c.name, o.order_date, o.status FROM orders o JOIN customers c ON o.customer_id = c.id',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Join order_items with products to show order_id, product name, quantity, and unit_price.',
        questionAr: 'اضمم جدول order_items مع جدول products لعرض order_id واسم المنتج والكمية وunit_price.',
        hint: 'JOIN products p ON oi.product_id = p.id',
        hintAr: 'JOIN products p ON oi.product_id = p.id',
        expectedQuery: 'SELECT oi.order_id, p.name, oi.quantity, oi.unit_price FROM order_items oi JOIN products p ON oi.product_id = p.id',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 22,
    title: 'INNER JOIN',
    titleAr: 'الضم الداخلي INNER JOIN',
    description: 'Return only matching rows from both tables — the most common JOIN type.',
    descriptionAr: 'إرجاع الصفوف المتطابقة فقط من كلا الجدولين — أكثر أنواع JOIN استخداماً.',
    content: `
## INNER JOIN

\`INNER JOIN\` returns only rows where the join condition matches in **both** tables. Non-matching rows are excluded entirely.

\`\`\`sql
SELECT columns
FROM table_a a
INNER JOIN table_b b ON a.key = b.key;
\`\`\`

The keyword \`INNER\` is optional — \`JOIN\` alone means INNER JOIN.

---

## How INNER JOIN Works

\`\`\`
employees table:          departments table:
id | name   | dept_id    id | name
1  | Alice  | 1          1  | Engineering
2  | Bob    | 1          2  | Marketing
3  | Carol  | 4          -- no id=4 in departments!
4  | David  | NULL       -- NULL doesn't match anything

INNER JOIN result:
id | name  | dept_id | dept_name
1  | Alice | 1       | Engineering
2  | Bob   | 1       | Engineering
-- Carol and David are EXCLUDED (no match)
\`\`\`

---

## Basic INNER JOIN Examples

\`\`\`sql
-- Employees with their department names
SELECT e.name, e.salary, d.name AS dept_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
-- Returns 24 rows (Wendy Allen has NULL dept, so she's excluded)

-- Customers with their orders
SELECT c.name AS customer, o.id AS order_id, o.order_date, o.status
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;
-- Only customers who have at least one order appear

-- Orders with line item details
SELECT o.id, c.name AS customer, p.name AS product, oi.quantity, oi.unit_price
FROM orders o
INNER JOIN customers c   ON o.customer_id = c.id
INNER JOIN order_items oi ON oi.order_id = o.id
INNER JOIN products p    ON oi.product_id = p.id
ORDER BY o.id;
\`\`\`

---

## INNER JOIN with Filtering

\`\`\`sql
-- Engineering employees only
SELECT e.name, e.job_title, e.salary, d.name AS dept
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.name = 'Engineering'
ORDER BY e.salary DESC;

-- Delivered orders with customer country
SELECT c.country, COUNT(*) AS delivered_orders, SUM(o.total_amount) AS revenue
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.status = 'delivered'
GROUP BY c.country
ORDER BY revenue DESC;

-- Products ordered more than once
SELECT p.name, COUNT(*) AS times_ordered, SUM(oi.quantity) AS total_units
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.id, p.name
HAVING COUNT(*) > 1
ORDER BY total_units DESC;
\`\`\`

---

## Multi-Level JOIN (3 or more tables)

\`\`\`sql
-- Full order breakdown: customer → order → items → product → category
SELECT
  c.name             AS customer,
  o.id               AS order_id,
  o.order_date,
  p.name             AS product,
  cat.name           AS category,
  oi.quantity,
  oi.unit_price,
  oi.quantity * oi.unit_price AS line_total
FROM orders o
JOIN customers c   ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p    ON oi.product_id = p.id
JOIN categories cat ON p.category_id = cat.id
WHERE o.status = 'delivered'
ORDER BY o.id, line_total DESC;
\`\`\`

---

## INNER JOIN vs Subquery — When to Use Which

\`\`\`sql
-- Using JOIN: typically faster, more readable for simple cases
SELECT DISTINCT c.name
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'delivered';

-- Using subquery: sometimes clearer for complex logic
SELECT name
FROM customers
WHERE id IN (
  SELECT DISTINCT customer_id
  FROM orders
  WHERE status = 'delivered'
);
\`\`\`
    `,
    contentAr: `
## INNER JOIN

يُعيد \`INNER JOIN\` الصفوف فقط عندما يتطابق شرط الضم في **كلا** الجدولين. الصفوف غير المتطابقة تُستبعد كلياً.

\`\`\`sql
SELECT columns
FROM table_a a
INNER JOIN table_b b ON a.key = b.key;
\`\`\`

الكلمة \`INNER\` اختيارية — \`JOIN\` وحدها تعني INNER JOIN.

---

## كيف يعمل INNER JOIN؟

\`\`\`
جدول employees:           جدول departments:
id | name   | dept_id    id | name
1  | Alice  | 1          1  | Engineering
2  | Bob    | 1          2  | Marketing
3  | Carol  | 4          -- لا يوجد id=4 في departments!
4  | David  | NULL       -- NULL لا يطابق أي شيء

نتيجة INNER JOIN:
id | name  | dept_id | dept_name
1  | Alice | 1       | Engineering
2  | Bob   | 1       | Engineering
-- Carol وDavid مُستبعَدان (لا تطابق)
\`\`\`

---

## أمثلة أساسية على INNER JOIN

\`\`\`sql
-- الموظفون مع أسماء أقسامهم
SELECT e.name, e.salary, d.name AS dept_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
-- تُعيد 24 صفاً (Wendy Allen لديها NULL في dept، لذا تُستبعد)

-- العملاء مع طلباتهم
SELECT c.name AS customer, o.id AS order_id, o.order_date, o.status
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id;
-- يظهر فقط العملاء الذين لديهم طلب واحد على الأقل

-- الطلبات مع تفاصيل العناصر
SELECT o.id, c.name AS customer, p.name AS product, oi.quantity, oi.unit_price
FROM orders o
INNER JOIN customers c   ON o.customer_id = c.id
INNER JOIN order_items oi ON oi.order_id = o.id
INNER JOIN products p    ON oi.product_id = p.id
ORDER BY o.id;
\`\`\`

---

## INNER JOIN مع التصفية

\`\`\`sql
-- موظفو الهندسة فقط
SELECT e.name, e.job_title, e.salary, d.name AS dept
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.name = 'Engineering'
ORDER BY e.salary DESC;

-- الطلبات المُسلَّمة مع دولة العميل
SELECT c.country, COUNT(*) AS delivered_orders, SUM(o.total_amount) AS revenue
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.status = 'delivered'
GROUP BY c.country
ORDER BY revenue DESC;

-- المنتجات التي طُلبت أكثر من مرة
SELECT p.name, COUNT(*) AS times_ordered, SUM(oi.quantity) AS total_units
FROM order_items oi
JOIN products p ON oi.product_id = p.id
GROUP BY p.id, p.name
HAVING COUNT(*) > 1
ORDER BY total_units DESC;
\`\`\`

---

## JOIN متعدد المستويات (3 جداول أو أكثر)

\`\`\`sql
-- تفاصيل الطلبات الكاملة: عميل → طلب → عناصر → منتج → فئة
SELECT
  c.name             AS customer,
  o.id               AS order_id,
  o.order_date,
  p.name             AS product,
  cat.name           AS category,
  oi.quantity,
  oi.unit_price,
  oi.quantity * oi.unit_price AS line_total
FROM orders o
JOIN customers c   ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p    ON oi.product_id = p.id
JOIN categories cat ON p.category_id = cat.id
WHERE o.status = 'delivered'
ORDER BY o.id, line_total DESC;
\`\`\`

---

## INNER JOIN مقابل Subquery — متى تستخدم كل منهما؟

\`\`\`sql
-- باستخدام JOIN: أسرع عادةً وأوضح للحالات البسيطة
SELECT DISTINCT c.name
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'delivered';

-- باستخدام subquery: أحياناً أوضح للمنطق المعقد
SELECT name
FROM customers
WHERE id IN (
  SELECT DISTINCT customer_id
  FROM orders
  WHERE status = 'delivered'
);
\`\`\`
    `,
    example: `-- Revenue by product category (requires 4 table joins)
SELECT
  cat.name                          AS category,
  COUNT(DISTINCT o.id)              AS orders,
  SUM(oi.quantity)                  AS units_sold,
  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS revenue
FROM order_items oi
JOIN orders o    ON oi.order_id = o.id
JOIN products p  ON oi.product_id = p.id
JOIN categories cat ON p.category_id = cat.id
WHERE o.status IN ('delivered', 'shipped')
GROUP BY cat.id, cat.name
ORDER BY revenue DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Show each employee\'s name, job_title, salary, and their department name (from departments table). Sort by salary descending.',
        questionAr: 'اعرض اسم كل موظف وjob_title والراتب واسم قسمه (من جدول departments). رتِّب تنازلياً بحسب الراتب.',
        hint: 'JOIN departments d ON e.department_id = d.id',
        hintAr: 'JOIN departments d ON e.department_id = d.id',
        expectedQuery: 'SELECT e.name, e.job_title, e.salary, d.name AS department FROM employees e JOIN departments d ON e.department_id = d.id ORDER BY e.salary DESC',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Show order id, customer name, and order total for all delivered orders.',
        questionAr: 'اعرض معرّف الطلب واسم العميل وإجمالي الطلب لجميع الطلبات المُسلَّمة.',
        hint: "JOIN customers ON orders.customer_id = customers.id WHERE status = 'delivered'",
        hintAr: "JOIN customers ON orders.customer_id = customers.id WHERE status = 'delivered'",
        expectedQuery: "SELECT o.id, c.name, o.total_amount FROM orders o JOIN customers c ON o.customer_id = c.id WHERE o.status = 'delivered'",
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 23,
    title: 'LEFT JOIN & RIGHT JOIN',
    titleAr: 'الضم الخارجي LEFT JOIN و RIGHT JOIN',
    description: 'Preserve all rows from one table even when there is no match in the other.',
    descriptionAr: 'الحفاظ على جميع صفوف أحد الجدولين حتى عندما لا يوجد تطابق في الجدول الآخر.',
    content: `
## LEFT JOIN (LEFT OUTER JOIN)

\`LEFT JOIN\` returns **all rows from the left table**, plus matching rows from the right table. When there's no match, the right table columns are filled with NULL.

\`\`\`
LEFT TABLE (employees)    RIGHT TABLE (departments)
id | name  | dept_id      id | name
1  | Alice | 1             1 | Engineering
2  | Bob   | NULL          2 | Marketing

LEFT JOIN result:
id | name  | dept_id | dept_name
1  | Alice | 1       | Engineering
2  | Bob   | NULL    | NULL        ← Bob kept, dept_name is NULL
\`\`\`

---

## LEFT JOIN Examples

\`\`\`sql
-- ALL employees, even those with no department (1 excluded in INNER JOIN)
SELECT e.name, e.salary, d.name AS dept_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
-- Wendy Allen appears with NULL dept_name

-- Find employees WITH NO DEPARTMENT (anti-join pattern)
SELECT e.name, e.job_title
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE d.id IS NULL;
-- Returns employees where no matching department was found

-- All customers — including those with no orders
SELECT c.name, c.loyalty_tier, COUNT(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.loyalty_tier
ORDER BY order_count DESC;
-- Customers with no orders appear with count = 0

-- All departments with employee count (including empty departments)
SELECT d.name, COUNT(e.id) AS headcount
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id
GROUP BY d.id, d.name
ORDER BY headcount DESC;
\`\`\`

---

## The Anti-Join Pattern

Find rows in A that have NO match in B:

\`\`\`sql
-- Customers who have NEVER placed an order
SELECT c.name, c.email, c.joined_date
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;  -- no matching order exists

-- Products that have NEVER been ordered
SELECT p.name, p.price, p.stock_quantity
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.id IS NULL;

-- Employees with no manager (top-level)
SELECT e.name, e.job_title
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
WHERE m.id IS NULL;
\`\`\`

---

## RIGHT JOIN

\`RIGHT JOIN\` is the mirror of LEFT JOIN — all rows from the right table are preserved.

\`\`\`sql
-- All departments, even if they have no employees
SELECT d.name, e.name AS employee
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;

-- This is equivalent to swapping the table order with a LEFT JOIN:
SELECT d.name, e.name AS employee
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id;
-- EXACT same result — just written differently
\`\`\`

> In practice, **RIGHT JOIN is rarely used**. You can always rewrite it as a LEFT JOIN by switching table order. Most developers use only LEFT JOIN for clarity.

---

## INNER vs LEFT — Choosing the Right One

| Question | Use |
|----------|-----|
| "Show me employees with their departments" (only those who have one) | INNER JOIN |
| "Show me ALL employees, with department if available" | LEFT JOIN |
| "Which employees have no department?" | LEFT JOIN + WHERE right.key IS NULL |
| "Show ALL departments, with employee count" (even empty ones) | LEFT JOIN |

\`\`\`sql
-- INNER: only employees with a department (24 rows)
SELECT e.name, d.name FROM employees e JOIN departments d ON e.department_id = d.id;

-- LEFT: all employees, NULLs for those without a department (25 rows)
SELECT e.name, d.name FROM employees e LEFT JOIN departments d ON e.department_id = d.id;
\`\`\`
    `,
    contentAr: `
## LEFT JOIN (LEFT OUTER JOIN)

يُعيد \`LEFT JOIN\` **جميع صفوف الجدول الأيسر**، بالإضافة إلى الصفوف المتطابقة من الجدول الأيمن. عند عدم وجود تطابق، تُملأ أعمدة الجدول الأيمن بـ NULL.

\`\`\`
الجدول الأيسر (employees)    الجدول الأيمن (departments)
id | name  | dept_id      id | name
1  | Alice | 1             1 | Engineering
2  | Bob   | NULL          2 | Marketing

نتيجة LEFT JOIN:
id | name  | dept_id | dept_name
1  | Alice | 1       | Engineering
2  | Bob   | NULL    | NULL        ← Bob محتفظ به، dept_name بقيمة NULL
\`\`\`

---

## أمثلة على LEFT JOIN

\`\`\`sql
-- جميع الموظفين، حتى من ليس لديهم قسم (مستبعَد في INNER JOIN)
SELECT e.name, e.salary, d.name AS dept_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
-- Wendy Allen تظهر مع NULL في dept_name

-- أوجد الموظفين الذين ليس لديهم قسم (نمط anti-join)
SELECT e.name, e.job_title
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
WHERE d.id IS NULL;
-- يُعيد الموظفين الذين لا يوجد لهم قسم مطابق

-- جميع العملاء — بما فيهم من ليس لديهم طلبات
SELECT c.name, c.loyalty_tier, COUNT(o.id) AS order_count
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.loyalty_tier
ORDER BY order_count DESC;
-- العملاء بدون طلبات يظهرون بعدد = 0

-- جميع الأقسام مع عدد الموظفين (بما فيها الأقسام الفارغة)
SELECT d.name, COUNT(e.id) AS headcount
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id
GROUP BY d.id, d.name
ORDER BY headcount DESC;
\`\`\`

---

## نمط Anti-Join

أوجد صفوفاً في A ليس لها تطابق في B:

\`\`\`sql
-- العملاء الذين لم يضعوا أي طلب قط
SELECT c.name, c.email, c.joined_date
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;  -- لا يوجد طلب مطابق

-- المنتجات التي لم تُطلَب قط
SELECT p.name, p.price, p.stock_quantity
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.id IS NULL;

-- الموظفون بدون مدير (المستوى الأعلى)
SELECT e.name, e.job_title
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
WHERE m.id IS NULL;
\`\`\`

---

## RIGHT JOIN

\`RIGHT JOIN\` هو عكس LEFT JOIN — جميع صفوف الجدول الأيمن محفوظة.

\`\`\`sql
-- جميع الأقسام، حتى لو لم يكن فيها موظفون
SELECT d.name, e.name AS employee
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;

-- هذا مكافئ لتبديل ترتيب الجدول باستخدام LEFT JOIN:
SELECT d.name, e.name AS employee
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id;
-- نفس النتيجة تماماً — مكتوب بشكل مختلف فقط
\`\`\`

> في الممارسة العملية، **نادراً ما يُستخدم RIGHT JOIN**. يمكنك دائماً إعادة كتابته كـ LEFT JOIN بتبديل ترتيب الجداول. يستخدم معظم المطورين LEFT JOIN فقط من أجل الوضوح.

---

## INNER مقابل LEFT — اختيار النوع المناسب

| السؤال | استخدم |
|--------|--------|
| "أرني الموظفين مع أقسامهم" (فقط من لديهم قسم) | INNER JOIN |
| "أرني جميع الموظفين، مع القسم إذا وُجد" | LEFT JOIN |
| "أي الموظفين ليس لديهم قسم؟" | LEFT JOIN + WHERE right.key IS NULL |
| "أرني جميع الأقسام مع عدد الموظفين" (حتى الفارغة) | LEFT JOIN |

\`\`\`sql
-- INNER: الموظفون الذين لديهم قسم فقط (24 صفاً)
SELECT e.name, d.name FROM employees e JOIN departments d ON e.department_id = d.id;

-- LEFT: جميع الموظفين، NULL لمن ليس لديهم قسم (25 صفاً)
SELECT e.name, d.name FROM employees e LEFT JOIN departments d ON e.department_id = d.id;
\`\`\`
    `,
    example: `-- All departments with their employee headcount and avg salary
-- Includes departments even if they have no employees
SELECT
  d.name                        AS department,
  d.location,
  COUNT(e.id)                   AS headcount,
  ROUND(COALESCE(AVG(e.salary), 0), 0) AS avg_salary
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id AND e.is_active = 1
GROUP BY d.id, d.name, d.location
ORDER BY headcount DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Show ALL customers and the number of orders they have placed (including customers with 0 orders).',
        questionAr: 'اعرض جميع العملاء وعدد الطلبات التي وضعوها (بما فيهم العملاء الذين لديهم 0 طلبات).',
        hint: 'LEFT JOIN orders ON customers.id = orders.customer_id, then COUNT(orders.id)',
        hintAr: 'LEFT JOIN orders ON customers.id = orders.customer_id، ثم COUNT(orders.id)',
        expectedQuery: 'SELECT c.name, COUNT(o.id) AS order_count FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.id, c.name ORDER BY order_count DESC',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all products that have NEVER been ordered (appear in products but not in order_items).',
        questionAr: 'أوجد جميع المنتجات التي لم تُطلَب قط (موجودة في products لكن ليست في order_items).',
        hint: 'LEFT JOIN order_items ON products.id = order_items.product_id WHERE order_items.id IS NULL',
        hintAr: 'LEFT JOIN order_items ON products.id = order_items.product_id WHERE order_items.id IS NULL',
        expectedQuery: 'SELECT p.name, p.price FROM products p LEFT JOIN order_items oi ON p.id = oi.product_id WHERE oi.id IS NULL',
        checkFunction: (result) => (result) => result.length > 0,
      },
    ],
  },

  {
    id: 24,
    title: 'FULL OUTER JOIN & CROSS JOIN',
    titleAr: 'FULL OUTER JOIN و CROSS JOIN',
    description: 'Preserve rows from both tables, and generate all possible combinations.',
    descriptionAr: 'الحفاظ على صفوف كلا الجدولين، وتوليد جميع التوليفات الممكنة.',
    content: `
## FULL OUTER JOIN

\`FULL OUTER JOIN\` returns **all rows from both tables**. Rows from the left table with no match get NULLs for right-table columns, and vice versa.

\`\`\`
Left: employees          Right: departments
Alice — dept_id=1        id=1 Engineering  ← matches Alice/Bob
Bob   — dept_id=1        id=6 Legal        ← no employees
Carol — dept_id=NULL     ← no dept match

FULL OUTER JOIN:
Alice | Engineering
Bob   | Engineering
Carol | NULL          ← no dept match
NULL  | Legal         ← no employees
\`\`\`

\`\`\`sql
-- FULL OUTER JOIN: all employees AND all departments
SELECT e.name AS employee, d.name AS department
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;
\`\`\`

---

## SQLite doesn't support FULL OUTER JOIN!

SQLite omits it. Emulate with LEFT JOIN + UNION + RIGHT JOIN:

\`\`\`sql
-- Emulate FULL OUTER JOIN in SQLite
SELECT e.name AS employee, d.name AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id

UNION

SELECT e.name AS employee, d.name AS department
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id
WHERE e.id IS NULL;
-- The WHERE ensures we don't duplicate rows already in the first half
\`\`\`

---

## CROSS JOIN — Every Combination

\`CROSS JOIN\` pairs every row from table A with every row from table B (cartesian product). With 5 rows × 4 rows = 20 result rows.

\`\`\`sql
-- Every employee paired with every department (25 × 6 = 150 rows)
SELECT e.name, d.name AS dept
FROM employees e
CROSS JOIN departments d;

-- Generate date × employee combinations for a schedule
SELECT e.name, dates.day
FROM employees e
CROSS JOIN (
  VALUES ('2024-01-01'), ('2024-01-02'), ('2024-01-03')
) AS dates(day);
\`\`\`

### Real-world uses for CROSS JOIN:

\`\`\`sql
-- Generate a multiplication table
WITH numbers AS (
  SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
)
SELECT a.n, b.n, a.n * b.n AS product
FROM numbers a
CROSS JOIN numbers b
ORDER BY a.n, b.n;

-- All possible size × color combinations for a product
SELECT sizes.size, colors.color
FROM (VALUES ('S'),('M'),('L'),('XL'))   AS sizes(size)
CROSS JOIN (VALUES ('Red'),('Blue'),('Green')) AS colors(color);
\`\`\`

---

## JOIN Type Summary

| JOIN Type | Returns |
|-----------|---------|
| INNER JOIN | Only matching rows from both tables |
| LEFT JOIN | All left rows + matching right rows (NULL for no match) |
| RIGHT JOIN | Matching left rows + all right rows (NULL for no match) |
| FULL OUTER JOIN | All rows from both tables (NULL for no match either side) |
| CROSS JOIN | Every combination of rows (cartesian product) |
| SELF JOIN | Table joined with itself (covered in next lesson) |
    `,
    contentAr: `
## FULL OUTER JOIN

يُعيد \`FULL OUTER JOIN\` **جميع صفوف كلا الجدولين**. صفوف الجدول الأيسر التي لا تطابق تحصل على NULL في أعمدة الجدول الأيمن، والعكس صحيح.

\`\`\`
الأيسر: employees          الأيمن: departments
Alice — dept_id=1        id=1 Engineering  ← تطابق Alice/Bob
Bob   — dept_id=1        id=6 Legal        ← لا موظفين
Carol — dept_id=NULL     ← لا تطابق في departments

نتيجة FULL OUTER JOIN:
Alice | Engineering
Bob   | Engineering
Carol | NULL          ← لا تطابق في departments
NULL  | Legal         ← لا موظفين
\`\`\`

\`\`\`sql
-- FULL OUTER JOIN: جميع الموظفين وجميع الأقسام
SELECT e.name AS employee, d.name AS department
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;
\`\`\`

---

## SQLite لا تدعم FULL OUTER JOIN!

تُغفلها SQLite. تمثيلها باستخدام LEFT JOIN + UNION + RIGHT JOIN:

\`\`\`sql
-- محاكاة FULL OUTER JOIN في SQLite
SELECT e.name AS employee, d.name AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id

UNION

SELECT e.name AS employee, d.name AS department
FROM departments d
LEFT JOIN employees e ON e.department_id = d.id
WHERE e.id IS NULL;
-- WHERE يضمن عدم تكرار الصفوف الموجودة في النصف الأول
\`\`\`

---

## CROSS JOIN — جميع التوليفات

يُقرن \`CROSS JOIN\` كل صف من الجدول A مع كل صف من الجدول B (الضرب الديكارتي). مع 5 صفوف × 4 صفوف = 20 صف ناتج.

\`\`\`sql
-- كل موظف مقترن بكل قسم (25 × 6 = 150 صفاً)
SELECT e.name, d.name AS dept
FROM employees e
CROSS JOIN departments d;

-- توليد تركيبات تاريخ × موظف لجدول زمني
SELECT e.name, dates.day
FROM employees e
CROSS JOIN (
  VALUES ('2024-01-01'), ('2024-01-02'), ('2024-01-03')
) AS dates(day);
\`\`\`

### استخدامات حقيقية لـ CROSS JOIN:

\`\`\`sql
-- توليد جدول الضرب
WITH numbers AS (
  SELECT 1 AS n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
)
SELECT a.n, b.n, a.n * b.n AS product
FROM numbers a
CROSS JOIN numbers b
ORDER BY a.n, b.n;

-- جميع تركيبات الحجم × اللون لمنتج ما
SELECT sizes.size, colors.color
FROM (VALUES ('S'),('M'),('L'),('XL'))   AS sizes(size)
CROSS JOIN (VALUES ('Red'),('Blue'),('Green')) AS colors(color);
\`\`\`

---

## ملخص أنواع JOIN

| نوع JOIN | ما يُعيده |
|----------|----------|
| INNER JOIN | الصفوف المتطابقة فقط من كلا الجدولين |
| LEFT JOIN | جميع صفوف الأيسر + الصفوف المطابقة من الأيمن (NULL عند عدم التطابق) |
| RIGHT JOIN | الصفوف المطابقة من الأيسر + جميع صفوف الأيمن (NULL عند عدم التطابق) |
| FULL OUTER JOIN | جميع صفوف الجدولين (NULL عند عدم التطابق من أي جانب) |
| CROSS JOIN | كل تركيبة ممكنة من الصفوف (الضرب الديكارتي) |
| SELF JOIN | الجدول يُضم مع نفسه (مُغطَّى في الدرس التالي) |
    `,
    example: `-- Cross join: generate a skills assessment matrix
-- Every employee × every skill category
SELECT e.name AS employee, c.name AS skill_area
FROM employees e
CROSS JOIN categories c
WHERE e.department_id = 1  -- Engineering only
ORDER BY e.name, c.name;`,
    exercises: [
      {
        id: 1,
        question: 'Use CROSS JOIN to generate every combination of customer loyalty_tier and order status. Show distinct combinations from the actual data using a cross join between (SELECT DISTINCT loyalty_tier FROM customers) and (SELECT DISTINCT status FROM orders).',
        questionAr: 'استخدم CROSS JOIN لتوليد كل تركيبة من loyalty_tier للعملاء وحالة الطلبات. أظهر التركيبات الفريدة من البيانات الفعلية باستخدام CROSS JOIN بين (SELECT DISTINCT loyalty_tier FROM customers) و(SELECT DISTINCT status FROM orders).',
        hint: 'SELECT * FROM (SELECT DISTINCT loyalty_tier FROM customers) CROSS JOIN (SELECT DISTINCT status FROM orders)',
        hintAr: 'SELECT * FROM (SELECT DISTINCT loyalty_tier FROM customers) CROSS JOIN (SELECT DISTINCT status FROM orders)',
        expectedQuery: 'SELECT * FROM (SELECT DISTINCT loyalty_tier FROM customers) CROSS JOIN (SELECT DISTINCT status FROM orders)',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 25,
    title: 'SELF JOIN',
    titleAr: 'الضم الذاتي SELF JOIN',
    description: 'Join a table with itself — for hierarchies, org charts, and comparative queries.',
    descriptionAr: 'ضم الجدول مع نفسه — للتسلسل الهرمي والهياكل التنظيمية والاستعلامات المقارنة.',
    content: `
## SELF JOIN

A SELF JOIN joins a table with itself. This sounds paradoxical, but it's essential for:
- **Hierarchical data** — employees and their managers
- **Comparative queries** — find pairs of rows meeting a condition
- **Sequence analysis** — compare a row to adjacent rows

**You must use aliases to distinguish the two "copies" of the table.**

---

## Employee → Manager Hierarchy

Our \`employees\` table has a \`manager_id\` column that references another row in the same table:

\`\`\`sql
-- Show each employee with their manager's name
SELECT
  e.name           AS employee,
  e.job_title,
  m.name           AS manager,
  m.job_title      AS manager_title
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
ORDER BY m.name, e.name;
-- LEFT JOIN: includes employees with no manager (manager_id IS NULL)
\`\`\`

\`\`\`sql
-- INNER JOIN version: excludes top-level employees (no manager)
SELECT
  e.name     AS employee,
  e.salary,
  m.name     AS manager,
  m.salary   AS manager_salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
ORDER BY manager, employee;
\`\`\`

---

## Finding Employees Who Earn More Than Their Manager

\`\`\`sql
SELECT
  e.name           AS employee,
  e.salary         AS emp_salary,
  m.name           AS manager,
  m.salary         AS mgr_salary,
  e.salary - m.salary AS salary_difference
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary
ORDER BY salary_difference DESC;
\`\`\`

---

## Multi-Level Hierarchy

\`\`\`sql
-- Three levels: employee → manager → manager's manager
SELECT
  e.name   AS employee,
  m.name   AS manager,
  gm.name  AS grandmanager
FROM employees e
LEFT JOIN employees m  ON e.manager_id = m.id
LEFT JOIN employees gm ON m.manager_id = gm.id
WHERE e.manager_id IS NOT NULL
ORDER BY gm.name, m.name, e.name;
\`\`\`

---

## Pairs With Matching Criteria

\`\`\`sql
-- Find pairs of employees in the same department with the same salary
SELECT
  a.name AS employee1,
  b.name AS employee2,
  a.salary,
  a.department_id
FROM employees a
JOIN employees b
  ON  a.department_id = b.department_id
  AND a.salary = b.salary
  AND a.id < b.id  -- avoid (Alice, Bob) AND (Bob, Alice)
ORDER BY a.department_id, a.salary;

-- Products in the same category within $10 of each other in price
SELECT
  a.name AS product1,
  b.name AS product2,
  a.price AS price1,
  b.price AS price2,
  ABS(a.price - b.price) AS price_diff
FROM products a
JOIN products b
  ON  a.category_id = b.category_id
  AND a.id < b.id
  AND ABS(a.price - b.price) <= 10
ORDER BY price_diff;
\`\`\`

---

## Org Chart Query

\`\`\`sql
-- Build a readable org chart
SELECT
  COALESCE(m.name, 'No Manager') AS manager,
  COUNT(e.id)                    AS direct_reports,
  GROUP_CONCAT(e.name, ', ')     AS team_members
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
GROUP BY e.manager_id, m.name
ORDER BY direct_reports DESC;
\`\`\`
    `,
    contentAr: `
## SELF JOIN

يضم SELF JOIN الجدول مع نفسه. يبدو هذا متناقضاً، لكنه ضروري لـ:
- **البيانات الهرمية** — الموظفون ومديروهم
- **الاستعلامات المقارنة** — أوجد أزواجاً من الصفوف تحقق شرطاً معيناً
- **تحليل التسلسل** — قارن صفاً بالصفوف المجاورة

**يجب استخدام أسماء مستعارة للتمييز بين "نسختَي" الجدول.**

---

## التسلسل الهرمي موظف → مدير

يحتوي جدول \`employees\` على عمود \`manager_id\` يُشير إلى صف آخر في نفس الجدول:

\`\`\`sql
-- عرض كل موظف مع اسم مديره
SELECT
  e.name           AS employee,
  e.job_title,
  m.name           AS manager,
  m.job_title      AS manager_title
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
ORDER BY m.name, e.name;
-- LEFT JOIN: يشمل الموظفين بدون مدير (manager_id IS NULL)
\`\`\`

\`\`\`sql
-- نسخة INNER JOIN: تستثني الموظفين في أعلى التسلسل (بدون مدير)
SELECT
  e.name     AS employee,
  e.salary,
  m.name     AS manager,
  m.salary   AS manager_salary
FROM employees e
JOIN employees m ON e.manager_id = m.id
ORDER BY manager, employee;
\`\`\`

---

## أوجد الموظفين الذين يكسبون أكثر من مديرهم

\`\`\`sql
SELECT
  e.name           AS employee,
  e.salary         AS emp_salary,
  m.name           AS manager,
  m.salary         AS mgr_salary,
  e.salary - m.salary AS salary_difference
FROM employees e
JOIN employees m ON e.manager_id = m.id
WHERE e.salary > m.salary
ORDER BY salary_difference DESC;
\`\`\`

---

## التسلسل الهرمي متعدد المستويات

\`\`\`sql
-- ثلاثة مستويات: موظف → مدير → مدير المدير
SELECT
  e.name   AS employee,
  m.name   AS manager,
  gm.name  AS grandmanager
FROM employees e
LEFT JOIN employees m  ON e.manager_id = m.id
LEFT JOIN employees gm ON m.manager_id = gm.id
WHERE e.manager_id IS NOT NULL
ORDER BY gm.name, m.name, e.name;
\`\`\`

---

## أزواج تحقق معايير مشتركة

\`\`\`sql
-- أوجد أزواجاً من الموظفين في نفس القسم بنفس الراتب
SELECT
  a.name AS employee1,
  b.name AS employee2,
  a.salary,
  a.department_id
FROM employees a
JOIN employees b
  ON  a.department_id = b.department_id
  AND a.salary = b.salary
  AND a.id < b.id  -- لتجنب (Alice، Bob) و(Bob، Alice)
ORDER BY a.department_id, a.salary;

-- منتجات في نفس الفئة بفارق سعر لا يتجاوز $10
SELECT
  a.name AS product1,
  b.name AS product2,
  a.price AS price1,
  b.price AS price2,
  ABS(a.price - b.price) AS price_diff
FROM products a
JOIN products b
  ON  a.category_id = b.category_id
  AND a.id < b.id
  AND ABS(a.price - b.price) <= 10
ORDER BY price_diff;
\`\`\`

---

## استعلام الهيكل التنظيمي

\`\`\`sql
-- بناء هيكل تنظيمي قابل للقراءة
SELECT
  COALESCE(m.name, 'No Manager') AS manager,
  COUNT(e.id)                    AS direct_reports,
  GROUP_CONCAT(e.name, ', ')     AS team_members
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
GROUP BY e.manager_id, m.name
ORDER BY direct_reports DESC;
\`\`\`
    `,
    example: `-- Show employee, their manager, and whether they earn more than their manager
SELECT
  e.name           AS employee,
  e.job_title,
  e.salary         AS emp_salary,
  m.name           AS manager,
  m.salary         AS mgr_salary,
  CASE
    WHEN e.salary > m.salary THEN 'Yes - earns more'
    WHEN e.salary < m.salary THEN 'No'
    ELSE 'Same salary'
  END AS earns_more_than_manager
FROM employees e
JOIN employees m ON e.manager_id = m.id
ORDER BY emp_salary DESC;`,
    exercises: [
      {
        id: 1,
        question: "Show all employees and their manager's name. Include employees with no manager (show NULL for manager name).",
        questionAr: "اعرض جميع الموظفين واسم مديرهم. أضف الموظفين الذين ليس لديهم مدير (أظهر NULL لاسم المدير).",
        hint: 'LEFT JOIN employees m ON e.manager_id = m.id',
        hintAr: 'LEFT JOIN employees m ON e.manager_id = m.id',
        expectedQuery: 'SELECT e.name AS employee, m.name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id ORDER BY manager, employee',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all employees who earn MORE than their direct manager.',
        questionAr: 'أوجد جميع الموظفين الذين يكسبون أكثر من مديرهم المباشر.',
        hint: 'JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary',
        hintAr: 'JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary',
        expectedQuery: 'SELECT e.name AS employee, e.salary, m.name AS manager, m.salary AS manager_salary FROM employees e JOIN employees m ON e.manager_id = m.id WHERE e.salary > m.salary',
        checkFunction: (result) => (result) => result.length > 0,
      },
    ],
  },
];
