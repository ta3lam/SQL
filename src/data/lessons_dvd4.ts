import { Lesson } from '../types';

export const dvdLessonsP4: Lesson[] = [
  // ── Level 15 — Indexes, Transactions & Math ─────────────────────────────────
  {
    id: 146,
    title: 'Indexes',
    titleAr: 'المؤشرات (Indexes)',
    description: 'Speed up queries by creating indexes on frequently searched columns.',
    descriptionAr: 'تسريع الاستعلامات بإنشاء مؤشرات على الأعمدة الأكثر بحثًا.',
    example: `-- See existing indexes on the film table
SELECT name, tbl_name, sql
FROM sqlite_master
WHERE type = 'index' AND tbl_name = 'film';

-- Create an index on rental_rate for faster price filtering
CREATE INDEX IF NOT EXISTS idx_film_rental_rate ON film(rental_rate);

-- Verify
SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'film';`,
    content: `## Indexes

An **index** is a data structure that lets the database find rows much faster — like the index at the back of a book.

## Why Indexes Matter

Without an index, a query like \`WHERE rental_rate = 4.99\` scans every row in \`film\`. With an index, it jumps directly to matching rows.

## CREATE INDEX

\`\`\`sql
-- Index on a single column
CREATE INDEX idx_film_rating ON film(rating);

-- Index on multiple columns (composite)
CREATE INDEX idx_rental_customer_date
ON rental(customer_id, rental_date);

-- Unique index (enforces uniqueness too)
CREATE UNIQUE INDEX idx_film_title ON film(title);
\`\`\`

## DROP INDEX

\`\`\`sql
DROP INDEX IF EXISTS idx_film_rating;
\`\`\`

## When to Create Indexes

Create indexes on columns that are:
- Frequently used in \`WHERE\` clauses
- Used in \`JOIN\` conditions
- Used in \`ORDER BY\` on large tables

## When NOT to Create Indexes

- Tables with very few rows
- Columns rarely used in queries
- Tables with heavy INSERT/UPDATE load (indexes slow down writes)

> **PostgreSQL note:** PostgreSQL supports several index types: B-tree (default), Hash, GIN (for arrays/JSON), GiST (for geometry). SQLite uses B-tree only.
> \`\`\`sql
> -- PostgreSQL: partial index (index only some rows)
> CREATE INDEX idx_active_customers ON customer(customer_id)
> WHERE active = 1;
> \`\`\`
`,
    contentAr: `## المؤشرات (Indexes)

**المؤشر** بنية بيانات تسمح لقاعدة البيانات بالعثور على الصفوف بشكل أسرع بكثير — مثل فهرس الكتاب.

## لماذا تهم المؤشرات

بدون مؤشر، يفحص استعلام مثل \`WHERE rental_rate = 4.99\` كل صف في \`film\`. مع المؤشر، يقفز مباشرةً إلى الصفوف المطابقة.

## CREATE INDEX

\`\`\`sql
-- مؤشر على عمود واحد
CREATE INDEX idx_film_rating ON film(rating);

-- مؤشر على أعمدة متعددة (مُركَّب)
CREATE INDEX idx_rental_customer_date
ON rental(customer_id, rental_date);

-- مؤشر فريد (يُطبّق التفرد أيضًا)
CREATE UNIQUE INDEX idx_film_title ON film(title);
\`\`\`

## DROP INDEX

\`\`\`sql
DROP INDEX IF EXISTS idx_film_rating;
\`\`\`

## متى تُنشئ المؤشرات

أنشئ مؤشرات على الأعمدة المستخدمة:
- كثيرًا في جمل \`WHERE\`
- في شروط \`JOIN\`
- في \`ORDER BY\` على الجداول الكبيرة

## متى لا تُنشئ المؤشرات

- الجداول ذات الصفوف القليلة جدًا
- الأعمدة النادرة الاستخدام في الاستعلامات
- الجداول ذات عمليات INSERT/UPDATE الكثيفة (المؤشرات تبطئ الكتابة)

> **ملاحظة PostgreSQL:** يدعم PostgreSQL أنواع مؤشرات متعددة: B-tree (الافتراضي) وHash وGIN (للمصفوفات/JSON) وGiST (للبيانات الهندسية).
> \`\`\`sql
> -- PostgreSQL: مؤشر جزئي (يُفهرس صفوفًا معينة فقط)
> CREATE INDEX idx_active_customers ON customer(customer_id)
> WHERE active = 1;
> \`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Create an index called 'idx_customer_email' on the customer table's email column. Then verify it exists: SELECT name FROM sqlite_master WHERE type='index' AND name='idx_customer_email'.",
        questionAr: "أنشئ مؤشرًا اسمه 'idx_customer_email' على عمود email في جدول customer. ثم تحقق من وجوده.",
        hint: "CREATE INDEX idx_customer_email ON customer(email)",
        hintAr: "CREATE INDEX idx_customer_email ON customer(email)",
        expectedQuery: "CREATE INDEX idx_customer_email ON customer(email); SELECT name FROM sqlite_master WHERE type='index' AND name='idx_customer_email';",
        checkFunction: (result: unknown[], q = '') =>
          /CREATE\s+INDEX/i.test(q) && /customer/i.test(q) && /email/i.test(q),
      },
      {
        id: 2,
        question: "Create a composite index 'idx_rental_lookup' on rental(customer_id, rental_date). Then drop it with DROP INDEX. Verify it's gone: SELECT COUNT(*) FROM sqlite_master WHERE name='idx_rental_lookup'.",
        questionAr: "أنشئ مؤشرًا مُركَّبًا 'idx_rental_lookup' على rental(customer_id, rental_date). ثم احذفه بـ DROP INDEX. تحقق من اختفائه.",
        hint: "CREATE INDEX ... ON rental(customer_id, rental_date); DROP INDEX idx_rental_lookup;",
        hintAr: "CREATE INDEX ... ON rental(customer_id, rental_date); DROP INDEX idx_rental_lookup;",
        expectedQuery: "CREATE INDEX idx_rental_lookup ON rental(customer_id, rental_date); DROP INDEX idx_rental_lookup; SELECT COUNT(*) FROM sqlite_master WHERE name='idx_rental_lookup';",
        checkFunction: (result: unknown[], q = '') =>
          /CREATE\s+INDEX/i.test(q) && /DROP\s+INDEX/i.test(q),
      },
    ],
  },

  {
    id: 147,
    title: 'Transactions',
    titleAr: 'المعاملات (Transactions)',
    description: 'Group multiple SQL statements into atomic units using BEGIN, COMMIT, and ROLLBACK.',
    descriptionAr: 'تجميع جمل SQL متعددة في وحدات ذرية باستخدام BEGIN وCOMMIT وROLLBACK.',
    example: `-- Simulate a rental payment transaction
BEGIN;

-- Step 1: Create a test table
CREATE TABLE IF NOT EXISTS payment_log (
  log_id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  amount REAL,
  logged_at TEXT DEFAULT (datetime('now'))
);

-- Step 2: Insert a payment record
INSERT INTO payment_log (customer_id, amount) VALUES (1, 4.99);

-- Step 3: Verify
SELECT * FROM payment_log;

-- Step 4: Commit if all looks good
COMMIT;`,
    content: `## Transactions

A **transaction** groups multiple SQL statements into one atomic unit — either **all succeed** or **all are rolled back**.

## The ACID Properties

| Property | Meaning |
|----------|---------|
| **A**tomicity | All or nothing |
| **C**onsistency | Database stays valid |
| **I**solation | Transactions don't interfere |
| **D**urability | Committed changes persist |

## Basic Transaction

\`\`\`sql
BEGIN;

UPDATE film SET rental_rate = rental_rate + 0.50 WHERE rating = 'R';
INSERT INTO payment_log (customer_id, amount) VALUES (1, 0.50);

COMMIT;  -- save both changes permanently
\`\`\`

## ROLLBACK — Undo Everything

\`\`\`sql
BEGIN;

UPDATE film SET rental_rate = 999 WHERE film_id = 1; -- oops!

ROLLBACK;  -- undo all changes since BEGIN
\`\`\`

## SAVEPOINT (PostgreSQL / SQLite)

\`\`\`sql
BEGIN;
SAVEPOINT before_update;

UPDATE film SET rental_rate = 9.99 WHERE film_id = 1;

-- Changed your mind?
ROLLBACK TO SAVEPOINT before_update;

COMMIT;  -- commits without the update
\`\`\`

> **PostgreSQL note:** PostgreSQL wraps every statement in an implicit transaction. Use \`BEGIN\` explicitly for multi-statement transactions. DDL statements (CREATE TABLE) also participate in transactions in PostgreSQL — unlike many other databases.
`,
    contentAr: `## المعاملات (Transactions)

**المعاملة** تجمع جمل SQL متعددة في وحدة ذرية واحدة — إما **تنجح كلها** أو **تُتراجع كلها**.

## خصائص ACID

| الخاصية | المعنى |
|---------|--------|
| **A**tomicity | الكل أو لا شيء |
| **C**onsistency | قاعدة البيانات تبقى صالحة |
| **I**solation | المعاملات لا تتداخل |
| **D**urability | التغييرات الملتزمة تبقى |

## معاملة أساسية

\`\`\`sql
BEGIN;

UPDATE film SET rental_rate = rental_rate + 0.50 WHERE rating = 'R';
INSERT INTO payment_log (customer_id, amount) VALUES (1, 0.50);

COMMIT;  -- حفظ كلا التغييرين بشكل دائم
\`\`\`

## ROLLBACK — التراجع عن كل شيء

\`\`\`sql
BEGIN;

UPDATE film SET rental_rate = 999 WHERE film_id = 1; -- خطأ!

ROLLBACK;  -- تراجع عن جميع التغييرات منذ BEGIN
\`\`\`

## SAVEPOINT (PostgreSQL / SQLite)

\`\`\`sql
BEGIN;
SAVEPOINT before_update;

UPDATE film SET rental_rate = 9.99 WHERE film_id = 1;

-- غيّرت رأيك؟
ROLLBACK TO SAVEPOINT before_update;

COMMIT;  -- يلتزم بدون التحديث
\`\`\`

> **ملاحظة PostgreSQL:** يلف PostgreSQL كل جملة في معاملة ضمنية. استخدم \`BEGIN\` صراحةً للمعاملات متعددة الجمل. تشارك جمل DDL (CREATE TABLE) أيضًا في المعاملات في PostgreSQL.
`,
    exercises: [
      {
        id: 1,
        question: "Write a transaction that: (1) Creates table payment_test (id INTEGER PRIMARY KEY, amount REAL), (2) Inserts 3 rows with amounts 9.99, 4.99, 2.99, (3) COMMITs. Then SELECT * FROM payment_test.",
        questionAr: "اكتب معاملة تقوم بـ: (1) إنشاء جدول payment_test (id INTEGER PRIMARY KEY, amount REAL)، (2) إدراج 3 صفوف بمبالغ 9.99 و4.99 و2.99، (3) COMMIT. ثم اختر كل شيء من payment_test.",
        hint: "BEGIN; CREATE TABLE ...; INSERT ... VALUES ...; COMMIT; SELECT * FROM payment_test;",
        hintAr: "BEGIN; CREATE TABLE ...; INSERT ... VALUES ...; COMMIT; SELECT * FROM payment_test;",
        expectedQuery: "BEGIN; CREATE TABLE payment_test (id INTEGER PRIMARY KEY, amount REAL); INSERT INTO payment_test (amount) VALUES (9.99),(4.99),(2.99); COMMIT; SELECT * FROM payment_test;",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /BEGIN/i.test(q) && /COMMIT/i.test(q) && /INSERT/i.test(q),
      },
      {
        id: 2,
        question: "Demonstrate ROLLBACK: BEGIN a transaction, create table rollback_test (id INTEGER PRIMARY KEY, val TEXT), insert a row, then ROLLBACK. Verify the table doesn't exist: SELECT COUNT(*) FROM sqlite_master WHERE name='rollback_test'.",
        questionAr: "وضّح ROLLBACK: ابدأ معاملة، أنشئ جدول rollback_test، أدرج صفًا، ثم ROLLBACK. تحقق أن الجدول غير موجود.",
        hint: "BEGIN; CREATE TABLE rollback_test ...; INSERT INTO rollback_test ...; ROLLBACK; SELECT COUNT(*) ...",
        hintAr: "BEGIN; CREATE TABLE rollback_test ...; INSERT ...; ROLLBACK; SELECT COUNT(*) ...",
        expectedQuery: "BEGIN; CREATE TABLE rollback_test (id INTEGER PRIMARY KEY, val TEXT); INSERT INTO rollback_test VALUES (1, 'test'); ROLLBACK; SELECT COUNT(*) FROM sqlite_master WHERE name='rollback_test';",
        checkFunction: (result: unknown[], q = '') =>
          /BEGIN/i.test(q) && /ROLLBACK/i.test(q),
      },
    ],
  },

  {
    id: 148,
    title: 'Math & Numeric Functions',
    titleAr: 'الدوال الرياضية والعددية',
    description: 'Use mathematical functions to calculate, round, and transform numeric data.',
    descriptionAr: 'استخدام الدوال الرياضية لحساب البيانات العددية وتقريبها وتحويلها.',
    example: `-- Financial calculations on payment data
SELECT
  ROUND(AVG(amount), 2)           AS avg_payment,
  ROUND(MIN(amount), 2)           AS min_payment,
  ROUND(MAX(amount), 2)           AS max_payment,
  ROUND(SUM(amount), 2)           AS total_revenue,
  COUNT(*)                        AS payment_count,
  ROUND(SUM(amount) / COUNT(*), 2) AS avg_per_txn,
  CEIL(MAX(amount))               AS max_rounded_up,
  FLOOR(MIN(amount))              AS min_rounded_down
FROM payment;`,
    content: `## Math & Numeric Functions

SQLite provides a range of mathematical functions for numeric analysis.

## Core Functions

| Function | Description | Example |
|----------|-------------|---------|
| \`ROUND(x, n)\` | Round to n decimals | \`ROUND(4.567, 2)\` → \`4.57\` |
| \`CEIL(x)\` | Round up to integer | \`CEIL(4.1)\` → \`5\` |
| \`FLOOR(x)\` | Round down to integer | \`FLOOR(4.9)\` → \`4\` |
| \`ABS(x)\` | Absolute value | \`ABS(-5)\` → \`5\` |
| \`MOD(x, y)\` | Remainder | \`MOD(10, 3)\` → \`1\` |
| \`POWER(x, y)\` | x to the power y | \`POWER(2, 10)\` → \`1024\` |
| \`SQRT(x)\` | Square root | \`SQRT(16)\` → \`4\` |
| \`MAX(a, b)\` | Larger of two values | \`MAX(3, 7)\` → \`7\` |
| \`MIN(a, b)\` | Smaller of two values | \`MIN(3, 7)\` → \`3\` |

## Practical Revenue Calculations

\`\`\`sql
-- Profit margin simulation per film
SELECT
  f.title,
  f.rental_rate,
  f.replacement_cost,
  ROUND(f.replacement_cost / f.rental_rate) AS rentals_to_break_even,
  ROUND(SQRT(f.replacement_cost), 2)         AS sqrt_cost
FROM film
ORDER BY rentals_to_break_even
LIMIT 10;
\`\`\`

## Integer Division & Modulo

\`\`\`sql
-- Films grouped into 10-minute duration buckets
SELECT
  title,
  length,
  (length / 10) * 10               AS duration_bucket,
  MOD(length, 60)                  AS minutes_past_hour
FROM film
ORDER BY length
LIMIT 10;
\`\`\`

> **PostgreSQL note:** PostgreSQL uses \`CEIL\`, \`FLOOR\`, \`ROUND\`, \`ABS\`, \`MOD\` identically. Integer division uses \`/\` (e.g., \`7/2 = 3\`). Use \`POWER(x,y)\` or the \`^\` operator.
`,
    contentAr: `## الدوال الرياضية والعددية

يوفر SQLite مجموعة من الدوال الرياضية للتحليل العددي.

## الدوال الأساسية

| الدالة | الوصف | مثال |
|--------|-------|------|
| \`ROUND(x, n)\` | تقريب لـ n منازل عشرية | \`ROUND(4.567, 2)\` → \`4.57\` |
| \`CEIL(x)\` | تقريب للأعلى لعدد صحيح | \`CEIL(4.1)\` → \`5\` |
| \`FLOOR(x)\` | تقريب للأسفل لعدد صحيح | \`FLOOR(4.9)\` → \`4\` |
| \`ABS(x)\` | القيمة المطلقة | \`ABS(-5)\` → \`5\` |
| \`MOD(x, y)\` | الباقي | \`MOD(10, 3)\` → \`1\` |
| \`POWER(x, y)\` | x أس y | \`POWER(2, 10)\` → \`1024\` |
| \`SQRT(x)\` | الجذر التربيعي | \`SQRT(16)\` → \`4\` |

## حسابات الإيرادات العملية

\`\`\`sql
-- محاكاة هامش الربح لكل فيلم
SELECT
  f.title,
  f.rental_rate,
  f.replacement_cost,
  ROUND(f.replacement_cost / f.rental_rate) AS rentals_to_break_even,
  ROUND(SQRT(f.replacement_cost), 2)         AS sqrt_cost
FROM film
ORDER BY rentals_to_break_even
LIMIT 10;
\`\`\`

## القسمة الصحيحة والباقي

\`\`\`sql
-- تجميع الأفلام في حاويات من 10 دقائق
SELECT
  title,
  length,
  (length / 10) * 10    AS duration_bucket,
  MOD(length, 60)       AS minutes_past_hour
FROM film
ORDER BY length
LIMIT 10;
\`\`\`

> **ملاحظة PostgreSQL:** يستخدم PostgreSQL \`CEIL\` و\`FLOOR\` و\`ROUND\` و\`ABS\` و\`MOD\` بشكل متطابق. القسمة الصحيحة تستخدم \`/\` (مثلًا \`7/2 = 3\`). استخدم \`POWER(x,y)\` أو المُعامل \`^\`.
`,
    exercises: [
      {
        id: 1,
        question: "For each film, calculate how many rentals are needed to break even (replacement_cost / rental_rate, rounded up using CEIL). Show title, rental_rate, replacement_cost, and break_even_rentals. Order by break_even_rentals ASC, limit 10.",
        questionAr: "لكل فيلم، احسب عدد الإيجارات اللازمة لتحقيق التعادل (replacement_cost / rental_rate، مقرَّبًا للأعلى بـ CEIL). اعرض العنوان والسعر والتكلفة وعدد الإيجارات. رتّب تصاعديًا، حدّد بـ 10.",
        hint: "CEIL(replacement_cost / rental_rate) AS break_even_rentals",
        hintAr: "CEIL(replacement_cost / rental_rate) AS break_even_rentals",
        expectedQuery: "SELECT title, rental_rate, replacement_cost, CEIL(replacement_cost / rental_rate) AS break_even_rentals FROM film ORDER BY break_even_rentals ASC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CEIL/i.test(q) && /replacement_cost/i.test(q),
      },
      {
        id: 2,
        question: "Show payment statistics: total revenue (SUM rounded 2), avg payment (AVG rounded 2), max payment (ROUND 2), min payment (ROUND 2), and the difference between max and min as 'range'. All from the payment table.",
        questionAr: "اعرض إحصائيات الدفع: إجمالي الإيرادات (SUM مقرَّب 2) ومتوسط الدفعة (AVG مقرَّب 2) وأقصى دفعة (ROUND 2) وأدنى دفعة (ROUND 2) والفرق بينهما كـ 'range'. كلها من جدول payment.",
        hint: "SELECT ROUND(SUM(amount),2), ROUND(AVG(amount),2), ROUND(MAX(amount),2), ROUND(MIN(amount),2), ROUND(MAX(amount)-MIN(amount),2) AS range FROM payment",
        hintAr: "استخدم ROUND(SUM/AVG/MAX/MIN(amount), 2)",
        expectedQuery: "SELECT ROUND(SUM(amount),2) AS total_revenue, ROUND(AVG(amount),2) AS avg_payment, ROUND(MAX(amount),2) AS max_payment, ROUND(MIN(amount),2) AS min_payment, ROUND(MAX(amount)-MIN(amount),2) AS range FROM payment",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SUM/i.test(q) && /AVG/i.test(q) && /ROUND/i.test(q),
      },
    ],
  },

  // ── Level 16 — Type Conversion & Advanced Windows ───────────────────────────
  {
    id: 149,
    title: 'CAST & Type Conversion',
    titleAr: 'CAST وتحويل الأنواع',
    description: 'Convert values between data types using CAST to control calculations and formatting.',
    descriptionAr: 'تحويل القيم بين أنواع البيانات باستخدام CAST للتحكم في الحسابات والتنسيق.',
    example: `-- Compare integer vs real division
SELECT
  10 / 3                       AS int_division,      -- = 3 (truncated)
  CAST(10 AS REAL) / 3         AS real_division,     -- = 3.333...
  CAST(length AS REAL) / 60    AS length_hours,
  CAST(rental_duration AS TEXT) || ' days' AS duration_label
FROM film
LIMIT 5;`,
    content: `## CAST & Type Conversion

\`CAST(value AS type)\` converts a value from one data type to another.

## Why CAST Matters

Integer division truncates the decimal:

\`\`\`sql
SELECT 7 / 2;           -- returns 3 (not 3.5!)
SELECT 7.0 / 2;         -- returns 3.5
SELECT CAST(7 AS REAL) / 2; -- returns 3.5
\`\`\`

## Common CAST Patterns

\`\`\`sql
-- Convert text date to perform calculations
SELECT
  rental_date,
  return_date,
  CAST(julianday(return_date) - julianday(rental_date) AS INTEGER) AS days_kept
FROM rental
WHERE return_date IS NOT NULL
LIMIT 10;
\`\`\`

\`\`\`sql
-- Number to text for concatenation
SELECT
  title,
  CAST(length AS TEXT) || ' min' AS duration,
  CAST(rental_rate AS TEXT) || ' USD' AS price
FROM film LIMIT 5;
\`\`\`

\`\`\`sql
-- Text to number for calculations
SELECT
  CAST('4.99' AS REAL) * 12 AS annual_cost;
\`\`\`

## SQLite Types vs PostgreSQL Types

| SQLite CAST | PostgreSQL equivalent |
|-------------|----------------------|
| \`CAST(x AS INTEGER)\` | \`x::INTEGER\` or \`CAST(x AS INTEGER)\` |
| \`CAST(x AS REAL)\` | \`x::NUMERIC\` or \`x::FLOAT\` |
| \`CAST(x AS TEXT)\` | \`x::TEXT\` or \`x::VARCHAR\` |

> **PostgreSQL shorthand:** PostgreSQL supports the \`::\` cast operator:
> \`\`\`sql
> SELECT '4.99'::NUMERIC * 12;
> SELECT rental_date::DATE FROM rental LIMIT 5;
> \`\`\`
`,
    contentAr: `## CAST وتحويل الأنواع

تُحوّل \`CAST(value AS type)\` القيمة من نوع بيانات إلى آخر.

## لماذا CAST مهمة

القسمة الصحيحة تحذف الكسر:

\`\`\`sql
SELECT 7 / 2;               -- يُرجع 3 (وليس 3.5!)
SELECT 7.0 / 2;             -- يُرجع 3.5
SELECT CAST(7 AS REAL) / 2; -- يُرجع 3.5
\`\`\`

## أنماط CAST الشائعة

\`\`\`sql
-- تحويل تاريخ نصي لإجراء حسابات
SELECT
  rental_date,
  return_date,
  CAST(julianday(return_date) - julianday(rental_date) AS INTEGER) AS days_kept
FROM rental
WHERE return_date IS NOT NULL
LIMIT 10;
\`\`\`

\`\`\`sql
-- عدد إلى نص للدمج
SELECT
  title,
  CAST(length AS TEXT) || ' دقيقة' AS duration,
  CAST(rental_rate AS TEXT) || ' USD' AS price
FROM film LIMIT 5;
\`\`\`

## أنواع SQLite مقابل PostgreSQL

| CAST في SQLite | المكافئ في PostgreSQL |
|---------------|----------------------|
| \`CAST(x AS INTEGER)\` | \`x::INTEGER\` أو \`CAST(x AS INTEGER)\` |
| \`CAST(x AS REAL)\` | \`x::NUMERIC\` أو \`x::FLOAT\` |
| \`CAST(x AS TEXT)\` | \`x::TEXT\` أو \`x::VARCHAR\` |

> **اختصار PostgreSQL:** يدعم PostgreSQL مُعامل الصبّ \`::\`:
> \`\`\`sql
> SELECT '4.99'::NUMERIC * 12;
> SELECT rental_date::DATE FROM rental LIMIT 5;
> \`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Calculate the exact (non-integer) ratio of film length to 60 to get hours as a decimal. Show title, length, and length_in_hours (CAST length as REAL divided by 60, rounded to 2 decimals). Order by length DESC, limit 10.",
        questionAr: "احسب النسبة الدقيقة (غير الصحيحة) لمدة الفيلم إلى 60 للحصول على الساعات كعدد عشري. اعرض العنوان والمدة وlength_in_hours (CAST length كـ REAL مقسومًا على 60، مقرَّبًا لمنزلتين). رتّب تنازليًا، حدّد بـ 10.",
        hint: "ROUND(CAST(length AS REAL) / 60, 2) AS length_in_hours",
        hintAr: "ROUND(CAST(length AS REAL) / 60, 2) AS length_in_hours",
        expectedQuery: "SELECT title, length, ROUND(CAST(length AS REAL) / 60, 2) AS length_in_hours FROM film ORDER BY length DESC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CAST/i.test(q) && /REAL/i.test(q) && /60/i.test(q),
      },
      {
        id: 2,
        question: "Create a 'price_label' column by casting rental_rate to TEXT and appending ' USD/day'. Also cast rental_duration to TEXT and append ' days'. Show title, price_label, and duration_label. Limit 10.",
        questionAr: "أنشئ عمود 'price_label' بتحويل rental_rate إلى TEXT وإضافة ' USD/day'. حوّل أيضًا rental_duration إلى TEXT وأضف ' days'. اعرض العنوان وprice_label وduration_label. حدّد بـ 10.",
        hint: "CAST(rental_rate AS TEXT) || ' USD/day' AS price_label",
        hintAr: "CAST(rental_rate AS TEXT) || ' USD/day' AS price_label",
        expectedQuery: "SELECT title, CAST(rental_rate AS TEXT) || ' USD/day' AS price_label, CAST(rental_duration AS TEXT) || ' days' AS duration_label FROM film LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CAST/i.test(q) && /TEXT/i.test(q) && /\|\|/i.test(q),
      },
    ],
  },

  {
    id: 150,
    title: 'Recursive CTEs',
    titleAr: 'CTEs العودية (Recursive CTEs)',
    description: 'Generate sequences and traverse hierarchical data using recursive CTEs.',
    descriptionAr: 'توليد متسلسلات واجتياز البيانات الهرمية باستخدام CTEs العودية.',
    example: `-- Generate a sequence of numbers 1 to 10
WITH RECURSIVE counter(n) AS (
  SELECT 1                    -- anchor: start value
  UNION ALL
  SELECT n + 1 FROM counter   -- recursive step
  WHERE n < 10                -- termination condition
)
SELECT n FROM counter;`,
    content: `## Recursive CTEs

A **recursive CTE** is a CTE that references itself. It's used for:
- Generating sequences (numbers, dates)
- Traversing hierarchical data (org charts, category trees)
- Path-finding problems

## Structure

\`\`\`sql
WITH RECURSIVE cte_name AS (
  -- 1. Anchor: starting rows (non-recursive)
  SELECT ...

  UNION ALL

  -- 2. Recursive step: references cte_name
  SELECT ... FROM cte_name WHERE <termination_condition>
)
SELECT * FROM cte_name;
\`\`\`

## Generate a Date Sequence

\`\`\`sql
-- Generate all dates in May 2005 (when most rentals happened)
WITH RECURSIVE dates(d) AS (
  SELECT '2005-05-24'                          -- anchor
  UNION ALL
  SELECT date(d, '+1 day') FROM dates
  WHERE d < '2005-05-31'                       -- stop condition
)
SELECT d AS rental_date,
       COUNT(r.rental_id) AS rentals
FROM dates
LEFT JOIN rental r ON DATE(r.rental_date) = dates.d
GROUP BY d
ORDER BY d;
\`\`\`

## Hierarchical Example: Payment Tiers

\`\`\`sql
-- Generate payment tier boundaries
WITH RECURSIVE tiers(tier, min_amt, max_amt) AS (
  SELECT 1, 0.0, 2.99
  UNION ALL
  SELECT tier + 1,
         ROUND(max_amt + 0.01, 2),
         ROUND(max_amt + 3.00, 2)
  FROM tiers WHERE tier < 5
)
SELECT * FROM tiers;
\`\`\`

> **PostgreSQL note:** Recursive CTEs work identically in PostgreSQL. PostgreSQL also supports \`CYCLE\` detection to prevent infinite loops.
`,
    contentAr: `## CTEs العودية (Recursive CTEs)

**CTE العودي** هو CTE يُشير إلى نفسه. يُستخدم لـ:
- توليد متسلسلات (أرقام، تواريخ)
- اجتياز البيانات الهرمية (الهياكل التنظيمية، شجرة الفئات)
- مشاكل إيجاد المسار

## الهيكل

\`\`\`sql
WITH RECURSIVE cte_name AS (
  -- 1. المرساة: الصفوف الابتدائية (غير عودية)
  SELECT ...

  UNION ALL

  -- 2. الخطوة العودية: تُشير إلى cte_name
  SELECT ... FROM cte_name WHERE <شرط_الإيقاف>
)
SELECT * FROM cte_name;
\`\`\`

## توليد متسلسلة تواريخ

\`\`\`sql
-- توليد جميع تواريخ مايو 2005 (حين حدثت معظم الإيجارات)
WITH RECURSIVE dates(d) AS (
  SELECT '2005-05-24'                          -- المرساة
  UNION ALL
  SELECT date(d, '+1 day') FROM dates
  WHERE d < '2005-05-31'                       -- شرط الإيقاف
)
SELECT d AS rental_date,
       COUNT(r.rental_id) AS rentals
FROM dates
LEFT JOIN rental r ON DATE(r.rental_date) = dates.d
GROUP BY d
ORDER BY d;
\`\`\`

> **ملاحظة PostgreSQL:** تعمل CTEs العودية بشكل مطابق في PostgreSQL. يدعم PostgreSQL أيضًا اكتشاف \`CYCLE\` لمنع الحلقات اللانهائية.
`,
    exercises: [
      {
        id: 1,
        question: "Use a recursive CTE to generate numbers 1 through 20. Show a single column 'n'. Then use it to find all films whose film_id is in that generated sequence (film_id between 1 and 20).",
        questionAr: "استخدم CTE عوديًا لتوليد الأرقام من 1 إلى 20. اعرض عمودًا واحدًا 'n'. ثم استخدمه للبحث عن جميع الأفلام التي film_id ضمن هذه المتسلسلة (film_id بين 1 و20).",
        hint: "WITH RECURSIVE nums(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM nums WHERE n < 20) SELECT f.title FROM film f JOIN nums ON f.film_id = nums.n",
        hintAr: "WITH RECURSIVE nums(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM nums WHERE n < 20) SELECT ...",
        expectedQuery: "WITH RECURSIVE nums(n) AS (SELECT 1 UNION ALL SELECT n+1 FROM nums WHERE n < 20) SELECT f.title FROM film f JOIN nums ON f.film_id = nums.n ORDER BY f.film_id",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /RECURSIVE/i.test(q) && /UNION\s+ALL/i.test(q),
      },
      {
        id: 2,
        question: "Generate a date sequence for June 2005 (2005-06-01 to 2005-06-30) using a recursive CTE. Join with rental to count daily rentals. Show date and rental count, ordered by date.",
        questionAr: "ولّد متسلسلة تواريخ يونيو 2005 (2005-06-01 إلى 2005-06-30) باستخدام CTE عودي. اربط مع rental لعد الإيجارات اليومية. اعرض التاريخ وعدد الإيجارات مرتبًا.",
        hint: "WITH RECURSIVE dates(d) AS (SELECT '2005-06-01' UNION ALL SELECT date(d,'+1 day') FROM dates WHERE d < '2005-06-30') SELECT d, COUNT(r.rental_id) ...",
        hintAr: "WITH RECURSIVE dates(d) AS (SELECT '2005-06-01' UNION ALL SELECT date(d,'+1 day') FROM dates WHERE d < '2005-06-30') ...",
        expectedQuery: "WITH RECURSIVE dates(d) AS (SELECT '2005-06-01' UNION ALL SELECT date(d, '+1 day') FROM dates WHERE d < '2005-06-30') SELECT d AS rental_date, COUNT(r.rental_id) AS rentals FROM dates LEFT JOIN rental r ON DATE(r.rental_date) = dates.d GROUP BY d ORDER BY d",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /RECURSIVE/i.test(q) && /2005-06/i.test(q),
      },
    ],
  },

  {
    id: 151,
    title: 'CUME_DIST & Advanced Ranking',
    titleAr: 'CUME_DIST والترتيب المتقدم',
    description: 'Complete the window function toolkit with CUME_DIST, DENSE_RANK, and ROW_NUMBER.',
    descriptionAr: 'إتمام مجموعة أدوات دوال النوافذ بـ CUME_DIST وDENSE_RANK وROW_NUMBER.',
    example: `-- Full ranking toolkit on customer spending
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  ROUND(SUM(p.amount), 2)             AS total_spent,
  ROW_NUMBER()  OVER (ORDER BY SUM(p.amount) DESC) AS row_num,
  RANK()        OVER (ORDER BY SUM(p.amount) DESC) AS rank,
  DENSE_RANK()  OVER (ORDER BY SUM(p.amount) DESC) AS dense_rank,
  ROUND(CUME_DIST() OVER (ORDER BY SUM(p.amount)) * 100, 1) AS cume_pct
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
GROUP BY c.customer_id
ORDER BY total_spent DESC
LIMIT 15;`,
    content: `## CUME_DIST & Advanced Ranking

You've already used \`RANK\` and \`ROW_NUMBER\`. Here's the complete ranking toolkit.

## All Four Ranking Functions

| Function | Ties | Gaps | Use Case |
|----------|------|------|---------|
| \`ROW_NUMBER()\` | Each tie gets different number | N/A | Unique sequential IDs |
| \`RANK()\` | Same rank | Gaps after ties | Competition ranking |
| \`DENSE_RANK()\` | Same rank | No gaps | Compact ranking |
| \`CUME_DIST()\` | Returns 0–1 fraction | N/A | Percentile position |

## CUME_DIST

Returns the fraction of rows with values **less than or equal to** the current row:

\`\`\`sql
-- What fraction of films cost ≤ each film's rental rate?
SELECT
  title,
  rental_rate,
  ROUND(CUME_DIST() OVER (ORDER BY rental_rate) * 100, 1) AS cume_pct
FROM film
ORDER BY rental_rate, title
LIMIT 15;
\`\`\`

## DENSE_RANK vs RANK

\`\`\`sql
WITH customer_spend AS (
  SELECT customer_id, SUM(amount) AS total
  FROM payment GROUP BY customer_id
)
SELECT
  customer_id,
  ROUND(total, 2) AS total,
  RANK()       OVER (ORDER BY total DESC) AS rank,
  DENSE_RANK() OVER (ORDER BY total DESC) AS dense_rank
FROM customer_spend
ORDER BY total DESC
LIMIT 10;
\`\`\`

## PARTITION BY — Rank Within Groups

\`\`\`sql
-- Rank films within each rating group by length
SELECT
  title, rating, length,
  RANK() OVER (PARTITION BY rating ORDER BY length DESC) AS rank_in_rating
FROM film
ORDER BY rating, rank_in_rating
LIMIT 20;
\`\`\`
`,
    contentAr: `## CUME_DIST والترتيب المتقدم

استخدمت بالفعل \`RANK\` و\`ROW_NUMBER\`. إليك مجموعة أدوات الترتيب الكاملة.

## الدوال الأربع للترتيب

| الدالة | التعادل | الفجوات | حالة الاستخدام |
|--------|---------|---------|---------------|
| \`ROW_NUMBER()\` | رقم مختلف لكل تعادل | لا يوجد | معرّفات تسلسلية فريدة |
| \`RANK()\` | نفس الترتيب | فجوات بعد التعادل | ترتيب المسابقات |
| \`DENSE_RANK()\` | نفس الترتيب | بدون فجوات | ترتيب مضغوط |
| \`CUME_DIST()\` | يُرجع كسرًا 0-1 | لا يوجد | الموضع المئيني |

## CUME_DIST

تُرجع نسبة الصفوف ذات القيم **الأقل من أو تساوي** الصف الحالي:

\`\`\`sql
-- ما نسبة الأفلام التي تكلف ≤ سعر إيجار كل فيلم؟
SELECT
  title,
  rental_rate,
  ROUND(CUME_DIST() OVER (ORDER BY rental_rate) * 100, 1) AS cume_pct
FROM film
ORDER BY rental_rate, title
LIMIT 15;
\`\`\`

## PARTITION BY — الترتيب داخل مجموعات

\`\`\`sql
-- ترتيب الأفلام داخل كل مجموعة تصنيف حسب الطول
SELECT
  title, rating, length,
  RANK() OVER (PARTITION BY rating ORDER BY length DESC) AS rank_in_rating
FROM film
ORDER BY rating, rank_in_rating
LIMIT 20;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Rank films by rental_rate using all three functions: ROW_NUMBER, RANK, DENSE_RANK. Show title, rental_rate, and all three rank columns. Order by rental_rate DESC, limit 15.",
        questionAr: "رتّب الأفلام حسب rental_rate باستخدام الثلاث دوال: ROW_NUMBER وRANK وDENSE_RANK. اعرض العنوان والسعر والأعمدة الثلاثة. رتّب تنازليًا، حدّد بـ 15.",
        hint: "ROW_NUMBER() OVER (ORDER BY rental_rate DESC), RANK() OVER (...), DENSE_RANK() OVER (...)",
        hintAr: "ROW_NUMBER() OVER (ORDER BY rental_rate DESC)، RANK() OVER (...)، DENSE_RANK() OVER (...)",
        expectedQuery: "SELECT title, rental_rate, ROW_NUMBER() OVER (ORDER BY rental_rate DESC) AS row_num, RANK() OVER (ORDER BY rental_rate DESC) AS rnk, DENSE_RANK() OVER (ORDER BY rental_rate DESC) AS dense_rnk FROM film ORDER BY rental_rate DESC LIMIT 15",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /ROW_NUMBER/i.test(q) && /DENSE_RANK/i.test(q) && /RANK/i.test(q),
      },
      {
        id: 2,
        question: "Use RANK() with PARTITION BY to rank films within each rating group by length (longest first). Show title, rating, length, and rank_in_rating. Order by rating, rank_in_rating. Limit 20.",
        questionAr: "استخدم RANK() مع PARTITION BY لترتيب الأفلام داخل كل مجموعة تصنيف حسب الطول (الأطول أولًا). اعرض العنوان والتصنيف والطول والترتيب. رتّب حسب التصنيف ثم الترتيب. حدّد بـ 20.",
        hint: "RANK() OVER (PARTITION BY rating ORDER BY length DESC) AS rank_in_rating",
        hintAr: "RANK() OVER (PARTITION BY rating ORDER BY length DESC) AS rank_in_rating",
        expectedQuery: "SELECT title, rating, length, RANK() OVER (PARTITION BY rating ORDER BY length DESC) AS rank_in_rating FROM film ORDER BY rating, rank_in_rating LIMIT 20",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /PARTITION\s+BY/i.test(q) && /RANK/i.test(q),
      },
    ],
  },

  // ── Level 17 — Advanced Topics ──────────────────────────────────────────────
  {
    id: 152,
    title: 'Advanced CASE WHEN',
    titleAr: 'CASE WHEN المتقدم',
    description: 'Use CASE WHEN for multi-tier classification, pivoting data, and conditional aggregation.',
    descriptionAr: 'استخدام CASE WHEN للتصنيف متعدد المستويات وتدوير البيانات والتجميع الشرطي.',
    example: `-- Multi-tier film classification with conditional aggregation
SELECT
  CASE
    WHEN rental_rate < 1.00 THEN 'Budget'
    WHEN rental_rate < 3.00 THEN 'Standard'
    WHEN rental_rate < 5.00 THEN 'Premium'
    ELSE                         'Luxury'
  END AS price_tier,
  COUNT(*)                                           AS film_count,
  ROUND(AVG(length), 0)                              AS avg_length,
  COUNT(CASE WHEN rating = 'G'   THEN 1 END)         AS g_films,
  COUNT(CASE WHEN rating = 'R'   THEN 1 END)         AS r_films
FROM film
GROUP BY price_tier
ORDER BY MIN(rental_rate);`,
    content: `## Advanced CASE WHEN

You know basic \`CASE WHEN\`. This lesson covers three advanced patterns.

## Pattern 1: Multi-Tier Classification

\`\`\`sql
SELECT
  title,
  length,
  CASE
    WHEN length < 60  THEN 'Short'
    WHEN length < 100 THEN 'Standard'
    WHEN length < 150 THEN 'Long'
    ELSE                   'Epic'
  END AS length_category
FROM film
ORDER BY length;
\`\`\`

## Pattern 2: Conditional Aggregation (Pivot)

Count or sum only rows matching a condition:

\`\`\`sql
-- Count films per rating in a single row (pivot)
SELECT
  COUNT(CASE WHEN rating = 'G'     THEN 1 END) AS g_count,
  COUNT(CASE WHEN rating = 'PG'    THEN 1 END) AS pg_count,
  COUNT(CASE WHEN rating = 'PG-13' THEN 1 END) AS pg13_count,
  COUNT(CASE WHEN rating = 'R'     THEN 1 END) AS r_count,
  COUNT(CASE WHEN rating = 'NC-17' THEN 1 END) AS nc17_count
FROM film;
\`\`\`

## Pattern 3: CASE in ORDER BY

\`\`\`sql
-- Custom sort: G first, then PG, then everything else alphabetically
SELECT title, rating
FROM film
ORDER BY
  CASE rating
    WHEN 'G'  THEN 1
    WHEN 'PG' THEN 2
    ELSE           3
  END,
  title;
\`\`\`

## Pattern 4: CASE in UPDATE

\`\`\`sql
-- Adjust rental rate based on film length
UPDATE film
SET rental_rate = CASE
  WHEN length > 150 THEN rental_rate * 1.20
  WHEN length < 60  THEN rental_rate * 0.80
  ELSE rental_rate
END;
-- (Run SELECT to verify, then optionally rollback)
\`\`\`
`,
    contentAr: `## CASE WHEN المتقدم

تعرف بالفعل \`CASE WHEN\` الأساسي. يغطي هذا الدرس ثلاثة أنماط متقدمة.

## النمط 1: التصنيف متعدد المستويات

\`\`\`sql
SELECT
  title,
  length,
  CASE
    WHEN length < 60  THEN 'قصير'
    WHEN length < 100 THEN 'معتدل'
    WHEN length < 150 THEN 'طويل'
    ELSE                   'ملحمي'
  END AS length_category
FROM film
ORDER BY length;
\`\`\`

## النمط 2: التجميع الشرطي (Pivot)

عدّ أو اجمع الصفوف المطابقة لشرط فقط:

\`\`\`sql
-- عدد الأفلام لكل تصنيف في صف واحد (pivot)
SELECT
  COUNT(CASE WHEN rating = 'G'     THEN 1 END) AS g_count,
  COUNT(CASE WHEN rating = 'PG'    THEN 1 END) AS pg_count,
  COUNT(CASE WHEN rating = 'PG-13' THEN 1 END) AS pg13_count,
  COUNT(CASE WHEN rating = 'R'     THEN 1 END) AS r_count,
  COUNT(CASE WHEN rating = 'NC-17' THEN 1 END) AS nc17_count
FROM film;
\`\`\`

## النمط 3: CASE في ORDER BY

\`\`\`sql
-- ترتيب مخصص: G أولًا، ثم PG، ثم الباقي أبجديًا
SELECT title, rating
FROM film
ORDER BY
  CASE rating
    WHEN 'G'  THEN 1
    WHEN 'PG' THEN 2
    ELSE           3
  END,
  title;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Classify each film into a price tier using CASE WHEN: rental_rate < 1.00 = 'Budget', < 3.00 = 'Standard', < 5.00 = 'Premium', else 'Luxury'. Show title, rental_rate, and price_tier. Order by rental_rate, title. Limit 20.",
        questionAr: "صنّف كل فيلم إلى فئة سعرية باستخدام CASE WHEN: rental_rate < 1.00 = 'Budget'، < 3.00 = 'Standard'، < 5.00 = 'Premium'، وإلا 'Luxury'. اعرض العنوان والسعر والفئة. رتّب حسب السعر ثم العنوان. حدّد بـ 20.",
        hint: "CASE WHEN rental_rate < 1.00 THEN 'Budget' WHEN rental_rate < 3.00 THEN 'Standard' ... END AS price_tier",
        hintAr: "CASE WHEN rental_rate < 1.00 THEN 'Budget' WHEN rental_rate < 3.00 THEN 'Standard' ... END AS price_tier",
        expectedQuery: "SELECT title, rental_rate, CASE WHEN rental_rate < 1.00 THEN 'Budget' WHEN rental_rate < 3.00 THEN 'Standard' WHEN rental_rate < 5.00 THEN 'Premium' ELSE 'Luxury' END AS price_tier FROM film ORDER BY rental_rate, title LIMIT 20",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CASE\s+WHEN/i.test(q) && /Budget|Standard|Premium/i.test(q),
      },
      {
        id: 2,
        question: "Use conditional aggregation to count films per rating in a single row (pivot). Columns: g_count, pg_count, pg13_count, r_count, nc17_count. One row result.",
        questionAr: "استخدم التجميع الشرطي لعدّ الأفلام لكل تصنيف في صف واحد (pivot). الأعمدة: g_count وpg_count وpg13_count وr_count وnc17_count. نتيجة صف واحد.",
        hint: "COUNT(CASE WHEN rating = 'G' THEN 1 END) AS g_count, ...",
        hintAr: "COUNT(CASE WHEN rating = 'G' THEN 1 END) AS g_count, ...",
        expectedQuery: "SELECT COUNT(CASE WHEN rating = 'G' THEN 1 END) AS g_count, COUNT(CASE WHEN rating = 'PG' THEN 1 END) AS pg_count, COUNT(CASE WHEN rating = 'PG-13' THEN 1 END) AS pg13_count, COUNT(CASE WHEN rating = 'R' THEN 1 END) AS r_count, COUNT(CASE WHEN rating = 'NC-17' THEN 1 END) AS nc17_count FROM film",
        checkFunction: (result: unknown[], q = '') =>
          result.length === 1 && /CASE\s+WHEN.*rating/i.test(q) && /COUNT/i.test(q),
      },
    ],
  },

  {
    id: 153,
    title: 'Advanced NULL Handling',
    titleAr: 'التعامل المتقدم مع NULL',
    description: 'Master COALESCE, NULLIF, and NULL-safe comparisons for robust queries.',
    descriptionAr: 'إتقان COALESCE وNULLIF والمقارنات الآمنة من NULL لاستعلامات قوية.',
    example: `-- COALESCE: replace NULL with a default
SELECT
  rental_id,
  customer_id,
  rental_date,
  COALESCE(return_date, 'Not returned yet') AS return_status,
  COALESCE(
    CAST(CAST(julianday(return_date) - julianday(rental_date) AS INTEGER) AS TEXT),
    'Still out'
  ) AS days_kept
FROM rental
LIMIT 15;`,
    content: `## Advanced NULL Handling

## COALESCE — First Non-NULL Value

Returns the first non-NULL value from a list:

\`\`\`sql
-- Substitute NULL return_date with a message
SELECT
  rental_id,
  COALESCE(return_date, 'Not returned') AS return_status
FROM rental LIMIT 10;

-- Use the next available value
SELECT
  COALESCE(description, title, 'No info') AS film_info
FROM film LIMIT 10;
\`\`\`

## NULLIF — Return NULL When Equal

\`NULLIF(a, b)\` returns NULL if \`a = b\`, otherwise returns \`a\`. Useful to avoid division by zero:

\`\`\`sql
-- Safe division: avoid divide-by-zero
SELECT
  store_id,
  SUM(amount) AS revenue,
  COUNT(*) AS transactions,
  ROUND(SUM(amount) / NULLIF(COUNT(*), 0), 2) AS avg_transaction
FROM payment
JOIN rental r ON payment.rental_id = r.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
GROUP BY store_id;
\`\`\`

## NULL in Aggregates

\`COUNT(*)\` counts all rows. \`COUNT(col)\` skips NULLs:

\`\`\`sql
SELECT
  COUNT(*)           AS total_rentals,
  COUNT(return_date) AS returned_rentals,
  COUNT(*) - COUNT(return_date) AS still_out
FROM rental;
\`\`\`

## IS DISTINCT FROM (PostgreSQL)

A NULL-safe comparison operator:

\`\`\`sql
-- PostgreSQL only: treats NULL = NULL as true
SELECT * FROM rental
WHERE return_date IS DISTINCT FROM '2005-06-01';
\`\`\`
`,
    contentAr: `## التعامل المتقدم مع NULL

## COALESCE — أول قيمة غير NULL

تُرجع أول قيمة غير NULL من قائمة:

\`\`\`sql
-- استبدال return_date الفارغة برسالة
SELECT
  rental_id,
  COALESCE(return_date, 'لم تُعَد بعد') AS return_status
FROM rental LIMIT 10;

-- استخدام القيمة المتاحة التالية
SELECT
  COALESCE(description, title, 'لا معلومات') AS film_info
FROM film LIMIT 10;
\`\`\`

## NULLIF — إرجاع NULL عند التساوي

تُرجع \`NULLIF(a, b)\` قيمة NULL إذا كان \`a = b\`، وإلا تُرجع \`a\`. مفيدة لتجنب القسمة على صفر:

\`\`\`sql
-- قسمة آمنة: تجنب القسمة على صفر
SELECT
  store_id,
  SUM(amount) AS revenue,
  COUNT(*) AS transactions,
  ROUND(SUM(amount) / NULLIF(COUNT(*), 0), 2) AS avg_transaction
FROM payment
JOIN rental r ON payment.rental_id = r.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
GROUP BY store_id;
\`\`\`

## NULL في دوال التجميع

يعدّ \`COUNT(*)\` جميع الصفوف. يتجاهل \`COUNT(col)\` القيم الفارغة:

\`\`\`sql
SELECT
  COUNT(*)           AS total_rentals,
  COUNT(return_date) AS returned_rentals,
  COUNT(*) - COUNT(return_date) AS still_out
FROM rental;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Show rental_id, customer_id, and a 'return_status' column that displays the return_date if present, or 'Still rented' if NULL. Order by return_date NULLS LAST, limit 20.",
        questionAr: "اعرض rental_id وcustomer_id وعمود 'return_status' يعرض return_date إن وُجدت، أو 'Still rented' إن كانت NULL. رتّب بـ return_date NULLS LAST، حدّد بـ 20.",
        hint: "COALESCE(return_date, 'Still rented') AS return_status",
        hintAr: "COALESCE(return_date, 'Still rented') AS return_status",
        expectedQuery: "SELECT rental_id, customer_id, COALESCE(return_date, 'Still rented') AS return_status FROM rental ORDER BY return_date NULLS LAST LIMIT 20",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /COALESCE/i.test(q) && /return_date/i.test(q),
      },
      {
        id: 2,
        question: "Count total rentals, returned rentals (return_date IS NOT NULL), and still-out rentals (COUNT(*) - COUNT(return_date)) from the rental table. Show as three columns: total_rentals, returned, still_out.",
        questionAr: "احسب إجمالي الإيجارات والإيجارات المُعادة (return_date IS NOT NULL) والإيجارات الخارجة (COUNT(*) - COUNT(return_date)) من جدول rental. اعرض ثلاثة أعمدة: total_rentals وreturned وstill_out.",
        hint: "SELECT COUNT(*) AS total_rentals, COUNT(return_date) AS returned, COUNT(*) - COUNT(return_date) AS still_out FROM rental",
        hintAr: "SELECT COUNT(*) AS total_rentals, COUNT(return_date) AS returned, COUNT(*) - COUNT(return_date) AS still_out FROM rental",
        expectedQuery: "SELECT COUNT(*) AS total_rentals, COUNT(return_date) AS returned, COUNT(*) - COUNT(return_date) AS still_out FROM rental",
        checkFunction: (result: unknown[], q = '') =>
          result.length === 1 && /COUNT\s*\(\s*return_date\s*\)/i.test(q) && /COUNT\s*\(\s*\*\s*\)/i.test(q),
      },
    ],
  },

  {
    id: 154,
    title: 'Database Design & Normalization',
    titleAr: 'تصميم قواعد البيانات والتطبيع',
    description: 'Understand 1NF, 2NF, 3NF and how the DVD Rental schema applies these principles.',
    descriptionAr: 'فهم 1NF و2NF و3NF وكيف تطبّق قاعدة بيانات DVD هذه المبادئ.',
    example: `-- Explore the normalized structure of the DVD schema
-- See how address data is split across 3 tables
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  a.address,
  ci.city,
  co.country
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci   ON a.city_id    = ci.city_id
JOIN country co ON ci.country_id = co.country_id
LIMIT 10;`,
    content: `## Database Design & Normalization

**Normalization** is the process of organizing a database to reduce data redundancy and improve data integrity.

## The Three Normal Forms

### First Normal Form (1NF)
- Each column contains **atomic** (single) values
- No repeating groups

❌ Bad: \`actors = "Tom Hanks, Julia Roberts"\` (list in one cell)
✅ Good: Separate \`film_actor\` table with one row per actor-film pair

### Second Normal Form (2NF)
- Must be in 1NF
- Every non-key column depends on the **whole** primary key

❌ Bad: Storing \`actor_name\` in \`film_actor\` (depends only on actor_id, not the full key)
✅ Good: \`actor_name\` lives in the \`actor\` table

### Third Normal Form (3NF)
- Must be in 2NF
- No **transitive dependencies** (non-key column depends on another non-key column)

❌ Bad: Storing \`city_name\` and \`country_name\` directly in \`customer\`
✅ Good: DVD schema separates \`address\` → \`city\` → \`country\`

## DVD Schema: A Normalized Example

The \`customer\` table demonstrates 3NF:

\`\`\`
customer
  └── address_id → address
                      └── city_id → city
                                       └── country_id → country
\`\`\`

Each table has one responsibility. Changes to a country name only need to happen in one place.

## Denormalization (When to Break the Rules)

Sometimes you intentionally denormalize for performance:

\`\`\`sql
-- A denormalized reporting table (all in one)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name AS customer,
  ci.city,
  co.country,
  COUNT(r.rental_id) AS rentals,
  SUM(p.amount) AS revenue
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY c.customer_id
LIMIT 10;
\`\`\`
`,
    contentAr: `## تصميم قواعد البيانات والتطبيع

**التطبيع** هو عملية تنظيم قاعدة البيانات لتقليل التكرار وتحسين سلامة البيانات.

## الأشكال الطبيعية الثلاثة

### الشكل الطبيعي الأول (1NF)
- كل عمود يحتوي قيمًا **ذرية** (مفردة)
- لا مجموعات متكررة

❌ سيئ: \`actors = "توم هانكس، جوليا روبرتس"\` (قائمة في خلية واحدة)
✅ جيد: جدول \`film_actor\` منفصل بصف واحد لكل زوج ممثل-فيلم

### الشكل الطبيعي الثاني (2NF)
- يجب أن يكون في 1NF
- كل عمود غير رئيسي يعتمد على **المفتاح الأساسي كاملًا**

❌ سيئ: تخزين \`actor_name\` في \`film_actor\` (يعتمد فقط على actor_id)
✅ جيد: \`actor_name\` موجود في جدول \`actor\`

### الشكل الطبيعي الثالث (3NF)
- يجب أن يكون في 2NF
- لا **تبعيات انتقالية**

❌ سيئ: تخزين \`city_name\` و\`country_name\` مباشرةً في \`customer\`
✅ جيد: قاعدة DVD تفصل \`address\` → \`city\` → \`country\`

## قاعدة DVD: مثال مُطبَّع

يُجسّد جدول \`customer\` الشكل الطبيعي الثالث:

\`\`\`
customer
  └── address_id → address
                      └── city_id → city
                                       └── country_id → country
\`\`\`

لكل جدول مسؤولية واحدة. تغيير اسم دولة يحتاج التعديل في مكان واحد فقط.
`,
    exercises: [
      {
        id: 1,
        question: "Demonstrate 3NF by querying the full address chain. Show customer full name, address, city, country for the first 15 customers ordered by country, city.",
        questionAr: "وضّح 3NF بالاستعلام عن سلسلة العنوان الكاملة. اعرض الاسم الكامل للعميل والعنوان والمدينة والدولة لأول 15 عميلًا مرتبًا حسب الدولة ثم المدينة.",
        hint: "JOIN customer → address → city → country, ORDER BY country, city",
        hintAr: "اربط customer → address → city → country، ORDER BY country, city",
        expectedQuery: "SELECT c.first_name || ' ' || c.last_name AS customer, a.address, ci.city, co.country FROM customer c JOIN address a ON c.address_id = a.address_id JOIN city ci ON a.city_id = ci.city_id JOIN country co ON ci.country_id = co.country_id ORDER BY co.country, ci.city LIMIT 15",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /country/i.test(q) && /city/i.test(q) && /address/i.test(q),
      },
      {
        id: 2,
        question: "Show the 2NF principle: query film_actor joined with actor to prove actor name lives in actor table, not in film_actor. Show film_id, actor_id, first_name, last_name. Limit 10.",
        questionAr: "وضّح مبدأ 2NF: استعلم عن film_actor مع actor لإثبات أن اسم الممثل موجود في جدول actor وليس في film_actor. اعرض film_id وactor_id وfirst_name وlast_name. حدّد بـ 10.",
        hint: "SELECT fa.film_id, fa.actor_id, a.first_name, a.last_name FROM film_actor fa JOIN actor a ON fa.actor_id = a.actor_id LIMIT 10",
        hintAr: "SELECT fa.film_id, fa.actor_id, a.first_name, a.last_name FROM film_actor fa JOIN actor a ON ...",
        expectedQuery: "SELECT fa.film_id, fa.actor_id, a.first_name, a.last_name FROM film_actor fa JOIN actor a ON fa.actor_id = a.actor_id LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /film_actor/i.test(q) && /actor/i.test(q) && /first_name/i.test(q),
      },
    ],
  },

  // ── Level 18 — Optimization & Projects ─────────────────────────────────────
  {
    id: 155,
    title: 'Query Optimization & EXPLAIN',
    titleAr: 'تحسين الاستعلامات وEXPLAIN',
    description: 'Analyze query execution plans and apply optimization techniques.',
    descriptionAr: 'تحليل خطط تنفيذ الاستعلامات وتطبيق تقنيات التحسين.',
    example: `-- Analyze a query's execution plan
EXPLAIN QUERY PLAN
SELECT f.title, COUNT(r.rental_id) AS rentals
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id
ORDER BY rentals DESC
LIMIT 10;`,
    content: `## Query Optimization & EXPLAIN

Understanding *how* a query executes helps you make it faster.

## EXPLAIN QUERY PLAN (SQLite)

Shows how SQLite plans to execute a query:

\`\`\`sql
EXPLAIN QUERY PLAN
SELECT * FROM rental WHERE customer_id = 1;
\`\`\`

Key things to look for:
- **SCAN TABLE** — reads every row (slow on large tables → add an index)
- **SEARCH TABLE USING INDEX** — uses an index (fast)
- **USING COVERING INDEX** — fastest: all needed data is in the index

## PostgreSQL EXPLAIN

\`\`\`sql
-- PostgreSQL: shows estimated cost
EXPLAIN SELECT * FROM rental WHERE customer_id = 1;

-- With actual timing:
EXPLAIN ANALYZE SELECT * FROM rental WHERE customer_id = 1;
\`\`\`

## Common Optimization Techniques

### 1. Add Indexes on JOIN and WHERE Columns

\`\`\`sql
CREATE INDEX idx_rental_customer ON rental(customer_id);
CREATE INDEX idx_inventory_film  ON inventory(film_id);
\`\`\`

### 2. Select Only Needed Columns

\`\`\`sql
-- Avoid SELECT * in production
-- ❌ SELECT * FROM film JOIN ...
-- ✅ SELECT f.title, r.rental_date FROM film f JOIN ...
\`\`\`

### 3. Use CTEs Instead of Repeated Subqueries

\`\`\`sql
-- Compute expensive subquery once in a CTE, reuse it
WITH film_counts AS (
  SELECT film_id, COUNT(*) AS cnt
  FROM inventory GROUP BY film_id
)
SELECT f.title, fc.cnt
FROM film f JOIN film_counts fc ON f.film_id = fc.film_id;
\`\`\`

### 4. Filter Early

\`\`\`sql
-- Filter before joining (push WHERE into subquery)
SELECT f.title, r.rental_date
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN (SELECT * FROM rental WHERE customer_id = 1) r
  ON i.inventory_id = r.inventory_id;
\`\`\`
`,
    contentAr: `## تحسين الاستعلامات وEXPLAIN

فهم *كيفية* تنفيذ استعلام يساعدك على تسريعه.

## EXPLAIN QUERY PLAN (SQLite)

يوضح كيف يخطط SQLite لتنفيذ استعلام:

\`\`\`sql
EXPLAIN QUERY PLAN
SELECT * FROM rental WHERE customer_id = 1;
\`\`\`

أشياء يجب البحث عنها:
- **SCAN TABLE** — يقرأ كل صف (بطيء على الجداول الكبيرة → أضف مؤشرًا)
- **SEARCH TABLE USING INDEX** — يستخدم مؤشرًا (سريع)
- **USING COVERING INDEX** — الأسرع: جميع البيانات المطلوبة في المؤشر

## EXPLAIN في PostgreSQL

\`\`\`sql
-- PostgreSQL: يعرض التكلفة المُقدَّرة
EXPLAIN SELECT * FROM rental WHERE customer_id = 1;

-- مع التوقيت الفعلي:
EXPLAIN ANALYZE SELECT * FROM rental WHERE customer_id = 1;
\`\`\`

## تقنيات التحسين الشائعة

### 1. إضافة مؤشرات على أعمدة JOIN وWHERE

\`\`\`sql
CREATE INDEX idx_rental_customer ON rental(customer_id);
CREATE INDEX idx_inventory_film  ON inventory(film_id);
\`\`\`

### 2. اختيار الأعمدة المطلوبة فقط

\`\`\`sql
-- تجنب SELECT * في الإنتاج
-- ❌ SELECT * FROM film JOIN ...
-- ✅ SELECT f.title, r.rental_date FROM film f JOIN ...
\`\`\`

### 3. استخدام CTEs بدل الاستعلامات الفرعية المتكررة

\`\`\`sql
-- احسب الاستعلام المكلف مرة واحدة في CTE، ثم أعد استخدامه
WITH film_counts AS (
  SELECT film_id, COUNT(*) AS cnt
  FROM inventory GROUP BY film_id
)
SELECT f.title, fc.cnt
FROM film f JOIN film_counts fc ON f.film_id = fc.film_id;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Use EXPLAIN QUERY PLAN to analyze this query: SELECT title FROM film WHERE rental_rate = 4.99 ORDER BY title. Then create an index on rental_rate and run EXPLAIN again to see the difference.",
        questionAr: "استخدم EXPLAIN QUERY PLAN لتحليل هذا الاستعلام: SELECT title FROM film WHERE rental_rate = 4.99 ORDER BY title. ثم أنشئ مؤشرًا على rental_rate وأعد تشغيل EXPLAIN.",
        hint: "EXPLAIN QUERY PLAN SELECT ...; CREATE INDEX idx ON film(rental_rate); EXPLAIN QUERY PLAN SELECT ...;",
        hintAr: "EXPLAIN QUERY PLAN SELECT ...; CREATE INDEX idx ON film(rental_rate); EXPLAIN QUERY PLAN SELECT ...;",
        expectedQuery: "EXPLAIN QUERY PLAN SELECT title FROM film WHERE rental_rate = 4.99 ORDER BY title; CREATE INDEX IF NOT EXISTS idx_film_rate ON film(rental_rate); EXPLAIN QUERY PLAN SELECT title FROM film WHERE rental_rate = 4.99 ORDER BY title;",
        checkFunction: (_result: unknown[], q = '') =>
          /EXPLAIN/i.test(q) && /CREATE\s+INDEX/i.test(q),
      },
      {
        id: 2,
        question: "Rewrite this inefficient query using a CTE to compute rental counts once: SELECT f.title, (SELECT COUNT(*) FROM inventory i JOIN rental r ON i.inventory_id = r.inventory_id WHERE i.film_id = f.film_id) AS cnt FROM film ORDER BY cnt DESC LIMIT 10.",
        questionAr: "أعد كتابة هذا الاستعلام غير الكفء باستخدام CTE لحساب عدد الإيجارات مرة واحدة: الاستعلام يحسب استعلامًا فرعيًا مترابطًا لكل فيلم. استخدم CTE بدلًا من ذلك.",
        hint: "WITH rental_counts AS (SELECT i.film_id, COUNT(*) AS cnt FROM inventory i JOIN rental r ... GROUP BY i.film_id) SELECT f.title, rc.cnt FROM film f JOIN rental_counts rc ...",
        hintAr: "WITH rental_counts AS (...) SELECT f.title, rc.cnt FROM film f JOIN rental_counts rc ...",
        expectedQuery: "WITH rental_counts AS (SELECT i.film_id, COUNT(*) AS cnt FROM inventory i JOIN rental r ON i.inventory_id = r.inventory_id GROUP BY i.film_id) SELECT f.title, rc.cnt FROM film f JOIN rental_counts rc ON f.film_id = rc.film_id ORDER BY rc.cnt DESC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /WITH/i.test(q) && /rental_counts/i.test(q),
      },
    ],
  },

  {
    id: 156,
    title: 'Real-World Project I: Revenue Dashboard',
    titleAr: 'مشروع حقيقي I: لوحة بيانات الإيرادات',
    description: 'Build a complete revenue dashboard using the DVD Rental database.',
    descriptionAr: 'بناء لوحة بيانات إيرادات كاملة باستخدام قاعدة بيانات DVD Rental.',
    example: `-- Executive revenue summary
WITH monthly_revenue AS (
  SELECT
    strftime('%Y-%m', payment_date) AS month,
    SUM(amount)                     AS revenue,
    COUNT(*)                        AS transactions
  FROM payment
  GROUP BY month
),
stats AS (
  SELECT
    MIN(revenue) AS min_month,
    MAX(revenue) AS max_month,
    AVG(revenue) AS avg_month
  FROM monthly_revenue
)
SELECT
  mr.month,
  ROUND(mr.revenue, 2)    AS revenue,
  mr.transactions,
  ROUND(LAG(mr.revenue) OVER (ORDER BY mr.month), 2) AS prev_month,
  ROUND(mr.revenue - LAG(mr.revenue) OVER (ORDER BY mr.month), 2) AS change
FROM monthly_revenue mr
ORDER BY mr.month;`,
    content: `## Real-World Project I: Revenue Dashboard

This project combines everything you've learned to build a real business revenue dashboard.

## Module 1: Monthly Revenue Trend

\`\`\`sql
SELECT
  strftime('%Y-%m', payment_date) AS month,
  ROUND(SUM(amount), 2)           AS revenue,
  COUNT(*)                        AS payments,
  ROUND(AVG(amount), 2)           AS avg_payment
FROM payment
GROUP BY month
ORDER BY month;
\`\`\`

## Module 2: Revenue by Category

\`\`\`sql
SELECT
  c.name AS category,
  ROUND(SUM(p.amount), 2)    AS revenue,
  COUNT(r.rental_id)         AS rentals,
  ROUND(SUM(p.amount) / COUNT(r.rental_id), 2) AS revenue_per_rental
FROM payment p
JOIN rental r     ON p.rental_id    = r.rental_id
JOIN inventory i  ON r.inventory_id = i.inventory_id
JOIN film_category fc ON i.film_id  = fc.film_id
JOIN category c   ON fc.category_id = c.category_id
GROUP BY c.name
ORDER BY revenue DESC;
\`\`\`

## Module 3: Store Comparison

\`\`\`sql
SELECT
  i.store_id,
  ROUND(SUM(p.amount), 2)    AS total_revenue,
  COUNT(DISTINCT r.customer_id) AS unique_customers,
  COUNT(r.rental_id)          AS total_rentals
FROM payment p
JOIN rental r    ON p.rental_id    = r.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
GROUP BY i.store_id;
\`\`\`

## Module 4: Top 10 Revenue-Generating Films

\`\`\`sql
SELECT
  f.title,
  f.rating,
  COUNT(r.rental_id)       AS rentals,
  ROUND(SUM(p.amount), 2)  AS revenue
FROM film f
JOIN inventory i ON f.film_id   = i.film_id
JOIN rental r    ON i.inventory_id = r.inventory_id
JOIN payment p   ON r.rental_id = p.rental_id
GROUP BY f.film_id
ORDER BY revenue DESC
LIMIT 10;
\`\`\`
`,
    contentAr: `## مشروع حقيقي I: لوحة بيانات الإيرادات

يجمع هذا المشروع كل ما تعلمته لبناء لوحة بيانات إيرادات تجارية حقيقية.

## الوحدة 1: اتجاه الإيرادات الشهرية

\`\`\`sql
SELECT
  strftime('%Y-%m', payment_date) AS month,
  ROUND(SUM(amount), 2)           AS revenue,
  COUNT(*)                        AS payments,
  ROUND(AVG(amount), 2)           AS avg_payment
FROM payment
GROUP BY month
ORDER BY month;
\`\`\`

## الوحدة 2: الإيرادات حسب الفئة

\`\`\`sql
SELECT
  c.name AS category,
  ROUND(SUM(p.amount), 2)    AS revenue,
  COUNT(r.rental_id)         AS rentals,
  ROUND(SUM(p.amount) / COUNT(r.rental_id), 2) AS revenue_per_rental
FROM payment p
JOIN rental r     ON p.rental_id    = r.rental_id
JOIN inventory i  ON r.inventory_id = i.inventory_id
JOIN film_category fc ON i.film_id  = fc.film_id
JOIN category c   ON fc.category_id = c.category_id
GROUP BY c.name
ORDER BY revenue DESC;
\`\`\`

## الوحدة 3: مقارنة المتاجر

\`\`\`sql
SELECT
  i.store_id,
  ROUND(SUM(p.amount), 2)    AS total_revenue,
  COUNT(DISTINCT r.customer_id) AS unique_customers,
  COUNT(r.rental_id)          AS total_rentals
FROM payment p
JOIN rental r    ON p.rental_id    = r.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
GROUP BY i.store_id;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Build the monthly revenue report: month (strftime('%Y-%m')), total revenue (rounded 2), payment count, and average payment (rounded 2). Order by month.",
        questionAr: "ابنِ تقرير الإيرادات الشهرية: month (strftime('%Y-%m')) وإجمالي الإيرادات (مقرَّب 2) وعدد الدفعات ومتوسط الدفعة (مقرَّب 2). رتّب حسب الشهر.",
        hint: "SELECT strftime('%Y-%m', payment_date) AS month, ROUND(SUM(amount),2), COUNT(*), ROUND(AVG(amount),2) FROM payment GROUP BY month ORDER BY month",
        hintAr: "SELECT strftime('%Y-%m', payment_date) AS month, ROUND(SUM(amount),2) ...",
        expectedQuery: "SELECT strftime('%Y-%m', payment_date) AS month, ROUND(SUM(amount), 2) AS revenue, COUNT(*) AS payments, ROUND(AVG(amount), 2) AS avg_payment FROM payment GROUP BY month ORDER BY month",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /strftime/i.test(q) && /SUM.*amount/i.test(q) && /GROUP\s+BY/i.test(q),
      },
      {
        id: 2,
        question: "Build the revenue-by-category report. Columns: category name, total revenue (rounded 2), rental count, revenue per rental (rounded 2). Order by total revenue DESC.",
        questionAr: "ابنِ تقرير الإيرادات حسب الفئة. الأعمدة: اسم الفئة وإجمالي الإيرادات (مقرَّب 2) وعدد الإيجارات وإيرادات لكل إيجار (مقرَّب 2). رتّب تنازليًا.",
        hint: "JOIN payment → rental → inventory → film_category → category, GROUP BY c.name",
        hintAr: "اربط payment → rental → inventory → film_category → category، GROUP BY c.name",
        expectedQuery: "SELECT c.name AS category, ROUND(SUM(p.amount), 2) AS revenue, COUNT(r.rental_id) AS rentals, ROUND(SUM(p.amount) / COUNT(r.rental_id), 2) AS revenue_per_rental FROM payment p JOIN rental r ON p.rental_id = r.rental_id JOIN inventory i ON r.inventory_id = i.inventory_id JOIN film_category fc ON i.film_id = fc.film_id JOIN category c ON fc.category_id = c.category_id GROUP BY c.name ORDER BY revenue DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /category/i.test(q) && /SUM.*amount/i.test(q) && /film_category/i.test(q),
      },
    ],
  },

  {
    id: 157,
    title: 'Real-World Project II: Customer Analytics',
    titleAr: 'مشروع حقيقي II: تحليلات العملاء',
    description: 'Segment customers by behavior and build a full customer analytics report.',
    descriptionAr: 'تقسيم العملاء حسب سلوكهم وبناء تقرير تحليلات عملاء كامل.',
    example: `-- Customer RFM Analysis (Recency, Frequency, Monetary)
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name              AS customer,
  COUNT(r.rental_id)                               AS frequency,
  ROUND(SUM(p.amount), 2)                          AS monetary,
  MAX(DATE(r.rental_date))                         AS last_rental,
  NTILE(4) OVER (ORDER BY SUM(p.amount))           AS spending_quartile,
  NTILE(4) OVER (ORDER BY COUNT(r.rental_id))      AS frequency_quartile
FROM customer c
JOIN rental  r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id   = p.rental_id
GROUP BY c.customer_id
ORDER BY monetary DESC
LIMIT 20;`,
    content: `## Real-World Project II: Customer Analytics

## Module 1: Customer Segmentation

\`\`\`sql
-- Segment customers by spending tier
SELECT
  CASE
    WHEN total_spent >= 150 THEN 'VIP'
    WHEN total_spent >= 100 THEN 'Regular'
    WHEN total_spent >= 50  THEN 'Occasional'
    ELSE 'Churned Risk'
  END AS segment,
  COUNT(*) AS customers,
  ROUND(AVG(total_spent), 2) AS avg_spend
FROM (
  SELECT c.customer_id, SUM(p.amount) AS total_spent
  FROM customer c JOIN payment p ON c.customer_id = p.customer_id
  GROUP BY c.customer_id
)
GROUP BY segment
ORDER BY AVG(total_spent) DESC;
\`\`\`

## Module 2: Top Customers by City

\`\`\`sql
SELECT
  ci.city,
  COUNT(DISTINCT c.customer_id)  AS customers,
  ROUND(SUM(p.amount), 2)        AS city_revenue,
  ROUND(AVG(p.amount), 2)        AS avg_payment
FROM customer c
JOIN address a  ON c.address_id  = a.address_id
JOIN city ci    ON a.city_id     = ci.city_id
JOIN payment p  ON c.customer_id = p.customer_id
GROUP BY ci.city
ORDER BY city_revenue DESC
LIMIT 15;
\`\`\`

## Module 3: Customer Retention (Active Months)

\`\`\`sql
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  COUNT(DISTINCT strftime('%Y-%m', r.rental_date)) AS active_months,
  MIN(DATE(r.rental_date)) AS first_rental,
  MAX(DATE(r.rental_date)) AS last_rental
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
GROUP BY c.customer_id
ORDER BY active_months DESC
LIMIT 15;
\`\`\`
`,
    contentAr: `## مشروع حقيقي II: تحليلات العملاء

## الوحدة 1: تقسيم العملاء

\`\`\`sql
-- تقسيم العملاء حسب فئة الإنفاق
SELECT
  CASE
    WHEN total_spent >= 150 THEN 'VIP'
    WHEN total_spent >= 100 THEN 'Regular'
    WHEN total_spent >= 50  THEN 'Occasional'
    ELSE 'Churned Risk'
  END AS segment,
  COUNT(*) AS customers,
  ROUND(AVG(total_spent), 2) AS avg_spend
FROM (
  SELECT c.customer_id, SUM(p.amount) AS total_spent
  FROM customer c JOIN payment p ON c.customer_id = p.customer_id
  GROUP BY c.customer_id
)
GROUP BY segment
ORDER BY AVG(total_spent) DESC;
\`\`\`

## الوحدة 2: أفضل العملاء حسب المدينة

\`\`\`sql
SELECT
  ci.city,
  COUNT(DISTINCT c.customer_id)  AS customers,
  ROUND(SUM(p.amount), 2)        AS city_revenue
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci   ON a.city_id    = ci.city_id
JOIN payment p ON c.customer_id = p.customer_id
GROUP BY ci.city
ORDER BY city_revenue DESC
LIMIT 15;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Segment customers into 'VIP' (spent >= 150), 'Regular' (>= 100), 'Occasional' (>= 50), 'Churned Risk' (< 50). Show segment, customer count, and avg spend. Order by avg spend DESC.",
        questionAr: "قسّم العملاء إلى 'VIP' (أنفق >= 150) و'Regular' (>= 100) و'Occasional' (>= 50) و'Churned Risk' (< 50). اعرض الشريحة وعدد العملاء ومتوسط الإنفاق. رتّب تنازليًا.",
        hint: "Use derived table for customer totals, then CASE WHEN on total_spent to assign segments, GROUP BY segment",
        hintAr: "استخدم جدولًا مشتقًا للإجماليات، ثم CASE WHEN على total_spent لتعيين الشرائح، GROUP BY segment",
        expectedQuery: "SELECT CASE WHEN total_spent >= 150 THEN 'VIP' WHEN total_spent >= 100 THEN 'Regular' WHEN total_spent >= 50 THEN 'Occasional' ELSE 'Churned Risk' END AS segment, COUNT(*) AS customers, ROUND(AVG(total_spent), 2) AS avg_spend FROM (SELECT c.customer_id, SUM(p.amount) AS total_spent FROM customer c JOIN payment p ON c.customer_id = p.customer_id GROUP BY c.customer_id) GROUP BY segment ORDER BY avg_spend DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CASE\s+WHEN/i.test(q) && /VIP/i.test(q) && /segment/i.test(q),
      },
      {
        id: 2,
        question: "Find customers who rented in at least 4 distinct months, showing customer name, active_months, first_rental, and last_rental. Order by active_months DESC.",
        questionAr: "ابحث عن العملاء الذين استأجروا في 4 أشهر مختلفة على الأقل، مُظهِرًا اسم العميل وعدد الأشهر النشطة وأول وآخر إيجار. رتّب تنازليًا.",
        hint: "COUNT(DISTINCT strftime('%Y-%m', rental_date)) AS active_months, HAVING active_months >= 4",
        hintAr: "COUNT(DISTINCT strftime('%Y-%m', rental_date)) AS active_months، HAVING >= 4",
        expectedQuery: "SELECT c.first_name || ' ' || c.last_name AS customer, COUNT(DISTINCT strftime('%Y-%m', r.rental_date)) AS active_months, MIN(DATE(r.rental_date)) AS first_rental, MAX(DATE(r.rental_date)) AS last_rental FROM customer c JOIN rental r ON c.customer_id = r.customer_id GROUP BY c.customer_id HAVING active_months >= 4 ORDER BY active_months DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /strftime/i.test(q) && /HAVING/i.test(q) && /active_months/i.test(q),
      },
    ],
  },

  // ── Level 19 — Projects & Capstone ──────────────────────────────────────────
  {
    id: 158,
    title: 'Real-World Project III: Inventory Report',
    titleAr: 'مشروع حقيقي III: تقرير المستودع',
    description: 'Analyse film availability, inventory gaps, and stock distribution across stores.',
    descriptionAr: 'تحليل توفر الأفلام وثغرات المستودع وتوزيع المخزون عبر المتاجر.',
    example: `-- Inventory health check per store
SELECT
  i.store_id,
  COUNT(DISTINCT i.film_id)   AS unique_films,
  COUNT(i.inventory_id)       AS total_copies,
  ROUND(CAST(COUNT(i.inventory_id) AS REAL)
        / COUNT(DISTINCT i.film_id), 1) AS avg_copies_per_film
FROM inventory i
GROUP BY i.store_id;`,
    content: `## Real-World Project III: Inventory Report

## Module 1: Inventory Health per Store

\`\`\`sql
SELECT
  i.store_id,
  COUNT(DISTINCT i.film_id) AS unique_films,
  COUNT(i.inventory_id)     AS total_copies,
  ROUND(CAST(COUNT(i.inventory_id) AS REAL)
        / COUNT(DISTINCT i.film_id), 1) AS avg_copies_per_film
FROM inventory i
GROUP BY i.store_id;
\`\`\`

## Module 2: Films Currently Rented Out (Unavailable)

\`\`\`sql
SELECT
  f.title,
  COUNT(r.rental_id) AS copies_out
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
GROUP BY f.film_id, f.title
ORDER BY copies_out DESC
LIMIT 15;
\`\`\`

## Module 3: Films with Low Stock

\`\`\`sql
SELECT
  f.title,
  COUNT(i.inventory_id) AS total_copies,
  COUNT(CASE WHEN r.return_date IS NULL THEN 1 END) AS rented_out,
  COUNT(i.inventory_id)
    - COUNT(CASE WHEN r.return_date IS NULL THEN 1 END) AS available
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id, f.title
HAVING available < 2
ORDER BY available, f.title
LIMIT 15;
\`\`\`

## Module 4: Films in One Store but Not the Other

\`\`\`sql
SELECT film_id FROM inventory WHERE store_id = 1
EXCEPT
SELECT film_id FROM inventory WHERE store_id = 2
ORDER BY film_id
LIMIT 15;
\`\`\`
`,
    contentAr: `## مشروع حقيقي III: تقرير المستودع

## الوحدة 1: صحة المستودع لكل متجر

\`\`\`sql
SELECT
  i.store_id,
  COUNT(DISTINCT i.film_id) AS unique_films,
  COUNT(i.inventory_id)     AS total_copies
FROM inventory i
GROUP BY i.store_id;
\`\`\`

## الوحدة 2: الأفلام المستأجرة حاليًا (غير متوفرة)

\`\`\`sql
SELECT
  f.title,
  COUNT(r.rental_id) AS copies_out
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
GROUP BY f.film_id, f.title
ORDER BY copies_out DESC
LIMIT 15;
\`\`\`

## الوحدة 3: الأفلام ذات المخزون المنخفض

\`\`\`sql
SELECT
  f.title,
  COUNT(i.inventory_id) AS total_copies,
  COUNT(CASE WHEN r.return_date IS NULL THEN 1 END) AS rented_out,
  COUNT(i.inventory_id)
    - COUNT(CASE WHEN r.return_date IS NULL THEN 1 END) AS available
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id, f.title
HAVING available < 2
ORDER BY available, f.title
LIMIT 15;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Show films currently rented out (return_date IS NULL): film title, how many copies are currently out (copies_rented). Order by copies_rented DESC, limit 10.",
        questionAr: "اعرض الأفلام المستأجرة حاليًا (return_date IS NULL): عنوان الفيلم وعدد النسخ المستأجرة. رتّب تنازليًا، حدّد بـ 10.",
        hint: "WHERE r.return_date IS NULL, GROUP BY film_id",
        hintAr: "WHERE r.return_date IS NULL، GROUP BY film_id",
        expectedQuery: "SELECT f.title, COUNT(r.rental_id) AS copies_rented FROM rental r JOIN inventory i ON r.inventory_id = i.inventory_id JOIN film f ON i.film_id = f.film_id WHERE r.return_date IS NULL GROUP BY f.film_id, f.title ORDER BY copies_rented DESC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /return_date\s+IS\s+NULL/i.test(q) && /inventory/i.test(q),
      },
      {
        id: 2,
        question: "Find films with less than 3 total copies across all stores. Show title and copy_count. Use GROUP BY film_id HAVING count < 3. Order by copy_count, title.",
        questionAr: "ابحث عن الأفلام التي تضم أقل من 3 نسخ إجمالية عبر جميع المتاجر. اعرض العنوان وعدد النسخ. استخدم GROUP BY film_id HAVING count < 3. رتّب حسب العدد والعنوان.",
        hint: "SELECT f.title, COUNT(i.inventory_id) AS copy_count FROM film f JOIN inventory i ON ... GROUP BY f.film_id HAVING copy_count < 3",
        hintAr: "SELECT f.title, COUNT(i.inventory_id) AS copy_count FROM film f JOIN inventory i ON ... GROUP BY f.film_id HAVING copy_count < 3",
        expectedQuery: "SELECT f.title, COUNT(i.inventory_id) AS copy_count FROM film f JOIN inventory i ON f.film_id = i.film_id GROUP BY f.film_id, f.title HAVING copy_count < 3 ORDER BY copy_count, f.title",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /HAVING/i.test(q) && /inventory/i.test(q) && /< 3/i.test(q),
      },
    ],
  },

  {
    id: 159,
    title: 'Real-World Project IV: Staff Performance',
    titleAr: 'مشروع حقيقي IV: أداء الموظفين',
    description: 'Analyse staff rental volumes, revenue contribution, and late-return rates.',
    descriptionAr: 'تحليل أحجام إيجارات الموظفين ومساهماتهم في الإيرادات ومعدلات التأخر.',
    example: `-- Staff performance overview
SELECT
  s.staff_id,
  s.first_name || ' ' || s.last_name  AS staff_member,
  s.store_id,
  COUNT(r.rental_id)                  AS total_rentals,
  ROUND(SUM(p.amount), 2)             AS revenue_handled,
  ROUND(AVG(p.amount), 2)             AS avg_transaction,
  COUNT(DISTINCT r.customer_id)       AS unique_customers
FROM staff s
JOIN rental  r ON s.staff_id     = r.staff_id
JOIN payment p ON r.rental_id    = p.rental_id
GROUP BY s.staff_id
ORDER BY revenue_handled DESC;`,
    content: `## Real-World Project IV: Staff Performance

## Module 1: Revenue Handled per Staff Member

\`\`\`sql
SELECT
  s.first_name || ' ' || s.last_name AS staff_member,
  COUNT(r.rental_id)                 AS rentals_processed,
  ROUND(SUM(p.amount), 2)            AS revenue_handled,
  COUNT(DISTINCT r.customer_id)      AS unique_customers_served
FROM staff s
JOIN rental r  ON s.staff_id = r.staff_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY s.staff_id
ORDER BY revenue_handled DESC;
\`\`\`

## Module 2: Monthly Trend per Staff Member

\`\`\`sql
SELECT
  s.first_name || ' ' || s.last_name  AS staff_member,
  strftime('%Y-%m', p.payment_date)   AS month,
  ROUND(SUM(p.amount), 2)             AS monthly_revenue
FROM staff s
JOIN rental r  ON s.staff_id = r.staff_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY s.staff_id, month
ORDER BY staff_member, month;
\`\`\`

## Module 3: Late Returns Processed per Staff

\`\`\`sql
SELECT
  s.first_name || ' ' || s.last_name AS staff_member,
  COUNT(*) AS late_returns_processed
FROM rental r
JOIN staff s ON r.staff_id = s.staff_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NOT NULL
  AND (julianday(r.return_date) - julianday(r.rental_date)) > f.rental_duration
GROUP BY s.staff_id
ORDER BY late_returns_processed DESC;
\`\`\`
`,
    contentAr: `## مشروع حقيقي IV: أداء الموظفين

## الوحدة 1: الإيرادات المُعالَجة لكل موظف

\`\`\`sql
SELECT
  s.first_name || ' ' || s.last_name AS staff_member,
  COUNT(r.rental_id)                 AS rentals_processed,
  ROUND(SUM(p.amount), 2)            AS revenue_handled,
  COUNT(DISTINCT r.customer_id)      AS unique_customers_served
FROM staff s
JOIN rental r  ON s.staff_id = r.staff_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY s.staff_id
ORDER BY revenue_handled DESC;
\`\`\`

## الوحدة 2: الاتجاه الشهري لكل موظف

\`\`\`sql
SELECT
  s.first_name || ' ' || s.last_name  AS staff_member,
  strftime('%Y-%m', p.payment_date)   AS month,
  ROUND(SUM(p.amount), 2)             AS monthly_revenue
FROM staff s
JOIN rental r  ON s.staff_id = r.staff_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY s.staff_id, month
ORDER BY staff_member, month;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Build the staff performance summary: staff_member name, rentals_processed, revenue_handled (rounded 2), avg_transaction (rounded 2). Order by revenue_handled DESC.",
        questionAr: "ابنِ ملخص أداء الموظفين: اسم الموظف وعدد الإيجارات المُعالَجة وإجمالي الإيرادات (مقرَّب 2) ومتوسط المعاملة (مقرَّب 2). رتّب تنازليًا.",
        hint: "JOIN staff → rental → payment, GROUP BY staff_id",
        hintAr: "اربط staff → rental → payment، GROUP BY staff_id",
        expectedQuery: "SELECT s.first_name || ' ' || s.last_name AS staff_member, COUNT(r.rental_id) AS rentals_processed, ROUND(SUM(p.amount), 2) AS revenue_handled, ROUND(AVG(p.amount), 2) AS avg_transaction FROM staff s JOIN rental r ON s.staff_id = r.staff_id JOIN payment p ON r.rental_id = p.rental_id GROUP BY s.staff_id ORDER BY revenue_handled DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /staff/i.test(q) && /SUM.*amount/i.test(q) && /rental/i.test(q),
      },
      {
        id: 2,
        question: "Show monthly revenue per staff member: staff name, month (strftime '%Y-%m'), monthly_revenue (rounded 2). Order by staff name, month.",
        questionAr: "اعرض الإيرادات الشهرية لكل موظف: اسم الموظف والشهر (strftime '%Y-%m') والإيرادات الشهرية (مقرَّبة 2). رتّب حسب اسم الموظف ثم الشهر.",
        hint: "GROUP BY s.staff_id, strftime('%Y-%m', payment_date)",
        hintAr: "GROUP BY s.staff_id, strftime('%Y-%m', payment_date)",
        expectedQuery: "SELECT s.first_name || ' ' || s.last_name AS staff_member, strftime('%Y-%m', p.payment_date) AS month, ROUND(SUM(p.amount), 2) AS monthly_revenue FROM staff s JOIN rental r ON s.staff_id = r.staff_id JOIN payment p ON r.rental_id = p.rental_id GROUP BY s.staff_id, month ORDER BY staff_member, month",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /strftime/i.test(q) && /staff/i.test(q) && /month/i.test(q),
      },
    ],
  },

  {
    id: 160,
    title: 'Capstone: Full Business Dashboard',
    titleAr: 'المشروع الختامي: لوحة بيانات الأعمال الكاملة',
    description: 'Combine everything into a single comprehensive business intelligence report.',
    descriptionAr: 'الجمع بين كل شيء في تقرير استخباراتي تجاري شامل واحد.',
    example: `-- Executive KPI Summary
WITH
  revenue_kpis AS (
    SELECT
      ROUND(SUM(amount), 2)     AS total_revenue,
      COUNT(*)                  AS total_payments,
      ROUND(AVG(amount), 2)     AS avg_payment,
      COUNT(DISTINCT customer_id) AS paying_customers
    FROM payment
  ),
  rental_kpis AS (
    SELECT
      COUNT(*)                         AS total_rentals,
      COUNT(CASE WHEN return_date IS NULL THEN 1 END) AS still_out,
      ROUND(100.0 * COUNT(CASE WHEN return_date IS NULL THEN 1 END)
            / COUNT(*), 1)             AS pct_out
    FROM rental
  )
SELECT
  r.total_revenue,
  r.total_payments,
  r.avg_payment,
  r.paying_customers,
  rk.total_rentals,
  rk.still_out,
  rk.pct_out
FROM revenue_kpis r, rental_kpis rk;`,
    content: `## Capstone: Full Business Dashboard

This capstone combines CTEs, window functions, aggregation, JOINs, and CASE WHEN into one comprehensive report.

## Section 1: Executive KPIs

\`\`\`sql
WITH revenue AS (
  SELECT ROUND(SUM(amount), 2) AS total, COUNT(*) AS txns,
         ROUND(AVG(amount), 2) AS avg_txn
  FROM payment
),
rentals AS (
  SELECT COUNT(*) AS total,
         COUNT(return_date) AS returned,
         COUNT(*) - COUNT(return_date) AS outstanding
  FROM rental
)
SELECT r.total AS total_revenue, r.txns, r.avg_txn,
       rn.total AS total_rentals, rn.outstanding
FROM revenue r, rentals rn;
\`\`\`

## Section 2: Top 5 Everything

\`\`\`sql
-- Top 5 films, customers, categories, staff — each in one query
SELECT 'film'     AS entity_type, f.title     AS name, ROUND(SUM(p.amount), 2) AS revenue
FROM film f JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id JOIN payment p ON r.rental_id = p.rental_id
GROUP BY f.film_id ORDER BY revenue DESC LIMIT 5;
\`\`\`

## Section 3: Month-over-Month Growth

\`\`\`sql
WITH monthly AS (
  SELECT strftime('%Y-%m', payment_date) AS month, SUM(amount) AS rev
  FROM payment GROUP BY month
)
SELECT
  month, ROUND(rev, 2) AS revenue,
  ROUND(rev - LAG(rev) OVER (ORDER BY month), 2) AS mom_change,
  ROUND(100.0 * (rev - LAG(rev) OVER (ORDER BY month))
        / LAG(rev) OVER (ORDER BY month), 1) AS mom_pct
FROM monthly ORDER BY month;
\`\`\`

## Section 4: Customer Health Score

\`\`\`sql
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  COUNT(r.rental_id) AS rentals,
  ROUND(SUM(p.amount), 2) AS revenue,
  NTILE(4) OVER (ORDER BY SUM(p.amount)) AS revenue_quartile,
  NTILE(4) OVER (ORDER BY COUNT(r.rental_id)) AS frequency_quartile,
  CASE
    WHEN NTILE(4) OVER (ORDER BY SUM(p.amount)) = 4
     AND NTILE(4) OVER (ORDER BY COUNT(r.rental_id)) = 4
    THEN 'Champion'
    WHEN NTILE(4) OVER (ORDER BY SUM(p.amount)) >= 3 THEN 'Loyal'
    WHEN NTILE(4) OVER (ORDER BY COUNT(r.rental_id)) >= 3 THEN 'Frequent'
    ELSE 'Occasional'
  END AS customer_type
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY c.customer_id
ORDER BY revenue DESC
LIMIT 20;
\`\`\`
`,
    contentAr: `## المشروع الختامي: لوحة بيانات الأعمال الكاملة

يجمع هذا المشروع الختامي CTEs ودوال النوافذ والتجميع وJOINs وCASE WHEN في تقرير شامل واحد.

## القسم 1: المؤشرات التنفيذية الرئيسية (KPIs)

\`\`\`sql
WITH revenue AS (
  SELECT ROUND(SUM(amount), 2) AS total, COUNT(*) AS txns,
         ROUND(AVG(amount), 2) AS avg_txn
  FROM payment
),
rentals AS (
  SELECT COUNT(*) AS total,
         COUNT(return_date) AS returned,
         COUNT(*) - COUNT(return_date) AS outstanding
  FROM rental
)
SELECT r.total AS total_revenue, r.txns, r.avg_txn,
       rn.total AS total_rentals, rn.outstanding
FROM revenue r, rentals rn;
\`\`\`

## القسم 2: النمو شهرًا بشهر (MoM)

\`\`\`sql
WITH monthly AS (
  SELECT strftime('%Y-%m', payment_date) AS month, SUM(amount) AS rev
  FROM payment GROUP BY month
)
SELECT
  month, ROUND(rev, 2) AS revenue,
  ROUND(rev - LAG(rev) OVER (ORDER BY month), 2) AS mom_change,
  ROUND(100.0 * (rev - LAG(rev) OVER (ORDER BY month))
        / LAG(rev) OVER (ORDER BY month), 1) AS mom_pct
FROM monthly ORDER BY month;
\`\`\`

## القسم 3: درجة صحة العملاء

\`\`\`sql
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  COUNT(r.rental_id) AS rentals,
  ROUND(SUM(p.amount), 2) AS revenue,
  NTILE(4) OVER (ORDER BY SUM(p.amount)) AS revenue_quartile,
  CASE
    WHEN NTILE(4) OVER (ORDER BY SUM(p.amount)) = 4
     AND NTILE(4) OVER (ORDER BY COUNT(r.rental_id)) = 4
    THEN 'Champion'
    WHEN NTILE(4) OVER (ORDER BY SUM(p.amount)) >= 3 THEN 'Loyal'
    ELSE 'Occasional'
  END AS customer_type
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY c.customer_id
ORDER BY revenue DESC
LIMIT 20;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Build the Executive KPI summary using two CTEs: 'revenue_kpis' (total revenue, payment count, avg payment, distinct customers) and 'rental_kpis' (total rentals, returned count, still_out count). Final SELECT combines both.",
        questionAr: "ابنِ ملخص المؤشرات التنفيذية باستخدام CTE-ين: 'revenue_kpis' (إجمالي الإيرادات وعدد الدفعات ومتوسط الدفعة والعملاء الفريدين) و'rental_kpis' (إجمالي الإيجارات والمُعادة والخارجة). الاختيار النهائي يجمع الاثنين.",
        hint: "WITH revenue_kpis AS (SELECT ROUND(SUM(amount),2) ... FROM payment), rental_kpis AS (SELECT COUNT(*) ... FROM rental) SELECT ... FROM revenue_kpis, rental_kpis",
        hintAr: "WITH revenue_kpis AS (...FROM payment), rental_kpis AS (...FROM rental) SELECT ... FROM revenue_kpis, rental_kpis",
        expectedQuery: "WITH revenue_kpis AS (SELECT ROUND(SUM(amount),2) AS total_revenue, COUNT(*) AS payment_count, ROUND(AVG(amount),2) AS avg_payment, COUNT(DISTINCT customer_id) AS distinct_customers FROM payment), rental_kpis AS (SELECT COUNT(*) AS total_rentals, COUNT(return_date) AS returned, COUNT(*) - COUNT(return_date) AS still_out FROM rental) SELECT r.total_revenue, r.payment_count, r.avg_payment, r.distinct_customers, rk.total_rentals, rk.returned, rk.still_out FROM revenue_kpis r, rental_kpis rk",
        checkFunction: (result: unknown[], q = '') =>
          result.length === 1 && /WITH/i.test(q) && /revenue_kpis/i.test(q) && /rental_kpis/i.test(q),
      },
      {
        id: 2,
        question: "Build the Month-over-Month growth report: month, revenue, mom_change (current - previous month using LAG), and mom_pct (percentage change rounded to 1 decimal). Use a CTE for monthly totals.",
        questionAr: "ابنِ تقرير النمو شهرًا بشهر: month وrevenue وmom_change (الحالي - السابق بـ LAG) وmom_pct (نسبة التغيير مقرَّبة لمنزلة عشرية). استخدم CTE للإجماليات الشهرية.",
        hint: "WITH monthly AS (SELECT strftime('%Y-%m',...) AS month, SUM(amount) AS rev FROM payment GROUP BY month) SELECT month, ROUND(rev,2), ROUND(rev - LAG(rev) OVER (ORDER BY month), 2) AS mom_change ...",
        hintAr: "WITH monthly AS (...) SELECT month, ROUND(rev,2), ROUND(rev - LAG(rev) OVER (ORDER BY month), 2) AS mom_change, ROUND(100.0 * ..., 1) AS mom_pct ...",
        expectedQuery: "WITH monthly AS (SELECT strftime('%Y-%m', payment_date) AS month, SUM(amount) AS rev FROM payment GROUP BY month) SELECT month, ROUND(rev, 2) AS revenue, ROUND(rev - LAG(rev) OVER (ORDER BY month), 2) AS mom_change, ROUND(100.0 * (rev - LAG(rev) OVER (ORDER BY month)) / LAG(rev) OVER (ORDER BY month), 1) AS mom_pct FROM monthly ORDER BY month",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LAG/i.test(q) && /strftime/i.test(q) && /mom/i.test(q),
      },
    ],
  },
];
