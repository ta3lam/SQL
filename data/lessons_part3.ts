import { Lesson } from '../types';

export const lessonsP3: Lesson[] = [
  // ════════════════════════════════════════════════════
  //  LEVEL 7 — SQL FUNCTIONS
  // ════════════════════════════════════════════════════
  {
    id: 26,
    title: 'CASE WHEN',
    titleAr: 'CASE WHEN',
    description: 'Conditional logic inside SQL queries — if/else for columns and aggregates.',
    content: `
## CASE WHEN — Conditional Logic

\`CASE WHEN\` is SQL's if/else statement. It lets you return different values based on conditions, right inside a query. No procedural code needed.

---

## Searched CASE (Most Common)

\`\`\`sql
CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  ...
  ELSE default_result
END
\`\`\`

\`\`\`sql
-- Label employees by salary tier
SELECT
  name,
  salary,
  CASE
    WHEN salary >= 100000 THEN 'Executive'
    WHEN salary >= 80000  THEN 'Senior'
    WHEN salary >= 60000  THEN 'Mid-Level'
    ELSE                       'Junior'
  END AS salary_tier
FROM employees
ORDER BY salary DESC;
\`\`\`

---

## Simple CASE (Value Matching)

Cleaner when comparing one column to multiple values:

\`\`\`sql
-- Simple CASE: compare one column to values
SELECT
  id,
  status,
  CASE status
    WHEN 'pending'    THEN '⏳ Waiting'
    WHEN 'processing' THEN '🔄 In Progress'
    WHEN 'shipped'    THEN '📦 On the Way'
    WHEN 'delivered'  THEN '✅ Complete'
    WHEN 'cancelled'  THEN '❌ Cancelled'
    ELSE                   '❓ Unknown'
  END AS status_label
FROM orders;
\`\`\`

---

## CASE in WHERE

\`\`\`sql
-- Dynamic filter: return all orders if status is NULL, otherwise filter
SELECT * FROM orders
WHERE status = CASE
  WHEN 1 = 1 THEN 'delivered'  -- always applies here, but useful with parameters
  ELSE status
END;
\`\`\`

---

## CASE in ORDER BY

\`\`\`sql
-- Custom sort order: pending first, then processing, then others
SELECT id, status, order_date
FROM orders
ORDER BY
  CASE status
    WHEN 'pending'    THEN 1
    WHEN 'processing' THEN 2
    WHEN 'shipped'    THEN 3
    WHEN 'delivered'  THEN 4
    ELSE                   5
  END,
  order_date DESC;
\`\`\`

---

## CASE with Aggregates (Pivot)

Transform rows into columns — a very powerful pattern:

\`\`\`sql
-- Count orders by status in a single row (pivot)
SELECT
  COUNT(CASE WHEN status = 'pending'    THEN 1 END) AS pending,
  COUNT(CASE WHEN status = 'processing' THEN 1 END) AS processing,
  COUNT(CASE WHEN status = 'shipped'    THEN 1 END) AS shipped,
  COUNT(CASE WHEN status = 'delivered'  THEN 1 END) AS delivered,
  COUNT(CASE WHEN status = 'cancelled'  THEN 1 END) AS cancelled,
  COUNT(*) AS total
FROM orders;
\`\`\`

\`\`\`sql
-- Revenue by quarter in one row
SELECT
  ROUND(SUM(CASE WHEN order_date LIKE '2024-01%' THEN total_amount ELSE 0 END), 2) AS q1,
  ROUND(SUM(CASE WHEN order_date LIKE '2024-02%' THEN total_amount ELSE 0 END), 2) AS q2_feb,
  ROUND(SUM(CASE WHEN order_date LIKE '2024-03%' THEN total_amount ELSE 0 END), 2) AS q2_mar,
  ROUND(SUM(CASE WHEN order_date LIKE '2024-04%' THEN total_amount ELSE 0 END), 2) AS q3_apr
FROM orders
WHERE status = 'delivered';
\`\`\`

---

## CASE for Data Cleaning

\`\`\`sql
-- Normalize inconsistent data
SELECT
  name,
  CASE UPPER(loyalty_tier)
    WHEN 'GOLD'   THEN 'Gold'
    WHEN 'SILVER' THEN 'Silver'
    WHEN 'BRONZE' THEN 'Bronze'
    ELSE 'Unknown'
  END AS normalized_tier
FROM customers;

-- Replace NULL email with a generated placeholder
SELECT
  name,
  CASE
    WHEN email IS NULL THEN LOWER(REPLACE(name, ' ', '.')) || '@noemail.com'
    ELSE email
  END AS effective_email
FROM employees;
\`\`\`

---

## Nested CASE (Use Sparingly)

\`\`\`sql
SELECT
  name,
  department_id,
  salary,
  CASE
    WHEN department_id = 1 THEN
      CASE
        WHEN salary > 100000 THEN 'Senior Eng'
        ELSE 'Engineer'
      END
    WHEN department_id = 3 THEN 'Sales'
    ELSE 'Other'
  END AS role_category
FROM employees;
\`\`\`

Keep nesting shallow. Deeply nested CASE statements are hard to maintain.
    `,
    example: `-- Comprehensive employee classification
SELECT
  name,
  job_title,
  salary,
  CASE
    WHEN salary >= 100000 THEN 'Executive ($100k+)'
    WHEN salary >= 80000  THEN 'Senior ($80-100k)'
    WHEN salary >= 65000  THEN 'Mid-Level ($65-80k)'
    ELSE                       'Junior (< $65k)'
  END AS band,
  CASE
    WHEN is_active = 1 THEN 'Active'
    ELSE 'Inactive'
  END AS status
FROM employees
ORDER BY salary DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Add a column "price_category" to a products query: "Budget" for price < 50, "Standard" for 50-199, "Premium" for 200+.',
        hint: "CASE WHEN price < 50 THEN 'Budget' WHEN price < 200 THEN 'Standard' ELSE 'Premium' END",
        expectedQuery: "SELECT name, price, CASE WHEN price < 50 THEN 'Budget' WHEN price < 200 THEN 'Standard' ELSE 'Premium' END AS price_category FROM products",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Count how many customers are in each loyalty tier using CASE WHEN inside COUNT (pivot-style: one row with three columns: gold_count, silver_count, bronze_count).',
        hint: "COUNT(CASE WHEN loyalty_tier = 'Gold' THEN 1 END) AS gold_count, ...",
        expectedQuery: "SELECT COUNT(CASE WHEN loyalty_tier = 'Gold' THEN 1 END) AS gold_count, COUNT(CASE WHEN loyalty_tier = 'Silver' THEN 1 END) AS silver_count, COUNT(CASE WHEN loyalty_tier = 'Bronze' THEN 1 END) AS bronze_count FROM customers",
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 27,
    title: 'String Functions',
    titleAr: 'String Functions',
    description: 'LENGTH, UPPER, LOWER, SUBSTR, REPLACE, TRIM, INSTR, PRINTF — full string toolkit.',
    content: `
## String Functions in SQLite

String manipulation is essential for cleaning data, formatting output, and building search logic.

---

## LENGTH

Returns the number of characters in a string.

\`\`\`sql
SELECT LENGTH('Hello');           -- 5
SELECT LENGTH(name) FROM employees;

-- Find employees with long names (potential data entry errors)
SELECT name, LENGTH(name) AS name_length
FROM employees
WHERE LENGTH(name) > 15
ORDER BY name_length DESC;

-- LENGTH on NULL returns NULL
SELECT LENGTH(NULL);  -- NULL
\`\`\`

---

## UPPER / LOWER

Convert to uppercase or lowercase.

\`\`\`sql
SELECT UPPER('hello world');  -- 'HELLO WORLD'
SELECT LOWER('ALICE');        -- 'alice'

-- Case-insensitive search
SELECT * FROM employees
WHERE LOWER(name) LIKE '%alice%';

-- Normalize for display
SELECT UPPER(name) AS name_upper FROM customers;
\`\`\`

---

## SUBSTR (Substring)

Extract a portion of a string.

\`\`\`sql
SUBSTR(string, start, length)
-- start is 1-based (first character = position 1)
-- length is optional — goes to end if omitted

SELECT SUBSTR('Hello World', 1, 5);   -- 'Hello'
SELECT SUBSTR('Hello World', 7);       -- 'World'
SELECT SUBSTR('Hello World', -5);      -- 'World' (from end in some databases)

-- Extract year from date string '2024-01-15'
SELECT name, SUBSTR(hire_date, 1, 4) AS hire_year
FROM employees;

-- Extract month
SELECT SUBSTR(order_date, 6, 2) AS month FROM orders;

-- Extract domain from email
SELECT email, SUBSTR(email, INSTR(email, '@') + 1) AS domain
FROM employees
WHERE email IS NOT NULL;
\`\`\`

---

## REPLACE

Replace all occurrences of a substring.

\`\`\`sql
REPLACE(string, search, replacement)

SELECT REPLACE('Hello World', 'World', 'SQL');  -- 'Hello SQL'

-- Normalize phone formats
SELECT REPLACE(REPLACE(phone, '-', ''), ' ', '') AS normalized_phone
FROM customers;

-- Clean up job titles
SELECT REPLACE(job_title, 'VP of ', '') AS short_title
FROM employees
WHERE job_title LIKE 'VP%';

-- Remove special characters
SELECT REPLACE(name, '.', '') AS clean_name FROM customers;
\`\`\`

---

## TRIM, LTRIM, RTRIM

Remove leading/trailing whitespace or specific characters.

\`\`\`sql
SELECT TRIM('   hello world   ');        -- 'hello world'
SELECT LTRIM('   hello');                -- 'hello' (left trim)
SELECT RTRIM('hello   ');                -- 'hello' (right trim)
SELECT TRIM('***hello***', '*');         -- 'hello' (remove specific char)

-- Clean up messy data
SELECT TRIM(name) AS clean_name FROM employees;

-- Useful when importing data from CSV files with extra spaces
\`\`\`

---

## INSTR — Find Position of Substring

\`\`\`sql
INSTR(string, substring)
-- Returns position of first occurrence (1-based), or 0 if not found

SELECT INSTR('Hello World', 'World');   -- 7
SELECT INSTR('alice@company.com', '@'); -- 6

-- Find the @ position in emails
SELECT email, INSTR(email, '@') AS at_position
FROM employees
WHERE email IS NOT NULL;

-- Extract username from email (everything before @)
SELECT
  email,
  SUBSTR(email, 1, INSTR(email, '@') - 1) AS username
FROM employees
WHERE email IS NOT NULL;
\`\`\`

---

## Concatenation with ||

\`\`\`sql
-- Build full display strings
SELECT first_name || ' ' || last_name AS full_name FROM users;
SELECT name || ' ($' || price || ')' AS label FROM products;

-- Build email from name
SELECT LOWER(REPLACE(name, ' ', '.')) || '@company.com' AS generated_email
FROM employees
WHERE email IS NULL;
\`\`\`

---

## PRINTF / FORMAT

Formatted strings (like C's printf):

\`\`\`sql
-- Format salary with commas and currency
SELECT name, PRINTF('$%.2f', salary) AS formatted_salary
FROM employees;

SELECT PRINTF('%05d', 42);          -- '00042' (zero-padded)
SELECT PRINTF('%.3f', 3.14159);     -- '3.142' (3 decimal places)
SELECT PRINTF('%10s', 'hi');        -- '        hi' (right-padded to 10)
\`\`\`

---

## Putting It All Together

\`\`\`sql
-- Build a formatted employee directory
SELECT
  UPPER(SUBSTR(name, 1, 1)) || LOWER(SUBSTR(name, 2)) AS formatted_name,
  LOWER(REPLACE(name, ' ', '.')) || '@company.com'    AS email_suggestion,
  PRINTF('$%,.0f', salary)                             AS formatted_salary,
  SUBSTR(hire_date, 1, 4)                              AS year_hired
FROM employees
WHERE email IS NULL
ORDER BY name;
\`\`\`
    `,
    example: `-- Extract useful parts from strings
SELECT
  name,
  LENGTH(name)                             AS name_length,
  UPPER(SUBSTR(name, 1, 1))               AS first_initial,
  SUBSTR(hire_date, 1, 4)                  AS hire_year,
  COALESCE(
    SUBSTR(email, 1, INSTR(email,'@')-1),
    'no-email'
  )                                        AS email_username
FROM employees
ORDER BY hire_year DESC
LIMIT 10;`,
    exercises: [
      {
        id: 1,
        question: 'Show all employee names in UPPERCASE and the length of their name.',
        hint: 'SELECT UPPER(name), LENGTH(name) FROM employees',
        expectedQuery: 'SELECT UPPER(name) AS name_upper, LENGTH(name) AS name_length FROM employees',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Extract the year from hire_date for all employees. Show name and hire_year.',
        hint: "SUBSTR(hire_date, 1, 4) AS hire_year",
        expectedQuery: "SELECT name, SUBSTR(hire_date, 1, 4) AS hire_year FROM employees",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'For all employees WITH an email, extract only the username part (before the @). Show name and username.',
        hint: "SUBSTR(email, 1, INSTR(email,'@')-1)",
        expectedQuery: "SELECT name, SUBSTR(email, 1, INSTR(email, '@') - 1) AS username FROM employees WHERE email IS NOT NULL",
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 28,
    title: 'Date & Time Functions',
    titleAr: 'Date & Time Functions',
    description: 'Work with dates in SQLite using strftime, date(), datetime(), and julianday().',
    content: `
## Date & Time in SQLite

SQLite stores dates as TEXT (ISO 8601: \`'YYYY-MM-DD'\`) or REAL (Julian Day Number) or INTEGER (Unix timestamp). The built-in date functions handle all three formats.

---

## Current Date/Time

\`\`\`sql
SELECT date('now');                   -- Current date: '2024-07-15'
SELECT time('now');                   -- Current time: '14:30:22'
SELECT datetime('now');               -- Current datetime: '2024-07-15 14:30:22'
SELECT strftime('%s', 'now');         -- Unix timestamp (seconds since 1970-01-01)
SELECT julianday('now');              -- Julian day number (2460507.1...)
\`\`\`

---

## strftime — The Swiss Army Knife of SQLite Dates

\`strftime(format, date)\` formats a date using format codes:

| Code | Meaning | Example |
|------|---------|---------|
| \`%Y\` | 4-digit year | 2024 |
| \`%m\` | Month (01-12) | 07 |
| \`%d\` | Day (01-31) | 15 |
| \`%H\` | Hour (00-23) | 14 |
| \`%M\` | Minute (00-59) | 30 |
| \`%S\` | Second (00-59) | 22 |
| \`%w\` | Day of week (0=Sunday) | 1 |
| \`%j\` | Day of year (001-366) | 197 |
| \`%W\` | Week number (00-53) | 28 |

\`\`\`sql
-- Extract parts from hire_date
SELECT
  name,
  hire_date,
  strftime('%Y', hire_date) AS year,
  strftime('%m', hire_date) AS month,
  strftime('%d', hire_date) AS day
FROM employees;

-- Group orders by month
SELECT
  strftime('%Y-%m', order_date) AS year_month,
  COUNT(*) AS orders,
  ROUND(SUM(total_amount), 2) AS revenue
FROM orders
GROUP BY strftime('%Y-%m', order_date)
ORDER BY year_month;

-- Orders on a specific weekday (0=Sunday, 1=Monday, etc.)
SELECT * FROM orders
WHERE strftime('%w', order_date) = '1';  -- Mondays only
\`\`\`

---

## Date Arithmetic with Modifiers

\`date()\` and \`datetime()\` accept modifiers like \`'+N days'\`:

\`\`\`sql
-- Yesterday and tomorrow
SELECT date('now', '-1 day')  AS yesterday;
SELECT date('now', '+1 day')  AS tomorrow;

-- 30 days from now
SELECT date('now', '+30 days') AS due_date;

-- First day of this month
SELECT date('now', 'start of month') AS month_start;

-- Last day of this month
SELECT date('now', 'start of month', '+1 month', '-1 day') AS month_end;

-- First day of this year
SELECT date('now', 'start of year') AS year_start;

-- Three months ago
SELECT date('now', '-3 months') AS three_months_ago;
\`\`\`

---

## Calculating Date Differences

SQLite doesn't have a DATEDIFF() function. Use julianday():

\`\`\`sql
-- Days since each employee was hired
SELECT
  name,
  hire_date,
  CAST(julianday('now') - julianday(hire_date) AS INTEGER) AS days_employed,
  ROUND((julianday('now') - julianday(hire_date)) / 365.25, 1) AS years_employed
FROM employees
ORDER BY days_employed DESC;

-- Days between order date and today
SELECT
  id,
  order_date,
  status,
  CAST(julianday('now') - julianday(order_date) AS INTEGER) AS days_ago
FROM orders
ORDER BY days_ago DESC;

-- Age in years (for hire date)
SELECT
  name,
  hire_date,
  CAST((julianday('now') - julianday(hire_date)) / 365.25 AS INTEGER) AS years
FROM employees;
\`\`\`

---

## Filtering by Date Ranges

\`\`\`sql
-- Orders from the last 30 days
SELECT * FROM orders
WHERE order_date >= date('now', '-30 days');

-- Employees hired in the last 3 years
SELECT name, hire_date FROM employees
WHERE hire_date >= date('now', '-3 years')
ORDER BY hire_date DESC;

-- Current month's orders
SELECT * FROM orders
WHERE strftime('%Y-%m', order_date) = strftime('%Y-%m', 'now');

-- Orders from a specific month
SELECT * FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-01';
\`\`\`

---

## Date Functions in Other Databases

| Goal | SQLite | PostgreSQL | MySQL |
|------|--------|-----------|-------|
| Current date | \`date('now')\` | \`CURRENT_DATE\` | \`CURDATE()\` |
| Extract year | \`strftime('%Y', d)\` | \`EXTRACT(YEAR FROM d)\` | \`YEAR(d)\` |
| Date diff (days) | \`julianday(a)-julianday(b)\` | \`a - b\` | \`DATEDIFF(a,b)\` |
| Add days | \`date(d, '+N days')\` | \`d + INTERVAL 'N days'\` | \`DATE_ADD(d, INTERVAL N DAY)\` |
    `,
    example: `-- Tenure analysis: how long has each employee been with the company?
SELECT
  name,
  hire_date,
  ROUND((julianday('now') - julianday(hire_date)) / 365.25, 1) AS years_at_company,
  CASE
    WHEN (julianday('now') - julianday(hire_date)) / 365.25 >= 7 THEN 'Veteran (7+ years)'
    WHEN (julianday('now') - julianday(hire_date)) / 365.25 >= 3 THEN 'Established (3-7 years)'
    ELSE 'Recent hire (< 3 years)'
  END AS tenure_tier
FROM employees
WHERE is_active = 1
ORDER BY years_at_company DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Extract the year and month from order_date for all orders, and count orders per year-month.',
        hint: "strftime('%Y-%m', order_date) for grouping",
        expectedQuery: "SELECT strftime('%Y-%m', order_date) AS year_month, COUNT(*) AS order_count FROM orders GROUP BY strftime('%Y-%m', order_date) ORDER BY year_month",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find employees hired before 2019 and calculate how many years they have worked (round to 1 decimal).',
        hint: "ROUND((julianday('now') - julianday(hire_date)) / 365.25, 1)",
        expectedQuery: "SELECT name, hire_date, ROUND((julianday('now') - julianday(hire_date)) / 365.25, 1) AS years FROM employees WHERE hire_date < '2019-01-01' ORDER BY years DESC",
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 29,
    title: 'COALESCE, NULLIF, IIF',
    titleAr: 'COALESCE, NULLIF, IIF',
    description: 'Handle NULLs elegantly and write compact conditional expressions.',
    content: `
## COALESCE — Return First Non-NULL

\`COALESCE(val1, val2, ..., valN)\` evaluates arguments left to right and returns the **first non-NULL** value. If all arguments are NULL, returns NULL.

\`\`\`sql
-- Basic usage
SELECT COALESCE(NULL, NULL, 'third', 'fourth');  -- 'third'
SELECT COALESCE(NULL, 5);                         -- 5
SELECT COALESCE(10, 5);                           -- 10 (first is non-NULL)

-- Replace NULL email with a placeholder
SELECT name, COALESCE(email, 'not-provided') AS email
FROM employees;

-- Replace NULL phone with 'N/A'
SELECT name, COALESCE(phone, 'N/A') AS phone
FROM customers;

-- Use actual values with fallback chain
SELECT
  name,
  COALESCE(email, name || '@noemail.com', 'unknown') AS contact
FROM employees;

-- Avoid division by zero
SELECT
  total_amount,
  COALESCE(total_amount, 0) / COALESCE(quantity, 1) AS unit_value
FROM orders;
\`\`\`

---

## COALESCE in Calculations

\`\`\`sql
-- Sum including NULL values treated as 0
SELECT
  SUM(COALESCE(total_amount, 0)) AS total_including_nulls
FROM orders;

-- Average where NULLs should be treated as 0
SELECT
  AVG(COALESCE(total_amount, 0)) AS avg_with_zeros,
  AVG(total_amount)              AS avg_ignoring_nulls
FROM orders;
-- These will differ if any total_amount values are NULL

-- COALESCE in GROUP BY (group NULLs under 'Unassigned')
SELECT
  COALESCE(department_id, -1) AS dept_id,
  COUNT(*) AS employees
FROM employees
GROUP BY COALESCE(department_id, -1);
\`\`\`

---

## NULLIF — Convert a Value to NULL

\`NULLIF(a, b)\` returns NULL if \`a = b\`, otherwise returns \`a\`. This is the inverse of COALESCE.

Primary use: **avoid division by zero**

\`\`\`sql
-- NULLIF(x, 0) returns NULL if x is 0, else returns x
SELECT 100 / NULLIF(0, 0);   -- NULL (no division by zero error!)
SELECT 100 / NULLIF(5, 0);   -- 20

-- Safe division: calculate average items per order
SELECT
  order_id,
  SUM(quantity) AS total_items,
  SUM(unit_price) AS total_price,
  SUM(unit_price) / NULLIF(SUM(quantity), 0) AS avg_item_price
FROM order_items
GROUP BY order_id;

-- Convert 'N/A' strings to NULL
SELECT
  name,
  NULLIF(phone, 'N/A') AS phone_cleaned
FROM customers;

-- NULLIF to find rows where two columns match (returns NULL when equal)
SELECT name, salary, NULLIF(salary, 75000) AS salary_if_not_75k
FROM employees;
\`\`\`

---

## IIF — Compact IF/ELSE

\`IIF(condition, true_value, false_value)\` — a shorthand for simple CASE WHEN:

\`\`\`sql
-- Equivalent to: CASE WHEN is_active = 1 THEN 'Active' ELSE 'Inactive' END
SELECT name, IIF(is_active = 1, 'Active', 'Inactive') AS status
FROM employees;

-- IIF for binary categorization
SELECT
  name,
  salary,
  IIF(salary > 80000, 'High', 'Standard') AS pay_grade
FROM employees;

-- IIF with NULL
SELECT IIF(NULL, 'yes', 'no');   -- 'no' (NULL is falsy in IIF)
SELECT IIF(0, 'yes', 'no');      -- 'no'
SELECT IIF(1, 'yes', 'no');      -- 'yes'
\`\`\`

---

## Choosing Between CASE, IIF, and COALESCE

| Scenario | Best Tool |
|----------|-----------|
| Replace NULL with a value | \`COALESCE\` |
| Multiple conditions | \`CASE WHEN\` |
| Simple binary condition | \`IIF\` |
| Convert specific value to NULL | \`NULLIF\` |
| Avoid division by zero | \`NULLIF\` |
| First non-null from a list | \`COALESCE\` |

\`\`\`sql
-- All four working together
SELECT
  name,
  COALESCE(email, 'no-email')     AS email,
  IIF(is_active = 1, '✅', '❌')  AS active,
  CASE
    WHEN salary > 100000 THEN 'Exec'
    WHEN salary > 70000  THEN 'Senior'
    ELSE 'Standard'
  END AS band,
  ROUND(salary / NULLIF(12, 0), 2) AS monthly
FROM employees;
\`\`\`
    `,
    example: `-- Safe revenue analysis avoiding nulls and division-by-zero
SELECT
  o.id,
  COALESCE(c.name, 'Unknown Customer')    AS customer,
  COALESCE(o.total_amount, 0)             AS order_total,
  COUNT(oi.id)                            AS line_items,
  ROUND(
    COALESCE(o.total_amount, 0) / NULLIF(COUNT(oi.id), 0),
    2
  )                                       AS avg_item_value,
  IIF(o.total_amount > 500, 'Large', 'Standard') AS order_size
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id
ORDER BY order_total DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Show all employees with their email, replacing NULL emails with "no-email@company.com" using COALESCE.',
        hint: "COALESCE(email, 'no-email@company.com')",
        expectedQuery: "SELECT name, COALESCE(email, 'no-email@company.com') AS email FROM employees",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Show employee names and a "status" column using IIF: "Active" if is_active=1, "Inactive" otherwise.',
        hint: "IIF(is_active = 1, 'Active', 'Inactive') AS status",
        expectedQuery: "SELECT name, IIF(is_active = 1, 'Active', 'Inactive') AS status FROM employees",
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 8 — SUBQUERIES
  // ════════════════════════════════════════════════════
  {
    id: 30,
    title: 'Scalar Subqueries',
    titleAr: 'Scalar Subqueries',
    description: 'Subqueries that return a single value — use them in SELECT, WHERE, and HAVING.',
    content: `
## What is a Subquery?

A **subquery** (also called an inner query or nested query) is a SQL query nested inside another query. The outer query uses the result of the inner query.

Subqueries can appear in:
- \`WHERE\` — filter based on a computed value
- \`SELECT\` — as a computed column
- \`FROM\` — as a virtual table (derived table)
- \`HAVING\` — filter groups based on a computed value

---

## Scalar Subquery — Returns One Value

A scalar subquery returns exactly **one row, one column**. It can be used anywhere a single value is expected.

\`\`\`sql
-- Find employees who earn above the company average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- The subquery runs first: SELECT AVG(salary) FROM employees → 78560
-- Then the outer query: WHERE salary > 78560
\`\`\`

---

## Scalar Subqueries in WHERE

\`\`\`sql
-- Employees earning more than Alice Johnson
SELECT name, salary
FROM employees
WHERE salary > (
  SELECT salary FROM employees WHERE name = 'Alice Johnson'
);

-- Orders above the average order value
SELECT id, customer_id, total_amount
FROM orders
WHERE total_amount > (SELECT AVG(total_amount) FROM orders);

-- Products cheaper than the average price in their whole table
SELECT name, price
FROM products
WHERE price < (SELECT AVG(price) FROM products)
  AND is_available = 1
ORDER BY price;

-- Employees in the department with the highest total payroll
SELECT name, department_id, salary
FROM employees
WHERE department_id = (
  SELECT department_id
  FROM employees
  GROUP BY department_id
  ORDER BY SUM(salary) DESC
  LIMIT 1
);
\`\`\`

---

## Scalar Subqueries in SELECT

Return a single computed value as a column in every row:

\`\`\`sql
-- Each employee's salary vs company average
SELECT
  name,
  salary,
  (SELECT AVG(salary) FROM employees)          AS company_avg,
  salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg,
  ROUND(salary / (SELECT AVG(salary) FROM employees) * 100, 1) AS pct_of_avg
FROM employees
ORDER BY salary DESC;

-- Each order's value vs the average order value
SELECT
  id,
  total_amount,
  (SELECT ROUND(AVG(total_amount), 2) FROM orders) AS avg_order,
  total_amount - (SELECT AVG(total_amount) FROM orders) AS diff
FROM orders
ORDER BY diff DESC;
\`\`\`

---

## Scalar Subqueries in HAVING

\`\`\`sql
-- Departments where average salary exceeds the overall company average
SELECT
  department_id,
  ROUND(AVG(salary), 0) AS dept_avg
FROM employees
GROUP BY department_id
HAVING AVG(salary) > (SELECT AVG(salary) FROM employees)
ORDER BY dept_avg DESC;
\`\`\`

---

## When Scalar Subqueries Fail

A scalar subquery MUST return exactly one row. If it returns more or fewer, you get an error:

\`\`\`sql
-- ❌ Error: this might return multiple rows if multiple employees have max salary
SELECT name FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees WHERE department_id = 1);
-- MAX() always returns one row — this is fine ✅

-- ❌ REAL error: returns multiple rows
SELECT name FROM employees
WHERE salary = (SELECT salary FROM employees WHERE department_id = 1);
-- Multiple employees in department 1 → error!

-- ✅ Fix with LIMIT 1 or by using IN instead
SELECT name FROM employees
WHERE salary IN (SELECT salary FROM employees WHERE department_id = 1);
\`\`\`
    `,
    example: `-- Salary intelligence dashboard
SELECT
  name,
  department_id,
  salary,
  ROUND((SELECT AVG(salary) FROM employees), 0)             AS company_avg,
  salary - (SELECT AVG(salary) FROM employees)              AS vs_company_avg,
  CASE
    WHEN salary > (SELECT AVG(salary) FROM employees) * 1.2 THEN '⬆️ Well above avg'
    WHEN salary > (SELECT AVG(salary) FROM employees)       THEN '↑ Above avg'
    WHEN salary < (SELECT AVG(salary) FROM employees) * 0.8 THEN '⬇️ Below avg'
    ELSE                                                         '↓ Slightly below'
  END AS vs_avg_label
FROM employees
WHERE is_active = 1
ORDER BY salary DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Find all employees whose salary is above the average salary of all employees.',
        hint: 'WHERE salary > (SELECT AVG(salary) FROM employees)',
        expectedQuery: 'SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Show each product with its price and the average price of all products (as a column avg_price).',
        hint: '(SELECT ROUND(AVG(price), 2) FROM products) AS avg_price',
        expectedQuery: 'SELECT name, price, (SELECT ROUND(AVG(price), 2) FROM products) AS avg_price FROM products',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 31,
    title: 'IN / NOT IN with Subqueries',
    titleAr: 'IN / NOT IN with Subqueries',
    description: 'Use subqueries that return a list of values to filter rows.',
    content: `
## IN with Subqueries — Multi-Row Results

When you need to filter against a dynamically computed list (not a hardcoded one), use a subquery inside \`IN\`.

\`\`\`sql
-- Find customers who have placed at least one order
SELECT name, email, loyalty_tier
FROM customers
WHERE id IN (
  SELECT DISTINCT customer_id
  FROM orders
);
-- The subquery returns a list of customer IDs that have orders
-- The outer query returns customers whose ID is in that list
\`\`\`

---

## IN Subquery Examples

\`\`\`sql
-- Employees in departments with budget over $400k
SELECT name, department_id, salary
FROM employees
WHERE department_id IN (
  SELECT id
  FROM departments
  WHERE budget > 400000
);

-- Products that have been ordered at least once
SELECT name, price, stock_quantity
FROM products
WHERE id IN (
  SELECT DISTINCT product_id
  FROM order_items
);

-- Customers who have ordered a 'Laptop' product
SELECT name
FROM customers
WHERE id IN (
  SELECT DISTINCT o.customer_id
  FROM orders o
  JOIN order_items oi ON o.id = oi.order_id
  JOIN products p ON oi.product_id = p.id
  WHERE p.name LIKE '%Laptop%'
);

-- Employees who manage other employees (are a manager)
SELECT name, job_title
FROM employees
WHERE id IN (
  SELECT DISTINCT manager_id
  FROM employees
  WHERE manager_id IS NOT NULL
);
\`\`\`

---

## NOT IN with Subqueries — Exclusion

\`\`\`sql
-- Customers who have NEVER placed an order
SELECT name, email
FROM customers
WHERE id NOT IN (
  SELECT DISTINCT customer_id
  FROM orders
);

-- Products that have NEVER been ordered
SELECT name, price
FROM products
WHERE id NOT IN (
  SELECT DISTINCT product_id
  FROM order_items
);

-- Employees who are NOT managers
SELECT name, job_title
FROM employees
WHERE id NOT IN (
  SELECT DISTINCT manager_id
  FROM employees
  WHERE manager_id IS NOT NULL
)
AND is_active = 1;
\`\`\`

---

## ⚠️ The NULL Trap with NOT IN

This is one of SQL's most dangerous pitfalls:

\`\`\`sql
-- If the subquery returns ANY NULL, NOT IN returns ZERO rows!
SELECT name
FROM customers
WHERE id NOT IN (
  SELECT customer_id   -- ⚠️ If any customer_id is NULL here!
  FROM orders
);
-- SQL evaluates: id NOT IN (1, 2, NULL, 3, ...)
-- "id <> NULL" is NULL (not TRUE) → no rows pass!

-- ✅ Safe fix: filter NULLs from the subquery
SELECT name
FROM customers
WHERE id NOT IN (
  SELECT customer_id
  FROM orders
  WHERE customer_id IS NOT NULL  -- ← add this!
);

-- ✅ Alternative: use NOT EXISTS (always safe with NULLs)
SELECT name
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);
-- We'll cover EXISTS in the next lesson
\`\`\`

---

## IN vs JOIN — When to Use Which

\`\`\`sql
-- IN subquery: clear intent, good for "is this ID in a set?"
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE status = 'delivered');

-- JOIN: better when you need columns from both tables
SELECT c.name, COUNT(o.id) AS orders
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'delivered'
GROUP BY c.id, c.name;

-- Performance: modern databases optimize both similarly
-- Use whichever reads more clearly for your use case
\`\`\`
    `,
    example: `-- Find customers who ordered products from the Electronics category
SELECT DISTINCT c.name, c.loyalty_tier, c.country
FROM customers c
WHERE c.id IN (
  SELECT o.customer_id
  FROM orders o
  JOIN order_items oi ON o.id = oi.order_id
  JOIN products p ON oi.product_id = p.id
  JOIN categories cat ON p.category_id = cat.id
  WHERE cat.name = 'Electronics'
    AND o.status <> 'cancelled'
)
ORDER BY c.loyalty_tier, c.name;`,
    exercises: [
      {
        id: 1,
        question: 'Find all employees who work in departments located in "Building A" (using IN with a subquery).',
        hint: "WHERE department_id IN (SELECT id FROM departments WHERE location = 'Building A')",
        expectedQuery: "SELECT name, department_id FROM employees WHERE department_id IN (SELECT id FROM departments WHERE location = 'Building A')",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all products that have NEVER been ordered (using NOT IN with a subquery on order_items).',
        hint: 'WHERE id NOT IN (SELECT DISTINCT product_id FROM order_items)',
        expectedQuery: 'SELECT name, price FROM products WHERE id NOT IN (SELECT DISTINCT product_id FROM order_items)',
        checkFunction: (result) => result.length >= 0,
      },
    ],
  },

  {
    id: 32,
    title: 'EXISTS / NOT EXISTS',
    titleAr: 'EXISTS / NOT EXISTS',
    description: 'Test for row existence — safer than IN/NOT IN and often faster on large datasets.',
    content: `
## EXISTS

\`EXISTS\` checks whether a subquery returns **at least one row**. It returns TRUE if any row exists, FALSE if none do. It doesn't care about values — just existence.

\`\`\`sql
SELECT columns FROM table
WHERE EXISTS (
  subquery that references the outer table
);
\`\`\`

---

## EXISTS vs IN — Key Differences

| Feature | IN | EXISTS |
|---------|-----|--------|
| NULL safety | ❌ Unsafe in NOT IN | ✅ Always safe |
| Performance (large sets) | Can be slow | Often faster |
| Returns | Actual values | Just TRUE/FALSE |
| Stops at first match | ❌ No | ✅ Yes (short-circuit) |

---

## EXISTS Examples

\`\`\`sql
-- Customers who have placed at least one order
SELECT c.name, c.email
FROM customers c
WHERE EXISTS (
  SELECT 1              -- '1' is conventional — the value doesn't matter
  FROM orders o
  WHERE o.customer_id = c.id  -- correlated: references outer 'c'
);

-- Departments that have at least one employee
SELECT d.name
FROM departments d
WHERE EXISTS (
  SELECT 1
  FROM employees e
  WHERE e.department_id = d.id
    AND e.is_active = 1
);

-- Products that have been ordered in the last 60 days
SELECT p.name, p.price
FROM products p
WHERE EXISTS (
  SELECT 1
  FROM order_items oi
  JOIN orders o ON oi.order_id = o.id
  WHERE oi.product_id = p.id
    AND o.order_date >= date('now', '-60 days')
);
\`\`\`

---

## NOT EXISTS — Safe Exclusion

NOT EXISTS is the safe alternative to NOT IN when NULLs might be present:

\`\`\`sql
-- Customers who have NEVER placed an order
-- (100% safe, even if customer_id could be NULL in orders)
SELECT c.name, c.email, c.joined_date
FROM customers c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
);

-- Products that have never been ordered
SELECT p.name, p.price
FROM products p
WHERE NOT EXISTS (
  SELECT 1
  FROM order_items oi
  WHERE oi.product_id = p.id
);

-- Employees with no direct reports
SELECT e.name, e.job_title
FROM employees e
WHERE NOT EXISTS (
  SELECT 1
  FROM employees sub
  WHERE sub.manager_id = e.id
);
\`\`\`

---

## The Correlated Subquery

Both EXISTS and NOT EXISTS almost always use **correlated subqueries** — the inner query references a value from the outer query. This is key!

\`\`\`sql
-- The inner query references c.id from the outer query
-- It runs ONCE FOR EACH ROW in the outer query
SELECT c.name
FROM customers c               -- outer query
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id  -- ← correlation: c.id from outer query
);
\`\`\`

---

## EXISTS in UPDATE and DELETE

\`\`\`sql
-- Deactivate employees who have no direct reports AND low salary
UPDATE employees
SET is_active = 0
WHERE salary < 50000
  AND NOT EXISTS (
    SELECT 1 FROM employees sub WHERE sub.manager_id = employees.id
  );

-- Delete orders for customers that no longer exist
DELETE FROM orders
WHERE NOT EXISTS (
  SELECT 1 FROM customers c WHERE c.id = orders.customer_id
);
\`\`\`
    `,
    example: `-- Find high-value customers: Gold tier who have at least one large order (> $400)
SELECT c.name, c.loyalty_tier, c.country
FROM customers c
WHERE c.loyalty_tier = 'Gold'
  AND EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.id
      AND o.total_amount > 400
      AND o.status <> 'cancelled'
  )
ORDER BY c.name;`,
    exercises: [
      {
        id: 1,
        question: 'Find all customers who have placed at least one order using EXISTS.',
        hint: 'WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)',
        expectedQuery: 'SELECT c.name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all employees who have at least one direct report (they are a manager) using EXISTS.',
        hint: 'WHERE EXISTS (SELECT 1 FROM employees sub WHERE sub.manager_id = e.id)',
        expectedQuery: 'SELECT e.name, e.job_title FROM employees e WHERE EXISTS (SELECT 1 FROM employees sub WHERE sub.manager_id = e.id)',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 33,
    title: 'Correlated Subqueries & Derived Tables',
    titleAr: 'Correlated Subqueries & Derived Tables',
    description: 'Row-by-row subqueries and inline views — the most powerful subquery techniques.',
    content: `
## Correlated Subqueries

A correlated subquery references columns from the outer query. Unlike a regular subquery (which runs once), a correlated subquery **runs once per row** of the outer query.

\`\`\`sql
-- For EACH employee, find their salary relative to their department's average
SELECT
  e.name,
  e.salary,
  e.department_id,
  (
    SELECT ROUND(AVG(salary), 0)
    FROM employees inner_e
    WHERE inner_e.department_id = e.department_id  -- ← correlates to outer e
  ) AS dept_avg
FROM employees e
ORDER BY e.department_id, e.salary DESC;
\`\`\`

---

## Row-Level Comparison with Correlated Subquery

\`\`\`sql
-- Employees who earn above their own department's average
SELECT e.name, e.salary, e.department_id
FROM employees e
WHERE e.salary > (
  SELECT AVG(salary)
  FROM employees sub
  WHERE sub.department_id = e.department_id  -- correlated
);

-- Products with price above the average for their category
SELECT p.name, p.price, p.category_id
FROM products p
WHERE p.price > (
  SELECT AVG(price)
  FROM products sub
  WHERE sub.category_id = p.category_id  -- correlated
)
ORDER BY p.category_id, p.price DESC;
\`\`\`

---

## Derived Tables (Subquery in FROM)

A **derived table** is a subquery used in the \`FROM\` clause. It creates a virtual table that the outer query treats like a real table.

\`\`\`sql
-- Step 1: summarize departments in a subquery
-- Step 2: join that summary with departments table
SELECT
  d.name,
  dept_stats.headcount,
  dept_stats.avg_salary
FROM departments d
JOIN (
  SELECT
    department_id,
    COUNT(*)           AS headcount,
    ROUND(AVG(salary), 0) AS avg_salary
  FROM employees
  WHERE is_active = 1
  GROUP BY department_id
) AS dept_stats ON d.id = dept_stats.department_id
ORDER BY dept_stats.avg_salary DESC;
\`\`\`

\`\`\`sql
-- Find the top product per category using a derived table
SELECT cat.name AS category, top_products.name AS top_product, top_products.max_price
FROM categories cat
JOIN (
  SELECT
    category_id,
    name,
    MAX(price) AS max_price
  FROM products
  WHERE is_available = 1
  GROUP BY category_id
) AS top_products ON cat.id = top_products.category_id;
\`\`\`

---

## Multi-Level Derived Tables

\`\`\`sql
-- Find customers with above-average spending (using two levels)
SELECT customer_name, total_spent
FROM (
  -- Level 2: filter by above average
  SELECT customer_name, total_spent
  FROM (
    -- Level 1: sum orders per customer
    SELECT c.name AS customer_name, SUM(o.total_amount) AS total_spent
    FROM customers c
    JOIN orders o ON c.id = o.customer_id
    WHERE o.status = 'delivered'
    GROUP BY c.id, c.name
  ) AS customer_totals
  WHERE total_spent > (SELECT AVG(total_spent) FROM
    (SELECT SUM(total_amount) AS total_spent FROM orders
     WHERE status = 'delivered' GROUP BY customer_id) AS avgs
  )
) AS above_avg
ORDER BY total_spent DESC;
\`\`\`

> **Note:** This kind of deeply nested logic is better handled with CTEs (covered in Level 10). Derived tables work but get hard to read quickly.

---

## Performance Consideration

Correlated subqueries run **once per row** — on a table with 1 million rows, the subquery runs 1 million times! This is often slow.

For better performance:
- Use JOINs when possible
- Use CTEs (Level 10) for readability
- Use Window Functions (Level 9) for row-level aggregations
    `,
    example: `-- Find each employee's salary ranking within their department
SELECT
  e.name,
  e.department_id,
  e.salary,
  (
    SELECT COUNT(*) + 1
    FROM employees inner_e
    WHERE inner_e.department_id = e.department_id
      AND inner_e.salary > e.salary
  ) AS rank_in_dept,
  (
    SELECT ROUND(AVG(salary), 0)
    FROM employees inner_e
    WHERE inner_e.department_id = e.department_id
  ) AS dept_avg
FROM employees e
WHERE e.is_active = 1
ORDER BY e.department_id, rank_in_dept;`,
    exercises: [
      {
        id: 1,
        question: 'Find all products that have a price above the average price of their own category (use a correlated subquery).',
        hint: 'WHERE p.price > (SELECT AVG(price) FROM products sub WHERE sub.category_id = p.category_id)',
        expectedQuery: 'SELECT p.name, p.price, p.category_id FROM products p WHERE p.price > (SELECT AVG(price) FROM products sub WHERE sub.category_id = p.category_id) ORDER BY p.category_id, p.price DESC',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Using a derived table, find the average total_amount spent per customer (only for delivered orders), then show only customers who spent above $300 on average.',
        hint: 'SELECT ... FROM (SELECT customer_id, AVG(total_amount) AS avg_spent FROM orders WHERE status=\'delivered\' GROUP BY customer_id) AS cs WHERE avg_spent > 300',
        expectedQuery: "SELECT cs.customer_id, cs.avg_spent FROM (SELECT customer_id, AVG(total_amount) AS avg_spent FROM orders WHERE status = 'delivered' GROUP BY customer_id) AS cs WHERE cs.avg_spent > 300",
        checkFunction: (result) => result.length >= 0,
      },
    ],
  },
];
