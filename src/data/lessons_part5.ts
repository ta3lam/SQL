import { Lesson } from '../types';

export const lessonsP5: Lesson[] = [

  // ════════════════════════════════════════════════════
  //  LEVEL 11 — DATA FUNCTIONS
  // ════════════════════════════════════════════════════

  {
    id: 45,
    title: 'String Functions I — UPPER, LOWER, TRIM, LENGTH',
    titleAr: 'دوال النصوص I — UPPER وLOWER وTRIM وLENGTH',
    description: 'Clean, standardise, and measure text values using SQLite built-in string functions.',
    descriptionAr: 'نظّف النصوص وقِس طولها باستخدام دوال النصوص المدمجة في SQLite.',
    content: `
## String Functions in SQL

String functions let you clean, transform, and analyse text directly inside a query — no application code needed.

---

## UPPER / LOWER — Change Case

\`\`\`sql
-- Standardise employee names to uppercase
SELECT UPPER(name) AS name_upper,
       LOWER(email) AS email_lower
FROM employees
LIMIT 10;
\`\`\`

Useful for **case-insensitive comparisons**:

\`\`\`sql
-- Find employees regardless of how name was entered
SELECT * FROM employees
WHERE LOWER(name) LIKE '%ali%';
\`\`\`

---

## LENGTH — Count Characters

\`\`\`sql
-- Find employees with long job titles
SELECT name, job_title, LENGTH(job_title) AS title_len
FROM employees
ORDER BY title_len DESC
LIMIT 10;
\`\`\`

---

## TRIM / LTRIM / RTRIM — Remove Whitespace

\`\`\`sql
-- Remove leading/trailing spaces (common in imported data)
SELECT TRIM('  hello world  ') AS cleaned;   -- 'hello world'
SELECT LTRIM('  hello')        AS left_trim; -- 'hello'
SELECT RTRIM('hello  ')        AS right_trim;-- 'hello'
\`\`\`

\`\`\`sql
-- Apply to real data
SELECT name, TRIM(name) AS cleaned_name
FROM employees
WHERE LENGTH(name) <> LENGTH(TRIM(name)); -- rows with hidden spaces
\`\`\`

---

## Combining Functions

\`\`\`sql
-- Clean and standardise in one query
SELECT
  TRIM(UPPER(name))  AS name,
  TRIM(LOWER(email)) AS email,
  LENGTH(TRIM(name)) AS name_length
FROM employees
ORDER BY name_length DESC;
\`\`\`

---

## Quick Reference

| Function | Example | Result |
|---|---|---|
| \`UPPER(s)\` | \`UPPER('hello')\` | \`'HELLO'\` |
| \`LOWER(s)\` | \`LOWER('HELLO')\` | \`'hello'\` |
| \`LENGTH(s)\` | \`LENGTH('hi')\` | \`2\` |
| \`TRIM(s)\` | \`TRIM(' hi ')\` | \`'hi'\` |
| \`LTRIM(s)\` | \`LTRIM(' hi')\` | \`'hi'\` |
| \`RTRIM(s)\` | \`RTRIM('hi ')\` | \`'hi'\` |
    `,
    contentAr: `
## دوال النصوص في SQL

تتيح دوال النصوص تنظيف النصوص وتحويلها وتحليلها مباشرةً داخل الاستعلام — دون الحاجة لكود تطبيق.

---

## UPPER / LOWER — تغيير حالة الأحرف

\`\`\`sql
-- تحويل أسماء الموظفين إلى أحرف كبيرة
SELECT UPPER(name) AS name_upper,
       LOWER(email) AS email_lower
FROM employees
LIMIT 10;
\`\`\`

مفيد للـ **مقارنات غير حساسة لحالة الأحرف**:

\`\`\`sql
-- البحث عن موظفين بصرف النظر عن كيفية كتابة الاسم
SELECT * FROM employees
WHERE LOWER(name) LIKE '%ali%';
\`\`\`

---

## LENGTH — عدّ الأحرف

\`\`\`sql
-- إيجاد الموظفين ذوي المسمى الوظيفي الطويل
SELECT name, job_title, LENGTH(job_title) AS title_len
FROM employees
ORDER BY title_len DESC
LIMIT 10;
\`\`\`

---

## TRIM / LTRIM / RTRIM — إزالة المسافات

\`\`\`sql
-- إزالة المسافات البادئة والتالية (شائع في البيانات المستوردة)
SELECT TRIM('  hello world  ') AS cleaned;   -- 'hello world'
SELECT LTRIM('  hello')        AS left_trim; -- 'hello'
SELECT RTRIM('hello  ')        AS right_trim;-- 'hello'
\`\`\`

---

## دمج الدوال

\`\`\`sql
-- تنظيف وتوحيد في استعلام واحد
SELECT
  TRIM(UPPER(name))  AS name,
  TRIM(LOWER(email)) AS email,
  LENGTH(TRIM(name)) AS name_length
FROM employees
ORDER BY name_length DESC;
\`\`\`

---

## مرجع سريع

| الدالة | مثال | النتيجة |
|---|---|---|
| \`UPPER(s)\` | \`UPPER('hello')\` | \`'HELLO'\` |
| \`LOWER(s)\` | \`LOWER('HELLO')\` | \`'hello'\` |
| \`LENGTH(s)\` | \`LENGTH('hi')\` | \`2\` |
| \`TRIM(s)\` | \`TRIM(' hi ')\` | \`'hi'\` |
    `,
    example: `SELECT
  name,
  UPPER(name)       AS name_upper,
  LOWER(email)      AS email_lower,
  LENGTH(job_title) AS title_length
FROM employees
ORDER BY title_length DESC
LIMIT 10;`,
    exercises: [
      {
        id: 1,
        question: "List all employees whose name length (after trimming) is greater than 12 characters. Show name and name_length, ordered by name_length DESC.",
        questionAr: "أدرج جميع الموظفين الذين يتجاوز طول اسمهم (بعد TRIM) 12 حرفاً. أظهر name وname_length، مرتباً حسب name_length DESC.",
        hint: "SELECT name, LENGTH(TRIM(name)) AS name_length FROM employees WHERE LENGTH(TRIM(name)) > 12 ORDER BY name_length DESC",
        hintAr: "SELECT name, LENGTH(TRIM(name)) AS name_length FROM employees WHERE LENGTH(TRIM(name)) > 12 ORDER BY name_length DESC",
        expectedQuery: "SELECT name, LENGTH(TRIM(name)) AS name_length FROM employees WHERE LENGTH(TRIM(name)) > 12 ORDER BY name_length DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LENGTH/i.test(q) && /TRIM/i.test(q),
      },
      {
        id: 2,
        question: "Show each customer's name in UPPER case and their city in LOWER case. Alias them as name_upper and city_lower. Order by name_upper.",
        questionAr: "أظهر اسم كل عميل بأحرف كبيرة ومدينته بأحرف صغيرة. سمّهما name_upper وcity_lower. رتّب حسب name_upper.",
        hint: "SELECT UPPER(name) AS name_upper, LOWER(city) AS city_lower FROM customers ORDER BY name_upper",
        hintAr: "SELECT UPPER(name) AS name_upper, LOWER(city) AS city_lower FROM customers ORDER BY name_upper",
        expectedQuery: "SELECT UPPER(name) AS name_upper, LOWER(city) AS city_lower FROM customers ORDER BY name_upper",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /UPPER/i.test(q) && /LOWER/i.test(q),
      },
    ],
  },

  {
    id: 46,
    title: 'String Functions II — SUBSTR, REPLACE, INSTR, ||',
    titleAr: 'دوال النصوص II — SUBSTR وREPLACE وINSTR والتسلسل ||',
    description: 'Extract substrings, find text positions, replace content, and concatenate strings.',
    descriptionAr: 'استخرج أجزاء من النصوص وابحث عن مواضعها واستبدل محتواها وادمج النصوص.',
    content: `
## Extracting & Manipulating Text

---

## || — Concatenation

Join strings together with the \`||\` operator:

\`\`\`sql
-- Build a full label: "Alice (Engineer)"
SELECT name || ' (' || job_title || ')' AS label
FROM employees
LIMIT 10;
\`\`\`

\`\`\`sql
-- Full address from customers table
SELECT name || ', ' || city || ', ' || country AS full_address
FROM customers;
\`\`\`

---

## SUBSTR — Extract Part of a String

\`SUBSTR(string, start, length)\` — starts at position 1:

\`\`\`sql
-- First 3 characters of each name
SELECT name, SUBSTR(name, 1, 3) AS initials
FROM employees;
\`\`\`

\`\`\`sql
-- Extract year from hire_date (format: YYYY-MM-DD)
SELECT name, hire_date, SUBSTR(hire_date, 1, 4) AS hire_year
FROM employees;
\`\`\`

---

## INSTR — Find Position of a Substring

\`INSTR(string, substring)\` returns the position (0 if not found):

\`\`\`sql
-- Find employees whose email contains 'gmail'
SELECT name, email, INSTR(email, 'gmail') AS gmail_pos
FROM employees
WHERE INSTR(email, 'gmail') > 0;
\`\`\`

\`\`\`sql
-- Extract domain from email using INSTR + SUBSTR
SELECT
  email,
  SUBSTR(email, INSTR(email, '@') + 1) AS domain
FROM employees
WHERE email IS NOT NULL;
\`\`\`

---

## REPLACE — Substitute Text

\`REPLACE(string, old, new)\`:

\`\`\`sql
-- Mask email domains
SELECT name, REPLACE(email, SUBSTR(email, INSTR(email, '@')), '@***.com') AS masked_email
FROM employees
WHERE email IS NOT NULL
LIMIT 10;
\`\`\`

\`\`\`sql
-- Standardise phone format
SELECT phone, REPLACE(REPLACE(phone, '-', ''), ' ', '') AS clean_phone
FROM customers
WHERE phone IS NOT NULL;
\`\`\`

---

## Quick Reference

| Function | Purpose |
|---|---|
| \`a \|\| b\` | Concatenate a and b |
| \`SUBSTR(s, pos, len)\` | Extract substring |
| \`INSTR(s, sub)\` | Position of sub in s (0 = not found) |
| \`REPLACE(s, old, new)\` | Replace all occurrences |
    `,
    contentAr: `
## استخراج النصوص والتعامل معها

---

## || — التسلسل (الدمج)

ادمج النصوص معاً باستخدام عامل \`||\`:

\`\`\`sql
-- بناء تسمية كاملة: "أحمد (مهندس)"
SELECT name || ' (' || job_title || ')' AS label
FROM employees
LIMIT 10;
\`\`\`

---

## SUBSTR — استخراج جزء من النص

\`SUBSTR(string, start, length)\` — يبدأ من الموضع 1:

\`\`\`sql
-- أول 3 أحرف من كل اسم
SELECT name, SUBSTR(name, 1, 3) AS initials
FROM employees;
\`\`\`

\`\`\`sql
-- استخراج السنة من hire_date (التنسيق: YYYY-MM-DD)
SELECT name, hire_date, SUBSTR(hire_date, 1, 4) AS hire_year
FROM employees;
\`\`\`

---

## INSTR — إيجاد موضع نص فرعي

\`INSTR(string, substring)\` تُعيد الموضع (0 إذا لم يُوجد):

\`\`\`sql
-- إيجاد الموظفين الذين بريدهم يحتوي على 'gmail'
SELECT name, email, INSTR(email, 'gmail') AS gmail_pos
FROM employees
WHERE INSTR(email, 'gmail') > 0;
\`\`\`

\`\`\`sql
-- استخراج النطاق من البريد الإلكتروني
SELECT
  email,
  SUBSTR(email, INSTR(email, '@') + 1) AS domain
FROM employees
WHERE email IS NOT NULL;
\`\`\`

---

## REPLACE — استبدال النص

\`REPLACE(string, old, new)\`:

\`\`\`sql
-- تنظيف صيغة رقم الهاتف
SELECT phone, REPLACE(REPLACE(phone, '-', ''), ' ', '') AS clean_phone
FROM customers
WHERE phone IS NOT NULL;
\`\`\`

---

## مرجع سريع

| الدالة | الغرض |
|---|---|
| \`a \|\| b\` | دمج a وb |
| \`SUBSTR(s, pos, len)\` | استخراج جزء من النص |
| \`INSTR(s, sub)\` | موضع sub في s (0 = غير موجود) |
| \`REPLACE(s, old, new)\` | استبدال جميع التكرارات |
    `,
    example: `-- Build full label and extract email domain
SELECT
  name || ' (' || job_title || ')' AS label,
  SUBSTR(hire_date, 1, 4)          AS hire_year,
  SUBSTR(email, INSTR(email, '@') + 1) AS domain
FROM employees
WHERE email IS NOT NULL
LIMIT 10;`,
    exercises: [
      {
        id: 1,
        question: "For each employee with an email, extract the domain (everything after '@'). Show name, email, and domain. Order by domain.",
        questionAr: "لكل موظف لديه بريد إلكتروني، استخرج النطاق (كل شيء بعد '@'). أظهر name وemail وdomain. رتّب حسب domain.",
        hint: "SUBSTR(email, INSTR(email, '@') + 1) AS domain",
        hintAr: "SUBSTR(email, INSTR(email, '@') + 1) AS domain",
        expectedQuery: "SELECT name, email, SUBSTR(email, INSTR(email, '@') + 1) AS domain FROM employees WHERE email IS NOT NULL ORDER BY domain",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SUBSTR/i.test(q) && /INSTR/i.test(q),
      },
      {
        id: 2,
        question: "Build a full contact string for each customer as: 'Name — City, Country'. Alias it as contact_info. Order alphabetically.",
        questionAr: "أنشئ نصاً كاملاً لكل عميل بالصيغة: 'الاسم — المدينة، الدولة'. سمّه contact_info. رتّب أبجدياً.",
        hint: "SELECT name || ' — ' || city || ', ' || country AS contact_info FROM customers ORDER BY contact_info",
        hintAr: "SELECT name || ' — ' || city || ', ' || country AS contact_info FROM customers ORDER BY contact_info",
        expectedQuery: "SELECT name || ' — ' || city || ', ' || country AS contact_info FROM customers ORDER BY contact_info",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /\|\|/i.test(q) && /contact_info/i.test(q),
      },
    ],
  },

  {
    id: 47,
    title: 'Math & Numeric Functions',
    titleAr: 'الدوال الرياضية والعددية',
    description: 'Use ROUND, ABS, MIN, MAX, and arithmetic expressions to compute and format numeric results.',
    descriptionAr: 'استخدم ROUND وABS والتعبيرات الحسابية لحساب النتائج العددية وتنسيقها.',
    content: `
## Numeric Functions in SQLite

---

## ROUND — Control Decimal Places

\`ROUND(value, decimals)\`:

\`\`\`sql
-- Round salaries to nearest hundred
SELECT name, salary, ROUND(salary, -2) AS rounded_salary
FROM employees;
\`\`\`

\`\`\`sql
-- Revenue per order item
SELECT
  order_id,
  ROUND(quantity * unit_price, 2) AS line_total
FROM order_items
LIMIT 10;
\`\`\`

---

## ABS — Absolute Value

\`\`\`sql
-- Salary deviation from department average
SELECT
  e.name,
  e.salary,
  ROUND(AVG(e2.salary), 0) AS dept_avg,
  ABS(e.salary - AVG(e2.salary)) AS deviation
FROM employees e
JOIN employees e2 ON e.department_id = e2.department_id
GROUP BY e.id, e.name, e.salary;
\`\`\`

---

## Arithmetic in SELECT

SQL supports full arithmetic: \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (modulo):

\`\`\`sql
-- Annual salary and estimated monthly tax (25%)
SELECT
  name,
  salary                          AS monthly_salary,
  ROUND(salary * 12, 0)           AS annual_salary,
  ROUND(salary * 0.25, 2)         AS monthly_tax,
  ROUND(salary * 12 * 0.25, 2)    AS annual_tax,
  ROUND(salary * 0.75, 2)         AS take_home
FROM employees
ORDER BY salary DESC;
\`\`\`

---

## MAX / MIN as Scalar (in SELECT)

Used in subqueries to get a single value:

\`\`\`sql
-- How far is each salary from the company maximum?
SELECT
  name,
  salary,
  (SELECT MAX(salary) FROM employees) AS max_salary,
  ROUND((SELECT MAX(salary) FROM employees) - salary, 0) AS gap
FROM employees
ORDER BY gap;
\`\`\`

---

## Integer Division and Modulo

\`\`\`sql
-- Classify order quantities: bulk (>=10) or single
SELECT
  product_id,
  quantity,
  quantity / 10   AS tens,
  quantity % 10   AS remainder
FROM order_items
LIMIT 10;
\`\`\`
    `,
    contentAr: `
## الدوال العددية في SQLite

---

## ROUND — التحكم في المنازل العشرية

\`ROUND(value, decimals)\`:

\`\`\`sql
-- تقريب الرواتب إلى أقرب مئة
SELECT name, salary, ROUND(salary, -2) AS rounded_salary
FROM employees;
\`\`\`

---

## ABS — القيمة المطلقة

\`\`\`sql
-- انحراف الراتب عن متوسط القسم
SELECT
  e.name,
  e.salary,
  ROUND(AVG(e2.salary), 0) AS dept_avg,
  ABS(e.salary - AVG(e2.salary)) AS deviation
FROM employees e
JOIN employees e2 ON e.department_id = e2.department_id
GROUP BY e.id, e.name, e.salary;
\`\`\`

---

## العمليات الحسابية في SELECT

SQL يدعم العمليات الكاملة: \`+\`، \`-\`، \`*\`، \`/\`، \`%\` (باقي القسمة):

\`\`\`sql
-- الراتب السنوي والضريبة الشهرية التقديرية (25%)
SELECT
  name,
  salary                          AS monthly_salary,
  ROUND(salary * 12, 0)           AS annual_salary,
  ROUND(salary * 0.25, 2)         AS monthly_tax,
  ROUND(salary * 0.75, 2)         AS take_home
FROM employees
ORDER BY salary DESC;
\`\`\`

---

## MAX / MIN كقيمة مفردة (في استعلام فرعي)

\`\`\`sql
-- كم يبعد كل راتب عن الحد الأقصى في الشركة؟
SELECT
  name,
  salary,
  (SELECT MAX(salary) FROM employees) AS max_salary,
  ROUND((SELECT MAX(salary) FROM employees) - salary, 0) AS gap
FROM employees
ORDER BY gap;
\`\`\`
    `,
    example: `SELECT
  name,
  salary,
  ROUND(salary * 12, 0)        AS annual_salary,
  ROUND(salary * 0.25, 2)      AS monthly_tax,
  ROUND(salary * 0.75, 2)      AS take_home
FROM employees
ORDER BY salary DESC;`,
    exercises: [
      {
        id: 1,
        question: "For each order, calculate the total value (SUM of quantity * unit_price), rounded to 2 decimal places. Show order_id and order_total, ordered by order_total DESC.",
        questionAr: "لكل طلب، احسب القيمة الإجمالية (مجموع quantity * unit_price)، مقرّباً لخانتين عشريتين. أظهر order_id وorder_total، مرتباً حسب order_total DESC.",
        hint: "SELECT order_id, ROUND(SUM(quantity * unit_price), 2) AS order_total FROM order_items GROUP BY order_id ORDER BY order_total DESC",
        hintAr: "SELECT order_id, ROUND(SUM(quantity * unit_price), 2) AS order_total FROM order_items GROUP BY order_id ORDER BY order_total DESC",
        expectedQuery: "SELECT order_id, ROUND(SUM(quantity * unit_price), 2) AS order_total FROM order_items GROUP BY order_id ORDER BY order_total DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /ROUND/i.test(q) && /SUM/i.test(q),
      },
      {
        id: 2,
        question: "Show each employee's name, salary, and the absolute difference between their salary and the overall average salary (alias: diff_from_avg, rounded to 0 decimals). Order by diff_from_avg DESC.",
        questionAr: "أظهر اسم كل موظف وراتبه والفرق المطلق بين راتبه ومتوسط الرواتب العام (alias: diff_from_avg، مقرّباً لصفر منازل). رتّب حسب diff_from_avg DESC.",
        hint: "SELECT name, salary, ROUND(ABS(salary - (SELECT AVG(salary) FROM employees)), 0) AS diff_from_avg FROM employees ORDER BY diff_from_avg DESC",
        hintAr: "SELECT name, salary, ROUND(ABS(salary - (SELECT AVG(salary) FROM employees)), 0) AS diff_from_avg FROM employees ORDER BY diff_from_avg DESC",
        expectedQuery: "SELECT name, salary, ROUND(ABS(salary - (SELECT AVG(salary) FROM employees)), 0) AS diff_from_avg FROM employees ORDER BY diff_from_avg DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /ABS/i.test(q) && /AVG/i.test(q),
      },
    ],
  },

  {
    id: 48,
    title: 'Type Conversion — CAST & TYPEOF',
    titleAr: 'تحويل الأنواع — CAST وTYPEOF',
    description: 'Convert values between types using CAST and inspect storage types with TYPEOF.',
    descriptionAr: 'حوّل القيم بين الأنواع باستخدام CAST وافحص أنواع التخزين باستخدام TYPEOF.',
    content: `
## Types in SQLite

SQLite uses **dynamic typing** — every value has a type, but columns are flexible. The five storage classes are: NULL, INTEGER, REAL, TEXT, BLOB.

---

## TYPEOF — Inspect the Type

\`\`\`sql
SELECT
  TYPEOF(42)        AS int_type,    -- 'integer'
  TYPEOF(3.14)      AS real_type,   -- 'real'
  TYPEOF('hello')   AS text_type,   -- 'text'
  TYPEOF(NULL)      AS null_type;   -- 'null'
\`\`\`

\`\`\`sql
-- Check actual stored types in salary column
SELECT name, salary, TYPEOF(salary) AS salary_type
FROM employees
LIMIT 5;
\`\`\`

---

## CAST — Convert Between Types

\`CAST(value AS type)\` converts a value to the specified type:

\`\`\`sql
-- Convert salary to integer (drops decimals)
SELECT name, salary, CAST(salary AS INTEGER) AS salary_int
FROM employees;
\`\`\`

\`\`\`sql
-- Convert text date parts to integer for comparison
SELECT name, hire_date,
       CAST(SUBSTR(hire_date, 1, 4) AS INTEGER) AS hire_year
FROM employees
WHERE CAST(SUBSTR(hire_date, 1, 4) AS INTEGER) >= 2020;
\`\`\`

\`\`\`sql
-- Safe division: cast to REAL to avoid integer division
SELECT
  total_amount,
  quantity,
  CAST(total_amount AS REAL) / CAST(quantity AS REAL) AS unit_cost
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
LIMIT 10;
\`\`\`

---

## CAST in COALESCE

\`\`\`sql
-- Show manager_id as text or 'None'
SELECT name,
       COALESCE(CAST(manager_id AS TEXT), 'None') AS manager
FROM employees;
\`\`\`

---

## Common Type Conversions

| From | To | Use |
|---|---|---|
| TEXT → INTEGER | \`CAST('42' AS INTEGER)\` | String numbers from CSV imports |
| INTEGER → TEXT | \`CAST(42 AS TEXT)\` | Concatenation |
| REAL → INTEGER | \`CAST(3.9 AS INTEGER)\` | Truncates (not rounds) |
| TEXT → REAL | \`CAST('3.14' AS REAL)\` | String decimals |
    `,
    contentAr: `
## الأنواع في SQLite

يستخدم SQLite **الكتابة الديناميكية** — لكل قيمة نوع، لكن الأعمدة مرنة. فئات التخزين الخمس هي: NULL وINTEGER وREAL وTEXT وBLOB.

---

## TYPEOF — فحص النوع

\`\`\`sql
SELECT
  TYPEOF(42)        AS int_type,    -- 'integer'
  TYPEOF(3.14)      AS real_type,   -- 'real'
  TYPEOF('hello')   AS text_type,   -- 'text'
  TYPEOF(NULL)      AS null_type;   -- 'null'
\`\`\`

---

## CAST — التحويل بين الأنواع

\`CAST(value AS type)\` يحوّل قيمة إلى النوع المحدد:

\`\`\`sql
-- تحويل الراتب إلى عدد صحيح (يحذف الكسور)
SELECT name, salary, CAST(salary AS INTEGER) AS salary_int
FROM employees;
\`\`\`

\`\`\`sql
-- تحويل أجزاء التاريخ النصية إلى أعداد صحيحة للمقارنة
SELECT name, hire_date,
       CAST(SUBSTR(hire_date, 1, 4) AS INTEGER) AS hire_year
FROM employees
WHERE CAST(SUBSTR(hire_date, 1, 4) AS INTEGER) >= 2020;
\`\`\`

---

## تحويلات شائعة

| من | إلى | الاستخدام |
|---|---|---|
| TEXT → INTEGER | \`CAST('42' AS INTEGER)\` | أرقام من استيراد CSV |
| INTEGER → TEXT | \`CAST(42 AS TEXT)\` | التسلسل |
| REAL → INTEGER | \`CAST(3.9 AS INTEGER)\` | بتر (لا تقريب) |
    `,
    example: `SELECT
  name,
  hire_date,
  CAST(SUBSTR(hire_date, 1, 4) AS INTEGER) AS hire_year,
  TYPEOF(salary)                            AS salary_type
FROM employees
WHERE CAST(SUBSTR(hire_date, 1, 4) AS INTEGER) >= 2020;`,
    exercises: [
      {
        id: 1,
        question: "List employees hired in 2021 or later. Use CAST to extract and compare the year from hire_date. Show name, hire_date, and hire_year.",
        questionAr: "أدرج الموظفين الذين التحقوا عام 2021 أو بعده. استخدم CAST لاستخراج السنة ومقارنتها. أظهر name وhire_date وhire_year.",
        hint: "SELECT name, hire_date, CAST(SUBSTR(hire_date,1,4) AS INTEGER) AS hire_year FROM employees WHERE CAST(SUBSTR(hire_date,1,4) AS INTEGER) >= 2021",
        hintAr: "SELECT name, hire_date, CAST(SUBSTR(hire_date,1,4) AS INTEGER) AS hire_year FROM employees WHERE CAST(SUBSTR(hire_date,1,4) AS INTEGER) >= 2021",
        expectedQuery: "SELECT name, hire_date, CAST(SUBSTR(hire_date,1,4) AS INTEGER) AS hire_year FROM employees WHERE CAST(SUBSTR(hire_date,1,4) AS INTEGER) >= 2021",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CAST/i.test(q) && /hire_year/i.test(q),
      },
      {
        id: 2,
        question: "Show each employee's name, salary as integer (alias: salary_int), and TYPEOF their original salary value (alias: salary_type).",
        questionAr: "أظهر اسم كل موظف وراتبه كعدد صحيح (alias: salary_int) ونوع قيمة راتبه الأصلية (alias: salary_type).",
        hint: "SELECT name, CAST(salary AS INTEGER) AS salary_int, TYPEOF(salary) AS salary_type FROM employees",
        hintAr: "SELECT name, CAST(salary AS INTEGER) AS salary_int, TYPEOF(salary) AS salary_type FROM employees",
        expectedQuery: "SELECT name, CAST(salary AS INTEGER) AS salary_int, TYPEOF(salary) AS salary_type FROM employees",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CAST/i.test(q) && /TYPEOF/i.test(q),
      },
    ],
  },

  {
    id: 49,
    title: 'Date Functions I — strftime & Date Parts',
    titleAr: 'دوال التاريخ I — strftime وأجزاء التاريخ',
    description: 'Extract year, month, day, and weekday from date columns using strftime.',
    descriptionAr: 'استخرج السنة والشهر واليوم ويوم الأسبوع من أعمدة التاريخ باستخدام strftime.',
    content: `
## Dates in the Company Database

Dates are stored as TEXT in ISO format: \`YYYY-MM-DD\`. SQLite's \`strftime\` function extracts any part of a date.

---

## strftime — Extract Date Parts

\`strftime(format, date)\`

| Format | Returns | Example |
|---|---|---|
| \`%Y\` | 4-digit year | \`2023\` |
| \`%m\` | Month (01–12) | \`07\` |
| \`%d\` | Day (01–31) | \`15\` |
| \`%w\` | Weekday (0=Sun) | \`3\` |
| \`%j\` | Day of year (001–366) | \`196\` |
| \`%Y-%m\` | Year-Month | \`2023-07\` |

\`\`\`sql
-- Year and month each employee was hired
SELECT
  name,
  hire_date,
  strftime('%Y', hire_date) AS hire_year,
  strftime('%m', hire_date) AS hire_month,
  strftime('%Y-%m', hire_date) AS year_month
FROM employees
ORDER BY hire_date;
\`\`\`

---

## Filtering by Date Part

\`\`\`sql
-- Employees hired in Q1 (Jan–Mar)
SELECT name, hire_date
FROM employees
WHERE CAST(strftime('%m', hire_date) AS INTEGER) BETWEEN 1 AND 3;
\`\`\`

\`\`\`sql
-- Orders placed on a Monday (weekday = 1)
SELECT id, order_date, total_amount
FROM orders
WHERE strftime('%w', order_date) = '1'
ORDER BY order_date;
\`\`\`

---

## Grouping by Date Part

\`\`\`sql
-- Orders per year-month
SELECT
  strftime('%Y-%m', order_date) AS month,
  COUNT(*)                       AS orders,
  ROUND(SUM(total_amount), 2)   AS revenue
FROM orders
GROUP BY month
ORDER BY month;
\`\`\`

\`\`\`sql
-- Hiring trend by year
SELECT
  strftime('%Y', hire_date) AS year,
  COUNT(*) AS hires
FROM employees
GROUP BY year
ORDER BY year;
\`\`\`
    `,
    contentAr: `
## التواريخ في قاعدة بيانات الشركة

تُخزَّن التواريخ كنص بصيغة ISO: \`YYYY-MM-DD\`. تستخرج دالة \`strftime\` في SQLite أي جزء من التاريخ.

---

## strftime — استخراج أجزاء التاريخ

\`strftime(format, date)\`

| التنسيق | يُعيد | مثال |
|---|---|---|
| \`%Y\` | السنة (4 أرقام) | \`2023\` |
| \`%m\` | الشهر (01–12) | \`07\` |
| \`%d\` | اليوم (01–31) | \`15\` |
| \`%w\` | يوم الأسبوع (0=الأحد) | \`3\` |
| \`%Y-%m\` | السنة-الشهر | \`2023-07\` |

\`\`\`sql
-- السنة والشهر لكل موظف عند التوظيف
SELECT
  name,
  hire_date,
  strftime('%Y', hire_date) AS hire_year,
  strftime('%m', hire_date) AS hire_month,
  strftime('%Y-%m', hire_date) AS year_month
FROM employees
ORDER BY hire_date;
\`\`\`

---

## التصفية حسب جزء التاريخ

\`\`\`sql
-- الموظفون المُوظَّفون في الربع الأول (يناير–مارس)
SELECT name, hire_date
FROM employees
WHERE CAST(strftime('%m', hire_date) AS INTEGER) BETWEEN 1 AND 3;
\`\`\`

---

## التجميع حسب جزء التاريخ

\`\`\`sql
-- الطلبات لكل شهر
SELECT
  strftime('%Y-%m', order_date) AS month,
  COUNT(*)                       AS orders,
  ROUND(SUM(total_amount), 2)   AS revenue
FROM orders
GROUP BY month
ORDER BY month;
\`\`\`
    `,
    example: `SELECT
  strftime('%Y-%m', order_date) AS month,
  COUNT(*)                      AS orders,
  ROUND(SUM(total_amount), 2)  AS revenue
FROM orders
GROUP BY month
ORDER BY month;`,
    exercises: [
      {
        id: 1,
        question: "Count how many employees were hired each year. Show hire_year and hires, ordered by hire_year.",
        questionAr: "احسب عدد الموظفين المُوظَّفين في كل سنة. أظهر hire_year وhires، مرتباً حسب hire_year.",
        hint: "SELECT strftime('%Y', hire_date) AS hire_year, COUNT(*) AS hires FROM employees GROUP BY hire_year ORDER BY hire_year",
        hintAr: "SELECT strftime('%Y', hire_date) AS hire_year, COUNT(*) AS hires FROM employees GROUP BY hire_year ORDER BY hire_year",
        expectedQuery: "SELECT strftime('%Y', hire_date) AS hire_year, COUNT(*) AS hires FROM employees GROUP BY hire_year ORDER BY hire_year",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /strftime/i.test(q) && /GROUP\s+BY/i.test(q),
      },
      {
        id: 2,
        question: "Find total revenue per month (from orders). Show month (YYYY-MM format) and monthly_revenue rounded to 2 decimals. Order by month.",
        questionAr: "أوجد إجمالي الإيراد لكل شهر (من جدول orders). أظهر month (بصيغة YYYY-MM) وmonthly_revenue مقرّباً لخانتين. رتّب حسب month.",
        hint: "SELECT strftime('%Y-%m', order_date) AS month, ROUND(SUM(total_amount), 2) AS monthly_revenue FROM orders GROUP BY month ORDER BY month",
        hintAr: "SELECT strftime('%Y-%m', order_date) AS month, ROUND(SUM(total_amount), 2) AS monthly_revenue FROM orders GROUP BY month ORDER BY month",
        expectedQuery: "SELECT strftime('%Y-%m', order_date) AS month, ROUND(SUM(total_amount), 2) AS monthly_revenue FROM orders GROUP BY month ORDER BY month",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /strftime/i.test(q) && /SUM/i.test(q),
      },
    ],
  },

  {
    id: 50,
    title: 'Date Functions II — julianday & Date Arithmetic',
    titleAr: 'دوال التاريخ II — julianday والحسابات الزمنية',
    description: 'Calculate durations, employee tenure, and days between dates using julianday.',
    descriptionAr: 'احسب المدد وفترات عمل الموظفين والأيام بين التواريخ باستخدام julianday.',
    content: `
## Calculating Durations with julianday

\`julianday(date)\` converts a date to a floating-point number (Julian Day Number). Subtracting two Julian days gives the exact difference in days.

---

## Days Between Two Dates

\`\`\`sql
-- Days since each employee was hired (as of 2024-01-01)
SELECT
  name,
  hire_date,
  ROUND(julianday('2024-01-01') - julianday(hire_date), 0) AS days_employed
FROM employees
ORDER BY days_employed DESC;
\`\`\`

---

## Employee Tenure in Years

\`\`\`sql
SELECT
  name,
  hire_date,
  ROUND((julianday('2024-01-01') - julianday(hire_date)) / 365.25, 1) AS years_employed
FROM employees
ORDER BY years_employed DESC;
\`\`\`

---

## Date Arithmetic with 'now'

Use the special string \`'now'\` for today's date:

\`\`\`sql
-- Current tenure for each active employee
SELECT
  name,
  hire_date,
  ROUND((julianday('now') - julianday(hire_date)) / 365.25, 1) AS tenure_years
FROM employees
WHERE is_active = 1
ORDER BY tenure_years DESC;
\`\`\`

---

## Date Modifiers

SQLite supports date modifiers in \`date()\` and \`julianday()\`:

\`\`\`sql
-- Orders placed in the last 90 days (relative to 2024-01-01)
SELECT id, order_date, total_amount
FROM orders
WHERE julianday(order_date) >= julianday('2024-01-01', '-90 days');
\`\`\`

\`\`\`sql
-- Orders and their age in days
SELECT
  id,
  order_date,
  ROUND(julianday('2024-01-01') - julianday(order_date), 0) AS age_days
FROM orders
ORDER BY age_days
LIMIT 10;
\`\`\`

---

## Combining strftime + julianday

\`\`\`sql
-- Average tenure per department (in years)
SELECT
  d.name AS department,
  ROUND(AVG((julianday('2024-01-01') - julianday(e.hire_date)) / 365.25), 1) AS avg_tenure
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.is_active = 1
GROUP BY d.name
ORDER BY avg_tenure DESC;
\`\`\`
    `,
    contentAr: `
## حساب المدد باستخدام julianday

\`julianday(date)\` تحوّل تاريخاً إلى رقم عشري. طرح يومَين يولانيين يعطي الفرق الدقيق بالأيام.

---

## الأيام بين تاريخين

\`\`\`sql
-- الأيام منذ تعيين كل موظف (اعتباراً من 2024-01-01)
SELECT
  name,
  hire_date,
  ROUND(julianday('2024-01-01') - julianday(hire_date), 0) AS days_employed
FROM employees
ORDER BY days_employed DESC;
\`\`\`

---

## فترة عمل الموظف بالسنوات

\`\`\`sql
SELECT
  name,
  hire_date,
  ROUND((julianday('2024-01-01') - julianday(hire_date)) / 365.25, 1) AS years_employed
FROM employees
ORDER BY years_employed DESC;
\`\`\`

---

## استخدام 'now' للتاريخ الحالي

\`\`\`sql
-- فترة عمل الموظفين النشطين حتى الآن
SELECT
  name,
  hire_date,
  ROUND((julianday('now') - julianday(hire_date)) / 365.25, 1) AS tenure_years
FROM employees
WHERE is_active = 1
ORDER BY tenure_years DESC;
\`\`\`

---

## الجمع بين strftime وjulianday

\`\`\`sql
-- متوسط فترة العمل لكل قسم (بالسنوات)
SELECT
  d.name AS department,
  ROUND(AVG((julianday('2024-01-01') - julianday(e.hire_date)) / 365.25), 1) AS avg_tenure
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.is_active = 1
GROUP BY d.name
ORDER BY avg_tenure DESC;
\`\`\`
    `,
    example: `SELECT
  name,
  hire_date,
  ROUND((julianday('2024-01-01') - julianday(hire_date)) / 365.25, 1) AS years_employed
FROM employees
ORDER BY years_employed DESC;`,
    exercises: [
      {
        id: 1,
        question: "Find the top 5 longest-serving active employees. Show name, hire_date, and tenure_years (years since hire_date to '2024-01-01', rounded to 1 decimal).",
        questionAr: "أوجد أكثر 5 موظفين نشطين خدمةً. أظهر name وhire_date وtenure_years (السنوات منذ hire_date حتى '2024-01-01'، مقرّباً لخانة عشرية).",
        hint: "SELECT name, hire_date, ROUND((julianday('2024-01-01') - julianday(hire_date)) / 365.25, 1) AS tenure_years FROM employees WHERE is_active = 1 ORDER BY tenure_years DESC LIMIT 5",
        hintAr: "SELECT name, hire_date, ROUND((julianday('2024-01-01') - julianday(hire_date)) / 365.25, 1) AS tenure_years FROM employees WHERE is_active = 1 ORDER BY tenure_years DESC LIMIT 5",
        expectedQuery: "SELECT name, hire_date, ROUND((julianday('2024-01-01') - julianday(hire_date)) / 365.25, 1) AS tenure_years FROM employees WHERE is_active = 1 ORDER BY tenure_years DESC LIMIT 5",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /julianday/i.test(q) && result.length <= 5,
      },
      {
        id: 2,
        question: "Calculate the average employee tenure (in years) per department. Show department name and avg_tenure (rounded to 1 decimal), ordered by avg_tenure DESC.",
        questionAr: "احسب متوسط فترة عمل الموظفين (بالسنوات) لكل قسم. أظهر اسم القسم وavg_tenure (مقرّباً لخانة عشرية)، مرتباً حسب avg_tenure DESC.",
        hint: "JOIN employees → departments, AVG((julianday('2024-01-01') - julianday(hire_date)) / 365.25), GROUP BY department",
        hintAr: "JOIN employees → departments، AVG((julianday('2024-01-01') - julianday(hire_date)) / 365.25)، GROUP BY department",
        expectedQuery: "SELECT d.name AS department, ROUND(AVG((julianday('2024-01-01') - julianday(e.hire_date)) / 365.25), 1) AS avg_tenure FROM employees e JOIN departments d ON e.department_id = d.id GROUP BY d.name ORDER BY avg_tenure DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /julianday/i.test(q) && /AVG/i.test(q) && /JOIN/i.test(q),
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 12 — ADVANCED ANALYTICS
  // ════════════════════════════════════════════════════

  {
    id: 51,
    title: 'LAG & LEAD — Row-over-Row Comparisons',
    titleAr: 'LAG وLEAD — مقارنة الصفوف المتتالية',
    description: 'Access previous and next row values in a result set using LAG and LEAD window functions.',
    descriptionAr: 'استرجع قيم الصف السابق والتالي في مجموعة النتائج باستخدام LAG وLEAD.',
    content: `
## LAG & LEAD

These window functions let you look **backward** (LAG) or **forward** (LEAD) in a result set without a self-join.

\`\`\`sql
LAG(column, offset, default)  OVER (PARTITION BY ... ORDER BY ...)
LEAD(column, offset, default) OVER (PARTITION BY ... ORDER BY ...)
\`\`\`

- **offset** — how many rows back/forward (default 1)
- **default** — value when there is no previous/next row (default NULL)

---

## Example 1 — Month-over-Month Revenue Change

\`\`\`sql
WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    ROUND(SUM(total_amount), 2)   AS revenue
  FROM orders
  GROUP BY month
)
SELECT
  month,
  revenue,
  LAG(revenue, 1, 0) OVER (ORDER BY month) AS prev_revenue,
  ROUND(revenue - LAG(revenue, 1, 0) OVER (ORDER BY month), 2) AS change
FROM monthly
ORDER BY month;
\`\`\`

---

## Example 2 — Salary Compared to Next Highest

\`\`\`sql
SELECT
  name,
  department_id,
  salary,
  LEAD(salary) OVER (
    PARTITION BY department_id
    ORDER BY salary DESC
  ) AS next_lower_salary,
  salary - LEAD(salary) OVER (
    PARTITION BY department_id
    ORDER BY salary DESC
  ) AS gap
FROM employees
ORDER BY department_id, salary DESC;
\`\`\`

---

## Example 3 — First Order vs Latest Order per Customer

\`\`\`sql
SELECT
  customer_id,
  order_date,
  total_amount,
  LAG(order_date) OVER (
    PARTITION BY customer_id ORDER BY order_date
  ) AS prev_order_date
FROM orders
ORDER BY customer_id, order_date;
\`\`\`
    `,
    contentAr: `
## LAG وLEAD

تتيح هاتان الدالتان النظر **للخلف** (LAG) أو **للأمام** (LEAD) في مجموعة النتائج بدون self-join.

\`\`\`sql
LAG(column, offset, default)  OVER (PARTITION BY ... ORDER BY ...)
LEAD(column, offset, default) OVER (PARTITION BY ... ORDER BY ...)
\`\`\`

- **offset** — عدد الصفوف للخلف/الأمام (الافتراضي 1)
- **default** — القيمة عند عدم وجود صف سابق/تالي (الافتراضي NULL)

---

## مثال 1 — تغيير الإيراد شهراً بشهر

\`\`\`sql
WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    ROUND(SUM(total_amount), 2)   AS revenue
  FROM orders
  GROUP BY month
)
SELECT
  month,
  revenue,
  LAG(revenue, 1, 0) OVER (ORDER BY month) AS prev_revenue,
  ROUND(revenue - LAG(revenue, 1, 0) OVER (ORDER BY month), 2) AS change
FROM monthly
ORDER BY month;
\`\`\`

---

## مثال 2 — الراتب مقارنةً بالتالي في الترتيب

\`\`\`sql
SELECT
  name,
  department_id,
  salary,
  LEAD(salary) OVER (
    PARTITION BY department_id
    ORDER BY salary DESC
  ) AS next_lower_salary
FROM employees
ORDER BY department_id, salary DESC;
\`\`\`
    `,
    example: `WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    ROUND(SUM(total_amount), 2)   AS revenue
  FROM orders
  GROUP BY month
)
SELECT
  month,
  revenue,
  LAG(revenue, 1, 0) OVER (ORDER BY month) AS prev_revenue,
  ROUND(revenue - LAG(revenue, 1, 0) OVER (ORDER BY month), 2) AS change
FROM monthly
ORDER BY month;`,
    exercises: [
      {
        id: 1,
        question: "For each employee, show their name, department_id, salary, and the salary of the previous employee (ordered by salary DESC within the same department) as prev_salary. Use LAG.",
        questionAr: "لكل موظف، أظهر name وdepartment_id وsalary وراتب الموظف السابق (مرتباً حسب salary DESC داخل نفس القسم) باسم prev_salary. استخدم LAG.",
        hint: "SELECT name, department_id, salary, LAG(salary) OVER (PARTITION BY department_id ORDER BY salary DESC) AS prev_salary FROM employees ORDER BY department_id, salary DESC",
        hintAr: "SELECT name, department_id, salary, LAG(salary) OVER (PARTITION BY department_id ORDER BY salary DESC) AS prev_salary FROM employees ORDER BY department_id, salary DESC",
        expectedQuery: "SELECT name, department_id, salary, LAG(salary) OVER (PARTITION BY department_id ORDER BY salary DESC) AS prev_salary FROM employees ORDER BY department_id, salary DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LAG/i.test(q) && /OVER/i.test(q),
      },
      {
        id: 2,
        question: "Using a CTE, calculate monthly revenue, then use LAG to show the previous month's revenue and the absolute change. Show month, revenue, prev_revenue, and change.",
        questionAr: "باستخدام CTE، احسب الإيراد الشهري، ثم استخدم LAG لإظهار إيراد الشهر السابق والتغيير المطلق. أظهر month وrevenue وprev_revenue وchange.",
        hint: "WITH monthly AS (SELECT strftime('%Y-%m', order_date) AS month, ROUND(SUM(total_amount),2) AS revenue FROM orders GROUP BY month) SELECT month, revenue, LAG(revenue,1,0) OVER (ORDER BY month) AS prev_revenue, ROUND(revenue - LAG(revenue,1,0) OVER (ORDER BY month), 2) AS change FROM monthly",
        hintAr: "WITH monthly AS (SELECT strftime('%Y-%m', order_date) AS month, ROUND(SUM(total_amount),2) AS revenue FROM orders GROUP BY month) SELECT month, revenue, LAG(revenue,1,0) OVER (ORDER BY month) AS prev_revenue, ROUND(revenue - LAG(revenue,1,0) OVER (ORDER BY month), 2) AS change FROM monthly",
        expectedQuery: "WITH monthly AS (SELECT strftime('%Y-%m', order_date) AS month, ROUND(SUM(total_amount),2) AS revenue FROM orders GROUP BY month) SELECT month, revenue, LAG(revenue,1,0) OVER (ORDER BY month) AS prev_revenue, ROUND(revenue - LAG(revenue,1,0) OVER (ORDER BY month), 2) AS change FROM monthly ORDER BY month",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LAG/i.test(q) && /WITH/i.test(q),
      },
    ],
  },

  {
    id: 52,
    title: 'Running Totals — SUM OVER & AVG OVER',
    titleAr: 'الإجماليات التراكمية — SUM OVER وAVG OVER',
    description: 'Calculate running totals and moving averages using window frames.',
    descriptionAr: 'احسب الإجماليات التراكمية والمتوسطات المتحركة باستخدام إطارات النوافذ.',
    content: `
## Running Totals with Window Frames

A **window frame** defines which rows are included in the calculation for each row. The most common is \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\` — everything from the start up to the current row.

---

## Cumulative Revenue

\`\`\`sql
WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    ROUND(SUM(total_amount), 2)   AS revenue
  FROM orders
  GROUP BY month
)
SELECT
  month,
  revenue,
  ROUND(SUM(revenue) OVER (
    ORDER BY month
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2) AS cumulative_revenue
FROM monthly
ORDER BY month;
\`\`\`

---

## Running Average Salary by Hire Date

\`\`\`sql
SELECT
  name,
  hire_date,
  salary,
  ROUND(AVG(salary) OVER (
    ORDER BY hire_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2) AS running_avg_salary
FROM employees
ORDER BY hire_date;
\`\`\`

---

## Moving Average (Last 3 Rows)

\`\`\`sql
WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    ROUND(SUM(total_amount), 2)   AS revenue
  FROM orders
  GROUP BY month
)
SELECT
  month,
  revenue,
  ROUND(AVG(revenue) OVER (
    ORDER BY month
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2) AS moving_avg_3m
FROM monthly
ORDER BY month;
\`\`\`

---

## Cumulative Count

\`\`\`sql
-- How many employees had been hired by each hire date?
SELECT
  name,
  hire_date,
  COUNT(*) OVER (
    ORDER BY hire_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_hires
FROM employees
ORDER BY hire_date;
\`\`\`
    `,
    contentAr: `
## الإجماليات التراكمية مع إطارات النوافذ

**إطار النافذة** يحدد الصفوف المُضمَّنة في الحساب لكل صف. الأكثر شيوعاً هو \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\` — كل شيء من البداية حتى الصف الحالي.

---

## الإيراد التراكمي

\`\`\`sql
WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    ROUND(SUM(total_amount), 2)   AS revenue
  FROM orders
  GROUP BY month
)
SELECT
  month,
  revenue,
  ROUND(SUM(revenue) OVER (
    ORDER BY month
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2) AS cumulative_revenue
FROM monthly
ORDER BY month;
\`\`\`

---

## المتوسط المتحرك (آخر 3 صفوف)

\`\`\`sql
WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    ROUND(SUM(total_amount), 2)   AS revenue
  FROM orders
  GROUP BY month
)
SELECT
  month,
  revenue,
  ROUND(AVG(revenue) OVER (
    ORDER BY month
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2) AS moving_avg_3m
FROM monthly
ORDER BY month;
\`\`\`
    `,
    example: `WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    ROUND(SUM(total_amount), 2)   AS revenue
  FROM orders
  GROUP BY month
)
SELECT
  month,
  revenue,
  ROUND(SUM(revenue) OVER (
    ORDER BY month
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ), 2) AS cumulative_revenue
FROM monthly
ORDER BY month;`,
    exercises: [
      {
        id: 1,
        question: "Show each employee's name, hire_date, salary, and a running total of salary (cumulative_salary) ordered by hire_date.",
        questionAr: "أظهر name وhire_date وsalary والمجموع التراكمي للراتب (cumulative_salary) مرتباً حسب hire_date.",
        hint: "SELECT name, hire_date, salary, SUM(salary) OVER (ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_salary FROM employees ORDER BY hire_date",
        hintAr: "SELECT name, hire_date, salary, SUM(salary) OVER (ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_salary FROM employees ORDER BY hire_date",
        expectedQuery: "SELECT name, hire_date, salary, SUM(salary) OVER (ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_salary FROM employees ORDER BY hire_date",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SUM\s*\(.*\)\s*OVER/i.test(q) && /UNBOUNDED/i.test(q),
      },
      {
        id: 2,
        question: "Using a CTE for monthly revenue, calculate a 3-month moving average (moving_avg_3m) using ROWS BETWEEN 2 PRECEDING AND CURRENT ROW. Show month, revenue, and moving_avg_3m.",
        questionAr: "باستخدام CTE للإيراد الشهري، احسب متوسطاً متحركاً لـ 3 أشهر (moving_avg_3m) باستخدام ROWS BETWEEN 2 PRECEDING AND CURRENT ROW. أظهر month وrevenue وmoving_avg_3m.",
        hint: "WITH monthly AS (...) SELECT month, revenue, ROUND(AVG(revenue) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_3m FROM monthly",
        hintAr: "WITH monthly AS (...) SELECT month, revenue, ROUND(AVG(revenue) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_3m FROM monthly",
        expectedQuery: "WITH monthly AS (SELECT strftime('%Y-%m', order_date) AS month, ROUND(SUM(total_amount), 2) AS revenue FROM orders GROUP BY month) SELECT month, revenue, ROUND(AVG(revenue) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg_3m FROM monthly ORDER BY month",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /AVG\s*\(.*\)\s*OVER/i.test(q) && /2\s+PRECEDING/i.test(q),
      },
    ],
  },

  {
    id: 53,
    title: 'NTILE, PERCENT_RANK & CUME_DIST',
    titleAr: 'NTILE وPERCENT_RANK وCUME_DIST',
    description: 'Divide data into buckets and calculate statistical rank percentages.',
    descriptionAr: 'قسّم البيانات إلى مجموعات واحسب نسب الترتيب الإحصائي.',
    content: `
## Distribution Window Functions

These functions answer: **"Where does this row sit in the overall distribution?"**

---

## NTILE — Divide into N Equal Buckets

\`NTILE(n)\` assigns each row to one of n buckets (1 = top bucket):

\`\`\`sql
-- Divide employees into 4 salary quartiles
SELECT
  name,
  salary,
  NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM employees
ORDER BY salary DESC;
\`\`\`

\`\`\`sql
-- Label the quartiles
SELECT
  name,
  salary,
  CASE NTILE(4) OVER (ORDER BY salary DESC)
    WHEN 1 THEN 'Top 25%'
    WHEN 2 THEN 'Upper Mid'
    WHEN 3 THEN 'Lower Mid'
    ELSE 'Bottom 25%'
  END AS salary_band
FROM employees
ORDER BY salary DESC;
\`\`\`

---

## PERCENT_RANK — Relative Rank (0 to 1)

\`PERCENT_RANK()\` = (rank - 1) / (total rows - 1). Returns 0 for the first row and 1 for the last.

\`\`\`sql
SELECT
  name,
  salary,
  ROUND(PERCENT_RANK() OVER (ORDER BY salary), 2) AS pct_rank
FROM employees
ORDER BY salary DESC;
\`\`\`

---

## CUME_DIST — Cumulative Distribution (0 to 1)

\`CUME_DIST()\` = rows with value ≤ current / total rows. Answers "what fraction of employees earn this salary or less?"

\`\`\`sql
SELECT
  name,
  salary,
  ROUND(CUME_DIST() OVER (ORDER BY salary), 2) AS cume_dist
FROM employees
ORDER BY salary;
\`\`\`

---

## Practical Use — Top 10% Earners

\`\`\`sql
SELECT name, salary, pct_rank
FROM (
  SELECT
    name,
    salary,
    ROUND(PERCENT_RANK() OVER (ORDER BY salary), 2) AS pct_rank
  FROM employees
)
WHERE pct_rank >= 0.90
ORDER BY salary DESC;
\`\`\`
    `,
    contentAr: `
## دوال التوزيع في النوافذ

تُجيب هذه الدوال على: **"أين يقع هذا الصف في التوزيع الكلي؟"**

---

## NTILE — التقسيم إلى N مجموعات متساوية

\`NTILE(n)\` يُعيّن كل صف لإحدى n مجموعات (1 = المجموعة الأعلى):

\`\`\`sql
-- تقسيم الموظفين إلى 4 ربعيات حسب الراتب
SELECT
  name,
  salary,
  NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM employees
ORDER BY salary DESC;
\`\`\`

\`\`\`sql
-- تسمية الربعيات
SELECT
  name,
  salary,
  CASE NTILE(4) OVER (ORDER BY salary DESC)
    WHEN 1 THEN 'أعلى 25%'
    WHEN 2 THEN 'أعلى متوسط'
    WHEN 3 THEN 'أدنى متوسط'
    ELSE 'أدنى 25%'
  END AS salary_band
FROM employees
ORDER BY salary DESC;
\`\`\`

---

## PERCENT_RANK — الترتيب النسبي (0 إلى 1)

\`\`\`sql
SELECT
  name,
  salary,
  ROUND(PERCENT_RANK() OVER (ORDER BY salary), 2) AS pct_rank
FROM employees
ORDER BY salary DESC;
\`\`\`

---

## CUME_DIST — التوزيع التراكمي (0 إلى 1)

\`\`\`sql
SELECT
  name,
  salary,
  ROUND(CUME_DIST() OVER (ORDER BY salary), 2) AS cume_dist
FROM employees
ORDER BY salary;
\`\`\`
    `,
    example: `SELECT
  name,
  salary,
  NTILE(4) OVER (ORDER BY salary DESC) AS quartile,
  ROUND(PERCENT_RANK() OVER (ORDER BY salary), 2) AS pct_rank
FROM employees
ORDER BY salary DESC;`,
    exercises: [
      {
        id: 1,
        question: "Divide employees into 5 equal salary bands using NTILE(5), ordered by salary DESC. Show name, salary, and band (alias: salary_band). Order by salary DESC.",
        questionAr: "قسّم الموظفين إلى 5 مجموعات راتب متساوية باستخدام NTILE(5)، مرتباً حسب salary DESC. أظهر name وsalary وband (alias: salary_band). رتّب حسب salary DESC.",
        hint: "SELECT name, salary, NTILE(5) OVER (ORDER BY salary DESC) AS salary_band FROM employees ORDER BY salary DESC",
        hintAr: "SELECT name, salary, NTILE(5) OVER (ORDER BY salary DESC) AS salary_band FROM employees ORDER BY salary DESC",
        expectedQuery: "SELECT name, salary, NTILE(5) OVER (ORDER BY salary DESC) AS salary_band FROM employees ORDER BY salary DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /NTILE/i.test(q) && /OVER/i.test(q),
      },
      {
        id: 2,
        question: "Find employees in the top 20% by salary using PERCENT_RANK. Show name, salary, and pct_rank. Only return rows where pct_rank >= 0.80, ordered by salary DESC.",
        questionAr: "أوجد الموظفين في أعلى 20% من حيث الراتب باستخدام PERCENT_RANK. أظهر name وsalary وpct_rank. أرجع فقط الصفوف التي pct_rank فيها >= 0.80، مرتباً حسب salary DESC.",
        hint: "Wrap in subquery: SELECT ... FROM (SELECT name, salary, ROUND(PERCENT_RANK() OVER (ORDER BY salary), 2) AS pct_rank FROM employees) WHERE pct_rank >= 0.80",
        hintAr: "استخدم استعلاماً فرعياً: SELECT ... FROM (SELECT name, salary, ROUND(PERCENT_RANK() OVER (ORDER BY salary), 2) AS pct_rank FROM employees) WHERE pct_rank >= 0.80",
        expectedQuery: "SELECT name, salary, pct_rank FROM (SELECT name, salary, ROUND(PERCENT_RANK() OVER (ORDER BY salary), 2) AS pct_rank FROM employees) WHERE pct_rank >= 0.80 ORDER BY salary DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /PERCENT_RANK/i.test(q) && /0\.80/i.test(q),
      },
    ],
  },

  {
    id: 54,
    title: 'EXISTS & NOT EXISTS',
    titleAr: 'EXISTS وNOT EXISTS',
    description: 'Use EXISTS and NOT EXISTS for efficient existence checks in correlated subqueries.',
    descriptionAr: 'استخدم EXISTS وNOT EXISTS للتحقق من الوجود بكفاءة في الاستعلامات الفرعية المترابطة.',
    content: `
## EXISTS vs IN

Both \`EXISTS\` and \`IN\` find rows that have a match elsewhere — but \`EXISTS\` stops as soon as it finds **one match**, making it faster on large tables.

---

## EXISTS — "At Least One Match Exists"

\`\`\`sql
-- Customers who have placed at least one order
SELECT c.name, c.email
FROM customers c
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
)
ORDER BY c.name;
\`\`\`

The inner query uses \`SELECT 1\` — the actual value doesn't matter, only whether any row is returned.

---

## NOT EXISTS — "No Match Exists"

\`\`\`sql
-- Customers who have NEVER placed an order
SELECT c.name, c.email, c.city
FROM customers c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
)
ORDER BY c.name;
\`\`\`

---

## EXISTS with Multiple Conditions

\`\`\`sql
-- Employees who manage at least one other employee
SELECT e.name, e.job_title
FROM employees e
WHERE EXISTS (
  SELECT 1
  FROM employees sub
  WHERE sub.manager_id = e.id
)
ORDER BY e.name;
\`\`\`

---

## EXISTS vs LEFT JOIN IS NULL

Both achieve the same result — choose based on readability:

\`\`\`sql
-- Equivalent: products never ordered
-- Option A: NOT EXISTS
SELECT p.name FROM products p
WHERE NOT EXISTS (
  SELECT 1 FROM order_items oi WHERE oi.product_id = p.id
);

-- Option B: LEFT JOIN IS NULL
SELECT p.name FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.product_id IS NULL;
\`\`\`
    `,
    contentAr: `
## EXISTS مقابل IN

كلاهما يجد الصفوف التي لها تطابق — لكن \`EXISTS\` يتوقف بمجرد إيجاد **تطابق واحد**، مما يجعله أسرع على الجداول الكبيرة.

---

## EXISTS — "يوجد تطابق واحد على الأقل"

\`\`\`sql
-- العملاء الذين قدّموا طلباً واحداً على الأقل
SELECT c.name, c.email
FROM customers c
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
)
ORDER BY c.name;
\`\`\`

الاستعلام الداخلي يستخدم \`SELECT 1\` — القيمة الفعلية لا تهم، المهم هل يُعيد أي صف.

---

## NOT EXISTS — "لا يوجد تطابق"

\`\`\`sql
-- العملاء الذين لم يقدّموا أي طلب قط
SELECT c.name, c.email, c.city
FROM customers c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
)
ORDER BY c.name;
\`\`\`

---

## EXISTS مع شروط متعددة

\`\`\`sql
-- الموظفون الذين يديرون موظفاً آخر على الأقل
SELECT e.name, e.job_title
FROM employees e
WHERE EXISTS (
  SELECT 1
  FROM employees sub
  WHERE sub.manager_id = e.id
)
ORDER BY e.name;
\`\`\`
    `,
    example: `-- Customers who have NEVER placed an order
SELECT c.name, c.email, c.city
FROM customers c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
)
ORDER BY c.name;`,
    exercises: [
      {
        id: 1,
        question: "Find all customers who have placed at least one order with status 'delivered'. Show name and email. Use EXISTS.",
        questionAr: "أوجد جميع العملاء الذين قدّموا طلباً واحداً على الأقل بحالة 'delivered'. أظهر name وemail. استخدم EXISTS.",
        hint: "SELECT c.name, c.email FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'delivered') ORDER BY c.name",
        hintAr: "SELECT c.name, c.email FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'delivered') ORDER BY c.name",
        expectedQuery: "SELECT c.name, c.email FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'delivered') ORDER BY c.name",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /EXISTS/i.test(q) && /delivered/i.test(q),
      },
      {
        id: 2,
        question: "Find all products that have NEVER been ordered. Show only the product name, ordered alphabetically. Use NOT EXISTS.",
        questionAr: "أوجد جميع المنتجات التي لم تُطلب قط. أظهر اسم المنتج فقط، مرتباً أبجدياً. استخدم NOT EXISTS.",
        hint: "SELECT p.name FROM products p WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.id) ORDER BY p.name",
        hintAr: "SELECT p.name FROM products p WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.id) ORDER BY p.name",
        expectedQuery: "SELECT p.name FROM products p WHERE NOT EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.id) ORDER BY p.name",
        checkFunction: (result: unknown[], q = '') =>
          /NOT\s+EXISTS/i.test(q),
      },
    ],
  },

  {
    id: 55,
    title: 'Multiple CTEs — Chaining Queries',
    titleAr: 'CTEs المتعددة — تسلسل الاستعلامات',
    description: 'Define and chain multiple CTEs in a single WITH clause to break complex queries into readable steps.',
    descriptionAr: 'عرّف وسلسل CTEs متعددة في جملة WITH واحدة لتقسيم الاستعلامات المعقدة إلى خطوات مقروءة.',
    content: `
## Why Multiple CTEs?

A single query doing 5 things at once is hard to read and debug. Multiple CTEs let you build results **step by step**, naming each intermediate result clearly.

---

## Syntax

\`\`\`sql
WITH
  cte1 AS (SELECT ...),
  cte2 AS (SELECT ... FROM cte1 ...),
  cte3 AS (SELECT ... FROM cte2 ...)
SELECT * FROM cte3;
\`\`\`

Each CTE can reference any CTE defined **before** it in the list.

---

## Example — Customer Lifetime Value Report

\`\`\`sql
WITH
  -- Step 1: total spending per customer
  spending AS (
    SELECT customer_id, ROUND(SUM(total_amount), 2) AS lifetime_value
    FROM orders
    WHERE status <> 'cancelled'
    GROUP BY customer_id
  ),
  -- Step 2: add order count
  order_stats AS (
    SELECT customer_id, COUNT(*) AS total_orders
    FROM orders
    WHERE status <> 'cancelled'
    GROUP BY customer_id
  ),
  -- Step 3: classify by tier
  classified AS (
    SELECT
      s.customer_id,
      s.lifetime_value,
      o.total_orders,
      CASE
        WHEN s.lifetime_value >= 500 THEN 'Platinum'
        WHEN s.lifetime_value >= 200 THEN 'Gold'
        ELSE 'Silver'
      END AS tier
    FROM spending s
    JOIN order_stats o ON s.customer_id = o.customer_id
  )
SELECT
  c.name,
  cl.lifetime_value,
  cl.total_orders,
  cl.tier
FROM classified cl
JOIN customers c ON cl.customer_id = c.id
ORDER BY cl.lifetime_value DESC;
\`\`\`

---

## Example — Department Budget vs Payroll

\`\`\`sql
WITH
  payroll AS (
    SELECT department_id, ROUND(SUM(salary), 2) AS total_salary
    FROM employees
    WHERE is_active = 1
    GROUP BY department_id
  ),
  budget_vs_payroll AS (
    SELECT
      d.name,
      d.budget,
      p.total_salary,
      ROUND(p.total_salary / d.budget * 100, 1) AS payroll_pct
    FROM departments d
    JOIN payroll p ON d.id = p.department_id
  )
SELECT * FROM budget_vs_payroll
ORDER BY payroll_pct DESC;
\`\`\`
    `,
    contentAr: `
## لماذا CTEs متعددة؟

استعلام واحد يؤدي 5 أشياء في آنٍ واحد يصعب قراءته وتصحيحه. تتيح لك CTEs المتعددة بناء النتائج **خطوةً بخطوة**، مع تسمية كل نتيجة وسيطة بوضوح.

---

## الصياغة

\`\`\`sql
WITH
  cte1 AS (SELECT ...),
  cte2 AS (SELECT ... FROM cte1 ...),
  cte3 AS (SELECT ... FROM cte2 ...)
SELECT * FROM cte3;
\`\`\`

كل CTE يمكنه الإشارة إلى أي CTE مُعرَّف **قبله** في القائمة.

---

## مثال — تقرير القيمة الإجمالية للعميل

\`\`\`sql
WITH
  -- الخطوة 1: إجمالي الإنفاق لكل عميل
  spending AS (
    SELECT customer_id, ROUND(SUM(total_amount), 2) AS lifetime_value
    FROM orders
    WHERE status <> 'cancelled'
    GROUP BY customer_id
  ),
  -- الخطوة 2: إضافة عدد الطلبات
  order_stats AS (
    SELECT customer_id, COUNT(*) AS total_orders
    FROM orders
    WHERE status <> 'cancelled'
    GROUP BY customer_id
  ),
  -- الخطوة 3: التصنيف حسب المستوى
  classified AS (
    SELECT
      s.customer_id,
      s.lifetime_value,
      o.total_orders,
      CASE
        WHEN s.lifetime_value >= 500 THEN 'Platinum'
        WHEN s.lifetime_value >= 200 THEN 'Gold'
        ELSE 'Silver'
      END AS tier
    FROM spending s
    JOIN order_stats o ON s.customer_id = o.customer_id
  )
SELECT c.name, cl.lifetime_value, cl.total_orders, cl.tier
FROM classified cl
JOIN customers c ON cl.customer_id = c.id
ORDER BY cl.lifetime_value DESC;
\`\`\`
    `,
    example: `WITH
  payroll AS (
    SELECT department_id, ROUND(SUM(salary), 2) AS total_salary
    FROM employees WHERE is_active = 1
    GROUP BY department_id
  ),
  budget_vs_payroll AS (
    SELECT d.name, d.budget, p.total_salary,
           ROUND(p.total_salary / d.budget * 100, 1) AS payroll_pct
    FROM departments d
    JOIN payroll p ON d.id = p.department_id
  )
SELECT * FROM budget_vs_payroll
ORDER BY payroll_pct DESC;`,
    exercises: [
      {
        id: 1,
        question: "Write a query with two CTEs: (1) 'dept_payroll' — total salary per department_id for active employees; (2) 'dept_info' — join with departments to get department name and budget. Final SELECT: show name, budget, total_salary, ordered by total_salary DESC.",
        questionAr: "اكتب استعلاماً بـ CTE اثنين: (1) 'dept_payroll' — إجمالي الراتب لكل قسم للموظفين النشطين؛ (2) 'dept_info' — JOIN مع departments للحصول على الاسم والميزانية. الـ SELECT النهائي: أظهر name وbudget وtotal_salary، مرتباً حسب total_salary DESC.",
        hint: "WITH dept_payroll AS (SELECT department_id, SUM(salary) AS total_salary FROM employees WHERE is_active=1 GROUP BY department_id), dept_info AS (SELECT d.name, d.budget, p.total_salary FROM departments d JOIN dept_payroll p ON d.id=p.department_id) SELECT * FROM dept_info ORDER BY total_salary DESC",
        hintAr: "WITH dept_payroll AS (SELECT department_id, SUM(salary) AS total_salary FROM employees WHERE is_active=1 GROUP BY department_id), dept_info AS (SELECT d.name, d.budget, p.total_salary FROM departments d JOIN dept_payroll p ON d.id=p.department_id) SELECT * FROM dept_info ORDER BY total_salary DESC",
        expectedQuery: "WITH dept_payroll AS (SELECT department_id, SUM(salary) AS total_salary FROM employees WHERE is_active = 1 GROUP BY department_id), dept_info AS (SELECT d.name, d.budget, p.total_salary FROM departments d JOIN dept_payroll p ON d.id = p.department_id) SELECT * FROM dept_info ORDER BY total_salary DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && (q.match(/AS\s*\(/gi) || []).length >= 2,
      },
      {
        id: 2,
        question: "Using three CTEs: (1) 'order_totals' — total_amount per customer_id; (2) 'order_counts' — order count per customer_id (exclude cancelled); (3) 'final' — join both with customers. Show customer name, lifetime_value, and total_orders. Order by lifetime_value DESC.",
        questionAr: "باستخدام ثلاثة CTEs: (1) 'order_totals' — total_amount لكل customer_id؛ (2) 'order_counts' — عدد الطلبات لكل customer_id (استثنِ الملغاة)؛ (3) 'final' — JOIN كليهما مع customers. أظهر اسم العميل وlifetime_value وtotal_orders. رتّب حسب lifetime_value DESC.",
        hint: "WITH order_totals AS (...), order_counts AS (...), final AS (SELECT c.name, t.lifetime_value, co.total_orders FROM customers c JOIN order_totals t ... JOIN order_counts co ...) SELECT * FROM final ORDER BY lifetime_value DESC",
        hintAr: "WITH order_totals AS (...)، order_counts AS (...)، final AS (SELECT c.name, t.lifetime_value, co.total_orders FROM customers c JOIN order_totals t ... JOIN order_counts co ...) SELECT * FROM final ORDER BY lifetime_value DESC",
        expectedQuery: "WITH order_totals AS (SELECT customer_id, ROUND(SUM(total_amount),2) AS lifetime_value FROM orders WHERE status <> 'cancelled' GROUP BY customer_id), order_counts AS (SELECT customer_id, COUNT(*) AS total_orders FROM orders WHERE status <> 'cancelled' GROUP BY customer_id), final AS (SELECT c.name, t.lifetime_value, co.total_orders FROM customers c JOIN order_totals t ON c.id = t.customer_id JOIN order_counts co ON c.id = co.customer_id) SELECT * FROM final ORDER BY lifetime_value DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && (q.match(/AS\s*\(/gi) || []).length >= 3,
      },
    ],
  },

  {
    id: 56,
    title: 'Correlated Subqueries',
    titleAr: 'الاستعلامات الفرعية المترابطة',
    description: 'Write subqueries that reference the outer query — row by row calculations and comparisons.',
    descriptionAr: 'اكتب استعلامات فرعية تُشير إلى الاستعلام الخارجي — حسابات ومقارنات صف بصف.',
    content: `
## What is a Correlated Subquery?

A **correlated subquery** references a column from the outer query. It runs **once per row** of the outer query — like a loop inside SQL.

\`\`\`sql
SELECT outer_col
FROM outer_table o
WHERE outer_col > (
  SELECT aggregate(inner_col)
  FROM inner_table i
  WHERE i.key = o.key  -- ← this is the correlation
);
\`\`\`

---

## Example 1 — Employees Above Their Department Average

\`\`\`sql
SELECT e.name, e.salary, e.department_id
FROM employees e
WHERE e.salary > (
  SELECT AVG(e2.salary)
  FROM employees e2
  WHERE e2.department_id = e.department_id
)
ORDER BY e.department_id, e.salary DESC;
\`\`\`

---

## Example 2 — Most Recent Order per Customer

\`\`\`sql
SELECT c.name,
  (SELECT MAX(o.order_date)
   FROM orders o
   WHERE o.customer_id = c.id) AS last_order_date
FROM customers c
ORDER BY last_order_date DESC NULLS LAST;
\`\`\`

---

## Example 3 — Products with Above-Average Price in Their Category

\`\`\`sql
SELECT p.name, p.price, p.category_id
FROM products p
WHERE p.price > (
  SELECT AVG(p2.price)
  FROM products p2
  WHERE p2.category_id = p.category_id
)
ORDER BY p.category_id, p.price DESC;
\`\`\`

---

## Correlated vs Non-Correlated

| Type | Runs how many times? | References outer? |
|---|---|---|
| Non-correlated | Once | No |
| Correlated | Once per outer row | Yes |

Use correlated subqueries for **row-by-row comparisons**. Use CTEs or JOINs when performance matters on large datasets.
    `,
    contentAr: `
## ما هو الاستعلام الفرعي المترابط؟

**الاستعلام الفرعي المترابط** يُشير إلى عمود من الاستعلام الخارجي. يعمل **مرةً لكل صف** في الاستعلام الخارجي — كحلقة داخل SQL.

---

## مثال 1 — الموظفون فوق متوسط قسمهم

\`\`\`sql
SELECT e.name, e.salary, e.department_id
FROM employees e
WHERE e.salary > (
  SELECT AVG(e2.salary)
  FROM employees e2
  WHERE e2.department_id = e.department_id
)
ORDER BY e.department_id, e.salary DESC;
\`\`\`

---

## مثال 2 — آخر طلب لكل عميل

\`\`\`sql
SELECT c.name,
  (SELECT MAX(o.order_date)
   FROM orders o
   WHERE o.customer_id = c.id) AS last_order_date
FROM customers c
ORDER BY last_order_date DESC;
\`\`\`

---

## مثال 3 — المنتجات ذات السعر فوق متوسط فئتها

\`\`\`sql
SELECT p.name, p.price, p.category_id
FROM products p
WHERE p.price > (
  SELECT AVG(p2.price)
  FROM products p2
  WHERE p2.category_id = p.category_id
)
ORDER BY p.category_id, p.price DESC;
\`\`\`
    `,
    example: `-- Employees earning above their department average
SELECT e.name, e.salary, e.department_id
FROM employees e
WHERE e.salary > (
  SELECT AVG(e2.salary)
  FROM employees e2
  WHERE e2.department_id = e.department_id
)
ORDER BY e.department_id, e.salary DESC;`,
    exercises: [
      {
        id: 1,
        question: "Find products whose price is above the average price of their category. Show product name, price, and category_id. Order by category_id, then price DESC.",
        questionAr: "أوجد المنتجات التي يتجاوز سعرها متوسط سعر فئتها. أظهر اسم المنتج والسعر وcategory_id. رتّب حسب category_id ثم price DESC.",
        hint: "SELECT p.name, p.price, p.category_id FROM products p WHERE p.price > (SELECT AVG(p2.price) FROM products p2 WHERE p2.category_id = p.category_id) ORDER BY p.category_id, p.price DESC",
        hintAr: "SELECT p.name, p.price, p.category_id FROM products p WHERE p.price > (SELECT AVG(p2.price) FROM products p2 WHERE p2.category_id = p.category_id) ORDER BY p.category_id, p.price DESC",
        expectedQuery: "SELECT p.name, p.price, p.category_id FROM products p WHERE p.price > (SELECT AVG(p2.price) FROM products p2 WHERE p2.category_id = p.category_id) ORDER BY p.category_id, p.price DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SELECT\s+AVG/i.test(q) && /category_id\s*=\s*p\.category_id/i.test(q),
      },
      {
        id: 2,
        question: "For each customer, show their name and the date of their most recent order (as last_order_date) using a correlated subquery. Include customers with no orders (NULL). Order by last_order_date DESC.",
        questionAr: "لكل عميل، أظهر اسمه وتاريخ أحدث طلب له (كـ last_order_date) باستخدام استعلام فرعي مترابط. اشمل العملاء بلا طلبات (NULL). رتّب حسب last_order_date DESC.",
        hint: "SELECT c.name, (SELECT MAX(o.order_date) FROM orders o WHERE o.customer_id = c.id) AS last_order_date FROM customers c ORDER BY last_order_date DESC",
        hintAr: "SELECT c.name, (SELECT MAX(o.order_date) FROM orders o WHERE o.customer_id = c.id) AS last_order_date FROM customers c ORDER BY last_order_date DESC",
        expectedQuery: "SELECT c.name, (SELECT MAX(o.order_date) FROM orders o WHERE o.customer_id = c.id) AS last_order_date FROM customers c ORDER BY last_order_date DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SELECT\s+MAX/i.test(q) && /customer_id\s*=\s*c\.id/i.test(q),
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 13 — MASTER
  // ════════════════════════════════════════════════════

  {
    id: 57,
    title: 'Recursive CTEs — Org Charts & Hierarchies',
    titleAr: 'CTEs التكرارية — المخططات التنظيمية والتسلسلات الهرمية',
    description: 'Traverse hierarchical data like org charts and category trees using recursive CTEs.',
    descriptionAr: 'اجتَز البيانات الهرمية مثل المخططات التنظيمية وأشجار الفئات باستخدام CTEs التكرارية.',
    content: `
## The Problem with Hierarchical Data

The \`employees\` table is self-referencing: each employee has a \`manager_id\` pointing to another employee. To walk the full hierarchy, you need a **recursive CTE**.

---

## Recursive CTE Syntax

\`\`\`sql
WITH RECURSIVE cte_name AS (
  -- Anchor: starting point (e.g., top-level managers)
  SELECT ... FROM table WHERE condition

  UNION ALL

  -- Recursive: join back to the CTE itself
  SELECT ... FROM table JOIN cte_name ON ...
)
SELECT * FROM cte_name;
\`\`\`

---

## Example 1 — Full Org Chart

\`\`\`sql
WITH RECURSIVE org_chart AS (
  -- Anchor: employees with no manager (top level)
  SELECT id, name, job_title, manager_id, 0 AS depth
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive: find reports of each manager
  SELECT e.id, e.name, e.job_title, e.manager_id, oc.depth + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT
  depth,
  name,
  job_title
FROM org_chart
ORDER BY depth, name;
\`\`\`

---

## Example 2 — Org Chart with Path

\`\`\`sql
WITH RECURSIVE org_chart AS (
  SELECT id, name, manager_id, name AS path, 0 AS depth
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  SELECT e.id, e.name, e.manager_id,
         oc.path || ' → ' || e.name,
         oc.depth + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT depth, name, path
FROM org_chart
ORDER BY path;
\`\`\`

---

## Example 3 — Count Reports per Manager

\`\`\`sql
WITH RECURSIVE subordinates AS (
  SELECT id, name, manager_id, id AS root_manager
  FROM employees

  UNION ALL

  SELECT e.id, e.name, e.manager_id, s.root_manager
  FROM employees e
  JOIN subordinates s ON e.manager_id = s.id
)
SELECT
  m.name AS manager,
  COUNT(s.id) - 1 AS total_reports
FROM subordinates s
JOIN employees m ON s.root_manager = m.id
GROUP BY m.name
HAVING total_reports > 0
ORDER BY total_reports DESC;
\`\`\`
    `,
    contentAr: `
## مشكلة البيانات الهرمية

جدول \`employees\` يُشير إلى نفسه: كل موظف لديه \`manager_id\` يشير لموظف آخر. للسير في التسلسل الهرمي الكامل، تحتاج إلى **CTE تكرارية**.

---

## صياغة CTE التكرارية

\`\`\`sql
WITH RECURSIVE cte_name AS (
  -- المرساة: نقطة البداية (مثلاً المديرون الأعلى)
  SELECT ... FROM table WHERE condition

  UNION ALL

  -- التكرار: ربط الجدول بالـ CTE نفسه
  SELECT ... FROM table JOIN cte_name ON ...
)
SELECT * FROM cte_name;
\`\`\`

---

## مثال 1 — المخطط التنظيمي الكامل

\`\`\`sql
WITH RECURSIVE org_chart AS (
  -- المرساة: الموظفون بلا مدير (المستوى الأعلى)
  SELECT id, name, job_title, manager_id, 0 AS depth
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- التكرار: إيجاد مرؤوسي كل مدير
  SELECT e.id, e.name, e.job_title, e.manager_id, oc.depth + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT depth, name, job_title
FROM org_chart
ORDER BY depth, name;
\`\`\`

---

## مثال 2 — المخطط مع المسار

\`\`\`sql
WITH RECURSIVE org_chart AS (
  SELECT id, name, manager_id, name AS path, 0 AS depth
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  SELECT e.id, e.name, e.manager_id,
         oc.path || ' → ' || e.name,
         oc.depth + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT depth, name, path
FROM org_chart
ORDER BY path;
\`\`\`
    `,
    example: `WITH RECURSIVE org_chart AS (
  SELECT id, name, job_title, manager_id, 0 AS depth
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  SELECT e.id, e.name, e.job_title, e.manager_id, oc.depth + 1
  FROM employees e
  JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT depth, name, job_title
FROM org_chart
ORDER BY depth, name;`,
    exercises: [
      {
        id: 1,
        question: "Write a recursive CTE 'org_chart' that starts from employees with no manager (depth 0) and finds all their reports recursively. Show depth, name, and job_title, ordered by depth then name.",
        questionAr: "اكتب CTE تكرارية 'org_chart' تبدأ من الموظفين بلا مدير (depth 0) وتجد جميع مرؤوسيهم تكرارياً. أظهر depth وname وjob_title، مرتباً حسب depth ثم name.",
        hint: "WITH RECURSIVE org_chart AS (SELECT id, name, job_title, manager_id, 0 AS depth FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.job_title, e.manager_id, oc.depth + 1 FROM employees e JOIN org_chart oc ON e.manager_id = oc.id) SELECT depth, name, job_title FROM org_chart ORDER BY depth, name",
        hintAr: "WITH RECURSIVE org_chart AS (SELECT id, name, job_title, manager_id, 0 AS depth FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.job_title, e.manager_id, oc.depth + 1 FROM employees e JOIN org_chart oc ON e.manager_id = oc.id) SELECT depth, name, job_title FROM org_chart ORDER BY depth, name",
        expectedQuery: "WITH RECURSIVE org_chart AS (SELECT id, name, job_title, manager_id, 0 AS depth FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.job_title, e.manager_id, oc.depth + 1 FROM employees e JOIN org_chart oc ON e.manager_id = oc.id) SELECT depth, name, job_title FROM org_chart ORDER BY depth, name",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /WITH\s+RECURSIVE/i.test(q) && /UNION\s+ALL/i.test(q),
      },
      {
        id: 2,
        question: "Extend the recursive CTE to also build a 'path' column (e.g. 'CEO → Manager → Employee') using string concatenation. Show name, depth, and path, ordered by path.",
        questionAr: "وسّع CTE التكرارية لبناء عمود 'path' أيضاً (مثل 'CEO → مدير → موظف') باستخدام تسلسل النصوص. أظهر name وdepth وpath، مرتباً حسب path.",
        hint: "Add 'name AS path' in anchor, and 'oc.path || \" → \" || e.name' in recursive part",
        hintAr: "أضف 'name AS path' في المرساة، و'oc.path || \" → \" || e.name' في الجزء التكراري",
        expectedQuery: "WITH RECURSIVE org_chart AS (SELECT id, name, manager_id, name AS path, 0 AS depth FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.id, e.name, e.manager_id, oc.path || ' → ' || e.name, oc.depth + 1 FROM employees e JOIN org_chart oc ON e.manager_id = oc.id) SELECT name, depth, path FROM org_chart ORDER BY path",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /WITH\s+RECURSIVE/i.test(q) && /path/i.test(q) && /\|\|/i.test(q),
      },
    ],
  },

  {
    id: 58,
    title: 'Views — Reusable Query Logic',
    titleAr: 'Views — منطق استعلام قابل لإعادة الاستخدام',
    description: 'Create and use views to save complex queries as named virtual tables.',
    descriptionAr: 'أنشئ واستخدم views لحفظ الاستعلامات المعقدة كجداول افتراضية مُسمَّاة.',
    content: `
## What is a View?

A **view** is a saved SELECT query with a name. It acts like a table — you can query it with SELECT, filter it, and join it — but it holds no data itself. Every time you query a view, it runs the underlying query.

---

## CREATE VIEW

\`\`\`sql
CREATE VIEW employee_summary AS
SELECT
  e.id,
  e.name,
  e.job_title,
  e.salary,
  d.name AS department,
  CASE
    WHEN e.salary >= 8000 THEN 'Senior'
    WHEN e.salary >= 5000 THEN 'Mid'
    ELSE 'Junior'
  END AS grade
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.is_active = 1;
\`\`\`

Now query it like a table:

\`\`\`sql
SELECT * FROM employee_summary WHERE grade = 'Senior';
SELECT department, COUNT(*) AS headcount FROM employee_summary GROUP BY department;
\`\`\`

---

## Another Example — Monthly Revenue View

\`\`\`sql
CREATE VIEW monthly_revenue AS
SELECT
  strftime('%Y-%m', order_date) AS month,
  COUNT(*) AS order_count,
  ROUND(SUM(total_amount), 2) AS revenue
FROM orders
WHERE status <> 'cancelled'
GROUP BY month;
\`\`\`

\`\`\`sql
-- Now use it simply
SELECT * FROM monthly_revenue ORDER BY month;
SELECT AVG(revenue) AS avg_monthly FROM monthly_revenue;
\`\`\`

---

## DROP VIEW

\`\`\`sql
DROP VIEW IF EXISTS employee_summary;
DROP VIEW IF EXISTS monthly_revenue;
\`\`\`

---

## When to Use Views

| Use | Reason |
|---|---|
| Shared business logic | Everyone queries the same definition |
| Simplify complex joins | Hide 5-table JOINs behind a simple name |
| Security | Expose only certain columns to users |
| Readability | Name intermediate steps in analytics |
    `,
    contentAr: `
## ما هو الـ View؟

**الـ View** هو استعلام SELECT محفوظ بالاسم. يعمل كجدول — يمكنك الاستعلام عنه بـ SELECT وتصفيته وJOIN معه — لكنه لا يحتوي على بيانات بحد ذاته. في كل مرة تستعلم عن view، يُشغَّل الاستعلام الأساسي.

---

## CREATE VIEW

\`\`\`sql
CREATE VIEW employee_summary AS
SELECT
  e.id,
  e.name,
  e.job_title,
  e.salary,
  d.name AS department,
  CASE
    WHEN e.salary >= 8000 THEN 'Senior'
    WHEN e.salary >= 5000 THEN 'Mid'
    ELSE 'Junior'
  END AS grade
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.is_active = 1;
\`\`\`

الآن استعلم عنه كجدول:

\`\`\`sql
SELECT * FROM employee_summary WHERE grade = 'Senior';
SELECT department, COUNT(*) AS headcount FROM employee_summary GROUP BY department;
\`\`\`

---

## DROP VIEW

\`\`\`sql
DROP VIEW IF EXISTS employee_summary;
\`\`\`

---

## متى تستخدم Views؟

| الاستخدام | السبب |
|---|---|
| منطق أعمال مشترك | الجميع يستعلم عن نفس التعريف |
| تبسيط JOINs المعقدة | إخفاء 5 جداول خلف اسم بسيط |
| قابلية القراءة | تسمية الخطوات الوسيطة في التحليلات |
    `,
    example: `CREATE VIEW employee_summary AS
SELECT
  e.name, e.job_title, e.salary,
  d.name AS department,
  CASE WHEN e.salary >= 8000 THEN 'Senior'
       WHEN e.salary >= 5000 THEN 'Mid'
       ELSE 'Junior' END AS grade
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.is_active = 1;

SELECT * FROM employee_summary WHERE grade = 'Senior';`,
    exercises: [
      {
        id: 1,
        question: "Create a view called 'active_employees' that shows name, job_title, salary, and department name (from JOIN with departments) for all active employees. Then SELECT all from it ordered by salary DESC.",
        questionAr: "أنشئ view بالاسم 'active_employees' يُظهر name وjob_title وsalary واسم القسم (من JOIN مع departments) لجميع الموظفين النشطين. ثم SELECT كل شيء منه مرتباً حسب salary DESC.",
        hint: "CREATE VIEW active_employees AS SELECT e.name, e.job_title, e.salary, d.name AS department FROM employees e JOIN departments d ON e.department_id = d.id WHERE e.is_active = 1; SELECT * FROM active_employees ORDER BY salary DESC",
        hintAr: "CREATE VIEW active_employees AS SELECT e.name, e.job_title, e.salary, d.name AS department FROM employees e JOIN departments d ON e.department_id = d.id WHERE e.is_active = 1; SELECT * FROM active_employees ORDER BY salary DESC",
        expectedQuery: "CREATE VIEW active_employees AS SELECT e.name, e.job_title, e.salary, d.name AS department FROM employees e JOIN departments d ON e.department_id = d.id WHERE e.is_active = 1; SELECT * FROM active_employees ORDER BY salary DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CREATE\s+VIEW/i.test(q) && /active_employees/i.test(q),
      },
      {
        id: 2,
        question: "Create a view 'monthly_revenue' showing month (YYYY-MM), order_count, and revenue (rounded to 2 decimals) from non-cancelled orders. Then query it to find the month with the highest revenue.",
        questionAr: "أنشئ view 'monthly_revenue' يُظهر month (YYYY-MM) وorder_count وrevenue (مقرّب لخانتين) من الطلبات غير الملغاة. ثم استعلم عنه لإيجاد الشهر ذي أعلى إيراد.",
        hint: "CREATE VIEW monthly_revenue AS SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) AS order_count, ROUND(SUM(total_amount),2) AS revenue FROM orders WHERE status <> 'cancelled' GROUP BY month; SELECT * FROM monthly_revenue ORDER BY revenue DESC LIMIT 1",
        hintAr: "CREATE VIEW monthly_revenue AS SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) AS order_count, ROUND(SUM(total_amount),2) AS revenue FROM orders WHERE status <> 'cancelled' GROUP BY month; SELECT * FROM monthly_revenue ORDER BY revenue DESC LIMIT 1",
        expectedQuery: "CREATE VIEW monthly_revenue AS SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) AS order_count, ROUND(SUM(total_amount),2) AS revenue FROM orders WHERE status <> 'cancelled' GROUP BY month; SELECT * FROM monthly_revenue ORDER BY revenue DESC LIMIT 1",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CREATE\s+VIEW/i.test(q) && /monthly_revenue/i.test(q),
      },
    ],
  },

  {
    id: 59,
    title: 'Query Optimization — EXPLAIN & Indexes',
    titleAr: 'تحسين الاستعلامات — EXPLAIN والفهارس',
    description: 'Understand how SQLite executes queries, use EXPLAIN QUERY PLAN, and create indexes to speed up lookups.',
    descriptionAr: 'افهم كيف ينفّذ SQLite الاستعلامات، واستخدم EXPLAIN QUERY PLAN، وأنشئ فهارس لتسريع عمليات البحث.',
    content: `
## Why Optimization Matters

A query that works on 1,000 rows may be unusably slow on 1,000,000. Understanding how the database executes your query helps you write faster SQL.

---

## EXPLAIN QUERY PLAN

Shows how SQLite plans to execute a query — without running it:

\`\`\`sql
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE department_id = 2;
\`\`\`

Common output terms:
- **SCAN** — reads every row (slow on large tables)
- **SEARCH** — uses an index (fast)
- **USING INDEX** — confirms index usage

---

## CREATE INDEX

An index speeds up lookups on a column at the cost of slightly slower writes:

\`\`\`sql
-- Index on department_id (common filter column)
CREATE INDEX idx_emp_dept ON employees(department_id);

-- Index on order_date (common sort/filter column)
CREATE INDEX idx_order_date ON orders(order_date);

-- Composite index (when filtering on both columns together)
CREATE INDEX idx_emp_active_dept ON employees(is_active, department_id);
\`\`\`

---

## DROP INDEX

\`\`\`sql
DROP INDEX IF EXISTS idx_emp_dept;
\`\`\`

---

## Optimization Rules of Thumb

| Tip | Why |
|---|---|
| Filter early with WHERE | Reduces rows before JOIN |
| Use EXISTS instead of IN for large sets | EXISTS stops at first match |
| Avoid functions on indexed columns in WHERE | \`WHERE UPPER(name) = 'ALI'\` can't use a name index |
| SELECT only needed columns | Avoid \`SELECT *\` in production |
| Use LIMIT | Stop scanning once you have enough rows |

---

## Query Efficiency Example

\`\`\`sql
-- Slow: scans all employees, applies function per row
SELECT * FROM employees WHERE UPPER(name) LIKE 'AL%';

-- Better: use the value as-is if data is already consistent
SELECT * FROM employees WHERE name LIKE 'Al%';
\`\`\`
    `,
    contentAr: `
## لماذا يهم التحسين؟

استعلام يعمل على 1,000 صف قد يكون بطيئاً جداً على 1,000,000. فهم كيفية تنفيذ قاعدة البيانات لاستعلامك يساعدك على كتابة SQL أسرع.

---

## EXPLAIN QUERY PLAN

يُظهر كيف يخطط SQLite لتنفيذ استعلام — دون تشغيله:

\`\`\`sql
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE department_id = 2;
\`\`\`

مصطلحات الإخراج الشائعة:
- **SCAN** — يقرأ كل صف (بطيء على الجداول الكبيرة)
- **SEARCH** — يستخدم فهرساً (سريع)
- **USING INDEX** — يؤكد استخدام الفهرس

---

## CREATE INDEX

الفهرس يسرّع عمليات البحث على عمود على حساب كتابة أبطأ قليلاً:

\`\`\`sql
-- فهرس على department_id (عمود فلتر شائع)
CREATE INDEX idx_emp_dept ON employees(department_id);

-- فهرس على order_date (عمود فرز/فلتر شائع)
CREATE INDEX idx_order_date ON orders(order_date);
\`\`\`

---

## قواعد عامة للتحسين

| النصيحة | السبب |
|---|---|
| فلترة مبكرة بـ WHERE | تقليل الصفوف قبل JOIN |
| استخدم EXISTS بدل IN للمجموعات الكبيرة | EXISTS يتوقف عند أول تطابق |
| تجنب الدوال على أعمدة مفهرسة في WHERE | \`WHERE UPPER(name)\` لا يستخدم الفهرس |
| اختر الأعمدة المطلوبة فقط | تجنب \`SELECT *\` في الإنتاج |
| استخدم LIMIT | توقف بمجرد الحصول على ما يكفي |
    `,
    example: `-- Check query plan before and after indexing
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE department_id = 2;

-- Create an index
CREATE INDEX IF NOT EXISTS idx_emp_dept ON employees(department_id);

-- Check again
EXPLAIN QUERY PLAN
SELECT * FROM employees WHERE department_id = 2;`,
    exercises: [
      {
        id: 1,
        question: "Create an index called 'idx_order_date' on the order_date column of the orders table. Then run EXPLAIN QUERY PLAN on: SELECT * FROM orders WHERE order_date >= '2024-01-01'.",
        questionAr: "أنشئ فهرساً باسم 'idx_order_date' على عمود order_date في جدول orders. ثم شغّل EXPLAIN QUERY PLAN على: SELECT * FROM orders WHERE order_date >= '2024-01-01'.",
        hint: "CREATE INDEX idx_order_date ON orders(order_date); EXPLAIN QUERY PLAN SELECT * FROM orders WHERE order_date >= '2024-01-01'",
        hintAr: "CREATE INDEX idx_order_date ON orders(order_date); EXPLAIN QUERY PLAN SELECT * FROM orders WHERE order_date >= '2024-01-01'",
        expectedQuery: "CREATE INDEX IF NOT EXISTS idx_order_date ON orders(order_date); EXPLAIN QUERY PLAN SELECT * FROM orders WHERE order_date >= '2024-01-01'",
        checkFunction: (_result: unknown[], q = '') =>
          /CREATE\s+INDEX/i.test(q) && /idx_order_date/i.test(q),
      },
      {
        id: 2,
        question: "Create a composite index 'idx_emp_active_salary' on employees(is_active, salary). Then query: active employees with salary > 7000, selecting only name and salary.",
        questionAr: "أنشئ فهرساً مركّباً 'idx_emp_active_salary' على employees(is_active, salary). ثم استعلم: الموظفون النشطون الذين راتبهم > 7000، مختاراً name وsalary فقط.",
        hint: "CREATE INDEX idx_emp_active_salary ON employees(is_active, salary); SELECT name, salary FROM employees WHERE is_active = 1 AND salary > 7000 ORDER BY salary DESC",
        hintAr: "CREATE INDEX idx_emp_active_salary ON employees(is_active, salary); SELECT name, salary FROM employees WHERE is_active = 1 AND salary > 7000 ORDER BY salary DESC",
        expectedQuery: "CREATE INDEX IF NOT EXISTS idx_emp_active_salary ON employees(is_active, salary); SELECT name, salary FROM employees WHERE is_active = 1 AND salary > 7000 ORDER BY salary DESC",
        checkFunction: (result: unknown[], q = '') =>
          /CREATE\s+INDEX/i.test(q) && result.length > 0,
      },
    ],
  },

  {
    id: 60,
    title: 'Capstone — Real-World Business Report',
    titleAr: 'المشروع الختامي — تقرير أعمال واقعي',
    description: 'Combine everything: CTEs, window functions, date functions, CASE WHEN, and JOINs to build a complete business intelligence report.',
    descriptionAr: 'ادمج كل شيء: CTEs ودوال النوافذ ودوال التاريخ وCASE WHEN وJOINs لبناء تقرير ذكاء أعمال كامل.',
    content: `
## Putting It All Together

This capstone lesson challenges you to combine every technique into a single, production-quality analytical report on the Company database.

---

## Report 1 — Employee Performance Dashboard

\`\`\`sql
WITH dept_stats AS (
  SELECT
    department_id,
    ROUND(AVG(salary), 0) AS dept_avg,
    COUNT(*) AS headcount
  FROM employees
  WHERE is_active = 1
  GROUP BY department_id
),
ranked AS (
  SELECT
    e.name,
    e.job_title,
    e.salary,
    d.name AS department,
    ds.dept_avg,
    ds.headcount,
    ROUND(e.salary - ds.dept_avg, 0) AS vs_avg,
    RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS dept_rank,
    CASE
      WHEN e.salary >= ds.dept_avg * 1.2 THEN 'High Performer'
      WHEN e.salary >= ds.dept_avg * 0.9 THEN 'On Track'
      ELSE 'Below Average'
    END AS status
  FROM employees e
  JOIN departments d ON e.department_id = d.id
  JOIN dept_stats ds ON e.department_id = ds.department_id
  WHERE e.is_active = 1
)
SELECT department, name, job_title, salary, vs_avg, dept_rank, status
FROM ranked
ORDER BY department, dept_rank;
\`\`\`

---

## Report 2 — Monthly Sales Trend

\`\`\`sql
WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    COUNT(*) AS orders,
    ROUND(SUM(total_amount), 2) AS revenue
  FROM orders
  WHERE status <> 'cancelled'
  GROUP BY month
)
SELECT
  month,
  orders,
  revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
  ROUND(revenue - LAG(revenue) OVER (ORDER BY month), 2) AS change,
  ROUND(SUM(revenue) OVER (ORDER BY month ROWS UNBOUNDED PRECEDING), 2) AS cumulative
FROM monthly
ORDER BY month;
\`\`\`

---

## Report 3 — Customer Value Segmentation

\`\`\`sql
WITH customer_stats AS (
  SELECT
    c.id, c.name, c.loyalty_tier,
    COUNT(o.id) AS total_orders,
    ROUND(SUM(o.total_amount), 2) AS lifetime_value,
    MAX(o.order_date) AS last_order_date
  FROM customers c
  LEFT JOIN orders o ON c.id = o.customer_id AND o.status <> 'cancelled'
  GROUP BY c.id, c.name, c.loyalty_tier
)
SELECT
  name,
  loyalty_tier,
  total_orders,
  lifetime_value,
  last_order_date,
  NTILE(3) OVER (ORDER BY lifetime_value DESC) AS value_tier,
  CASE NTILE(3) OVER (ORDER BY lifetime_value DESC)
    WHEN 1 THEN 'VIP'
    WHEN 2 THEN 'Regular'
    ELSE 'At Risk'
  END AS segment
FROM customer_stats
ORDER BY lifetime_value DESC;
\`\`\`
    `,
    contentAr: `
## تجميع كل شيء

يتحداك هذا الدرس الختامي بدمج كل تقنية في تقرير تحليلي واحد بجودة إنتاجية على قاعدة بيانات الشركة.

---

## التقرير 1 — لوحة أداء الموظفين

\`\`\`sql
WITH dept_stats AS (
  SELECT
    department_id,
    ROUND(AVG(salary), 0) AS dept_avg,
    COUNT(*) AS headcount
  FROM employees
  WHERE is_active = 1
  GROUP BY department_id
),
ranked AS (
  SELECT
    e.name, e.job_title, e.salary,
    d.name AS department,
    ds.dept_avg,
    RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS dept_rank,
    CASE
      WHEN e.salary >= ds.dept_avg * 1.2 THEN 'أداء عالٍ'
      WHEN e.salary >= ds.dept_avg * 0.9 THEN 'على المسار'
      ELSE 'دون المتوسط'
    END AS status
  FROM employees e
  JOIN departments d ON e.department_id = d.id
  JOIN dept_stats ds ON e.department_id = ds.department_id
  WHERE e.is_active = 1
)
SELECT department, name, salary, dept_rank, status
FROM ranked
ORDER BY department, dept_rank;
\`\`\`

---

## التقرير 2 — اتجاه المبيعات الشهري

\`\`\`sql
WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    COUNT(*) AS orders,
    ROUND(SUM(total_amount), 2) AS revenue
  FROM orders
  WHERE status <> 'cancelled'
  GROUP BY month
)
SELECT
  month, orders, revenue,
  LAG(revenue) OVER (ORDER BY month) AS prev_revenue,
  ROUND(revenue - LAG(revenue) OVER (ORDER BY month), 2) AS change,
  ROUND(SUM(revenue) OVER (ORDER BY month ROWS UNBOUNDED PRECEDING), 2) AS cumulative
FROM monthly
ORDER BY month;
\`\`\`

---

## التقرير 3 — تصنيف قيمة العملاء

\`\`\`sql
WITH customer_stats AS (
  SELECT
    c.id, c.name, c.loyalty_tier,
    COUNT(o.id) AS total_orders,
    ROUND(SUM(o.total_amount), 2) AS lifetime_value
  FROM customers c
  LEFT JOIN orders o ON c.id = o.customer_id AND o.status <> 'cancelled'
  GROUP BY c.id, c.name, c.loyalty_tier
)
SELECT
  name, loyalty_tier, total_orders, lifetime_value,
  CASE NTILE(3) OVER (ORDER BY lifetime_value DESC)
    WHEN 1 THEN 'VIP'
    WHEN 2 THEN 'منتظم'
    ELSE 'في خطر'
  END AS segment
FROM customer_stats
ORDER BY lifetime_value DESC;
\`\`\`
    `,
    example: `WITH monthly AS (
  SELECT
    strftime('%Y-%m', order_date) AS month,
    COUNT(*) AS orders,
    ROUND(SUM(total_amount), 2) AS revenue
  FROM orders WHERE status <> 'cancelled'
  GROUP BY month
)
SELECT month, orders, revenue,
  ROUND(SUM(revenue) OVER (ORDER BY month ROWS UNBOUNDED PRECEDING), 2) AS cumulative
FROM monthly ORDER BY month;`,
    exercises: [
      {
        id: 1,
        question: "Write a full report: for each department, show department name, headcount (active employees), total payroll, average salary, and the highest-paid employee name. Use CTEs and GROUP BY.",
        questionAr: "اكتب تقريراً كاملاً: لكل قسم، أظهر اسم القسم وعدد الموظفين النشطين وإجمالي الرواتب ومتوسط الراتب واسم أعلى موظف راتباً. استخدم CTEs وGROUP BY.",
        hint: "WITH dept_payroll AS (SELECT department_id, COUNT(*) AS headcount, ROUND(SUM(salary),2) AS total_payroll, ROUND(AVG(salary),0) AS avg_salary FROM employees WHERE is_active=1 GROUP BY department_id), top_earner AS (SELECT department_id, name, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk FROM employees WHERE is_active=1) SELECT d.name, dp.headcount, dp.total_payroll, dp.avg_salary, te.name AS top_earner FROM departments d JOIN dept_payroll dp ON d.id=dp.department_id JOIN top_earner te ON d.id=te.department_id AND te.rnk=1 ORDER BY dp.total_payroll DESC",
        hintAr: "WITH dept_payroll AS (SELECT department_id, COUNT(*) AS headcount, ROUND(SUM(salary),2) AS total_payroll, ROUND(AVG(salary),0) AS avg_salary FROM employees WHERE is_active=1 GROUP BY department_id)... JOIN مع departments والموظف الأعلى راتباً",
        expectedQuery: "WITH dept_payroll AS (SELECT department_id, COUNT(*) AS headcount, ROUND(SUM(salary),2) AS total_payroll, ROUND(AVG(salary),0) AS avg_salary FROM employees WHERE is_active=1 GROUP BY department_id), top_earner AS (SELECT department_id, name, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk FROM employees WHERE is_active=1) SELECT d.name, dp.headcount, dp.total_payroll, dp.avg_salary, te.name AS top_earner FROM departments d JOIN dept_payroll dp ON d.id=dp.department_id JOIN top_earner te ON d.id=te.department_id AND te.rnk=1 ORDER BY dp.total_payroll DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /WITH/i.test(q) && /JOIN/i.test(q) && /GROUP\s+BY/i.test(q),
      },
      {
        id: 2,
        question: "Build a customer segmentation report: for each customer show name, lifetime_value (sum of non-cancelled orders), total_orders, and a segment label ('VIP' top third, 'Regular' middle, 'At Risk' bottom) using NTILE(3) and CASE WHEN. Order by lifetime_value DESC.",
        questionAr: "أنشئ تقرير تصنيف العملاء: لكل عميل أظهر name وlifetime_value (مجموع الطلبات غير الملغاة) وtotal_orders وتسمية segment ('VIP' الثلث الأعلى، 'Regular' الأوسط، 'At Risk' الأدنى) باستخدام NTILE(3) وCASE WHEN. رتّب حسب lifetime_value DESC.",
        hint: "WITH stats AS (SELECT c.name, COUNT(o.id) AS total_orders, ROUND(SUM(o.total_amount),2) AS lifetime_value FROM customers c LEFT JOIN orders o ON c.id=o.customer_id AND o.status<>'cancelled' GROUP BY c.id, c.name) SELECT name, lifetime_value, total_orders, CASE NTILE(3) OVER (ORDER BY lifetime_value DESC) WHEN 1 THEN 'VIP' WHEN 2 THEN 'Regular' ELSE 'At Risk' END AS segment FROM stats ORDER BY lifetime_value DESC",
        hintAr: "WITH stats AS (...LEFT JOIN orders...) SELECT name, lifetime_value, total_orders, CASE NTILE(3) OVER (...) ... AS segment FROM stats ORDER BY lifetime_value DESC",
        expectedQuery: "WITH stats AS (SELECT c.name, COUNT(o.id) AS total_orders, ROUND(SUM(o.total_amount),2) AS lifetime_value FROM customers c LEFT JOIN orders o ON c.id=o.customer_id AND o.status<>'cancelled' GROUP BY c.id, c.name) SELECT name, lifetime_value, total_orders, CASE NTILE(3) OVER (ORDER BY lifetime_value DESC) WHEN 1 THEN 'VIP' WHEN 2 THEN 'Regular' ELSE 'At Risk' END AS segment FROM stats ORDER BY lifetime_value DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /NTILE/i.test(q) && /CASE/i.test(q) && /WITH/i.test(q),
      },
    ],
  },
];
