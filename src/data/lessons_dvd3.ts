import { Lesson } from '../types';

export const dvdLessonsP3: Lesson[] = [
  // ── Level 10 — Complex Filtering ───────────────────────────────────────────
  {
    id: 131,
    title: 'AND, OR, NOT — Complex Filtering',
    titleAr: 'AND و OR و NOT — التصفية المركّبة',
    description: 'Combine multiple conditions to write precise filters on the DVD schema.',
    descriptionAr: 'دمج شروط متعددة لكتابة مرشّحات دقيقة على قاعدة بيانات DVD.',
    example: `-- Films that are PG-13 rated AND longer than 120 minutes
-- OR rated R and cost less than 2.99 to rent
SELECT title, rating, length, rental_rate
FROM film
WHERE (rating = 'PG-13' AND length > 120)
   OR (rating = 'R'     AND rental_rate < 2.99)
ORDER BY rating, length DESC
LIMIT 15;`,
    content: `## AND, OR, NOT — Complex Filtering

You can chain multiple conditions using \`AND\`, \`OR\`, and \`NOT\`.

| Operator | Meaning |
|----------|---------|
| \`AND\` | Both conditions must be true |
| \`OR\` | At least one condition must be true |
| \`NOT\` | Reverses a condition |

## AND — All Must Match

\`\`\`sql
-- Long, cheap films rated G
SELECT title, length, rental_rate
FROM film
WHERE length > 150
  AND rental_rate < 2.00
  AND rating = 'G'
ORDER BY length DESC;
\`\`\`

## OR — Any Can Match

\`\`\`sql
-- Films rated G or PG
SELECT title, rating
FROM film
WHERE rating = 'G' OR rating = 'PG'
ORDER BY title;
\`\`\`

## NOT — Exclude Matches

\`\`\`sql
-- All ratings except R and NC-17
SELECT title, rating
FROM film
WHERE NOT (rating = 'R' OR rating = 'NC-17')
ORDER BY rating;
\`\`\`

## Parentheses Control Precedence

\`AND\` has higher precedence than \`OR\` — always use parentheses to make intent explicit:

\`\`\`sql
-- Without parentheses — ambiguous!
-- rating = 'G' AND rental_rate < 1 OR rating = 'R'
-- With parentheses — clear:
SELECT title, rating, rental_rate
FROM film
WHERE (rating = 'G' AND rental_rate < 1.00)
   OR (rating = 'R' AND rental_rate < 1.00);
\`\`\`
`,
    contentAr: `## AND و OR و NOT — التصفية المركّبة

يمكنك تسلسل شروط متعددة باستخدام \`AND\` و\`OR\` و\`NOT\`.

| المُعامل | المعنى |
|---------|--------|
| \`AND\` | يجب أن يتحقق كلا الشرطين |
| \`OR\` | يكفي تحقق شرط واحد على الأقل |
| \`NOT\` | يعكس الشرط |

## AND — يجب تحقق الكل

\`\`\`sql
-- أفلام طويلة وبسعر رخيص وتصنيف G
SELECT title, length, rental_rate
FROM film
WHERE length > 150
  AND rental_rate < 2.00
  AND rating = 'G'
ORDER BY length DESC;
\`\`\`

## OR — يكفي أي منها

\`\`\`sql
-- أفلام بتصنيف G أو PG
SELECT title, rating
FROM film
WHERE rating = 'G' OR rating = 'PG'
ORDER BY title;
\`\`\`

## NOT — استبعاد التطابقات

\`\`\`sql
-- جميع التصنيفات ما عدا R وNC-17
SELECT title, rating
FROM film
WHERE NOT (rating = 'R' OR rating = 'NC-17')
ORDER BY rating;
\`\`\`

## الأقواس تتحكم في الأولوية

لـ\`AND\` أولوية أعلى من \`OR\` — استخدم الأقواس دائمًا لتوضيح القصد:

\`\`\`sql
-- بدون أقواس — غامض!
-- مع أقواس — واضح:
SELECT title, rating, rental_rate
FROM film
WHERE (rating = 'G' AND rental_rate < 1.00)
   OR (rating = 'R' AND rental_rate < 1.00);
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Find films that are either rated 'G' with length over 100 minutes, OR rated 'PG' with rental_rate below 3.00. Show title, rating, length, rental_rate. Limit 15.",
        questionAr: "ابحث عن الأفلام ذات تصنيف 'G' ومدة تزيد عن 100 دقيقة، أو تصنيف 'PG' وسعر إيجار أقل من 3.00. اعرض العنوان والتصنيف والمدة والسعر. حدّد بـ 15.",
        hint: "Use parentheses: (rating='G' AND length>100) OR (rating='PG' AND rental_rate<3.00)",
        hintAr: "استخدم الأقواس: (rating='G' AND length>100) OR (rating='PG' AND rental_rate<3.00)",
        expectedQuery: "SELECT title, rating, length, rental_rate FROM film WHERE (rating = 'G' AND length > 100) OR (rating = 'PG' AND rental_rate < 3.00) LIMIT 15",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /AND/i.test(q) && /OR/i.test(q),
      },
      {
        id: 2,
        question: "Find active customers (active = 1) who are NOT in store 1. Show first_name, last_name, store_id, active.",
        questionAr: "ابحث عن العملاء النشطين (active = 1) غير الموجودين في المتجر 1. اعرض الاسم الأول والأخير ورقم المتجر والحالة.",
        hint: "WHERE active = 1 AND NOT store_id = 1  (or store_id != 1)",
        hintAr: "WHERE active = 1 AND NOT store_id = 1",
        expectedQuery: "SELECT first_name, last_name, store_id, active FROM customer WHERE active = 1 AND store_id != 1",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /active/i.test(q) && /store_id/i.test(q),
      },
    ],
  },

  {
    id: 132,
    title: 'IN, NOT IN, BETWEEN',
    titleAr: 'IN و NOT IN و BETWEEN',
    description: 'Use shorthand operators to filter against value lists and ranges.',
    descriptionAr: 'استخدام المُعاملات المختصرة للتصفية بقوائم القيم والنطاقات.',
    example: `-- Films rated G, PG, or PG-13 with length between 90 and 120 minutes
SELECT title, rating, length
FROM film
WHERE rating BETWEEN 'G' AND 'PG-13'   -- alphabetical range (less useful for text)
-- Better approach:
-- WHERE rating IN ('G', 'PG', 'PG-13')
--   AND length BETWEEN 90 AND 120
ORDER BY length;`,
    content: `## IN, NOT IN, BETWEEN

These operators replace long chains of \`OR\` conditions.

## IN — Match Any Value in a List

\`\`\`sql
-- Films with specific ratings
SELECT title, rating
FROM film
WHERE rating IN ('G', 'PG', 'PG-13')
ORDER BY rating, title;
\`\`\`

Equivalent to: \`rating = 'G' OR rating = 'PG' OR rating = 'PG-13'\`

## NOT IN — Exclude a List

\`\`\`sql
-- Films that are NOT rated R or NC-17
SELECT title, rating
FROM film
WHERE rating NOT IN ('R', 'NC-17')
ORDER BY title
LIMIT 15;
\`\`\`

> **Caution:** \`NOT IN\` returns no rows if the list contains a NULL. Use \`NOT EXISTS\` as a safer alternative when dealing with NULLs.

## BETWEEN — Inclusive Range

\`\`\`sql
-- Films 60 to 90 minutes long, costing 0.99 to 2.99 to rent
SELECT title, length, rental_rate
FROM film
WHERE length      BETWEEN 60  AND 90
  AND rental_rate BETWEEN 0.99 AND 2.99
ORDER BY length;
\`\`\`

\`BETWEEN a AND b\` is **inclusive** — equivalent to \`>= a AND <= b\`.

## NOT BETWEEN

\`\`\`sql
-- Films that are NOT in the standard 80–120 minute range
SELECT title, length
FROM film
WHERE length NOT BETWEEN 80 AND 120
ORDER BY length;
\`\`\`
`,
    contentAr: `## IN و NOT IN و BETWEEN

تحلّ هذه المُعاملات محلّ سلاسل \`OR\` الطويلة.

## IN — مطابقة أي قيمة في القائمة

\`\`\`sql
-- أفلام بتصنيفات محددة
SELECT title, rating
FROM film
WHERE rating IN ('G', 'PG', 'PG-13')
ORDER BY rating, title;
\`\`\`

مكافئ لـ: \`rating = 'G' OR rating = 'PG' OR rating = 'PG-13'\`

## NOT IN — استبعاد قائمة

\`\`\`sql
-- أفلام غير مصنّفة R أو NC-17
SELECT title, rating
FROM film
WHERE rating NOT IN ('R', 'NC-17')
ORDER BY title
LIMIT 15;
\`\`\`

> **تحذير:** يُرجع \`NOT IN\` صفرًا من الصفوف إذا احتوت القائمة على NULL. استخدم \`NOT EXISTS\` بديلًا أأمن عند التعامل مع القيم الفارغة.

## BETWEEN — نطاق شامل للطرفين

\`\`\`sql
-- أفلام من 60 إلى 90 دقيقة بسعر إيجار من 0.99 إلى 2.99
SELECT title, length, rental_rate
FROM film
WHERE length      BETWEEN 60  AND 90
  AND rental_rate BETWEEN 0.99 AND 2.99
ORDER BY length;
\`\`\`

\`BETWEEN a AND b\` **يشمل الطرفين** — مكافئ لـ \`>= a AND <= b\`.

## NOT BETWEEN

\`\`\`sql
-- أفلام خارج النطاق المعتاد 80-120 دقيقة
SELECT title, length
FROM film
WHERE length NOT BETWEEN 80 AND 120
ORDER BY length;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Find all films with rental_rate IN (0.99, 2.99) and length BETWEEN 100 AND 150. Show title, rental_rate, length ordered by rental_rate, length.",
        questionAr: "ابحث عن الأفلام بسعر إيجار IN (0.99, 2.99) ومدة BETWEEN 100 AND 150. اعرض العنوان والسعر والمدة مرتبًا حسب السعر والمدة.",
        hint: "WHERE rental_rate IN (0.99, 2.99) AND length BETWEEN 100 AND 150",
        hintAr: "WHERE rental_rate IN (0.99, 2.99) AND length BETWEEN 100 AND 150",
        expectedQuery: "SELECT title, rental_rate, length FROM film WHERE rental_rate IN (0.99, 2.99) AND length BETWEEN 100 AND 150 ORDER BY rental_rate, length",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /IN/i.test(q) && /BETWEEN/i.test(q),
      },
      {
        id: 2,
        question: "Find customers with customer_id NOT IN (1, 2, 3, 4, 5). Show first_name, last_name, customer_id. Order by customer_id, limit 10.",
        questionAr: "ابحث عن العملاء الذين customer_id ليس IN (1, 2, 3, 4, 5). اعرض الاسم الأول والأخير والمعرّف. رتّب حسب المعرّف، حدّد بـ 10.",
        hint: "WHERE customer_id NOT IN (1, 2, 3, 4, 5)",
        hintAr: "WHERE customer_id NOT IN (1, 2, 3, 4, 5)",
        expectedQuery: "SELECT first_name, last_name, customer_id FROM customer WHERE customer_id NOT IN (1, 2, 3, 4, 5) ORDER BY customer_id LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /NOT\s+IN/i.test(q),
      },
    ],
  },

  {
    id: 133,
    title: 'DISTINCT & LIMIT / OFFSET',
    titleAr: 'DISTINCT و LIMIT / OFFSET',
    description: 'Remove duplicate rows and paginate results on the DVD Rental schema.',
    descriptionAr: 'إزالة الصفوف المكررة وترقيم نتائج قاعدة بيانات DVD.',
    example: `-- All unique rental rates available
SELECT DISTINCT rental_rate
FROM film
ORDER BY rental_rate;

-- Page 2 of films (rows 11-20)
SELECT title, rental_rate
FROM film
ORDER BY title
LIMIT 10 OFFSET 10;`,
    content: `## DISTINCT & LIMIT / OFFSET

## DISTINCT — Unique Values Only

\`DISTINCT\` removes duplicate rows from results:

\`\`\`sql
-- What ratings exist in the database?
SELECT DISTINCT rating FROM film ORDER BY rating;

-- What unique rental durations are there?
SELECT DISTINCT rental_duration FROM film ORDER BY rental_duration;
\`\`\`

## DISTINCT on Multiple Columns

\`\`\`sql
-- Unique combinations of rating and rental_duration
SELECT DISTINCT rating, rental_duration
FROM film
ORDER BY rating, rental_duration;
\`\`\`

## LIMIT — Cap the Number of Rows

\`\`\`sql
-- The 5 most expensive films to rent
SELECT title, rental_rate
FROM film
ORDER BY rental_rate DESC
LIMIT 5;
\`\`\`

## OFFSET — Skip Rows (Pagination)

\`\`\`sql
-- Films 11-20 alphabetically (page 2, page size 10)
SELECT title FROM film
ORDER BY title
LIMIT 10 OFFSET 10;
\`\`\`

> **PostgreSQL note:** PostgreSQL supports the same \`LIMIT / OFFSET\` syntax. It also supports the SQL standard \`FETCH FIRST n ROWS ONLY\`.

## Practical Pagination

\`\`\`sql
-- Page formula: OFFSET = (page_number - 1) * page_size
-- Page 3 (rows 21-30):
SELECT title, rating
FROM film
ORDER BY title
LIMIT 10 OFFSET 20;
\`\`\`
`,
    contentAr: `## DISTINCT و LIMIT / OFFSET

## DISTINCT — القيم الفريدة فقط

تُزيل \`DISTINCT\` الصفوف المكررة من النتائج:

\`\`\`sql
-- ما هي التصنيفات الموجودة في قاعدة البيانات؟
SELECT DISTINCT rating FROM film ORDER BY rating;

-- ما هي مُدد الإيجار الفريدة؟
SELECT DISTINCT rental_duration FROM film ORDER BY rental_duration;
\`\`\`

## DISTINCT على أعمدة متعددة

\`\`\`sql
-- التوليفات الفريدة من التصنيف ومدة الإيجار
SELECT DISTINCT rating, rental_duration
FROM film
ORDER BY rating, rental_duration;
\`\`\`

## LIMIT — تحديد عدد الصفوف

\`\`\`sql
-- أغلى 5 أفلام من حيث الإيجار
SELECT title, rental_rate
FROM film
ORDER BY rental_rate DESC
LIMIT 5;
\`\`\`

## OFFSET — تخطي الصفوف (الترقيم)

\`\`\`sql
-- الأفلام من 11 إلى 20 أبجديًا (الصفحة 2، حجم الصفحة 10)
SELECT title FROM film
ORDER BY title
LIMIT 10 OFFSET 10;
\`\`\`

> **ملاحظة PostgreSQL:** يدعم PostgreSQL نفس صيغة \`LIMIT / OFFSET\`. كما يدعم الصيغة القياسية \`FETCH FIRST n ROWS ONLY\`.

## الترقيم العملي

\`\`\`sql
-- معادلة الصفحة: OFFSET = (رقم_الصفحة - 1) × حجم_الصفحة
-- الصفحة 3 (الصفوف 21-30):
SELECT title, rating
FROM film
ORDER BY title
LIMIT 10 OFFSET 20;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Show all distinct combinations of rating and rental_duration from the film table. Order by rating, then rental_duration.",
        questionAr: "اعرض جميع التوليفات الفريدة من rating وrental_duration من جدول film. رتّب حسب rating ثم rental_duration.",
        hint: "SELECT DISTINCT rating, rental_duration FROM film ORDER BY ...",
        hintAr: "SELECT DISTINCT rating, rental_duration FROM film ORDER BY ...",
        expectedQuery: "SELECT DISTINCT rating, rental_duration FROM film ORDER BY rating, rental_duration",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /DISTINCT/i.test(q) && /rental_duration/i.test(q),
      },
      {
        id: 2,
        question: "Implement page 3 of films (rows 21-30), ordered alphabetically by title. Show title and rating.",
        questionAr: "نفّذ الصفحة 3 من الأفلام (الصفوف 21-30)، مرتبةً أبجديًا حسب العنوان. اعرض العنوان والتصنيف.",
        hint: "LIMIT 10 OFFSET 20",
        hintAr: "LIMIT 10 OFFSET 20",
        expectedQuery: "SELECT title, rating FROM film ORDER BY title LIMIT 10 OFFSET 20",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /OFFSET\s+20/i.test(q) && /LIMIT\s+10/i.test(q),
      },
    ],
  },

  // ── Level 11 — DDL: Building Tables ────────────────────────────────────────
  {
    id: 134,
    title: 'CREATE TABLE & Data Types',
    titleAr: 'CREATE TABLE وأنواع البيانات',
    description: 'Create new tables in the DVD schema using appropriate data types.',
    descriptionAr: 'إنشاء جداول جديدة في قاعدة بيانات DVD باستخدام أنواع البيانات المناسبة.',
    example: `-- Create a film_review table to track customer reviews
CREATE TABLE film_review (
  review_id   INTEGER PRIMARY KEY,
  film_id     INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  stars       INTEGER,
  review_text TEXT,
  reviewed_at TEXT DEFAULT (date('now'))
);

-- Verify it was created
SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'film_review';`,
    content: `## CREATE TABLE & Data Types

\`CREATE TABLE\` defines a new table and its columns. Each column needs a **name** and a **data type**.

## Common Data Types

| SQLite Type | PostgreSQL Equivalent | Use For |
|-------------|----------------------|---------|
| \`INTEGER\` | \`INTEGER\` / \`BIGINT\` | Whole numbers, IDs |
| \`REAL\` | \`NUMERIC\` / \`DECIMAL\` | Decimal numbers |
| \`TEXT\` | \`TEXT\` / \`VARCHAR\` | Strings |
| \`BLOB\` | \`BYTEA\` | Binary data |
| \`TEXT\` | \`DATE\` / \`TIMESTAMP\` | Dates (stored as text in SQLite) |

## Basic CREATE TABLE

\`\`\`sql
CREATE TABLE film_review (
  review_id   INTEGER PRIMARY KEY,
  film_id     INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  stars       INTEGER,        -- 1 to 5
  review_text TEXT,
  reviewed_at TEXT DEFAULT (date('now'))
);
\`\`\`

> **PostgreSQL equivalent:**
> \`\`\`sql
> CREATE TABLE film_review (
>   review_id   SERIAL PRIMARY KEY,
>   film_id     INTEGER NOT NULL,
>   customer_id INTEGER NOT NULL,
>   stars       SMALLINT,
>   review_text TEXT,
>   reviewed_at DATE DEFAULT CURRENT_DATE
> );
> \`\`\`

## IF NOT EXISTS

\`\`\`sql
-- Won't error if the table already exists
CREATE TABLE IF NOT EXISTS film_review (
  review_id INTEGER PRIMARY KEY,
  film_id   INTEGER NOT NULL,
  stars     INTEGER
);
\`\`\`

## DROP TABLE

\`\`\`sql
DROP TABLE IF EXISTS film_review;
\`\`\`
`,
    contentAr: `## CREATE TABLE وأنواع البيانات

تُعرّف \`CREATE TABLE\` جدولًا جديدًا وأعمدته. كل عمود يحتاج **اسمًا** و**نوع بيانات**.

## أنواع البيانات الشائعة

| نوع SQLite | المكافئ في PostgreSQL | الاستخدام |
|-----------|----------------------|-----------|
| \`INTEGER\` | \`INTEGER\` / \`BIGINT\` | الأعداد الصحيحة والمعرّفات |
| \`REAL\` | \`NUMERIC\` / \`DECIMAL\` | الأعداد العشرية |
| \`TEXT\` | \`TEXT\` / \`VARCHAR\` | النصوص |
| \`BLOB\` | \`BYTEA\` | البيانات الثنائية |
| \`TEXT\` | \`DATE\` / \`TIMESTAMP\` | التواريخ (مخزّنة كنص في SQLite) |

## CREATE TABLE الأساسية

\`\`\`sql
CREATE TABLE film_review (
  review_id   INTEGER PRIMARY KEY,
  film_id     INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  stars       INTEGER,        -- من 1 إلى 5
  review_text TEXT,
  reviewed_at TEXT DEFAULT (date('now'))
);
\`\`\`

> **المكافئ في PostgreSQL:**
> \`\`\`sql
> CREATE TABLE film_review (
>   review_id   SERIAL PRIMARY KEY,
>   film_id     INTEGER NOT NULL,
>   customer_id INTEGER NOT NULL,
>   stars       SMALLINT,
>   review_text TEXT,
>   reviewed_at DATE DEFAULT CURRENT_DATE
> );
> \`\`\`

## IF NOT EXISTS

\`\`\`sql
-- لن يُظهر خطأ إذا كان الجدول موجودًا مسبقًا
CREATE TABLE IF NOT EXISTS film_review (
  review_id INTEGER PRIMARY KEY,
  film_id   INTEGER NOT NULL,
  stars     INTEGER
);
\`\`\`

## DROP TABLE

\`\`\`sql
DROP TABLE IF EXISTS film_review;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Create a table called 'staff_bonus' with columns: bonus_id (INTEGER PRIMARY KEY), staff_id (INTEGER NOT NULL), amount (REAL), awarded_at (TEXT). Then SELECT everything from it.",
        questionAr: "أنشئ جدولًا اسمه 'staff_bonus' بأعمدة: bonus_id (INTEGER PRIMARY KEY) وstaff_id (INTEGER NOT NULL) وamount (REAL) وawarded_at (TEXT). ثم اختر كل شيء منه.",
        hint: "CREATE TABLE staff_bonus (...); then SELECT * FROM staff_bonus;",
        hintAr: "CREATE TABLE staff_bonus (...); ثم SELECT * FROM staff_bonus;",
        expectedQuery: "CREATE TABLE staff_bonus (bonus_id INTEGER PRIMARY KEY, staff_id INTEGER NOT NULL, amount REAL, awarded_at TEXT); SELECT * FROM staff_bonus;",
        checkFunction: (_result: unknown[], q = '') =>
          /CREATE\s+TABLE/i.test(q) && /staff_bonus/i.test(q) && /PRIMARY\s+KEY/i.test(q),
      },
      {
        id: 2,
        question: "Create a table 'film_tag' with columns: tag_id (INTEGER PRIMARY KEY), film_id (INTEGER NOT NULL), tag (TEXT NOT NULL). Use IF NOT EXISTS. Then verify with: SELECT name FROM sqlite_master WHERE type='table' AND name='film_tag'",
        questionAr: "أنشئ جدول 'film_tag' بأعمدة: tag_id (INTEGER PRIMARY KEY) وfilm_id (INTEGER NOT NULL) وtag (TEXT NOT NULL). استخدم IF NOT EXISTS. ثم تحقق بـ: SELECT name FROM sqlite_master WHERE type='table' AND name='film_tag'",
        hint: "CREATE TABLE IF NOT EXISTS film_tag (...)",
        hintAr: "CREATE TABLE IF NOT EXISTS film_tag (...)",
        expectedQuery: "CREATE TABLE IF NOT EXISTS film_tag (tag_id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, tag TEXT NOT NULL); SELECT name FROM sqlite_master WHERE type='table' AND name='film_tag'",
        checkFunction: (_result: unknown[], q = '') =>
          /CREATE\s+TABLE/i.test(q) && /film_tag/i.test(q) && /IF\s+NOT\s+EXISTS/i.test(q),
      },
    ],
  },

  {
    id: 135,
    title: 'Constraints',
    titleAr: 'القيود (Constraints)',
    description: 'Enforce data integrity using PRIMARY KEY, FOREIGN KEY, NOT NULL, UNIQUE, and CHECK.',
    descriptionAr: 'تطبيق سلامة البيانات باستخدام PRIMARY KEY وFOREIGN KEY وNOT NULL وUNIQUE وCHECK.',
    example: `-- Create a table with all major constraint types
CREATE TABLE film_review (
  review_id   INTEGER PRIMARY KEY,
  film_id     INTEGER NOT NULL REFERENCES film(film_id),
  customer_id INTEGER NOT NULL REFERENCES customer(customer_id),
  stars       INTEGER NOT NULL CHECK (stars BETWEEN 1 AND 5),
  review_text TEXT,
  reviewed_at TEXT DEFAULT (date('now')),
  UNIQUE (film_id, customer_id)   -- one review per customer per film
);`,
    content: `## Constraints

Constraints enforce rules on your data so invalid data can never enter the database.

## PRIMARY KEY

Uniquely identifies each row. Automatically NOT NULL.

\`\`\`sql
CREATE TABLE my_table (
  id INTEGER PRIMARY KEY  -- must be unique and not null
);
\`\`\`

## NOT NULL

The column must always have a value:

\`\`\`sql
film_id INTEGER NOT NULL
\`\`\`

## UNIQUE

All values in the column (or combination) must be distinct:

\`\`\`sql
-- Single column unique
email TEXT UNIQUE,

-- Composite unique — one review per customer per film
UNIQUE (film_id, customer_id)
\`\`\`

## FOREIGN KEY

Links a column to a primary key in another table, preventing orphan records:

\`\`\`sql
film_id INTEGER NOT NULL REFERENCES film(film_id)
\`\`\`

> **PostgreSQL note:** PostgreSQL enforces foreign keys by default. SQLite requires \`PRAGMA foreign_keys = ON;\` to enable enforcement.

## CHECK

Validates values meet a custom condition:

\`\`\`sql
stars INTEGER CHECK (stars BETWEEN 1 AND 5)
rental_rate REAL CHECK (rental_rate >= 0)
\`\`\`

## DEFAULT

Provides a fallback value when none is supplied:

\`\`\`sql
reviewed_at TEXT DEFAULT (date('now'))
active      INTEGER DEFAULT 1
\`\`\`
`,
    contentAr: `## القيود (Constraints)

تُطبّق القيود قواعد على بياناتك حتى لا تدخل بيانات غير صالحة إلى قاعدة البيانات أبدًا.

## PRIMARY KEY

يُحدّد كل صف بشكل فريد. تلقائيًا NOT NULL.

\`\`\`sql
CREATE TABLE my_table (
  id INTEGER PRIMARY KEY  -- يجب أن يكون فريدًا وغير فارغ
);
\`\`\`

## NOT NULL

يجب أن يكون للعمود قيمة دائمًا:

\`\`\`sql
film_id INTEGER NOT NULL
\`\`\`

## UNIQUE

يجب أن تكون جميع القيم في العمود (أو التوليفة) مختلفة:

\`\`\`sql
-- فريد لعمود واحد
email TEXT UNIQUE,

-- فريد مركّب — تقييم واحد لكل عميل لكل فيلم
UNIQUE (film_id, customer_id)
\`\`\`

## FOREIGN KEY

يربط عمودًا بمفتاح أساسي في جدول آخر، ويمنع السجلات المنفصلة:

\`\`\`sql
film_id INTEGER NOT NULL REFERENCES film(film_id)
\`\`\`

> **ملاحظة PostgreSQL:** يُطبّق PostgreSQL المفاتيح الخارجية افتراضيًا. يتطلب SQLite تفعيل \`PRAGMA foreign_keys = ON;\`.

## CHECK

يتحقق من استيفاء القيم لشرط مخصص:

\`\`\`sql
stars INTEGER CHECK (stars BETWEEN 1 AND 5)
rental_rate REAL CHECK (rental_rate >= 0)
\`\`\`

## DEFAULT

يوفر قيمة احتياطية عند عدم تقديم أي قيمة:

\`\`\`sql
reviewed_at TEXT DEFAULT (date('now'))
active      INTEGER DEFAULT 1
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Create table 'film_award' with: award_id (INTEGER PRIMARY KEY), film_id (INTEGER NOT NULL REFERENCES film(film_id)), award_name (TEXT NOT NULL), year (INTEGER CHECK (year >= 1900)). Then SELECT * FROM film_award.",
        questionAr: "أنشئ جدول 'film_award' بـ: award_id (INTEGER PRIMARY KEY) وfilm_id (INTEGER NOT NULL REFERENCES film(film_id)) وaward_name (TEXT NOT NULL) وyear (INTEGER CHECK (year >= 1900)). ثم اختر كل شيء منه.",
        hint: "Use REFERENCES film(film_id) and CHECK constraint on year",
        hintAr: "استخدم REFERENCES film(film_id) وقيد CHECK على year",
        expectedQuery: "CREATE TABLE film_award (award_id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL REFERENCES film(film_id), award_name TEXT NOT NULL, year INTEGER CHECK (year >= 1900)); SELECT * FROM film_award;",
        checkFunction: (_result: unknown[], q = '') =>
          /CREATE\s+TABLE/i.test(q) && /CHECK/i.test(q) && /REFERENCES/i.test(q),
      },
      {
        id: 2,
        question: "Create table 'store_promo' with: promo_id (INTEGER PRIMARY KEY), store_id (INTEGER NOT NULL), discount_pct (REAL NOT NULL CHECK (discount_pct BETWEEN 0 AND 100)), valid_until (TEXT), UNIQUE(store_id, valid_until). Then SELECT * FROM store_promo.",
        questionAr: "أنشئ جدول 'store_promo' بـ: promo_id (INTEGER PRIMARY KEY) وstore_id (INTEGER NOT NULL) وdiscount_pct (REAL NOT NULL CHECK (discount_pct BETWEEN 0 AND 100)) وvalid_until (TEXT) وUNIQUE(store_id, valid_until). ثم اختر كل شيء منه.",
        hint: "Add UNIQUE(store_id, valid_until) as a table-level constraint after the column definitions",
        hintAr: "أضف UNIQUE(store_id, valid_until) كقيد على مستوى الجدول بعد تعريفات الأعمدة",
        expectedQuery: "CREATE TABLE store_promo (promo_id INTEGER PRIMARY KEY, store_id INTEGER NOT NULL, discount_pct REAL NOT NULL CHECK (discount_pct BETWEEN 0 AND 100), valid_until TEXT, UNIQUE(store_id, valid_until)); SELECT * FROM store_promo;",
        checkFunction: (_result: unknown[], q = '') =>
          /CREATE\s+TABLE/i.test(q) && /UNIQUE/i.test(q) && /CHECK/i.test(q),
      },
    ],
  },

  {
    id: 136,
    title: 'ALTER TABLE & DROP TABLE',
    titleAr: 'ALTER TABLE و DROP TABLE',
    description: 'Modify existing tables by adding columns, renaming, or dropping them.',
    descriptionAr: 'تعديل الجداول الموجودة بإضافة أعمدة أو إعادة تسميتها أو حذفها.',
    example: `-- Create a table to modify
CREATE TABLE IF NOT EXISTS film_review (
  review_id INTEGER PRIMARY KEY,
  film_id   INTEGER NOT NULL,
  stars     INTEGER
);

-- Add a new column
ALTER TABLE film_review ADD COLUMN review_text TEXT;

-- Verify the new column exists
SELECT * FROM film_review LIMIT 1;`,
    content: `## ALTER TABLE & DROP TABLE

After creating a table you can modify its structure with \`ALTER TABLE\`.

## ADD COLUMN

\`\`\`sql
ALTER TABLE film_review ADD COLUMN review_text TEXT;
ALTER TABLE film_review ADD COLUMN is_verified INTEGER DEFAULT 0;
\`\`\`

## RENAME TABLE

\`\`\`sql
ALTER TABLE film_review RENAME TO film_rating;
\`\`\`

## RENAME COLUMN (SQLite 3.25+)

\`\`\`sql
ALTER TABLE film_review RENAME COLUMN stars TO rating_stars;
\`\`\`

## DROP COLUMN (SQLite 3.35+)

\`\`\`sql
ALTER TABLE film_review DROP COLUMN is_verified;
\`\`\`

> **PostgreSQL note:** PostgreSQL supports all of the above plus \`ALTER COLUMN\` to change type or constraints:
> \`\`\`sql
> ALTER TABLE film_review ALTER COLUMN stars TYPE SMALLINT;
> ALTER TABLE film_review ALTER COLUMN review_text SET NOT NULL;
> \`\`\`

## DROP TABLE

Permanently deletes a table and all its data:

\`\`\`sql
DROP TABLE film_review;           -- error if doesn't exist
DROP TABLE IF EXISTS film_review; -- safe version
\`\`\`

> **Warning:** \`DROP TABLE\` cannot be undone unless you're inside a transaction.
`,
    contentAr: `## ALTER TABLE و DROP TABLE

بعد إنشاء جدول يمكنك تعديل هيكله باستخدام \`ALTER TABLE\`.

## ADD COLUMN

\`\`\`sql
ALTER TABLE film_review ADD COLUMN review_text TEXT;
ALTER TABLE film_review ADD COLUMN is_verified INTEGER DEFAULT 0;
\`\`\`

## RENAME TABLE

\`\`\`sql
ALTER TABLE film_review RENAME TO film_rating;
\`\`\`

## RENAME COLUMN (SQLite 3.25+)

\`\`\`sql
ALTER TABLE film_review RENAME COLUMN stars TO rating_stars;
\`\`\`

## DROP COLUMN (SQLite 3.35+)

\`\`\`sql
ALTER TABLE film_review DROP COLUMN is_verified;
\`\`\`

> **ملاحظة PostgreSQL:** يدعم PostgreSQL كل ما سبق إضافةً إلى \`ALTER COLUMN\` لتغيير النوع أو القيود:
> \`\`\`sql
> ALTER TABLE film_review ALTER COLUMN stars TYPE SMALLINT;
> ALTER TABLE film_review ALTER COLUMN review_text SET NOT NULL;
> \`\`\`

## DROP TABLE

يحذف الجدول وجميع بياناته نهائيًا:

\`\`\`sql
DROP TABLE film_review;           -- خطأ إذا لم يكن موجودًا
DROP TABLE IF EXISTS film_review; -- النسخة الآمنة
\`\`\`

> **تحذير:** لا يمكن التراجع عن \`DROP TABLE\` إلا إذا كنت داخل معاملة (transaction).
`,
    exercises: [
      {
        id: 1,
        question: "Create table 'film_note' (note_id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, note TEXT). Then add a column 'created_at TEXT DEFAULT (date(\"now\"))'. Finally SELECT * FROM film_note.",
        questionAr: "أنشئ جدول 'film_note' (note_id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, note TEXT). ثم أضف عمود 'created_at TEXT DEFAULT (date(\"now\"))'. أخيرًا اختر كل شيء من film_note.",
        hint: "CREATE TABLE ...; ALTER TABLE film_note ADD COLUMN created_at TEXT DEFAULT (date('now')); SELECT * FROM film_note;",
        hintAr: "CREATE TABLE ...; ALTER TABLE film_note ADD COLUMN ...; SELECT * FROM film_note;",
        expectedQuery: "CREATE TABLE film_note (note_id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, note TEXT); ALTER TABLE film_note ADD COLUMN created_at TEXT DEFAULT (date('now')); SELECT * FROM film_note;",
        checkFunction: (_result: unknown[], q = '') =>
          /CREATE\s+TABLE/i.test(q) && /ALTER\s+TABLE/i.test(q) && /ADD\s+COLUMN/i.test(q),
      },
      {
        id: 2,
        question: "Create table 'temp_log' (log_id INTEGER PRIMARY KEY, msg TEXT). Then rename it to 'event_log' using ALTER TABLE. Finally verify with SELECT name FROM sqlite_master WHERE type='table' AND name='event_log'.",
        questionAr: "أنشئ جدول 'temp_log' (log_id INTEGER PRIMARY KEY, msg TEXT). ثم أعد تسميته إلى 'event_log' باستخدام ALTER TABLE. أخيرًا تحقق بـ SELECT name FROM sqlite_master WHERE type='table' AND name='event_log'.",
        hint: "ALTER TABLE temp_log RENAME TO event_log",
        hintAr: "ALTER TABLE temp_log RENAME TO event_log",
        expectedQuery: "CREATE TABLE temp_log (log_id INTEGER PRIMARY KEY, msg TEXT); ALTER TABLE temp_log RENAME TO event_log; SELECT name FROM sqlite_master WHERE type='table' AND name='event_log';",
        checkFunction: (result: unknown[], q = '') =>
          /RENAME\s+TO/i.test(q) && (result.length > 0 || /event_log/i.test(q)),
      },
    ],
  },

  // ── Level 12 — DML: Modifying Data ─────────────────────────────────────────
  {
    id: 137,
    title: 'INSERT INTO',
    titleAr: 'INSERT INTO — إدراج البيانات',
    description: 'Add new rows to DVD Rental tables using INSERT INTO.',
    descriptionAr: 'إضافة صفوف جديدة إلى جداول DVD Rental باستخدام INSERT INTO.',
    example: `-- First create a review table
CREATE TABLE IF NOT EXISTS film_review (
  review_id INTEGER PRIMARY KEY,
  film_id   INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  stars     INTEGER CHECK (stars BETWEEN 1 AND 5),
  review_text TEXT
);

-- Insert a single review
INSERT INTO film_review (film_id, customer_id, stars, review_text)
VALUES (1, 1, 5, 'Amazing film!');

-- Check the result
SELECT * FROM film_review;`,
    content: `## INSERT INTO

\`INSERT INTO\` adds new rows to a table.

## Single Row Insert

\`\`\`sql
INSERT INTO film_review (film_id, customer_id, stars, review_text)
VALUES (1, 1, 5, 'Amazing film!');
\`\`\`

Always specify column names — it's safer and works even if the table structure changes later.

## Multiple Rows at Once

\`\`\`sql
INSERT INTO film_review (film_id, customer_id, stars, review_text)
VALUES
  (2, 1, 4, 'Great action!'),
  (3, 2, 3, 'It was okay'),
  (5, 3, 5, 'A masterpiece');
\`\`\`

## INSERT from SELECT

Copy data from another table or query:

\`\`\`sql
-- Insert a review for every film a specific customer rented
INSERT INTO film_review (film_id, customer_id, stars)
SELECT DISTINCT i.film_id, r.customer_id, 3
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
WHERE r.customer_id = 1;
\`\`\`

> **PostgreSQL note:** PostgreSQL supports \`INSERT ... RETURNING\` to get back the inserted rows:
> \`\`\`sql
> INSERT INTO film_review (film_id, customer_id, stars)
> VALUES (1, 1, 5)
> RETURNING review_id, film_id;
> \`\`\`
`,
    contentAr: `## INSERT INTO

تُضيف \`INSERT INTO\` صفوفًا جديدة إلى الجدول.

## إدراج صف واحد

\`\`\`sql
INSERT INTO film_review (film_id, customer_id, stars, review_text)
VALUES (1, 1, 5, 'رائع جدًا!');
\`\`\`

حدّد أسماء الأعمدة دائمًا — هذا أأمن ويعمل حتى لو تغير هيكل الجدول لاحقًا.

## إدراج صفوف متعددة دفعةً واحدة

\`\`\`sql
INSERT INTO film_review (film_id, customer_id, stars, review_text)
VALUES
  (2, 1, 4, 'أكشن رائع!'),
  (3, 2, 3, 'لا بأس'),
  (5, 3, 5, 'تحفة فنية');
\`\`\`

## INSERT من SELECT

نسخ البيانات من جدول آخر أو استعلام:

\`\`\`sql
-- إدراج تقييم لكل فيلم استأجره عميل محدد
INSERT INTO film_review (film_id, customer_id, stars)
SELECT DISTINCT i.film_id, r.customer_id, 3
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
WHERE r.customer_id = 1;
\`\`\`

> **ملاحظة PostgreSQL:** يدعم PostgreSQL \`INSERT ... RETURNING\` للحصول على الصفوف المُدرجة:
> \`\`\`sql
> INSERT INTO film_review (film_id, customer_id, stars)
> VALUES (1, 1, 5)
> RETURNING review_id, film_id;
> \`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Create table film_review (review_id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, customer_id INTEGER NOT NULL, stars INTEGER). Insert 3 rows with different film_id values (1, 2, 3), customer_id = 5, and stars of your choice. Then SELECT * FROM film_review.",
        questionAr: "أنشئ جدول film_review (review_id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, customer_id INTEGER NOT NULL, stars INTEGER). أدرج 3 صفوف بقيم film_id مختلفة (1, 2, 3) وcustomer_id = 5 ونجوم من اختيارك. ثم اختر كل شيء من film_review.",
        hint: "INSERT INTO film_review (film_id, customer_id, stars) VALUES (1,5,4),(2,5,3),(3,5,5);",
        hintAr: "INSERT INTO film_review (film_id, customer_id, stars) VALUES (1,5,4),(2,5,3),(3,5,5);",
        expectedQuery: "CREATE TABLE film_review (review_id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, customer_id INTEGER NOT NULL, stars INTEGER); INSERT INTO film_review (film_id, customer_id, stars) VALUES (1,5,4),(2,5,3),(3,5,5); SELECT * FROM film_review;",
        checkFunction: (result: unknown[], q = '') =>
          result.length >= 3 && /INSERT\s+INTO/i.test(q) && /VALUES/i.test(q),
      },
      {
        id: 2,
        question: "Create table film_review (review_id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, customer_id INTEGER NOT NULL, stars INTEGER). Then use INSERT INTO ... SELECT to copy the top 5 film_ids (by film_id ASC) from inventory (DISTINCT), with customer_id = 10 and stars = 4. Then SELECT * FROM film_review.",
        questionAr: "أنشئ جدول film_review. ثم استخدم INSERT INTO ... SELECT لنسخ أعلى 5 film_ids (ترتيبًا تصاعديًا) من inventory (DISTINCT) مع customer_id = 10 ونجوم = 4. ثم اختر كل شيء من film_review.",
        hint: "INSERT INTO film_review (film_id, customer_id, stars) SELECT DISTINCT film_id, 10, 4 FROM inventory ORDER BY film_id LIMIT 5",
        hintAr: "INSERT INTO film_review (film_id, customer_id, stars) SELECT DISTINCT film_id, 10, 4 FROM inventory ORDER BY film_id LIMIT 5",
        expectedQuery: "CREATE TABLE film_review (review_id INTEGER PRIMARY KEY, film_id INTEGER NOT NULL, customer_id INTEGER NOT NULL, stars INTEGER); INSERT INTO film_review (film_id, customer_id, stars) SELECT DISTINCT film_id, 10, 4 FROM inventory ORDER BY film_id LIMIT 5; SELECT * FROM film_review;",
        checkFunction: (result: unknown[], q = '') =>
          result.length >= 3 && /INSERT.*SELECT/i.test(q),
      },
    ],
  },

  {
    id: 138,
    title: 'UPDATE',
    titleAr: 'UPDATE — تحديث البيانات',
    description: 'Modify existing rows using UPDATE with precise WHERE conditions.',
    descriptionAr: 'تعديل الصفوف الموجودة باستخدام UPDATE مع شروط WHERE دقيقة.',
    example: `-- Increase rental rate by 0.50 for all R-rated films
-- (first see what will change)
SELECT film_id, title, rental_rate
FROM film
WHERE rating = 'R'
LIMIT 5;

-- Then update
UPDATE film
SET rental_rate = rental_rate + 0.50
WHERE rating = 'R';`,
    content: `## UPDATE

\`UPDATE\` modifies existing rows. **Always use a \`WHERE\` clause** — without it, every row in the table gets changed.

## Basic UPDATE

\`\`\`sql
-- Give a 10% discount to all G-rated films
UPDATE film
SET rental_rate = ROUND(rental_rate * 0.90, 2)
WHERE rating = 'G';
\`\`\`

## Update Multiple Columns

\`\`\`sql
UPDATE film
SET rental_rate       = 1.99,
    replacement_cost  = 12.99
WHERE film_id = 1;
\`\`\`

## UPDATE with Subquery

\`\`\`sql
-- Set rental rate to the category average for each film
UPDATE film
SET rental_rate = (
  SELECT ROUND(AVG(f2.rental_rate), 2)
  FROM film f2
  JOIN film_category fc ON f2.film_id = fc.film_id
  WHERE fc.category_id = (
    SELECT category_id FROM film_category WHERE film_id = film.film_id
  )
)
WHERE film_id <= 10;
\`\`\`

> **PostgreSQL note:** PostgreSQL supports \`UPDATE ... FROM\` and \`UPDATE ... RETURNING\`:
> \`\`\`sql
> UPDATE film
> SET rental_rate = 1.99
> WHERE film_id = 1
> RETURNING film_id, rental_rate;
> \`\`\`

## Safety Pattern — Check Before Updating

\`\`\`sql
-- 1. Preview affected rows first
SELECT film_id, title, rental_rate FROM film WHERE rating = 'NC-17';
-- 2. Then update
UPDATE film SET rental_rate = 3.99 WHERE rating = 'NC-17';
\`\`\`
`,
    contentAr: `## UPDATE

تُعدّل \`UPDATE\` الصفوف الموجودة. **استخدم \`WHERE\` دائمًا** — بدونها سيتغير كل صف في الجدول.

## UPDATE الأساسية

\`\`\`sql
-- منح خصم 10% لجميع أفلام تصنيف G
UPDATE film
SET rental_rate = ROUND(rental_rate * 0.90, 2)
WHERE rating = 'G';
\`\`\`

## تحديث أعمدة متعددة

\`\`\`sql
UPDATE film
SET rental_rate       = 1.99,
    replacement_cost  = 12.99
WHERE film_id = 1;
\`\`\`

## UPDATE باستعلام فرعي

\`\`\`sql
-- ضبط سعر الإيجار على متوسط الفئة لكل فيلم
UPDATE film
SET rental_rate = (
  SELECT ROUND(AVG(f2.rental_rate), 2)
  FROM film f2
  JOIN film_category fc ON f2.film_id = fc.film_id
  WHERE fc.category_id = (
    SELECT category_id FROM film_category WHERE film_id = film.film_id
  )
)
WHERE film_id <= 10;
\`\`\`

> **ملاحظة PostgreSQL:** يدعم PostgreSQL \`UPDATE ... FROM\` و\`UPDATE ... RETURNING\`:
> \`\`\`sql
> UPDATE film
> SET rental_rate = 1.99
> WHERE film_id = 1
> RETURNING film_id, rental_rate;
> \`\`\`

## نمط الأمان — تحقق قبل التحديث

\`\`\`sql
-- 1. معاينة الصفوف المتأثرة أولًا
SELECT film_id, title, rental_rate FROM film WHERE rating = 'NC-17';
-- 2. ثم التحديث
UPDATE film SET rental_rate = 3.99 WHERE rating = 'NC-17';
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Update the rental_rate of all films with length > 180 minutes by adding 1.00 to their current rate. Then SELECT title, length, rental_rate FROM film WHERE length > 180 ORDER BY length DESC LIMIT 10 to verify.",
        questionAr: "حدّث rental_rate لجميع الأفلام ذات المدة > 180 دقيقة بإضافة 1.00 إلى سعرها الحالي. ثم اختر العنوان والمدة والسعر للتحقق.",
        hint: "UPDATE film SET rental_rate = rental_rate + 1.00 WHERE length > 180",
        hintAr: "UPDATE film SET rental_rate = rental_rate + 1.00 WHERE length > 180",
        expectedQuery: "UPDATE film SET rental_rate = rental_rate + 1.00 WHERE length > 180; SELECT title, length, rental_rate FROM film WHERE length > 180 ORDER BY length DESC LIMIT 10;",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /UPDATE\s+film/i.test(q) && /rental_rate.*\+.*1/i.test(q),
      },
      {
        id: 2,
        question: "Set rental_rate = 0.99 and replacement_cost = 9.99 for films with film_id IN (1, 2, 3). Then SELECT film_id, rental_rate, replacement_cost FROM film WHERE film_id IN (1,2,3) to verify.",
        questionAr: "اضبط rental_rate = 0.99 وreplacement_cost = 9.99 للأفلام ذات film_id IN (1, 2, 3). ثم تحقق.",
        hint: "UPDATE film SET rental_rate = 0.99, replacement_cost = 9.99 WHERE film_id IN (1, 2, 3)",
        hintAr: "UPDATE film SET rental_rate = 0.99, replacement_cost = 9.99 WHERE film_id IN (1, 2, 3)",
        expectedQuery: "UPDATE film SET rental_rate = 0.99, replacement_cost = 9.99 WHERE film_id IN (1, 2, 3); SELECT film_id, rental_rate, replacement_cost FROM film WHERE film_id IN (1,2,3);",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /UPDATE/i.test(q) && /replacement_cost/i.test(q),
      },
    ],
  },

  {
    id: 139,
    title: 'DELETE',
    titleAr: 'DELETE — حذف البيانات',
    description: 'Remove rows from tables safely using DELETE with WHERE conditions.',
    descriptionAr: 'إزالة الصفوف من الجداول بأمان باستخدام DELETE مع شروط WHERE.',
    example: `-- Create a staging table to practice DELETE safely
CREATE TABLE IF NOT EXISTS rental_archive AS
SELECT * FROM rental WHERE return_date IS NOT NULL LIMIT 50;

-- Preview rows to delete
SELECT COUNT(*) FROM rental_archive WHERE customer_id = 1;

-- Delete rentals for customer_id = 1
DELETE FROM rental_archive WHERE customer_id = 1;

-- Verify
SELECT COUNT(*) FROM rental_archive;`,
    content: `## DELETE

\`DELETE\` removes rows from a table. Like \`UPDATE\`, **always use \`WHERE\`** — without it, all rows are deleted.

## Basic DELETE

\`\`\`sql
DELETE FROM rental_archive WHERE customer_id = 1;
\`\`\`

## DELETE with Subquery

\`\`\`sql
-- Delete archived rentals for films that have been discontinued
DELETE FROM rental_archive
WHERE inventory_id IN (
  SELECT inventory_id FROM inventory WHERE store_id = 2
);
\`\`\`

## DELETE with LIMIT (SQLite)

\`\`\`sql
-- Delete only the 10 oldest archived records
DELETE FROM rental_archive
WHERE rental_id IN (
  SELECT rental_id FROM rental_archive ORDER BY rental_date LIMIT 10
);
\`\`\`

## TRUNCATE (PostgreSQL)

In PostgreSQL, \`TRUNCATE\` removes all rows much faster than \`DELETE\` without \`WHERE\`:

\`\`\`sql
-- PostgreSQL only — much faster for full table clear
TRUNCATE TABLE rental_archive;
-- SQLite equivalent:
DELETE FROM rental_archive;
\`\`\`

> **Best practice:** Always preview with \`SELECT\` before \`DELETE\`:
> \`\`\`sql
> -- 1. Preview
> SELECT * FROM rental_archive WHERE customer_id = 1;
> -- 2. Delete
> DELETE FROM rental_archive WHERE customer_id = 1;
> \`\`\`
`,
    contentAr: `## DELETE

تحذف \`DELETE\` صفوفًا من جدول. مثل \`UPDATE\`، **استخدم \`WHERE\` دائمًا** — بدونها ستُحذف جميع الصفوف.

## DELETE الأساسية

\`\`\`sql
DELETE FROM rental_archive WHERE customer_id = 1;
\`\`\`

## DELETE باستعلام فرعي

\`\`\`sql
-- حذف الإيجارات المؤرشفة للأفلام التي توقف توزيعها
DELETE FROM rental_archive
WHERE inventory_id IN (
  SELECT inventory_id FROM inventory WHERE store_id = 2
);
\`\`\`

## DELETE مع LIMIT (SQLite)

\`\`\`sql
-- حذف أقدم 10 سجلات مؤرشفة فقط
DELETE FROM rental_archive
WHERE rental_id IN (
  SELECT rental_id FROM rental_archive ORDER BY rental_date LIMIT 10
);
\`\`\`

## TRUNCATE (PostgreSQL)

في PostgreSQL، تُزيل \`TRUNCATE\` جميع الصفوف بشكل أسرع بكثير من \`DELETE\` بدون \`WHERE\`:

\`\`\`sql
-- PostgreSQL فقط — أسرع بكثير لمسح الجدول كاملًا
TRUNCATE TABLE rental_archive;
-- المكافئ في SQLite:
DELETE FROM rental_archive;
\`\`\`

> **أفضل ممارسة:** راجع دائمًا بـ\`SELECT\` قبل \`DELETE\`:
> \`\`\`sql
> -- 1. معاينة
> SELECT * FROM rental_archive WHERE customer_id = 1;
> -- 2. حذف
> DELETE FROM rental_archive WHERE customer_id = 1;
> \`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Create table rental_archive AS SELECT * FROM rental LIMIT 100. Then delete all rows where return_date IS NULL. Finally SELECT COUNT(*) AS remaining FROM rental_archive.",
        questionAr: "أنشئ جدول rental_archive كـ SELECT * FROM rental LIMIT 100. ثم احذف جميع الصفوف التي return_date IS NULL. أخيرًا احسب الصفوف المتبقية.",
        hint: "CREATE TABLE rental_archive AS SELECT ...; DELETE FROM rental_archive WHERE return_date IS NULL; SELECT COUNT(*) ...",
        hintAr: "CREATE TABLE rental_archive AS SELECT ...; DELETE FROM rental_archive WHERE return_date IS NULL; SELECT COUNT(*) ...",
        expectedQuery: "CREATE TABLE rental_archive AS SELECT * FROM rental LIMIT 100; DELETE FROM rental_archive WHERE return_date IS NULL; SELECT COUNT(*) AS remaining FROM rental_archive;",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /DELETE/i.test(q) && /return_date\s+IS\s+NULL/i.test(q),
      },
      {
        id: 2,
        question: "Create table film_archive AS SELECT * FROM film WHERE rating = 'NC-17'. Delete films from film_archive where rental_rate > 3.00. Then SELECT COUNT(*) AS kept FROM film_archive.",
        questionAr: "أنشئ جدول film_archive من أفلام NC-17. احذف الأفلام ذات سعر إيجار > 3.00. ثم احسب ما تبقى.",
        hint: "CREATE TABLE film_archive AS ...; DELETE FROM film_archive WHERE rental_rate > 3.00; SELECT COUNT(*) ...",
        hintAr: "CREATE TABLE film_archive AS ...; DELETE FROM film_archive WHERE rental_rate > 3.00; SELECT COUNT(*) ...",
        expectedQuery: "CREATE TABLE film_archive AS SELECT * FROM film WHERE rating = 'NC-17'; DELETE FROM film_archive WHERE rental_rate > 3.00; SELECT COUNT(*) AS kept FROM film_archive;",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /DELETE/i.test(q) && /rental_rate/i.test(q),
      },
    ],
  },

  // ── Level 13 — JOINs Deep Dive ──────────────────────────────────────────────
  {
    id: 140,
    title: 'LEFT JOIN & RIGHT JOIN',
    titleAr: 'LEFT JOIN و RIGHT JOIN',
    description: 'Include unmatched rows from one side of a join using outer joins.',
    descriptionAr: 'تضمين الصفوف غير المتطابقة من أحد جانبَي الربط باستخدام الربط الخارجي.',
    example: `-- All films, showing how many copies exist (0 if none)
SELECT
  f.film_id,
  f.title,
  COUNT(i.inventory_id) AS copies_in_stock
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
GROUP BY f.film_id, f.title
ORDER BY copies_in_stock ASC
LIMIT 15;`,
    content: `## LEFT JOIN & RIGHT JOIN

An **INNER JOIN** only returns rows that match in both tables. **Outer JOINs** include rows even when there's no match.

## LEFT JOIN — Keep All Rows from the Left Table

\`\`\`sql
-- All films, including those with no inventory
SELECT f.title, i.inventory_id
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
ORDER BY i.inventory_id NULLS LAST
LIMIT 15;
\`\`\`

Rows from \`film\` with no matching \`inventory\` row will have \`NULL\` in the \`inventory_id\` column.

## Finding Rows with NO Match

Use \`WHERE right_table.key IS NULL\` to find unmatched left-table rows:

\`\`\`sql
-- Films that have no inventory at all
SELECT f.title
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id IS NULL
ORDER BY f.title;
\`\`\`

## RIGHT JOIN

Returns all rows from the **right** table. In practice, \`LEFT JOIN\` is preferred — just swap the table order:

\`\`\`sql
-- These are equivalent:
-- RIGHT JOIN version:
SELECT f.title, i.store_id
FROM inventory i RIGHT JOIN film f ON i.film_id = f.film_id;

-- LEFT JOIN version (preferred):
SELECT f.title, i.store_id
FROM film f LEFT JOIN inventory i ON f.film_id = i.film_id;
\`\`\`

> **PostgreSQL note:** Both \`LEFT JOIN\` and \`RIGHT JOIN\` work identically in PostgreSQL.
`,
    contentAr: `## LEFT JOIN و RIGHT JOIN

**INNER JOIN** يُرجع فقط الصفوف المتطابقة في كلا الجدولين. **الربط الخارجي** يتضمن الصفوف حتى عند عدم وجود تطابق.

## LEFT JOIN — احتفظ بجميع صفوف الجدول الأيسر

\`\`\`sql
-- جميع الأفلام، بما فيها تلك التي لا توجد في المستودع
SELECT f.title, i.inventory_id
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
ORDER BY i.inventory_id NULLS LAST
LIMIT 15;
\`\`\`

صفوف \`film\` التي ليس لها صف مطابق في \`inventory\` ستكون قيمة \`inventory_id\` فيها \`NULL\`.

## إيجاد الصفوف التي لا تتطابق

استخدم \`WHERE right_table.key IS NULL\` للعثور على صفوف الجدول الأيسر غير المتطابقة:

\`\`\`sql
-- الأفلام التي لا توجد في المستودع إطلاقًا
SELECT f.title
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
WHERE i.inventory_id IS NULL
ORDER BY f.title;
\`\`\`

## RIGHT JOIN

يُرجع جميع صفوف الجدول **الأيمن**. عمليًا يُفضَّل \`LEFT JOIN\` — فقط اعكس ترتيب الجدولين:

\`\`\`sql
-- هذان الاستعلامان متكافئان:
-- نسخة RIGHT JOIN:
SELECT f.title, i.store_id
FROM inventory i RIGHT JOIN film f ON i.film_id = f.film_id;

-- نسخة LEFT JOIN (المفضّلة):
SELECT f.title, i.store_id
FROM film f LEFT JOIN inventory i ON f.film_id = i.film_id;
\`\`\`

> **ملاحظة PostgreSQL:** يعمل كلٌّ من \`LEFT JOIN\` و\`RIGHT JOIN\` بشكل مطابق في PostgreSQL.
`,
    exercises: [
      {
        id: 1,
        question: "Show all customers and their rental count (0 if they never rented). Use LEFT JOIN between customer and rental. Show first_name, last_name, COUNT(r.rental_id) AS rental_count. Group by customer, order by rental_count ASC, limit 15.",
        questionAr: "اعرض جميع العملاء وعدد إيجاراتهم (0 إذا لم يستأجروا قط). استخدم LEFT JOIN بين customer وrental. رتّب تصاعديًا، حدّد بـ 15.",
        hint: "FROM customer c LEFT JOIN rental r ON c.customer_id = r.customer_id, GROUP BY c.customer_id",
        hintAr: "FROM customer c LEFT JOIN rental r ON c.customer_id = r.customer_id، GROUP BY c.customer_id",
        expectedQuery: "SELECT c.first_name, c.last_name, COUNT(r.rental_id) AS rental_count FROM customer c LEFT JOIN rental r ON c.customer_id = r.customer_id GROUP BY c.customer_id ORDER BY rental_count ASC LIMIT 15",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LEFT\s+JOIN/i.test(q) && /rental/i.test(q),
      },
      {
        id: 2,
        question: "Find all films that have NO entries in the payment table (via inventory and rental chain). Show just the title. Use LEFT JOINs and WHERE payment.payment_id IS NULL.",
        questionAr: "ابحث عن الأفلام التي لا توجد لها إدخالات في جدول payment (عبر سلسلة inventory وrental). اعرض العنوان فقط. استخدم LEFT JOINs وWHERE payment.payment_id IS NULL.",
        hint: "film LEFT JOIN inventory LEFT JOIN rental LEFT JOIN payment, WHERE payment_id IS NULL",
        hintAr: "film LEFT JOIN inventory LEFT JOIN rental LEFT JOIN payment، WHERE payment_id IS NULL",
        expectedQuery: "SELECT DISTINCT f.title FROM film f LEFT JOIN inventory i ON f.film_id = i.film_id LEFT JOIN rental r ON i.inventory_id = r.inventory_id LEFT JOIN payment p ON r.rental_id = p.rental_id WHERE p.payment_id IS NULL ORDER BY f.title",
        checkFunction: (result: unknown[], q = '') =>
          result.length >= 0 && /LEFT\s+JOIN/i.test(q) && /payment.*IS\s+NULL/i.test(q),
      },
    ],
  },

  {
    id: 141,
    title: 'FULL OUTER JOIN & CROSS JOIN',
    titleAr: 'FULL OUTER JOIN و CROSS JOIN',
    description: 'Keep unmatched rows from both sides, or generate every combination of rows.',
    descriptionAr: 'الاحتفاظ بالصفوف غير المتطابقة من كلا الجانبين، أو توليد كل توليفة من الصفوف.',
    example: `-- FULL OUTER JOIN: all films AND all inventory records
-- (SQLite doesn't have FULL OUTER JOIN natively — simulate it)
SELECT f.title, i.inventory_id, i.store_id
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id

UNION

SELECT f.title, i.inventory_id, i.store_id
FROM film f
RIGHT JOIN inventory i ON f.film_id = i.film_id
WHERE f.film_id IS NULL
LIMIT 20;`,
    content: `## FULL OUTER JOIN & CROSS JOIN

## FULL OUTER JOIN

Returns all rows from **both** tables. Where there's no match, NULLs fill in the gaps.

> **SQLite note:** SQLite doesn't support \`FULL OUTER JOIN\` natively. Simulate it with \`LEFT JOIN UNION RIGHT JOIN\`.

\`\`\`sql
-- Simulated FULL OUTER JOIN in SQLite
SELECT f.title, i.inventory_id
FROM film f LEFT JOIN inventory i ON f.film_id = i.film_id
UNION
SELECT f.title, i.inventory_id
FROM inventory i LEFT JOIN film f ON i.film_id = f.film_id
WHERE f.film_id IS NULL;
\`\`\`

> **PostgreSQL (native FULL OUTER JOIN):**
> \`\`\`sql
> SELECT f.title, i.inventory_id
> FROM film f
> FULL OUTER JOIN inventory i ON f.film_id = i.film_id;
> \`\`\`

## CROSS JOIN — Every Combination

Returns the **Cartesian product** — every row from the left table paired with every row from the right:

\`\`\`sql
-- Pair every store with every film rating
SELECT s.store_id, f_ratings.rating
FROM store s
CROSS JOIN (SELECT DISTINCT rating FROM film) f_ratings
ORDER BY s.store_id, f_ratings.rating;
\`\`\`

\`CROSS JOIN\` is useful for generating combinations (e.g., all possible store-category pairs for reporting gaps).

## When to Use Each

| JOIN Type | Use When |
|-----------|---------|
| INNER JOIN | You only want matching rows |
| LEFT JOIN | Keep all left rows, optional right |
| FULL OUTER JOIN | Keep all rows from both sides |
| CROSS JOIN | Generate all possible combinations |
`,
    contentAr: `## FULL OUTER JOIN و CROSS JOIN

## FULL OUTER JOIN

يُرجع جميع الصفوف من **كلا الجدولين**. حيث لا يوجد تطابق، تملأ NULLs الفراغات.

> **ملاحظة SQLite:** لا يدعم SQLite \`FULL OUTER JOIN\` أصلًا. محاكاته بـ \`LEFT JOIN UNION RIGHT JOIN\`.

\`\`\`sql
-- محاكاة FULL OUTER JOIN في SQLite
SELECT f.title, i.inventory_id
FROM film f LEFT JOIN inventory i ON f.film_id = i.film_id
UNION
SELECT f.title, i.inventory_id
FROM inventory i LEFT JOIN film f ON i.film_id = f.film_id
WHERE f.film_id IS NULL;
\`\`\`

> **PostgreSQL (FULL OUTER JOIN الأصلي):**
> \`\`\`sql
> SELECT f.title, i.inventory_id
> FROM film f
> FULL OUTER JOIN inventory i ON f.film_id = i.film_id;
> \`\`\`

## CROSS JOIN — كل توليفة ممكنة

يُرجع **الضرب الديكارتي** — كل صف من الجدول الأيسر مقرونًا بكل صف من الأيمن:

\`\`\`sql
-- تزويج كل متجر مع كل تصنيف فيلم
SELECT s.store_id, f_ratings.rating
FROM store s
CROSS JOIN (SELECT DISTINCT rating FROM film) f_ratings
ORDER BY s.store_id, f_ratings.rating;
\`\`\`

\`CROSS JOIN\` مفيد لتوليد التوليفات (مثلًا: جميع أزواج المتجر-الفئة الممكنة لتقارير الفجوات).

## متى تستخدم كل نوع

| نوع JOIN | استخدمه حين |
|---------|------------|
| INNER JOIN | تريد فقط الصفوف المتطابقة |
| LEFT JOIN | احتفظ بجميع صفوف اليسار، اليمين اختياري |
| FULL OUTER JOIN | احتفظ بجميع الصفوف من كلا الجانبين |
| CROSS JOIN | توليد جميع التوليفات الممكنة |
`,
    exercises: [
      {
        id: 1,
        question: "Use CROSS JOIN to generate all combinations of store_id (from store) and film rating (SELECT DISTINCT rating FROM film). Show store_id and rating ordered by store_id, rating.",
        questionAr: "استخدم CROSS JOIN لتوليد جميع توليفات store_id (من store) وتصنيف الفيلم (SELECT DISTINCT rating FROM film). اعرض store_id والتصنيف مرتبًا.",
        hint: "FROM store CROSS JOIN (SELECT DISTINCT rating FROM film) AS r",
        hintAr: "FROM store CROSS JOIN (SELECT DISTINCT rating FROM film) AS r",
        expectedQuery: "SELECT s.store_id, r.rating FROM store s CROSS JOIN (SELECT DISTINCT rating FROM film) AS r ORDER BY s.store_id, r.rating",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CROSS\s+JOIN/i.test(q),
      },
      {
        id: 2,
        question: "Simulate a FULL OUTER JOIN between film and inventory using LEFT JOIN UNION. Show title and inventory_id. Limit to 20 rows.",
        questionAr: "حاكي FULL OUTER JOIN بين film وinventory باستخدام LEFT JOIN UNION. اعرض العنوان وinventory_id. حدّد بـ 20 صف.",
        hint: "SELECT ... FROM film LEFT JOIN inventory ... UNION SELECT ... FROM inventory LEFT JOIN film ... WHERE film.film_id IS NULL LIMIT 20",
        hintAr: "SELECT ... FROM film LEFT JOIN inventory ... UNION SELECT ... FROM inventory LEFT JOIN film ... WHERE film.film_id IS NULL LIMIT 20",
        expectedQuery: "SELECT f.title, i.inventory_id FROM film f LEFT JOIN inventory i ON f.film_id = i.film_id UNION SELECT f.title, i.inventory_id FROM inventory i LEFT JOIN film f ON i.film_id = f.film_id WHERE f.film_id IS NULL LIMIT 20",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /UNION/i.test(q) && /LEFT\s+JOIN/i.test(q),
      },
    ],
  },

  {
    id: 142,
    title: 'IN / NOT IN with Subqueries',
    titleAr: 'IN / NOT IN مع الاستعلامات الفرعية',
    description: 'Use subqueries inside IN and NOT IN to filter based on dynamic result sets.',
    descriptionAr: 'استخدام الاستعلامات الفرعية داخل IN وNOT IN للتصفية بناءً على مجموعات نتائج ديناميكية.',
    example: `-- Films that belong to top-earning categories
SELECT title, rating
FROM film
WHERE film_id IN (
  SELECT fc.film_id
  FROM film_category fc
  JOIN category c ON fc.category_id = c.category_id
  WHERE c.name IN ('Action', 'Drama', 'Comedy')
)
ORDER BY title
LIMIT 15;`,
    content: `## IN / NOT IN with Subqueries

When you use \`IN\` with a subquery, the subquery returns a list of values that the outer query filters against.

## IN with Subquery

\`\`\`sql
-- Films rented by customer #1
SELECT title
FROM film
WHERE film_id IN (
  SELECT DISTINCT i.film_id
  FROM rental r
  JOIN inventory i ON r.inventory_id = i.inventory_id
  WHERE r.customer_id = 1
)
ORDER BY title;
\`\`\`

## NOT IN with Subquery

\`\`\`sql
-- Films never rented by customer #1
SELECT title
FROM film
WHERE film_id NOT IN (
  SELECT DISTINCT i.film_id
  FROM rental r
  JOIN inventory i ON r.inventory_id = i.inventory_id
  WHERE r.customer_id = 1
)
ORDER BY title
LIMIT 15;
\`\`\`

> **Caution with NOT IN and NULLs:** If the subquery returns any NULL, \`NOT IN\` returns zero rows. Use \`NOT EXISTS\` as a safer alternative.

## IN vs EXISTS — When to Use Which

| Scenario | Use |
|----------|-----|
| Subquery returns a small, fixed list | \`IN\` |
| Subquery result is large or has NULLs | \`EXISTS\` |
| Checking non-existence safely | \`NOT EXISTS\` |

\`\`\`sql
-- Safe alternative using NOT EXISTS:
SELECT title FROM film f
WHERE NOT EXISTS (
  SELECT 1 FROM inventory i WHERE i.film_id = f.film_id
);
\`\`\`
`,
    contentAr: `## IN / NOT IN مع الاستعلامات الفرعية

حين تستخدم \`IN\` مع استعلام فرعي، يُرجع الاستعلام الفرعي قائمة من القيم يُصفّي الاستعلام الخارجي بناءً عليها.

## IN مع استعلام فرعي

\`\`\`sql
-- الأفلام التي استأجرها العميل رقم 1
SELECT title
FROM film
WHERE film_id IN (
  SELECT DISTINCT i.film_id
  FROM rental r
  JOIN inventory i ON r.inventory_id = i.inventory_id
  WHERE r.customer_id = 1
)
ORDER BY title;
\`\`\`

## NOT IN مع استعلام فرعي

\`\`\`sql
-- الأفلام التي لم يستأجرها العميل رقم 1 قط
SELECT title
FROM film
WHERE film_id NOT IN (
  SELECT DISTINCT i.film_id
  FROM rental r
  JOIN inventory i ON r.inventory_id = i.inventory_id
  WHERE r.customer_id = 1
)
ORDER BY title
LIMIT 15;
\`\`\`

> **تحذير NOT IN والقيم الفارغة:** إذا أرجع الاستعلام الفرعي أي NULL، يُرجع \`NOT IN\` صفرًا من الصفوف. استخدم \`NOT EXISTS\` بديلًا أأمن.

## IN مقابل EXISTS — متى تستخدم أيهما

| الحالة | استخدم |
|--------|--------|
| الاستعلام الفرعي يُرجع قائمة صغيرة ثابتة | \`IN\` |
| نتيجة الاستعلام الفرعي كبيرة أو تحتوي NULLs | \`EXISTS\` |
| التحقق من عدم الوجود بأمان | \`NOT EXISTS\` |
`,
    exercises: [
      {
        id: 1,
        question: "Find all films that are in the 'Horror' or 'Sci-Fi' categories using IN with a subquery on film_category and category tables. Show title and order alphabetically. Limit 15.",
        questionAr: "ابحث عن جميع الأفلام في فئتَي 'Horror' أو 'Sci-Fi' باستخدام IN مع استعلام فرعي على جدولَي film_category وcategory. اعرض العنوان مرتبًا أبجديًا. حدّد بـ 15.",
        hint: "WHERE film_id IN (SELECT fc.film_id FROM film_category fc JOIN category c ON ... WHERE c.name IN ('Horror','Sci-Fi'))",
        hintAr: "WHERE film_id IN (SELECT fc.film_id FROM film_category fc JOIN category c ON ... WHERE c.name IN ('Horror','Sci-Fi'))",
        expectedQuery: "SELECT title FROM film WHERE film_id IN (SELECT fc.film_id FROM film_category fc JOIN category c ON fc.category_id = c.category_id WHERE c.name IN ('Horror', 'Sci-Fi')) ORDER BY title LIMIT 15",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /IN\s*\(/i.test(q) && /film_category/i.test(q),
      },
      {
        id: 2,
        question: "Find customers who have NOT made any payments using NOT IN with a subquery. Show first_name, last_name.",
        questionAr: "ابحث عن العملاء الذين لم يسددوا أي دفعة باستخدام NOT IN مع استعلام فرعي. اعرض الاسم الأول والأخير.",
        hint: "WHERE customer_id NOT IN (SELECT DISTINCT customer_id FROM payment)",
        hintAr: "WHERE customer_id NOT IN (SELECT DISTINCT customer_id FROM payment)",
        expectedQuery: "SELECT first_name, last_name FROM customer WHERE customer_id NOT IN (SELECT DISTINCT customer_id FROM payment)",
        checkFunction: (_result: unknown[], q = '') =>
          /NOT\s+IN/i.test(q) && /payment/i.test(q),
      },
    ],
  },

  // ── Level 14 — Set Operations & Views ──────────────────────────────────────
  {
    id: 143,
    title: 'Derived Tables & Inline Views',
    titleAr: 'الجداول المشتقة والمناظير المضمّنة',
    description: 'Use subqueries in the FROM clause as temporary inline tables.',
    descriptionAr: 'استخدام الاستعلامات الفرعية في جملة FROM كجداول مؤقتة مضمّنة.',
    example: `-- Find customers whose spending is above the average
SELECT
  customer_name,
  total_spent
FROM (
  SELECT
    c.first_name || ' ' || c.last_name AS customer_name,
    SUM(p.amount)                       AS total_spent
  FROM customer c
  JOIN payment p ON c.customer_id = p.customer_id
  GROUP BY c.customer_id
) AS customer_totals
WHERE total_spent > (SELECT AVG(total_spent) FROM (
  SELECT SUM(amount) AS total_spent FROM payment GROUP BY customer_id
))
ORDER BY total_spent DESC
LIMIT 10;`,
    content: `## Derived Tables & Inline Views

A **derived table** (or inline view) is a subquery in the \`FROM\` clause. It acts like a temporary table for the duration of the query.

## Basic Derived Table

\`\`\`sql
SELECT *
FROM (
  SELECT film_id, COUNT(*) AS rental_count
  FROM inventory i
  JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY film_id
) AS film_rentals
WHERE rental_count > 20
ORDER BY rental_count DESC;
\`\`\`

## Joining a Derived Table

\`\`\`sql
SELECT f.title, dr.rental_count
FROM film f
JOIN (
  SELECT i.film_id, COUNT(*) AS rental_count
  FROM inventory i
  JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY i.film_id
) AS dr ON f.film_id = dr.film_id
ORDER BY dr.rental_count DESC
LIMIT 10;
\`\`\`

## Derived Table vs CTE

Both solve the same problem. CTEs are generally preferred for readability:

\`\`\`sql
-- CTE version (cleaner):
WITH film_rentals AS (
  SELECT i.film_id, COUNT(*) AS rental_count
  FROM inventory i JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY i.film_id
)
SELECT f.title, fr.rental_count
FROM film f JOIN film_rentals fr ON f.film_id = fr.film_id
ORDER BY fr.rental_count DESC LIMIT 10;
\`\`\`
`,
    contentAr: `## الجداول المشتقة والمناظير المضمّنة

**الجدول المشتق** (أو المنظور المضمّن) هو استعلام فرعي في جملة \`FROM\`. يعمل كجدول مؤقت طوال مدة الاستعلام.

## الجدول المشتق الأساسي

\`\`\`sql
SELECT *
FROM (
  SELECT film_id, COUNT(*) AS rental_count
  FROM inventory i
  JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY film_id
) AS film_rentals
WHERE rental_count > 20
ORDER BY rental_count DESC;
\`\`\`

## ربط جدول مشتق

\`\`\`sql
SELECT f.title, dr.rental_count
FROM film f
JOIN (
  SELECT i.film_id, COUNT(*) AS rental_count
  FROM inventory i
  JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY i.film_id
) AS dr ON f.film_id = dr.film_id
ORDER BY dr.rental_count DESC
LIMIT 10;
\`\`\`

## الجدول المشتق مقابل CTE

كلاهما يحلّ نفس المشكلة. عمومًا يُفضَّل CTE لسهولة القراءة:

\`\`\`sql
-- نسخة CTE (أوضح):
WITH film_rentals AS (
  SELECT i.film_id, COUNT(*) AS rental_count
  FROM inventory i JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY i.film_id
)
SELECT f.title, fr.rental_count
FROM film f JOIN film_rentals fr ON f.film_id = fr.film_id
ORDER BY fr.rental_count DESC LIMIT 10;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Use a derived table to find film categories with average rental rate above 3.00. The derived table should compute avg_rate per category. Show category name and avg_rate (rounded 2 decimals), ordered by avg_rate DESC.",
        questionAr: "استخدم جدولًا مشتقًا للعثور على فئات الأفلام بمتوسط سعر إيجار > 3.00. يجب أن يحسب الجدول المشتق avg_rate لكل فئة. اعرض اسم الفئة ومتوسط السعر مرتبًا تنازليًا.",
        hint: "SELECT ... FROM (SELECT c.name, AVG(f.rental_rate) AS avg_rate FROM category c JOIN film_category fc ... JOIN film f ... GROUP BY c.name) WHERE avg_rate > 3.00",
        hintAr: "SELECT ... FROM (SELECT c.name, AVG(f.rental_rate) AS avg_rate ...) WHERE avg_rate > 3.00",
        expectedQuery: "SELECT name, ROUND(avg_rate, 2) AS avg_rate FROM (SELECT c.name, AVG(f.rental_rate) AS avg_rate FROM category c JOIN film_category fc ON c.category_id = fc.category_id JOIN film f ON fc.film_id = f.film_id GROUP BY c.name) WHERE avg_rate > 3.00 ORDER BY avg_rate DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /FROM\s*\(/i.test(q) && /AVG/i.test(q),
      },
      {
        id: 2,
        question: "Use a derived table to find stores where total revenue exceeds 30000. Derived table: store revenue from payment → rental → inventory. Show store_id and total_revenue ordered DESC.",
        questionAr: "استخدم جدولًا مشتقًا للعثور على المتاجر التي تتجاوز إيراداتها الإجمالية 30000. الجدول المشتق: إيرادات المتجر من payment → rental → inventory. اعرض store_id وtotal_revenue مرتبًا تنازليًا.",
        hint: "SELECT ... FROM (SELECT i.store_id, SUM(p.amount) AS total_revenue FROM payment p JOIN rental r ... JOIN inventory i ... GROUP BY i.store_id) WHERE total_revenue > 30000",
        hintAr: "SELECT ... FROM (SELECT i.store_id, SUM(p.amount) AS total_revenue ...) WHERE total_revenue > 30000",
        expectedQuery: "SELECT store_id, ROUND(total_revenue, 2) AS total_revenue FROM (SELECT i.store_id, SUM(p.amount) AS total_revenue FROM payment p JOIN rental r ON p.rental_id = r.rental_id JOIN inventory i ON r.inventory_id = i.inventory_id GROUP BY i.store_id) WHERE total_revenue > 30000 ORDER BY total_revenue DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /FROM\s*\(/i.test(q) && /store_id/i.test(q) && /SUM/i.test(q),
      },
    ],
  },

  {
    id: 144,
    title: 'INTERSECT & EXCEPT',
    titleAr: 'INTERSECT و EXCEPT',
    description: 'Find common rows between result sets or rows that exist in one but not the other.',
    descriptionAr: 'إيجاد الصفوف المشتركة بين مجموعات النتائج أو الصفوف الموجودة في إحداها دون الأخرى.',
    example: `-- Customers who rented from BOTH stores
SELECT customer_id FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
WHERE i.store_id = 1

INTERSECT

SELECT customer_id FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
WHERE i.store_id = 2

ORDER BY customer_id;`,
    content: `## INTERSECT & EXCEPT

These set operators compare two result sets row by row.

| Operator | Returns |
|----------|---------|
| \`UNION\` | All rows from both (no duplicates) |
| \`INTERSECT\` | Only rows in **both** |
| \`EXCEPT\` | Rows in the first but **not** in the second |

## INTERSECT — Common Rows

\`\`\`sql
-- Film IDs that appear in BOTH store 1 and store 2 inventory
SELECT film_id FROM inventory WHERE store_id = 1
INTERSECT
SELECT film_id FROM inventory WHERE store_id = 2
ORDER BY film_id;
\`\`\`

## EXCEPT — Rows Only in the First Set

\`\`\`sql
-- Films stocked in store 1 but NOT in store 2
SELECT film_id FROM inventory WHERE store_id = 1
EXCEPT
SELECT film_id FROM inventory WHERE store_id = 2
ORDER BY film_id;
\`\`\`

## EXCEPT vs NOT IN

Both can answer the same question:

\`\`\`sql
-- Using EXCEPT:
SELECT film_id FROM inventory WHERE store_id = 1
EXCEPT
SELECT film_id FROM inventory WHERE store_id = 2;

-- Using NOT IN:
SELECT DISTINCT film_id FROM inventory
WHERE store_id = 1
  AND film_id NOT IN (SELECT film_id FROM inventory WHERE store_id = 2);
\`\`\`

> **PostgreSQL note:** PostgreSQL also supports \`EXCEPT ALL\` and \`INTERSECT ALL\` which keep duplicates.
`,
    contentAr: `## INTERSECT و EXCEPT

تُقارن هذه المُعاملات مجموعتَي نتائج صفًا بصف.

| المُعامل | يُرجع |
|---------|-------|
| \`UNION\` | جميع الصفوف من كليهما (بدون تكرار) |
| \`INTERSECT\` | الصفوف الموجودة في **كليهما** فقط |
| \`EXCEPT\` | الصفوف في الأولى لكن **ليست** في الثانية |

## INTERSECT — الصفوف المشتركة

\`\`\`sql
-- معرّفات الأفلام الموجودة في مستودع المتجر 1 والمتجر 2 معًا
SELECT film_id FROM inventory WHERE store_id = 1
INTERSECT
SELECT film_id FROM inventory WHERE store_id = 2
ORDER BY film_id;
\`\`\`

## EXCEPT — الصفوف في الأولى فقط

\`\`\`sql
-- الأفلام المتوفرة في المتجر 1 لكن ليست في المتجر 2
SELECT film_id FROM inventory WHERE store_id = 1
EXCEPT
SELECT film_id FROM inventory WHERE store_id = 2
ORDER BY film_id;
\`\`\`

## EXCEPT مقابل NOT IN

كلاهما يجيب على نفس السؤال:

\`\`\`sql
-- باستخدام EXCEPT:
SELECT film_id FROM inventory WHERE store_id = 1
EXCEPT
SELECT film_id FROM inventory WHERE store_id = 2;

-- باستخدام NOT IN:
SELECT DISTINCT film_id FROM inventory
WHERE store_id = 1
  AND film_id NOT IN (SELECT film_id FROM inventory WHERE store_id = 2);
\`\`\`

> **ملاحظة PostgreSQL:** يدعم PostgreSQL أيضًا \`EXCEPT ALL\` و\`INTERSECT ALL\` اللذان يحتفظان بالتكرارات.
`,
    exercises: [
      {
        id: 1,
        question: "Find film_ids that appear in inventory for store 1 AND store 2 using INTERSECT. Order by film_id.",
        questionAr: "ابحث عن film_ids الموجودة في مستودع المتجر 1 والمتجر 2 معًا باستخدام INTERSECT. رتّب حسب film_id.",
        hint: "SELECT film_id FROM inventory WHERE store_id = 1 INTERSECT SELECT film_id FROM inventory WHERE store_id = 2",
        hintAr: "SELECT film_id FROM inventory WHERE store_id = 1 INTERSECT SELECT film_id FROM inventory WHERE store_id = 2",
        expectedQuery: "SELECT film_id FROM inventory WHERE store_id = 1 INTERSECT SELECT film_id FROM inventory WHERE store_id = 2 ORDER BY film_id",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /INTERSECT/i.test(q),
      },
      {
        id: 2,
        question: "Find film_ids in store 1 inventory that do NOT exist in store 2 inventory using EXCEPT. Order by film_id. Limit 15.",
        questionAr: "ابحث عن film_ids في مستودع المتجر 1 التي لا توجد في مستودع المتجر 2 باستخدام EXCEPT. رتّب حسب film_id. حدّد بـ 15.",
        hint: "SELECT film_id FROM inventory WHERE store_id = 1 EXCEPT SELECT film_id FROM inventory WHERE store_id = 2",
        hintAr: "SELECT film_id FROM inventory WHERE store_id = 1 EXCEPT SELECT film_id FROM inventory WHERE store_id = 2",
        expectedQuery: "SELECT film_id FROM inventory WHERE store_id = 1 EXCEPT SELECT film_id FROM inventory WHERE store_id = 2 ORDER BY film_id LIMIT 15",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /EXCEPT/i.test(q),
      },
    ],
  },

  {
    id: 145,
    title: 'Views — Reusable Query Logic',
    titleAr: 'المناظير (Views) — منطق استعلام قابل لإعادة الاستخدام',
    description: 'Create views to save complex queries as reusable named objects.',
    descriptionAr: 'إنشاء مناظير لحفظ الاستعلامات المعقدة كعناصر مسماة قابلة لإعادة الاستخدام.',
    example: `-- Create a view for active customer revenue summary
CREATE VIEW customer_revenue AS
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name AS customer,
  COUNT(r.rental_id)                 AS total_rentals,
  ROUND(SUM(p.amount), 2)            AS total_spent
FROM customer c
JOIN rental  r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id   = p.rental_id
GROUP BY c.customer_id;

-- Use it like a regular table
SELECT * FROM customer_revenue
ORDER BY total_spent DESC
LIMIT 10;`,
    content: `## Views — Reusable Query Logic

A **view** is a saved SELECT query stored as a named object. You query it like a table.

## CREATE VIEW

\`\`\`sql
CREATE VIEW film_stats AS
SELECT
  f.film_id,
  f.title,
  f.rating,
  COUNT(r.rental_id)      AS rental_count,
  ROUND(SUM(p.amount), 2) AS revenue
FROM film f
JOIN inventory i ON f.film_id   = i.film_id
JOIN rental    r ON i.inventory_id = r.inventory_id
JOIN payment   p ON r.rental_id = p.rental_id
GROUP BY f.film_id;
\`\`\`

## Query a View

\`\`\`sql
-- Use it just like a table
SELECT * FROM film_stats WHERE rating = 'PG-13'
ORDER BY revenue DESC LIMIT 10;

-- Join a view with other tables
SELECT fs.title, fs.revenue, c.name AS category
FROM film_stats fs
JOIN film_category fc ON fs.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE fs.rental_count > 25;
\`\`\`

## DROP VIEW

\`\`\`sql
DROP VIEW IF EXISTS film_stats;
\`\`\`

## CREATE OR REPLACE VIEW (PostgreSQL)

\`\`\`sql
-- PostgreSQL only — update a view without dropping it first
CREATE OR REPLACE VIEW film_stats AS
SELECT film_id, title, rental_rate FROM film;
\`\`\`

## Why Use Views?

- **Simplify complexity** — hide multi-table JOINs behind a clean name
- **Security** — expose only certain columns to users
- **Consistency** — one definition used by many queries
`,
    contentAr: `## المناظير (Views) — منطق استعلام قابل لإعادة الاستخدام

**المنظور** استعلام SELECT محفوظ كعنصر مسمى. تستعلم منه كجدول عادي.

## CREATE VIEW

\`\`\`sql
CREATE VIEW film_stats AS
SELECT
  f.film_id,
  f.title,
  f.rating,
  COUNT(r.rental_id)      AS rental_count,
  ROUND(SUM(p.amount), 2) AS revenue
FROM film f
JOIN inventory i ON f.film_id   = i.film_id
JOIN rental    r ON i.inventory_id = r.inventory_id
JOIN payment   p ON r.rental_id = p.rental_id
GROUP BY f.film_id;
\`\`\`

## الاستعلام من منظور

\`\`\`sql
-- استخدمه كجدول عادي
SELECT * FROM film_stats WHERE rating = 'PG-13'
ORDER BY revenue DESC LIMIT 10;

-- ربط منظور بجداول أخرى
SELECT fs.title, fs.revenue, c.name AS category
FROM film_stats fs
JOIN film_category fc ON fs.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE fs.rental_count > 25;
\`\`\`

## DROP VIEW

\`\`\`sql
DROP VIEW IF EXISTS film_stats;
\`\`\`

## CREATE OR REPLACE VIEW (PostgreSQL)

\`\`\`sql
-- PostgreSQL فقط — تحديث منظور بدون حذفه أولًا
CREATE OR REPLACE VIEW film_stats AS
SELECT film_id, title, rental_rate FROM film;
\`\`\`

## لماذا نستخدم المناظير؟

- **تبسيط التعقيد** — إخفاء JOINs متعددة خلف اسم واضح
- **الأمان** — كشف أعمدة معينة فقط للمستخدمين
- **الاتساق** — تعريف واحد تستخدمه استعلامات كثيرة
`,
    exercises: [
      {
        id: 1,
        question: "Create a view called 'active_customers' that shows customer_id, first_name, last_name, and email for customers where active = 1. Then SELECT * FROM active_customers ORDER BY last_name LIMIT 10.",
        questionAr: "أنشئ منظورًا اسمه 'active_customers' يعرض customer_id وfirst_name وlast_name وemail للعملاء حيث active = 1. ثم اختر منه مرتبًا حسب last_name، حدّد بـ 10.",
        hint: "CREATE VIEW active_customers AS SELECT ... FROM customer WHERE active = 1; SELECT * FROM active_customers ...",
        hintAr: "CREATE VIEW active_customers AS SELECT ... FROM customer WHERE active = 1; SELECT * FROM active_customers ...",
        expectedQuery: "CREATE VIEW active_customers AS SELECT customer_id, first_name, last_name, email FROM customer WHERE active = 1; SELECT * FROM active_customers ORDER BY last_name LIMIT 10;",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CREATE\s+VIEW/i.test(q) && /active_customers/i.test(q),
      },
      {
        id: 2,
        question: "Create a view 'store_summary' with store_id, total_films (count of distinct film_ids in inventory), and total_staff (count of staff). JOIN inventory and staff tables grouped by store_id. Then SELECT * FROM store_summary.",
        questionAr: "أنشئ منظور 'store_summary' بـ store_id وtotal_films (عدد film_ids الفريدة في inventory) وtotal_staff (عدد الموظفين). اربط جدولَي inventory وstaff مجمّعَين حسب store_id. ثم اختر منه.",
        hint: "JOIN inventory and staff on store_id, use COUNT(DISTINCT) and COUNT()",
        hintAr: "اربط inventory وstaff على store_id، استخدم COUNT(DISTINCT) وCOUNT()",
        expectedQuery: "CREATE VIEW store_summary AS SELECT i.store_id, COUNT(DISTINCT i.film_id) AS total_films, COUNT(DISTINCT s.staff_id) AS total_staff FROM inventory i LEFT JOIN staff s ON i.store_id = s.store_id GROUP BY i.store_id; SELECT * FROM store_summary;",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CREATE\s+VIEW/i.test(q) && /store_summary/i.test(q),
      },
    ],
  },
];
