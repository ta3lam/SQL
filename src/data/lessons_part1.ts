import { Lesson } from '../types';

export const lessons: Lesson[] = [

  // ════════════════════════════════════════════════════
  //  LEVEL 0 — INTRODUCTION
  // ════════════════════════════════════════════════════
  {
    id: 1,
    title: 'What is a Database?',
    titleAr: 'ما هي قاعدة البيانات؟',
    description: 'Understand databases, RDBMS, tables, rows, and columns from the ground up.',
    descriptionAr: 'افهم قواعد البيانات وأنظمة RDBMS والجداول والصفوف والأعمدة من الصفر.',
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
    contentAr: `
## ما هي قاعدة البيانات؟

**قاعدة البيانات** هي مجموعة منظمة من البيانات المنظّمة المخزّنة إلكترونيًا. فكّر فيها كخزانة ملفات متطورة للغاية — بدلًا من مجلدات ورقية، تُخزَّن البيانات في جداول يمكن البحث فيها وفرزها ودمجها في أجزاء من الثانية.

تعتمد تقريبًا كل برمجية تستخدمها على قاعدة بيانات: تطبيقات البنوك، وسائل التواصل الاجتماعي، متاجر الإلكترونية، سجلات المستشفيات، حجز الطيران — جميعها تعمل بقواعد بيانات.

---

## قواعد البيانات العلائقية مقابل غير العلائقية

| النوع | أمثلة | الأنسب لـ |
|------|----------|----------|
| **العلائقية (SQL)** | PostgreSQL, MySQL, SQLite, SQL Server, Oracle | البيانات المنظّمة، الاستعلامات المعقدة، المعاملات |
| **المستندات** | MongoDB, CouchDB | المخططات المرنة، المستندات بصيغة JSON |
| **المفتاح-القيمة** | Redis, DynamoDB | التخزين المؤقت، الجلسات، البحث البسيط |
| **عائلة الأعمدة** | Cassandra, HBase | الكتابة الضخمة، البيانات الزمنية |
| **الرسم البياني** | Neo4j | الشبكات الاجتماعية، محركات التوصيات |

يركّز هذا الكورس على **أنظمة إدارة قواعد البيانات العلائقية (RDBMS)** — النوع الأكثر استخدامًا في تطوير البرمجيات المهنية.

---

## لبنات البناء في قاعدة البيانات العلائقية

### الجداول (Tables)
يخزّن الجدول بيانات عن نوع واحد من الأشياء. أمثلة:
- \`employees\` — يخزّن صفًا واحدًا لكل موظف
- \`orders\` — يخزّن صفًا واحدًا لكل طلب
- \`products\` — يخزّن صفًا واحدًا لكل منتج

### الأعمدة (Columns / Fields / Attributes)
يخزّن كل عمود سمة محددة واحدة. في جدول \`employees\`:
- \`id\` — معرّف فريد
- \`name\` — الاسم الكامل
- \`salary\` — الراتب الشهري
- \`hire_date\` — تاريخ الانضمام

### الصفوف (Rows / Records / Tuples)
كل صف هو سجل كامل. صف واحد في \`employees\` = موظف حقيقي واحد.

### المفتاح الأساسي (PRIMARY KEY)
عمود (أو مجموعة أعمدة) يُعرّف كل صف **بشكل فريد**. لا يمكن لصفّين مشاركة نفس قيمة المفتاح الأساسي. يُسمّى عادةً \`id\`.

### المفتاح الخارجي (FOREIGN KEY)
عمود يشير إلى المفتاح الأساسي لـ **جدول آخر**، مما يُنشئ علاقة. مثلًا، \`employees.department_id\` يشير إلى \`departments.id\`.

---

## قاعدة بيانات التدريب

في هذا الكورس، ستعمل مع قاعدة بيانات شركة واقعية تحتوي على 7 جداول:

\`\`\`
departments   ←──── employees ────→  (self-reference: manager_id)
                        │
customers               │
    │               (no direct link)
    │
   orders ────→  order_items ────→  products ────→  categories
\`\`\`

| الجدول | الوصف | عدد الصفوف |
|-------|-------------|------|
| \`departments\` | أقسام الشركة | 6 |
| \`employees\` | الموظفون مع الرواتب والمديرين | 25 |
| \`customers\` | العملاء المسجّلون | 20 |
| \`categories\` | تصنيفات المنتجات | 5 |
| \`products\` | المنتجات المعروضة للبيع | 20 |
| \`orders\` | طلبات الشراء للعملاء | 30 |
| \`order_items\` | بنود كل طلب | 54 |

---

## لماذا SQL وليس Excel أو Google Sheets؟

| الميزة | جداول البيانات | قاعدة بيانات SQL |
|---------|------------|--------------|
| الصفوف | آلاف (بطيء) | مليارات (سريع) |
| جداول متعددة | VLOOKUP يدوي | JOINs مدمجة |
| المستخدمون المتزامنون | مستخدم واحد | آلاف في نفس الوقت |
| سلامة البيانات | لا يوجد تطبيق | قيود ومفاتيح خارجية |
| التحليلات المعقدة | محدودة | استعلامات فرعية، دوال النوافذ، CTEs |
| الأتمتة | ماكروز | إجراءات مخزّنة، محفّزات |

---

## المصطلحات الأساسية

- **Schema (المخطط)** — بنية/مخطط قاعدة البيانات (أي الجداول الموجودة وأعمدتها وقيودها)
- **Query (الاستعلام)** — طلب ترسله إلى قاعدة البيانات لاسترجاع أو تعديل البيانات
- **Result set (مجموعة النتائج)** — جدول الصفوف الذي يُعيده استعلام SELECT
- **NULL** — علامة خاصة تعني "لا قيمة / مجهول" (ليست صفرًا، وليست نصًا فارغًا)
- **Index (الفهرس)** — بنية بيانات تسرّع عمليات البحث (مثل فهرس الكتاب)
- **Transaction (المعاملة)** — مجموعة عمليات إما تنجح كلها أو تفشل كلها
    `,
    example: `-- Explore what tables we have and their data
SELECT * FROM departments;`,
    exercises: [
      {
        id: 1,
        question: 'Run a query to see all rows in the employees table.',
        questionAr: 'اكتب استعلامًا لعرض جميع الصفوف في جدول employees.',
        hint: 'Use SELECT * FROM followed by the table name.',
        hintAr: 'استخدم SELECT * FROM متبوعًا باسم الجدول.',
        expectedQuery: 'SELECT * FROM employees',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'View all rows in the products table.',
        questionAr: 'اعرض جميع الصفوف في جدول products.',
        hint: 'Same pattern — SELECT * FROM products',
        hintAr: 'نفس النمط — SELECT * FROM products',
        expectedQuery: 'SELECT * FROM products',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 2,
    title: 'What is SQL?',
    titleAr: 'ما هي SQL؟',
    description: 'History of SQL, its sublanguages (DDL, DML, DCL, TCL), and SQL dialects.',
    descriptionAr: 'تاريخ SQL ولغاتها الفرعية (DDL, DML, DCL, TCL) ومتغيراتها المختلفة.',
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
    contentAr: `
## ما هي SQL؟

**SQL** (لغة الاستعلام المنظّمة، وتُنطق "سيكويل" أو "S-Q-L") هي اللغة المعيارية للتواصل مع قواعد البيانات العلائقية. طوّرها دونالد تشامبرلين وريموند بويس في شركة IBM في مطلع السبعينيات، استنادًا إلى النموذج العلائقي الذي وضعه إدغار كود.

أصبحت SQL معيار ANSI في 1986 ومعيار ISO في 1987. وعلى الرغم من مرور أكثر من 50 عامًا عليها، فإنها تبقى اللغة السائدة في العمل بالبيانات.

---

## اللغات الفرعية الأربع لـ SQL

تنقسم SQL إلى أربع فئات حسب ما تريد فعله:

### DDL — لغة تعريف البيانات (Data Definition Language)
*تُنشئ وتعدّل بنية كائنات قاعدة البيانات.*

| الأمر | الغرض |
|---------|---------|
| \`CREATE\` | إنشاء جدول أو فهرس أو عرض جديد |
| \`ALTER\` | تعديل بنية جدول موجود |
| \`DROP\` | حذف جدول أو فهرس أو عرض بالكامل |
| \`TRUNCATE\` | إزالة جميع الصفوف من جدول فورًا |
| \`RENAME\` | إعادة تسمية جدول أو عمود |

### DML — لغة التعامل مع البيانات (Data Manipulation Language)
*تتعامل مع البيانات الفعلية داخل الجداول.*

| الأمر | الغرض |
|---------|---------|
| \`SELECT\` | قراءة/استعلام البيانات |
| \`INSERT\` | إضافة صفوف جديدة |
| \`UPDATE\` | تعديل صفوف موجودة |
| \`DELETE\` | حذف صفوف |

### DCL — لغة التحكم في البيانات (Data Control Language)
*تدير الصلاحيات والوصول.*

| الأمر | الغرض |
|---------|---------|
| \`GRANT\` | منح مستخدم صلاحية لفعل شيء ما |
| \`REVOKE\` | سحب صلاحية من مستخدم |

### TCL — لغة التحكم في المعاملات (Transaction Control Language)
*تتحكم في مجموعات العمليات.*

| الأمر | الغرض |
|---------|---------|
| \`BEGIN\` / \`START TRANSACTION\` | بدء معاملة |
| \`COMMIT\` | حفظ جميع التغييرات بشكل دائم |
| \`ROLLBACK\` | التراجع عن جميع التغييرات منذ آخر COMMIT |
| \`SAVEPOINT\` | إنشاء نقطة تفتيش داخل معاملة |

---

## متغيرات SQL (Dialects)

على الرغم من توحيد SQL، تُضيف كل قاعدة بيانات إضافاتها الخاصة. معظم الصياغة الأساسية (SELECT, WHERE, JOIN, GROUP BY, إلخ) متطابقة في جميع قواعد البيانات. تظهر الاختلافات بشكل رئيسي في:

| الميزة | SQLite | PostgreSQL | MySQL | SQL Server |
|---------|--------|-----------|-------|-----------|
| دمج النصوص | \`\|\|\` | \`\|\|\` أو \`concat()\` | \`concat()\` | \`+\` |
| دوال التاريخ | \`strftime()\` | \`date_part()\` | \`DATE_FORMAT()\` | \`DATEPART()\` |
| الزيادة التلقائية | \`INTEGER PRIMARY KEY\` | \`SERIAL\` / \`BIGSERIAL\` | \`AUTO_INCREMENT\` | \`IDENTITY\` |
| صياغة LIMIT | \`LIMIT n\` | \`LIMIT n\` | \`LIMIT n\` | \`TOP n\` |
| القيم المنطقية | \`0\` / \`1\` (أعداد صحيحة) | \`TRUE\` / \`FALSE\` | \`TINYINT(1)\` | \`BIT\` |

> **يستخدم هذا الكورس SQLite**، الذي يعمل كليًا في المتصفح. 95% مما تتعلمه ينطبق مباشرةً على PostgreSQL وMySQL وSQL Server.

---

## كيف تُعالج قاعدة البيانات الاستعلام

عندما تكتب:

\`\`\`sql
SELECT name, salary
FROM employees
WHERE salary > 80000
ORDER BY salary DESC;
\`\`\`

تعالج محرك قاعدة البيانات الاستعلام بهذا الترتيب:
1. **FROM** — تحديد الجدول/الجداول المراد قراءتها
2. **WHERE** — تصفية الصفوف
3. **SELECT** — اختيار الأعمدة المراد إرجاعها
4. **ORDER BY** — ترتيب النتيجة

هذا الترتيب مهم! لا يمكنك الإشارة إلى اسم مستعار من SELECT في شرط WHERE (لأن WHERE يعمل قبل SELECT).

---

## دليل أسلوب كتابة SQL

يمكن كتابة كلمات SQL بحروف كبيرة أو صغيرة — قاعدة البيانات لا تهتم. لكن بالاتفاقية:

\`\`\`sql
-- أسلوب جيد: الكلمات المفتاحية بحروف كبيرة، والمعرّفات بحروف صغيرة
SELECT name, salary
FROM employees
WHERE department_id = 1
ORDER BY salary DESC;

-- صحيح لكن يصعب قراءته
select name, salary from employees where department_id = 1 order by salary desc;
\`\`\`

**أفضل الممارسات:**
- الكلمات المفتاحية بحروف كبيرة (UPPERCASE)
- أسماء الجداول والأعمدة بحروف صغيرة مع شرطة سفلية (\`hire_date\`، وليس \`hireDate\`)
- سطر واحد لكل جملة في الاستعلامات المعقدة
- استخدم أسماء مستعارة ذات معنى: \`emp\` وليس \`e1\`
- أنهِ العبارات بفاصلة منقوطة \`;\`
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
        questionAr: 'اكتب استعلامًا لعرض أول 5 صفوف من جدول orders.',
        hint: 'Use SELECT * FROM orders LIMIT 5',
        hintAr: 'استخدم SELECT * FROM orders LIMIT 5',
        expectedQuery: 'SELECT * FROM orders LIMIT 5',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'View all data from the categories table.',
        questionAr: 'اعرض جميع البيانات من جدول categories.',
        hint: 'SELECT * FROM categories',
        hintAr: 'SELECT * FROM categories',
        expectedQuery: 'SELECT * FROM categories',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 3,
    title: 'Data Types in SQL',
    titleAr: 'أنواع البيانات في SQL',
    description: 'Integer, TEXT, REAL, DATE, BOOLEAN, NULL — understanding and choosing the right type.',
    descriptionAr: 'INTEGER وTEXT وREAL وDATE وBOOLEAN وNULL — فهم أنواع البيانات واختيار النوع المناسب.',
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
    contentAr: `
## أنواع البيانات في SQL

لكل عمود في الجدول **نوع بيانات** يحدد نوع القيم التي يمكن تخزينها فيه. اختيار نوع البيانات الصحيح مهم من أجل:
- **كفاءة التخزين** — استخدم أصغر نوع يناسب بياناتك
- **سلامة البيانات** — ترفض قاعدة البيانات القيم غير المناسبة
- **أداء الاستعلام** — النوع الصحيح يتيح عمليات بحث أسرع
- **الصحة** — لا يمكنك إجراء عمليات حسابية على النصوص

---

## أنواع البيانات الأساسية

### أنواع الأعداد الصحيحة (Integer Types)

\`\`\`sql
-- يستخدم SQLite النوع INTEGER لجميع الأعداد الصحيحة
salary INTEGER       -- مثل: 75000
quantity INTEGER     -- مثل: 50
is_active INTEGER    -- 0 أو 1 (بديل للقيم المنطقية في SQLite)

-- قواعد بيانات أخرى توفر أنواعًا أكثر تفصيلًا:
-- TINYINT (1 بايت، 0–255)
-- SMALLINT (2 بايت، -32768 إلى 32767)
-- INT / INTEGER (4 بايت، ~±2 مليار)
-- BIGINT (8 بايت، ~±9 كوينتليون)
\`\`\`

### أنواع الكسور العشرية (Decimal / Float Types)

\`\`\`sql
price REAL          -- فاصلة عائمة، مثل: 29.99
-- تحذير: REAL/FLOAT لها مشاكل في الدقة للبيانات المالية:
SELECT 0.1 + 0.2;   -- يُرجع 0.30000000000000004 في معظم اللغات!

-- للمبالغ المالية، استخدم DECIMAL(precision, scale) في قواعد البيانات الأخرى:
price DECIMAL(10, 2) -- حتى 10 أرقام، رقمان بعد الفاصلة: 99999999.99
\`\`\`

### أنواع النصوص (Text Types)

\`\`\`sql
-- يستخدم SQLite النوع TEXT لجميع بيانات النصوص
name TEXT          -- نص بأي طول
code TEXT          -- 'ENG-001'

-- قواعد بيانات أخرى:
-- CHAR(n)    -- طول ثابت، يُكمَّل بمسافات (نادر اليوم)
-- VARCHAR(n) -- طول متغير حتى n حرف (الأكثر شيوعًا)
-- TEXT       -- طول غير محدود (للمقالات والأوصاف الطويلة)
-- CLOB       -- كائن النص الكبير (Oracle)
\`\`\`

### أنواع التاريخ والوقت (Date and Time Types)

\`\`\`sql
-- يخزّن SQLite التواريخ كنصوص بتنسيق ISO 8601: 'YYYY-MM-DD'
hire_date TEXT     -- '2024-01-15'
created_at TEXT    -- '2024-01-15 14:30:00'

-- قواعد بيانات أخرى تمتلك أنواعًا مخصصة:
-- DATE       -- '2024-01-15'
-- TIME       -- '14:30:00'
-- DATETIME / TIMESTAMP  -- '2024-01-15 14:30:00'
-- TIMESTAMPTZ           -- طابع زمني مع المنطقة الزمنية (PostgreSQL)
\`\`\`

### القيم المنطقية (Boolean)

\`\`\`sql
-- SQLite: لا يوجد نوع boolean أصلي — استخدم INTEGER (0 = خطأ، 1 = صحيح)
is_active INTEGER DEFAULT 1

-- PostgreSQL: BOOLEAN أصلي
is_active BOOLEAN DEFAULT TRUE

-- MySQL: TINYINT(1) أو BOOLEAN (اسم مستعار)
\`\`\`

---

## NULL — القيمة الخاصة "لا قيمة"

\`NULL\` تمثّل **بيانات مفقودة أو مجهولة**. وهي ليست:
- الصفر (0)
- النص الفارغ ('')
- كلمة "null"

تعني: *"لا نعرف هذه القيمة."*

\`\`\`sql
-- بعض الموظفين ليس لديهم بريد إلكتروني — قيمة email لديهم NULL
SELECT name, email FROM employees WHERE email IS NULL;

-- العمليات الحسابية مع NULL دائمًا تُرجع NULL:
SELECT NULL + 5;     -- NULL
SELECT NULL = NULL;  -- NULL (وليس TRUE!)
SELECT NULL = 0;     -- NULL (وليس TRUE ولا FALSE!)

-- هذا هو المنطق ثلاثي القيم في SQL: TRUE وFALSE وNULL
-- مقارنات NULL تستلزم استخدام IS NULL / IS NOT NULL
\`\`\`

---

## تحويل الأنواع (Type Conversion / Casting)

\`\`\`sql
-- ضمني: يحوّل SQLite تلقائيًا عند الأمان
SELECT '2024-01-15' > '2023-12-31';  -- يعمل كمقارنة نصية

-- صريح: استخدم CAST()
SELECT CAST('42' AS INTEGER) + 1;    -- يُرجع 43
SELECT CAST(salary AS TEXT) FROM employees;  -- رقم إلى نص
SELECT CAST('29.99' AS REAL);        -- نص إلى عدد عشري

-- أو دالة TYPEOF() للفحص:
SELECT TYPEOF(42);       -- 'integer'
SELECT TYPEOF('hello');  -- 'text'
SELECT TYPEOF(3.14);     -- 'real'
SELECT TYPEOF(NULL);     -- 'null'
\`\`\`

---

## اختيار النوع المناسب عمليًا

| حالة الاستخدام | النوع الموصى به |
|----------|-----------------|
| أعداد صحيحة (معرّفات، عدادات) | \`INTEGER\` |
| مبالغ مالية / أسعار | \`DECIMAL(15,2)\` (أو \`REAL\` في SQLite) |
| أسماء وعناوين وأوصاف | \`TEXT\` / \`VARCHAR(n)\` |
| تواريخ | \`DATE\` (أو \`TEXT\` بتنسيق ISO 8601 في SQLite) |
| طوابع زمنية | \`TIMESTAMP\` (أو \`TEXT\` في SQLite) |
| أعلام صحيح/خطأ | \`BOOLEAN\` (أو \`INTEGER 0/1\` في SQLite) |
| نصوص طويلة (مقالات، ملاحظات) | \`TEXT\` / \`CLOB\` |
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
        questionAr: 'استخدم CAST لتحويل عمود price إلى INTEGER في جدول products (يُزيل الأرقام العشرية). اعرض name والسعر الصحيح.',
        hint: 'SELECT name, CAST(price AS INTEGER) FROM products',
        hintAr: 'SELECT name, CAST(price AS INTEGER) FROM products',
        expectedQuery: 'SELECT name, CAST(price AS INTEGER) FROM products',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all employees where the email IS NULL.',
        questionAr: 'ابحث عن جميع الموظفين الذين قيمة email لديهم IS NULL.',
        hint: 'Use WHERE email IS NULL',
        hintAr: 'استخدم WHERE email IS NULL',
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
    titleAr: 'جملة SELECT',
    description: 'Master SELECT: choosing columns, aliases (AS), expressions, and column ordering.',
    descriptionAr: 'أتقن SELECT: اختيار الأعمدة والأسماء المستعارة (AS) والتعبيرات وترتيب الأعمدة.',
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
    contentAr: `
## جملة SELECT

\`SELECT\` هي أكثر أوامر SQL استخدامًا. تسترجع البيانات من جدول واحد أو أكثر. تستخدمها من أجل:
- قراءة أعمدة معينة أو جميع الأعمدة
- إعادة تسمية الأعمدة في العرض باستخدام الأسماء المستعارة
- حساب التعبيرات والقيم المشتقة
- إزالة الصفوف المكررة باستخدام DISTINCT

---

## الصياغة الأساسية

\`\`\`sql
SELECT column1, column2, column3
FROM table_name;
\`\`\`

### تحديد جميع الأعمدة
\`\`\`sql
SELECT * FROM employees;
\`\`\`
رمز \`*\` يعني "جميع الأعمدة". في كود الإنتاج، **اذكر الأعمدة صراحةً دائمًا** — \`*\` جيد للاستكشاف فقط، لكنه:
- يُرجع بيانات لا يحتاجها تطبيقك (إهدار لعرض النطاق الترددي)
- ينكسر إذا أُضيف عمود أو حُذف من الجدول
- يصعب فهم ما يفعله الاستعلام

---

## تحديد أعمدة معينة

\`\`\`sql
-- إرجاع name و salary فقط
SELECT name, salary FROM employees;

-- ترتيب الأعمدة في SELECT يحدد ترتيب أعمدة النتيجة
SELECT salary, name FROM employees;  -- salary تأتي أولًا
\`\`\`

---

## الأسماء المستعارة للأعمدة باستخدام AS

استخدم \`AS\` لإعادة تسمية عمود في المخرجات. هذا لا يغيّر الجدول — فقط اسم العرض.

\`\`\`sql
SELECT
  name          AS employee_name,
  salary        AS monthly_salary,
  department_id AS dept
FROM employees;
\`\`\`

الأسماء المستعارة ضرورية عندما:
- يكون اسم العمود كلمة مفتاحية في SQL
- تحسب تعبيرًا وتريد اسمًا مقروءًا
- يتشارك جدولان نفس اسم العمود في JOIN

يمكن للأسماء المستعارة أن تحتوي على مسافات إذا قمت بتقديمها بين علامات اقتباس:
\`\`\`sql
SELECT name AS "Full Name", salary AS "Monthly Pay"
FROM employees;
\`\`\`

يمكن حذف \`AS\` — بعض المطورين يكتبون \`name "Full Name"\` — لكن \`AS\` أوضح.

---

## التعبيرات المحسوبة

يمكن لـ SELECT إجراء عمليات رياضية ونصية:

\`\`\`sql
-- الراتب السنوي من الشهري
SELECT
  name,
  salary,
  salary * 12         AS annual_salary,
  salary * 1.10       AS salary_with_10pct_raise,
  salary / 12         AS monthly_approx
FROM employees;
\`\`\`

\`\`\`sql
-- دمج النصوص باستخدام ||
SELECT
  name || ' (' || job_title || ')' AS display_name
FROM employees;
\`\`\`

---

## القيم الحرفية والثوابت

يمكنك تحديد ثوابت مباشرةً في SELECT — مفيد للتسميات أو العناصر النائبة:

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

## إزالة الصفوف المكررة: DISTINCT

\`\`\`sql
-- بدون DISTINCT: تُرجع جميع 25 صفًا (أقسام مكررة كثيرة)
SELECT department_id FROM employees;

-- مع DISTINCT: قيم department_id الفريدة فقط
SELECT DISTINCT department_id FROM employees;

-- DISTINCT ينطبق على مجموعة كل الأعمدة المذكورة
SELECT DISTINCT department_id, job_title FROM employees;
-- يُرجع أزواج (department_id, job_title) الفريدة
\`\`\`

---

## الأخطاء الشائعة

\`\`\`sql
-- ❌ الإشارة إلى الاسم المستعار في WHERE — الأسماء المستعارة غير موجودة بعد في تلك المرحلة!
SELECT salary * 12 AS annual
FROM employees
WHERE annual > 1000000;  -- خطأ: لا يوجد عمود اسمه annual

-- ✅ كرر التعبير في WHERE
SELECT salary * 12 AS annual
FROM employees
WHERE salary * 12 > 1000000;

-- ❌ SELECT بدون FROM (يعمل في بعض قواعد البيانات، وليس جميعها)
SELECT 1 + 1;  -- يعمل في SQLite، لكنه عادة سيئة

-- ✅ في الإنتاج استخدم دائمًا FROM
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
        questionAr: 'حدد فقط الأعمدة name وprice وstock_quantity من جدول products.',
        hint: 'List the column names separated by commas after SELECT.',
        hintAr: 'اذكر أسماء الأعمدة مفصولة بفواصل بعد SELECT.',
        expectedQuery: 'SELECT name, price, stock_quantity FROM products',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Select all products and add a computed column called "discounted_price" that is 90% of the original price.',
        questionAr: 'اختر جميع المنتجات وأضف عمودًا محسوبًا اسمه "discounted_price" يساوي 90% من السعر الأصلي.',
        hint: 'Use price * 0.90 AS discounted_price',
        hintAr: 'استخدم price * 0.90 AS discounted_price',
        expectedQuery: 'SELECT *, price * 0.90 AS discounted_price FROM products',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Select distinct country values from the customers table.',
        questionAr: 'اختر قيم country الفريدة من جدول customers.',
        hint: 'Use SELECT DISTINCT country FROM customers',
        hintAr: 'استخدم SELECT DISTINCT country FROM customers',
        expectedQuery: 'SELECT DISTINCT country FROM customers',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 5,
    title: 'WHERE Clause',
    titleAr: 'شرط WHERE',
    description: 'Filter rows precisely using comparison operators, strings, numbers, and dates.',
    descriptionAr: 'تصفية الصفوف بدقة باستخدام عوامل المقارنة والنصوص والأرقام والتواريخ.',
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
    contentAr: `
## شرط WHERE

\`WHERE\` يُصفّي الصفوف التي يُرجعها الاستعلام. بدونه، تُرجع كل صفوف الجدول. معه، تُدرج فقط الصفوف التي يتحقق فيها الشرط بقيمة **TRUE**.

\`\`\`sql
SELECT columns
FROM table_name
WHERE condition;
\`\`\`

---

## عوامل المقارنة

| العامل | المعنى | مثال |
|----------|---------|---------|
| \`=\` | يساوي | \`salary = 75000\` |
| \`<>\` أو \`!=\` | لا يساوي | \`status <> 'cancelled'\` |
| \`>\` | أكبر من | \`salary > 80000\` |
| \`<\` | أصغر من | \`price < 50\` |
| \`>=\` | أكبر من أو يساوي | \`salary >= 60000\` |
| \`<=\` | أصغر من أو يساوي | \`price <= 100\` |

\`\`\`sql
-- الموظفون الذين يكسبون أكثر من $90,000
SELECT name, salary FROM employees WHERE salary > 90000;

-- المنتجات التي تكلّف بالضبط $29.99
SELECT name, price FROM products WHERE price = 29.99;

-- الطلبات غير المُسلَّمة
SELECT id, status FROM orders WHERE status <> 'delivered';
\`\`\`

---

## مقارنات النصوص

مقارنات النصوص **حساسة لحالة الأحرف** في معظم قواعد البيانات (باستثناء MySQL افتراضيًا):

\`\`\`sql
-- هذا يعمل:
SELECT * FROM employees WHERE job_title = 'Sales Rep';

-- هذا لا يُرجع شيئًا إذا لم يكن 'sales rep' موجودًا:
SELECT * FROM employees WHERE job_title = 'sales rep';

-- للحفاظ على الأمان مع حالة الأحرف، استخدم UPPER() أو LOWER():
SELECT * FROM employees WHERE UPPER(job_title) = 'SALES REP';
\`\`\`

---

## التصفية على الأرقام

\`\`\`sql
-- الموظفون الذين رواتبهم ضمن نطاق معين (حصري)
SELECT name, salary
FROM employees
WHERE salary >= 60000 AND salary <= 90000;

-- المنتجات ذات المخزون أقل من 50
SELECT name, stock_quantity
FROM products
WHERE stock_quantity < 50;
\`\`\`

---

## التصفية على التواريخ

في SQLite، تُخزَّن التواريخ كنصوص بتنسيق 'YYYY-MM-DD'. لحسن الحظ، يُقارن تنسيق ISO 8601 بشكل صحيح كنصوص:

\`\`\`sql
-- الموظفون المُوظَّفون بعد 2020
SELECT name, hire_date
FROM employees
WHERE hire_date > '2020-12-31';

-- الطلبات المُقدَّمة في يناير 2024
SELECT id, order_date, status
FROM orders
WHERE order_date >= '2024-01-01'
  AND order_date <= '2024-01-31';

-- الموظفون المُوظَّفون في 2019
SELECT name, hire_date
FROM employees
WHERE hire_date >= '2019-01-01'
  AND hire_date <= '2019-12-31';
\`\`\`

---

## التصفية على القيم المنطقية / الأعلام الصحيحة

\`\`\`sql
-- الموظفون النشطون (is_active = 1)
SELECT name FROM employees WHERE is_active = 1;

-- الموظفون غير النشطين
SELECT name FROM employees WHERE is_active = 0;

-- المنتجات المتاحة
SELECT name FROM products WHERE is_available = 1;
\`\`\`

---

## NULL وشرط WHERE

**هام:** لا يمكنك استخدام \`=\` للتحقق من NULL!

\`\`\`sql
-- ❌ هذا يُرجع صفرًا من الصفوف — المقارنة مع NULL دائمًا تُعطي NULL (وليس TRUE)
SELECT * FROM employees WHERE email = NULL;

-- ✅ استخدم IS NULL
SELECT * FROM employees WHERE email IS NULL;

-- ✅ استخدم IS NOT NULL للعكس
SELECT * FROM employees WHERE email IS NOT NULL;
\`\`\`

هذا لأن NULL تعني "مجهول" — لا يمكنك القول إن قيمة مجهولة تساوي أي شيء.

---

## شروط متعددة: AND / OR

\`\`\`sql
-- يجب أن يتحقق كلا الشرطين
SELECT name, salary, department_id
FROM employees
WHERE department_id = 1 AND salary > 90000;

-- يكفي تحقق أحد الشرطين
SELECT name, department_id
FROM employees
WHERE department_id = 1 OR department_id = 5;
\`\`\`

> سنغطي AND/OR/NOT بالتفصيل في الدرس التالي.

---

## WHERE مع التعبيرات

يمكنك استخدام التعبيرات على الجانب الأيسر من الشرط:

\`\`\`sql
-- الموظفون الذين يتجاوز راتبهم السنوي $1 مليون
SELECT name, salary
FROM employees
WHERE salary * 12 > 1000000;

-- المنتجات ذات هامش ربح يزيد عن 50% فوق متوسط تصنيفها (مقدمة للاستعلامات الفرعية)
-- سنغطي هذا في المستوى 8
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
        questionAr: 'ابحث عن جميع المنتجات التي يزيد سعرها عن $100.',
        hint: 'Use WHERE price > 100',
        hintAr: 'استخدم WHERE price > 100',
        expectedQuery: 'SELECT * FROM products WHERE price > 100',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all orders with status equal to "delivered".',
        questionAr: 'ابحث عن جميع الطلبات التي status تساوي "delivered".',
        hint: 'Use WHERE status = \'delivered\'',
        hintAr: 'استخدم WHERE status = \'delivered\'',
        expectedQuery: "SELECT * FROM orders WHERE status = 'delivered'",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Find all customers who do NOT have a phone number on file (phone IS NULL).',
        questionAr: 'ابحث عن جميع العملاء الذين ليس لديهم رقم هاتف مسجّل (phone IS NULL).',
        hint: 'Use WHERE phone IS NULL',
        hintAr: 'استخدم WHERE phone IS NULL',
        expectedQuery: 'SELECT * FROM customers WHERE phone IS NULL',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 4,
        question: 'Find all employees hired after January 1, 2021.',
        questionAr: 'ابحث عن جميع الموظفين المُوظَّفين بعد 1 يناير 2021.',
        hint: 'Use WHERE hire_date > \'2021-01-01\'',
        hintAr: 'استخدم WHERE hire_date > \'2021-01-01\'',
        expectedQuery: "SELECT * FROM employees WHERE hire_date > '2021-01-01'",
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 6,
    title: 'ORDER BY',
    titleAr: 'ترتيب النتائج ORDER BY',
    description: 'Sort results ascending, descending, by multiple columns, and handle NULLs in sorting.',
    descriptionAr: 'ترتيب النتائج تصاعديًا وتنازليًا وبأعمدة متعددة والتعامل مع NULL في الترتيب.',
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
    contentAr: `
## ORDER BY

افتراضيًا، لا تضمن SQL أي ترتيب معين للصفوف. تخزّن قواعد البيانات الصفوف في أي مكان متاح وقد تُرجعها بأي ترتيب. للحصول على ترتيب متسق وذي معنى، يجب استخدام \`ORDER BY\`.

\`\`\`sql
SELECT columns
FROM table_name
ORDER BY column1 [ASC|DESC], column2 [ASC|DESC];
\`\`\`

---

## تصاعدي وتنازلي

- **ASC** (الافتراضي) — من الأصغر إلى الأكبر، من A إلى Z، من الأقدم إلى الأحدث
- **DESC** — من الأكبر إلى الأصغر، من Z إلى A، من الأحدث إلى الأقدم

\`\`\`sql
-- المنتجات الأرخص أولًا
SELECT name, price FROM products ORDER BY price ASC;

-- الأغلى أولًا (DESC)
SELECT name, price FROM products ORDER BY price DESC;

-- أحدث الموظفين أولًا
SELECT name, hire_date FROM employees ORDER BY hire_date DESC;

-- أبجديًا حسب الاسم
SELECT name FROM employees ORDER BY name ASC;
\`\`\`

---

## الترتيب بأعمدة متعددة

يمكنك الترتيب بأكثر من عمود. يُستخدم العمود الثاني لكسر التعادل في الأول.

\`\`\`sql
-- الترتيب حسب القسم أولًا، ثم حسب الراتب (الأعلى أجرًا أولًا ضمن كل قسم)
SELECT name, department_id, salary
FROM employees
ORDER BY department_id ASC, salary DESC;

-- الترتيب حسب الحالة أولًا، ثم حسب أحدث تاريخ للطلب
SELECT id, customer_id, status, order_date
FROM orders
ORDER BY status ASC, order_date DESC;
\`\`\`

---

## الترتيب بموضع العمود (رقم)

يمكنك الإشارة إلى أعمدة SELECT برقم موضعها:

\`\`\`sql
-- نفس ORDER BY name ASC
SELECT name, salary FROM employees ORDER BY 1;

-- نفس ORDER BY salary DESC
SELECT name, salary FROM employees ORDER BY 2 DESC;
\`\`\`

هذا مريح لكنه محفوف بالمخاطر — إذا أضفت عمودًا إلى SELECT، تتغير الأرقام وتتغير معها طريقة الترتيب بصمت. **فضّل استخدام أسماء الأعمدة.**

---

## الترتيب بالاسم المستعار

يمكنك استخدام الأسماء المستعارة في ORDER BY (بخلاف WHERE):

\`\`\`sql
SELECT
  name,
  salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;
\`\`\`

هذا يعمل لأن ORDER BY يعمل بعد SELECT في ترتيب التنفيذ.

---

## قيم NULL في الترتيب

\`\`\`sql
-- السلوك الافتراضي: تُرتَّب NULL في آخر ASC، وأول DESC (SQLite)
SELECT name, email FROM employees ORDER BY email ASC;

-- في قواعد بيانات أخرى يمكنك التحكم في موضع NULL:
-- ORDER BY email ASC NULLS FIRST
-- ORDER BY email DESC NULLS LAST
-- SQLite لا يدعم هذه الصياغة — تُرتَّب NULL كأصغر القيم
\`\`\`

---

## الترتيب بالتعبيرات

\`\`\`sql
-- ترتيب المنتجات حسب قيمة المخزون المحتملة (السعر × الكمية)
SELECT name, price, stock_quantity,
       price * stock_quantity AS inventory_value
FROM products
ORDER BY price * stock_quantity DESC;

-- ترتيب الموظفين حسب طول الاسم (الأسماء الأقصر أولًا)
SELECT name FROM employees
ORDER BY LENGTH(name) ASC;
\`\`\`

---

## دمج WHERE + ORDER BY

\`WHERE\` دائمًا يأتي قبل \`ORDER BY\`:

\`\`\`sql
SELECT name, salary, department_id
FROM employees
WHERE is_active = 1
  AND department_id IN (1, 5)
ORDER BY department_id ASC, salary DESC;
\`\`\`

---

## ملاحظة على الأداء

الترتيب مكلف على الجداول الكبيرة. عندما تُرتّب بشكل متكرر بعمود معين (مثل \`order_date\`)، فإن إنشاء **فهرس (INDEX)** على ذلك العمود يسرّع الأمور بشكل كبير. سنغطي الفهارس في المستوى 9.
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
        questionAr: 'اعرض جميع المنتجات مرتبةً حسب السعر من الأغلى إلى الأرخص.',
        hint: 'Use ORDER BY price DESC',
        hintAr: 'استخدم ORDER BY price DESC',
        expectedQuery: 'SELECT * FROM products ORDER BY price DESC',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'List all employees sorted by department_id ascending, then by name alphabetically.',
        questionAr: 'اعرض جميع الموظفين مرتبين حسب department_id تصاعديًا، ثم حسب الاسم أبجديًا.',
        hint: 'ORDER BY department_id ASC, name ASC',
        hintAr: 'ORDER BY department_id ASC, name ASC',
        expectedQuery: 'SELECT * FROM employees ORDER BY department_id ASC, name ASC',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Show all customers sorted by their join date, newest first.',
        questionAr: 'اعرض جميع العملاء مرتبين حسب تاريخ الانضمام، الأحدث أولًا.',
        hint: 'ORDER BY joined_date DESC',
        hintAr: 'ORDER BY joined_date DESC',
        expectedQuery: 'SELECT * FROM customers ORDER BY joined_date DESC',
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 7,
    title: 'AND, OR, NOT',
    titleAr: 'العوامل المنطقية AND وOR وNOT',
    description: 'Combine multiple conditions with logical operators, operator precedence, and truth tables.',
    descriptionAr: 'دمج شروط متعددة بالعوامل المنطقية وأولوية التنفيذ وجداول الصواب.',
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
    contentAr: `
## العوامل المنطقية: AND وOR وNOT

الاستعلامات الحقيقية تحتاج دائمًا تقريبًا إلى شروط متعددة. توفّر SQL ثلاثة عوامل منطقية لدمج الشروط.

---

## AND — يجب أن تتحقق جميع الشروط

\`AND\` يُرجع الصف فقط عندما تكون **كل** الشروط TRUE.

\`\`\`sql
-- موظفو الهندسة الذين يكسبون أكثر من $80k
SELECT name, department_id, salary
FROM employees
WHERE department_id = 1
  AND salary > 80000;

-- الطلبات المُسلَّمة في الربع الأول من 2024
SELECT id, order_date, total_amount
FROM orders
WHERE status = 'delivered'
  AND order_date >= '2024-01-01'
  AND order_date <= '2024-03-31';
\`\`\`

**جدول صواب AND:**
| A | B | A AND B |
|---|---|---------|
| TRUE | TRUE | **TRUE** |
| TRUE | FALSE | FALSE |
| FALSE | TRUE | FALSE |
| FALSE | FALSE | FALSE |
| TRUE | NULL | NULL |
| FALSE | NULL | **FALSE** |
| NULL | NULL | NULL |

لاحظ: \`FALSE AND NULL\` = FALSE (لأنه مهما كانت قيمة NULL، ستكون النتيجة FALSE).

---

## OR — يكفي تحقق شرط واحد على الأقل

\`OR\` يُرجع الصف عندما تكون **أي** حالة TRUE.

\`\`\`sql
-- الموظفون في الهندسة أو المالية
SELECT name, department_id
FROM employees
WHERE department_id = 1 OR department_id = 5;

-- الطلبات المعلقة أو قيد المعالجة (لا تزال جارية)
SELECT id, status, order_date
FROM orders
WHERE status = 'pending' OR status = 'processing';

-- العملاء من الولايات المتحدة أو كندا
SELECT name, country
FROM customers
WHERE country = 'USA' OR country = 'Canada';
\`\`\`

**جدول صواب OR:**
| A | B | A OR B |
|---|---|--------|
| TRUE | TRUE | TRUE |
| TRUE | FALSE | **TRUE** |
| FALSE | TRUE | **TRUE** |
| FALSE | FALSE | **FALSE** |
| TRUE | NULL | **TRUE** |
| FALSE | NULL | NULL |
| NULL | NULL | NULL |

لاحظ: \`TRUE OR NULL\` = TRUE (لأنه حتى لو كانت NULL هي FALSE، ستكون النتيجة TRUE).

---

## NOT — نفي الشرط

\`NOT\` يعكس نتيجة الشرط:

\`\`\`sql
-- جميع الموظفين من غير الهندسة
SELECT name, department_id
FROM employees
WHERE NOT department_id = 1;
-- مكافئ:
WHERE department_id <> 1;
-- مكافئ:
WHERE department_id != 1;

-- الطلبات غير الملغاة وغير المُسلَّمة (لا تزال في الطريق)
SELECT id, status FROM orders
WHERE NOT (status = 'delivered' OR status = 'cancelled');
\`\`\`

---

## أولوية العوامل — مهم جدًا!

SQL يُنفّذ العوامل المنطقية بهذا الترتيب: **NOT → AND → OR**

هذا قد يسبب مفاجآت:

\`\`\`sql
-- ❌ هذا ليس "الهندسة AND (salary>80k OR المالية)"
-- هو "(الهندسة AND salary>80k) OR المالية"
SELECT name, department_id, salary
FROM employees
WHERE department_id = 1 AND salary > 80000
   OR department_id = 5;

-- ✅ استخدم الأقواس لتوضيح قصدك
SELECT name, department_id, salary
FROM employees
WHERE department_id = 1
  AND (salary > 80000 OR department_id = 5);
\`\`\`

**القاعدة الذهبية: استخدم الأقواس دائمًا عند مزج AND وOR.** يجعل نيتك واضحة ويمنع الأخطاء.

---

## أمثلة عملية

\`\`\`sql
-- العملاء من فئة Gold من خارج الولايات المتحدة
SELECT name, country, loyalty_tier
FROM customers
WHERE loyalty_tier = 'Gold'
  AND NOT country = 'USA';

-- الطلبات الكبيرة (أكثر من $400) غير الملغاة
SELECT id, total_amount, status
FROM orders
WHERE total_amount > 400
  AND status <> 'cancelled';

-- الموظفون المُوظَّفون في 2020 أو 2021 والنشطون حاليًا
SELECT name, hire_date, is_active
FROM employees
WHERE (hire_date >= '2020-01-01' AND hire_date <= '2021-12-31')
  AND is_active = 1;

-- المنتجات الرخيصة (أقل من $50) أو الناضبة من المخزون (0 كمية)
SELECT name, price, stock_quantity
FROM products
WHERE price < 50
   OR stock_quantity = 0;
\`\`\`

---

## الأخطاء الشائعة

\`\`\`sql
-- ❌ خطأ: هذا يتحقق إذا كانت department_id تساوي 1 أو 5، وليس اسم العمود مرتين
SELECT * FROM employees WHERE department_id = 1 OR 5;
-- SQL تقرأها: (department_id = 1) OR (5) — و5 دائمًا صحيح!

-- ✅ صحيح: كرر اسم العمود
SELECT * FROM employees WHERE department_id = 1 OR department_id = 5;

-- ❌ فخ NOT NULL
SELECT * FROM employees WHERE NOT email = NULL;  -- دائمًا يُرجع 0 صفوف!

-- ✅ استخدم IS NOT NULL
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
        questionAr: 'ابحث عن جميع موظفي القسم 1 (الهندسة) الذين يزيد راتبهم عن $95,000.',
        hint: 'Combine two conditions with AND',
        hintAr: 'ادمج شرطين باستخدام AND',
        expectedQuery: 'SELECT * FROM employees WHERE department_id = 1 AND salary > 95000',
        checkFunction: (result) => (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all orders with status "pending" OR "processing".',
        questionAr: 'ابحث عن جميع الطلبات التي status تساوي "pending" أو "processing".',
        hint: 'Use OR between the two status conditions',
        hintAr: 'استخدم OR بين شرطَي الحالة',
        expectedQuery: "SELECT * FROM orders WHERE status = 'pending' OR status = 'processing'",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Find all products that are NOT available (is_available = 0) OR have stock_quantity equal to 0.',
        questionAr: 'ابحث عن جميع المنتجات غير المتاحة (is_available = 0) أو التي stock_quantity تساوي 0.',
        hint: 'Use NOT or <> and combine with OR',
        hintAr: 'استخدم NOT أو <> وادمجه مع OR',
        expectedQuery: 'SELECT * FROM products WHERE is_available = 0 OR stock_quantity = 0',
        checkFunction: (result) => (result) => result.length > 0,
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 2 — ADVANCED FILTERING
  // ════════════════════════════════════════════════════
  {
    id: 8,
    title: 'LIKE & Pattern Matching',
    titleAr: 'LIKE ومطابقة الأنماط',
    description: 'Search text with wildcards % and _, case-insensitive patterns, and GLOB.',
    descriptionAr: 'البحث في النصوص باستخدام أحرف البدل % و_ والأنماط غير الحساسة لحالة الأحرف وGLOB.',
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
    contentAr: `
## LIKE — مطابقة الأنماط

\`LIKE\` يتيح لك البحث عن صفوف حيث يتطابق عمود نصي مع نمط باستخدام أحرف البدل. يُستخدم عندما لا تعرف القيمة الدقيقة لكنك تعرف جزءًا منها.

\`\`\`sql
SELECT columns FROM table WHERE column LIKE pattern;
\`\`\`

---

## حرفا البدل

### % — يطابق أي تسلسل من صفر أو أكثر من الأحرف

\`\`\`sql
-- أسماء تبدأ بـ 'A'
SELECT name FROM employees WHERE name LIKE 'A%';
-- تطابق: Alice وAlan وAnna ...

-- أسماء تنتهي بـ 'son'
SELECT name FROM employees WHERE name LIKE '%son';
-- تطابق: Alice Johnson وJackson وWilson ...

-- أسماء تحتوي على 'ar' في أي مكان
SELECT name FROM employees WHERE name LIKE '%ar%';
-- تطابق: Karen وNathan وCarol ...

-- عناوين البريد الإلكتروني من company.com
SELECT name, email FROM employees WHERE email LIKE '%@company.com';

-- المسميات الوظيفية التي تحتوي على 'Engineer'
SELECT name, job_title FROM employees WHERE job_title LIKE '%Engineer%';
\`\`\`

### _ — يطابق حرفًا واحدًا بالضبط

\`\`\`sql
-- أسماء من 3 أحرف
SELECT name FROM customers WHERE name LIKE '___';
-- (كل _ = حرف واحد، إذن 3 شرطات سفلية = 3 أحرف بالضبط)

-- المسميات الوظيفية حيث الحرف الثالث هو 'a'
SELECT job_title FROM employees WHERE job_title LIKE '__a%';
-- تطابق: 'Lead Engineer' و'Marketing ...'
\`\`\`

---

## دمج أحرف البدل

\`\`\`sql
-- أسماء حيث الحرف الثاني هو 'a'
SELECT name FROM employees WHERE name LIKE '_a%';
-- تطابق: Nathan وKaren وJack وRachel وSam وDavid وYara...

-- عناوين بريد إلكتروني تحتوي على رقم على الأقل
SELECT email FROM employees WHERE email LIKE '%[0-9]%';
-- ملاحظة: نطاقات [] ليست SQL معيارية — استخدم GLOB في SQLite (انظر أدناه)
\`\`\`

---

## حساسية حالة الأحرف

LIKE **غير حساس لحالة الأحرف ASCII في SQLite** لكنه حساس للأحرف Unicode وفي معظم قواعد البيانات الأخرى:

\`\`\`sql
-- في SQLite: هاتان الجملتان تُرجعان نفس النتائج
SELECT * FROM employees WHERE name LIKE 'alice%';
SELECT * FROM employees WHERE name LIKE 'Alice%';

-- في PostgreSQL: LIKE حساس لحالة الأحرف؛ استخدم ILIKE لعدم الحساسية
SELECT * FROM employees WHERE name ILIKE 'alice%';

-- الممارسة الآمنة: حوّل إلى UPPER/LOWER أولًا
SELECT * FROM employees WHERE UPPER(name) LIKE 'ALICE%';
\`\`\`

---

## NOT LIKE

\`\`\`sql
-- الموظفون الذين ليسوا مندوبي مبيعات أو مديري مبيعات
SELECT name, job_title FROM employees
WHERE job_title NOT LIKE '%Sales%';

-- العملاء الذين بريدهم الإلكتروني ليس من النطاقات الشائعة
SELECT name, email FROM customers
WHERE email NOT LIKE '%@email.com';
\`\`\`

---

## GLOB — بديل SQLite لأحرف البدل

يمتلك SQLite أيضًا \`GLOB\` الذي يستخدم أحرف بدل بأسلوب Unix وهو **دائمًا حساس لحالة الأحرف**:

| النمط | المعنى |
|---------|---------|
| \`*\` | أي تسلسل من الأحرف |
| \`?\` | أي حرف واحد |
| \`[abc]\` | أي حرف واحد من القائمة |
| \`[a-z]\` | أي حرف واحد في النطاق |
| \`[^abc]\` | أي حرف غير موجود في القائمة |

\`\`\`sql
-- أسماء تبدأ بـ A أو B
SELECT name FROM employees WHERE name GLOB '[AB]*';

-- عناوين بريد إلكتروني تحتوي على رقم
SELECT email FROM employees WHERE email GLOB '*[0-9]*';

-- مسميات وظيفية من 5 أحرف
SELECT job_title FROM employees WHERE job_title GLOB '?????';
\`\`\`

---

## تحذير أداء

\`LIKE '%value'\` (حرف بدل في البداية) **لا يمكنه استخدام الفهرس** — يجب على قاعدة البيانات مسح كل صف. هذا بطيء جدًا على الجداول الكبيرة.

\`LIKE 'value%'\` (بدون حرف بدل في البداية) **يمكنه استخدام الفهرس** وهو أسرع بكثير.

\`\`\`sql
-- سريع: يمكن استخدام الفهرس
WHERE name LIKE 'Alice%'

-- بطيء: يستلزم مسحًا كاملًا للجدول
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
        questionAr: 'ابحث عن جميع العملاء الذين يبدأ اسمهم بالحرف "A".',
        hint: 'Use LIKE "A%"',
        hintAr: 'استخدم LIKE "A%"',
        expectedQuery: "SELECT * FROM customers WHERE name LIKE 'A%'",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all products whose name contains the word "Pro".',
        questionAr: 'ابحث عن جميع المنتجات التي يحتوي اسمها على كلمة "Pro".',
        hint: 'Use LIKE "%Pro%"',
        hintAr: 'استخدم LIKE "%Pro%"',
        expectedQuery: "SELECT * FROM products WHERE name LIKE '%Pro%'",
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Find all employees whose email ends with "@company.com".',
        questionAr: 'ابحث عن جميع الموظفين الذين ينتهي بريدهم الإلكتروني بـ "@company.com".',
        hint: 'Use LIKE "%@company.com"',
        hintAr: 'استخدم LIKE "%@company.com"',
        expectedQuery: "SELECT * FROM employees WHERE email LIKE '%@company.com'",
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 9,
    title: 'IN, NOT IN, BETWEEN',
    titleAr: 'IN وNOT IN وBETWEEN',
    description: 'Filter against a list of values with IN and a range with BETWEEN.',
    descriptionAr: 'التصفية بقائمة قيم باستخدام IN ونطاق باستخدام BETWEEN.',
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
    contentAr: `
## IN — المطابقة مع قائمة

\`IN\` يتحقق إذا كانت قيمة ما تطابق أي قيمة في قائمة. إنه أنظف من كتابة شروط \`OR\` متعددة.

\`\`\`sql
-- بدون IN: مطوّل ومتكرر
SELECT * FROM employees
WHERE department_id = 1
   OR department_id = 3
   OR department_id = 5;

-- مع IN: نظيف ومقروء
SELECT * FROM employees
WHERE department_id IN (1, 3, 5);
\`\`\`

### IN مع النصوص

\`\`\`sql
-- الطلبات في حالات مختلفة
SELECT id, order_date, status
FROM orders
WHERE status IN ('pending', 'processing', 'shipped');

-- العملاء من بلدان محددة
SELECT name, country
FROM customers
WHERE country IN ('USA', 'Canada', 'UK');

-- المنتجات من موردين محددين
SELECT name, supplier, price
FROM products
WHERE supplier IN ('TechCorp', 'BookHouse', 'FitLife');
\`\`\`

---

## NOT IN — استثناء قائمة

\`\`\`sql
-- الموظفون من خارج الموارد البشرية أو القانون
SELECT name, department_id
FROM employees
WHERE department_id NOT IN (4, 6);

-- الطلبات النشطة (غير المكتملة)
SELECT id, status, order_date
FROM orders
WHERE status NOT IN ('delivered', 'cancelled');
\`\`\`

### فخ NULL الخطير مع NOT IN!

\`\`\`sql
-- إذا كانت أي قيمة في القائمة NULL، يُرجع NOT IN لا شيء!
-- لأن: X NOT IN (..., NULL) → X <> NULL → NULL → مجهول

-- هذا يُرجع صفرًا من الصفوف حتى لو بدا صحيحًا:
SELECT * FROM employees
WHERE department_id NOT IN (1, 2, NULL);
-- لأن "department_id <> NULL" دائمًا NULL، وليس TRUE أبدًا

-- ✅ الحل: استخدم NOT EXISTS أو تصفية NULL أولًا
-- سنغطي NOT EXISTS في المستوى 8
\`\`\`

---

## BETWEEN — نطاق شامل

\`BETWEEN low AND high\` يتحقق إذا كانت قيمة ما ضمن نطاق (شامل لكلا الطرفين).

\`\`\`sql
-- مكافئ: salary >= 60000 AND salary <= 90000
SELECT name, salary
FROM employees
WHERE salary BETWEEN 60000 AND 90000;

-- المنتجات في نطاق سعري
SELECT name, price
FROM products
WHERE price BETWEEN 30 AND 100;
\`\`\`

**هام: BETWEEN شامل.** كلتا قيمتَي الحدود مُدرجتان.

### BETWEEN مع التواريخ

\`\`\`sql
-- طلبات الربع الأول من 2024
SELECT id, order_date, total_amount
FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31';

-- الموظفون المُوظَّفون في سنة محددة
SELECT name, hire_date
FROM employees
WHERE hire_date BETWEEN '2020-01-01' AND '2020-12-31';
\`\`\`

### BETWEEN مع النصوص

\`\`\`sql
-- نطاق أبجدي (A إلى M)
SELECT name FROM employees
WHERE name BETWEEN 'A' AND 'N';
-- يطابق الأسماء من A إلى N
\`\`\`

---

## NOT BETWEEN

\`\`\`sql
-- المنتجات الرخيصة جدًا أو الغالية جدًا
SELECT name, price
FROM products
WHERE price NOT BETWEEN 50 AND 300;
-- نفس: price < 50 OR price > 300
\`\`\`

---

## دمج IN وBETWEEN

\`\`\`sql
-- عملاء Gold أو Silver انضموا مؤخرًا
SELECT name, loyalty_tier, joined_date
FROM customers
WHERE loyalty_tier IN ('Gold', 'Silver')
  AND joined_date BETWEEN '2020-01-01' AND '2021-12-31'
ORDER BY loyalty_tier, joined_date;

-- منتجات متوسطة السعر من تصنيفات محددة
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
        questionAr: 'ابحث عن جميع موظفي الأقسام 1 أو 3 أو 5 باستخدام IN.',
        hint: 'Use WHERE department_id IN (1, 3, 5)',
        hintAr: 'استخدم WHERE department_id IN (1, 3, 5)',
        expectedQuery: 'SELECT * FROM employees WHERE department_id IN (1, 3, 5)',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all products with price BETWEEN $30 and $50.',
        questionAr: 'ابحث عن جميع المنتجات التي يتراوح سعرها BETWEEN $30 و$50.',
        hint: 'Use WHERE price BETWEEN 30 AND 50',
        hintAr: 'استخدم WHERE price BETWEEN 30 AND 50',
        expectedQuery: 'SELECT * FROM products WHERE price BETWEEN 30 AND 50',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Find all customers NOT from USA, Canada, or UK.',
        questionAr: 'ابحث عن جميع العملاء الذين ليسوا من الولايات المتحدة أو كندا أو المملكة المتحدة.',
        hint: 'Use WHERE country NOT IN (...)',
        hintAr: 'استخدم WHERE country NOT IN (...)',
        expectedQuery: "SELECT * FROM customers WHERE country NOT IN ('USA', 'Canada', 'UK')",
        checkFunction: (result) => result.length > 0,
      },
    ],
  },

  {
    id: 10,
    title: 'IS NULL / IS NOT NULL',
    titleAr: 'IS NULL وIS NOT NULL',
    description: 'Handle missing data correctly — NULLs, three-valued logic, and COALESCE preview.',
    descriptionAr: 'التعامل الصحيح مع البيانات المفقودة — NULL والمنطق ثلاثي القيم ومقدمة لـ COALESCE.',
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
    contentAr: `
## NULL بالتفصيل

NULL هو أحد أهم المفاهيم (وأكثرها سوء فهم) في SQL. يستحق درسًا خاصًا به.

**NULL تعني:** "هذه القيمة مجهولة أو مفقودة أو غير قابلة للتطبيق."

---

## لماذا يوجد NULL

ضع في اعتبارك جدول \`employees\`:
- \`manager_id\` للرئيس التنفيذي هو NULL (ليس له مدير — غير قابل للتطبيق)
- \`email\` لبعض المتعاقدين هو NULL (ليس لدينا — مفقود)
- \`discontinued_date\` للمنتج هو NULL (لا يزال نشطًا — لم يحدث بعد)

كلها استخدامات مشروعة لـ NULL. البديل — استخدام قيم وهمية مثل 0 أو -1 أو 'N/A' — يسبب مشاكل أكبر بكثير.

---

## المنطق ثلاثي القيم

تستخدم SQL **منطقًا ثلاثي القيم**: TRUE وFALSE وـ**NULL/UNKNOWN**.

عند مقارنة أي شيء بـ NULL، تحصل على **NULL** (وليس TRUE ولا FALSE):

\`\`\`sql
SELECT NULL = NULL;    -- NULL (مجهول)
SELECT NULL = 0;       -- NULL
SELECT NULL = '';      -- NULL
SELECT NULL > 5;       -- NULL
SELECT 1 = NULL;       -- NULL
SELECT NULL != NULL;   -- NULL
\`\`\`

**شرط WHERE يمرّر الصفوف فقط عندما يكون الشرط TRUE.** شروط NULL لا تُمرَّر أبدًا!

---

## IS NULL وIS NOT NULL

الطريقة الوحيدة الصحيحة للتحقق من NULL:

\`\`\`sql
-- البحث عن الموظفين الذين ليس لديهم بريد إلكتروني
SELECT name, email
FROM employees
WHERE email IS NULL;

-- البحث عن الموظفين الذين لديهم بريد إلكتروني مسجّل
SELECT name, email
FROM employees
WHERE email IS NOT NULL;

-- البحث عن العملاء الذين ليس لديهم رقم هاتف
SELECT name, phone
FROM customers
WHERE phone IS NULL;

-- الطلبات التي لا تحتوي على ملاحظات خاصة
SELECT id, order_date, notes
FROM orders
WHERE notes IS NULL;

-- الموظفون بدون مدير (المستوى الأعلى)
SELECT name, job_title
FROM employees
WHERE manager_id IS NULL;
\`\`\`

---

## NULL في دوال التجميع

**دوال التجميع (COUNT, SUM, AVG, إلخ) تتجاهل القيم NULL.**

\`\`\`sql
-- COUNT(*) يعدّ جميع الصفوف بما فيها ذات NULL
SELECT COUNT(*) FROM employees;  -- 25

-- COUNT(column) يعدّ فقط القيم غير NULL
SELECT COUNT(email) FROM employees;  -- 23 (2 موظفين لديهم email NULL)

-- AVG أيضًا تتجاهل NULL — المتوسط على الصفوف غير NULL فقط
-- هذا قد يعطي نتائج مضللة إذا كان يجب التعامل مع NULL كصفر

-- SUM تتجاهل NULL
SELECT SUM(budget) FROM departments;
-- يُرجع مجموع 5 أقسام لديها ميزانيات، متجاهلًا القسم ذا الميزانية NULL
\`\`\`

---

## NULL في العمليات الحسابية

أي عملية حسابية تشمل NULL تُرجع NULL:

\`\`\`sql
SELECT NULL + 100;     -- NULL
SELECT salary * NULL;  -- NULL
SELECT 0 / NULL;       -- NULL
\`\`\`

---

## COALESCE — استبدال NULL بقيمة افتراضية

\`COALESCE(value, fallback)\` يُرجع أول وسيطة غير NULL:

\`\`\`sql
-- استبدال عناوين البريد الإلكتروني NULL بعنصر نائب
SELECT name, COALESCE(email, 'no-email@unknown.com') AS email
FROM employees;

-- استبدال phone NULL بـ 'Not provided'
SELECT name, COALESCE(phone, 'Not provided') AS phone
FROM customers;

-- استبدال budget NULL بـ 0
SELECT name, COALESCE(budget, 0) AS budget
FROM departments;

-- استرجاع متعدد: يستخدم أول قيمة غير NULL من القائمة
SELECT COALESCE(NULL, NULL, 'third', 'fourth');  -- يُرجع 'third'
\`\`\`

---

## NULL في ORDER BY

\`\`\`sql
-- في SQLite، تُرتَّب NULL قبل القيم الأخرى في الترتيب ASC
SELECT name, email FROM employees ORDER BY email ASC;
-- الصفوف ذات email NULL تظهر أولًا

-- حيلة لدفع NULL إلى النهاية في SQLite:
SELECT name, email
FROM employees
ORDER BY email IS NULL ASC, email ASC;
-- "email IS NULL" = 1 للصفوف NULL، 0 لغير NULL — يضع NULL في الآخر
\`\`\`

---

## ملخص: قواعد NULL

| العملية | النتيجة |
|-----------|--------|
| \`NULL = anything\` | NULL |
| \`NULL <> anything\` | NULL |
| \`NULL IS NULL\` | TRUE |
| \`NULL IS NOT NULL\` | FALSE |
| \`NULL + number\` | NULL |
| \`COUNT(*)\` مع NULL | يعدّها |
| \`COUNT(column)\` مع NULL | يتجاهلها |
| \`SUM / AVG\` مع NULL | يتجاهلها |
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
        questionAr: 'ابحث عن جميع الموظفين الذين لم يُعيَّن لهم قسم (department_id IS NULL).',
        hint: 'Use WHERE department_id IS NULL',
        hintAr: 'استخدم WHERE department_id IS NULL',
        expectedQuery: 'SELECT * FROM employees WHERE department_id IS NULL',
        checkFunction: (result) => () => true,
      },
      {
        id: 2,
        question: 'Show all customers with their phone, replacing NULL phone values with the text "No phone".',
        questionAr: 'اعرض جميع العملاء مع أرقام هواتفهم، مع استبدال القيم NULL بالنص "No phone".',
        hint: 'Use COALESCE(phone, "No phone") AS phone',
        hintAr: 'استخدم COALESCE(phone, "No phone") AS phone',
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
    titleAr: 'DISTINCT و LIMIT / OFFSET',
    description: 'Remove duplicates with DISTINCT and paginate results with LIMIT and OFFSET.',
    descriptionAr: 'إزالة التكرارات باستخدام DISTINCT وتقسيم النتائج إلى صفحات باستخدام LIMIT و OFFSET.',
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
    contentAr: `
## DISTINCT — القيم الفريدة فقط

\`DISTINCT\` يُزيل الصفوف المكررة من مجموعة النتائج. يُطبَّق بعد كل عمليات التصفية الأخرى.

\`\`\`sql
SELECT DISTINCT column FROM table;
\`\`\`

### عمود واحد

\`\`\`sql
-- جميع الأقسام الفريدة (بدون تكرار)
SELECT DISTINCT department_id FROM employees;
-- النتيجة: 1, 2, 3, 4, 5, NULL — كل قيمة مرة واحدة

-- جميع المسميات الوظيفية الفريدة
SELECT DISTINCT job_title FROM employees;

-- جميع الدول الفريدة في قاعدة العملاء
SELECT DISTINCT country FROM customers;

-- جميع حالات الطلبات الفريدة
SELECT DISTINCT status FROM orders;
\`\`\`

### أعمدة متعددة — تفرد التوليفة

\`DISTINCT\` يُطبَّق على الصف كاملاً، وليس على الأعمدة بشكل مستقل:

\`\`\`sql
-- توليفات فريدة من (department_id, job_title)
SELECT DISTINCT department_id, job_title
FROM employees
ORDER BY department_id, job_title;

-- ليس: department_id فريد وjob_title فريد بشكل منفصل!
-- يجب أن تكون الزوج فريداً.
\`\`\`

### DISTINCT مع COUNT

نمط شائع جداً — عدّ القيم الفريدة:

\`\`\`sql
-- كم عدد الأقسام الفريدة التي يوجد بها موظفون؟
SELECT COUNT(DISTINCT department_id) FROM employees;

-- من كم دولة مختلفة ينتمي عملاؤنا؟
SELECT COUNT(DISTINCT country) FROM customers;

-- كم منتجاً مختلفاً تم طلبه؟
SELECT COUNT(DISTINCT product_id) FROM order_items;
\`\`\`

---

## LIMIT — تحديد عدد الصفوف

\`LIMIT\` يُحدد الحد الأقصى لعدد الصفوف المُعادة. استخدمه دائماً مع \`ORDER BY\` للحصول على نتيجة **متسقة**.

\`\`\`sql
-- أغلى 5 منتجات
SELECT name, price
FROM products
ORDER BY price DESC
LIMIT 5;

-- أحدث 3 موظفين تعييناً
SELECT name, hire_date
FROM employees
ORDER BY hire_date DESC
LIMIT 3;

-- نظرة سريعة على بعض الصفوف
SELECT * FROM orders LIMIT 10;
\`\`\`

**بدون ORDER BY، يُعيد LIMIT مجموعة عشوائية من الصفوف.** لا يوجد ضمان بالحصول على نفس الصفوف مرتين!

---

## OFFSET — تخطي الصفوف (التصفح الصفحي)

\`OFFSET\` يتخطى عدداً من الصفوف قبل البدء في إعادة النتائج. بالتوليف مع \`LIMIT\`، يُنفذ **التصفح الصفحي**.

\`\`\`sql
-- الصفحة 1: الصفوف 1-5
SELECT name, price FROM products ORDER BY id LIMIT 5 OFFSET 0;

-- الصفحة 2: الصفوف 6-10
SELECT name, price FROM products ORDER BY id LIMIT 5 OFFSET 5;

-- الصفحة 3: الصفوف 11-15
SELECT name, price FROM products ORDER BY id LIMIT 5 OFFSET 10;

-- الصيغة: OFFSET = (رقم الصفحة - 1) × حجم الصفحة
\`\`\`

### مثال تصفح صفحي واقعي:

\`\`\`sql
-- عرض الصفحة 3 من الطلبات (10 طلبات لكل صفحة)، الأحدث أولاً
SELECT id, customer_id, order_date, total_amount
FROM orders
ORDER BY order_date DESC
LIMIT 10 OFFSET 20;
\`\`\`

---

## LIMIT في قواعد بيانات أخرى

| قاعدة البيانات | الصياغة |
|----------------|---------|
| SQLite, MySQL, PostgreSQL | \`LIMIT n OFFSET m\` |
| PostgreSQL أيضاً يدعم | \`FETCH FIRST n ROWS ONLY\` |
| SQL Server | \`SELECT TOP n\` أو \`OFFSET m ROWS FETCH NEXT n ROWS ONLY\` |
| Oracle | \`FETCH FIRST n ROWS ONLY\` أو \`ROWNUM <= n\` |

---

## أنماط عملية

\`\`\`sql
-- إيجاد أرخص منتج متاح
SELECT name, price
FROM products
WHERE is_available = 1
ORDER BY price ASC
LIMIT 1;

-- أول 5 عملاء انضموا
SELECT name, joined_date
FROM customers
ORDER BY joined_date ASC
LIMIT 5;

-- عينة سريعة للاستكشاف
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
        questionAr: 'احصل على أغلى 5 منتجات (الاسم والسعر فقط).',
        hint: 'ORDER BY price DESC LIMIT 5',
        hintAr: 'استخدم ORDER BY price DESC LIMIT 5',
        expectedQuery: 'SELECT name, price FROM products ORDER BY price DESC LIMIT 5',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 2,
        question: 'Find all distinct loyalty_tier values in the customers table.',
        questionAr: 'ابحث عن جميع قيم loyalty_tier الفريدة في جدول customers.',
        hint: 'SELECT DISTINCT loyalty_tier FROM customers',
        hintAr: 'استخدم SELECT DISTINCT loyalty_tier FROM customers',
        expectedQuery: 'SELECT DISTINCT loyalty_tier FROM customers',
        checkFunction: (result) => result.length > 0,
      },
      {
        id: 3,
        question: 'Show orders 6 through 10 sorted by order_date (use LIMIT with OFFSET).',
        questionAr: 'اعرض الطلبات من 6 إلى 10 مرتبةً حسب order_date (استخدم LIMIT مع OFFSET).',
        hint: 'LIMIT 5 OFFSET 5',
        hintAr: 'استخدم ORDER BY order_date ثم LIMIT 5 OFFSET 5',
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
    titleAr: 'إنشاء الجداول CREATE TABLE وأنواع البيانات',
    description: 'Create tables, choose correct data types, and use IF NOT EXISTS.',
    descriptionAr: 'إنشاء الجداول واختيار أنواع البيانات الصحيحة واستخدام IF NOT EXISTS.',
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
    contentAr: `
## CREATE TABLE — إنشاء الجداول

\`CREATE TABLE\` يُعرِّف جدولاً جديداً في قاعدة البيانات — اسمه وأعمدته وأنواع البيانات والقيود الأولية.

\`\`\`sql
CREATE TABLE table_name (
  column1  datatype  [constraints],
  column2  datatype  [constraints],
  ...
  [table_constraints]
);
\`\`\`

---

## مثال كامل

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

شرح كل سطر:
- \`id INTEGER PRIMARY KEY\` — معرِّف فريد للصف، يُزاد تلقائياً في SQLite
- \`name TEXT NOT NULL\` — حقل نصي إلزامي
- \`email TEXT UNIQUE\` — لا يمكن لموظفَين مشاركة نفس البريد (القيم NULL مسموحة)
- \`salary REAL NOT NULL DEFAULT 0\` — إلزامي، افتراضيه 0 إن لم يُحدَّد
- \`FOREIGN KEY ...\` — قيد على مستوى الجدول يربطه بجدول departments

---

## نظام أنواع البيانات في SQLite (Type Affinity)

SQLite يستخدم نظاماً مرناً يُسمى **type affinity**. بدلاً من أنواع صارمة، لكل عمود نوع مُفضَّل لكنه يستطيع تخزين أي قيمة:

| النوع المنطقي | الكلمات المفتاحية المقابلة |
|--------------|--------------------------|
| INTEGER | INT, INTEGER, TINYINT, SMALLINT, BIGINT |
| REAL | REAL, FLOAT, DOUBLE |
| TEXT | TEXT, CHAR, VARCHAR, CLOB |
| BLOB | BLOB، بدون نوع |
| NUMERIC | NUMERIC, DECIMAL, BOOLEAN, DATE, DATETIME |

\`\`\`sql
-- هذه جميعها صحيحة في SQLite وتعني نفس الشيء:
CREATE TABLE test (
  a INTEGER,
  b INT,
  c BIGINT,       -- يُخزَّن كـ INTEGER
  d VARCHAR(50),  -- يُخزَّن كـ TEXT (الطول يُتجاهل)
  e DECIMAL(10,2) -- يُخزَّن كـ NUMERIC
);
\`\`\`

---

## أنواع قياسية للتوافق مع قواعد بيانات متعددة

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

يمنع الأخطاء إذا كان الجدول موجوداً مسبقاً:

\`\`\`sql
CREATE TABLE IF NOT EXISTS temp_results (
  id      INTEGER PRIMARY KEY,
  result  TEXT
);
-- لا خطأ إذا كان temp_results موجوداً
\`\`\`

---

## CREATE TABLE AS SELECT (CTAS)

إنشاء جدول جديد من نتائج استعلام:

\`\`\`sql
-- إنشاء نسخة احتياطية من employees
CREATE TABLE employees_backup AS
SELECT * FROM employees;

-- إنشاء جدول ملخص
CREATE TABLE dept_summary AS
SELECT
  department_id,
  COUNT(*)       AS headcount,
  AVG(salary)    AS avg_salary,
  SUM(salary)    AS total_salary
FROM employees
GROUP BY department_id;
\`\`\`

يرث الجدول الجديد أسماء الأعمدة والبيانات من الاستعلام، لكن **ليس** القيود أو الفهارس.

---

## اتفاقيات تسمية الجداول والأعمدة

\`\`\`sql
-- ✅ أسماء جيدة
CREATE TABLE order_items  (...)   -- حروف صغيرة، شرطة سفلية
CREATE TABLE customer_logs (...)  -- وصفية، جمع

-- ❌ تجنب
CREATE TABLE OrderItems (...)     -- حالة مختلطة
CREATE TABLE t1 (...)             -- اسم غير معبِّر
CREATE TABLE "My Table" (...)     -- مسافات تتطلب اقتباساً

-- تسمية الأعمدة
id          INTEGER   -- المفتاح الأساسي يُسمى دائماً 'id'
customer_id INTEGER   -- المفاتيح الخارجية: tablename_id
created_at  TEXT      -- الطوابع الزمنية: لاحقة _at
is_active   INTEGER   -- القيم المنطقية: بادئة is_
\`\`\`

---

## مثال عملي: بناء مدونة

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
        questionAr: 'أنشئ جدولاً باسم "skills" بالأعمدة: id (INTEGER PRIMARY KEY)، employee_id (INTEGER)، skill_name (TEXT NOT NULL)، وproficiency_level (TEXT DEFAULT "Beginner").',
        hint: 'Use CREATE TABLE skills (...)',
        hintAr: 'استخدم CREATE TABLE skills (...) مع تحديد كل عمود وقيوده',
        expectedQuery: "CREATE TABLE skills (id INTEGER PRIMARY KEY, employee_id INTEGER, skill_name TEXT NOT NULL, proficiency_level TEXT DEFAULT 'Beginner')",
        checkFunction: () => true,
      },
      {
        id: 2,
        question: 'Create a backup of the products table called "products_backup" using CREATE TABLE AS SELECT.',
        questionAr: 'أنشئ نسخة احتياطية من جدول products باسم "products_backup" باستخدام CREATE TABLE AS SELECT.',
        hint: 'CREATE TABLE products_backup AS SELECT * FROM products',
        hintAr: 'استخدم CREATE TABLE products_backup AS SELECT * FROM products',
        expectedQuery: 'CREATE TABLE products_backup AS SELECT * FROM products',
        checkFunction: () => true,
      },
    ],
  },

  {
    id: 13,
    title: 'Constraints',
    titleAr: 'القيود Constraints',
    description: 'PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT — enforcing data integrity.',
    descriptionAr: 'PRIMARY KEY وFOREIGN KEY وUNIQUE وNOT NULL وCHECK وDEFAULT — ضمان سلامة البيانات.',
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
    contentAr: `
## القيود — ضمان سلامة البيانات

القيود هي قواعد تُطبَّق على الأعمدة أو الجداول وتُنفِّذها قاعدة البيانات تلقائياً. تمنع دخول بيانات غير صحيحة.

---

## NOT NULL

يضمن أن العمود لا يمكن أن يحتوي على NULL. استخدمه لأي عمود تكون قيمته مطلوبة دائماً.

\`\`\`sql
CREATE TABLE employees (
  id     INTEGER PRIMARY KEY,
  name   TEXT NOT NULL,    -- كل موظف يجب أن يكون له اسم
  salary REAL NOT NULL     -- كل موظف يجب أن يكون له راتب
);

-- ❌ هذا يفشل:
INSERT INTO employees (id, salary) VALUES (1, 50000);
-- خطأ: NOT NULL constraint failed: employees.name
\`\`\`

---

## PRIMARY KEY

يُعرِّف كل صف بشكل فريد. يعني NOT NULL + UNIQUE ضمنياً.

\`\`\`sql
-- على مستوى العمود (الأكثر شيوعاً)
CREATE TABLE products (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

-- مفتاح أساسي مركّب (على مستوى الجدول) — لجداول الربط
CREATE TABLE order_items (
  order_id   INTEGER,
  product_id INTEGER,
  quantity   INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)  -- التوليفة يجب أن تكون فريدة
);
\`\`\`

في SQLite، عمود \`INTEGER PRIMARY KEY\` يحصل تلقائياً على قيمة فريدة إن لم تُقدِّمها (سلوك auto-increment).

---

## UNIQUE

يضمن أن جميع قيم العمود متميزة. على عكس PRIMARY KEY، يُسمح بأعمدة UNIQUE متعددة في الجدول، ويمكن لعمود UNIQUE أن يحتوي على قيم NULL.

\`\`\`sql
CREATE TABLE employees (
  id    INTEGER PRIMARY KEY,
  email TEXT UNIQUE,    -- لا يمكن لموظفَين مشاركة البريد الإلكتروني
  name  TEXT NOT NULL
);

-- UNIQUE متعدد الأعمدة: التوليفة يجب أن تكون فريدة
CREATE TABLE enrollments (
  student_id INTEGER,
  course_id  INTEGER,
  UNIQUE (student_id, course_id)  -- لا يمكن تسجيل طالب في نفس الكورس مرتين
);
\`\`\`

---

## DEFAULT

يوفر قيمة افتراضية عند عدم تحديد قيمة في INSERT.

\`\`\`sql
CREATE TABLE orders (
  id           INTEGER PRIMARY KEY,
  customer_id  INTEGER NOT NULL,
  status       TEXT DEFAULT 'pending',
  created_at   TEXT DEFAULT CURRENT_TIMESTAMP,
  total_amount REAL DEFAULT 0.00
);

-- INSERT بدون تحديد status — يحصل على 'pending' تلقائياً
INSERT INTO orders (customer_id) VALUES (5);
SELECT status FROM orders WHERE customer_id = 5;  -- 'pending'
\`\`\`

---

## CHECK

يتحقق من صحة القيم وفق شرط مخصص. يُرفض الصف إذا كان CHECK يُقيِّم إلى FALSE.

\`\`\`sql
CREATE TABLE employees (
  id     INTEGER PRIMARY KEY,
  name   TEXT NOT NULL,
  salary REAL NOT NULL CHECK (salary > 0),
  age    INTEGER CHECK (age >= 18 AND age <= 100)
);

-- ❌ هذا يفشل:
INSERT INTO employees VALUES (1, 'Test', -500, 30);
-- خطأ: CHECK constraint failed: employees.salary > 0

-- بقيد مُسمَّى (يجعل رسائل الخطأ أوضح)
CREATE TABLE orders (
  id     INTEGER PRIMARY KEY,
  status TEXT NOT NULL,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled'))
);
\`\`\`

---

## FOREIGN KEY

يربط عموداً في جدول بالمفتاح الأساسي لجدول آخر. يضمن **التكامل المرجعي** — لا يمكن أن يكون هناك طلب لعميل غير موجود.

\`\`\`sql
CREATE TABLE orders (
  id          INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE CASCADE    -- احذف الطلبات إذا حُذف العميل
    ON UPDATE CASCADE    -- حدِّث customer_id إذا تغيَّر
);
\`\`\`

### إجراءات ON DELETE / ON UPDATE:

| الإجراء | السلوك |
|---------|--------|
| \`RESTRICT\` | يمنع حذف/تحديث الصف الأب |
| \`CASCADE\` | يحذف/يحدِّث الصفوف الأبناء تلقائياً |
| \`SET NULL\` | يضع NULL في عمود المفتاح الخارجي |
| \`SET DEFAULT\` | يضع القيمة الافتراضية في عمود المفتاح الخارجي |
| \`NO ACTION\` | مثل RESTRICT في معظم قواعد البيانات |

\`\`\`sql
-- ⚠️ SQLite: تطبيق المفاتيح الخارجية مُعطَّل افتراضياً!
-- يجب تفعيله بـ:
PRAGMA foreign_keys = ON;
\`\`\`

---

## تسمية القيود

تسمية القيود تجعل رسائل الخطأ مقروءة وتتيح حذفها لاحقاً:

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
        questionAr: 'أنشئ جدولاً "coupons" بالأعمدة: id (PK)، code (TEXT UNIQUE NOT NULL)، discount_percent (REAL مع CHECK أن قيمته بين 1 و100)، is_active (INTEGER DEFAULT 1).',
        hint: 'Use CHECK (discount_percent BETWEEN 1 AND 100)',
        hintAr: 'استخدم CHECK (discount_percent BETWEEN 1 AND 100) في تعريف العمود',
        expectedQuery: 'CREATE TABLE coupons (id INTEGER PRIMARY KEY, code TEXT UNIQUE NOT NULL, discount_percent REAL CHECK (discount_percent BETWEEN 1 AND 100), is_active INTEGER DEFAULT 1)',
        checkFunction: () => true,
      },
    ],
  },

  {
    id: 14,
    title: 'ALTER TABLE & DROP',
    titleAr: 'تعديل وحذف الجداول ALTER TABLE & DROP',
    description: 'Modify table structure: add/drop columns, rename, and safely drop tables.',
    descriptionAr: 'تعديل بنية الجدول: إضافة/حذف الأعمدة، وإعادة التسمية، وحذف الجداول بأمان.',
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
    contentAr: `
## ALTER TABLE — تعديل البنية

\`ALTER TABLE\` يُغيِّر بنية جدول موجود دون فقدان البيانات (في الغالب).

---

## إضافة الأعمدة

\`\`\`sql
-- إضافة عمود واحد
ALTER TABLE employees
ADD COLUMN phone TEXT;

-- إضافة مع قيمة افتراضية (مهم للصفوف الموجودة!)
ALTER TABLE employees
ADD COLUMN bonus_percent REAL DEFAULT 0.0;

-- إضافة مع NOT NULL تتطلب قيمة افتراضية
ALTER TABLE products
ADD COLUMN weight_kg REAL NOT NULL DEFAULT 0;

-- إضافة عمود لتتبع التحديثات
ALTER TABLE orders
ADD COLUMN updated_at TEXT;
\`\`\`

**تحذير:** في SQLite، \`ALTER TABLE\` محدود — يمكنك فقط إضافة الأعمدة وإعادة تسمية الجدول. قواعد PostgreSQL وMySQL وSQL Server تدعم \`DROP COLUMN\` و\`MODIFY COLUMN\` و\`ADD CONSTRAINT\`.

---

## إعادة تسمية الجدول

\`\`\`sql
ALTER TABLE old_table_name RENAME TO new_table_name;

-- مثال
ALTER TABLE employees RENAME TO staff;
\`\`\`

---

## إعادة تسمية عمود (SQLite 3.25+)

\`\`\`sql
ALTER TABLE employees RENAME COLUMN hire_date TO start_date;
\`\`\`

---

## حذف عمود (ليس في SQLite)

في PostgreSQL وMySQL يمكنك حذف عمود:

\`\`\`sql
-- PostgreSQL / MySQL فقط
ALTER TABLE employees DROP COLUMN middle_name;
ALTER TABLE employees DROP COLUMN IF EXISTS middle_name;  -- النسخة الآمنة
\`\`\`

في SQLite، حذف عمود يتطلب:
1. إنشاء جدول جديد بالبنية المطلوبة
2. نسخ البيانات إليه
3. حذف الجدول القديم
4. إعادة تسمية الجدول الجديد

\`\`\`sql
-- الحل البديل في SQLite لحذف عمود:
CREATE TABLE employees_new AS
SELECT id, name, email, salary FROM employees;  -- تجاهل العمود المراد حذفه
DROP TABLE employees;
ALTER TABLE employees_new RENAME TO employees;
\`\`\`

---

## TRUNCATE TABLE

يحذف جميع الصفوف فوراً دون تسجيل الحذفات الفردية. أسرع بكثير من DELETE للجداول الكبيرة.

\`\`\`sql
-- حذف جميع البيانات مع الإبقاء على بنية الجدول
TRUNCATE TABLE temp_logs;

-- SQLite لا يدعم TRUNCATE — استخدم DELETE بدلاً:
DELETE FROM temp_logs;  -- نفس التأثير في SQLite
\`\`\`

| الميزة | DELETE | TRUNCATE |
|--------|--------|----------|
| يدعم WHERE | ✅ نعم | ❌ لا |
| قابل للتراجع | ✅ نعم | ❌ عادةً لا |
| السرعة مع جداول كبيرة | بطيء | سريع جداً |
| يعيد تعيين auto-increment | ❌ لا | ✅ نعم (في MySQL) |

---

## DROP TABLE

يحذف الجدول وجميع بياناته نهائياً. **لا يمكن التراجع!**

\`\`\`sql
-- حذف جدول (يفشل إذا لم يكن موجوداً)
DROP TABLE old_data;

-- النسخة الآمنة — لا خطأ إذا لم يكن الجدول موجوداً
DROP TABLE IF EXISTS old_data;

-- حذف جداول متعددة دفعةً واحدة (PostgreSQL / MySQL)
DROP TABLE IF EXISTS temp1, temp2, temp3;
\`\`\`

---

## مثال عملي: إضافة سجل تدقيق

\`\`\`sql
-- الخطوة 1: إضافة أعمدة التتبع
ALTER TABLE orders ADD COLUMN created_at TEXT;
ALTER TABLE orders ADD COLUMN updated_at TEXT;

-- الخطوة 2: تعبئة الصفوف الموجودة بتاريخ افتراضي
UPDATE orders SET created_at = order_date WHERE created_at IS NULL;
UPDATE orders SET updated_at = order_date WHERE updated_at IS NULL;

-- الخطوة 3: التحقق
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
        questionAr: 'أضف عموداً "middle_name" من النوع TEXT إلى جدول employees.',
        hint: 'ALTER TABLE employees ADD COLUMN middle_name TEXT',
        hintAr: 'استخدم ALTER TABLE employees ADD COLUMN middle_name TEXT',
        expectedQuery: 'ALTER TABLE employees ADD COLUMN middle_name TEXT',
        checkFunction: () => true,
      },
      {
        id: 2,
        question: 'Create a temporary table "temp_products" and then drop it using DROP TABLE IF EXISTS.',
        questionAr: 'أنشئ جدولاً مؤقتاً "temp_products" ثم احذفه باستخدام DROP TABLE IF EXISTS.',
        hint: 'First CREATE TABLE temp_products (...), then DROP TABLE IF EXISTS temp_products',
        hintAr: 'أولاً CREATE TABLE temp_products (id INTEGER PRIMARY KEY, name TEXT)، ثم DROP TABLE IF EXISTS temp_products',
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
    titleAr: 'إضافة البيانات INSERT INTO',
    description: 'Add single rows, multiple rows at once, and insert from SELECT queries.',
    descriptionAr: 'إضافة صف واحد أو صفوف متعددة دفعةً واحدة، وإدراج البيانات من استعلامات SELECT.',
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
    contentAr: `
## INSERT INTO — إضافة البيانات

\`INSERT INTO\` يُضيف صفوفاً جديدة إلى الجدول.

---

## الصياغة الأساسية — تحديد الأعمدة

\`\`\`sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
\`\`\`

هذا هو الشكل **الموصى به** لأن:
- يمكنك تحديد الأعمدة بأي ترتيب
- يمكنك حذف الأعمدة الاختيارية (تحصل على قيمتها DEFAULT)
- إضافة أعمدة جديدة للجدول لن تُخرِّب جمل INSERT

\`\`\`sql
-- إضافة موظف جديد
INSERT INTO employees (name, email, department_id, salary, hire_date, job_title)
VALUES ('John Doe', 'john@company.com', 1, 72000, '2024-01-15', 'Software Engineer');

-- إضافة عميل بدون رقم هاتف (NULL مسموح)
INSERT INTO customers (name, email, city, country, joined_date)
VALUES ('Alice New', 'alice.new@email.com', 'Boston', 'USA', '2024-01-20');
\`\`\`

---

## إدراج جميع الأعمدة (بالترتيب)

\`\`\`sql
-- بدون قائمة الأعمدة: يجب توفير القيم لجميع الأعمدة بالترتيب
INSERT INTO departments VALUES
  (7, 'Operations', 'Building E', 275000, NULL);
-- ⚠️ خطر: إذا تغيَّر ترتيب الأعمدة، تختلط القيم
\`\`\`

---

## إدراج صفوف متعددة في INSERT واحد

أسرع بكثير من INSERTs منفردة:

\`\`\`sql
-- إدراج صفوف متعددة في جملة واحدة
INSERT INTO categories (id, name, description)
VALUES
  (6, 'Toys',       'Games, puzzles, and educational toys'),
  (7, 'Automotive', 'Car accessories and parts'),
  (8, 'Beauty',     'Skincare, makeup, and personal care');

-- موظفون متعددون دفعةً واحدة
INSERT INTO employees (name, email, department_id, salary, hire_date, job_title)
VALUES
  ('Tom Chen',    'tom@company.com',    1, 78000, '2024-02-01', 'Backend Engineer'),
  ('Sara Ahmed',  'sara@company.com',   2, 65000, '2024-02-15', 'Marketing Analyst'),
  ('Mike Patel',  'mike@company.com',   3, 58000, '2024-03-01', 'Sales Rep');
\`\`\`

---

## INSERT OR REPLACE / INSERT OR IGNORE (SQLite)

التعامل مع التعارضات بأناقة:

\`\`\`sql
-- إذا كان موظف بنفس البريد موجوداً، استبدله
INSERT OR REPLACE INTO employees (id, name, email, salary, hire_date)
VALUES (2, 'Bob Smith Updated', 'bob@company.com', 97000, '2017-06-15');

-- إذا كان مكرراً، تجاهل الإدراج بصمت
INSERT OR IGNORE INTO employees (name, email, salary, hire_date)
VALUES ('Bob Smith', 'bob@company.com', 95000, '2017-06-15');

-- المعادل في SQL القياسي (PostgreSQL):
INSERT INTO employees (...) VALUES (...)
ON CONFLICT (email) DO NOTHING;
\`\`\`

---

## INSERT ... SELECT — نسخ البيانات من جدول آخر

إدراج نتائج استعلام:

\`\`\`sql
-- أرشفة الطلبات القديمة في جدول احتياطي
CREATE TABLE orders_archive AS SELECT * FROM orders WHERE 1=0;

INSERT INTO orders_archive
SELECT * FROM orders
WHERE order_date < '2024-01-01';

-- إنشاء ملخص بـ INSERT SELECT
CREATE TABLE IF NOT EXISTS high_earners (
  id     INTEGER PRIMARY KEY,
  name   TEXT,
  salary REAL
);

INSERT INTO high_earners (id, name, salary)
SELECT id, name, salary
FROM employees
WHERE salary > 90000;
\`\`\`

---

## أخطاء شائعة

\`\`\`sql
-- ❌ عدد قيم غير كافٍ
INSERT INTO employees VALUES (99, 'Incomplete');

-- ❌ نوع بيانات خاطئ
INSERT INTO employees (salary) VALUES ('seventy-five thousand');

-- ❌ انتهاك NOT NULL
INSERT INTO employees (email, salary, hire_date) VALUES ('x@y.com', 50000, '2024-01-01');
-- خطأ: NOT NULL constraint failed: employees.name

-- ❌ مفتاح أساسي مكرر
INSERT INTO employees (id, name, salary, hire_date) VALUES (1, 'Duplicate', 50000, '2024-01-01');
-- خطأ: UNIQUE constraint failed: employees.id
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
        questionAr: 'أضف عميلاً جديداً: name="Test Customer"، email="test@test.com"، city="Miami"، country="USA"، joined_date="2024-08-01"، loyalty_tier="Bronze".',
        hint: 'Use INSERT INTO customers (columns) VALUES (...)',
        hintAr: 'استخدم INSERT INTO customers (name, email, city, country, joined_date, loyalty_tier) VALUES (...)',
        expectedQuery: "INSERT INTO customers (name, email, city, country, joined_date, loyalty_tier) VALUES ('Test Customer', 'test@test.com', 'Miami', 'USA', '2024-08-01', 'Bronze')",
        checkFunction: () => true,
      },
      {
        id: 2,
        question: 'Insert 2 new products in a single INSERT statement: ("Webcam HD", category 1, price 79.99, stock 100) and ("USB Microphone", category 1, price 59.99, stock 80).',
        questionAr: 'أضف منتجَين في جملة INSERT واحدة: ("Webcam HD"، التصنيف 1، السعر 79.99، المخزون 100) و("USB Microphone"، التصنيف 1، السعر 59.99، المخزون 80).',
        hint: 'Use INSERT INTO products VALUES (...), (...) with multiple value sets',
        hintAr: 'استخدم INSERT INTO products (name, category_id, price, stock_quantity) VALUES (...), (...) مع مجموعتَي قيم',
        expectedQuery: "INSERT INTO products (name, category_id, price, stock_quantity) VALUES ('Webcam HD', 1, 79.99, 100), ('USB Microphone', 1, 59.99, 80)",
        checkFunction: () => true,
      },
    ],
  },
];
