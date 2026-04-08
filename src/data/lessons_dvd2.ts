import { Lesson } from '../types';

export const dvdLessonsP2: Lesson[] = [
  // ── Level 6 — Intermediate Patterns ────────────────────────────────────────
  {
    id: 115,
    title: 'Text Patterns & LIKE',
    titleAr: 'أنماط النصوص والبحث بـ LIKE',
    description: 'Search film titles and descriptions using wildcard patterns.',
    descriptionAr: 'البحث في عناوين الأفلام ووصفها باستخدام أنماط البدل.',
    example: `-- % matches any sequence of characters
-- _ matches exactly one character
SELECT title, rating, rental_rate
FROM film
WHERE title LIKE '%LOVE%'
ORDER BY title;`,
    content: `## Text Patterns & LIKE

The \`LIKE\` operator lets you search for text patterns using two wildcards:

| Wildcard | Meaning |
|----------|---------|
| \`%\` | Any sequence of zero or more characters |
| \`_\` | Exactly one character |

\`\`\`sql
-- Titles containing "LOVE" anywhere
SELECT title FROM film
WHERE title LIKE '%LOVE%';

-- Titles starting with "THE"
SELECT title FROM film
WHERE title LIKE 'THE%';

-- Titles ending with "BACK"
SELECT title FROM film
WHERE title LIKE '%BACK';

-- 5-character titles starting with "A"
SELECT title FROM film
WHERE title LIKE 'A____';
\`\`\`

> In SQLite, \`LIKE\` is **case-insensitive** for ASCII letters by default.

## Combining LIKE with AND / OR

\`\`\`sql
-- Action films with "WAR" in the title
SELECT f.title, c.name AS category
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE f.title LIKE '%WAR%'
  AND c.name = 'Action';
\`\`\`

## NOT LIKE

\`\`\`sql
-- Exclude films with "THE" in the title
SELECT title FROM film
WHERE title NOT LIKE 'THE%'
ORDER BY title
LIMIT 10;
\`\`\`
`,
    contentAr: `## أنماط النصوص والبحث بـ LIKE

يتيح لك مُعامل \`LIKE\` البحث عن أنماط نصية باستخدام حرفَي بدل:

| حرف البدل | المعنى |
|-----------|--------|
| \`%\` | أي تسلسل من صفر أو أكثر من الأحرف |
| \`_\` | حرف واحد بالضبط |

\`\`\`sql
-- عناوين تحتوي على "LOVE" في أي مكان
SELECT title FROM film
WHERE title LIKE '%LOVE%';

-- عناوين تبدأ بـ "THE"
SELECT title FROM film
WHERE title LIKE 'THE%';

-- عناوين تنتهي بـ "BACK"
SELECT title FROM film
WHERE title LIKE '%BACK';

-- عناوين من 5 أحرف تبدأ بـ "A"
SELECT title FROM film
WHERE title LIKE 'A____';
\`\`\`

> في SQLite، يكون \`LIKE\` **غير حساس لحالة الأحرف** للأحرف اللاتينية بشكل افتراضي.

## الجمع بين LIKE و AND / OR

\`\`\`sql
-- أفلام أكشن تحتوي على "WAR" في العنوان
SELECT f.title, c.name AS category
FROM film f
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
WHERE f.title LIKE '%WAR%'
  AND c.name = 'Action';
\`\`\`

## NOT LIKE

\`\`\`sql
-- استبعاد الأفلام التي تحتوي على "THE" في البداية
SELECT title FROM film
WHERE title NOT LIKE 'THE%'
ORDER BY title
LIMIT 10;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Find all films whose title starts with 'ACE'. Show title and length, ordered by title.",
        questionAr: "ابحث عن جميع الأفلام التي يبدأ عنوانها بـ 'ACE'. اعرض العنوان والمدة، مرتبةً حسب العنوان.",
        hint: "Use LIKE 'ACE%'",
        hintAr: "استخدم LIKE 'ACE%'",
        expectedQuery: "SELECT title, length FROM film WHERE title LIKE 'ACE%' ORDER BY title",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LIKE/i.test(q) && /ACE%/i.test(q),
      },
      {
        id: 2,
        question: "Find films whose title ends with 'GRAIL'. Show title and rating.",
        questionAr: "ابحث عن الأفلام التي ينتهي عنوانها بـ 'GRAIL'. اعرض العنوان والتصنيف.",
        hint: "Use LIKE '%GRAIL'",
        hintAr: "استخدم LIKE '%GRAIL'",
        expectedQuery: "SELECT title, rating FROM film WHERE title LIKE '%GRAIL'",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LIKE/i.test(q) && /%GRAIL/i.test(q),
      },
    ],
  },

  {
    id: 116,
    title: 'Aggregate Functions Deep Dive',
    titleAr: 'استكشاف دوال التجميع المتقدم',
    description: 'Master multi-column GROUP BY, HAVING, and combining aggregate functions.',
    descriptionAr: 'إتقان GROUP BY متعدد الأعمدة وHAVING وتركيب دوال التجميع.',
    example: `-- Film stats by rating, only ratings with 100+ films
SELECT
  rating,
  COUNT(*)               AS total_films,
  ROUND(AVG(rental_rate), 2) AS avg_rate,
  MIN(length)            AS shortest,
  MAX(length)            AS longest
FROM film
GROUP BY rating
HAVING COUNT(*) > 100
ORDER BY avg_rate DESC;`,
    content: `## Aggregate Functions Deep Dive

You already know \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, and \`MAX\`. This lesson shows how to combine them powerfully.

## Multi-Column GROUP BY

You can group by more than one column at a time:

\`\`\`sql
-- Revenue broken down by store AND rating
SELECT
  i.store_id,
  f.rating,
  COUNT(r.rental_id) AS rentals,
  SUM(p.amount) AS revenue
FROM payment p
JOIN rental r ON p.rental_id = r.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
GROUP BY i.store_id, f.rating
ORDER BY i.store_id, revenue DESC;
\`\`\`

## HAVING with Complex Conditions

\`HAVING\` filters groups *after* aggregation — unlike \`WHERE\` which filters rows *before*:

\`\`\`sql
-- Categories with more than 50 films AND average rate above 3.00
SELECT
  c.name,
  COUNT(fc.film_id) AS film_count,
  ROUND(AVG(f.rental_rate), 2) AS avg_rate
FROM category c
JOIN film_category fc ON c.category_id = fc.category_id
JOIN film f ON fc.film_id = f.film_id
GROUP BY c.name
HAVING COUNT(fc.film_id) > 50 AND AVG(f.rental_rate) > 3.00
ORDER BY film_count DESC;
\`\`\`

## COUNT DISTINCT

\`COUNT(DISTINCT col)\` counts unique values only:

\`\`\`sql
-- How many distinct films were rented per store?
SELECT
  i.store_id,
  COUNT(DISTINCT i.film_id) AS unique_films_rented
FROM inventory i
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY i.store_id;
\`\`\`
`,
    contentAr: `## استكشاف دوال التجميع المتقدم

أنت تعرف بالفعل \`COUNT\` و\`SUM\` و\`AVG\` و\`MIN\` و\`MAX\`. يوضح هذا الدرس كيفية تركيبها بقوة.

## GROUP BY متعدد الأعمدة

يمكنك التجميع بأكثر من عمود في آنٍ واحد:

\`\`\`sql
-- الإيرادات مُقسَّمة حسب المتجر والتصنيف
SELECT
  i.store_id,
  f.rating,
  COUNT(r.rental_id) AS rentals,
  SUM(p.amount) AS revenue
FROM payment p
JOIN rental r ON p.rental_id = r.rental_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
GROUP BY i.store_id, f.rating
ORDER BY i.store_id, revenue DESC;
\`\`\`

## HAVING بشروط مركّبة

يُصفّي \`HAVING\` المجموعات *بعد* التجميع — على عكس \`WHERE\` الذي يُصفّي الصفوف *قبل*:

\`\`\`sql
-- الفئات التي تضم أكثر من 50 فيلماً ومتوسط سعر أعلى من 3.00
SELECT
  c.name,
  COUNT(fc.film_id) AS film_count,
  ROUND(AVG(f.rental_rate), 2) AS avg_rate
FROM category c
JOIN film_category fc ON c.category_id = fc.category_id
JOIN film f ON fc.film_id = f.film_id
GROUP BY c.name
HAVING COUNT(fc.film_id) > 50 AND AVG(f.rental_rate) > 3.00
ORDER BY film_count DESC;
\`\`\`

## COUNT DISTINCT

يعدّ \`COUNT(DISTINCT col)\` القيم الفريدة فقط:

\`\`\`sql
-- كم عدد الأفلام الفريدة التي استُؤجرت في كل متجر؟
SELECT
  i.store_id,
  COUNT(DISTINCT i.film_id) AS unique_films_rented
FROM inventory i
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY i.store_id;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Count films per rental_duration value. Show only rental durations with more than 200 films, ordered by count descending.",
        questionAr: "احسب عدد الأفلام لكل قيمة rental_duration. اعرض فقط المُدد التي تضم أكثر من 200 فيلم، مرتبةً تنازليًا.",
        hint: "GROUP BY rental_duration, HAVING COUNT(*) > 200",
        hintAr: "GROUP BY rental_duration، HAVING COUNT(*) > 200",
        expectedQuery: "SELECT rental_duration, COUNT(*) AS film_count FROM film GROUP BY rental_duration HAVING COUNT(*) > 200 ORDER BY film_count DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /GROUP\s+BY/i.test(q) && /HAVING/i.test(q) && /rental_duration/i.test(q),
      },
      {
        id: 2,
        question: "For each rating, calculate total replacement_cost and average length. Order by total replacement cost descending.",
        questionAr: "لكل تصنيف، احسب إجمالي replacement_cost ومتوسط الطول. رتّب تنازليًا حسب إجمالي تكلفة الاستبدال.",
        hint: "GROUP BY rating, use SUM and AVG",
        hintAr: "GROUP BY rating، استخدم SUM وAVG",
        expectedQuery: "SELECT rating, SUM(replacement_cost) AS total_replacement, ROUND(AVG(length), 2) AS avg_length FROM film GROUP BY rating ORDER BY total_replacement DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /GROUP\s+BY/i.test(q) && /SUM/i.test(q) && /AVG/i.test(q) && /rating/i.test(q),
      },
    ],
  },

  {
    id: 117,
    title: 'Subqueries',
    titleAr: 'الاستعلامات الفرعية',
    description: 'Use subqueries in WHERE, HAVING, and SELECT to build powerful nested logic.',
    descriptionAr: 'استخدام الاستعلامات الفرعية في WHERE وHAVING وSELECT لبناء منطق متداخل.',
    example: `-- Films with rental_rate above the overall average
SELECT title, rental_rate
FROM film
WHERE rental_rate > (SELECT AVG(rental_rate) FROM film)
ORDER BY rental_rate DESC
LIMIT 15;`,
    content: `## Subqueries

A **subquery** is a \`SELECT\` statement nested inside another query. It is evaluated first, and its result is used by the outer query.

## Subquery in WHERE

\`\`\`sql
-- Films priced above the average rental rate
SELECT title, rental_rate
FROM film
WHERE rental_rate > (SELECT AVG(rental_rate) FROM film)
ORDER BY rental_rate DESC;
\`\`\`

## Subquery in HAVING

\`\`\`sql
-- Customers whose total payments beat the per-customer average
SELECT
  customer_id,
  SUM(amount) AS total_paid
FROM payment
GROUP BY customer_id
HAVING SUM(amount) > (
  SELECT AVG(total) FROM (
    SELECT SUM(amount) AS total FROM payment GROUP BY customer_id
  )
)
ORDER BY total_paid DESC
LIMIT 10;
\`\`\`

## Scalar Subquery in SELECT

A scalar subquery returns exactly one value and can appear in the \`SELECT\` list:

\`\`\`sql
-- Each film's rental rate compared to the average
SELECT
  title,
  rental_rate,
  ROUND(rental_rate - (SELECT AVG(rental_rate) FROM film), 2) AS diff_from_avg
FROM film
ORDER BY diff_from_avg DESC
LIMIT 10;
\`\`\`

## Subquery vs JOIN

Both can answer the same question — choose based on readability. Subqueries are great when you need a single reference value; JOINs are better for combining full rows.
`,
    contentAr: `## الاستعلامات الفرعية

**الاستعلام الفرعي** هو جملة \`SELECT\` متداخلة داخل استعلام آخر. يُنفَّذ أولًا، وتُستخدم نتيجته في الاستعلام الخارجي.

## استعلام فرعي في WHERE

\`\`\`sql
-- الأفلام بسعر إيجار أعلى من المتوسط العام
SELECT title, rental_rate
FROM film
WHERE rental_rate > (SELECT AVG(rental_rate) FROM film)
ORDER BY rental_rate DESC;
\`\`\`

## استعلام فرعي في HAVING

\`\`\`sql
-- العملاء الذين يتجاوز مجموع مدفوعاتهم متوسط مدفوعات العميل
SELECT
  customer_id,
  SUM(amount) AS total_paid
FROM payment
GROUP BY customer_id
HAVING SUM(amount) > (
  SELECT AVG(total) FROM (
    SELECT SUM(amount) AS total FROM payment GROUP BY customer_id
  )
)
ORDER BY total_paid DESC
LIMIT 10;
\`\`\`

## الاستعلام الفرعي القيمي في SELECT

يُرجع الاستعلام الفرعي القيمي قيمةً واحدة فقط ويمكن وضعه في قائمة \`SELECT\`:

\`\`\`sql
-- سعر إيجار كل فيلم مقارنةً بالمتوسط
SELECT
  title,
  rental_rate,
  ROUND(rental_rate - (SELECT AVG(rental_rate) FROM film), 2) AS diff_from_avg
FROM film
ORDER BY diff_from_avg DESC
LIMIT 10;
\`\`\`

## الاستعلام الفرعي مقابل JOIN

كلاهما يمكنه الإجابة على نفس السؤال — اختر بناءً على سهولة القراءة. الاستعلامات الفرعية رائعة حين تحتاج إلى قيمة مرجعية واحدة؛ أما JOINs فأفضل لدمج صفوف كاملة.
`,
    exercises: [
      {
        id: 1,
        question: "Find films with a length greater than the average film length. Show title and length, ordered by length descending. Limit to 10.",
        questionAr: "ابحث عن الأفلام ذات المدة الأطول من متوسط مدة الأفلام. اعرض العنوان والمدة، مرتبةً تنازليًا. حدّد النتائج بـ 10.",
        hint: "WHERE length > (SELECT AVG(length) FROM film)",
        hintAr: "WHERE length > (SELECT AVG(length) FROM film)",
        expectedQuery: "SELECT title, length FROM film WHERE length > (SELECT AVG(length) FROM film) ORDER BY length DESC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SELECT.*AVG.*length.*FROM\s+film/i.test(q),
      },
      {
        id: 2,
        question: "Show each film's title and rental_rate, plus a column 'diff_from_avg' showing how much it differs from the average rental rate (rounded to 2 decimals). Order by diff_from_avg descending, limit 10.",
        questionAr: "اعرض عنوان كل فيلم وسعر إيجاره، بالإضافة إلى عمود 'diff_from_avg' يُظهر الفرق عن متوسط سعر الإيجار (مقرَّبًا لمنزلتين). رتّب تنازليًا، حدّد بـ 10.",
        hint: "Use rental_rate - (SELECT AVG(rental_rate) FROM film) in SELECT",
        hintAr: "استخدم rental_rate - (SELECT AVG(rental_rate) FROM film) في SELECT",
        expectedQuery: "SELECT title, rental_rate, ROUND(rental_rate - (SELECT AVG(rental_rate) FROM film), 2) AS diff_from_avg FROM film ORDER BY diff_from_avg DESC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SELECT.*AVG.*rental_rate/i.test(q) && /diff_from_avg/i.test(q),
      },
    ],
  },

  {
    id: 118,
    title: 'EXISTS & NOT EXISTS',
    titleAr: 'EXISTS و NOT EXISTS',
    description: 'Find rows that do or do not have a matching record in another table.',
    descriptionAr: 'البحث عن الصفوف التي لها أو ليس لها سجل مطابق في جدول آخر.',
    example: `-- Films that have NEVER been rented
SELECT f.title
FROM film f
WHERE NOT EXISTS (
  SELECT 1
  FROM inventory i
  JOIN rental r ON i.inventory_id = r.inventory_id
  WHERE i.film_id = f.film_id
)
ORDER BY f.title
LIMIT 20;`,
    content: `## EXISTS & NOT EXISTS

\`EXISTS\` tests whether a subquery returns *any* rows. It's often faster than \`IN\` for large datasets because it stops as soon as a match is found.

## EXISTS

\`\`\`sql
-- Films that ARE in inventory (at least one copy exists)
SELECT f.title
FROM film f
WHERE EXISTS (
  SELECT 1
  FROM inventory i
  WHERE i.film_id = f.film_id
)
ORDER BY f.title
LIMIT 10;
\`\`\`

## NOT EXISTS

\`\`\`sql
-- Customers who have NEVER made a payment
SELECT c.first_name, c.last_name, c.email
FROM customer c
WHERE NOT EXISTS (
  SELECT 1
  FROM payment p
  WHERE p.customer_id = c.customer_id
);
\`\`\`

## EXISTS vs IN

Both produce the same result — \`EXISTS\` is preferred when the inner table is large:

\`\`\`sql
-- These are equivalent:
-- Using IN:
SELECT title FROM film
WHERE film_id IN (SELECT film_id FROM inventory);

-- Using EXISTS:
SELECT title FROM film f
WHERE EXISTS (
  SELECT 1 FROM inventory i WHERE i.film_id = f.film_id
);
\`\`\`

> \`SELECT 1\` inside EXISTS is a convention — the actual value doesn't matter, only whether any row is returned.
`,
    contentAr: `## EXISTS و NOT EXISTS

يختبر \`EXISTS\` ما إذا كان الاستعلام الفرعي يُرجع *أي* صفوف. وهو في الغالب أسرع من \`IN\` للبيانات الكبيرة لأنه يتوقف بمجرد إيجاد تطابق.

## EXISTS

\`\`\`sql
-- الأفلام الموجودة في المستودع (يوجد نسخة واحدة على الأقل)
SELECT f.title
FROM film f
WHERE EXISTS (
  SELECT 1
  FROM inventory i
  WHERE i.film_id = f.film_id
)
ORDER BY f.title
LIMIT 10;
\`\`\`

## NOT EXISTS

\`\`\`sql
-- العملاء الذين لم يسددوا أي دفعة قط
SELECT c.first_name, c.last_name, c.email
FROM customer c
WHERE NOT EXISTS (
  SELECT 1
  FROM payment p
  WHERE p.customer_id = c.customer_id
);
\`\`\`

## EXISTS مقابل IN

كلاهما يُنتج نفس النتيجة — يُفضَّل \`EXISTS\` حين يكون الجدول الداخلي كبيرًا:

\`\`\`sql
-- هذان الاستعلامان متكافئان:
-- باستخدام IN:
SELECT title FROM film
WHERE film_id IN (SELECT film_id FROM inventory);

-- باستخدام EXISTS:
SELECT title FROM film f
WHERE EXISTS (
  SELECT 1 FROM inventory i WHERE i.film_id = f.film_id
);
\`\`\`

> \`SELECT 1\` داخل EXISTS هو اتفاقية — القيمة الفعلية لا تهم، المهم فقط هل يُرجع أي صف.
`,
    exercises: [
      {
        id: 1,
        question: "Find all customers who have made at least one rental. Show first_name, last_name. Use EXISTS.",
        questionAr: "ابحث عن جميع العملاء الذين أجروا إيجارًا واحدًا على الأقل. اعرض الاسم الأول والأخير. استخدم EXISTS.",
        hint: "WHERE EXISTS (SELECT 1 FROM rental r WHERE r.customer_id = c.customer_id)",
        hintAr: "WHERE EXISTS (SELECT 1 FROM rental r WHERE r.customer_id = c.customer_id)",
        expectedQuery: "SELECT first_name, last_name FROM customer c WHERE EXISTS (SELECT 1 FROM rental r WHERE r.customer_id = c.customer_id)",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /EXISTS/i.test(q) && /rental/i.test(q),
      },
      {
        id: 2,
        question: "Find films that are NOT in any inventory (no copies exist in any store). Show title. Use NOT EXISTS.",
        questionAr: "ابحث عن الأفلام التي ليست في أي مستودع (لا توجد نسخ في أي متجر). اعرض العنوان. استخدم NOT EXISTS.",
        hint: "WHERE NOT EXISTS (SELECT 1 FROM inventory i WHERE i.film_id = f.film_id)",
        hintAr: "WHERE NOT EXISTS (SELECT 1 FROM inventory i WHERE i.film_id = f.film_id)",
        expectedQuery: "SELECT title FROM film f WHERE NOT EXISTS (SELECT 1 FROM inventory i WHERE i.film_id = f.film_id) ORDER BY title",
        checkFunction: (result: unknown[], q = '') =>
          /NOT\s+EXISTS/i.test(q) && /inventory/i.test(q),
      },
    ],
  },

  // ── Level 7 — Multi-Table Mastery ───────────────────────────────────────────
  {
    id: 119,
    title: 'Geographic Analysis',
    titleAr: 'التحليل الجغرافي',
    description: 'Join four tables to analyse customers by city and country.',
    descriptionAr: 'ربط أربعة جداول لتحليل العملاء حسب المدينة والدولة.',
    example: `-- Top countries by number of customers
SELECT
  co.country,
  COUNT(DISTINCT c.customer_id) AS customers
FROM customer c
JOIN address  a  ON c.address_id  = a.address_id
JOIN city     ci ON a.city_id     = ci.city_id
JOIN country  co ON ci.country_id = co.country_id
GROUP BY co.country
ORDER BY customers DESC
LIMIT 15;`,
    content: `## Geographic Analysis

The DVD Rental database stores location across four tables:

\`\`\`
customer → address → city → country
\`\`\`

This is a **chain of JOINs** — each table connects to the next via a foreign key.

## The Four-Table Chain

\`\`\`sql
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  a.address,
  ci.city,
  co.country
FROM customer c
JOIN address  a  ON c.address_id  = a.address_id
JOIN city     ci ON a.city_id     = ci.city_id
JOIN country  co ON ci.country_id = co.country_id
ORDER BY co.country, ci.city
LIMIT 20;
\`\`\`

## Aggregating by Location

\`\`\`sql
-- Revenue by country
SELECT
  co.country,
  SUM(p.amount) AS total_revenue,
  COUNT(DISTINCT c.customer_id) AS customers
FROM payment p
JOIN customer c ON p.customer_id = c.customer_id
JOIN address  a  ON c.address_id  = a.address_id
JOIN city     ci ON a.city_id     = ci.city_id
JOIN country  co ON ci.country_id = co.country_id
GROUP BY co.country
ORDER BY total_revenue DESC
LIMIT 10;
\`\`\`

## Filtering by Location

\`\`\`sql
-- Customers from Brazil
SELECT c.first_name, c.last_name, ci.city
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
WHERE co.country = 'Brazil'
ORDER BY ci.city;
\`\`\`
`,
    contentAr: `## التحليل الجغرافي

تخزّن قاعدة بيانات DVD Rental بيانات الموقع عبر أربعة جداول:

\`\`\`
customer → address → city → country
\`\`\`

هذه **سلسلة من JOINs** — كل جدول يتصل بالتالي عبر مفتاح خارجي.

## سلسلة الأربعة جداول

\`\`\`sql
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  a.address,
  ci.city,
  co.country
FROM customer c
JOIN address  a  ON c.address_id  = a.address_id
JOIN city     ci ON a.city_id     = ci.city_id
JOIN country  co ON ci.country_id = co.country_id
ORDER BY co.country, ci.city
LIMIT 20;
\`\`\`

## التجميع حسب الموقع

\`\`\`sql
-- الإيرادات حسب الدولة
SELECT
  co.country,
  SUM(p.amount) AS total_revenue,
  COUNT(DISTINCT c.customer_id) AS customers
FROM payment p
JOIN customer c ON p.customer_id = c.customer_id
JOIN address  a  ON c.address_id  = a.address_id
JOIN city     ci ON a.city_id     = ci.city_id
JOIN country  co ON ci.country_id = co.country_id
GROUP BY co.country
ORDER BY total_revenue DESC
LIMIT 10;
\`\`\`

## التصفية حسب الموقع

\`\`\`sql
-- العملاء من البرازيل
SELECT c.first_name, c.last_name, ci.city
FROM customer c
JOIN address a ON c.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id
JOIN country co ON ci.country_id = co.country_id
WHERE co.country = 'Brazil'
ORDER BY ci.city;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Show each customer's full name (first + last) and their city. Join customer → address → city. Limit to 20 rows ordered by city.",
        questionAr: "اعرض الاسم الكامل لكل عميل (أول + أخير) ومدينته. اربط customer → address → city. حدّد بـ 20 صفًا مرتبًا حسب المدينة.",
        hint: "Join customer, address, city tables using the foreign key chain",
        hintAr: "اربط جداول customer وaddress وcity باستخدام سلسلة المفاتيح الخارجية",
        expectedQuery: "SELECT c.first_name || ' ' || c.last_name AS full_name, ci.city FROM customer c JOIN address a ON c.address_id = a.address_id JOIN city ci ON a.city_id = ci.city_id ORDER BY ci.city LIMIT 20",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /city/i.test(q) && /address/i.test(q) && /customer/i.test(q),
      },
      {
        id: 2,
        question: "Count customers per country. Show only countries with more than 5 customers, ordered by customer count descending.",
        questionAr: "احسب العملاء لكل دولة. اعرض فقط الدول التي تضم أكثر من 5 عملاء، مرتبةً تنازليًا.",
        hint: "Join all 4 tables, GROUP BY country, HAVING COUNT > 5",
        hintAr: "اربط الجداول الأربعة، GROUP BY country، HAVING COUNT > 5",
        expectedQuery: "SELECT co.country, COUNT(DISTINCT c.customer_id) AS customers FROM customer c JOIN address a ON c.address_id = a.address_id JOIN city ci ON a.city_id = ci.city_id JOIN country co ON ci.country_id = co.country_id GROUP BY co.country HAVING COUNT(DISTINCT c.customer_id) > 5 ORDER BY customers DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /country/i.test(q) && /HAVING/i.test(q) && /GROUP\s+BY/i.test(q),
      },
    ],
  },

  {
    id: 120,
    title: 'UNION & UNION ALL',
    titleAr: 'UNION و UNION ALL',
    description: 'Combine results from multiple SELECT statements with UNION and UNION ALL.',
    descriptionAr: 'دمج نتائج استعلامات SELECT متعددة باستخدام UNION وUNION ALL.',
    example: `-- All people (staff + customers) in one list
SELECT first_name, last_name, 'Staff'    AS role FROM staff
UNION
SELECT first_name, last_name, 'Customer' AS role FROM customer
ORDER BY last_name
LIMIT 20;`,
    content: `## UNION & UNION ALL

\`UNION\` stacks the results of two \`SELECT\` statements on top of each other. Both queries must return the **same number of columns** with **compatible types**.

| Operator | Duplicates |
|----------|-----------|
| \`UNION\` | Removes duplicates |
| \`UNION ALL\` | Keeps all rows (faster) |

## Basic UNION

\`\`\`sql
-- All unique first names across staff and customers
SELECT first_name FROM staff
UNION
SELECT first_name FROM customer
ORDER BY first_name;
\`\`\`

## UNION ALL

\`\`\`sql
-- All first names including duplicates
SELECT first_name, 'staff' AS source FROM staff
UNION ALL
SELECT first_name, 'customer' AS source FROM customer
ORDER BY first_name;
\`\`\`

## Practical Use: Combining Film Lists

\`\`\`sql
-- All G and PG-13 rated films in one list
SELECT title, rating FROM film WHERE rating = 'G'
UNION ALL
SELECT title, rating FROM film WHERE rating = 'PG-13'
ORDER BY title
LIMIT 20;
\`\`\`

> Use \`UNION ALL\` when you know there are no duplicates or you want to keep them — it skips the deduplication step and runs faster.
`,
    contentAr: `## UNION و UNION ALL

يُكدّس \`UNION\` نتائج استعلامَي \`SELECT\` فوق بعضهما. يجب أن يُرجع كلا الاستعلامين **نفس عدد الأعمدة** بـ**أنواع متوافقة**.

| المُعامل | التكرارات |
|---------|----------|
| \`UNION\` | يُزيل التكرارات |
| \`UNION ALL\` | يحتفظ بجميع الصفوف (أسرع) |

## UNION الأساسي

\`\`\`sql
-- جميع الأسماء الأولى الفريدة عبر الموظفين والعملاء
SELECT first_name FROM staff
UNION
SELECT first_name FROM customer
ORDER BY first_name;
\`\`\`

## UNION ALL

\`\`\`sql
-- جميع الأسماء الأولى بما في ذلك التكرارات
SELECT first_name, 'staff' AS source FROM staff
UNION ALL
SELECT first_name, 'customer' AS source FROM customer
ORDER BY first_name;
\`\`\`

## الاستخدام العملي: دمج قوائم الأفلام

\`\`\`sql
-- جميع الأفلام ذات التصنيف G وPG-13 في قائمة واحدة
SELECT title, rating FROM film WHERE rating = 'G'
UNION ALL
SELECT title, rating FROM film WHERE rating = 'PG-13'
ORDER BY title
LIMIT 20;
\`\`\`

> استخدم \`UNION ALL\` حين تعلم أنه لا توجد تكرارات أو تريد الاحتفاظ بها — فهو يتجاوز خطوة إزالة التكرارات ويعمل بشكل أسرع.
`,
    exercises: [
      {
        id: 1,
        question: "List all email addresses from both staff and customer tables combined. Use UNION to remove duplicates. Show only the email column, ordered alphabetically.",
        questionAr: "اعرض جميع عناوين البريد الإلكتروني من جدولَي staff وcustomer مجتمعَين. استخدم UNION لإزالة التكرارات. اعرض عمود email فقط، مرتبًا أبجديًا.",
        hint: "SELECT email FROM staff UNION SELECT email FROM customer",
        hintAr: "SELECT email FROM staff UNION SELECT email FROM customer",
        expectedQuery: "SELECT email FROM staff UNION SELECT email FROM customer ORDER BY email",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /UNION/i.test(q) && /staff/i.test(q) && /customer/i.test(q) && /email/i.test(q),
      },
      {
        id: 2,
        question: "Use UNION ALL to combine film titles from 'Horror' and 'Sci-Fi' categories into one list. Show title and category name, ordered by title.",
        questionAr: "استخدم UNION ALL لدمج عناوين أفلام فئتَي 'Horror' و'Sci-Fi' في قائمة واحدة. اعرض العنوان واسم الفئة، مرتبةً حسب العنوان.",
        hint: "Two SELECTs joining film → film_category → category, filtered by category name, combined with UNION ALL",
        hintAr: "استعلامان SELECT يربطان film → film_category → category، مُصفَّيان حسب اسم الفئة، مدموجان بـ UNION ALL",
        expectedQuery: "SELECT f.title, c.name FROM film f JOIN film_category fc ON f.film_id = fc.film_id JOIN category c ON fc.category_id = c.category_id WHERE c.name = 'Horror' UNION ALL SELECT f.title, c.name FROM film f JOIN film_category fc ON f.film_id = fc.film_id JOIN category c ON fc.category_id = c.category_id WHERE c.name = 'Sci-Fi' ORDER BY title",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /UNION\s+ALL/i.test(q) && /Horror/i.test(q) && /Sci-Fi/i.test(q),
      },
    ],
  },

  {
    id: 121,
    title: 'Self Joins',
    titleAr: 'الربط الذاتي (Self Join)',
    description: 'Join a table to itself to find relationships within the same dataset.',
    descriptionAr: 'ربط جدول بنفسه للعثور على العلاقات داخل نفس مجموعة البيانات.',
    example: `-- Actor pairs who appeared in the same film together
SELECT
  a1.first_name || ' ' || a1.last_name AS actor1,
  a2.first_name || ' ' || a2.last_name AS actor2,
  COUNT(fa1.film_id) AS shared_films
FROM film_actor fa1
JOIN film_actor fa2
  ON fa1.film_id = fa2.film_id
 AND fa1.actor_id < fa2.actor_id
JOIN actor a1 ON fa1.actor_id = a1.actor_id
JOIN actor a2 ON fa2.actor_id = a2.actor_id
GROUP BY fa1.actor_id, fa2.actor_id
ORDER BY shared_films DESC
LIMIT 10;`,
    content: `## Self Joins

A **self join** joins a table to itself. You must use **table aliases** to distinguish the two copies.

## When to Use Self Joins

- Finding pairs within the same table (actors in same film, customers in same city)
- Comparing rows in the same table to each other
- Hierarchical data (employee → manager in the same table)

## Actor Collaboration Example

\`\`\`sql
-- Actor pairs who share at least 3 films
SELECT
  a1.first_name || ' ' || a1.last_name AS actor1,
  a2.first_name || ' ' || a2.last_name AS actor2,
  COUNT(fa1.film_id) AS shared_films
FROM film_actor fa1
JOIN film_actor fa2
  ON fa1.film_id = fa2.film_id
 AND fa1.actor_id < fa2.actor_id  -- avoids duplicates and self-pairs
JOIN actor a1 ON fa1.actor_id = a1.actor_id
JOIN actor a2 ON fa2.actor_id = a2.actor_id
GROUP BY fa1.actor_id, fa2.actor_id
HAVING COUNT(fa1.film_id) >= 3
ORDER BY shared_films DESC;
\`\`\`

The \`fa1.actor_id < fa2.actor_id\` trick ensures each pair appears only once and no actor is paired with themselves.

## Finding Films with Same Rating and Length

\`\`\`sql
-- Films that share the same rating AND length
SELECT
  f1.title AS film1,
  f2.title AS film2,
  f1.rating,
  f1.length
FROM film f1
JOIN film f2
  ON f1.rating = f2.rating
 AND f1.length = f2.length
 AND f1.film_id < f2.film_id
ORDER BY f1.length DESC
LIMIT 10;
\`\`\`
`,
    contentAr: `## الربط الذاتي (Self Join)

**الربط الذاتي** يربط الجدول بنفسه. يجب استخدام **أسماء مستعارة** للتمييز بين النسختين.

## متى تستخدم Self Join

- إيجاد الأزواج داخل نفس الجدول (ممثلون في نفس الفيلم، عملاء في نفس المدينة)
- مقارنة الصفوف ببعضها داخل نفس الجدول
- البيانات الهرمية (موظف → مدير في نفس الجدول)

## مثال تعاون الممثلين

\`\`\`sql
-- أزواج الممثلين الذين يشتركون في 3 أفلام على الأقل
SELECT
  a1.first_name || ' ' || a1.last_name AS actor1,
  a2.first_name || ' ' || a2.last_name AS actor2,
  COUNT(fa1.film_id) AS shared_films
FROM film_actor fa1
JOIN film_actor fa2
  ON fa1.film_id = fa2.film_id
 AND fa1.actor_id < fa2.actor_id  -- يتجنب التكرارات والأزواج الذاتية
JOIN actor a1 ON fa1.actor_id = a1.actor_id
JOIN actor a2 ON fa2.actor_id = a2.actor_id
GROUP BY fa1.actor_id, fa2.actor_id
HAVING COUNT(fa1.film_id) >= 3
ORDER BY shared_films DESC;
\`\`\`

الحيلة \`fa1.actor_id < fa2.actor_id\` تضمن ظهور كل زوج مرة واحدة فقط ولا يُقرَن الممثل مع نفسه.

## إيجاد أفلام بنفس التصنيف والمدة

\`\`\`sql
-- الأفلام التي تتشارك نفس التصنيف والمدة
SELECT
  f1.title AS film1,
  f2.title AS film2,
  f1.rating,
  f1.length
FROM film f1
JOIN film f2
  ON f1.rating = f2.rating
 AND f1.length = f2.length
 AND f1.film_id < f2.film_id
ORDER BY f1.length DESC
LIMIT 10;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Find all pairs of customers from the same city. Show both customer full names and the city. Use a self-join on address and city tables. Limit to 15.",
        questionAr: "ابحث عن أزواج العملاء من نفس المدينة. اعرض اسمَي العميلَين الكاملَين والمدينة. استخدم Self Join على جداول address وcity. حدّد بـ 15.",
        hint: "Join customer c1 and customer c2 via address/city, filter c1.customer_id < c2.customer_id",
        hintAr: "اربط customer c1 وcustomer c2 عبر address/city، صفّ بـ c1.customer_id < c2.customer_id",
        expectedQuery: "SELECT c1.first_name || ' ' || c1.last_name AS customer1, c2.first_name || ' ' || c2.last_name AS customer2, ci.city FROM customer c1 JOIN customer c2 ON c1.address_id != c2.address_id AND c1.customer_id < c2.customer_id JOIN address a1 ON c1.address_id = a1.address_id JOIN address a2 ON c2.address_id = a2.address_id JOIN city ci ON a1.city_id = ci.city_id WHERE a1.city_id = a2.city_id LIMIT 15",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /customer.*c[12]/i.test(q) && /city/i.test(q),
      },
      {
        id: 2,
        question: "Find actor pairs who have appeared in at least 4 films together. Show both actor names and shared_films count. Order by shared_films descending.",
        questionAr: "ابحث عن أزواج الممثلين الذين ظهروا معًا في 4 أفلام على الأقل. اعرض اسمَي الممثلَين وعدد الأفلام المشتركة. رتّب تنازليًا.",
        hint: "Self-join film_actor on film_id, with actor_id < actor_id2, HAVING COUNT >= 4",
        hintAr: "Self-join على film_actor بناءً على film_id، مع actor_id < actor_id2، HAVING COUNT >= 4",
        expectedQuery: "SELECT a1.first_name || ' ' || a1.last_name AS actor1, a2.first_name || ' ' || a2.last_name AS actor2, COUNT(fa1.film_id) AS shared_films FROM film_actor fa1 JOIN film_actor fa2 ON fa1.film_id = fa2.film_id AND fa1.actor_id < fa2.actor_id JOIN actor a1 ON fa1.actor_id = a1.actor_id JOIN actor a2 ON fa2.actor_id = a2.actor_id GROUP BY fa1.actor_id, fa2.actor_id HAVING COUNT(fa1.film_id) >= 4 ORDER BY shared_films DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /film_actor/i.test(q) && /HAVING/i.test(q) && /actor/i.test(q),
      },
    ],
  },

  {
    id: 122,
    title: 'Late Returns Analysis',
    titleAr: 'تحليل التأخر في الإعادة',
    description: 'Identify overdue rentals by comparing actual return time against the allowed rental duration.',
    descriptionAr: 'تحديد الإيجارات المتأخرة بمقارنة وقت الإعادة الفعلي مع مدة الإيجار المسموح بها.',
    example: `-- Top 10 most overdue rentals ever returned
SELECT
  f.title,
  f.rental_duration          AS allowed_days,
  CAST(julianday(r.return_date) - julianday(r.rental_date) AS INTEGER) AS actual_days,
  CAST(julianday(r.return_date) - julianday(r.rental_date) AS INTEGER)
    - f.rental_duration        AS days_overdue
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NOT NULL
  AND (julianday(r.return_date) - julianday(r.rental_date)) > f.rental_duration
ORDER BY days_overdue DESC
LIMIT 10;`,
    content: `## Late Returns Analysis

A rental is **late** when the number of days between \`rental_date\` and \`return_date\` exceeds the film's \`rental_duration\`.

## Calculating Days Between Dates

SQLite uses \`julianday()\` for date arithmetic:

\`\`\`sql
-- Days a film was kept
SELECT
  rental_date,
  return_date,
  CAST(julianday(return_date) - julianday(rental_date) AS INTEGER) AS days_kept
FROM rental
WHERE return_date IS NOT NULL
LIMIT 10;
\`\`\`

## Finding Overdue Rentals

\`\`\`sql
SELECT
  f.title,
  f.rental_duration,
  CAST(julianday(r.return_date) - julianday(r.rental_date) AS INTEGER) AS days_kept,
  CAST(julianday(r.return_date) - julianday(r.rental_date) AS INTEGER)
    - f.rental_duration AS days_overdue
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NOT NULL
  AND (julianday(r.return_date) - julianday(r.rental_date)) > f.rental_duration
ORDER BY days_overdue DESC
LIMIT 10;
\`\`\`

## Late Returns by Customer

\`\`\`sql
-- Customers with the most late returns
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  COUNT(*) AS late_returns
FROM rental r
JOIN customer c ON r.customer_id = c.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NOT NULL
  AND (julianday(r.return_date) - julianday(r.rental_date)) > f.rental_duration
GROUP BY r.customer_id
ORDER BY late_returns DESC
LIMIT 10;
\`\`\`

## Still Not Returned

\`\`\`sql
-- Currently unreturned rentals
SELECT f.title, r.rental_date, c.first_name || ' ' || c.last_name AS customer
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL
LIMIT 10;
\`\`\`
`,
    contentAr: `## تحليل التأخر في الإعادة

يُعدّ الإيجار **متأخرًا** حين يتجاوز عدد الأيام بين \`rental_date\` و\`return_date\` قيمة \`rental_duration\` للفيلم.

## حساب الأيام بين التواريخ

يستخدم SQLite الدالة \`julianday()\` لحسابات التواريخ:

\`\`\`sql
-- الأيام التي احتُفظ فيها بالفيلم
SELECT
  rental_date,
  return_date,
  CAST(julianday(return_date) - julianday(rental_date) AS INTEGER) AS days_kept
FROM rental
WHERE return_date IS NOT NULL
LIMIT 10;
\`\`\`

## إيجاد الإيجارات المتأخرة

\`\`\`sql
SELECT
  f.title,
  f.rental_duration,
  CAST(julianday(r.return_date) - julianday(r.rental_date) AS INTEGER) AS days_kept,
  CAST(julianday(r.return_date) - julianday(r.rental_date) AS INTEGER)
    - f.rental_duration AS days_overdue
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NOT NULL
  AND (julianday(r.return_date) - julianday(r.rental_date)) > f.rental_duration
ORDER BY days_overdue DESC
LIMIT 10;
\`\`\`

## الإيجارات المتأخرة حسب العميل

\`\`\`sql
-- العملاء الذين لديهم أكبر عدد من الإيجارات المتأخرة
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  COUNT(*) AS late_returns
FROM rental r
JOIN customer c ON r.customer_id = c.customer_id
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NOT NULL
  AND (julianday(r.return_date) - julianday(r.rental_date)) > f.rental_duration
GROUP BY r.customer_id
ORDER BY late_returns DESC
LIMIT 10;
\`\`\`

## لم تُعَد بعد

\`\`\`sql
-- الإيجارات غير المُعادة حاليًا
SELECT f.title, r.rental_date, c.first_name || ' ' || c.last_name AS customer
FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL
LIMIT 10;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Count late returns per film rating. Show rating and late_count, ordered by late_count descending.",
        questionAr: "احسب الإيجارات المتأخرة لكل تصنيف فيلم. اعرض التصنيف وعدد التأخيرات، مرتبةً تنازليًا.",
        hint: "Join rental, inventory, film; filter where actual days > rental_duration; GROUP BY rating",
        hintAr: "اربط rental وinventory وfilm؛ صفّ حيث الأيام الفعلية > rental_duration؛ GROUP BY rating",
        expectedQuery: "SELECT f.rating, COUNT(*) AS late_count FROM rental r JOIN inventory i ON r.inventory_id = i.inventory_id JOIN film f ON i.film_id = f.film_id WHERE r.return_date IS NOT NULL AND (julianday(r.return_date) - julianday(r.rental_date)) > f.rental_duration GROUP BY f.rating ORDER BY late_count DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /rating/i.test(q) && /rental_duration/i.test(q) && /GROUP\s+BY/i.test(q),
      },
      {
        id: 2,
        question: "Find the 10 customers with the most late returns. Show customer full name and late_returns count.",
        questionAr: "ابحث عن أكثر 10 عملاء من حيث الإيجارات المتأخرة. اعرض الاسم الكامل للعميل وعدد الإيجارات المتأخرة.",
        hint: "Similar to the lesson example — GROUP BY customer, ORDER BY late_returns DESC LIMIT 10",
        hintAr: "مشابه لمثال الدرس — GROUP BY customer، ORDER BY late_returns DESC LIMIT 10",
        expectedQuery: "SELECT c.first_name || ' ' || c.last_name AS customer, COUNT(*) AS late_returns FROM rental r JOIN customer c ON r.customer_id = c.customer_id JOIN inventory i ON r.inventory_id = i.inventory_id JOIN film f ON i.film_id = f.film_id WHERE r.return_date IS NOT NULL AND (julianday(r.return_date) - julianday(r.rental_date)) > f.rental_duration GROUP BY r.customer_id ORDER BY late_returns DESC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /customer/i.test(q) && /rental_duration/i.test(q) && /LIMIT\s+10/i.test(q),
      },
    ],
  },

  // ── Level 8 — Advanced Window Functions ────────────────────────────────────
  {
    id: 123,
    title: 'LAG & LEAD — Payment Trends',
    titleAr: 'LAG و LEAD — اتجاهات الدفع',
    description: 'Compare each day\'s revenue to the previous and next day using LAG and LEAD.',
    descriptionAr: 'مقارنة إيرادات كل يوم باليوم السابق والتالي باستخدام LAG وLEAD.',
    example: `-- Daily revenue with previous-day comparison
SELECT
  DATE(payment_date) AS day,
  ROUND(SUM(amount), 2) AS revenue,
  ROUND(LAG(SUM(amount)) OVER (ORDER BY DATE(payment_date)), 2) AS prev_revenue,
  ROUND(SUM(amount) - LAG(SUM(amount)) OVER (ORDER BY DATE(payment_date)), 2) AS change
FROM payment
GROUP BY DATE(payment_date)
ORDER BY day
LIMIT 20;`,
    content: `## LAG & LEAD — Payment Trends

\`LAG\` and \`LEAD\` are window functions that look **backward** or **forward** in a sorted result set.

| Function | What it does |
|----------|-------------|
| \`LAG(col, n)\` | Value from **n rows before** (default n=1) |
| \`LEAD(col, n)\` | Value from **n rows after** (default n=1) |

## LAG: Compare to Previous Row

\`\`\`sql
WITH daily AS (
  SELECT DATE(payment_date) AS day, SUM(amount) AS revenue
  FROM payment GROUP BY DATE(payment_date)
)
SELECT
  day,
  ROUND(revenue, 2) AS revenue,
  ROUND(LAG(revenue) OVER (ORDER BY day), 2) AS prev_day,
  ROUND(revenue - LAG(revenue) OVER (ORDER BY day), 2) AS change
FROM daily
ORDER BY day;
\`\`\`

## LEAD: Preview the Next Row

\`\`\`sql
WITH daily AS (
  SELECT DATE(payment_date) AS day, SUM(amount) AS revenue
  FROM payment GROUP BY DATE(payment_date)
)
SELECT
  day,
  ROUND(revenue, 2) AS revenue,
  ROUND(LEAD(revenue) OVER (ORDER BY day), 2) AS next_day
FROM daily
ORDER BY day;
\`\`\`

## Finding Revenue Increases

\`\`\`sql
WITH daily AS (
  SELECT DATE(payment_date) AS day, SUM(amount) AS revenue
  FROM payment GROUP BY DATE(payment_date)
),
with_lag AS (
  SELECT day, revenue,
         LAG(revenue) OVER (ORDER BY day) AS prev
  FROM daily
)
SELECT day, ROUND(revenue, 2) AS revenue,
       ROUND(revenue - prev, 2) AS increase
FROM with_lag
WHERE revenue > prev
ORDER BY increase DESC;
\`\`\`
`,
    contentAr: `## LAG و LEAD — اتجاهات الدفع

\`LAG\` و\`LEAD\` دالتان من نوافذ تنظر **للخلف** أو **للأمام** في مجموعة النتائج المرتبة.

| الدالة | ما تفعله |
|--------|---------|
| \`LAG(col, n)\` | القيمة من **n صفوف قبل** (الافتراضي n=1) |
| \`LEAD(col, n)\` | القيمة من **n صفوف بعد** (الافتراضي n=1) |

## LAG: المقارنة بالصف السابق

\`\`\`sql
WITH daily AS (
  SELECT DATE(payment_date) AS day, SUM(amount) AS revenue
  FROM payment GROUP BY DATE(payment_date)
)
SELECT
  day,
  ROUND(revenue, 2) AS revenue,
  ROUND(LAG(revenue) OVER (ORDER BY day), 2) AS prev_day,
  ROUND(revenue - LAG(revenue) OVER (ORDER BY day), 2) AS change
FROM daily
ORDER BY day;
\`\`\`

## LEAD: معاينة الصف التالي

\`\`\`sql
WITH daily AS (
  SELECT DATE(payment_date) AS day, SUM(amount) AS revenue
  FROM payment GROUP BY DATE(payment_date)
)
SELECT
  day,
  ROUND(revenue, 2) AS revenue,
  ROUND(LEAD(revenue) OVER (ORDER BY day), 2) AS next_day
FROM daily
ORDER BY day;
\`\`\`

## إيجاد أيام ارتفاع الإيرادات

\`\`\`sql
WITH daily AS (
  SELECT DATE(payment_date) AS day, SUM(amount) AS revenue
  FROM payment GROUP BY DATE(payment_date)
),
with_lag AS (
  SELECT day, revenue,
         LAG(revenue) OVER (ORDER BY day) AS prev
  FROM daily
)
SELECT day, ROUND(revenue, 2) AS revenue,
       ROUND(revenue - prev, 2) AS increase
FROM with_lag
WHERE revenue > prev
ORDER BY increase DESC;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Show daily payment totals with a 'next_day_revenue' column using LEAD. Use a CTE for the daily totals, then apply LEAD. Order by day, limit 20.",
        questionAr: "اعرض إجماليات الدفع اليومية مع عمود 'next_day_revenue' باستخدام LEAD. استخدم CTE للإجماليات اليومية ثم طبّق LEAD. رتّب حسب اليوم، حدّد بـ 20.",
        hint: "CTE for daily totals, then LEAD(revenue) OVER (ORDER BY day)",
        hintAr: "CTE للإجماليات اليومية، ثم LEAD(revenue) OVER (ORDER BY day)",
        expectedQuery: "WITH daily AS (SELECT DATE(payment_date) AS day, SUM(amount) AS revenue FROM payment GROUP BY DATE(payment_date)) SELECT day, ROUND(revenue, 2) AS revenue, ROUND(LEAD(revenue) OVER (ORDER BY day), 2) AS next_day_revenue FROM daily ORDER BY day LIMIT 20",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LEAD/i.test(q) && /payment/i.test(q),
      },
      {
        id: 2,
        question: "Find days where daily revenue INCREASED compared to the previous day. Show the day, revenue, and the increase amount. Order by increase descending.",
        questionAr: "ابحث عن الأيام التي ارتفعت فيها الإيرادات اليومية مقارنةً باليوم السابق. اعرض اليوم والإيرادات ومقدار الارتفاع. رتّب تنازليًا حسب الارتفاع.",
        hint: "Use two CTEs: one for daily totals, one with LAG; then filter WHERE revenue > prev",
        hintAr: "استخدم CTE-ين: واحد للإجماليات اليومية وآخر مع LAG؛ ثم صفّ حيث revenue > prev",
        expectedQuery: "WITH daily AS (SELECT DATE(payment_date) AS day, SUM(amount) AS revenue FROM payment GROUP BY DATE(payment_date)), lagged AS (SELECT day, revenue, LAG(revenue) OVER (ORDER BY day) AS prev FROM daily) SELECT day, ROUND(revenue,2) AS revenue, ROUND(revenue-prev,2) AS increase FROM lagged WHERE revenue > prev ORDER BY increase DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LAG/i.test(q) && /revenue.*>.*prev|prev.*<.*revenue/i.test(q),
      },
    ],
  },

  {
    id: 124,
    title: 'Running Totals',
    titleAr: 'المجاميع التراكمية',
    description: 'Use SUM() OVER (ORDER BY) to build cumulative totals across rows.',
    descriptionAr: 'استخدام SUM() OVER (ORDER BY) لبناء مجاميع تراكمية عبر الصفوف.',
    example: `-- Cumulative revenue day by day
SELECT
  DATE(payment_date) AS day,
  ROUND(SUM(amount), 2) AS daily_revenue,
  ROUND(SUM(SUM(amount)) OVER (ORDER BY DATE(payment_date)), 2) AS cumulative_revenue
FROM payment
GROUP BY DATE(payment_date)
ORDER BY day;`,
    content: `## Running Totals

A **running total** (cumulative sum) adds each row's value to all previous values. Use \`SUM() OVER (ORDER BY ...)\`.

## Basic Running Total

\`\`\`sql
-- Cumulative payments per day
SELECT
  DATE(payment_date) AS day,
  ROUND(SUM(amount), 2) AS daily,
  ROUND(SUM(SUM(amount)) OVER (ORDER BY DATE(payment_date)), 2) AS cumulative
FROM payment
GROUP BY DATE(payment_date)
ORDER BY day;
\`\`\`

> The double \`SUM(SUM(amount))\` pattern: the inner \`SUM\` aggregates per group (daily), the outer \`SUM\` window accumulates across groups.

## Running Count of Rentals

\`\`\`sql
SELECT
  DATE(rental_date) AS day,
  COUNT(*) AS daily_rentals,
  SUM(COUNT(*)) OVER (ORDER BY DATE(rental_date)) AS cumulative_rentals
FROM rental
GROUP BY DATE(rental_date)
ORDER BY day;
\`\`\`

## Cumulative Revenue as Percentage of Total

\`\`\`sql
WITH daily AS (
  SELECT DATE(payment_date) AS day, SUM(amount) AS rev
  FROM payment GROUP BY DATE(payment_date)
)
SELECT
  day,
  ROUND(rev, 2) AS daily_rev,
  ROUND(SUM(rev) OVER (ORDER BY day), 2) AS cumulative,
  ROUND(100.0 * SUM(rev) OVER (ORDER BY day) / SUM(rev) OVER (), 1) AS pct_of_total
FROM daily
ORDER BY day;
\`\`\`
`,
    contentAr: `## المجاميع التراكمية

**المجموع التراكمي** يضيف قيمة كل صف إلى جميع القيم السابقة. استخدم \`SUM() OVER (ORDER BY ...)\`.

## المجموع التراكمي الأساسي

\`\`\`sql
-- المدفوعات التراكمية يومًا بيوم
SELECT
  DATE(payment_date) AS day,
  ROUND(SUM(amount), 2) AS daily,
  ROUND(SUM(SUM(amount)) OVER (ORDER BY DATE(payment_date)), 2) AS cumulative
FROM payment
GROUP BY DATE(payment_date)
ORDER BY day;
\`\`\`

> نمط \`SUM(SUM(amount))\` المزدوج: الـ\`SUM\` الداخلي يجمع لكل مجموعة (يوميًا)، والـ\`SUM\` الخارجي (نافذة) يجمع عبر المجموعات.

## العدد التراكمي للإيجارات

\`\`\`sql
SELECT
  DATE(rental_date) AS day,
  COUNT(*) AS daily_rentals,
  SUM(COUNT(*)) OVER (ORDER BY DATE(rental_date)) AS cumulative_rentals
FROM rental
GROUP BY DATE(rental_date)
ORDER BY day;
\`\`\`

## الإيرادات التراكمية كنسبة من الإجمالي

\`\`\`sql
WITH daily AS (
  SELECT DATE(payment_date) AS day, SUM(amount) AS rev
  FROM payment GROUP BY DATE(payment_date)
)
SELECT
  day,
  ROUND(rev, 2) AS daily_rev,
  ROUND(SUM(rev) OVER (ORDER BY day), 2) AS cumulative,
  ROUND(100.0 * SUM(rev) OVER (ORDER BY day) / SUM(rev) OVER (), 1) AS pct_of_total
FROM daily
ORDER BY day;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Show a running total of rental count by day. Columns: day, daily_rentals, cumulative_rentals. Order by day.",
        questionAr: "اعرض العدد التراكمي للإيجارات يومًا بيوم. الأعمدة: day وdaily_rentals وcumulative_rentals. رتّب حسب اليوم.",
        hint: "SUM(COUNT(*)) OVER (ORDER BY DATE(rental_date))",
        hintAr: "SUM(COUNT(*)) OVER (ORDER BY DATE(rental_date))",
        expectedQuery: "SELECT DATE(rental_date) AS day, COUNT(*) AS daily_rentals, SUM(COUNT(*)) OVER (ORDER BY DATE(rental_date)) AS cumulative_rentals FROM rental GROUP BY DATE(rental_date) ORDER BY day",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SUM.*COUNT/i.test(q) && /OVER/i.test(q) && /rental/i.test(q),
      },
      {
        id: 2,
        question: "Calculate cumulative revenue with a percentage of total column (pct_of_total). Use a CTE for daily totals. Round percentages to 1 decimal.",
        questionAr: "احسب الإيرادات التراكمية مع عمود نسبة الإجمالي (pct_of_total). استخدم CTE للإجماليات اليومية. قرّب النسب لمنزلة عشرية واحدة.",
        hint: "Use SUM(rev) OVER () for the grand total in the denominator",
        hintAr: "استخدم SUM(rev) OVER () للإجمالي الكلي في المقام",
        expectedQuery: "WITH daily AS (SELECT DATE(payment_date) AS day, SUM(amount) AS rev FROM payment GROUP BY DATE(payment_date)) SELECT day, ROUND(rev, 2) AS daily_rev, ROUND(SUM(rev) OVER (ORDER BY day), 2) AS cumulative, ROUND(100.0 * SUM(rev) OVER (ORDER BY day) / SUM(rev) OVER (), 1) AS pct_of_total FROM daily ORDER BY day",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SUM.*OVER/i.test(q) && /pct/i.test(q) && /100/i.test(q),
      },
    ],
  },

  {
    id: 125,
    title: 'NTILE & PERCENT_RANK',
    titleAr: 'NTILE و PERCENT_RANK',
    description: 'Classify customers into spending tiers and calculate percentile rankings.',
    descriptionAr: 'تصنيف العملاء إلى فئات إنفاق وحساب التصنيفات المئوية.',
    example: `-- Classify customers into 4 spending quartiles
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  ROUND(SUM(p.amount), 2) AS total_spent,
  NTILE(4) OVER (ORDER BY SUM(p.amount)) AS quartile,
  ROUND(PERCENT_RANK() OVER (ORDER BY SUM(p.amount)) * 100, 1) AS percentile
FROM customer c
JOIN payment p ON c.customer_id = p.customer_id
GROUP BY c.customer_id
ORDER BY total_spent DESC
LIMIT 20;`,
    content: `## NTILE & PERCENT_RANK

These window functions help you **rank and classify** rows into groups or percentiles.

## NTILE(n)

Divides rows into **n equal-sized buckets**. Useful for quartiles, deciles, etc.

\`\`\`sql
-- Split films into 5 length groups (quintiles)
SELECT
  title,
  length,
  NTILE(5) OVER (ORDER BY length) AS length_group
FROM film
ORDER BY length
LIMIT 20;
\`\`\`

| Group | Meaning |
|-------|---------|
| 1 | Shortest 20% |
| 2 | Next 20% |
| … | … |
| 5 | Longest 20% |

## PERCENT_RANK()

Returns a value between 0 and 1 representing **what fraction of rows rank below** the current row.

\`\`\`sql
-- Film rental rate percentile
SELECT
  title,
  rental_rate,
  ROUND(PERCENT_RANK() OVER (ORDER BY rental_rate) * 100, 1) AS percentile
FROM film
ORDER BY rental_rate DESC
LIMIT 15;
\`\`\`

## Finding Top 10% Customers

\`\`\`sql
WITH ranked AS (
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer,
    SUM(p.amount) AS total,
    PERCENT_RANK() OVER (ORDER BY SUM(p.amount)) AS prank
  FROM customer c
  JOIN payment p ON c.customer_id = p.customer_id
  GROUP BY c.customer_id
)
SELECT customer, ROUND(total, 2) AS total_spent
FROM ranked
WHERE prank >= 0.9
ORDER BY total DESC;
\`\`\`
`,
    contentAr: `## NTILE و PERCENT_RANK

تساعدك هاتان الدالتان من النوافذ على **تصنيف الصفوف** إلى مجموعات أو مئينيات.

## NTILE(n)

تقسّم الصفوف إلى **n مجموعات متساوية**. مفيدة للأرباعيات والعُشيريات وغيرها.

\`\`\`sql
-- تقسيم الأفلام إلى 5 مجموعات طول (خُمُسيات)
SELECT
  title,
  length,
  NTILE(5) OVER (ORDER BY length) AS length_group
FROM film
ORDER BY length
LIMIT 20;
\`\`\`

| المجموعة | المعنى |
|---------|--------|
| 1 | أقصر 20% |
| 2 | التالية 20% |
| … | … |
| 5 | أطول 20% |

## PERCENT_RANK()

تُرجع قيمة بين 0 و1 تمثل **نسبة الصفوف ذات التصنيف الأدنى** من الصف الحالي.

\`\`\`sql
-- المئيني لسعر إيجار الفيلم
SELECT
  title,
  rental_rate,
  ROUND(PERCENT_RANK() OVER (ORDER BY rental_rate) * 100, 1) AS percentile
FROM film
ORDER BY rental_rate DESC
LIMIT 15;
\`\`\`

## إيجاد أفضل 10% عملاء

\`\`\`sql
WITH ranked AS (
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer,
    SUM(p.amount) AS total,
    PERCENT_RANK() OVER (ORDER BY SUM(p.amount)) AS prank
  FROM customer c
  JOIN payment p ON c.customer_id = p.customer_id
  GROUP BY c.customer_id
)
SELECT customer, ROUND(total, 2) AS total_spent
FROM ranked
WHERE prank >= 0.9
ORDER BY total DESC;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Classify films into 3 groups (terciles) based on their length using NTILE(3). Show title, length, and length_tier. Order by length.",
        questionAr: "صنّف الأفلام إلى 3 مجموعات (ثلاثيات) بناءً على طولها باستخدام NTILE(3). اعرض العنوان والطول والفئة. رتّب حسب الطول.",
        hint: "NTILE(3) OVER (ORDER BY length) AS length_tier",
        hintAr: "NTILE(3) OVER (ORDER BY length) AS length_tier",
        expectedQuery: "SELECT title, length, NTILE(3) OVER (ORDER BY length) AS length_tier FROM film ORDER BY length",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /NTILE\s*\(\s*3\s*\)/i.test(q) && /length/i.test(q),
      },
      {
        id: 2,
        question: "Find customers in the top 10% by total spending using PERCENT_RANK. Use a CTE. Show customer name and total_spent, ordered by total_spent descending.",
        questionAr: "ابحث عن العملاء ضمن أعلى 10% من حيث الإنفاق الكلي باستخدام PERCENT_RANK. استخدم CTE. اعرض اسم العميل وإجمالي الإنفاق، مرتبًا تنازليًا.",
        hint: "CTE with PERCENT_RANK(), then WHERE prank >= 0.9",
        hintAr: "CTE مع PERCENT_RANK()، ثم WHERE prank >= 0.9",
        expectedQuery: "WITH ranked AS (SELECT c.customer_id, c.first_name || ' ' || c.last_name AS customer, SUM(p.amount) AS total, PERCENT_RANK() OVER (ORDER BY SUM(p.amount)) AS prank FROM customer c JOIN payment p ON c.customer_id = p.customer_id GROUP BY c.customer_id) SELECT customer, ROUND(total, 2) AS total_spent FROM ranked WHERE prank >= 0.9 ORDER BY total_spent DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /PERCENT_RANK/i.test(q) && /0\.9/i.test(q),
      },
    ],
  },

  {
    id: 126,
    title: 'Correlated Subqueries',
    titleAr: 'الاستعلامات الفرعية المرتبطة',
    description: 'Write subqueries that reference columns from the outer query.',
    descriptionAr: 'كتابة استعلامات فرعية تُشير إلى أعمدة من الاستعلام الخارجي.',
    example: `-- Each film's rental count
SELECT
  f.title,
  f.rating,
  (SELECT COUNT(*)
   FROM inventory i
   JOIN rental r ON i.inventory_id = r.inventory_id
   WHERE i.film_id = f.film_id) AS times_rented
FROM film f
ORDER BY times_rented DESC
LIMIT 15;`,
    content: `## Correlated Subqueries

A **correlated subquery** references a column from the outer query. It runs *once per row* of the outer query — slower but very expressive.

## Example: Rental Count per Film

\`\`\`sql
SELECT
  f.title,
  (SELECT COUNT(*)
   FROM inventory i
   JOIN rental r ON i.inventory_id = r.inventory_id
   WHERE i.film_id = f.film_id) AS times_rented  -- f.film_id from outer query
FROM film f
ORDER BY times_rented DESC
LIMIT 10;
\`\`\`

## Filtering with Correlated Subquery

\`\`\`sql
-- Films rented more often than the average film
SELECT f.title
FROM film f
WHERE (SELECT COUNT(*)
       FROM inventory i
       JOIN rental r ON i.inventory_id = r.inventory_id
       WHERE i.film_id = f.film_id) >
      (SELECT AVG(cnt) FROM (
         SELECT COUNT(*) AS cnt
         FROM inventory i2
         JOIN rental r2 ON i2.inventory_id = r2.inventory_id
         GROUP BY i2.film_id
       ))
ORDER BY f.title
LIMIT 15;
\`\`\`

## Correlated vs JOIN

The same result can often be achieved with a JOIN + GROUP BY, which is usually faster:

\`\`\`sql
-- Equivalent using JOIN (faster):
SELECT f.title, COUNT(r.rental_id) AS times_rented
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id
ORDER BY times_rented DESC
LIMIT 10;
\`\`\`

> Use correlated subqueries when you need per-row logic that's hard to express as a JOIN.
`,
    contentAr: `## الاستعلامات الفرعية المرتبطة

**الاستعلام الفرعي المرتبط** يُشير إلى عمود من الاستعلام الخارجي. يُنفَّذ *مرة لكل صف* من الاستعلام الخارجي — أبطأ لكنه تعبيري جدًا.

## مثال: عدد مرات استئجار كل فيلم

\`\`\`sql
SELECT
  f.title,
  (SELECT COUNT(*)
   FROM inventory i
   JOIN rental r ON i.inventory_id = r.inventory_id
   WHERE i.film_id = f.film_id) AS times_rented  -- f.film_id من الاستعلام الخارجي
FROM film f
ORDER BY times_rented DESC
LIMIT 10;
\`\`\`

## التصفية بالاستعلام الفرعي المرتبط

\`\`\`sql
-- الأفلام المستأجرة أكثر من المتوسط
SELECT f.title
FROM film f
WHERE (SELECT COUNT(*)
       FROM inventory i
       JOIN rental r ON i.inventory_id = r.inventory_id
       WHERE i.film_id = f.film_id) >
      (SELECT AVG(cnt) FROM (
         SELECT COUNT(*) AS cnt
         FROM inventory i2
         JOIN rental r2 ON i2.inventory_id = r2.inventory_id
         GROUP BY i2.film_id
       ))
ORDER BY f.title
LIMIT 15;
\`\`\`

## الاستعلام الفرعي المرتبط مقابل JOIN

غالبًا ما يمكن الحصول على نفس النتيجة بـ JOIN + GROUP BY، وهو عادةً أسرع:

\`\`\`sql
-- مكافئ باستخدام JOIN (أسرع):
SELECT f.title, COUNT(r.rental_id) AS times_rented
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id
ORDER BY times_rented DESC
LIMIT 10;
\`\`\`

> استخدم الاستعلامات الفرعية المرتبطة حين تحتاج منطقًا لكل صف يصعب التعبير عنه بـ JOIN.
`,
    exercises: [
      {
        id: 1,
        question: "For each customer, show their name and total payment count using a correlated subquery in SELECT. Order by payment_count descending, limit 10.",
        questionAr: "لكل عميل، اعرض اسمه وعدد مدفوعاته الكلي باستخدام استعلام فرعي مرتبط في SELECT. رتّب تنازليًا، حدّد بـ 10.",
        hint: "(SELECT COUNT(*) FROM payment p WHERE p.customer_id = c.customer_id) AS payment_count",
        hintAr: "(SELECT COUNT(*) FROM payment p WHERE p.customer_id = c.customer_id) AS payment_count",
        expectedQuery: "SELECT first_name || ' ' || last_name AS customer, (SELECT COUNT(*) FROM payment p WHERE p.customer_id = c.customer_id) AS payment_count FROM customer c ORDER BY payment_count DESC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SELECT.*COUNT.*FROM\s+payment/i.test(q) && /customer_id\s*=\s*c\.customer_id/i.test(q),
      },
      {
        id: 2,
        question: "Find films rented more than 30 times using a correlated subquery in WHERE. Show title and use the subquery to count rentals via inventory. Order by title.",
        questionAr: "ابحث عن الأفلام المستأجرة أكثر من 30 مرة باستخدام استعلام فرعي مرتبط في WHERE. اعرض العنوان واستخدم الاستعلام الفرعي لعد الإيجارات عبر inventory. رتّب حسب العنوان.",
        hint: "WHERE (SELECT COUNT(*) FROM inventory i JOIN rental r ON i.inventory_id = r.inventory_id WHERE i.film_id = f.film_id) > 30",
        hintAr: "WHERE (SELECT COUNT(*) FROM inventory i JOIN rental r ON i.inventory_id = r.inventory_id WHERE i.film_id = f.film_id) > 30",
        expectedQuery: "SELECT f.title FROM film f WHERE (SELECT COUNT(*) FROM inventory i JOIN rental r ON i.inventory_id = r.inventory_id WHERE i.film_id = f.film_id) > 30 ORDER BY f.title",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /inventory/i.test(q) && /film_id\s*=\s*f\.film_id/i.test(q) && />\s*30/i.test(q),
      },
    ],
  },

  // ── Level 9 — Data Functions & CTEs ────────────────────────────────────────
  {
    id: 127,
    title: 'String Functions',
    titleAr: 'دوال النصوص',
    description: 'Transform and extract data from text columns using SQLite string functions.',
    descriptionAr: 'تحويل البيانات واستخراجها من أعمدة النصوص باستخدام دوال النصوص في SQLite.',
    example: `-- Format customer info from text columns
SELECT
  UPPER(first_name) || ' ' || UPPER(last_name) AS full_name,
  LOWER(email)                                  AS email_lower,
  SUBSTR(email, INSTR(email, '@') + 1)          AS email_domain,
  LENGTH(first_name) + LENGTH(last_name)        AS name_chars
FROM customer
ORDER BY name_chars DESC
LIMIT 15;`,
    content: `## String Functions

SQLite provides many functions for working with text data.

## Core Functions

| Function | Description | Example |
|----------|-------------|---------|
| \`UPPER(s)\` | Convert to uppercase | \`UPPER('hello')\` → \`'HELLO'\` |
| \`LOWER(s)\` | Convert to lowercase | \`LOWER('HELLO')\` → \`'hello'\` |
| \`LENGTH(s)\` | Character count | \`LENGTH('abc')\` → \`3\` |
| \`SUBSTR(s,start,len)\` | Extract substring | \`SUBSTR('hello',2,3)\` → \`'ell'\` |
| \`TRIM(s)\` | Remove leading/trailing spaces | \`TRIM(' hi ')\` → \`'hi'\` |
| \`REPLACE(s,old,new)\` | Replace text | \`REPLACE('a-b','−','+')\` → \`'a+b'\` |
| \`INSTR(s,needle)\` | Find position of substring | \`INSTR('hello','ll')\` → \`3\` |
| \`\|\|\` | Concatenate strings | \`'a' \|\| 'b'\` → \`'ab'\` |

## Practical Examples

\`\`\`sql
-- Create usernames: first 3 letters of first_name + full last_name, lowercase
SELECT
  first_name,
  last_name,
  LOWER(SUBSTR(first_name, 1, 3) || last_name) AS username
FROM customer
LIMIT 10;
\`\`\`

\`\`\`sql
-- Extract email domains
SELECT
  email,
  SUBSTR(email, INSTR(email, '@') + 1) AS domain
FROM customer
GROUP BY domain
ORDER BY COUNT(*) DESC;
\`\`\`

\`\`\`sql
-- Find films with unusually long titles
SELECT title, LENGTH(title) AS title_length
FROM film
ORDER BY title_length DESC
LIMIT 10;
\`\`\`
`,
    contentAr: `## دوال النصوص

يوفر SQLite دوالًا كثيرة للعمل مع بيانات النصوص.

## الدوال الأساسية

| الدالة | الوصف | مثال |
|--------|-------|------|
| \`UPPER(s)\` | تحويل إلى أحرف كبيرة | \`UPPER('hello')\` → \`'HELLO'\` |
| \`LOWER(s)\` | تحويل إلى أحرف صغيرة | \`LOWER('HELLO')\` → \`'hello'\` |
| \`LENGTH(s)\` | عدد الأحرف | \`LENGTH('abc')\` → \`3\` |
| \`SUBSTR(s,start,len)\` | استخراج جزء من النص | \`SUBSTR('hello',2,3)\` → \`'ell'\` |
| \`TRIM(s)\` | إزالة المسافات البادئة/اللاحقة | \`TRIM(' hi ')\` → \`'hi'\` |
| \`REPLACE(s,old,new)\` | استبدال نص | \`REPLACE('a-b','-','+')\` → \`'a+b'\` |
| \`INSTR(s,needle)\` | إيجاد موضع النص الفرعي | \`INSTR('hello','ll')\` → \`3\` |
| \`\|\|\` | ربط النصوص | \`'a' \|\| 'b'\` → \`'ab'\` |

## أمثلة عملية

\`\`\`sql
-- إنشاء أسماء مستخدمين: أول 3 أحرف من الاسم الأول + الاسم الأخير كاملًا، بأحرف صغيرة
SELECT
  first_name,
  last_name,
  LOWER(SUBSTR(first_name, 1, 3) || last_name) AS username
FROM customer
LIMIT 10;
\`\`\`

\`\`\`sql
-- استخراج نطاقات البريد الإلكتروني
SELECT
  email,
  SUBSTR(email, INSTR(email, '@') + 1) AS domain
FROM customer
GROUP BY domain
ORDER BY COUNT(*) DESC;
\`\`\`

\`\`\`sql
-- إيجاد الأفلام ذات العناوين الطويلة بشكل غير عادي
SELECT title, LENGTH(title) AS title_length
FROM film
ORDER BY title_length DESC
LIMIT 10;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Create a 'username' for each customer: LOWER of first 3 chars of first_name concatenated with last_name. Show first_name, last_name, and username. Limit 10.",
        questionAr: "أنشئ 'username' لكل عميل: LOWER لأول 3 أحرف من first_name متصلةً بـ last_name. اعرض first_name وlast_name وusername. حدّد بـ 10.",
        hint: "LOWER(SUBSTR(first_name, 1, 3) || last_name)",
        hintAr: "LOWER(SUBSTR(first_name, 1, 3) || last_name)",
        expectedQuery: "SELECT first_name, last_name, LOWER(SUBSTR(first_name, 1, 3) || last_name) AS username FROM customer LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SUBSTR/i.test(q) && /LOWER/i.test(q) && /username/i.test(q),
      },
      {
        id: 2,
        question: "Find all films whose title contains exactly 10 characters. Show title and LENGTH(title). Order by title.",
        questionAr: "ابحث عن الأفلام التي يتكون عنوانها من 10 أحرف بالضبط. اعرض العنوان وLENGTH(title). رتّب حسب العنوان.",
        hint: "WHERE LENGTH(title) = 10",
        hintAr: "WHERE LENGTH(title) = 10",
        expectedQuery: "SELECT title, LENGTH(title) AS title_length FROM film WHERE LENGTH(title) = 10 ORDER BY title",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LENGTH/i.test(q) && /=\s*10/i.test(q),
      },
    ],
  },

  {
    id: 128,
    title: 'Multiple CTEs',
    titleAr: 'تعدد CTEs',
    description: 'Chain multiple CTEs together to build complex multi-step query pipelines.',
    descriptionAr: 'تسلسل CTEs متعددة معًا لبناء خطوط استعلام متعددة الخطوات.',
    example: `-- Pipeline: category revenue → rank → top 5
WITH cat_revenue AS (
  SELECT c.name AS category, ROUND(SUM(p.amount), 2) AS revenue
  FROM payment p
  JOIN rental    r  ON p.rental_id    = r.rental_id
  JOIN inventory i  ON r.inventory_id = i.inventory_id
  JOIN film_category fc ON i.film_id  = fc.film_id
  JOIN category  c  ON fc.category_id = c.category_id
  GROUP BY c.name
),
ranked AS (
  SELECT category, revenue,
         RANK() OVER (ORDER BY revenue DESC) AS rnk
  FROM cat_revenue
)
SELECT * FROM ranked WHERE rnk <= 5;`,
    content: `## Multiple CTEs

You can define **multiple CTEs** in one \`WITH\` clause, separated by commas. Each CTE can reference previously defined CTEs.

## Syntax

\`\`\`sql
WITH cte1 AS (
  -- first step
),
cte2 AS (
  -- second step, can reference cte1
),
cte3 AS (
  -- third step, can reference cte1 or cte2
)
SELECT * FROM cte3;
\`\`\`

## Two-Step Customer Analysis

\`\`\`sql
WITH customer_spend AS (
  -- Step 1: total spend per customer
  SELECT
    customer_id,
    SUM(amount) AS total_spent
  FROM payment
  GROUP BY customer_id
),
customer_location AS (
  -- Step 2: customer city info
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer,
    ci.city
  FROM customer c
  JOIN address a ON c.address_id = a.address_id
  JOIN city ci ON a.city_id = ci.city_id
)
SELECT
  cl.customer,
  cl.city,
  ROUND(cs.total_spent, 2) AS total_spent
FROM customer_location cl
JOIN customer_spend cs ON cl.customer_id = cs.customer_id
ORDER BY total_spent DESC
LIMIT 15;
\`\`\`

## Why Use Multiple CTEs?

- **Readability**: each step has a clear name
- **Reuse**: reference the same CTE multiple times
- **Debugging**: test each CTE independently by selecting from it
`,
    contentAr: `## تعدد CTEs

يمكنك تعريف **عدة CTEs** في جملة \`WITH\` واحدة، مفصولةً بفواصل. يمكن لكل CTE الإشارة إلى CTEs المعرَّفة مسبقًا.

## الصيغة

\`\`\`sql
WITH cte1 AS (
  -- الخطوة الأولى
),
cte2 AS (
  -- الخطوة الثانية، يمكنها الإشارة إلى cte1
),
cte3 AS (
  -- الخطوة الثالثة، يمكنها الإشارة إلى cte1 أو cte2
)
SELECT * FROM cte3;
\`\`\`

## تحليل العملاء بخطوتين

\`\`\`sql
WITH customer_spend AS (
  -- الخطوة 1: إجمالي الإنفاق لكل عميل
  SELECT
    customer_id,
    SUM(amount) AS total_spent
  FROM payment
  GROUP BY customer_id
),
customer_location AS (
  -- الخطوة 2: معلومات مدينة العميل
  SELECT
    c.customer_id,
    c.first_name || ' ' || c.last_name AS customer,
    ci.city
  FROM customer c
  JOIN address a ON c.address_id = a.address_id
  JOIN city ci ON a.city_id = ci.city_id
)
SELECT
  cl.customer,
  cl.city,
  ROUND(cs.total_spent, 2) AS total_spent
FROM customer_location cl
JOIN customer_spend cs ON cl.customer_id = cs.customer_id
ORDER BY total_spent DESC
LIMIT 15;
\`\`\`

## لماذا نستخدم CTEs متعددة؟

- **سهولة القراءة**: كل خطوة لها اسم واضح
- **إعادة الاستخدام**: الإشارة إلى نفس الـ CTE عدة مرات
- **التنقيح**: اختبار كل CTE بشكل مستقل بالاختيار منه
`,
    exercises: [
      {
        id: 1,
        question: "Write two CTEs: 'film_rentals' counting rentals per film_id, and 'film_info' joining film with category. Then SELECT title, category name, and rental_count, ordered by rental_count DESC, LIMIT 10.",
        questionAr: "اكتب CTE-ين: 'film_rentals' لعد الإيجارات لكل film_id، و'film_info' يربط film بـ category. ثم اختر العنوان واسم الفئة وعدد الإيجارات، مرتبًا تنازليًا، حدّد بـ 10.",
        hint: "WITH film_rentals AS (...), film_info AS (...) SELECT ...",
        hintAr: "WITH film_rentals AS (...), film_info AS (...) SELECT ...",
        expectedQuery: "WITH film_rentals AS (SELECT i.film_id, COUNT(*) AS rental_count FROM inventory i JOIN rental r ON i.inventory_id = r.inventory_id GROUP BY i.film_id), film_info AS (SELECT f.film_id, f.title, c.name AS category FROM film f JOIN film_category fc ON f.film_id = fc.film_id JOIN category c ON fc.category_id = c.category_id) SELECT fi.title, fi.category, fr.rental_count FROM film_info fi JOIN film_rentals fr ON fi.film_id = fr.film_id ORDER BY rental_count DESC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /WITH/i.test(q) && (q.match(/\bAS\s*\(/gi) || []).length >= 2,
      },
      {
        id: 2,
        question: "Use two CTEs to find the top 5 stores by revenue: 'store_revenue' calculates total payment per store, 'ranked_stores' adds RANK(). Final SELECT shows store_id, revenue, and rank where rank <= 5.",
        questionAr: "استخدم CTE-ين لإيجاد أفضل 5 متاجر من حيث الإيرادات: 'store_revenue' يحسب إجمالي الدفعات لكل متجر، و'ranked_stores' يضيف RANK(). يعرض الاختيار النهائي store_id والإيرادات والترتيب حيث rank <= 5.",
        hint: "JOIN payment → rental → inventory to get store_id, GROUP BY store_id",
        hintAr: "اربط payment → rental → inventory للحصول على store_id، GROUP BY store_id",
        expectedQuery: "WITH store_revenue AS (SELECT i.store_id, ROUND(SUM(p.amount),2) AS revenue FROM payment p JOIN rental r ON p.rental_id = r.rental_id JOIN inventory i ON r.inventory_id = i.inventory_id GROUP BY i.store_id), ranked_stores AS (SELECT store_id, revenue, RANK() OVER (ORDER BY revenue DESC) AS rnk FROM store_revenue) SELECT store_id, revenue, rnk FROM ranked_stores WHERE rnk <= 5",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /WITH/i.test(q) && /RANK/i.test(q) && /store_id/i.test(q),
      },
    ],
  },

  {
    id: 129,
    title: 'Film Popularity Deep Dive',
    titleAr: 'استكشاف شعبية الأفلام',
    description: 'Rank films by rental frequency and revenue to identify top performers.',
    descriptionAr: 'ترتيب الأفلام حسب تكرار الاستئجار والإيرادات لتحديد أفضل العروض.',
    example: `-- Most popular films: rental count + revenue
SELECT
  f.title,
  f.rating,
  COUNT(r.rental_id)        AS rental_count,
  ROUND(SUM(p.amount), 2)   AS total_revenue,
  ROUND(SUM(p.amount) / COUNT(r.rental_id), 2) AS revenue_per_rental
FROM film f
JOIN inventory i ON f.film_id   = i.film_id
JOIN rental    r ON i.inventory_id = r.inventory_id
JOIN payment   p ON r.rental_id  = p.rental_id
GROUP BY f.film_id, f.title, f.rating
ORDER BY rental_count DESC
LIMIT 15;`,
    content: `## Film Popularity Deep Dive

Combining rental counts with revenue gives a fuller picture of each film's performance.

## Top Films by Rental Count

\`\`\`sql
SELECT
  f.title,
  COUNT(r.rental_id) AS rental_count
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id
ORDER BY rental_count DESC
LIMIT 10;
\`\`\`

## Least Rented Films

\`\`\`sql
SELECT
  f.title,
  COUNT(r.rental_id) AS rental_count
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id
ORDER BY rental_count ASC
LIMIT 10;
\`\`\`

## High Value, Low Volume Films

Films that earn more per rental than their rental frequency suggests:

\`\`\`sql
WITH film_stats AS (
  SELECT
    f.film_id,
    f.title,
    COUNT(r.rental_id) AS rentals,
    SUM(p.amount) AS revenue
  FROM film f
  JOIN inventory i ON f.film_id = i.film_id
  JOIN rental r ON i.inventory_id = r.inventory_id
  JOIN payment p ON r.rental_id = p.rental_id
  GROUP BY f.film_id
),
averages AS (
  SELECT AVG(rentals) AS avg_rentals, AVG(revenue) AS avg_revenue
  FROM film_stats
)
SELECT
  fs.title,
  fs.rentals,
  ROUND(fs.revenue, 2) AS revenue
FROM film_stats fs, averages a
WHERE fs.revenue > a.avg_revenue
  AND fs.rentals < a.avg_rentals
ORDER BY fs.revenue DESC
LIMIT 10;
\`\`\`
`,
    contentAr: `## استكشاف شعبية الأفلام

يعطي الجمع بين عدد مرات الاستئجار والإيرادات صورةً أكمل عن أداء كل فيلم.

## أفضل الأفلام من حيث عدد مرات الاستئجار

\`\`\`sql
SELECT
  f.title,
  COUNT(r.rental_id) AS rental_count
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id
ORDER BY rental_count DESC
LIMIT 10;
\`\`\`

## الأفلام الأقل استئجارًا

\`\`\`sql
SELECT
  f.title,
  COUNT(r.rental_id) AS rental_count
FROM film f
LEFT JOIN inventory i ON f.film_id = i.film_id
LEFT JOIN rental r ON i.inventory_id = r.inventory_id
GROUP BY f.film_id
ORDER BY rental_count ASC
LIMIT 10;
\`\`\`

## الأفلام ذات القيمة العالية والحجم المنخفض

أفلام تكسب أكثر لكل استئجار مما يشير إليه معدل استئجارها:

\`\`\`sql
WITH film_stats AS (
  SELECT
    f.film_id,
    f.title,
    COUNT(r.rental_id) AS rentals,
    SUM(p.amount) AS revenue
  FROM film f
  JOIN inventory i ON f.film_id = i.film_id
  JOIN rental r ON i.inventory_id = r.inventory_id
  JOIN payment p ON r.rental_id = p.rental_id
  GROUP BY f.film_id
),
averages AS (
  SELECT AVG(rentals) AS avg_rentals, AVG(revenue) AS avg_revenue
  FROM film_stats
)
SELECT
  fs.title,
  fs.rentals,
  ROUND(fs.revenue, 2) AS revenue
FROM film_stats fs, averages a
WHERE fs.revenue > a.avg_revenue
  AND fs.rentals < a.avg_rentals
ORDER BY fs.revenue DESC
LIMIT 10;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Find the 10 least-rented films (use LEFT JOINs to include films with zero rentals). Show title and rental_count, ordered ascending.",
        questionAr: "ابحث عن أقل 10 أفلام استئجارًا (استخدم LEFT JOINs لتضمين الأفلام ذات الصفر إيجارات). اعرض العنوان وعدد الإيجارات، مرتبًا تصاعديًا.",
        hint: "LEFT JOIN inventory and rental, GROUP BY film_id, ORDER BY COUNT ASC LIMIT 10",
        hintAr: "LEFT JOIN مع inventory وrental، GROUP BY film_id، ORDER BY COUNT ASC LIMIT 10",
        expectedQuery: "SELECT f.title, COUNT(r.rental_id) AS rental_count FROM film f LEFT JOIN inventory i ON f.film_id = i.film_id LEFT JOIN rental r ON i.inventory_id = r.inventory_id GROUP BY f.film_id ORDER BY rental_count ASC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /LEFT\s+JOIN/i.test(q) && /rental_count|COUNT/i.test(q) && /ASC/i.test(q),
      },
      {
        id: 2,
        question: "Show the top 10 films by total revenue. Columns: title, rental_count, total_revenue. Order by total_revenue DESC.",
        questionAr: "اعرض أفضل 10 أفلام من حيث إجمالي الإيرادات. الأعمدة: title وrental_count وtotal_revenue. رتّب تنازليًا حسب total_revenue.",
        hint: "Join film → inventory → rental → payment, GROUP BY film_id",
        hintAr: "اربط film → inventory → rental → payment، GROUP BY film_id",
        expectedQuery: "SELECT f.title, COUNT(r.rental_id) AS rental_count, ROUND(SUM(p.amount), 2) AS total_revenue FROM film f JOIN inventory i ON f.film_id = i.film_id JOIN rental r ON i.inventory_id = r.inventory_id JOIN payment p ON r.rental_id = p.rental_id GROUP BY f.film_id ORDER BY total_revenue DESC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SUM.*amount/i.test(q) && /payment/i.test(q) && /total_revenue/i.test(q),
      },
    ],
  },

  {
    id: 130,
    title: 'Customer Loyalty Analysis',
    titleAr: 'تحليل ولاء العملاء',
    description: 'Measure customer lifetime value, activity span, and spending patterns.',
    descriptionAr: 'قياس القيمة الدائمة للعميل ومدة نشاطه وأنماط إنفاقه.',
    example: `-- Customer lifetime value summary
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name              AS customer,
  COUNT(DISTINCT r.rental_id)                      AS total_rentals,
  ROUND(SUM(p.amount), 2)                          AS total_spent,
  MIN(DATE(r.rental_date))                         AS first_rental,
  MAX(DATE(r.rental_date))                         AS last_rental,
  CAST(julianday(MAX(r.rental_date))
       - julianday(MIN(r.rental_date)) AS INTEGER)  AS days_active
FROM customer c
JOIN rental  r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id   = p.rental_id
GROUP BY c.customer_id
ORDER BY total_spent DESC
LIMIT 15;`,
    content: `## Customer Loyalty Analysis

Understanding *who* your best customers are — and *how long* they've been active — is the foundation of retention strategy.

## Key Loyalty Metrics

| Metric | SQL |
|--------|-----|
| Total rentals | \`COUNT(DISTINCT rental_id)\` |
| Total spent | \`SUM(amount)\` |
| First activity | \`MIN(rental_date)\` |
| Last activity | \`MAX(rental_date)\` |
| Days active | \`julianday(MAX) - julianday(MIN)\` |
| Avg spend per rental | \`SUM(amount) / COUNT(rental_id)\` |

## Average Spend per Rental

\`\`\`sql
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  COUNT(r.rental_id) AS rentals,
  ROUND(SUM(p.amount) / COUNT(r.rental_id), 2) AS avg_per_rental
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY c.customer_id
ORDER BY avg_per_rental DESC
LIMIT 10;
\`\`\`

## Customers Active for More Than 3 Months

\`\`\`sql
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  CAST(julianday(MAX(r.rental_date)) - julianday(MIN(r.rental_date)) AS INTEGER) AS days_active
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
GROUP BY c.customer_id
HAVING days_active > 90
ORDER BY days_active DESC;
\`\`\`

## Monthly Rental Activity per Customer

\`\`\`sql
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name AS customer,
  COUNT(DISTINCT strftime('%Y-%m', r.rental_date)) AS active_months
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
GROUP BY c.customer_id
ORDER BY active_months DESC
LIMIT 10;
\`\`\`
`,
    contentAr: `## تحليل ولاء العملاء

فهم *من* هم أفضل عملائك — و*كم من الوقت* كانوا نشطين — هو أساس استراتيجية الاستبقاء.

## مقاييس الولاء الرئيسية

| المقياس | SQL |
|---------|-----|
| إجمالي الإيجارات | \`COUNT(DISTINCT rental_id)\` |
| إجمالي الإنفاق | \`SUM(amount)\` |
| أول نشاط | \`MIN(rental_date)\` |
| آخر نشاط | \`MAX(rental_date)\` |
| أيام النشاط | \`julianday(MAX) - julianday(MIN)\` |
| متوسط الإنفاق لكل إيجار | \`SUM(amount) / COUNT(rental_id)\` |

## متوسط الإنفاق لكل إيجار

\`\`\`sql
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  COUNT(r.rental_id) AS rentals,
  ROUND(SUM(p.amount) / COUNT(r.rental_id), 2) AS avg_per_rental
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
JOIN payment p ON r.rental_id = p.rental_id
GROUP BY c.customer_id
ORDER BY avg_per_rental DESC
LIMIT 10;
\`\`\`

## العملاء النشطون لأكثر من 3 أشهر

\`\`\`sql
SELECT
  c.first_name || ' ' || c.last_name AS customer,
  CAST(julianday(MAX(r.rental_date)) - julianday(MIN(r.rental_date)) AS INTEGER) AS days_active
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
GROUP BY c.customer_id
HAVING days_active > 90
ORDER BY days_active DESC;
\`\`\`

## نشاط الإيجار الشهري لكل عميل

\`\`\`sql
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name AS customer,
  COUNT(DISTINCT strftime('%Y-%m', r.rental_date)) AS active_months
FROM customer c
JOIN rental r ON c.customer_id = r.customer_id
GROUP BY c.customer_id
ORDER BY active_months DESC
LIMIT 10;
\`\`\`
`,
    exercises: [
      {
        id: 1,
        question: "Find the top 10 customers by average spending per rental. Show customer name, rental count, and avg_per_rental (rounded to 2 decimals), ordered by avg_per_rental DESC.",
        questionAr: "ابحث عن أفضل 10 عملاء من حيث متوسط الإنفاق لكل إيجار. اعرض اسم العميل وعدد الإيجارات ومتوسط الإنفاق (مقرَّبًا لمنزلتين)، مرتبًا تنازليًا.",
        hint: "SUM(amount) / COUNT(rental_id) AS avg_per_rental, ORDER BY avg_per_rental DESC LIMIT 10",
        hintAr: "SUM(amount) / COUNT(rental_id) AS avg_per_rental، ORDER BY avg_per_rental DESC LIMIT 10",
        expectedQuery: "SELECT c.first_name || ' ' || c.last_name AS customer, COUNT(r.rental_id) AS rentals, ROUND(SUM(p.amount) / COUNT(r.rental_id), 2) AS avg_per_rental FROM customer c JOIN rental r ON c.customer_id = r.customer_id JOIN payment p ON r.rental_id = p.rental_id GROUP BY c.customer_id ORDER BY avg_per_rental DESC LIMIT 10",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /SUM.*amount.*\/.*COUNT|SUM.*\/.*COUNT/i.test(q) && /avg_per_rental/i.test(q),
      },
      {
        id: 2,
        question: "Find customers who rented in at least 3 distinct months. Use strftime('%Y-%m', rental_date) to extract month. Show customer name and active_months, ordered by active_months DESC.",
        questionAr: "ابحث عن العملاء الذين استأجروا في 3 أشهر مختلفة على الأقل. استخدم strftime('%Y-%m', rental_date) لاستخراج الشهر. اعرض اسم العميل وعدد الأشهر النشطة، مرتبًا تنازليًا.",
        hint: "COUNT(DISTINCT strftime('%Y-%m', rental_date)) AS active_months, HAVING active_months >= 3",
        hintAr: "COUNT(DISTINCT strftime('%Y-%m', rental_date)) AS active_months، HAVING active_months >= 3",
        expectedQuery: "SELECT c.first_name || ' ' || c.last_name AS customer, COUNT(DISTINCT strftime('%Y-%m', r.rental_date)) AS active_months FROM customer c JOIN rental r ON c.customer_id = r.customer_id GROUP BY c.customer_id HAVING active_months >= 3 ORDER BY active_months DESC",
        checkFunction: (result: unknown[], q = '') =>
          result.length > 0 && /strftime/i.test(q) && /HAVING/i.test(q) && /active_months|>=\s*3/i.test(q),
      },
    ],
  },
];
