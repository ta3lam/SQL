import { Lesson } from '../types';

export const lessons: Lesson[] = [

  // ════════════════════════════════════════════════════
  //  LEVEL 0 — INTRODUCTION
  // ════════════════════════════════════════════════════
  {
    id: 1,
    title: 'What is a Database?',
    titleAr: 'What is a Database?',
    description: 'Understand databases, RDBMS, tables, rows, and columns from the ground up.',
    content: `
## What is a Database?

A **database** is an organized collection of structured data stored electronically. Think of it as a highly sophisticated filing cabinet — instead of paper folders, data is stored in tables that can be searched, sorted, and combined in milliseconds.

Databases power almost every piece of software you use: banking apps, social media, e-commerce sites, hospital records, airline booking — all backed by a database.

---

## Relational vs. Non-Relational Databases

| Type | Examples | Best for |
|------|----------|----------|
| **Relational (SQL)** | PostgreSQL, MySQL, SQLite, SQL Server, Oracle | Structured data, complex queries, transactions |
| **Document** | MongoDB, CouchDB | Flexible schemas, JSON-like documents |
| **Key-Value** | Redis, DynamoDB | Caching, sessions, simple lookups |
| **Column-Family** | Cassandra, HBase | Massive write throughput, time-series |
| **Graph** | Neo4j | Social networks, recommendation engines |

This course focuses on **Relational Database Management Systems (RDBMS)** — the most widely used type in professional software development.

---

## The Building Blocks of a Relational Database

### Tables
A table stores data about one type of thing. Examples:
- \`employees\` — stores one row per employee
- \`orders\` — stores one row per order
- \`products\` — stores one row per product

### Columns (Fields / Attributes)
Each column stores one specific attribute. In the \`employees\` table:
- \`id\` — unique identifier
- \`name\` — full name
- \`salary\` — monthly salary
- \`hire_date\` — when they joined

### Rows (Records / Tuples)
Each row is one complete record. One row in \`employees\` = one real employee.

### Primary Key
A column (or combination of columns) that **uniquely identifies** every row. No two rows can share the same primary key value. Usually named \`id\`.

### Foreign Key
A column that references the primary key of **another table**, creating a relationship. For example, \`employees.department_id\` references \`departments.id\`.

---

## Our Training Database

In this course, you'll work with a realistic company database containing 7 tables:

\`\`\`
departments   ←──── employees ────→  (self-reference: manager_id)
                        │
customers               │
    │               (no direct link)
    │
   orders ────→  order_items ────→  products ────→  categories
\`\`\`

| Table | Description | Rows |
|-------|-------------|------|
| \`departments\` | Company departments | 6 |
| \`employees\` | Staff with salaries and managers | 25 |
| \`customers\` | Registered customers | 20 |
| \`categories\` | Product categories | 5 |
| \`products\` | Items for sale | 20 |
| \`orders\` | Customer purchase orders | 30 |
| \`order_items\` | Line items within each order | 54 |

---

## Why SQL and Not Excel / Google Sheets?

| Feature | Spreadsheet | SQL Database |
|---------|------------|--------------|
| Rows | Thousands (slow) | Billions (fast) |
| Multiple tables | Manual VLOOKUP | Built-in JOINs |
| Concurrent users | Single user | Thousands simultaneously |
| Data integrity | No enforcement | Constraints and foreign keys |
| Complex analytics | Limited | Subqueries, window functions, CTEs |
| Automation | Macros | Stored procedures, triggers |

---

## Key Vocabulary

- **Schema** — the structure/blueprint of a database (which tables exist, their columns, and constraints)
- **Query** — a request you send to the database to retrieve or modify data
- **Result set** — the table of rows returned by a SELECT query
- **NULL** — a special marker meaning "no value / unknown" (not zero, not empty string)
- **Index** — a data structure that speeds up lookups (like a book's index)
- **Transaction** — a group of operations that either all succeed or all fail
    `,
    example: `-- Explore what tables we have and their data
SELECT * FROM departments;`,
    exercises: [
      {
        id: 1,
        question: 'Run a query to see all rows in the employees table.',
        hint: 'Use SELECT * FROM followed by the table name.',
        expectedQuery: 'SELECT * FROM employees',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'View all rows in the products table.',
        hint: 'Same pattern — SELECT * FROM products',
        expectedQuery: 'SELECT * FROM products',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 2,
    title: 'What is SQL?',
    titleAr: 'What is SQL?',
    description: 'History of SQL, its sublanguages (DDL, DML, DCL, TCL), and SQL dialects.',
    content: `
## What is SQL?

**SQL** (Structured Query Language, pronounced "sequel" or "S-Q-L") is the standard language for communicating with relational databases. It was developed at IBM in the early 1970s by Donald Chamberlin and Raymond Boyce, based on Edgar Codd's relational model.

SQL became an ANSI standard in 1986 and an ISO standard in 1987. Despite being over 50 years old, it remains the dominant language for data work.

---

## The Four Sublanguages of SQL

SQL is divided into four categories based on what you're doing:

### DDL — Data Definition Language
*Creates and modifies the structure of database objects.*

| Command | Purpose |
|---------|---------|
| \`CREATE\` | Create a new table, index, or view |
| \`ALTER\` | Modify an existing table structure |
| \`DROP\` | Delete a table, index, or view entirely |
| \`TRUNCATE\` | Remove all rows from a table instantly |
| \`RENAME\` | Rename a table or column |

### DML — Data Manipulation Language
*Works with the actual data inside tables.*

| Command | Purpose |
|---------|---------|
| \`SELECT\` | Read/query data |
| \`INSERT\` | Add new rows |
| \`UPDATE\` | Modify existing rows |
| \`DELETE\` | Remove rows |

### DCL — Data Control Language
*Manages permissions and access.*

| Command | Purpose |
|---------|---------|
| \`GRANT\` | Give a user permission to do something |
| \`REVOKE\` | Remove a permission from a user |

### TCL — Transaction Control Language
*Controls groups of operations.*

| Command | Purpose |
|---------|---------|
| \`BEGIN\` / \`START TRANSACTION\` | Start a transaction |
| \`COMMIT\` | Save all changes permanently |
| \`ROLLBACK\` | Undo all changes since the last commit |
| \`SAVEPOINT\` | Create a checkpoint within a transaction |

---

## SQL Dialects

While SQL is standardized, each database system adds its own extensions. Most of the core syntax (SELECT, WHERE, JOIN, GROUP BY, etc.) is identical across all databases. Differences appear mainly in:

| Feature | SQLite | PostgreSQL | MySQL | SQL Server |
|---------|--------|-----------|-------|-----------|
| String concat | \`\|\|\` | \`\|\|\` or \`concat()\` | \`concat()\` | \`+\` |
| Date functions | \`strftime()\` | \`date_part()\` | \`DATE_FORMAT()\` | \`DATEPART()\` |
| Auto-increment | \`INTEGER PRIMARY KEY\` | \`SERIAL\` / \`BIGSERIAL\` | \`AUTO_INCREMENT\` | \`IDENTITY\` |
| LIMIT syntax | \`LIMIT n\` | \`LIMIT n\` | \`LIMIT n\` | \`TOP n\` |
| Boolean | \`0\` / \`1\` (integers) | \`TRUE\` / \`FALSE\` | \`TINYINT(1)\` | \`BIT\` |

> **This course uses SQLite**, which runs entirely in the browser. 95% of what you learn applies directly to PostgreSQL, MySQL, and SQL Server.

---

## How a SQL Query Is Processed

When you write:

\`\`\`sql
SELECT name, salary
FROM employees
WHERE salary > 80000
ORDER BY salary DESC;
\`\`\`

The database engine processes it in this order:
1. **FROM** — identify which table(s) to read
2. **WHERE** — filter rows
3. **SELECT** — pick which columns to return
4. **ORDER BY** — sort the result

This order matters! You can't reference a SELECT alias in a WHERE clause (because WHERE runs before SELECT).

---

## SQL Style Guide

SQL keywords can be uppercase or lowercase — the database doesn't care. But by convention:

\`\`\`sql
-- Good style: keywords UPPERCASE, identifiers lowercase
SELECT name, salary
FROM employees
WHERE department_id = 1
ORDER BY salary DESC;

-- Still valid but harder to read
select name, salary from employees where department_id = 1 order by salary desc;
\`\`\`

**Best practices:**
- Keywords in UPPERCASE
- Table and column names in lowercase with underscores (\`hire_date\`, not \`hireDate\`)
- One clause per line for complex queries
- Use meaningful aliases: \`emp\` not \`e1\`
- End statements with a semicolon \`;\`
    `,
    example: `-- SQL processes clauses in this order:
-- FROM → WHERE → SELECT → ORDER BY
SELECT name, salary
FROM employees
WHERE salary > 80000
ORDER BY salary DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Write a query to see the first 5 rows from the orders table.',
        hint: 'Use SELECT * FROM orders LIMIT 5',
        expectedQuery: 'SELECT * FROM orders LIMIT 5',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'View all data from the categories table.',
        hint: 'SELECT * FROM categories',
        expectedQuery: 'SELECT * FROM categories',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 3,
    title: 'Data Types in SQL',
    titleAr: 'Data Types in SQL',
    description: 'Integer, TEXT, REAL, DATE, BOOLEAN, NULL — understanding and choosing the right type.',
    content: `
## Data Types in SQL

Every column in a table has a **data type** that defines what kind of values it can store. Choosing the right data type is important for:
- **Storage efficiency** — use the smallest type that fits your data
- **Data integrity** — the DB rejects values that don't fit
- **Query performance** — the right type enables faster searches
- **Correctness** — you can't do arithmetic on text

---

## Core Data Types

### Integer Types

\`\`\`sql
-- SQLite uses INTEGER for all whole numbers
salary INTEGER       -- e.g. 75000
quantity INTEGER     -- e.g. 50
is_active INTEGER    -- 0 or 1 (boolean workaround in SQLite)

-- Other databases have more granular types:
-- TINYINT (1 byte, 0–255)
-- SMALLINT (2 bytes, -32768 to 32767)
-- INT / INTEGER (4 bytes, ~±2 billion)
-- BIGINT (8 bytes, ~±9 quintillion)
\`\`\`

### Decimal / Float Types

\`\`\`sql
price REAL          -- floating point, e.g. 29.99
-- WARNING: REAL/FLOAT has precision issues for financial data:
SELECT 0.1 + 0.2;   -- returns 0.30000000000000004 in most languages!

-- For money, use DECIMAL(precision, scale) in other databases:
price DECIMAL(10, 2) -- up to 10 digits, 2 after decimal: 99999999.99
\`\`\`

### Text Types

\`\`\`sql
-- SQLite uses TEXT for all string data
name TEXT          -- any length string
code TEXT          -- 'ENG-001'

-- Other databases:
-- CHAR(n)    -- fixed length, padded with spaces (rare today)
-- VARCHAR(n) -- variable length up to n characters (most common)
-- TEXT       -- unlimited length (for long articles, descriptions)
-- CLOB       -- Character Large Object (Oracle)
\`\`\`

### Date and Time Types

\`\`\`sql
-- SQLite stores dates as TEXT in ISO 8601 format: 'YYYY-MM-DD'
hire_date TEXT     -- '2024-01-15'
created_at TEXT    -- '2024-01-15 14:30:00'

-- Other databases have dedicated types:
-- DATE       -- '2024-01-15'
-- TIME       -- '14:30:00'
-- DATETIME / TIMESTAMP  -- '2024-01-15 14:30:00'
-- TIMESTAMPTZ           -- timestamp with time zone (PostgreSQL)
\`\`\`

### Boolean

\`\`\`sql
-- SQLite: no native boolean — use INTEGER (0 = false, 1 = true)
is_active INTEGER DEFAULT 1

-- PostgreSQL: native BOOLEAN
is_active BOOLEAN DEFAULT TRUE

-- MySQL: TINYINT(1) or BOOLEAN (alias)
\`\`\`

---

## NULL — The Special Non-Value

\`NULL\` represents **missing or unknown data**. It is NOT:
- Zero (0)
- Empty string ('')
- The word "null"

It means: *"we don't know this value."*

\`\`\`sql
-- Some employees have no email on file — their email is NULL
SELECT name, email FROM employees WHERE email IS NULL;

-- Arithmetic with NULL always returns NULL:
SELECT NULL + 5;     -- NULL
SELECT NULL = NULL;  -- NULL (not TRUE!)
SELECT NULL = 0;     -- NULL (not TRUE, not FALSE!)

-- This is the THREE-VALUED LOGIC of SQL: TRUE, FALSE, NULL
-- NULL comparisons require IS NULL / IS NOT NULL
\`\`\`

---

## Type Conversion (Casting)

\`\`\`sql
-- Implicit: SQLite converts automatically when safe
SELECT '2024-01-15' > '2023-12-31';  -- works as string comparison

-- Explicit: use CAST()
SELECT CAST('42' AS INTEGER) + 1;    -- returns 43
SELECT CAST(salary AS TEXT) FROM employees;  -- number to string
SELECT CAST('29.99' AS REAL);        -- string to float

-- Or the TYPEOF() function to inspect:
SELECT TYPEOF(42);       -- 'integer'
SELECT TYPEOF('hello');  -- 'text'
SELECT TYPEOF(3.14);     -- 'real'
SELECT TYPEOF(NULL);     -- 'null'
\`\`\`

---

## Practical Type Decisions

| Use case | Recommended type |
|----------|-----------------|
| Whole numbers (IDs, counts) | \`INTEGER\` |
| Money / prices | \`DECIMAL(15,2)\` (or \`REAL\` in SQLite) |
| Names, titles, descriptions | \`TEXT\` / \`VARCHAR(n)\` |
| Dates | \`DATE\` (or \`TEXT\` ISO 8601 in SQLite) |
| Timestamps | \`TIMESTAMP\` (or \`TEXT\` in SQLite) |
| True/false flags | \`BOOLEAN\` (or \`INTEGER 0/1\` in SQLite) |
| Large text (articles, notes) | \`TEXT\` / \`CLOB\` |
    `,
    example: `-- Inspect the data types of our values
SELECT
  TYPEOF(id)        AS id_type,
  TYPEOF(salary)    AS salary_type,
  TYPEOF(hire_date) AS date_type,
  TYPEOF(email)     AS email_type
FROM employees
LIMIT 3;`,
    exercises: [
      {
        id: 1,
        question: 'Use CAST to convert the price column to INTEGER in the products table (this truncates decimals). Show name and the integer price.',
        hint: 'SELECT name, CAST(price AS INTEGER) FROM products',
        expectedQuery: 'SELECT name, CAST(price AS INTEGER) FROM products',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all employees where the email IS NULL.',
        hint: 'Use WHERE email IS NULL',
        expectedQuery: 'SELECT * FROM employees WHERE email IS NULL',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 1 — SELECT & BASIC FILTERING
  // ════════════════════════════════════════════════════
  {
    id: 4,
    title: 'SELECT Statement',
    titleAr: 'SELECT Statement',
    description: 'Master SELECT: choosing columns, aliases (AS), expressions, and column ordering.',
    content: `
## The SELECT Statement

\`SELECT\` is the most frequently used SQL command. It retrieves data from one or more tables. You use it to:
- Read specific columns or all columns
- Rename columns for display using aliases
- Compute expressions and derived values
- Deduplicate rows with DISTINCT

---

## Basic Syntax

\`\`\`sql
SELECT column1, column2, column3
FROM table_name;
\`\`\`

### Select All Columns
\`\`\`sql
SELECT * FROM employees;
\`\`\`
The \`*\` wildcard means "all columns." In production code, **always list columns explicitly** — \`*\` is fine for exploration but:
- Returns data your application doesn't need (wasted bandwidth)
- Breaks if a column is added or removed from the table
- Harder to understand what the query does

---

## Selecting Specific Columns

\`\`\`sql
-- Return only name and salary
SELECT name, salary FROM employees;

-- Order of columns in SELECT determines result column order
SELECT salary, name FROM employees;  -- salary comes first
\`\`\`

---

## Column Aliases with AS

Use \`AS\` to rename a column in the output. This doesn't change the table — only the display name.

\`\`\`sql
SELECT
  name          AS employee_name,
  salary        AS monthly_salary,
  department_id AS dept
FROM employees;
\`\`\`

Aliases are required when:
- Your column name is a SQL keyword
- You compute an expression and want a readable name
- Two tables have the same column name in a JOIN

Aliases can contain spaces if you quote them:
\`\`\`sql
SELECT name AS "Full Name", salary AS "Monthly Pay"
FROM employees;
\`\`\`

You can omit \`AS\` — some developers write \`name "Full Name"\` — but \`AS\` is clearer.

---

## Computed Expressions

SELECT can do math and string operations:

\`\`\`sql
-- Annual salary from monthly
SELECT
  name,
  salary,
  salary * 12         AS annual_salary,
  salary * 1.10       AS salary_with_10pct_raise,
  salary / 12         AS monthly_approx
FROM employees;
\`\`\`

\`\`\`sql
-- Concatenate strings with ||
SELECT
  name || ' (' || job_title || ')' AS display_name
FROM employees;
\`\`\`

---

## Literal Values and Constants

You can SELECT constants directly — useful for labels or placeholders:

\`\`\`sql
SELECT
  name,
  salary,
  'USD'              AS currency,
  'Active Employee'  AS status_label
FROM employees
WHERE is_active = 1;
\`\`\`

---

## Removing Duplicate Rows: DISTINCT

\`\`\`sql
-- Without DISTINCT: all 25 rows returned (many repeated departments)
SELECT department_id FROM employees;

-- With DISTINCT: only unique department_id values
SELECT DISTINCT department_id FROM employees;

-- DISTINCT applies to the combination of ALL listed columns
SELECT DISTINCT department_id, job_title FROM employees;
-- Returns unique (department_id, job_title) pairs
\`\`\`

---

## Common Mistakes

\`\`\`sql
-- ❌ Referring to alias in WHERE — aliases don't exist yet at that stage!
SELECT salary * 12 AS annual
FROM employees
WHERE annual > 1000000;  -- ERROR: no such column: annual

-- ✅ Repeat the expression in WHERE
SELECT salary * 12 AS annual
FROM employees
WHERE salary * 12 > 1000000;

-- ❌ SELECT without FROM (works in some databases, not all)
SELECT 1 + 1;  -- Works in SQLite, but bad habit

-- ✅ In production always qualify with FROM
\`\`\`
    `,
    example: `-- Show employees with annual salary and their display name
SELECT
  name,
  job_title,
  salary                    AS monthly_salary,
  salary * 12               AS annual_salary,
  name || ' — ' || job_title AS display_label
FROM employees
ORDER BY salary DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Select only the name, price, and stock_quantity columns from the products table.',
        hint: 'List the column names separated by commas after SELECT.',
        expectedQuery: 'SELECT name, price, stock_quantity FROM products',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Select all products and add a computed column called "discounted_price" that is 90% of the original price.',
        hint: 'Use price * 0.90 AS discounted_price',
        expectedQuery: 'SELECT *, price * 0.90 AS discounted_price FROM products',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Select distinct country values from the customers table.',
        hint: 'Use SELECT DISTINCT country FROM customers',
        expectedQuery: 'SELECT DISTINCT country FROM customers',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 5,
    title: 'WHERE Clause',
    titleAr: 'WHERE Clause',
    description: 'Filter rows precisely using comparison operators, strings, numbers, and dates.',
    content: `
## The WHERE Clause

\`WHERE\` filters the rows returned by a query. Without it, every row in the table is returned. With it, only rows where the condition evaluates to **TRUE** are included.

\`\`\`sql
SELECT columns
FROM table_name
WHERE condition;
\`\`\`

---

## Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| \`=\` | Equal to | \`salary = 75000\` |
| \`<>\` or \`!=\` | Not equal to | \`status <> 'cancelled'\` |
| \`>\` | Greater than | \`salary > 80000\` |
| \`<\` | Less than | \`price < 50\` |
| \`>=\` | Greater than or equal | \`salary >= 60000\` |
| \`<=\` | Less than or equal | \`price <= 100\` |

\`\`\`sql
-- Employees earning more than $90,000
SELECT name, salary FROM employees WHERE salary > 90000;

-- Products costing exactly $29.99
SELECT name, price FROM products WHERE price = 29.99;

-- Orders that are NOT delivered
SELECT id, status FROM orders WHERE status <> 'delivered';
\`\`\`

---

## String Comparisons

String comparisons are **case-sensitive** in most databases (except MySQL by default):

\`\`\`sql
-- This works:
SELECT * FROM employees WHERE job_title = 'Sales Rep';

-- This returns nothing if 'sales rep' doesn't exist:
SELECT * FROM employees WHERE job_title = 'sales rep';

-- To be safe with case, use UPPER() or LOWER():
SELECT * FROM employees WHERE UPPER(job_title) = 'SALES REP';
\`\`\`

---

## Filtering on Numbers

\`\`\`sql
-- Employees with salary between a range (exclusive)
SELECT name, salary
FROM employees
WHERE salary >= 60000 AND salary <= 90000;

-- Products with stock less than 50
SELECT name, stock_quantity
FROM products
WHERE stock_quantity < 50;
\`\`\`

---

## Filtering on Dates

In SQLite, dates are stored as TEXT in 'YYYY-MM-DD' format. Fortunately, ISO 8601 format compares correctly as strings:

\`\`\`sql
-- Employees hired after 2020
SELECT name, hire_date
FROM employees
WHERE hire_date > '2020-12-31';

-- Orders placed in January 2024
SELECT id, order_date, status
FROM orders
WHERE order_date >= '2024-01-01'
  AND order_date <= '2024-01-31';

-- Employees hired in 2019 (using LIKE with dates is not recommended)
-- Better: use >= and <=
SELECT name, hire_date
FROM employees
WHERE hire_date >= '2019-01-01'
  AND hire_date <= '2019-12-31';
\`\`\`

---

## Filtering on Boolean / Integer Flags

\`\`\`sql
-- Active employees (is_active = 1)
SELECT name FROM employees WHERE is_active = 1;

-- Inactive employees
SELECT name FROM employees WHERE is_active = 0;

-- Available products
SELECT name FROM products WHERE is_available = 1;
\`\`\`

---

## NULL and WHERE

**Critical:** You cannot use \`=\` to check for NULL!

\`\`\`sql
-- ❌ This returns ZERO rows — comparing to NULL always gives NULL (not TRUE)
SELECT * FROM employees WHERE email = NULL;

-- ✅ Use IS NULL
SELECT * FROM employees WHERE email IS NULL;

-- ✅ Use IS NOT NULL for the opposite
SELECT * FROM employees WHERE email IS NOT NULL;
\`\`\`

This is because NULL means "unknown" — you can't say an unknown value equals anything.

---

## Multiple Conditions: AND / OR

\`\`\`sql
-- Both conditions must be true
SELECT name, salary, department_id
FROM employees
WHERE department_id = 1 AND salary > 90000;

-- Either condition can be true
SELECT name, department_id
FROM employees
WHERE department_id = 1 OR department_id = 5;
\`\`\`

> We'll cover AND/OR/NOT in depth in the next lesson.

---

## WHERE with Expressions

You can use expressions on the left side of the condition:

\`\`\`sql
-- Employees whose annual salary exceeds $1 million
SELECT name, salary
FROM employees
WHERE salary * 12 > 1000000;

-- Products with more than 50% markup over their category average (preview of subqueries)
-- We'll cover this in Level 8
\`\`\`
    `,
    example: `-- Find senior employees in Engineering with high salaries
SELECT name, job_title, salary, hire_date
FROM employees
WHERE department_id = 1
  AND salary > 90000
  AND hire_date < '2018-01-01';`,
    exercises: [
      {
        id: 1,
        question: 'Find all products with a price greater than $100.',
        hint: 'Use WHERE price > 100',
        expectedQuery: 'SELECT * FROM products WHERE price > 100',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all orders with status equal to "delivered".',
        hint: 'Use WHERE status = \'delivered\'',
        expectedQuery: "SELECT * FROM orders WHERE status = 'delivered'",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Find all customers who do NOT have a phone number on file (phone IS NULL).',
        hint: 'Use WHERE phone IS NULL',
        expectedQuery: 'SELECT * FROM customers WHERE phone IS NULL',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 4,
        question: 'Find all employees hired after January 1, 2021.',
        hint: 'Use WHERE hire_date > \'2021-01-01\'',
        expectedQuery: "SELECT * FROM employees WHERE hire_date > '2021-01-01'",
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 6,
    title: 'ORDER BY',
    titleAr: 'ORDER BY',
    description: 'Sort results ascending, descending, by multiple columns, and handle NULLs in sorting.',
    content: `
## ORDER BY

By default, SQL does not guarantee any particular row order. Databases store rows wherever they fit and may return them in any order. To get a consistent, meaningful order, you must use \`ORDER BY\`.

\`\`\`sql
SELECT columns
FROM table_name
ORDER BY column1 [ASC|DESC], column2 [ASC|DESC];
\`\`\`

---

## Ascending and Descending

- **ASC** (default) — smallest to largest, A to Z, oldest to newest
- **DESC** — largest to smallest, Z to A, newest to oldest

\`\`\`sql
-- Cheapest products first
SELECT name, price FROM products ORDER BY price ASC;

-- Most expensive first (DESC)
SELECT name, price FROM products ORDER BY price DESC;

-- Newest employees first
SELECT name, hire_date FROM employees ORDER BY hire_date DESC;

-- Alphabetical by name
SELECT name FROM employees ORDER BY name ASC;
\`\`\`

---

## Sorting by Multiple Columns

You can sort by more than one column. The second column is used to break ties in the first.

\`\`\`sql
-- Sort by department first, then by salary (highest earners first within each dept)
SELECT name, department_id, salary
FROM employees
ORDER BY department_id ASC, salary DESC;

-- Sort by status first, then by most recent order date
SELECT id, customer_id, status, order_date
FROM orders
ORDER BY status ASC, order_date DESC;
\`\`\`

---

## Sorting by Column Position (Number)

You can refer to SELECT columns by their position number:

\`\`\`sql
-- Same as ORDER BY name ASC
SELECT name, salary FROM employees ORDER BY 1;

-- Same as ORDER BY salary DESC
SELECT name, salary FROM employees ORDER BY 2 DESC;
\`\`\`

This is convenient but risky — if you add a column to SELECT, the numbers shift and your sort changes silently. **Prefer column names.**

---

## Sorting by Alias

You CAN use aliases in ORDER BY (unlike WHERE):

\`\`\`sql
SELECT
  name,
  salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;
\`\`\`

This works because ORDER BY runs after SELECT in the execution order.

---

## NULL Values in Sorting

\`\`\`sql
-- Default behavior: NULLs sort LAST in ASC, FIRST in DESC (SQLite)
-- (PostgreSQL: NULLs LAST in ASC, LAST in DESC unless you specify)
SELECT name, email FROM employees ORDER BY email ASC;

-- In other databases you can control NULL position:
-- ORDER BY email ASC NULLS FIRST
-- ORDER BY email DESC NULLS LAST
-- SQLite doesn't support this syntax — NULLs just sort as smallest values
\`\`\`

---

## Sorting by Expressions

\`\`\`sql
-- Sort products by their revenue potential (price × stock)
SELECT name, price, stock_quantity,
       price * stock_quantity AS inventory_value
FROM products
ORDER BY price * stock_quantity DESC;

-- Sort employees by name length (shortest names first)
SELECT name FROM employees
ORDER BY LENGTH(name) ASC;
\`\`\`

---

## Combining WHERE + ORDER BY

\`WHERE\` always comes before \`ORDER BY\`:

\`\`\`sql
SELECT name, salary, department_id
FROM employees
WHERE is_active = 1
  AND department_id IN (1, 5)
ORDER BY department_id ASC, salary DESC;
\`\`\`

---

## Performance Note

Sorting is expensive on large tables. When you frequently sort by a column (e.g., \`order_date\`), creating an **index** on that column dramatically speeds things up. We'll cover indexes in Level 9.
    `,
    example: `-- Top 5 highest-paid employees with their department
SELECT name, job_title, salary, hire_date
FROM employees
WHERE is_active = 1
ORDER BY salary DESC, hire_date ASC
LIMIT 5;`,
    exercises: [
      {
        id: 1,
        question: 'List all products sorted by price from most expensive to cheapest.',
        hint: 'Use ORDER BY price DESC',
        expectedQuery: 'SELECT * FROM products ORDER BY price DESC',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'List all employees sorted by department_id ascending, then by name alphabetically.',
        hint: 'ORDER BY department_id ASC, name ASC',
        expectedQuery: 'SELECT * FROM employees ORDER BY department_id ASC, name ASC',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Show all customers sorted by their join date, newest first.',
        hint: 'ORDER BY joined_date DESC',
        expectedQuery: 'SELECT * FROM customers ORDER BY joined_date DESC',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 7,
    title: 'AND, OR, NOT',
    titleAr: 'AND, OR, NOT',
    description: 'Combine multiple conditions with logical operators, operator precedence, and truth tables.',
    content: `
## Logical Operators: AND, OR, NOT

Real-world queries almost always need multiple conditions. SQL provides three logical operators to combine conditions.

---

## AND — All Conditions Must Be True

\`AND\` returns a row only when **every** condition is TRUE.

\`\`\`sql
-- Engineering employees earning over $80k
SELECT name, department_id, salary
FROM employees
WHERE department_id = 1
  AND salary > 80000;

-- Delivered orders placed in 2024 Q1
SELECT id, order_date, total_amount
FROM orders
WHERE status = 'delivered'
  AND order_date >= '2024-01-01'
  AND order_date <= '2024-03-31';
\`\`\`

**AND Truth Table:**
| A | B | A AND B |
|---|---|---------|
| TRUE | TRUE | **TRUE** |
| TRUE | FALSE | FALSE |
| FALSE | TRUE | FALSE |
| FALSE | FALSE | FALSE |
| TRUE | NULL | NULL |
| FALSE | NULL | **FALSE** |
| NULL | NULL | NULL |

Notice: \`FALSE AND NULL\` = FALSE (because no matter what NULL is, the result would be FALSE).

---

## OR — At Least One Condition Must Be True

\`OR\` returns a row when **any** condition is TRUE.

\`\`\`sql
-- Employees in Engineering OR Finance
SELECT name, department_id
FROM employees
WHERE department_id = 1 OR department_id = 5;

-- Orders that are pending OR processing (still in progress)
SELECT id, status, order_date
FROM orders
WHERE status = 'pending' OR status = 'processing';

-- Customers from the USA OR Canada
SELECT name, country
FROM customers
WHERE country = 'USA' OR country = 'Canada';
\`\`\`

**OR Truth Table:**
| A | B | A OR B |
|---|---|--------|
| TRUE | TRUE | TRUE |
| TRUE | FALSE | **TRUE** |
| FALSE | TRUE | **TRUE** |
| FALSE | FALSE | **FALSE** |
| TRUE | NULL | **TRUE** |
| FALSE | NULL | NULL |
| NULL | NULL | NULL |

Notice: \`TRUE OR NULL\` = TRUE (because even if NULL were FALSE, the result would still be TRUE).

---

## NOT — Negate a Condition

\`NOT\` inverts the result of a condition:

\`\`\`sql
-- All employees NOT in Engineering
SELECT name, department_id
FROM employees
WHERE NOT department_id = 1;
-- Equivalent:
WHERE department_id <> 1;
-- Equivalent:
WHERE department_id != 1;

-- Orders that are NOT cancelled or delivered (still in transit)
SELECT id, status FROM orders
WHERE NOT (status = 'delivered' OR status = 'cancelled');
\`\`\`

---

## Operator Precedence — Critical!

SQL evaluates logical operators in this order: **NOT → AND → OR**

This can cause surprises:

\`\`\`sql
-- ❌ This is NOT "Engineering AND (salary>80k OR Finance)"
-- It's "(Engineering AND salary>80k) OR Finance"
SELECT name, department_id, salary
FROM employees
WHERE department_id = 1 AND salary > 80000
   OR department_id = 5;

-- ✅ Use parentheses to be explicit
SELECT name, department_id, salary
FROM employees
WHERE department_id = 1
  AND (salary > 80000 OR department_id = 5);
\`\`\`

**Golden rule: use parentheses whenever you mix AND and OR.** It makes your intent clear and prevents bugs.

---

## Practical Examples

\`\`\`sql
-- Gold customers who are NOT from the USA
SELECT name, country, loyalty_tier
FROM customers
WHERE loyalty_tier = 'Gold'
  AND NOT country = 'USA';

-- Large orders (over $400) that are NOT cancelled
SELECT id, total_amount, status
FROM orders
WHERE total_amount > 400
  AND status <> 'cancelled';

-- Employees hired in 2020 or 2021 who are still active
SELECT name, hire_date, is_active
FROM employees
WHERE (hire_date >= '2020-01-01' AND hire_date <= '2021-12-31')
  AND is_active = 1;

-- Products that are cheap (under $50) OR out of stock (0 inventory)
SELECT name, price, stock_quantity
FROM products
WHERE price < 50
   OR stock_quantity = 0;
\`\`\`

---

## Common Mistakes

\`\`\`sql
-- ❌ Wrong: this checks if department_id equals 1 OR 5, not the column name twice
SELECT * FROM employees WHERE department_id = 1 OR 5;
-- SQL reads this as: (department_id = 1) OR (5) — and 5 is always truthy!

-- ✅ Correct: repeat the column name
SELECT * FROM employees WHERE department_id = 1 OR department_id = 5;

-- ❌ NOT NULL trap
SELECT * FROM employees WHERE NOT email = NULL;  -- Always returns 0 rows!

-- ✅ Use IS NOT NULL
SELECT * FROM employees WHERE email IS NOT NULL;
\`\`\`
    `,
    example: `-- Complex multi-condition filter
SELECT name, job_title, salary, department_id
FROM employees
WHERE (department_id = 1 OR department_id = 5)
  AND salary >= 70000
  AND NOT job_title = 'VP of Engineering'
ORDER BY salary DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Find all employees in department 1 (Engineering) AND with salary greater than $95,000.',
        hint: 'Combine two conditions with AND',
        expectedQuery: 'SELECT * FROM employees WHERE department_id = 1 AND salary > 95000',
        checkFunction: (result) => result.length >= 0,
      },
      {
        id: 2,
        question: 'Find all orders with status "pending" OR "processing".',
        hint: 'Use OR between the two status conditions',
        expectedQuery: "SELECT * FROM orders WHERE status = 'pending' OR status = 'processing'",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Find all products that are NOT available (is_available = 0) OR have stock_quantity equal to 0.',
        hint: 'Use NOT or <> and combine with OR',
        expectedQuery: 'SELECT * FROM products WHERE is_available = 0 OR stock_quantity = 0',
        checkFunction: (result) => result.length >= 0,
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 2 — ADVANCED FILTERING
  // ════════════════════════════════════════════════════
  {
    id: 8,
    title: 'LIKE & Pattern Matching',
    titleAr: 'LIKE & Pattern Matching',
    description: 'Search text with wildcards % and _, case-insensitive patterns, and GLOB.',
    content: `
## LIKE — Pattern Matching

\`LIKE\` lets you search for rows where a text column matches a pattern with wildcards. It's used when you don't know the exact value but know part of it.

\`\`\`sql
SELECT columns FROM table WHERE column LIKE pattern;
\`\`\`

---

## The Two Wildcards

### % — Matches any sequence of zero or more characters

\`\`\`sql
-- Names starting with 'A'
SELECT name FROM employees WHERE name LIKE 'A%';
-- Matches: Alice, Alan, Anna ...

-- Names ending in 'son'
SELECT name FROM employees WHERE name LIKE '%son';
-- Matches: Alice Johnson, Jackson, Wilson ...

-- Names containing 'ar' anywhere
SELECT name FROM employees WHERE name LIKE '%ar%';
-- Matches: Karen, Nathan, Carol ...

-- Email addresses from company.com
SELECT name, email FROM employees WHERE email LIKE '%@company.com';

-- Job titles containing the word 'Engineer'
SELECT name, job_title FROM employees WHERE job_title LIKE '%Engineer%';
\`\`\`

### _ — Matches exactly ONE character

\`\`\`sql
-- 3-letter names
SELECT name FROM customers WHERE name LIKE '___';
-- (Each _ = one character, so 3 underscores = exactly 3 chars)

-- Job titles where the 3rd character is 'a'
SELECT job_title FROM employees WHERE job_title LIKE '__a%';
-- Matches: 'Lead Engineer', 'Marketing ...'

-- IDs that are single-digit: not useful with _ but common for codes
-- e.g. product codes like 'P_001' where the middle digit varies
\`\`\`

---

## Combining Wildcards

\`\`\`sql
-- Names where the second character is 'a' or starts with a vowel
SELECT name FROM employees WHERE name LIKE '_a%';
-- Matches: Nathan, Karen, Jack, Rachel, Sam, David, Yara...

-- Emails containing at least one digit
SELECT email FROM employees WHERE email LIKE '%[0-9]%';
-- Note: [] ranges are NOT standard SQL — use GLOB in SQLite (see below)
\`\`\`

---

## Case Sensitivity

LIKE is **case-insensitive for ASCII characters in SQLite** but case-sensitive for Unicode characters and in most other databases:

\`\`\`sql
-- In SQLite: these return the same results
SELECT * FROM employees WHERE name LIKE 'alice%';
SELECT * FROM employees WHERE name LIKE 'Alice%';

-- In PostgreSQL: LIKE is case-sensitive; use ILIKE for case-insensitive
SELECT * FROM employees WHERE name ILIKE 'alice%';

-- Safe practice: normalize to UPPER/LOWER first
SELECT * FROM employees WHERE UPPER(name) LIKE 'ALICE%';
\`\`\`

---

## NOT LIKE

\`\`\`sql
-- Employees who are NOT Sales Reps or Sales Managers
SELECT name, job_title FROM employees
WHERE job_title NOT LIKE '%Sales%';

-- Customers whose email is not from standard domains
SELECT name, email FROM customers
WHERE email NOT LIKE '%@email.com';
\`\`\`

---

## GLOB — SQLite's Wildcard Alternative

SQLite also has \`GLOB\` which uses Unix-style wildcards and is **always case-sensitive**:

| Pattern | Meaning |
|---------|---------|
| \`*\` | Any sequence of characters |
| \`?\` | Any single character |
| \`[abc]\` | Any one character from the list |
| \`[a-z]\` | Any one character in the range |
| \`[^abc]\` | Any character NOT in the list |

\`\`\`sql
-- Names starting with A or B
SELECT name FROM employees WHERE name GLOB '[AB]*';

-- Emails containing a digit
SELECT email FROM employees WHERE email GLOB '*[0-9]*';

-- 5-character job titles
SELECT job_title FROM employees WHERE job_title GLOB '?????';
\`\`\`

---

## Performance Warning

\`LIKE '%value'\` (leading wildcard) **cannot use an index** — the database must scan every row. For large tables, this is very slow.

\`LIKE 'value%'\` (no leading wildcard) **can use an index** and is much faster.

\`\`\`sql
-- Fast: index can be used
WHERE name LIKE 'Alice%'

-- Slow: full table scan required
WHERE name LIKE '%Alice%'
WHERE name LIKE '%Alice'
\`\`\`
    `,
    example: `-- Find all engineers and their emails
SELECT name, job_title, email
FROM employees
WHERE job_title LIKE '%Engineer%'
ORDER BY job_title, name;`,
    exercises: [
      {
        id: 1,
        question: 'Find all customers whose name starts with the letter "A".',
        hint: 'Use LIKE "A%"',
        expectedQuery: "SELECT * FROM customers WHERE name LIKE 'A%'",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all products whose name contains the word "Pro".',
        hint: 'Use LIKE "%Pro%"',
        expectedQuery: "SELECT * FROM products WHERE name LIKE '%Pro%'",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Find all employees whose email ends with "@company.com".',
        hint: 'Use LIKE "%@company.com"',
        expectedQuery: "SELECT * FROM employees WHERE email LIKE '%@company.com'",
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 9,
    title: 'IN, NOT IN, BETWEEN',
    titleAr: 'IN, NOT IN, BETWEEN',
    description: 'Filter against a list of values with IN and a range with BETWEEN.',
    content: `
## IN — Match Against a List

\`IN\` checks if a value matches any value in a list. It's cleaner than writing multiple \`OR\` conditions.

\`\`\`sql
-- Without IN: verbose and repetitive
SELECT * FROM employees
WHERE department_id = 1
   OR department_id = 3
   OR department_id = 5;

-- With IN: clean and readable
SELECT * FROM employees
WHERE department_id IN (1, 3, 5);
\`\`\`

### IN with Strings

\`\`\`sql
-- Orders in various statuses
SELECT id, order_date, status
FROM orders
WHERE status IN ('pending', 'processing', 'shipped');

-- Customers from specific countries
SELECT name, country
FROM customers
WHERE country IN ('USA', 'Canada', 'UK');

-- Products from specific suppliers
SELECT name, supplier, price
FROM products
WHERE supplier IN ('TechCorp', 'BookHouse', 'FitLife');
\`\`\`

---

## NOT IN — Exclude a List

\`\`\`sql
-- Employees NOT in HR or Legal
SELECT name, department_id
FROM employees
WHERE department_id NOT IN (4, 6);

-- Active orders (not completed)
SELECT id, status, order_date
FROM orders
WHERE status NOT IN ('delivered', 'cancelled');
\`\`\`

### Critical NULL Trap with NOT IN!

\`\`\`sql
-- If ANY value in the list is NULL, NOT IN returns NOTHING!
-- Because: X NOT IN (..., NULL) → X <> NULL → NULL → unknown

-- This returns ZERO rows even though it looks correct:
SELECT * FROM employees
WHERE department_id NOT IN (1, 2, NULL);
-- Because "department_id <> NULL" is always NULL, never TRUE

-- ✅ Solution: use NOT EXISTS or filter out NULLs first
-- We'll cover NOT EXISTS in Level 8
\`\`\`

---

## BETWEEN — Inclusive Range

\`BETWEEN low AND high\` checks if a value is within a range (inclusive on both ends).

\`\`\`sql
-- Equivalent: salary >= 60000 AND salary <= 90000
SELECT name, salary
FROM employees
WHERE salary BETWEEN 60000 AND 90000;

-- Products in a price range
SELECT name, price
FROM products
WHERE price BETWEEN 30 AND 100;
\`\`\`

**Important: BETWEEN is inclusive.** Both boundary values are included.

### BETWEEN with Dates

\`\`\`sql
-- Orders in Q1 2024
SELECT id, order_date, total_amount
FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31';

-- Employees hired in a specific year
SELECT name, hire_date
FROM employees
WHERE hire_date BETWEEN '2020-01-01' AND '2020-12-31';
\`\`\`

### BETWEEN with Strings

\`\`\`sql
-- Alphabetical range (A through M)
SELECT name FROM employees
WHERE name BETWEEN 'A' AND 'N';
-- Matches names from A to N (exclusive of N itself for full strings)
-- More intuitive for single characters, careful with longer strings
\`\`\`

---

## NOT BETWEEN

\`\`\`sql
-- Products that are either very cheap or very expensive
SELECT name, price
FROM products
WHERE price NOT BETWEEN 50 AND 300;
-- Same as: price < 50 OR price > 300
\`\`\`

---

## Combining IN and BETWEEN

\`\`\`sql
-- Gold or Silver customers who joined recently
SELECT name, loyalty_tier, joined_date
FROM customers
WHERE loyalty_tier IN ('Gold', 'Silver')
  AND joined_date BETWEEN '2020-01-01' AND '2021-12-31'
ORDER BY loyalty_tier, joined_date;

-- Mid-range products from specific categories
SELECT name, price, category_id
FROM products
WHERE category_id IN (1, 5)
  AND price BETWEEN 50 AND 200;
\`\`\`
    `,
    example: `-- Find all shipped or processing orders with amounts between $100 and $500
SELECT id, customer_id, order_date, status, total_amount
FROM orders
WHERE status IN ('shipped', 'processing')
  AND total_amount BETWEEN 100 AND 500
ORDER BY total_amount DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Find all employees in departments 1, 3, or 5 using IN.',
        hint: 'Use WHERE department_id IN (1, 3, 5)',
        expectedQuery: 'SELECT * FROM employees WHERE department_id IN (1, 3, 5)',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all products with price BETWEEN $30 and $50.',
        hint: 'Use WHERE price BETWEEN 30 AND 50',
        expectedQuery: 'SELECT * FROM products WHERE price BETWEEN 30 AND 50',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Find all customers NOT from USA, Canada, or UK.',
        hint: 'Use WHERE country NOT IN (...)',
        expectedQuery: "SELECT * FROM customers WHERE country NOT IN ('USA', 'Canada', 'UK')",
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 10,
    title: 'IS NULL / IS NOT NULL',
    titleAr: 'IS NULL / IS NOT NULL',
    description: 'Handle missing data correctly — NULLs, three-valued logic, and COALESCE preview.',
    content: `
## NULL in Depth

NULL is one of SQL's most important (and misunderstood) concepts. It deserves its own lesson.

**NULL means:** "This value is unknown, missing, or not applicable."

---

## Why NULL Exists

Consider an \`employees\` table:
- \`manager_id\` for the CEO is NULL (they have no manager — not applicable)
- \`email\` for some contractors is NULL (we don't have it — missing)
- A product's \`discontinued_date\` is NULL (it's still active — not yet happened)

These are all valid uses of NULL. The alternative — using fake values like 0, -1, or 'N/A' — causes far more problems.

---

## The Three-Valued Logic

SQL uses **three-valued logic**: TRUE, FALSE, and **NULL/UNKNOWN**.

When you compare anything to NULL, you get **NULL** (not TRUE, not FALSE):

\`\`\`sql
SELECT NULL = NULL;    -- NULL (unknown)
SELECT NULL = 0;       -- NULL
SELECT NULL = '';      -- NULL
SELECT NULL > 5;       -- NULL
SELECT 1 = NULL;       -- NULL
SELECT NULL != NULL;   -- NULL
\`\`\`

**A WHERE clause only passes rows where the condition is TRUE.** NULL conditions are never passed!

---

## IS NULL and IS NOT NULL

The only correct way to test for NULL:

\`\`\`sql
-- Find employees with no email on file
SELECT name, email
FROM employees
WHERE email IS NULL;

-- Find employees with a registered email
SELECT name, email
FROM employees
WHERE email IS NOT NULL;

-- Find customers with no phone number
SELECT name, phone
FROM customers
WHERE phone IS NULL;

-- Orders with no special notes
SELECT id, order_date, notes
FROM orders
WHERE notes IS NULL;

-- Employees with no manager (top-level)
SELECT name, job_title
FROM employees
WHERE manager_id IS NULL;
\`\`\`

---

## NULL in Aggregate Functions

**Aggregate functions (COUNT, SUM, AVG, etc.) ignore NULLs.**

\`\`\`sql
-- COUNT(*) counts all rows including those with NULLs
SELECT COUNT(*) FROM employees;  -- 25

-- COUNT(column) counts only non-NULL values
SELECT COUNT(email) FROM employees;  -- 23 (2 employees have NULL email)

-- AVG also ignores NULLs — the average is over non-NULL rows only
-- This can give misleading results if NULLs should be treated as 0

-- SUM ignores NULLs — NULL budget items are excluded
SELECT SUM(budget) FROM departments;
-- Returns sum of the 5 departments that have budgets, ignoring the NULL one
\`\`\`

---

## NULL in Calculations

Any arithmetic involving NULL returns NULL:

\`\`\`sql
SELECT NULL + 100;     -- NULL
SELECT salary * NULL;  -- NULL
SELECT 0 / NULL;       -- NULL
\`\`\`

---

## COALESCE — Replace NULL with a Default

\`COALESCE(value, fallback)\` returns the first non-NULL argument:

\`\`\`sql
-- Replace NULL emails with a placeholder
SELECT name, COALESCE(email, 'no-email@unknown.com') AS email
FROM employees;

-- Replace NULL phone with 'Not provided'
SELECT name, COALESCE(phone, 'Not provided') AS phone
FROM customers;

-- Replace NULL budget with 0
SELECT name, COALESCE(budget, 0) AS budget
FROM departments;

-- Multiple fallbacks: uses first non-NULL from the list
SELECT COALESCE(NULL, NULL, 'third', 'fourth');  -- returns 'third'
\`\`\`

---

## NULL in ORDER BY

\`\`\`sql
-- In SQLite, NULLs sort BEFORE other values in ASC order
SELECT name, email FROM employees ORDER BY email ASC;
-- Rows with NULL email appear first

-- Trick to push NULLs to the end in SQLite:
SELECT name, email
FROM employees
ORDER BY email IS NULL ASC, email ASC;
-- "email IS NULL" = 1 for NULL rows, 0 for non-NULL — sorts NULLs last
\`\`\`

---

## Summary: NULL Rules

| Operation | Result |
|-----------|--------|
| \`NULL = anything\` | NULL |
| \`NULL <> anything\` | NULL |
| \`NULL IS NULL\` | TRUE |
| \`NULL IS NOT NULL\` | FALSE |
| \`NULL + number\` | NULL |
| \`COUNT(*)\` with NULLs | Counts them |
| \`COUNT(column)\` with NULLs | Ignores them |
| \`SUM / AVG\` with NULLs | Ignores them |
    `,
    example: `-- Full NULL analysis on the employees table
SELECT
  COUNT(*)              AS total_rows,
  COUNT(email)          AS has_email,
  COUNT(*) - COUNT(email) AS missing_email,
  COUNT(manager_id)     AS has_manager,
  COUNT(*) - COUNT(manager_id) AS no_manager
FROM employees;`,
    exercises: [
      {
        id: 1,
        question: 'Find all employees who have no department assigned (department_id IS NULL).',
        hint: 'Use WHERE department_id IS NULL',
        expectedQuery: 'SELECT * FROM employees WHERE department_id IS NULL',
        checkFunction: (result) => result.length >= 0,
      },
      {
        id: 2,
        question: 'Show all customers with their phone, replacing NULL phone values with the text "No phone".',
        hint: 'Use COALESCE(phone, "No phone") AS phone',
        expectedQuery: "SELECT name, COALESCE(phone, 'No phone') AS phone FROM customers",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Count how many orders have notes (notes IS NOT NULL).',
        hint: 'Use COUNT with WHERE notes IS NOT NULL',
        expectedQuery: 'SELECT COUNT(*) FROM orders WHERE notes IS NOT NULL',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 11,
    title: 'DISTINCT & LIMIT / OFFSET',
    titleAr: 'DISTINCT & LIMIT / OFFSET',
    description: 'Remove duplicates with DISTINCT and paginate results with LIMIT and OFFSET.',
    content: `
## DISTINCT — Unique Values Only

\`DISTINCT\` removes duplicate rows from the result set. It's applied after all other filtering.

\`\`\`sql
SELECT DISTINCT column FROM table;
\`\`\`

### Single Column

\`\`\`sql
-- All unique departments (with no duplicates)
SELECT DISTINCT department_id FROM employees;
-- Returns: 1, 2, 3, 4, 5, NULL — each appearing once

-- All unique job titles
SELECT DISTINCT job_title FROM employees;

-- All unique countries in our customer base
SELECT DISTINCT country FROM customers;

-- All unique order statuses
SELECT DISTINCT status FROM orders;
\`\`\`

### Multiple Columns — Combination Uniqueness

\`DISTINCT\` applies to the entire row, not individual columns:

\`\`\`sql
-- Unique (department_id, job_title) combinations
SELECT DISTINCT department_id, job_title
FROM employees
ORDER BY department_id, job_title;

-- NOT: unique department_id AND unique job_title separately!
-- The pair must be unique.
\`\`\`

### DISTINCT with COUNT

A very common pattern — count unique values:

\`\`\`sql
-- How many unique departments have employees?
SELECT COUNT(DISTINCT department_id) FROM employees;

-- How many distinct countries do our customers come from?
SELECT COUNT(DISTINCT country) FROM customers;

-- How many different products have been ordered?
SELECT COUNT(DISTINCT product_id) FROM order_items;
\`\`\`

---

## LIMIT — Restrict the Number of Rows

\`LIMIT\` caps how many rows are returned. Always use it with \`ORDER BY\` so you get a **consistent** result.

\`\`\`sql
-- Top 5 most expensive products
SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 5;

-- The 3 most recently hired employees
SELECT name, hire_date
FROM employees
ORDER BY hire_date DESC
LIMIT 3;

-- Just peek at some rows (no meaningful order needed)
SELECT * FROM orders LIMIT 10;
\`\`\`

**Without ORDER BY, LIMIT returns an arbitrary set of rows.** The database chooses which rows — there's no guarantee you'll get the same rows twice!

---

## OFFSET — Skip Rows (Pagination)

\`OFFSET\` skips a number of rows before starting to return results. Combined with \`LIMIT\`, it implements **pagination**.

\`\`\`sql
-- Page 1: rows 1-5
SELECT name, price FROM products ORDER BY id LIMIT 5 OFFSET 0;

-- Page 2: rows 6-10
SELECT name, price FROM products ORDER BY id LIMIT 5 OFFSET 5;

-- Page 3: rows 11-15
SELECT name, price FROM products ORDER BY id LIMIT 5 OFFSET 10;

-- Formula: OFFSET = (page_number - 1) * page_size
\`\`\`

### Real-world pagination example:

\`\`\`sql
-- Show page 3 of orders (10 orders per page), newest first
SELECT id, customer_id, order_date, total_amount
FROM orders
ORDER BY order_date DESC
LIMIT 10 OFFSET 20;
\`\`\`

---

## LIMIT in Other Databases

| Database | Syntax |
|----------|--------|
| SQLite, MySQL, PostgreSQL | \`LIMIT n OFFSET m\` |
| PostgreSQL also supports | \`LIMIT n OFFSET m\` or \`FETCH FIRST n ROWS ONLY\` |
| SQL Server | \`SELECT TOP n\` or \`OFFSET m ROWS FETCH NEXT n ROWS ONLY\` |
| Oracle | \`FETCH FIRST n ROWS ONLY\` or \`ROWNUM <= n\` |

---

## Practical Patterns

\`\`\`sql
-- Find the single cheapest available product
SELECT name, price
FROM products
WHERE is_available = 1
ORDER BY price ASC
LIMIT 1;

-- Find the 5 customers who joined earliest
SELECT name, joined_date
FROM customers
ORDER BY joined_date ASC
LIMIT 5;

-- Quick data sample for exploration
SELECT * FROM order_items LIMIT 20;
\`\`\`
    `,
    example: `-- Top 3 departments by number of unique job titles
SELECT department_id,
       COUNT(DISTINCT job_title) AS unique_roles
FROM employees
WHERE department_id IS NOT NULL
GROUP BY department_id
ORDER BY unique_roles DESC
LIMIT 3;`,
    exercises: [
      {
        id: 1,
        question: 'Get the top 5 most expensive products (name and price only).',
        hint: 'ORDER BY price DESC LIMIT 5',
        expectedQuery: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all distinct loyalty_tier values in the customers table.',
        hint: 'SELECT DISTINCT loyalty_tier FROM customers',
        expectedQuery: 'SELECT DISTINCT loyalty_tier FROM customers',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Show orders 6 through 10 sorted by order_date (use LIMIT with OFFSET).',
        hint: 'LIMIT 5 OFFSET 5',
        expectedQuery: 'SELECT * FROM orders ORDER BY order_date LIMIT 5 OFFSET 5',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 3 — DDL: DEFINING DATABASE STRUCTURE
  // ════════════════════════════════════════════════════
  {
    id: 12,
    title: 'CREATE TABLE & Data Types',
    titleAr: 'CREATE TABLE & Data Types',
    description: 'Create tables, choose correct data types, and use IF NOT EXISTS.',
    content: `
## CREATE TABLE

\`CREATE TABLE\` defines a new table in the database — its name, columns, data types, and initial constraints.

\`\`\`sql
CREATE TABLE table_name (
  column1  datatype  [constraints],
  column2  datatype  [constraints],
  ...
  [table_constraints]
);
\`\`\`

---

## A Complete Example

\`\`\`sql
CREATE TABLE employees (
  id            INTEGER PRIMARY KEY,
  name          TEXT    NOT NULL,
  email         TEXT    UNIQUE,
  department_id INTEGER,
  salary        REAL    NOT NULL DEFAULT 0,
  hire_date     TEXT    NOT NULL,
  is_active     INTEGER DEFAULT 1,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);
\`\`\`

Let's break this down:
- \`id INTEGER PRIMARY KEY\` — unique row identifier, auto-incremented in SQLite
- \`name TEXT NOT NULL\` — a required text field
- \`email TEXT UNIQUE\` — no two employees can have the same email (NULLs are still allowed)
- \`salary REAL NOT NULL DEFAULT 0\` — required, defaults to 0 if not provided
- \`FOREIGN KEY ...\` — table-level constraint linking to departments

---

## SQLite Data Type System (Type Affinity)

SQLite uses a loose type system called **type affinity**. Instead of strict types, every column has a preferred type, but can store any value:

| Affinity | Keywords that map to it |
|----------|------------------------|
| INTEGER | INT, INTEGER, TINYINT, SMALLINT, MEDIUMINT, BIGINT |
| REAL | REAL, FLOAT, DOUBLE |
| TEXT | TEXT, CHAR, VARCHAR, CLOB |
| BLOB | BLOB, no type specified |
| NUMERIC | NUMERIC, DECIMAL, BOOLEAN, DATE, DATETIME |

\`\`\`sql
-- These are all valid in SQLite and mean the same thing:
CREATE TABLE test (
  a INTEGER,
  b INT,
  c BIGINT,     -- stored as INTEGER
  d VARCHAR(50), -- stored as TEXT (length ignored)
  e DECIMAL(10,2) -- stored as NUMERIC
);
\`\`\`

---

## Standard Types for Portability

When writing code that should work across databases, use these types:

\`\`\`sql
CREATE TABLE products (
  id             INTEGER       PRIMARY KEY,
  name           VARCHAR(255)  NOT NULL,
  description    TEXT,
  price          DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER       DEFAULT 0,
  created_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  is_available   BOOLEAN       DEFAULT TRUE
);
\`\`\`

---

## CREATE TABLE IF NOT EXISTS

Prevents errors if the table already exists:

\`\`\`sql
CREATE TABLE IF NOT EXISTS temp_results (
  id      INTEGER PRIMARY KEY,
  result  TEXT
);
-- No error if temp_results already exists
\`\`\`

---

## CREATE TABLE AS SELECT (CTAS)

Create a new table from the results of a query:

\`\`\`sql
-- Create a backup of employees
CREATE TABLE employees_backup AS
SELECT * FROM employees;

-- Create a summary table
CREATE TABLE dept_summary AS
SELECT
  department_id,
  COUNT(*)       AS headcount,
  AVG(salary)    AS avg_salary,
  SUM(salary)    AS total_salary
FROM employees
GROUP BY department_id;
\`\`\`

The new table inherits the column names and data from the query, but **not** constraints or indexes.

---

## Table and Column Naming Conventions

\`\`\`sql
-- ✅ Good names
CREATE TABLE order_items  (...)   -- lowercase, underscores
CREATE TABLE customer_logs (...)  -- descriptive, plural

-- ❌ Avoid
CREATE TABLE OrderItems (...)     -- mixed case (some databases case-sensitive)
CREATE TABLE t1 (...)             -- meaningless name
CREATE TABLE "My Table" (...)     -- spaces require quoting everywhere

-- Column naming
id          INTEGER   -- always name the PK 'id'
customer_id INTEGER   -- foreign keys: tablename_id
created_at  TEXT      -- timestamps: _at suffix
updated_at  TEXT
is_active   INTEGER   -- booleans: is_ prefix
\`\`\`

---

## Practical Example: Build a Blog

\`\`\`sql
CREATE TABLE authors (
  id         INTEGER PRIMARY KEY,
  username   TEXT    NOT NULL UNIQUE,
  email      TEXT    NOT NULL UNIQUE,
  bio        TEXT,
  joined_at  TEXT    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id           INTEGER PRIMARY KEY,
  author_id    INTEGER NOT NULL,
  title        TEXT    NOT NULL,
  body         TEXT    NOT NULL,
  published_at TEXT,
  view_count   INTEGER DEFAULT 0,
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

CREATE TABLE comments (
  id         INTEGER PRIMARY KEY,
  post_id    INTEGER NOT NULL,
  author_id  INTEGER,
  body       TEXT    NOT NULL,
  created_at TEXT    DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id)   REFERENCES posts(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);
\`\`\`
    `,
    example: `-- Create a temporary table and populate it
CREATE TABLE IF NOT EXISTS salary_bands (
  id        INTEGER PRIMARY KEY,
  band_name TEXT NOT NULL,
  min_salary REAL NOT NULL,
  max_salary REAL NOT NULL
);

INSERT INTO salary_bands VALUES (1, 'Junior',   40000, 65000);
INSERT INTO salary_bands VALUES (2, 'Mid',       65001, 90000);
INSERT INTO salary_bands VALUES (3, 'Senior',    90001, 120000);
INSERT INTO salary_bands VALUES (4, 'Executive', 120001, 999999);

SELECT * FROM salary_bands;`,
    exercises: [
      {
        id: 1,
        question: 'Create a table called "skills" with columns: id (INTEGER PRIMARY KEY), employee_id (INTEGER), skill_name (TEXT NOT NULL), and proficiency_level (TEXT DEFAULT "Beginner").',
        hint: 'Use CREATE TABLE skills (...)',
        expectedQuery: "CREATE TABLE skills (id INTEGER PRIMARY KEY, employee_id INTEGER, skill_name TEXT NOT NULL, proficiency_level TEXT DEFAULT 'Beginner')",
        checkFunction: () => true,
      },
      {
        id: 2,
        question: 'Create a backup of the products table called "products_backup" using CREATE TABLE AS SELECT.',
        hint: 'CREATE TABLE products_backup AS SELECT * FROM products',
        expectedQuery: 'CREATE TABLE products_backup AS SELECT * FROM products',
        checkFunction: () => true,
      },
    ],
  },

  {
    id: 13,
    title: 'Constraints',
    titleAr: 'Constraints',
    description: 'PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT — enforcing data integrity.',
    content: `
## Constraints — Enforcing Data Integrity

Constraints are rules applied to columns or tables that the database enforces automatically. They prevent invalid data from entering the database.

---

## NOT NULL

Ensures a column cannot store NULL. Use for any column where a value is always required.

\`\`\`sql
CREATE TABLE employees (
  id     INTEGER PRIMARY KEY,
  name   TEXT NOT NULL,    -- every employee must have a name
  salary REAL NOT NULL     -- every employee must have a salary
);

-- ❌ This fails:
INSERT INTO employees (id, salary) VALUES (1, 50000);
-- Error: NOT NULL constraint failed: employees.name
\`\`\`

---

## PRIMARY KEY

Uniquely identifies each row. Implies NOT NULL + UNIQUE.

\`\`\`sql
-- Column-level (most common)
CREATE TABLE products (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

-- Composite primary key (table-level) — for junction tables
CREATE TABLE order_items (
  order_id   INTEGER,
  product_id INTEGER,
  quantity   INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)  -- combination must be unique
);
\`\`\`

In SQLite, an \`INTEGER PRIMARY KEY\` column automatically gets a unique integer assigned if you don't provide one (auto-increment behavior).

---

## UNIQUE

Ensures all values in the column are distinct. Unlike PRIMARY KEY, multiple UNIQUE columns are allowed per table, and a UNIQUE column CAN have NULL values (NULLs are considered distinct from each other).

\`\`\`sql
CREATE TABLE employees (
  id    INTEGER PRIMARY KEY,
  email TEXT UNIQUE,    -- no two employees can share an email
  name  TEXT NOT NULL
);

-- Multi-column UNIQUE: the combination must be unique
CREATE TABLE enrollments (
  student_id INTEGER,
  course_id  INTEGER,
  UNIQUE (student_id, course_id)  -- same student can't enroll in same course twice
);
\`\`\`

---

## DEFAULT

Provides a default value when no value is supplied in INSERT.

\`\`\`sql
CREATE TABLE orders (
  id           INTEGER PRIMARY KEY,
  customer_id  INTEGER NOT NULL,
  status       TEXT DEFAULT 'pending',
  created_at   TEXT DEFAULT CURRENT_TIMESTAMP,
  total_amount REAL DEFAULT 0.00
);

-- INSERT without specifying status — gets 'pending' automatically
INSERT INTO orders (customer_id) VALUES (5);
SELECT status FROM orders WHERE customer_id = 5;  -- 'pending'
\`\`\`

---

## CHECK

Validates values against a custom condition. The row is rejected if CHECK evaluates to FALSE.

\`\`\`sql
CREATE TABLE employees (
  id     INTEGER PRIMARY KEY,
  name   TEXT NOT NULL,
  salary REAL NOT NULL CHECK (salary > 0),
  age    INTEGER CHECK (age >= 18 AND age <= 100)
);

-- ❌ This fails:
INSERT INTO employees VALUES (1, 'Test', -500, 30);
-- Error: CHECK constraint failed: employees.salary > 0

CREATE TABLE products (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  price REAL NOT NULL CHECK (price >= 0),
  stock INTEGER DEFAULT 0 CHECK (stock >= 0)
);

-- With named constraint (makes error messages clearer)
CREATE TABLE orders (
  id     INTEGER PRIMARY KEY,
  status TEXT NOT NULL,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'))
);
\`\`\`

---

## FOREIGN KEY

Links a column in one table to the PRIMARY KEY of another table. Ensures **referential integrity** — you can't have an order for a customer that doesn't exist.

\`\`\`sql
CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE CASCADE    -- delete orders if customer is deleted
    ON UPDATE CASCADE    -- update customer_id if it changes
);
\`\`\`

### ON DELETE / ON UPDATE actions:

| Action | Behavior |
|--------|----------|
| \`RESTRICT\` | Prevent deleting/updating the parent row |
| \`CASCADE\` | Automatically delete/update child rows |
| \`SET NULL\` | Set the FK column to NULL |
| \`SET DEFAULT\` | Set the FK column to its default value |
| \`NO ACTION\` | Same as RESTRICT in most databases |

\`\`\`sql
-- ⚠️ SQLite: foreign key enforcement is OFF by default!
-- You must enable it with:
PRAGMA foreign_keys = ON;

-- ❌ Without enabling: this won't error even though customer 999 doesn't exist
INSERT INTO orders (customer_id) VALUES (999);
\`\`\`

---

## Constraint Names

Naming constraints makes error messages readable and allows you to DROP them later:

\`\`\`sql
CREATE TABLE employees (
  id            INTEGER,
  salary        REAL,
  department_id INTEGER,
  CONSTRAINT pk_employees PRIMARY KEY (id),
  CONSTRAINT chk_salary   CHECK (salary > 0),
  CONSTRAINT fk_dept      FOREIGN KEY (department_id) REFERENCES departments(id)
);
\`\`\`
    `,
    example: `-- Create a well-constrained table for product reviews
CREATE TABLE IF NOT EXISTS reviews (
  id          INTEGER PRIMARY KEY,
  product_id  INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  created_at  TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (product_id, customer_id),
  FOREIGN KEY (product_id)  REFERENCES products(id),
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO reviews (product_id, customer_id, rating, review_text)
VALUES (1, 1, 5, 'Excellent laptop!');

SELECT * FROM reviews;`,
    exercises: [
      {
        id: 1,
        question: 'Create a table "coupons" with: id (PK), code (TEXT UNIQUE NOT NULL), discount_percent (REAL with CHECK that it is between 1 and 100), is_active (INTEGER DEFAULT 1).',
        hint: 'Use CHECK (discount_percent BETWEEN 1 AND 100)',
        expectedQuery: 'CREATE TABLE coupons (id INTEGER PRIMARY KEY, code TEXT UNIQUE NOT NULL, discount_percent REAL CHECK (discount_percent BETWEEN 1 AND 100), is_active INTEGER DEFAULT 1)',
        checkFunction: () => true,
      },
    ],
  },

  {
    id: 14,
    title: 'ALTER TABLE & DROP',
    titleAr: 'ALTER TABLE & DROP',
    description: 'Modify table structure: add/drop columns, rename, and safely drop tables.',
    content: `
## ALTER TABLE — Modifying Structure

\`ALTER TABLE\` changes the structure of an existing table without losing data (usually).

---

## Adding Columns

\`\`\`sql
-- Add a single column
ALTER TABLE employees
ADD COLUMN phone TEXT;

-- Add with a default value (important for existing rows!)
ALTER TABLE employees
ADD COLUMN bonus_percent REAL DEFAULT 0.0;

-- Add with NOT NULL requires a default (otherwise existing rows would be NULL)
ALTER TABLE products
ADD COLUMN weight_kg REAL NOT NULL DEFAULT 0;
-- Without DEFAULT, this would fail on tables with existing data

-- Add a new column for tracking updates
ALTER TABLE orders
ADD COLUMN updated_at TEXT;
\`\`\`

**Warning:** In SQLite, \`ALTER TABLE\` is limited — you can only add columns and rename the table. PostgreSQL, MySQL, and SQL Server support \`DROP COLUMN\`, \`MODIFY COLUMN\`, and \`ADD CONSTRAINT\`.

---

## Renaming a Table

\`\`\`sql
ALTER TABLE old_table_name RENAME TO new_table_name;

-- Example
ALTER TABLE employees RENAME TO staff;
\`\`\`

---

## Renaming a Column (SQLite 3.25+)

\`\`\`sql
ALTER TABLE employees RENAME COLUMN hire_date TO start_date;

-- In PostgreSQL / MySQL:
ALTER TABLE employees RENAME COLUMN hire_date TO start_date;
\`\`\`

---

## Dropping a Column (Not SQLite)

In PostgreSQL and MySQL, you can remove a column:

\`\`\`sql
-- PostgreSQL / MySQL only
ALTER TABLE employees DROP COLUMN middle_name;
ALTER TABLE employees DROP COLUMN IF EXISTS middle_name;  -- safe version
\`\`\`

In SQLite, dropping a column requires:
1. Creating a new table with the desired structure
2. Copying data over
3. Dropping the old table
4. Renaming the new table

\`\`\`sql
-- SQLite workaround to drop a column:
CREATE TABLE employees_new AS
SELECT id, name, email, salary FROM employees;  -- omit the column to drop
DROP TABLE employees;
ALTER TABLE employees_new RENAME TO employees;
\`\`\`

---

## TRUNCATE TABLE

Removes ALL rows instantly without logging individual deletes. Much faster than DELETE for large tables.

\`\`\`sql
-- Remove all data but keep the table structure
TRUNCATE TABLE temp_logs;

-- SQLite doesn't have TRUNCATE — use DELETE instead:
DELETE FROM temp_logs;  -- same effect in SQLite

-- Or recreate:
DROP TABLE temp_logs;
CREATE TABLE temp_logs (id INTEGER PRIMARY KEY, message TEXT);
\`\`\`

| Feature | DELETE | TRUNCATE |
|---------|--------|----------|
| Can use WHERE | ✅ Yes | ❌ No |
| Can rollback | ✅ Yes | ❌ Usually No |
| Speed on large tables | Slow | Very fast |
| Resets auto-increment | ❌ No | ✅ Yes (in MySQL) |

---

## DROP TABLE

Permanently deletes a table and all its data. **Irreversible!**

\`\`\`sql
-- Drop a table (fails if table doesn't exist)
DROP TABLE old_data;

-- Safe version — no error if table doesn't exist
DROP TABLE IF EXISTS old_data;

-- Drop multiple tables at once (PostgreSQL / MySQL)
DROP TABLE IF EXISTS temp1, temp2, temp3;
\`\`\`

---

## Practical Migration Example

Real-world scenario: adding an audit trail to orders:

\`\`\`sql
-- Step 1: Add columns for tracking
ALTER TABLE orders ADD COLUMN created_at TEXT;
ALTER TABLE orders ADD COLUMN updated_at TEXT;

-- Step 2: Populate existing rows with a default date
UPDATE orders SET created_at = order_date WHERE created_at IS NULL;
UPDATE orders SET updated_at = order_date WHERE updated_at IS NULL;

-- Step 3: Verify
SELECT id, order_date, created_at, updated_at FROM orders LIMIT 5;
\`\`\`
    `,
    example: `-- Add a "notes" column to products if it doesn't exist
ALTER TABLE products ADD COLUMN internal_notes TEXT;

-- Verify the new column
SELECT id, name, internal_notes FROM products LIMIT 5;`,
    exercises: [
      {
        id: 1,
        question: 'Add a column "middle_name" of type TEXT to the employees table.',
        hint: 'ALTER TABLE employees ADD COLUMN middle_name TEXT',
        expectedQuery: 'ALTER TABLE employees ADD COLUMN middle_name TEXT',
        checkFunction: () => true,
      },
      {
        id: 2,
        question: 'Create a temporary table "temp_products" and then drop it using DROP TABLE IF EXISTS.',
        hint: 'First CREATE TABLE temp_products (...), then DROP TABLE IF EXISTS temp_products',
        expectedQuery: 'CREATE TABLE IF NOT EXISTS temp_products (id INTEGER PRIMARY KEY, name TEXT); DROP TABLE IF EXISTS temp_products',
        checkFunction: () => true,
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 4 — DML: INSERT, UPDATE, DELETE
  // ════════════════════════════════════════════════════
  {
    id: 15,
    title: 'INSERT INTO',
    titleAr: 'INSERT INTO',
    description: 'Add single rows, multiple rows at once, and insert from SELECT queries.',
    content: `
## INSERT INTO — Adding Data

\`INSERT INTO\` adds new rows to a table.

---

## Basic Syntax — Specifying Columns

\`\`\`sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
\`\`\`

This is the **recommended** form because:
- You can specify columns in any order
- You can omit optional columns (they get their DEFAULT value)
- Adding new columns to the table won't break your INSERT statements

\`\`\`sql
-- Insert a new employee
INSERT INTO employees (name, email, department_id, salary, hire_date, job_title)
VALUES ('John Doe', 'john@company.com', 1, 72000, '2024-01-15', 'Software Engineer');

-- Insert a customer without phone (NULL allowed)
INSERT INTO customers (name, email, city, country, joined_date)
VALUES ('Alice New', 'alice.new@email.com', 'Boston', 'USA', '2024-01-20');
-- phone will be NULL (no default), loyalty_tier will be 'Bronze' (has default)
\`\`\`

---

## Inserting All Columns (Position-Based)

\`\`\`sql
-- Without column list: must provide values for ALL columns in ORDER
INSERT INTO departments VALUES
  (7, 'Operations', 'Building E', 275000, NULL);
-- ⚠️ Risky: if column order changes, your values get mixed up
\`\`\`

---

## Multiple Rows in One INSERT

Much faster than individual INSERTs — fewer round-trips to the database:

\`\`\`sql
-- Insert multiple rows in a single statement
INSERT INTO categories (id, name, description)
VALUES
  (6, 'Toys',       'Games, puzzles, and educational toys'),
  (7, 'Automotive', 'Car accessories and parts'),
  (8, 'Beauty',     'Skincare, makeup, and personal care');

-- Multiple employees at once
INSERT INTO employees (name, email, department_id, salary, hire_date, job_title)
VALUES
  ('Tom Chen',    'tom@company.com',    1, 78000, '2024-02-01', 'Backend Engineer'),
  ('Sara Ahmed',  'sara@company.com',   2, 65000, '2024-02-15', 'Marketing Analyst'),
  ('Mike Patel',  'mike@company.com',   3, 58000, '2024-03-01', 'Sales Rep');
\`\`\`

---

## INSERT OR REPLACE / INSERT OR IGNORE (SQLite)

Handle conflicts gracefully:

\`\`\`sql
-- If an employee with the same email already exists, replace them
INSERT OR REPLACE INTO employees (id, name, email, salary, hire_date)
VALUES (2, 'Bob Smith Updated', 'bob@company.com', 97000, '2017-06-15');

-- If duplicate, silently skip the insert
INSERT OR IGNORE INTO employees (name, email, salary, hire_date)
VALUES ('Bob Smith', 'bob@company.com', 95000, '2017-06-15');
-- bob@company.com already exists, nothing happens

-- Standard SQL equivalent (PostgreSQL):
INSERT INTO employees (...) VALUES (...)
ON CONFLICT (email) DO NOTHING;

-- Or update on conflict:
INSERT INTO employees (email, salary) VALUES ('bob@company.com', 97000)
ON CONFLICT (email) DO UPDATE SET salary = EXCLUDED.salary;
\`\`\`

---

## INSERT ... SELECT — Copy Data from Another Table

Insert the results of a query:

\`\`\`sql
-- Archive old orders to a backup table
CREATE TABLE orders_archive AS SELECT * FROM orders WHERE 1=0;  -- empty copy of structure

INSERT INTO orders_archive
SELECT * FROM orders
WHERE order_date < '2024-01-01';

-- Create a summary with INSERT SELECT
CREATE TABLE IF NOT EXISTS high_earners (
  id     INTEGER PRIMARY KEY,
  name   TEXT,
  salary REAL
);

INSERT INTO high_earners (id, name, salary)
SELECT id, name, salary
FROM employees
WHERE salary > 90000;

SELECT * FROM high_earners;
\`\`\`

---

## Returning Inserted Values (PostgreSQL)

\`\`\`sql
-- PostgreSQL only: return the auto-generated ID
INSERT INTO employees (name, salary, hire_date)
VALUES ('New Person', 60000, '2024-01-01')
RETURNING id, name;
\`\`\`

---

## Common Mistakes

\`\`\`sql
-- ❌ Too few values (if no column list, must match ALL columns)
INSERT INTO employees VALUES (99, 'Incomplete');

-- ❌ Wrong data type
INSERT INTO employees (salary) VALUES ('seventy-five thousand');
-- In SQLite: might work but stores text, not a number

-- ❌ Violating NOT NULL
INSERT INTO employees (email, salary, hire_date) VALUES ('x@y.com', 50000, '2024-01-01');
-- Error: NOT NULL constraint failed: employees.name

-- ❌ Duplicate PRIMARY KEY
INSERT INTO employees (id, name, salary, hire_date) VALUES (1, 'Duplicate', 50000, '2024-01-01');
-- Error: UNIQUE constraint failed: employees.id
\`\`\`
    `,
    example: `-- Insert a new product and verify it was added
INSERT INTO products (id, name, category_id, price, stock_quantity, supplier, is_available)
VALUES (21, 'Smart Watch', 1, 249.99, 50, 'TechCorp', 1);

SELECT * FROM products WHERE id = 21;`,
    exercises: [
      {
        id: 1,
        question: 'Insert a new customer: name="Test Customer", email="test@test.com", city="Miami", country="USA", joined_date="2024-08-01", loyalty_tier="Bronze".',
        hint: 'Use INSERT INTO customers (columns) VALUES (...)',
        expectedQuery: "INSERT INTO customers (name, email, city, country, joined_date, loyalty_tier) VALUES ('Test Customer', 'test@test.com', 'Miami', 'USA', '2024-08-01', 'Bronze')",
        checkFunction: () => true,
      },
      {
        id: 2,
        question: 'Insert 2 new products in a single INSERT statement: ("Webcam HD", category 1, price 79.99, stock 100) and ("USB Microphone", category 1, price 59.99, stock 80).',
        hint: 'Use INSERT INTO products VALUES (...), (...) with multiple value sets',
        expectedQuery: "INSERT INTO products (name, category_id, price, stock_quantity) VALUES ('Webcam HD', 1, 79.99, 100), ('USB Microphone', 1, 59.99, 80)",
        checkFunction: () => true,
      },
    ],
  },
];
