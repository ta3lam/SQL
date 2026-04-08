import { Lesson } from '../types';
import { dvdLessonsP2 } from './lessons_dvd2';

const dvdLessonsBase: Lesson[] = [
  {
    id: 101,
    title: 'Meet the DVD Rental Database',
    titleAr: 'استكشاف قاعدة البيانات',
    description: 'Explore the 15-table DVD Rental schema and understand how the tables relate to each other.',
    descriptionAr: 'استكشف مخطط قاعدة بيانات تأجير الأفلام المكوّن من 15 جدولاً وتعرّف على كيفية ترابط الجداول.',
    content: `## Welcome to the DVD Rental Database

The DVD Rental database is a sample dataset that models a real-world video rental store. It contains **15 tables** with rich relationships, making it an ideal playground for practising SQL joins, aggregations, and analytics.

## The Core Tables

The schema is organized around a few key concepts:

| Group | Tables | Purpose |
|---|---|---|
| Catalog | \`film\`, \`actor\`, \`film_actor\`, \`category\`, \`film_category\`, \`language\` | What films are available |
| Location | \`country\`, \`city\`, \`address\`, \`store\`, \`staff\` | Where the store operates |
| Business | \`customer\`, \`inventory\`, \`rental\`, \`payment\` | Transactions |

## How the Tables Connect

At the heart of the schema is the **film** table (1,000 films). Each film belongs to one or more categories (via \`film_category\`) and features multiple actors (via \`film_actor\`). These are classic **bridge tables** — they resolve many-to-many relationships.

When a customer rents a film, the system records:
1. Which physical copy (\`inventory\`) was rented
2. The \`rental\` transaction (date, customer, staff)
3. The \`payment\` made for that rental

## Row Counts at a Glance

The database holds a substantial amount of data:
- **1,000 films** with ratings (G, PG, PG-13, R, NC-17)
- **200 actors** linked to films via 5,462 relationships
- **599 customers** who have generated **16,044 rentals** and **14,596 payments**

Understanding these counts helps you write efficient queries and verify your results make sense.

## Getting Started

The best way to learn a new database is to explore it. Run \`SELECT COUNT(*)\` on different tables, look at sample rows with \`LIMIT\`, and check what distinct values exist in key columns like \`rating\` or \`special_features\`.
`,
    contentAr: `## مرحباً بك في قاعدة بيانات تأجير الأفلام

قاعدة بيانات تأجير الأفلام هي مجموعة بيانات نموذجية تحاكي متجر تأجير أفلام في العالم الحقيقي. تحتوي على **15 جدولاً** بعلاقات غنية، مما يجعلها ملعباً مثالياً للتدرب على الـ JOINs والتجميعات والتحليلات في SQL.

## الجداول الأساسية

يتنظّم المخطط حول بضعة مفاهيم رئيسية:

| المجموعة | الجداول | الغرض |
|---|---|---|
| الكتالوج | \`film\`, \`actor\`, \`film_actor\`, \`category\`, \`film_category\`, \`language\` | الأفلام المتاحة |
| الموقع | \`country\`, \`city\`, \`address\`, \`store\`, \`staff\` | مواقع المتاجر |
| الأعمال | \`customer\`, \`inventory\`, \`rental\`, \`payment\` | المعاملات |

## كيف ترتبط الجداول

في قلب المخطط يوجد جدول **film** (1,000 فيلم). ينتمي كل فيلم إلى فئة واحدة أو أكثر (عبر \`film_category\`) ويضم ممثلين متعددين (عبر \`film_actor\`). هذه **جداول وسيطة** كلاسيكية تحلّ علاقات المحور الكثير-إلى-كثير.

عندما يستأجر عميل فيلماً، يسجّل النظام:
1. النسخة المادية (\`inventory\`) التي استُأجرت
2. معاملة الإيجار \`rental\` (التاريخ والعميل والموظف)
3. المبلغ المدفوع \`payment\` مقابل هذا الإيجار

## أعداد الصفوف بلمحة سريعة

تحتوي قاعدة البيانات على كمية كبيرة من البيانات:
- **1,000 فيلم** بتصنيفات متنوعة (G وPG وPG-13 وR وNC-17)
- **200 ممثل** مرتبطون بالأفلام عبر 5,462 علاقة
- **599 عميل** أجروا **16,044 عملية إيجار** ودفعوا **14,596 دفعة**

فهم هذه الأعداد يساعدك في كتابة استعلامات فعّالة والتحقق من أن نتائجك منطقية.

## البدء

أفضل طريقة لتعلّم قاعدة بيانات جديدة هي استكشافها. شغّل \`SELECT COUNT(*)\` على جداول مختلفة، وانظر إلى صفوف نموذجية باستخدام \`LIMIT\`، وتحقق من القيم المميزة في أعمدة رئيسية مثل \`rating\` أو \`special_features\`.
`,
    example: `SELECT title, rating, rental_rate, length
FROM film
ORDER BY title
LIMIT 10;`,
    exercises: [
      {
        id: 1,
        question: 'Count the total number of films in the database.',
        questionAr: 'احسب العدد الإجمالي للأفلام في قاعدة البيانات.',
        hint: 'Use SELECT COUNT(*) FROM film',
        hintAr: 'استخدم SELECT COUNT(*) FROM film',
        expectedQuery: 'SELECT COUNT(*) FROM film',
        checkFunction: (result: unknown[]) => {
          return result.length === 1 && Number((result[0] as unknown[])[0]) === 1000;
        },
      },
      {
        id: 2,
        question: 'List all distinct film ratings in the database, ordered alphabetically.',
        questionAr: 'اعرض جميع تصنيفات الأفلام المميزة في قاعدة البيانات مرتبةً أبجدياً.',
        hint: 'Use SELECT DISTINCT rating FROM film ORDER BY rating',
        hintAr: 'استخدم SELECT DISTINCT rating FROM film ORDER BY rating',
        expectedQuery: 'SELECT DISTINCT rating FROM film ORDER BY rating',
        checkFunction: (result: unknown[]) => {
          return result.length === 5;
        },
      },
      {
        id: 3,
        question: 'Count the total number of customers in the database.',
        questionAr: 'احسب العدد الإجمالي للعملاء في قاعدة البيانات.',
        hint: 'Use SELECT COUNT(*) FROM customer',
        hintAr: 'استخدم SELECT COUNT(*) FROM customer',
        expectedQuery: 'SELECT COUNT(*) FROM customer',
        checkFunction: (result: unknown[]) => {
          return result.length === 1 && Number((result[0] as unknown[])[0]) === 599;
        },
      },
    ],
  },

  {
    id: 102,
    title: 'Filtering Films',
    titleAr: 'تصفية الأفلام',
    description: 'Master WHERE, LIKE, BETWEEN, and IN to filter the film table with precision.',
    descriptionAr: 'أتقن WHERE وLIKE وBETWEEN وIN لتصفية جدول الأفلام بدقة.',
    content: `## Filtering Rows with WHERE

The \`WHERE\` clause is the gatekeeper of your queries. It filters rows before any aggregation happens, so every operator you learn here applies across the entire SQL language.

## Exact Matches and Comparisons

For exact matches use \`=\`. For ranges use comparison operators: \`<\`, \`>\`, \`<=\`, \`>=\`, \`<>\` (not equal).

\`\`\`sql
-- Films rated exactly 'R'
SELECT title, rating FROM film WHERE rating = 'R';

-- Films longer than 2 hours
SELECT title, length FROM film WHERE length > 120;
\`\`\`

## BETWEEN: Inclusive Range Queries

\`BETWEEN low AND high\` is inclusive on both ends. It is equivalent to \`>= low AND <= high\` but much more readable.

\`\`\`sql
-- Films whose rental rate falls between $2.99 and $4.99
SELECT title, rental_rate
FROM film
WHERE rental_rate BETWEEN 2.99 AND 4.99;
\`\`\`

## IN: Matching Against a List

Instead of chaining multiple \`OR\` conditions, use \`IN\` to match any value in a list.

\`\`\`sql
-- Films with PG or G rating
SELECT title, rating
FROM film
WHERE rating IN ('PG', 'G')
ORDER BY title;
\`\`\`

## LIKE: Pattern Matching

\`LIKE\` uses two wildcards:
- \`%\` matches **zero or more** characters
- \`_\` matches exactly **one** character

\`\`\`sql
-- Films whose title starts with 'ACADEMY'
SELECT title FROM film WHERE title LIKE 'ACADEMY%';

-- Films whose title contains 'LOVE' anywhere
SELECT title FROM film WHERE title LIKE '%LOVE%';
\`\`\`

> **Tip:** In SQLite, \`LIKE\` is case-insensitive for ASCII characters. Use \`GLOB\` if you need case-sensitive pattern matching.

## Combining Conditions

Use \`AND\` and \`OR\` to combine multiple conditions. Use parentheses to make precedence explicit.

\`\`\`sql
SELECT title, rating, rental_rate
FROM film
WHERE rating = 'PG-13'
  AND rental_rate > 2.99
ORDER BY rental_rate DESC;
\`\`\`
`,
    contentAr: `## تصفية الصفوف باستخدام WHERE

جملة \`WHERE\` هي حارس استعلاماتك. تقوم بتصفية الصفوف قبل أي تجميع، لذا فإن كل عامل تتعلمه هنا ينطبق على لغة SQL بأكملها.

## المطابقة الدقيقة والمقارنات

للمطابقة الدقيقة استخدم \`=\`. للنطاقات استخدم عوامل المقارنة: \`<\` و\`>\` و\`<=\` و\`>=\` و\`<>\` (لا يساوي).

\`\`\`sql
-- الأفلام ذات التصنيف 'R' بالضبط
SELECT title, rating FROM film WHERE rating = 'R';

-- الأفلام الأطول من ساعتين
SELECT title, length FROM film WHERE length > 120;
\`\`\`

## BETWEEN: استعلامات النطاق الشامل

\`BETWEEN low AND high\` شامل من كلا الطرفين. يعادل \`>= low AND <= high\` لكنه أكثر قابلية للقراءة.

\`\`\`sql
-- الأفلام التي تتراوح تكلفة إيجارها بين 2.99 و4.99 دولار
SELECT title, rental_rate
FROM film
WHERE rental_rate BETWEEN 2.99 AND 4.99;
\`\`\`

## IN: المطابقة مع قائمة

بدلاً من ربط شروط \`OR\` متعددة، استخدم \`IN\` لمطابقة أي قيمة في قائمة.

\`\`\`sql
-- الأفلام ذات التصنيف PG أو G
SELECT title, rating
FROM film
WHERE rating IN ('PG', 'G')
ORDER BY title;
\`\`\`

## LIKE: مطابقة الأنماط

يستخدم \`LIKE\` حرفَي بدل:
- \`%\` يطابق **صفراً أو أكثر** من الأحرف
- \`_\` يطابق **حرفاً واحداً** بالضبط

\`\`\`sql
-- الأفلام التي يبدأ عنوانها بـ 'ACADEMY'
SELECT title FROM film WHERE title LIKE 'ACADEMY%';

-- الأفلام التي يحتوي عنوانها على 'LOVE' في أي مكان
SELECT title FROM film WHERE title LIKE '%LOVE%';
\`\`\`

> **تلميح:** في SQLite، يُفرّق \`LIKE\` بين حروف ASCII الكبيرة والصغيرة. استخدم \`GLOB\` إن احتجت مطابقة حساسة لحالة الأحرف.

## دمج الشروط

استخدم \`AND\` و\`OR\` لدمج شروط متعددة. استخدم الأقواس لتوضيح الأولوية.

\`\`\`sql
SELECT title, rating, rental_rate
FROM film
WHERE rating = 'PG-13'
  AND rental_rate > 2.99
ORDER BY rental_rate DESC;
\`\`\`
`,
    example: `SELECT title, rating, rental_rate
FROM film
WHERE rating = 'PG'
ORDER BY title
LIMIT 10;`,
    exercises: [
      {
        id: 1,
        question: "Find all R-rated films. Return the title and rating columns.",
        questionAr: "أوجد جميع الأفلام ذات التصنيف R. أرجع عمودَي title وrating.",
        hint: "Use WHERE rating = 'R'",
        hintAr: "استخدم WHERE rating = 'R'",
        expectedQuery: "SELECT title, rating FROM film WHERE rating = 'R'",
        checkFunction: (result: unknown[]) => {
          return result.length > 0;
        },
      },
      {
        id: 2,
        question: 'Find films with a rental_rate between 2.99 and 4.99 (inclusive). Return title and rental_rate.',
        questionAr: 'أوجد الأفلام التي تتراوح تكلفة إيجارها بين 2.99 و4.99 (شاملة). أرجع title وrental_rate.',
        hint: 'Use WHERE rental_rate BETWEEN 2.99 AND 4.99',
        hintAr: 'استخدم WHERE rental_rate BETWEEN 2.99 AND 4.99',
        expectedQuery: 'SELECT title, rental_rate FROM film WHERE rental_rate BETWEEN 2.99 AND 4.99',
        checkFunction: (result: unknown[]) => {
          return result.length > 0;
        },
      },
      {
        id: 3,
        question: "Find all films whose title contains the word 'LOVE'. Return the title.",
        questionAr: "أوجد جميع الأفلام التي يحتوي عنوانها على كلمة 'LOVE'. أرجع العنوان.",
        hint: "Use WHERE title LIKE '%LOVE%'",
        hintAr: "استخدم WHERE title LIKE '%LOVE%'",
        expectedQuery: "SELECT title FROM film WHERE title LIKE '%LOVE%'",
        checkFunction: (result: unknown[]) => {
          return result.length > 0;
        },
      },
    ],
  },

  {
    id: 103,
    title: 'Sorting & Limiting',
    titleAr: 'الترتيب والتحديد',
    description: 'Use ORDER BY, LIMIT, and OFFSET to sort and paginate query results.',
    descriptionAr: 'استخدم ORDER BY وLIMIT وOFFSET لترتيب نتائج الاستعلام وتصفحها.',
    content: `## Sorting with ORDER BY

\`ORDER BY\` determines the sequence in which rows appear. You can sort by one or more columns, and independently choose ascending (\`ASC\`, the default) or descending (\`DESC\`) for each.

\`\`\`sql
-- Cheapest films first
SELECT title, rental_rate FROM film ORDER BY rental_rate ASC;

-- Most expensive first
SELECT title, rental_rate FROM film ORDER BY rental_rate DESC;
\`\`\`

## Multi-Column Sorting

List multiple columns separated by commas. Rows are sorted by the first column, then by the second for ties, and so on.

\`\`\`sql
-- Sort by rating, then by title within each rating group
SELECT title, rating, rental_rate
FROM film
ORDER BY rating ASC, title ASC;
\`\`\`

## Limiting Results with LIMIT

\`LIMIT n\` returns at most *n* rows. Combine it with \`ORDER BY\` to get meaningful "top N" results.

\`\`\`sql
-- Top 10 most expensive replacement costs
SELECT title, replacement_cost
FROM film
ORDER BY replacement_cost DESC
LIMIT 10;
\`\`\`

## Pagination with OFFSET

\`OFFSET n\` skips the first *n* rows. Together with \`LIMIT\`, this enables page-by-page navigation.

\`\`\`sql
-- Page 2 of results (rows 11-20)
SELECT title, rental_rate
FROM film
ORDER BY title
LIMIT 10 OFFSET 10;
\`\`\`

## Practical Ranking Pattern

A common pattern is to find the "top N" items in a category. Always include \`ORDER BY\` when using \`LIMIT\` — without it, the database may return any arbitrary rows.

| Clause | Purpose |
|---|---|
| \`ORDER BY col DESC\` | Rank highest first |
| \`LIMIT 5\` | Keep only top 5 |
| \`OFFSET 0\` | Start from the beginning |
`,
    contentAr: `## الترتيب باستخدام ORDER BY

تحدّد \`ORDER BY\` التسلسل الذي تظهر فيه الصفوف. يمكنك الترتيب بعمود أو أكثر، واختيار الترتيب التصاعدي (\`ASC\`، الافتراضي) أو التنازلي (\`DESC\`) لكل منها بشكل مستقل.

\`\`\`sql
-- الأفلام الأرخص أولاً
SELECT title, rental_rate FROM film ORDER BY rental_rate ASC;

-- الأكثر تكلفة أولاً
SELECT title, rental_rate FROM film ORDER BY rental_rate DESC;
\`\`\`

## الترتيب بأعمدة متعددة

اذكر أعمدة متعددة مفصولة بفواصل. تُرتَّب الصفوف حسب العمود الأول، ثم حسب الثاني عند التعادل، وهكذا.

\`\`\`sql
-- الترتيب حسب التصنيف، ثم حسب العنوان داخل كل مجموعة تصنيف
SELECT title, rating, rental_rate
FROM film
ORDER BY rating ASC, title ASC;
\`\`\`

## تحديد النتائج باستخدام LIMIT

تُرجع \`LIMIT n\` ما لا يتجاوز *n* صفاً. ادمجها مع \`ORDER BY\` للحصول على نتائج "أفضل N" ذات معنى.

\`\`\`sql
-- أعلى 10 أفلام من حيث تكلفة الاستبدال
SELECT title, replacement_cost
FROM film
ORDER BY replacement_cost DESC
LIMIT 10;
\`\`\`

## التصفح باستخدام OFFSET

تتخطى \`OFFSET n\` أول *n* صفاً. مع \`LIMIT\`، تتيح التنقل صفحة بصفحة.

\`\`\`sql
-- الصفحة الثانية من النتائج (الصفوف 11-20)
SELECT title, rental_rate
FROM film
ORDER BY title
LIMIT 10 OFFSET 10;
\`\`\`

## نمط الترتيب العملي

النمط الشائع هو إيجاد "أفضل N" عناصر في فئة. احرص دائماً على تضمين \`ORDER BY\` عند استخدام \`LIMIT\` — بدونها قد ترجع قاعدة البيانات صفوفاً عشوائية.

| الجملة | الغرض |
|---|---|
| \`ORDER BY col DESC\` | ترتيب الأعلى أولاً |
| \`LIMIT 5\` | الاحتفاظ بأعلى 5 فقط |
| \`OFFSET 0\` | البدء من الأول |
`,
    example: `SELECT title, replacement_cost
FROM film
ORDER BY replacement_cost DESC
LIMIT 5;`,
    exercises: [
      {
        id: 1,
        question: 'Get the 5 longest films. Return title and length, sorted by length descending.',
        questionAr: 'احصل على الأفلام الـ 5 الأطول. أرجع title وlength، مرتبةً حسب الطول تنازلياً.',
        hint: 'Use ORDER BY length DESC LIMIT 5',
        hintAr: 'استخدم ORDER BY length DESC LIMIT 5',
        expectedQuery: 'SELECT title, length FROM film ORDER BY length DESC LIMIT 5',
        checkFunction: (result: unknown[]) => {
          return result.length === 5;
        },
      },
      {
        id: 2,
        question: 'Get the first 10 films with rental_rate = 4.99, sorted alphabetically by title.',
        questionAr: 'احصل على أول 10 أفلام بسعر إيجار 4.99، مرتبةً أبجدياً حسب العنوان.',
        hint: "Use WHERE rental_rate = 4.99 ORDER BY title LIMIT 10",
        hintAr: "استخدم WHERE rental_rate = 4.99 ORDER BY title LIMIT 10",
        expectedQuery: "SELECT title, rental_rate FROM film WHERE rental_rate = 4.99 ORDER BY title LIMIT 10",
        checkFunction: (result: unknown[]) => {
          return result.length === 10;
        },
      },
    ],
  },

  {
    id: 104,
    title: 'Actors & Films',
    titleAr: 'الممثلون والأفلام',
    description: 'Join the actor, film_actor, and film tables to explore the many-to-many relationship between actors and films.',
    descriptionAr: 'ربط جداول actor وfilm_actor وfilm لاستكشاف العلاقة الكثير-إلى-كثير بين الممثلين والأفلام.',
    content: `## Many-to-Many Relationships

In the DVD Rental database, one actor can appear in many films, and one film can feature many actors. This is a **many-to-many** relationship. Databases handle this with a **bridge table** (also called a junction table).

The three tables involved are:
- \`actor\` — actor details (actor_id, first_name, last_name)
- \`film\` — film details (film_id, title, …)
- \`film_actor\` — the bridge: one row per actor–film pair

## Two JOINs in One Query

To connect an actor name to a film title, you must traverse **two joins**:

\`\`\`sql
SELECT a.first_name, a.last_name, f.title
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film f        ON fa.film_id  = f.film_id
ORDER BY a.last_name
LIMIT 20;
\`\`\`

Read it left to right: start with actors, join to the bridge on actor ID, then join to films on film ID.

## Filtering by Film Title

Add a \`WHERE\` clause after the joins to filter by a specific film:

\`\`\`sql
SELECT a.first_name, a.last_name
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film f        ON fa.film_id  = f.film_id
WHERE f.title = 'ACADEMY DINOSAUR'
ORDER BY a.last_name;
\`\`\`

## Counting Films per Actor

Combine the join with \`GROUP BY\` to count how many films each actor appeared in:

\`\`\`sql
SELECT a.first_name, a.last_name, COUNT(fa.film_id) AS film_count
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
GROUP BY a.actor_id, a.first_name, a.last_name
ORDER BY film_count DESC
LIMIT 10;
\`\`\`

> **Key insight:** Bridge tables are how SQL handles many-to-many. Once you understand \`film_actor\`, the same pattern applies to \`film_category\`, order items, user roles, and countless other real-world scenarios.
`,
    contentAr: `## علاقات الكثير-إلى-كثير

في قاعدة بيانات تأجير الأفلام، يمكن للممثل الواحد أن يظهر في أفلام عديدة، ويمكن للفيلم الواحد أن يضم ممثلين كثيرين. هذه علاقة **كثير-إلى-كثير**. تتعامل قواعد البيانات مع هذا باستخدام **جدول وسيط** (يُسمى أيضاً جدول تقاطع).

الجداول الثلاثة المعنية:
- \`actor\` — تفاصيل الممثل (actor_id، first_name، last_name)
- \`film\` — تفاصيل الفيلم (film_id، title، …)
- \`film_actor\` — الجسر: صف واحد لكل زوج ممثل-فيلم

## عمليتا JOIN في استعلام واحد

لربط اسم الممثل بعنوان الفيلم، يجب اجتياز **عمليتَي JOIN**:

\`\`\`sql
SELECT a.first_name, a.last_name, f.title
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film f        ON fa.film_id  = f.film_id
ORDER BY a.last_name
LIMIT 20;
\`\`\`

اقرأه من اليسار لليمين: ابدأ بالممثلين، انضم إلى الجسر على معرّف الممثل، ثم انضم إلى الأفلام على معرّف الفيلم.

## التصفية حسب عنوان الفيلم

أضف جملة \`WHERE\` بعد عمليات JOIN للتصفية بفيلم محدد:

\`\`\`sql
SELECT a.first_name, a.last_name
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film f        ON fa.film_id  = f.film_id
WHERE f.title = 'ACADEMY DINOSAUR'
ORDER BY a.last_name;
\`\`\`

## عدّ الأفلام لكل ممثل

ادمج الـ JOIN مع \`GROUP BY\` لحساب عدد الأفلام التي ظهر فيها كل ممثل:

\`\`\`sql
SELECT a.first_name, a.last_name, COUNT(fa.film_id) AS film_count
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
GROUP BY a.actor_id, a.first_name, a.last_name
ORDER BY film_count DESC
LIMIT 10;
\`\`\`

> **الرؤية الأساسية:** الجداول الوسيطة هي الطريقة التي يتعامل بها SQL مع الكثير-إلى-كثير. بمجرد فهم \`film_actor\`، ينطبق نفس النمط على \`film_category\` وبنود الطلبات وأدوار المستخدمين وسيناريوهات لا تُحصى من العالم الحقيقي.
`,
    example: `SELECT a.first_name, a.last_name, f.title
FROM actor a
JOIN film_actor fa ON a.actor_id = fa.actor_id
JOIN film f ON fa.film_id = f.film_id
LIMIT 10;`,
    exercises: [
      {
        id: 1,
        question: "List all actors who appeared in the film titled 'ACADEMY DINOSAUR'. Return first_name and last_name.",
        questionAr: "اعرض جميع الممثلين الذين ظهروا في فيلم 'ACADEMY DINOSAUR'. أرجع first_name وlast_name.",
        hint: "JOIN actor → film_actor → film, then WHERE f.title = 'ACADEMY DINOSAUR'",
        hintAr: "ربط actor → film_actor → film، ثم WHERE f.title = 'ACADEMY DINOSAUR'",
        expectedQuery: "SELECT a.first_name, a.last_name FROM actor a JOIN film_actor fa ON a.actor_id = fa.actor_id JOIN film f ON fa.film_id = f.film_id WHERE f.title = 'ACADEMY DINOSAUR'",
        checkFunction: (result: unknown[]) => {
          return result.length > 0;
        },
      },
      {
        id: 2,
        question: 'Count the number of films per actor and return the top 5 most prolific actors (first_name, last_name, film_count).',
        questionAr: 'احسب عدد الأفلام لكل ممثل وأرجع أكثر 5 ممثلين إنتاجاً (first_name، last_name، film_count).',
        hint: 'GROUP BY actor_id, ORDER BY COUNT(fa.film_id) DESC, LIMIT 5',
        hintAr: 'استخدم GROUP BY actor_id, ORDER BY COUNT(fa.film_id) DESC, LIMIT 5',
        expectedQuery: 'SELECT a.first_name, a.last_name, COUNT(fa.film_id) AS film_count FROM actor a JOIN film_actor fa ON a.actor_id = fa.actor_id GROUP BY a.actor_id ORDER BY film_count DESC LIMIT 5',
        checkFunction: (result: unknown[]) => {
          return result.length === 5;
        },
      },
    ],
  },

  {
    id: 105,
    title: 'Film Categories & Genres',
    titleAr: 'تصنيفات الأفلام والأجناس',
    description: 'Join film, film_category, and category tables to explore genres and aggregate films per category.',
    descriptionAr: 'ربط جداول film وfilm_category وcategory لاستكشاف الأجناس وتجميع الأفلام حسب الفئة.',
    content: `## The Genre System

Films in the DVD Rental database are organized by genre. Like the actor–film relationship, this is also many-to-many (though in practice each film has exactly one category here). The three tables are:

- \`category\` — 16 genres (Action, Comedy, Horror, …)
- \`film_category\` — bridge: film_id + category_id
- \`film\` — the film details

## Joining Films to Their Category

\`\`\`sql
SELECT f.title, c.name AS category
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c       ON fc.category_id = c.category_id
ORDER BY c.name, f.title
LIMIT 15;
\`\`\`

## Counting Films Per Category

One of the most common analytical queries: how many films exist in each genre?

\`\`\`sql
SELECT c.name AS category, COUNT(fc.film_id) AS total_films
FROM category c
JOIN film_category fc ON c.category_id = fc.category_id
GROUP BY c.name
ORDER BY total_films DESC;
\`\`\`

Notice we start the join from \`category\` to include all categories even if a category had zero films (though in this dataset every category has at least one film).

## Filtering to a Specific Genre

Combine a join with a WHERE clause to list films in one category:

\`\`\`sql
SELECT f.title, f.rental_rate, f.length
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c       ON fc.category_id = c.category_id
WHERE c.name = 'Action'
ORDER BY f.title;
\`\`\`

## The 16 Genres

| Genre | Genre | Genre | Genre |
|---|---|---|---|
| Action | Animation | Children | Classics |
| Comedy | Documentary | Drama | Family |
| Foreign | Games | Horror | Music |
| New | Sci-Fi | Sports | Travel |

Understanding which genres are most popular can drive inventory decisions — a real-world use of SQL analytics.
`,
    contentAr: `## نظام الأجناس

تُنظَّم الأفلام في قاعدة بيانات تأجير الأفلام حسب الجنس. مثل علاقة الممثل-الفيلم، هذه أيضاً كثير-إلى-كثير (وإن كان لكل فيلم في الواقع فئة واحدة هنا). الجداول الثلاثة:

- \`category\` — 16 جنساً (Action، Comedy، Horror، …)
- \`film_category\` — جسر: film_id + category_id
- \`film\` — تفاصيل الفيلم

## ربط الأفلام بفئاتها

\`\`\`sql
SELECT f.title, c.name AS category
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c       ON fc.category_id = c.category_id
ORDER BY c.name, f.title
LIMIT 15;
\`\`\`

## عدّ الأفلام لكل فئة

أحد أكثر الاستعلامات التحليلية شيوعاً: كم عدد الأفلام في كل جنس؟

\`\`\`sql
SELECT c.name AS category, COUNT(fc.film_id) AS total_films
FROM category c
JOIN film_category fc ON c.category_id = fc.category_id
GROUP BY c.name
ORDER BY total_films DESC;
\`\`\`

لاحظ أننا نبدأ الربط من \`category\` لتضمين جميع الفئات حتى لو كانت الفئة لا تحتوي على أفلام.

## التصفية لجنس محدد

ادمج الربط مع WHERE لإدراج أفلام فئة واحدة:

\`\`\`sql
SELECT f.title, f.rental_rate, f.length
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c       ON fc.category_id = c.category_id
WHERE c.name = 'Action'
ORDER BY f.title;
\`\`\`

## الأجناس الـ 16

| الجنس | الجنس | الجنس | الجنس |
|---|---|---|---|
| Action | Animation | Children | Classics |
| Comedy | Documentary | Drama | Family |
| Foreign | Games | Horror | Music |
| New | Sci-Fi | Sports | Travel |

فهم الأجناس الأكثر شعبية يمكن أن يوجّه قرارات المخزون — وهذا استخدام حقيقي لتحليلات SQL.
`,
    example: `SELECT c.name AS category, COUNT(fc.film_id) AS total_films
FROM category c
JOIN film_category fc ON c.category_id = fc.category_id
GROUP BY c.name
ORDER BY total_films DESC;`,
    exercises: [
      {
        id: 1,
        question: "List all film titles in the 'Action' category. Return only the title column.",
        questionAr: "اعرض عناوين جميع أفلام فئة 'Action'. أرجع عمود title فقط.",
        hint: "JOIN film → film_category → category, WHERE c.name = 'Action'",
        hintAr: "ربط film → film_category → category، ثم WHERE c.name = 'Action'",
        expectedQuery: "SELECT f.title FROM film f JOIN film_category fc ON f.film_id = fc.film_id JOIN category c ON fc.category_id = c.category_id WHERE c.name = 'Action' ORDER BY f.title",
        checkFunction: (result: unknown[]) => {
          return result.length > 0;
        },
      },
      {
        id: 2,
        question: 'Find the category with the most films. Return only 1 row with the category name and film count.',
        questionAr: 'أوجد الفئة التي تحتوي على أكثر عدد من الأفلام. أرجع صفاً واحداً فقط يحتوي على اسم الفئة وعدد الأفلام.',
        hint: 'GROUP BY c.name, ORDER BY COUNT DESC, LIMIT 1',
        hintAr: 'استخدم GROUP BY c.name, ORDER BY COUNT DESC, LIMIT 1',
        expectedQuery: 'SELECT c.name, COUNT(fc.film_id) AS film_count FROM category c JOIN film_category fc ON c.category_id = fc.category_id GROUP BY c.name ORDER BY film_count DESC LIMIT 1',
        checkFunction: (result: unknown[]) => {
          return result.length === 1;
        },
      },
    ],
  },

  {
    id: 106,
    title: 'Customers & Rentals',
    titleAr: 'العملاء والإيجارات',
    description: 'Join rental and customer tables, aggregate rental counts, and use HAVING to filter grouped results.',
    descriptionAr: 'ربط جدولَي rental وcustomer، تجميع أعداد الإيجارات، واستخدام HAVING لتصفية النتائج المجمّعة.',
    content: `## The Rental Lifecycle

Every time a customer borrows a film, a row is inserted into the \`rental\` table. When they return it, \`return_date\` is updated. If \`return_date\` is \`NULL\`, the film hasn't been returned yet.

Key columns in \`rental\`:
| Column | Description |
|---|---|
| \`rental_id\` | Unique identifier |
| \`rental_date\` | When the customer took the film |
| \`return_date\` | When they brought it back (NULL if not yet) |
| \`customer_id\` | Links to the customer |
| \`inventory_id\` | Links to the physical copy |

## Joining Customers to Their Rentals

\`\`\`sql
SELECT cu.first_name, cu.last_name, COUNT(r.rental_id) AS total_rentals
FROM customer cu
JOIN rental r ON cu.customer_id = r.customer_id
GROUP BY cu.customer_id, cu.first_name, cu.last_name
ORDER BY total_rentals DESC
LIMIT 10;
\`\`\`

## Filtering Groups with HAVING

\`WHERE\` filters rows **before** grouping. \`HAVING\` filters groups **after** aggregation. You cannot use aggregate functions in \`WHERE\`.

\`\`\`sql
-- Customers who rented more than 38 times
SELECT cu.first_name, cu.last_name, COUNT(r.rental_id) AS total_rentals
FROM customer cu
JOIN rental r ON cu.customer_id = r.customer_id
GROUP BY cu.customer_id
HAVING COUNT(r.rental_id) > 38
ORDER BY total_rentals DESC;
\`\`\`

## Checking for Unreturned Films

Use \`IS NULL\` to find rentals where the film hasn't been returned:

\`\`\`sql
SELECT COUNT(*) AS unreturned
FROM rental
WHERE return_date IS NULL;
\`\`\`

## WHERE vs HAVING — Quick Reference

| Clause | Runs | Use for |
|---|---|---|
| \`WHERE\` | Before GROUP BY | Filter individual rows |
| \`HAVING\` | After GROUP BY | Filter aggregate results |
`,
    contentAr: `## دورة حياة الإيجار

في كل مرة يستعير فيها عميل فيلماً، يُدرج صف في جدول \`rental\`. عند إعادته، يُحدَّث \`return_date\`. إذا كانت \`return_date\` قيمتها \`NULL\`، فلم يُعَد الفيلم بعد.

الأعمدة الرئيسية في \`rental\`:
| العمود | الوصف |
|---|---|
| \`rental_id\` | معرّف فريد |
| \`rental_date\` | متى أخذ العميل الفيلم |
| \`return_date\` | متى أعاده (NULL إذا لم يُعَد بعد) |
| \`customer_id\` | يرتبط بالعميل |
| \`inventory_id\` | يرتبط بالنسخة المادية |

## ربط العملاء بإيجاراتهم

\`\`\`sql
SELECT cu.first_name, cu.last_name, COUNT(r.rental_id) AS total_rentals
FROM customer cu
JOIN rental r ON cu.customer_id = r.customer_id
GROUP BY cu.customer_id, cu.first_name, cu.last_name
ORDER BY total_rentals DESC
LIMIT 10;
\`\`\`

## تصفية المجموعات باستخدام HAVING

يصفّي \`WHERE\` الصفوف **قبل** التجميع. يصفّي \`HAVING\` المجموعات **بعد** التجميع. لا يمكن استخدام دوال التجميع في \`WHERE\`.

\`\`\`sql
-- العملاء الذين استأجروا أكثر من 38 مرة
SELECT cu.first_name, cu.last_name, COUNT(r.rental_id) AS total_rentals
FROM customer cu
JOIN rental r ON cu.customer_id = r.customer_id
GROUP BY cu.customer_id
HAVING COUNT(r.rental_id) > 38
ORDER BY total_rentals DESC;
\`\`\`

## التحقق من الأفلام غير المُعادة

استخدم \`IS NULL\` للعثور على الإيجارات التي لم يُعَد فيها الفيلم:

\`\`\`sql
SELECT COUNT(*) AS unreturned
FROM rental
WHERE return_date IS NULL;
\`\`\`

## WHERE مقابل HAVING — مرجع سريع

| الجملة | وقت التشغيل | الاستخدام |
|---|---|---|
| \`WHERE\` | قبل GROUP BY | تصفية صفوف فردية |
| \`HAVING\` | بعد GROUP BY | تصفية نتائج التجميع |
`,
    example: `SELECT cu.first_name, cu.last_name, COUNT(r.rental_id) AS total_rentals
FROM customer cu
JOIN rental r ON cu.customer_id = r.customer_id
GROUP BY cu.customer_id
ORDER BY total_rentals DESC
LIMIT 10;`,
    exercises: [
      {
        id: 1,
        question: 'Find customers who have made more than 38 rentals. Return first_name, last_name, and rental count.',
        questionAr: 'أوجد العملاء الذين أجروا أكثر من 38 عملية إيجار. أرجع first_name وlast_name وعدد الإيجارات.',
        hint: 'JOIN customer and rental, GROUP BY customer_id, HAVING COUNT > 38',
        hintAr: 'ربط customer وrental، GROUP BY customer_id، HAVING COUNT > 38',
        expectedQuery: 'SELECT cu.first_name, cu.last_name, COUNT(r.rental_id) AS total_rentals FROM customer cu JOIN rental r ON cu.customer_id = r.customer_id GROUP BY cu.customer_id HAVING COUNT(r.rental_id) > 38 ORDER BY total_rentals DESC',
        checkFunction: (result: unknown[]) => {
          return result.length > 0;
        },
      },
      {
        id: 2,
        question: 'Count how many rentals have NOT been returned yet (return_date is NULL).',
        questionAr: 'احسب عدد الإيجارات التي لم تُعَد بعد (return_date تساوي NULL).',
        hint: 'SELECT COUNT(*) FROM rental WHERE return_date IS NULL',
        hintAr: 'SELECT COUNT(*) FROM rental WHERE return_date IS NULL',
        expectedQuery: 'SELECT COUNT(*) FROM rental WHERE return_date IS NULL',
        checkFunction: (result: unknown[]) => {
          return result.length === 1;
        },
      },
    ],
  },

  {
    id: 107,
    title: 'Revenue Analysis',
    titleAr: 'تحليل الإيرادات',
    description: 'Use SUM, AVG, and GROUP BY on the payment table to analyze revenue by customer and staff.',
    descriptionAr: 'استخدم SUM وAVG وGROUP BY على جدول payment لتحليل الإيرادات حسب العميل والموظف.',
    content: `## The Payment Table

Every rental payment is recorded in the \`payment\` table. With 14,596 rows, it's the richest source for revenue analytics.

Key columns:
| Column | Type | Description |
|---|---|---|
| \`amount\` | REAL | Dollar amount paid |
| \`customer_id\` | INTEGER | Who paid |
| \`staff_id\` | INTEGER | Who processed the payment |
| \`payment_date\` | TEXT | When the payment was made |

## Aggregate Functions

SQL provides powerful aggregate functions that compute a single value from a set of rows:

\`\`\`sql
-- Total revenue, transaction count, and average payment
SELECT
  SUM(amount)           AS total_revenue,
  COUNT(*)              AS transactions,
  ROUND(AVG(amount), 2) AS avg_payment
FROM payment;
\`\`\`

## Revenue by Customer

Group by \`customer_id\` to compute how much each customer has spent:

\`\`\`sql
SELECT
  cu.first_name || ' ' || cu.last_name AS customer,
  SUM(p.amount) AS total_spent
FROM payment p
JOIN customer cu ON p.customer_id = cu.customer_id
GROUP BY p.customer_id
ORDER BY total_spent DESC
LIMIT 10;
\`\`\`

## Revenue by Staff Member

Only 2 staff members process payments in this dataset. Grouping by staff shows their performance:

\`\`\`sql
SELECT
  s.first_name || ' ' || s.last_name AS staff_member,
  SUM(p.amount)   AS total_revenue,
  COUNT(*)        AS transactions
FROM payment p
JOIN staff s ON p.staff_id = s.staff_id
GROUP BY p.staff_id
ORDER BY total_revenue DESC;
\`\`\`

## ROUND() and Formatting

\`ROUND(value, decimal_places)\` rounds a number to the specified number of decimal places. Use it to clean up floating-point output in financial calculations.

| Function | Example | Result |
|---|---|---|
| \`SUM(amount)\` | Sum all values | 67,416.51 |
| \`AVG(amount)\` | Average value | 4.20 |
| \`ROUND(AVG, 2)\` | Rounded average | 4.20 |
| \`COUNT(*)\` | Number of rows | 14,596 |
`,
    contentAr: `## جدول الدفعات

تُسجَّل كل دفعة إيجار في جدول \`payment\`. مع 14,596 صفاً، هو أغنى مصدر لتحليلات الإيرادات.

الأعمدة الرئيسية:
| العمود | النوع | الوصف |
|---|---|---|
| \`amount\` | REAL | المبلغ المدفوع بالدولار |
| \`customer_id\` | INTEGER | من دفع |
| \`staff_id\` | INTEGER | من معالجة الدفعة |
| \`payment_date\` | TEXT | متى تمت الدفعة |

## دوال التجميع

يوفّر SQL دوال تجميع قوية تحسب قيمة واحدة من مجموعة صفوف:

\`\`\`sql
-- إجمالي الإيرادات وعدد المعاملات ومتوسط الدفعة
SELECT
  SUM(amount)           AS total_revenue,
  COUNT(*)              AS transactions,
  ROUND(AVG(amount), 2) AS avg_payment
FROM payment;
\`\`\`

## الإيرادات لكل عميل

التجميع بـ \`customer_id\` لحساب مقدار إنفاق كل عميل:

\`\`\`sql
SELECT
  cu.first_name || ' ' || cu.last_name AS customer,
  SUM(p.amount) AS total_spent
FROM payment p
JOIN customer cu ON p.customer_id = cu.customer_id
GROUP BY p.customer_id
ORDER BY total_spent DESC
LIMIT 10;
\`\`\`

## الإيرادات لكل موظف

يعالج موظفان فقط الدفعات في هذه البيانات. التجميع حسب الموظف يُظهر أداءهم:

\`\`\`sql
SELECT
  s.first_name || ' ' || s.last_name AS staff_member,
  SUM(p.amount)   AS total_revenue,
  COUNT(*)        AS transactions
FROM payment p
JOIN staff s ON p.staff_id = s.staff_id
GROUP BY p.staff_id
ORDER BY total_revenue DESC;
\`\`\`

## ROUND() والتنسيق

تقرّب \`ROUND(value, decimal_places)\` رقماً إلى عدد محدد من الخانات العشرية. استخدمها لتنظيف مخرجات الفاصلة العائمة في الحسابات المالية.

| الدالة | مثال | النتيجة |
|---|---|---|
| \`SUM(amount)\` | مجموع جميع القيم | 67,416.51 |
| \`AVG(amount)\` | متوسط القيمة | 4.20 |
| \`ROUND(AVG, 2)\` | متوسط مقرّب | 4.20 |
| \`COUNT(*)\` | عدد الصفوف | 14,596 |
`,
    example: `SELECT SUM(amount) AS total_revenue,
       COUNT(*) AS transactions,
       ROUND(AVG(amount), 2) AS avg_payment
FROM payment;`,
    exercises: [
      {
        id: 1,
        question: 'Show the top 5 customers by total amount paid. Return customer_id and total_spent.',
        questionAr: 'اعرض أعلى 5 عملاء من حيث إجمالي المبالغ المدفوعة. أرجع customer_id وtotal_spent.',
        hint: 'SELECT customer_id, SUM(amount) ... GROUP BY customer_id ORDER BY SUM(amount) DESC LIMIT 5',
        hintAr: 'استخدم SELECT customer_id, SUM(amount) ... GROUP BY customer_id ORDER BY SUM(amount) DESC LIMIT 5',
        expectedQuery: 'SELECT customer_id, SUM(amount) AS total_spent FROM payment GROUP BY customer_id ORDER BY total_spent DESC LIMIT 5',
        checkFunction: (result: unknown[]) => {
          return result.length === 5;
        },
      },
      {
        id: 2,
        question: 'Calculate total revenue by each staff member. JOIN payment to staff and return the staff name and total revenue. (Should return 2 rows.)',
        questionAr: 'احسب إجمالي الإيرادات لكل موظف. ربط payment بـ staff وأرجع اسم الموظف وإجمالي الإيرادات. (يجب أن يُرجع صفَّين.)',
        hint: 'JOIN payment p ON staff s, GROUP BY p.staff_id, should return exactly 2 rows',
        hintAr: 'ربط payment p بـ staff s، GROUP BY p.staff_id، يجب أن يُرجع صفَّين بالضبط',
        expectedQuery: "SELECT s.first_name || ' ' || s.last_name AS staff_member, SUM(p.amount) AS total_revenue FROM payment p JOIN staff s ON p.staff_id = s.staff_id GROUP BY p.staff_id ORDER BY total_revenue DESC",
        checkFunction: (result: unknown[]) => {
          return result.length === 2;
        },
      },
    ],
  },

  {
    id: 108,
    title: 'Advanced Analytics with CTEs',
    titleAr: 'تحليل متقدم بـ CTEs',
    description: 'Write CTEs (WITH clause) and subqueries for real-world analytics like finding never-rented films and high-value customers.',
    descriptionAr: 'اكتب CTEs (جملة WITH) واستعلامات فرعية لتحليلات واقعية مثل إيجاد الأفلام التي لم تُستأجر قط والعملاء ذوي الإنفاق المرتفع.',
    content: `## Common Table Expressions (CTEs)

A **CTE** (also called a \`WITH\` query) is a named temporary result set that you define before the main \`SELECT\`. It makes complex queries more readable by breaking them into logical steps.

\`\`\`sql
WITH step_name AS (
  SELECT ...  -- this becomes a virtual table
)
SELECT * FROM step_name WHERE ...;
\`\`\`

## Why Use CTEs?

- **Readability:** Each step has a meaningful name
- **Reusability:** Reference the same CTE multiple times in one query
- **Replaces subqueries:** Easier to debug than nested subqueries

## Example: Top Spending Customers

\`\`\`sql
WITH top_customers AS (
  SELECT customer_id, SUM(amount) AS total_spent
  FROM payment
  GROUP BY customer_id
  ORDER BY total_spent DESC
  LIMIT 5
)
SELECT cu.first_name || ' ' || cu.last_name AS customer,
       tc.total_spent
FROM top_customers tc
JOIN customer cu ON tc.customer_id = cu.customer_id
ORDER BY tc.total_spent DESC;
\`\`\`

## Finding Never-Rented Films

A classic analytical question: which films have **never** been rented? Use a \`LEFT JOIN\` — films in inventory but with no matching rental row will have \`NULL\` for rental columns.

\`\`\`sql
SELECT f.title
FROM film f
LEFT JOIN inventory i  ON f.film_id  = i.film_id
LEFT JOIN rental r     ON i.inventory_id = r.inventory_id
WHERE r.rental_id IS NULL
ORDER BY f.title;
\`\`\`

## Above-Average Spending

Find customers whose total spending exceeds the average across all customers:

\`\`\`sql
WITH customer_totals AS (
  SELECT customer_id, SUM(amount) AS total_spent
  FROM payment
  GROUP BY customer_id
),
avg_spending AS (
  SELECT AVG(total_spent) AS avg_spent FROM customer_totals
)
SELECT cu.first_name || ' ' || cu.last_name AS customer,
       ct.total_spent
FROM customer_totals ct
JOIN customer cu ON ct.customer_id = cu.customer_id
CROSS JOIN avg_spending av
WHERE ct.total_spent > av.avg_spent
ORDER BY ct.total_spent DESC;
\`\`\`

> **Best practice:** When a query starts having more than 3 levels of nesting, convert subqueries to CTEs. Future-you (and your teammates) will thank you.
`,
    contentAr: `## التعبيرات الجدولية المشتركة (CTEs)

**CTE** (يُسمّى أيضاً استعلام \`WITH\`) هو مجموعة نتائج مؤقتة مسمّاة تعرّفها قبل \`SELECT\` الرئيسية. تجعل الاستعلامات المعقدة أكثر قابلية للقراءة بتقسيمها إلى خطوات منطقية.

\`\`\`sql
WITH step_name AS (
  SELECT ...  -- يصبح هذا جدولاً افتراضياً
)
SELECT * FROM step_name WHERE ...;
\`\`\`

## لماذا نستخدم CTEs؟

- **القابلية للقراءة:** لكل خطوة اسم ذو معنى
- **قابلية إعادة الاستخدام:** الإشارة إلى نفس الـ CTE عدة مرات في استعلام واحد
- **يحلّ محل الاستعلامات الفرعية:** أسهل في التصحيح من الاستعلامات المتداخلة

## مثال: أعلى العملاء إنفاقاً

\`\`\`sql
WITH top_customers AS (
  SELECT customer_id, SUM(amount) AS total_spent
  FROM payment
  GROUP BY customer_id
  ORDER BY total_spent DESC
  LIMIT 5
)
SELECT cu.first_name || ' ' || cu.last_name AS customer,
       tc.total_spent
FROM top_customers tc
JOIN customer cu ON tc.customer_id = cu.customer_id
ORDER BY tc.total_spent DESC;
\`\`\`

## إيجاد الأفلام التي لم تُستأجر قط

سؤال تحليلي كلاسيكي: أي الأفلام **لم تُستأجر قط**؟ استخدم \`LEFT JOIN\` — الأفلام الموجودة في المخزون ولكن بدون صف إيجار مطابق ستحتوي على \`NULL\` في أعمدة الإيجار.

\`\`\`sql
SELECT f.title
FROM film f
LEFT JOIN inventory i  ON f.film_id  = i.film_id
LEFT JOIN rental r     ON i.inventory_id = r.inventory_id
WHERE r.rental_id IS NULL
ORDER BY f.title;
\`\`\`

## الإنفاق فوق المتوسط

إيجاد العملاء الذين يتجاوز إجمالي إنفاقهم المتوسط عبر جميع العملاء:

\`\`\`sql
WITH customer_totals AS (
  SELECT customer_id, SUM(amount) AS total_spent
  FROM payment
  GROUP BY customer_id
),
avg_spending AS (
  SELECT AVG(total_spent) AS avg_spent FROM customer_totals
)
SELECT cu.first_name || ' ' || cu.last_name AS customer,
       ct.total_spent
FROM customer_totals ct
JOIN customer cu ON ct.customer_id = cu.customer_id
CROSS JOIN avg_spending av
WHERE ct.total_spent > av.avg_spent
ORDER BY ct.total_spent DESC;
\`\`\`

> **أفضل الممارسات:** عندما يبدأ الاستعلام في امتلاك أكثر من 3 مستويات من التداخل، حوّل الاستعلامات الفرعية إلى CTEs. أنت المستقبلي (وزملاؤك في الفريق) سيشكرونك.
`,
    example: `WITH top_customers AS (
  SELECT customer_id, SUM(amount) AS total_spent
  FROM payment
  GROUP BY customer_id
  ORDER BY total_spent DESC
  LIMIT 5
)
SELECT cu.first_name || ' ' || cu.last_name AS customer,
       tc.total_spent
FROM top_customers tc
JOIN customer cu ON tc.customer_id = cu.customer_id
ORDER BY tc.total_spent DESC;`,
    exercises: [
      {
        id: 1,
        question: 'Find films that have NEVER been rented. Use LEFT JOINs through inventory and rental tables, filtering where rental_id IS NULL.',
        questionAr: 'أوجد الأفلام التي لم تُستأجر قط. استخدم LEFT JOINs عبر جدولَي inventory وrental، مع التصفية حيث rental_id IS NULL.',
        hint: 'LEFT JOIN film → inventory → rental, WHERE r.rental_id IS NULL',
        hintAr: 'LEFT JOIN film → inventory → rental، WHERE r.rental_id IS NULL',
        expectedQuery: 'SELECT f.title FROM film f LEFT JOIN inventory i ON f.film_id = i.film_id LEFT JOIN rental r ON i.inventory_id = r.inventory_id WHERE r.rental_id IS NULL ORDER BY f.title',
        checkFunction: (result: unknown[]) => {
          return result.length > 0;
        },
      },
      {
        id: 2,
        question: 'Using a CTE, find customers whose total spending is above the average customer spending. Return customer_id and total_spent.',
        questionAr: 'باستخدام CTE، أوجد العملاء الذين يتجاوز إجمالي إنفاقهم متوسط إنفاق العملاء. أرجع customer_id وtotal_spent.',
        hint: 'WITH totals AS (SELECT customer_id, SUM(amount)...), then compare each total to AVG(total_spent)',
        hintAr: 'WITH totals AS (SELECT customer_id, SUM(amount)...)، ثم قارن كل مجموع بـ AVG(total_spent)',
        expectedQuery: 'WITH customer_totals AS (SELECT customer_id, SUM(amount) AS total_spent FROM payment GROUP BY customer_id) SELECT customer_id, total_spent FROM customer_totals WHERE total_spent > (SELECT AVG(total_spent) FROM customer_totals) ORDER BY total_spent DESC',
        checkFunction: (result: unknown[]) => {
          return result.length > 0;
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  //  LEVEL 4 — ADVANCED QUERIES
  // ═══════════════════════════════════════════════════

  {
    id: 109,
    title: 'Window Functions — RANK & ROW_NUMBER',
    titleAr: 'دوال النوافذ — RANK و ROW_NUMBER',
    description: 'Use window functions to rank films, customers, and payments without collapsing rows.',
    descriptionAr: 'استخدم دوال النوافذ لترتيب الأفلام والعملاء والمدفوعات دون دمج الصفوف.',
    content: `
## Window Functions on Real Data

Window functions calculate a value **across a set of rows related to the current row** — without collapsing them into one row like \`GROUP BY\` does.

---

## ROW_NUMBER — Unique Sequential Number

\`\`\`sql
-- Number each customer's payments in date order
SELECT
  customer_id,
  payment_date,
  amount,
  ROW_NUMBER() OVER (
    PARTITION BY customer_id
    ORDER BY payment_date
  ) AS payment_no
FROM payment
LIMIT 20;
\`\`\`

---

## RANK — Rank with Gaps for Ties

\`\`\`sql
-- Rank films by rental_rate within each rating group
SELECT
  title,
  rating,
  rental_rate,
  RANK() OVER (
    PARTITION BY rating
    ORDER BY rental_rate DESC
  ) AS rate_rank
FROM film
ORDER BY rating, rate_rank
LIMIT 30;
\`\`\`

---

## DENSE_RANK — Rank Without Gaps

\`\`\`sql
-- Top 3 highest-paying customers (no gaps in rank for ties)
SELECT
  customer_id,
  SUM(amount) AS total,
  DENSE_RANK() OVER (ORDER BY SUM(amount) DESC) AS rnk
FROM payment
GROUP BY customer_id
ORDER BY rnk
LIMIT 10;
\`\`\`

---

## Filtering by Rank Using a Subquery

Window functions cannot be used in \`WHERE\` directly — wrap in a subquery:

\`\`\`sql
-- Top 3 films per category by rental count
SELECT * FROM (
  SELECT
    c.name AS category,
    f.title,
    COUNT(r.rental_id) AS rentals,
    RANK() OVER (PARTITION BY c.name ORDER BY COUNT(r.rental_id) DESC) AS rnk
  FROM film f
  JOIN film_category fc ON f.film_id = fc.film_id
  JOIN category c ON fc.category_id = c.category_id
  JOIN inventory i ON f.film_id = i.film_id
  JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY c.name, f.title
) ranked
WHERE rnk <= 3
ORDER BY category, rnk;
\`\`\`
    `,
    contentAr: `
## دوال النوافذ على بيانات حقيقية

دوال النوافذ تحسب قيمة **عبر مجموعة من الصفوف المرتبطة بالصف الحالي** — دون دمجها في صف واحد كما تفعل \`GROUP BY\`.

---

## ROW_NUMBER — رقم تسلسلي فريد

\`\`\`sql
-- ترقيم دفعات كل عميل بترتيب التاريخ
SELECT
  customer_id,
  payment_date,
  amount,
  ROW_NUMBER() OVER (
    PARTITION BY customer_id
    ORDER BY payment_date
  ) AS payment_no
FROM payment
LIMIT 20;
\`\`\`

---

## RANK — ترتيب مع فجوات عند التعادل

\`\`\`sql
-- ترتيب الأفلام حسب سعر الإيجار داخل كل تصنيف
SELECT
  title,
  rating,
  rental_rate,
  RANK() OVER (
    PARTITION BY rating
    ORDER BY rental_rate DESC
  ) AS rate_rank
FROM film
ORDER BY rating, rate_rank
LIMIT 30;
\`\`\`

---

## DENSE_RANK — ترتيب بدون فجوات

\`\`\`sql
-- أفضل 3 عملاء إنفاقاً (بدون فجوات في الترتيب عند التعادل)
SELECT
  customer_id,
  SUM(amount) AS total,
  DENSE_RANK() OVER (ORDER BY SUM(amount) DESC) AS rnk
FROM payment
GROUP BY customer_id
ORDER BY rnk
LIMIT 10;
\`\`\`

---

## الفلترة بالترتيب عبر استعلام فرعي

لا يمكن استخدام دوال النوافذ مباشرةً في \`WHERE\` — استخدم استعلاماً فرعياً:

\`\`\`sql
-- أفضل 3 أفلام في كل فئة حسب عدد الإيجارات
SELECT * FROM (
  SELECT
    c.name AS category,
    f.title,
    COUNT(r.rental_id) AS rentals,
    RANK() OVER (PARTITION BY c.name ORDER BY COUNT(r.rental_id) DESC) AS rnk
  FROM film f
  JOIN film_category fc ON f.film_id = fc.film_id
  JOIN category c ON fc.category_id = c.category_id
  JOIN inventory i ON f.film_id = i.film_id
  JOIN rental r ON i.inventory_id = r.inventory_id
  GROUP BY c.name, f.title
) ranked
WHERE rnk <= 3
ORDER BY category, rnk;
\`\`\`
    `,
    example: `SELECT
  title,
  rating,
  rental_rate,
  RANK() OVER (
    PARTITION BY rating
    ORDER BY rental_rate DESC
  ) AS rate_rank
FROM film
ORDER BY rating, rate_rank
LIMIT 20;`,
    exercises: [
      {
        id: 1,
        question: 'Use ROW_NUMBER() to number each film within its rating group, ordered by length DESC. Show film_id, title, rating, length, and row_num. Limit to 20 rows.',
        questionAr: 'استخدم ROW_NUMBER() لترقيم كل فيلم داخل مجموعة تصنيفه، مرتباً حسب length DESC. أظهر film_id وtitle وrating وlength وrow_num. اعرض 20 صفاً فقط.',
        hint: 'ROW_NUMBER() OVER (PARTITION BY rating ORDER BY length DESC) AS row_num',
        hintAr: 'ROW_NUMBER() OVER (PARTITION BY rating ORDER BY length DESC) AS row_num',
        expectedQuery: 'SELECT film_id, title, rating, length, ROW_NUMBER() OVER (PARTITION BY rating ORDER BY length DESC) AS row_num FROM film ORDER BY rating, row_num LIMIT 20',
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /ROW_NUMBER/i.test(q) && /PARTITION\s+BY/i.test(q),
      },
      {
        id: 2,
        question: 'Find the top 5 customers by total payment amount using DENSE_RANK(). Show customer_id, total_paid, and rank. Only return ranks 1 through 5.',
        questionAr: 'أوجد أفضل 5 عملاء من حيث إجمالي المدفوعات باستخدام DENSE_RANK(). أظهر customer_id وtotal_paid والترتيب. أرجع الترتيبات 1 إلى 5 فقط.',
        hint: 'Wrap in subquery: SELECT ... FROM (SELECT customer_id, SUM(amount) AS total_paid, DENSE_RANK() OVER (ORDER BY SUM(amount) DESC) AS rnk FROM payment GROUP BY customer_id) WHERE rnk <= 5',
        hintAr: 'استخدم استعلاماً فرعياً: SELECT ... FROM (SELECT customer_id, SUM(amount) AS total_paid, DENSE_RANK() OVER (ORDER BY SUM(amount) DESC) AS rnk FROM payment GROUP BY customer_id) WHERE rnk <= 5',
        expectedQuery: 'SELECT customer_id, total_paid, rnk FROM (SELECT customer_id, SUM(amount) AS total_paid, DENSE_RANK() OVER (ORDER BY SUM(amount) DESC) AS rnk FROM payment GROUP BY customer_id) WHERE rnk <= 5 ORDER BY rnk',
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /DENSE_RANK/i.test(q) && result.length <= 5,
      },
    ],
  },

  {
    id: 110,
    title: 'Date Functions & Rental Duration',
    titleAr: 'دوال التاريخ ومدة الإيجار',
    description: 'Work with rental dates using strftime, calculate overdue returns, and analyse rental patterns by time.',
    descriptionAr: 'تعامل مع تواريخ الإيجار باستخدام strftime، احسب التأخير في الإعادة، وحلّل أنماط الإيجار عبر الزمن.',
    content: `
## Dates in SQLite

The DVD Rental database stores dates as text in ISO format (\`YYYY-MM-DD HH:MM:SS\`). SQLite provides \`strftime\` to extract parts and \`julianday\` to calculate differences.

---

## strftime — Extract Date Parts

\`\`\`sql
-- Year and month of each rental
SELECT
  rental_id,
  rental_date,
  strftime('%Y', rental_date) AS year,
  strftime('%m', rental_date) AS month,
  strftime('%Y-%m', rental_date) AS year_month
FROM rental
LIMIT 10;
\`\`\`

Common format codes: \`%Y\` year, \`%m\` month, \`%d\` day, \`%H\` hour, \`%w\` weekday (0=Sunday).

---

## julianday — Calculate Duration in Days

\`\`\`sql
-- How many days was each item rented?
SELECT
  rental_id,
  rental_date,
  return_date,
  ROUND(julianday(return_date) - julianday(rental_date), 1) AS days_rented
FROM rental
WHERE return_date IS NOT NULL
LIMIT 15;
\`\`\`

---

## Finding Overdue Rentals

The \`film\` table has a \`rental_duration\` column (allowed rental days):

\`\`\`sql
-- Rentals returned late
SELECT
  r.rental_id,
  f.title,
  f.rental_duration AS allowed_days,
  ROUND(julianday(r.return_date) - julianday(r.rental_date), 1) AS actual_days,
  ROUND(julianday(r.return_date) - julianday(r.rental_date), 1) - f.rental_duration AS overdue_days
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE return_date IS NOT NULL
  AND julianday(r.return_date) - julianday(r.rental_date) > f.rental_duration
ORDER BY overdue_days DESC
LIMIT 15;
\`\`\`

---

## Rentals by Month

\`\`\`sql
-- Monthly rental volume
SELECT
  strftime('%Y-%m', rental_date) AS month,
  COUNT(*) AS rentals
FROM rental
GROUP BY month
ORDER BY month;
\`\`\`
    `,
    contentAr: `
## التواريخ في SQLite

تُخزَّن التواريخ في قاعدة بيانات DVD بصيغة نصية ISO (\`YYYY-MM-DD HH:MM:SS\`). يوفر SQLite \`strftime\` لاستخراج الأجزاء و\`julianday\` لحساب الفروق.

---

## strftime — استخراج أجزاء التاريخ

\`\`\`sql
-- السنة والشهر لكل إيجار
SELECT
  rental_id,
  rental_date,
  strftime('%Y', rental_date) AS year,
  strftime('%m', rental_date) AS month,
  strftime('%Y-%m', rental_date) AS year_month
FROM rental
LIMIT 10;
\`\`\`

رموز التنسيق الشائعة: \`%Y\` السنة، \`%m\` الشهر، \`%d\` اليوم، \`%H\` الساعة، \`%w\` يوم الأسبوع (0=الأحد).

---

## julianday — حساب المدة بالأيام

\`\`\`sql
-- كم يوماً استُأجر كل عنصر؟
SELECT
  rental_id,
  rental_date,
  return_date,
  ROUND(julianday(return_date) - julianday(rental_date), 1) AS days_rented
FROM rental
WHERE return_date IS NOT NULL
LIMIT 15;
\`\`\`

---

## إيجاد الإيجارات المتأخرة

يحتوي جدول \`film\` على عمود \`rental_duration\` (أيام الإيجار المسموح بها):

\`\`\`sql
-- الإيجارات التي أُعيدت متأخرة
SELECT
  r.rental_id,
  f.title,
  f.rental_duration AS allowed_days,
  ROUND(julianday(r.return_date) - julianday(r.rental_date), 1) AS actual_days,
  ROUND(julianday(r.return_date) - julianday(r.rental_date), 1) - f.rental_duration AS overdue_days
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE return_date IS NOT NULL
  AND julianday(r.return_date) - julianday(r.rental_date) > f.rental_duration
ORDER BY overdue_days DESC
LIMIT 15;
\`\`\`

---

## الإيجارات حسب الشهر

\`\`\`sql
-- حجم الإيجارات الشهرية
SELECT
  strftime('%Y-%m', rental_date) AS month,
  COUNT(*) AS rentals
FROM rental
GROUP BY month
ORDER BY month;
\`\`\`
    `,
    example: `SELECT
  strftime('%Y-%m', rental_date) AS month,
  COUNT(*) AS rentals
FROM rental
GROUP BY month
ORDER BY month;`,
    exercises: [
      {
        id: 1,
        question: 'Find the average rental duration (in days, rounded to 1 decimal) per film rating. Show rating and avg_days, ordered by avg_days DESC.',
        questionAr: 'أوجد متوسط مدة الإيجار (بالأيام، مقرّباً لخانة عشرية واحدة) لكل تصنيف فيلم. أظهر rating وavg_days، مرتباً حسب avg_days DESC.',
        hint: 'JOIN rental → inventory → film, use ROUND(AVG(julianday(return_date) - julianday(rental_date)), 1), filter WHERE return_date IS NOT NULL, GROUP BY rating',
        hintAr: 'JOIN rental → inventory → film، استخدم ROUND(AVG(julianday(return_date) - julianday(rental_date)), 1)، فلترة WHERE return_date IS NOT NULL، GROUP BY rating',
        expectedQuery: "SELECT f.rating, ROUND(AVG(julianday(r.return_date) - julianday(r.rental_date)), 1) AS avg_days FROM rental r JOIN inventory i ON r.inventory_id = i.inventory_id JOIN film f ON i.film_id = f.film_id WHERE r.return_date IS NOT NULL GROUP BY f.rating ORDER BY avg_days DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /julianday/i.test(q) && /GROUP\s+BY/i.test(q),
      },
      {
        id: 2,
        question: "Count total rentals per weekday (0=Sunday … 6=Saturday). Show weekday number and rental_count, ordered by weekday.",
        questionAr: "احسب إجمالي الإيجارات لكل يوم من أيام الأسبوع (0=الأحد … 6=السبت). أظهر رقم اليوم وعدد الإيجارات، مرتباً حسب اليوم.",
        hint: "SELECT strftime('%w', rental_date) AS weekday, COUNT(*) AS rental_count FROM rental GROUP BY weekday ORDER BY weekday",
        hintAr: "SELECT strftime('%w', rental_date) AS weekday, COUNT(*) AS rental_count FROM rental GROUP BY weekday ORDER BY weekday",
        expectedQuery: "SELECT strftime('%w', rental_date) AS weekday, COUNT(*) AS rental_count FROM rental GROUP BY weekday ORDER BY weekday",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /strftime/i.test(q) && /GROUP\s+BY/i.test(q),
      },
    ],
  },

  {
    id: 111,
    title: 'Film Inventory & Availability',
    titleAr: 'مخزون الأفلام والتوافر',
    description: 'Query the inventory table to find copy counts, currently rented films, and films never rented.',
    descriptionAr: 'استعلم عن جدول المخزون لإيجاد عدد النسخ والأفلام المؤجَّرة حالياً والأفلام التي لم تُستأجر قط.',
    content: `
## Understanding Inventory

Each row in \`inventory\` represents one **physical copy** of a film at a specific store. A film with 4 copies has 4 rows in \`inventory\`.

\`\`\`sql
-- How many copies does each film have?
SELECT
  f.title,
  COUNT(i.inventory_id) AS copies
FROM film f
JOIN inventory i ON f.film_id = i.film_id
GROUP BY f.film_id, f.title
ORDER BY copies DESC
LIMIT 10;
\`\`\`

---

## Currently Rented (Unreturned)

A rental without a \`return_date\` means the item is still out:

\`\`\`sql
-- Films currently rented out (not yet returned)
SELECT
  f.title,
  c.first_name || ' ' || c.last_name AS customer,
  r.rental_date
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL
ORDER BY r.rental_date
LIMIT 15;
\`\`\`

---

## Films Never Rented

Use a LEFT JOIN to find films with no rental history:

\`\`\`sql
SELECT f.title
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.rental_id IS NULL
ORDER BY f.title;
\`\`\`

---

## Copy Utilisation Rate

\`\`\`sql
-- % of copies ever rented per film (top 10)
SELECT
  f.title,
  COUNT(DISTINCT i.inventory_id) AS total_copies,
  COUNT(DISTINCT r.inventory_id) AS rented_copies,
  ROUND(COUNT(DISTINCT r.inventory_id) * 100.0 / COUNT(DISTINCT i.inventory_id), 1) AS utilisation_pct
FROM film f
JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id, f.title
ORDER BY utilisation_pct DESC
LIMIT 10;
\`\`\`
    `,
    contentAr: `
## فهم جدول المخزون

كل صف في \`inventory\` يمثّل **نسخة مادية واحدة** من فيلم في متجر محدد. الفيلم الذي له 4 نسخ يملك 4 صفوف في \`inventory\`.

\`\`\`sql
-- كم نسخة لكل فيلم؟
SELECT
  f.title,
  COUNT(i.inventory_id) AS copies
FROM film f
JOIN inventory i ON f.film_id = i.film_id
GROUP BY f.film_id, f.title
ORDER BY copies DESC
LIMIT 10;
\`\`\`

---

## المُؤجَّر حالياً (لم يُعَد بعد)

الإيجار بدون \`return_date\` يعني أن العنصر لا يزال خارج المتجر:

\`\`\`sql
-- الأفلام المؤجَّرة حالياً (لم تُعَد بعد)
SELECT
  f.title,
  c.first_name || ' ' || c.last_name AS customer,
  r.rental_date
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL
ORDER BY r.rental_date
LIMIT 15;
\`\`\`

---

## الأفلام التي لم تُستأجر قط

استخدم LEFT JOIN لإيجاد الأفلام التي ليس لها تاريخ إيجار:

\`\`\`sql
SELECT f.title
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.rental_id IS NULL
ORDER BY f.title;
\`\`\`

---

## معدل استخدام النسخ

\`\`\`sql
-- نسبة النسخ التي استُأجرت على الإطلاق (أفضل 10)
SELECT
  f.title,
  COUNT(DISTINCT i.inventory_id) AS total_copies,
  COUNT(DISTINCT r.inventory_id) AS rented_copies,
  ROUND(COUNT(DISTINCT r.inventory_id) * 100.0 / COUNT(DISTINCT i.inventory_id), 1) AS utilisation_pct
FROM film f
JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id, f.title
ORDER BY utilisation_pct DESC
LIMIT 10;
\`\`\`
    `,
    example: `-- Films currently rented out (not yet returned)
SELECT f.title, r.rental_date
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL
ORDER BY r.rental_date
LIMIT 15;`,
    exercises: [
      {
        id: 1,
        question: 'For each store (store_id), count how many distinct films are available in its inventory. Show store_id and film_count.',
        questionAr: 'لكل متجر (store_id)، احسب عدد الأفلام المتميزة المتوفرة في مخزونه. أظهر store_id وfilm_count.',
        hint: 'SELECT store_id, COUNT(DISTINCT film_id) AS film_count FROM inventory GROUP BY store_id',
        hintAr: 'SELECT store_id, COUNT(DISTINCT film_id) AS film_count FROM inventory GROUP BY store_id',
        expectedQuery: 'SELECT store_id, COUNT(DISTINCT film_id) AS film_count FROM inventory GROUP BY store_id',
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /GROUP\s+BY/i.test(q) && /store_id/i.test(q),
      },
      {
        id: 2,
        question: 'Find films that have never been rented. Return only the title, ordered alphabetically.',
        questionAr: 'أوجد الأفلام التي لم تُستأجر قط. أرجع العنوان فقط، مرتباً أبجدياً.',
        hint: 'LEFT JOIN film → inventory → rental, WHERE r.rental_id IS NULL',
        hintAr: 'LEFT JOIN film → inventory → rental، WHERE r.rental_id IS NULL',
        expectedQuery: 'SELECT f.title FROM film f LEFT JOIN inventory i ON f.film_id = i.film_id LEFT JOIN rental r ON i.inventory_id = r.inventory_id WHERE r.rental_id IS NULL ORDER BY f.title',
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LEFT\s+JOIN/i.test(q) && /IS\s+NULL/i.test(q),
      },
    ],
  },

  // ═══════════════════════════════════════════════════
  //  LEVEL 5 — EXPERT
  // ═══════════════════════════════════════════════════

  {
    id: 112,
    title: 'Customer Segmentation with CASE WHEN',
    titleAr: 'تصنيف العملاء باستخدام CASE WHEN',
    description: 'Segment customers into spending tiers and activity groups using conditional logic on real transaction data.',
    descriptionAr: 'صنّف العملاء إلى شرائح إنفاق ومجموعات نشاط باستخدام المنطق الشرطي على بيانات المعاملات الحقيقية.',
    content: `
## Segmenting Customers

Customer segmentation means grouping customers by behaviour — spending level, rental frequency, or recency. CASE WHEN turns raw numbers into meaningful labels.

---

## Spending Tier

\`\`\`sql
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name AS customer,
  SUM(p.amount) AS total_spent,
  CASE
    WHEN SUM(p.amount) >= 150 THEN 'Platinum'
    WHEN SUM(p.amount) >= 100 THEN 'Gold'
    WHEN SUM(p.amount) >= 50  THEN 'Silver'
    ELSE 'Bronze'
  END AS tier
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC
LIMIT 20;
\`\`\`

---

## Activity Segmentation

\`\`\`sql
-- Classify customers by rental frequency
SELECT
  customer_id,
  COUNT(*) AS total_rentals,
  CASE
    WHEN COUNT(*) >= 40 THEN 'Power User'
    WHEN COUNT(*) >= 20 THEN 'Regular'
    WHEN COUNT(*) >= 5  THEN 'Casual'
    ELSE 'One-time'
  END AS activity_segment
FROM rental
GROUP BY customer_id
ORDER BY total_rentals DESC
LIMIT 20;
\`\`\`

---

## Combining Segmentation with Conditional Aggregation

\`\`\`sql
-- Count customers per tier
SELECT
  tier,
  COUNT(*) AS customers
FROM (
  SELECT
    customer_id,
    CASE
      WHEN SUM(amount) >= 150 THEN 'Platinum'
      WHEN SUM(amount) >= 100 THEN 'Gold'
      WHEN SUM(amount) >= 50  THEN 'Silver'
      ELSE 'Bronze'
    END AS tier
  FROM payment
  GROUP BY customer_id
)
GROUP BY tier
ORDER BY customers DESC;
\`\`\`
    `,
    contentAr: `
## تصنيف العملاء

يعني تصنيف العملاء تجميعهم حسب سلوكهم — مستوى الإنفاق، وتكرار الإيجار، أو حداثة النشاط. يحوّل CASE WHEN الأرقام الخام إلى تصنيفات ذات معنى.

---

## شريحة الإنفاق

\`\`\`sql
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name AS customer,
  SUM(p.amount) AS total_spent,
  CASE
    WHEN SUM(p.amount) >= 150 THEN 'بلاتيني'
    WHEN SUM(p.amount) >= 100 THEN 'ذهبي'
    WHEN SUM(p.amount) >= 50  THEN 'فضي'
    ELSE 'برونزي'
  END AS tier
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC
LIMIT 20;
\`\`\`

---

## تصنيف النشاط

\`\`\`sql
-- تصنيف العملاء حسب تكرار الإيجار
SELECT
  customer_id,
  COUNT(*) AS total_rentals,
  CASE
    WHEN COUNT(*) >= 40 THEN 'مستخدم نشط'
    WHEN COUNT(*) >= 20 THEN 'منتظم'
    WHEN COUNT(*) >= 5  THEN 'عرضي'
    ELSE 'لمرة واحدة'
  END AS activity_segment
FROM rental
GROUP BY customer_id
ORDER BY total_rentals DESC
LIMIT 20;
\`\`\`

---

## دمج التصنيف مع التجميع الشرطي

\`\`\`sql
-- عدد العملاء في كل شريحة
SELECT
  tier,
  COUNT(*) AS customers
FROM (
  SELECT
    customer_id,
    CASE
      WHEN SUM(amount) >= 150 THEN 'Platinum'
      WHEN SUM(amount) >= 100 THEN 'Gold'
      WHEN SUM(amount) >= 50  THEN 'Silver'
      ELSE 'Bronze'
    END AS tier
  FROM payment
  GROUP BY customer_id
)
GROUP BY tier
ORDER BY customers DESC;
\`\`\`
    `,
    example: `SELECT
  customer_id,
  SUM(amount) AS total_spent,
  CASE
    WHEN SUM(amount) >= 150 THEN 'Platinum'
    WHEN SUM(amount) >= 100 THEN 'Gold'
    WHEN SUM(amount) >= 50  THEN 'Silver'
    ELSE 'Bronze'
  END AS tier
FROM payment
GROUP BY customer_id
ORDER BY total_spent DESC
LIMIT 20;`,
    exercises: [
      {
        id: 1,
        question: "Classify each film's rental_rate into a price tier: 'Budget' (≤ 1.99), 'Standard' (≤ 3.99), 'Premium' (> 3.99). Show title, rental_rate, and price_tier. Order by rental_rate DESC.",
        questionAr: "صنّف سعر إيجار كل فيلم: 'Budget' (≤ 1.99) و'Standard' (≤ 3.99) و'Premium' (> 3.99). أظهر title وrental_rate وprice_tier. رتّب حسب rental_rate DESC.",
        hint: "SELECT title, rental_rate, CASE WHEN rental_rate <= 1.99 THEN 'Budget' WHEN rental_rate <= 3.99 THEN 'Standard' ELSE 'Premium' END AS price_tier FROM film ORDER BY rental_rate DESC",
        hintAr: "SELECT title, rental_rate, CASE WHEN rental_rate <= 1.99 THEN 'Budget' WHEN rental_rate <= 3.99 THEN 'Standard' ELSE 'Premium' END AS price_tier FROM film ORDER BY rental_rate DESC",
        expectedQuery: "SELECT title, rental_rate, CASE WHEN rental_rate <= 1.99 THEN 'Budget' WHEN rental_rate <= 3.99 THEN 'Standard' ELSE 'Premium' END AS price_tier FROM film ORDER BY rental_rate DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CASE/i.test(q) && /price_tier/i.test(q),
      },
      {
        id: 2,
        question: "Count how many customers fall in each rental-frequency segment: 'Power User' (≥ 40 rentals), 'Regular' (≥ 20), 'Casual' (≥ 5), 'One-time' (< 5). Show segment and customer_count.",
        questionAr: "احسب عدد العملاء في كل شريحة تكرار: 'Power User' (≥ 40 إيجاراً)، 'Regular' (≥ 20)، 'Casual' (≥ 5)، 'One-time' (< 5). أظهر segment وcustomer_count.",
        hint: "Use a subquery that segments each customer, then GROUP BY segment in the outer query",
        hintAr: "استخدم استعلاماً فرعياً يصنّف كل عميل، ثم GROUP BY segment في الاستعلام الخارجي",
        expectedQuery: "SELECT segment, COUNT(*) AS customer_count FROM (SELECT customer_id, CASE WHEN COUNT(*) >= 40 THEN 'Power User' WHEN COUNT(*) >= 20 THEN 'Regular' WHEN COUNT(*) >= 5 THEN 'Casual' ELSE 'One-time' END AS segment FROM rental GROUP BY customer_id) GROUP BY segment ORDER BY customer_count DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /CASE/i.test(q) && /GROUP\s+BY/i.test(q),
      },
    ],
  },

  {
    id: 113,
    title: 'Store Performance Comparison',
    titleAr: 'مقارنة أداء المتاجر',
    description: 'Compare the two store locations across revenue, rental volume, customer counts, and staff performance.',
    descriptionAr: 'قارن بين موقعَي المتجرين من حيث الإيراد وحجم الإيجارات وأعداد العملاء وأداء الموظفين.',
    content: `
## Two Stores, One Dataset

The DVD Rental database has exactly **2 stores**. Comparing them is a practical exercise in multi-table JOINs and GROUP BY.

---

## Revenue per Store

\`\`\`sql
SELECT
  p.staff_id,
  s.store_id,
  COUNT(p.payment_id)    AS transactions,
  ROUND(SUM(p.amount), 2) AS revenue
FROM payment p
JOIN staff s ON p.staff_id = s.staff_id
GROUP BY p.staff_id, s.store_id
ORDER BY revenue DESC;
\`\`\`

---

## Customers per Store

\`\`\`sql
SELECT
  store_id,
  COUNT(*) AS customers,
  SUM(CASE WHEN active = 1 THEN 1 ELSE 0 END) AS active_customers
FROM customer
GROUP BY store_id;
\`\`\`

---

## Rental Volume per Store

\`\`\`sql
SELECT
  i.store_id,
  COUNT(r.rental_id) AS total_rentals
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
GROUP BY i.store_id;
\`\`\`

---

## Full Store Report (CTE)

\`\`\`sql
WITH store_revenue AS (
  SELECT s.store_id, ROUND(SUM(p.amount), 2) AS revenue
  FROM payment p
  JOIN staff s ON p.staff_id = s.staff_id
  GROUP BY s.store_id
),
store_rentals AS (
  SELECT i.store_id, COUNT(*) AS rentals
  FROM rental r
  JOIN inventory i ON r.inventory_id = i.inventory_id
  GROUP BY i.store_id
)
SELECT
  sr.store_id,
  sr.revenue,
  rn.rentals,
  ROUND(sr.revenue / rn.rentals, 2) AS revenue_per_rental
FROM store_revenue sr
JOIN store_rentals rn ON sr.store_id = rn.store_id;
\`\`\`
    `,
    contentAr: `
## متجران، مجموعة بيانات واحدة

تحتوي قاعدة بيانات DVD على **متجرين فقط**. مقارنتهما تمرين عملي على JOINs متعددة وGROUP BY.

---

## الإيراد لكل متجر

\`\`\`sql
SELECT
  p.staff_id,
  s.store_id,
  COUNT(p.payment_id)    AS transactions,
  ROUND(SUM(p.amount), 2) AS revenue
FROM payment p
JOIN staff s ON p.staff_id = s.staff_id
GROUP BY p.staff_id, s.store_id
ORDER BY revenue DESC;
\`\`\`

---

## العملاء لكل متجر

\`\`\`sql
SELECT
  store_id,
  COUNT(*) AS customers,
  SUM(CASE WHEN active = 1 THEN 1 ELSE 0 END) AS active_customers
FROM customer
GROUP BY store_id;
\`\`\`

---

## حجم الإيجارات لكل متجر

\`\`\`sql
SELECT
  i.store_id,
  COUNT(r.rental_id) AS total_rentals
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
GROUP BY i.store_id;
\`\`\`

---

## تقرير المتجر الكامل (CTE)

\`\`\`sql
WITH store_revenue AS (
  SELECT s.store_id, ROUND(SUM(p.amount), 2) AS revenue
  FROM payment p
  JOIN staff s ON p.staff_id = s.staff_id
  GROUP BY s.store_id
),
store_rentals AS (
  SELECT i.store_id, COUNT(*) AS rentals
  FROM rental r
  JOIN inventory i ON r.inventory_id = i.inventory_id
  GROUP BY i.store_id
)
SELECT
  sr.store_id,
  sr.revenue,
  rn.rentals,
  ROUND(sr.revenue / rn.rentals, 2) AS revenue_per_rental
FROM store_revenue sr
JOIN store_rentals rn ON sr.store_id = rn.store_id;
\`\`\`
    `,
    example: `SELECT
  store_id,
  COUNT(*) AS customers,
  SUM(CASE WHEN active = 1 THEN 1 ELSE 0 END) AS active_customers
FROM customer
GROUP BY store_id;`,
    exercises: [
      {
        id: 1,
        question: 'Compare total rental count and total revenue per store_id. Join rental → inventory for store_id, join payment for revenue. Show store_id, total_rentals, and total_revenue.',
        questionAr: 'قارن إجمالي عدد الإيجارات وإجمالي الإيراد لكل store_id. ربط rental → inventory للحصول على store_id، وربط payment للإيراد. أظهر store_id وtotal_rentals وtotal_revenue.',
        hint: 'JOIN rental r → inventory i (for store_id) and JOIN payment p ON r.rental_id = p.rental_id, then GROUP BY i.store_id',
        hintAr: 'JOIN rental r → inventory i (للحصول على store_id) ثم JOIN payment p ON r.rental_id = p.rental_id، ثم GROUP BY i.store_id',
        expectedQuery: 'SELECT i.store_id, COUNT(r.rental_id) AS total_rentals, ROUND(SUM(p.amount), 2) AS total_revenue FROM rental r JOIN inventory i ON r.inventory_id = i.inventory_id JOIN payment p ON r.rental_id = p.rental_id GROUP BY i.store_id ORDER BY i.store_id',
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /GROUP\s+BY/i.test(q) && /store_id/i.test(q),
      },
      {
        id: 2,
        question: "Using a CTE named 'store_stats', calculate for each store_id: total payments, total amount, and average amount per payment. Then SELECT all from the CTE.",
        questionAr: "باستخدام CTE اسمه 'store_stats'، احسب لكل store_id: إجمالي الدفعات والمبلغ الإجمالي ومتوسط المبلغ لكل دفعة. ثم اختر كل شيء من الـ CTE.",
        hint: "WITH store_stats AS (SELECT s.store_id, COUNT(*) AS payments, ROUND(SUM(p.amount),2) AS total, ROUND(AVG(p.amount),2) AS avg_payment FROM payment p JOIN staff s ON p.staff_id = s.staff_id GROUP BY s.store_id) SELECT * FROM store_stats",
        hintAr: "WITH store_stats AS (SELECT s.store_id, COUNT(*) AS payments, ROUND(SUM(p.amount),2) AS total, ROUND(AVG(p.amount),2) AS avg_payment FROM payment p JOIN staff s ON p.staff_id = s.staff_id GROUP BY s.store_id) SELECT * FROM store_stats",
        expectedQuery: "WITH store_stats AS (SELECT s.store_id, COUNT(*) AS payments, ROUND(SUM(p.amount),2) AS total, ROUND(AVG(p.amount),2) AS avg_payment FROM payment p JOIN staff s ON p.staff_id = s.staff_id GROUP BY s.store_id) SELECT * FROM store_stats",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /WITH\s+store_stats/i.test(q),
      },
    ],
  },

  {
    id: 114,
    title: 'NULL Handling in the DVD Schema',
    titleAr: 'التعامل مع NULL في قاعدة بيانات DVD',
    description: 'Apply COALESCE, NULLIF, and IS NULL to real missing-data scenarios in the DVD Rental schema.',
    descriptionAr: 'طبّق COALESCE وNULLIF وIS NULL على سيناريوهات البيانات المفقودة الحقيقية في قاعدة بيانات DVD.',
    content: `
## NULL in the DVD Schema

The DVD Rental database has several real-world NULL scenarios you must handle gracefully.

---

## return_date — Rentals Not Yet Returned

\`\`\`sql
-- Count returned vs still out
SELECT
  CASE WHEN return_date IS NULL THEN 'Still Out' ELSE 'Returned' END AS status,
  COUNT(*) AS count
FROM rental
GROUP BY status;
\`\`\`

---

## COALESCE for Display

\`\`\`sql
-- Show return status cleanly
SELECT
  rental_id,
  rental_date,
  COALESCE(CAST(return_date AS TEXT), 'Not returned') AS return_status
FROM rental
ORDER BY rental_date DESC
LIMIT 15;
\`\`\`

---

## original_language_id — Often NULL

Most films in the dataset have a NULL \`original_language_id\` (only the spoken \`language_id\` is set):

\`\`\`sql
SELECT
  f.title,
  l.name AS language,
  COALESCE(ol.name, 'Same as spoken') AS original_language
FROM film f
JOIN language l ON f.language_id = l.language_id
LEFT JOIN language ol ON f.original_language_id = ol.language_id
LIMIT 15;
\`\`\`

---

## NULLIF to Avoid Division by Zero

\`\`\`sql
-- Revenue per rental copy — guard against 0 inventory
SELECT
  f.title,
  COUNT(DISTINCT i.inventory_id) AS copies,
  ROUND(SUM(p.amount), 2) AS revenue,
  ROUND(SUM(p.amount) / NULLIF(COUNT(DISTINCT i.inventory_id), 0), 2) AS revenue_per_copy
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY f.film_id, f.title
ORDER BY revenue_per_copy DESC
LIMIT 10;
\`\`\`
    `,
    contentAr: `
## NULL في قاعدة بيانات DVD

تحتوي قاعدة بيانات DVD على عدة سيناريوهات حقيقية لـ NULL يجب التعامل معها بعناية.

---

## return_date — الإيجارات غير المُعادة بعد

\`\`\`sql
-- عدّ المُعادة مقابل لا تزال خارجة
SELECT
  CASE WHEN return_date IS NULL THEN 'لم تُعَد' ELSE 'مُعادة' END AS status,
  COUNT(*) AS count
FROM rental
GROUP BY status;
\`\`\`

---

## COALESCE للعرض

\`\`\`sql
-- إظهار حالة الإعادة بشكل نظيف
SELECT
  rental_id,
  rental_date,
  COALESCE(CAST(return_date AS TEXT), 'لم تُعَد') AS return_status
FROM rental
ORDER BY rental_date DESC
LIMIT 15;
\`\`\`

---

## original_language_id — غالباً NULL

معظم الأفلام في مجموعة البيانات لها \`original_language_id\` بقيمة NULL (فقط \`language_id\` المنطوق مضبوط):

\`\`\`sql
SELECT
  f.title,
  l.name AS language,
  COALESCE(ol.name, 'نفس اللغة المنطوقة') AS original_language
FROM film f
JOIN language l ON f.language_id = l.language_id
LEFT JOIN language ol ON f.original_language_id = ol.language_id
LIMIT 15;
\`\`\`

---

## NULLIF لتجنب القسمة على صفر

\`\`\`sql
-- الإيراد لكل نسخة — حماية من 0 في المخزون
SELECT
  f.title,
  COUNT(DISTINCT i.inventory_id) AS copies,
  ROUND(SUM(p.amount), 2) AS revenue,
  ROUND(SUM(p.amount) / NULLIF(COUNT(DISTINCT i.inventory_id), 0), 2) AS revenue_per_copy
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY f.film_id, f.title
ORDER BY revenue_per_copy DESC
LIMIT 10;
\`\`\`
    `,
    example: `SELECT
  rental_id,
  rental_date,
  COALESCE(CAST(return_date AS TEXT), 'Not returned') AS return_status
FROM rental
ORDER BY rental_date DESC
LIMIT 15;`,
    exercises: [
      {
        id: 1,
        question: "Count how many rentals have return_date IS NULL (still out) vs IS NOT NULL (returned). Show status ('Still Out' / 'Returned') and count.",
        questionAr: "احسب عدد الإيجارات التي return_date فيها IS NULL (لم تُعَد) مقابل IS NOT NULL (مُعادة). أظهر الحالة ('Still Out' / 'Returned') والعدد.",
        hint: "SELECT CASE WHEN return_date IS NULL THEN 'Still Out' ELSE 'Returned' END AS status, COUNT(*) AS count FROM rental GROUP BY status",
        hintAr: "SELECT CASE WHEN return_date IS NULL THEN 'Still Out' ELSE 'Returned' END AS status, COUNT(*) AS count FROM rental GROUP BY status",
        expectedQuery: "SELECT CASE WHEN return_date IS NULL THEN 'Still Out' ELSE 'Returned' END AS status, COUNT(*) AS count FROM rental GROUP BY status",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /IS\s+NULL/i.test(q) && /CASE/i.test(q),
      },
      {
        id: 2,
        question: "For each film, show title, language name (from the language table), and the original language name — using COALESCE to display 'Not specified' when original_language_id is NULL. Limit to 20 rows.",
        questionAr: "لكل فيلم، أظهر العنوان واسم اللغة (من جدول language) واسم اللغة الأصلية — مستخدماً COALESCE لعرض 'Not specified' عندما يكون original_language_id هو NULL. اعرض 20 صفاً فقط.",
        hint: "JOIN film → language l ON f.language_id = l.language_id, LEFT JOIN language ol ON f.original_language_id = ol.language_id, COALESCE(ol.name, 'Not specified')",
        hintAr: "JOIN film → language l ON f.language_id = l.language_id، LEFT JOIN language ol ON f.original_language_id = ol.language_id، COALESCE(ol.name, 'Not specified')",
        expectedQuery: "SELECT f.title, l.name AS language, COALESCE(ol.name, 'Not specified') AS original_language FROM film f JOIN language l ON f.language_id = l.language_id LEFT JOIN language ol ON f.original_language_id = ol.language_id LIMIT 20",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /COALESCE/i.test(q) && /LEFT\s+JOIN/i.test(q),
      },
    ],
  },
];

export const dvdLessons: Lesson[] = [...dvdLessonsBase, ...dvdLessonsP2];
