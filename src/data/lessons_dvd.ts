import { Lesson } from '../types';

export const dvdLessons: Lesson[] = [
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
];
