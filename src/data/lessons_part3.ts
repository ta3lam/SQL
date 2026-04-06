import { Lesson } from '../types';

export const lessonsP3: Lesson[] = [
  // ════════════════════════════════════════════════════
  //  LEVEL 7 — SQL FUNCTIONS
  // ════════════════════════════════════════════════════
  {
    id: 26,
    title: 'CASE WHEN',
    titleAr: 'CASE WHEN — المنطق الشرطي',
    description: 'Conditional logic inside SQL queries — if/else for columns and aggregates.',
    descriptionAr: 'المنطق الشرطي داخل استعلامات SQL — إذا/وإلا للأعمدة والتجميعات.',
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
    contentAr: `
## CASE WHEN — المنطق الشرطي

\`CASE WHEN\` هو جملة إذا/وإلا في SQL. تتيح لك إرجاع قيم مختلفة بناءً على شروط، مباشرةً داخل الاستعلام. لا حاجة لأي كود إجرائي.

---

## Searched CASE (الأكثر شيوعاً)

\`\`\`sql
CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  ...
  ELSE default_result
END
\`\`\`

\`\`\`sql
-- تصنيف الموظفين حسب مستوى الراتب
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

## Simple CASE (مطابقة القيم)

أوضح عند مقارنة عمود واحد بعدة قيم:

\`\`\`sql
-- Simple CASE: مقارنة عمود واحد بقيم محددة
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

## CASE داخل WHERE

\`\`\`sql
-- فلتر ديناميكي: إرجاع كل الطلبات إذا كان status فارغاً، وإلا تطبيق الفلتر
SELECT * FROM orders
WHERE status = CASE
  WHEN 1 = 1 THEN 'delivered'  -- يُطبَّق دائماً هنا، لكنه مفيد مع المعاملات
  ELSE status
END;
\`\`\`

---

## CASE داخل ORDER BY

\`\`\`sql
-- ترتيب مخصص: pending أولاً، ثم processing، ثم البقية
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

## CASE مع التجميعات (Pivot)

تحويل الصفوف إلى أعمدة — نمط قوي جداً:

\`\`\`sql
-- عدد الطلبات حسب الحالة في صف واحد (pivot)
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
-- الإيرادات حسب الربع في صف واحد
SELECT
  ROUND(SUM(CASE WHEN order_date LIKE '2024-01%' THEN total_amount ELSE 0 END), 2) AS q1,
  ROUND(SUM(CASE WHEN order_date LIKE '2024-02%' THEN total_amount ELSE 0 END), 2) AS q2_feb,
  ROUND(SUM(CASE WHEN order_date LIKE '2024-03%' THEN total_amount ELSE 0 END), 2) AS q2_mar,
  ROUND(SUM(CASE WHEN order_date LIKE '2024-04%' THEN total_amount ELSE 0 END), 2) AS q3_apr
FROM orders
WHERE status = 'delivered';
\`\`\`

---

## CASE لتنظيف البيانات

\`\`\`sql
-- توحيد البيانات غير المتسقة
SELECT
  name,
  CASE UPPER(loyalty_tier)
    WHEN 'GOLD'   THEN 'Gold'
    WHEN 'SILVER' THEN 'Silver'
    WHEN 'BRONZE' THEN 'Bronze'
    ELSE 'Unknown'
  END AS normalized_tier
FROM customers;

-- استبدال البريد الإلكتروني الفارغ (NULL) بعنوان بريد مؤقت
SELECT
  name,
  CASE
    WHEN email IS NULL THEN LOWER(REPLACE(name, ' ', '.')) || '@noemail.com'
    ELSE email
  END AS effective_email
FROM employees;
\`\`\`

---

## CASE المتداخل (استخدمه باعتدال)

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

احرص على إبقاء التداخل ضحلاً. جمل CASE المتداخلة بعمق يصعب صيانتها.
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
        questionAr: 'أضف عموداً باسم "price_category" إلى استعلام products: "Budget" إذا كان السعر أقل من 50، و"Standard" للسعر بين 50 و199، و"Premium" للسعر 200 فأكثر.',
        hint: "CASE WHEN price < 50 THEN 'Budget' WHEN price < 200 THEN 'Standard' ELSE 'Premium' END",
        hintAr: "CASE WHEN price < 50 THEN 'Budget' WHEN price < 200 THEN 'Standard' ELSE 'Premium' END",
        expectedQuery: "SELECT name, price, CASE WHEN price < 50 THEN 'Budget' WHEN price < 200 THEN 'Standard' ELSE 'Premium' END AS price_category FROM products",
        checkFunction: (result, q = '') => result.length > 0 && /CASE\s+WHEN/i.test(q),
      },
      {
        id: 2,
        question: 'Count how many customers are in each loyalty tier using CASE WHEN inside COUNT (pivot-style: one row with three columns: gold_count, silver_count, bronze_count).',
        questionAr: 'احسب عدد العملاء في كل مستوى ولاء باستخدام CASE WHEN داخل COUNT (بأسلوب pivot: صف واحد بثلاثة أعمدة: gold_count وsilver_count وbronze_count).',
        hint: "COUNT(CASE WHEN loyalty_tier = 'Gold' THEN 1 END) AS gold_count, ...",
        hintAr: "COUNT(CASE WHEN loyalty_tier = 'Gold' THEN 1 END) AS gold_count, ...",
        expectedQuery: "SELECT COUNT(CASE WHEN loyalty_tier = 'Gold' THEN 1 END) AS gold_count, COUNT(CASE WHEN loyalty_tier = 'Silver' THEN 1 END) AS silver_count, COUNT(CASE WHEN loyalty_tier = 'Bronze' THEN 1 END) AS bronze_count FROM customers",
        checkFunction: (result, q = '') => result.length > 0 && /CASE\s+WHEN/i.test(q) && /COUNT/i.test(q),
      },
    ],
  },

  {
    id: 27,
    title: 'String Functions',
    titleAr: 'String Functions — دوال النصوص',
    description: 'LENGTH, UPPER, LOWER, SUBSTR, REPLACE, TRIM, INSTR, PRINTF — full string toolkit.',
    descriptionAr: 'LENGTH وUPPER وLOWER وSUBSTR وREPLACE وTRIM وINSTR وPRINTF — مجموعة أدوات النصوص الكاملة.',
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
    contentAr: `
## String Functions في SQLite

معالجة النصوص ضرورية لتنظيف البيانات وتنسيق المخرجات وبناء منطق البحث.

---

## LENGTH

تُرجع عدد الأحرف في النص.

\`\`\`sql
SELECT LENGTH('Hello');           -- 5
SELECT LENGTH(name) FROM employees;

-- البحث عن موظفين بأسماء طويلة (أخطاء محتملة في إدخال البيانات)
SELECT name, LENGTH(name) AS name_length
FROM employees
WHERE LENGTH(name) > 15
ORDER BY name_length DESC;

-- LENGTH على NULL تُرجع NULL
SELECT LENGTH(NULL);  -- NULL
\`\`\`

---

## UPPER / LOWER

التحويل إلى أحرف كبيرة أو صغيرة.

\`\`\`sql
SELECT UPPER('hello world');  -- 'HELLO WORLD'
SELECT LOWER('ALICE');        -- 'alice'

-- بحث غير حساس لحالة الأحرف
SELECT * FROM employees
WHERE LOWER(name) LIKE '%alice%';

-- توحيد الشكل للعرض
SELECT UPPER(name) AS name_upper FROM customers;
\`\`\`

---

## SUBSTR (الجزء النصي)

استخراج جزء من النص.

\`\`\`sql
SUBSTR(string, start, length)
-- start تبدأ من 1 (الحرف الأول = الموضع 1)
-- length اختيارية — إذا حُذفت تمتد إلى نهاية النص

SELECT SUBSTR('Hello World', 1, 5);   -- 'Hello'
SELECT SUBSTR('Hello World', 7);       -- 'World'
SELECT SUBSTR('Hello World', -5);      -- 'World' (من النهاية في بعض قواعد البيانات)

-- استخراج السنة من نص التاريخ '2024-01-15'
SELECT name, SUBSTR(hire_date, 1, 4) AS hire_year
FROM employees;

-- استخراج الشهر
SELECT SUBSTR(order_date, 6, 2) AS month FROM orders;

-- استخراج النطاق من البريد الإلكتروني
SELECT email, SUBSTR(email, INSTR(email, '@') + 1) AS domain
FROM employees
WHERE email IS NOT NULL;
\`\`\`

---

## REPLACE

استبدال جميع تكرارات نص فرعي.

\`\`\`sql
REPLACE(string, search, replacement)

SELECT REPLACE('Hello World', 'World', 'SQL');  -- 'Hello SQL'

-- توحيد تنسيقات أرقام الهاتف
SELECT REPLACE(REPLACE(phone, '-', ''), ' ', '') AS normalized_phone
FROM customers;

-- تنظيف المسميات الوظيفية
SELECT REPLACE(job_title, 'VP of ', '') AS short_title
FROM employees
WHERE job_title LIKE 'VP%';

-- حذف الأحرف الخاصة
SELECT REPLACE(name, '.', '') AS clean_name FROM customers;
\`\`\`

---

## TRIM وLTRIM وRTRIM

إزالة المسافات أو الأحرف المحددة من بداية النص أو نهايته أو كليهما.

\`\`\`sql
SELECT TRIM('   hello world   ');        -- 'hello world'
SELECT LTRIM('   hello');                -- 'hello' (قص من اليسار)
SELECT RTRIM('hello   ');                -- 'hello' (قص من اليمين)
SELECT TRIM('***hello***', '*');         -- 'hello' (إزالة حرف محدد)

-- تنظيف البيانات غير المرتبة
SELECT TRIM(name) AS clean_name FROM employees;

-- مفيد عند استيراد البيانات من ملفات CSV بها مسافات زائدة
\`\`\`

---

## INSTR — البحث عن موضع نص فرعي

\`\`\`sql
INSTR(string, substring)
-- تُرجع موضع أول تكرار (يبدأ من 1)، أو 0 إذا لم يُوجد

SELECT INSTR('Hello World', 'World');   -- 7
SELECT INSTR('alice@company.com', '@'); -- 6

-- البحث عن موضع @ في البريد الإلكتروني
SELECT email, INSTR(email, '@') AS at_position
FROM employees
WHERE email IS NOT NULL;

-- استخراج اسم المستخدم من البريد (كل ما قبل @)
SELECT
  email,
  SUBSTR(email, 1, INSTR(email, '@') - 1) AS username
FROM employees
WHERE email IS NOT NULL;
\`\`\`

---

## الدمج باستخدام ||

\`\`\`sql
-- بناء نصوص عرض كاملة
SELECT first_name || ' ' || last_name AS full_name FROM users;
SELECT name || ' ($' || price || ')' AS label FROM products;

-- توليد بريد إلكتروني من الاسم
SELECT LOWER(REPLACE(name, ' ', '.')) || '@company.com' AS generated_email
FROM employees
WHERE email IS NULL;
\`\`\`

---

## PRINTF / FORMAT

نصوص منسقة (مثل printf في لغة C):

\`\`\`sql
-- تنسيق الراتب بعلامة العملة وفواصل الآلاف
SELECT name, PRINTF('$%.2f', salary) AS formatted_salary
FROM employees;

SELECT PRINTF('%05d', 42);          -- '00042' (مبطّن بالأصفار)
SELECT PRINTF('%.3f', 3.14159);     -- '3.142' (3 منازل عشرية)
SELECT PRINTF('%10s', 'hi');        -- '        hi' (محاذاة يمين لـ10 أحرف)
\`\`\`

---

## تطبيق شامل

\`\`\`sql
-- بناء دليل موظفين منسق
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
        questionAr: 'اعرض أسماء جميع الموظفين بأحرف كبيرة (UPPERCASE) وطول كل اسم.',
        hint: 'SELECT UPPER(name), LENGTH(name) FROM employees',
        hintAr: 'SELECT UPPER(name), LENGTH(name) FROM employees',
        expectedQuery: 'SELECT UPPER(name) AS name_upper, LENGTH(name) AS name_length FROM employees',
        checkFunction: (result, q = '') => result.length > 0 && /UPPER|LENGTH/i.test(q) && /FROM\s+employees\b/i.test(q),
      },
      {
        id: 2,
        question: 'Extract the year from hire_date for all employees. Show name and hire_year.',
        questionAr: 'استخرج السنة من hire_date لجميع الموظفين. اعرض name وhire_year.',
        hint: "SUBSTR(hire_date, 1, 4) AS hire_year",
        hintAr: "SUBSTR(hire_date, 1, 4) AS hire_year",
        expectedQuery: "SELECT name, SUBSTR(hire_date, 1, 4) AS hire_year FROM employees",
        checkFunction: (result, q = '') => result.length > 0 && /SUBSTR/i.test(q) && /FROM\s+employees\b/i.test(q),
      },
      {
        id: 3,
        question: 'For all employees WITH an email, extract only the username part (before the @). Show name and username.',
        questionAr: 'لجميع الموظفين الذين لديهم بريد إلكتروني، استخرج اسم المستخدم فقط (ما قبل @). اعرض name وusername.',
        hint: "SUBSTR(email, 1, INSTR(email,'@')-1)",
        hintAr: "SUBSTR(email, 1, INSTR(email,'@')-1)",
        expectedQuery: "SELECT name, SUBSTR(email, 1, INSTR(email, '@') - 1) AS username FROM employees WHERE email IS NOT NULL",
        checkFunction: (result, q = '') => result.length > 0 && /SUBSTR/i.test(q) && /WHERE/i.test(q),
      },
    ],
  },

  {
    id: 28,
    title: 'Date & Time Functions',
    titleAr: 'Date & Time Functions — دوال التاريخ والوقت',
    description: 'Work with dates in SQLite using strftime, date(), datetime(), and julianday().',
    descriptionAr: 'التعامل مع التواريخ في SQLite باستخدام strftime وdate() وdatetime() وjulianday().',
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
    contentAr: `
## التاريخ والوقت في SQLite

تخزن SQLite التواريخ إما كنص (ISO 8601: \`'YYYY-MM-DD'\`) أو كعدد حقيقي (رقم اليوم الجولياني) أو كعدد صحيح (Unix timestamp). تتعامل دوال التاريخ المدمجة مع الأنواع الثلاثة.

---

## التاريخ والوقت الحاليان

\`\`\`sql
SELECT date('now');                   -- التاريخ الحالي: '2024-07-15'
SELECT time('now');                   -- الوقت الحالي: '14:30:22'
SELECT datetime('now');               -- التاريخ والوقت: '2024-07-15 14:30:22'
SELECT strftime('%s', 'now');         -- Unix timestamp (ثواني منذ 1970-01-01)
SELECT julianday('now');              -- رقم اليوم الجولياني (2460507.1...)
\`\`\`

---

## strftime — السكين السويسري لتواريخ SQLite

\`strftime(format, date)\` تُنسّق تاريخاً باستخدام رموز التنسيق:

| الرمز | المعنى | مثال |
|-------|--------|------|
| \`%Y\` | السنة (4 أرقام) | 2024 |
| \`%m\` | الشهر (01-12) | 07 |
| \`%d\` | اليوم (01-31) | 15 |
| \`%H\` | الساعة (00-23) | 14 |
| \`%M\` | الدقيقة (00-59) | 30 |
| \`%S\` | الثانية (00-59) | 22 |
| \`%w\` | يوم الأسبوع (0=الأحد) | 1 |
| \`%j\` | يوم السنة (001-366) | 197 |
| \`%W\` | رقم الأسبوع (00-53) | 28 |

\`\`\`sql
-- استخراج أجزاء من hire_date
SELECT
  name,
  hire_date,
  strftime('%Y', hire_date) AS year,
  strftime('%m', hire_date) AS month,
  strftime('%d', hire_date) AS day
FROM employees;

-- تجميع الطلبات حسب الشهر
SELECT
  strftime('%Y-%m', order_date) AS year_month,
  COUNT(*) AS orders,
  ROUND(SUM(total_amount), 2) AS revenue
FROM orders
GROUP BY strftime('%Y-%m', order_date)
ORDER BY year_month;

-- الطلبات في يوم معين من الأسبوع (0=الأحد، 1=الاثنين، إلخ)
SELECT * FROM orders
WHERE strftime('%w', order_date) = '1';  -- أيام الاثنين فقط
\`\`\`

---

## الحساب على التواريخ باستخدام المُعدِّلات

تقبل \`date()\` و\`datetime()\` مُعدِّلات مثل \`'+N days'\`:

\`\`\`sql
-- أمس وغداً
SELECT date('now', '-1 day')  AS yesterday;
SELECT date('now', '+1 day')  AS tomorrow;

-- بعد 30 يوماً
SELECT date('now', '+30 days') AS due_date;

-- أول يوم في الشهر الحالي
SELECT date('now', 'start of month') AS month_start;

-- آخر يوم في الشهر الحالي
SELECT date('now', 'start of month', '+1 month', '-1 day') AS month_end;

-- أول يوم في السنة الحالية
SELECT date('now', 'start of year') AS year_start;

-- قبل ثلاثة أشهر
SELECT date('now', '-3 months') AS three_months_ago;
\`\`\`

---

## حساب الفارق بين تاريخين

لا تحتوي SQLite على دالة DATEDIFF(). استخدم julianday():

\`\`\`sql
-- عدد الأيام منذ توظيف كل موظف
SELECT
  name,
  hire_date,
  CAST(julianday('now') - julianday(hire_date) AS INTEGER) AS days_employed,
  ROUND((julianday('now') - julianday(hire_date)) / 365.25, 1) AS years_employed
FROM employees
ORDER BY days_employed DESC;

-- عدد الأيام بين تاريخ الطلب واليوم
SELECT
  id,
  order_date,
  status,
  CAST(julianday('now') - julianday(order_date) AS INTEGER) AS days_ago
FROM orders
ORDER BY days_ago DESC;

-- العمر بالسنوات (من تاريخ التوظيف)
SELECT
  name,
  hire_date,
  CAST((julianday('now') - julianday(hire_date)) / 365.25 AS INTEGER) AS years
FROM employees;
\`\`\`

---

## الفلترة بنطاقات تاريخ

\`\`\`sql
-- الطلبات في آخر 30 يوماً
SELECT * FROM orders
WHERE order_date >= date('now', '-30 days');

-- الموظفون الذين تم توظيفهم في آخر 3 سنوات
SELECT name, hire_date FROM employees
WHERE hire_date >= date('now', '-3 years')
ORDER BY hire_date DESC;

-- طلبات الشهر الحالي
SELECT * FROM orders
WHERE strftime('%Y-%m', order_date) = strftime('%Y-%m', 'now');

-- طلبات شهر محدد
SELECT * FROM orders
WHERE strftime('%Y-%m', order_date) = '2024-01';
\`\`\`

---

## دوال التاريخ في قواعد البيانات الأخرى

| الهدف | SQLite | PostgreSQL | MySQL |
|-------|--------|-----------|-------|
| التاريخ الحالي | \`date('now')\` | \`CURRENT_DATE\` | \`CURDATE()\` |
| استخراج السنة | \`strftime('%Y', d)\` | \`EXTRACT(YEAR FROM d)\` | \`YEAR(d)\` |
| الفارق بالأيام | \`julianday(a)-julianday(b)\` | \`a - b\` | \`DATEDIFF(a,b)\` |
| إضافة أيام | \`date(d, '+N days')\` | \`d + INTERVAL 'N days'\` | \`DATE_ADD(d, INTERVAL N DAY)\` |
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
        questionAr: 'استخرج السنة والشهر من order_date لجميع الطلبات، واحسب عدد الطلبات لكل سنة-شهر.',
        hint: "strftime('%Y-%m', order_date) for grouping",
        hintAr: "استخدم strftime('%Y-%m', order_date) للتجميع",
        expectedQuery: "SELECT strftime('%Y-%m', order_date) AS year_month, COUNT(*) AS order_count FROM orders GROUP BY strftime('%Y-%m', order_date) ORDER BY year_month",
        checkFunction: (result, q = '') => result.length > 0 && /GROUP\s+BY/i.test(q) && /strftime/i.test(q),
      },
      {
        id: 2,
        question: 'Find employees hired before 2019 and calculate how many years they have worked (round to 1 decimal).',
        questionAr: 'ابحث عن الموظفين الذين تم توظيفهم قبل عام 2019، واحسب عدد سنوات عملهم (مقرباً إلى منزلة عشرية واحدة).',
        hint: "ROUND((julianday('now') - julianday(hire_date)) / 365.25, 1)",
        hintAr: "ROUND((julianday('now') - julianday(hire_date)) / 365.25, 1)",
        expectedQuery: "SELECT name, hire_date, ROUND((julianday('now') - julianday(hire_date)) / 365.25, 1) AS years FROM employees WHERE hire_date < '2019-01-01' ORDER BY years DESC",
        checkFunction: (result, q = '') => result.length > 0 && /julianday/i.test(q) && /WHERE/i.test(q),
      },
    ],
  },

  {
    id: 29,
    title: 'COALESCE, NULLIF, IIF',
    titleAr: 'COALESCE وNULLIF وIIF',
    description: 'Handle NULLs elegantly and write compact conditional expressions.',
    descriptionAr: 'التعامل مع قيم NULL بأناقة وكتابة تعبيرات شرطية مختصرة.',
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
    contentAr: `
## COALESCE — إرجاع أول قيمة غير NULL

\`COALESCE(val1, val2, ..., valN)\` تُقيّم الحجج من اليسار إلى اليمين وتُرجع **أول قيمة غير NULL**. إذا كانت جميع الحجج NULL، تُرجع NULL.

\`\`\`sql
-- استخدام أساسي
SELECT COALESCE(NULL, NULL, 'third', 'fourth');  -- 'third'
SELECT COALESCE(NULL, 5);                         -- 5
SELECT COALESCE(10, 5);                           -- 10 (الأولى غير NULL)

-- استبدال البريد الإلكتروني الفارغ بقيمة افتراضية
SELECT name, COALESCE(email, 'not-provided') AS email
FROM employees;

-- استبدال رقم الهاتف الفارغ بـ 'N/A'
SELECT name, COALESCE(phone, 'N/A') AS phone
FROM customers;

-- استخدام سلسلة من القيم الاحتياطية
SELECT
  name,
  COALESCE(email, name || '@noemail.com', 'unknown') AS contact
FROM employees;

-- تجنب القسمة على صفر
SELECT
  total_amount,
  COALESCE(total_amount, 0) / COALESCE(quantity, 1) AS unit_value
FROM orders;
\`\`\`

---

## COALESCE في الحسابات

\`\`\`sql
-- المجموع مع معاملة NULL كصفر
SELECT
  SUM(COALESCE(total_amount, 0)) AS total_including_nulls
FROM orders;

-- المتوسط مع معاملة NULL كصفر
SELECT
  AVG(COALESCE(total_amount, 0)) AS avg_with_zeros,
  AVG(total_amount)              AS avg_ignoring_nulls
FROM orders;
-- ستختلف النتيجتان إذا كانت هناك قيم NULL في total_amount

-- COALESCE في GROUP BY (تجميع NULL تحت قيمة محددة)
SELECT
  COALESCE(department_id, -1) AS dept_id,
  COUNT(*) AS employees
FROM employees
GROUP BY COALESCE(department_id, -1);
\`\`\`

---

## NULLIF — تحويل قيمة إلى NULL

\`NULLIF(a, b)\` تُرجع NULL إذا كان \`a = b\`، وإلا تُرجع \`a\`. هي عكس COALESCE.

الاستخدام الرئيسي: **تجنب القسمة على صفر**

\`\`\`sql
-- NULLIF(x, 0) تُرجع NULL إذا كان x يساوي 0، وإلا تُرجع x
SELECT 100 / NULLIF(0, 0);   -- NULL (لا خطأ قسمة على صفر!)
SELECT 100 / NULLIF(5, 0);   -- 20

-- قسمة آمنة: حساب متوسط سعر الوحدة لكل طلب
SELECT
  order_id,
  SUM(quantity) AS total_items,
  SUM(unit_price) AS total_price,
  SUM(unit_price) / NULLIF(SUM(quantity), 0) AS avg_item_price
FROM order_items
GROUP BY order_id;

-- تحويل نصوص 'N/A' إلى NULL
SELECT
  name,
  NULLIF(phone, 'N/A') AS phone_cleaned
FROM customers;

-- NULLIF للعثور على صفوف يتطابق فيها عمودان (تُرجع NULL عند التطابق)
SELECT name, salary, NULLIF(salary, 75000) AS salary_if_not_75k
FROM employees;
\`\`\`

---

## IIF — إذا/وإلا مختصرة

\`IIF(condition, true_value, false_value)\` — اختصار لـ CASE WHEN البسيطة:

\`\`\`sql
-- مكافئ لـ: CASE WHEN is_active = 1 THEN 'Active' ELSE 'Inactive' END
SELECT name, IIF(is_active = 1, 'Active', 'Inactive') AS status
FROM employees;

-- IIF للتصنيف الثنائي
SELECT
  name,
  salary,
  IIF(salary > 80000, 'High', 'Standard') AS pay_grade
FROM employees;

-- IIF مع NULL
SELECT IIF(NULL, 'yes', 'no');   -- 'no' (NULL تُعامَل كـ false في IIF)
SELECT IIF(0, 'yes', 'no');      -- 'no'
SELECT IIF(1, 'yes', 'no');      -- 'yes'
\`\`\`

---

## متى تختار CASE أو IIF أو COALESCE؟

| الحالة | الأداة الأنسب |
|--------|--------------|
| استبدال NULL بقيمة | \`COALESCE\` |
| شروط متعددة | \`CASE WHEN\` |
| شرط ثنائي بسيط | \`IIF\` |
| تحويل قيمة محددة إلى NULL | \`NULLIF\` |
| تجنب القسمة على صفر | \`NULLIF\` |
| أول قيمة غير NULL من قائمة | \`COALESCE\` |

\`\`\`sql
-- الأربعة معاً في استعلام واحد
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
        questionAr: 'اعرض جميع الموظفين مع بريدهم الإلكتروني، مع استبدال القيم الفارغة (NULL) بـ "no-email@company.com" باستخدام COALESCE.',
        hint: "COALESCE(email, 'no-email@company.com')",
        hintAr: "COALESCE(email, 'no-email@company.com')",
        expectedQuery: "SELECT name, COALESCE(email, 'no-email@company.com') AS email FROM employees",
        checkFunction: (result, q = '') => result.length > 0 && /COALESCE/i.test(q),
      },
      {
        id: 2,
        question: 'Show employee names and a "status" column using IIF: "Active" if is_active=1, "Inactive" otherwise.',
        questionAr: 'اعرض أسماء الموظفين وعمود "status" باستخدام IIF: "Active" إذا كان is_active=1، و"Inactive" في غير ذلك.',
        hint: "IIF(is_active = 1, 'Active', 'Inactive') AS status",
        hintAr: "IIF(is_active = 1, 'Active', 'Inactive') AS status",
        expectedQuery: "SELECT name, IIF(is_active = 1, 'Active', 'Inactive') AS status FROM employees",
        checkFunction: (result, q = '') => result.length > 0 && /IIF/i.test(q),
      },
    ],
  },

  // ════════════════════════════════════════════════════
  //  LEVEL 8 — SUBQUERIES
  // ════════════════════════════════════════════════════
  {
    id: 30,
    title: 'Scalar Subqueries',
    titleAr: 'الاستعلامات الفرعية القيمية - Scalar Subqueries',
    description: 'Subqueries that return a single value — use them in SELECT, WHERE, and HAVING.',
    descriptionAr: 'استعلامات فرعية تُرجع قيمة واحدة — استخدمها في SELECT وWHERE وHAVING.',
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
    contentAr: `
## ما هو الاستعلام الفرعي؟

**الاستعلام الفرعي** (subquery) — ويُسمى أيضاً الاستعلام الداخلي أو المتداخل — هو استعلام SQL مضمَّن داخل استعلام آخر. يستخدم الاستعلام الخارجي نتيجة الاستعلام الداخلي.

يمكن أن تظهر الاستعلامات الفرعية في:
- \`WHERE\` — للفلترة بناءً على قيمة محسوبة
- \`SELECT\` — كعمود محسوب
- \`FROM\` — كجدول افتراضي (جدول مشتق)
- \`HAVING\` — لفلترة المجموعات بناءً على قيمة محسوبة

---

## Scalar Subquery — تُرجع قيمة واحدة

تُرجع الـ scalar subquery بالضبط **صفاً واحداً وعموداً واحداً**. يمكن استخدامها في أي مكان يُتوقع فيه قيمة واحدة.

\`\`\`sql
-- إيجاد الموظفين الذين يتقاضون أكثر من المتوسط العام
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- يُنفَّذ الاستعلام الفرعي أولاً: SELECT AVG(salary) FROM employees → 78560
-- ثم الاستعلام الخارجي: WHERE salary > 78560
\`\`\`

---

## Scalar Subqueries داخل WHERE

\`\`\`sql
-- الموظفون الذين يتقاضون أكثر من Alice Johnson
SELECT name, salary
FROM employees
WHERE salary > (
  SELECT salary FROM employees WHERE name = 'Alice Johnson'
);

-- الطلبات التي تتجاوز متوسط قيمة الطلبات
SELECT id, customer_id, total_amount
FROM orders
WHERE total_amount > (SELECT AVG(total_amount) FROM orders);

-- المنتجات الأرخص من متوسط السعر في الجدول كله
SELECT name, price
FROM products
WHERE price < (SELECT AVG(price) FROM products)
  AND is_available = 1
ORDER BY price;

-- الموظفون في القسم الذي يملك أعلى إجمالي رواتب
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

## Scalar Subqueries داخل SELECT

إرجاع قيمة محسوبة واحدة كعمود في كل صف:

\`\`\`sql
-- راتب كل موظف مقارنةً بمتوسط الشركة
SELECT
  name,
  salary,
  (SELECT AVG(salary) FROM employees)          AS company_avg,
  salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg,
  ROUND(salary / (SELECT AVG(salary) FROM employees) * 100, 1) AS pct_of_avg
FROM employees
ORDER BY salary DESC;

-- قيمة كل طلب مقارنةً بمتوسط الطلبات
SELECT
  id,
  total_amount,
  (SELECT ROUND(AVG(total_amount), 2) FROM orders) AS avg_order,
  total_amount - (SELECT AVG(total_amount) FROM orders) AS diff
FROM orders
ORDER BY diff DESC;
\`\`\`

---

## Scalar Subqueries داخل HAVING

\`\`\`sql
-- الأقسام التي يتجاوز متوسط رواتبها المتوسط العام للشركة
SELECT
  department_id,
  ROUND(AVG(salary), 0) AS dept_avg
FROM employees
GROUP BY department_id
HAVING AVG(salary) > (SELECT AVG(salary) FROM employees)
ORDER BY dept_avg DESC;
\`\`\`

---

## متى تفشل الـ Scalar Subqueries؟

يجب أن تُرجع الـ scalar subquery صفاً واحداً بالضبط. إذا أرجعت أكثر أو أقل، ستحصل على خطأ:

\`\`\`sql
-- ❌ خطأ: قد تُرجع صفوفاً متعددة إذا كان لعدة موظفين نفس الراتب الأقصى
SELECT name FROM employees
WHERE salary = (SELECT MAX(salary) FROM employees WHERE department_id = 1);
-- MAX() تُرجع دائماً صفاً واحداً — هذا صحيح ✅

-- ❌ خطأ حقيقي: تُرجع صفوفاً متعددة
SELECT name FROM employees
WHERE salary = (SELECT salary FROM employees WHERE department_id = 1);
-- عدة موظفين في القسم 1 → خطأ!

-- ✅ الحل: استخدام LIMIT 1 أو IN بدلاً من ذلك
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
        questionAr: 'ابحث عن جميع الموظفين الذين يتقاضون أكثر من متوسط رواتب جميع الموظفين.',
        hint: 'WHERE salary > (SELECT AVG(salary) FROM employees)',
        hintAr: 'WHERE salary > (SELECT AVG(salary) FROM employees)',
        expectedQuery: 'SELECT name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees) ORDER BY salary DESC',
        checkFunction: (result, q = '') => result.length > 0 && /SELECT[\s\S]*SELECT/i.test(q),
      },
      {
        id: 2,
        question: 'Show each product with its price and the average price of all products (as a column avg_price).',
        questionAr: 'اعرض كل منتج مع سعره ومتوسط سعر جميع المنتجات (كعمود باسم avg_price).',
        hint: '(SELECT ROUND(AVG(price), 2) FROM products) AS avg_price',
        hintAr: '(SELECT ROUND(AVG(price), 2) FROM products) AS avg_price',
        expectedQuery: 'SELECT name, price, (SELECT ROUND(AVG(price), 2) FROM products) AS avg_price FROM products',
        checkFunction: (result, q = '') => result.length > 0 && /SELECT[\s\S]*SELECT/i.test(q),
      },
    ],
  },

  {
    id: 31,
    title: 'IN / NOT IN with Subqueries',
    titleAr: 'IN / NOT IN مع الاستعلامات الفرعية',
    description: 'Use subqueries that return a list of values to filter rows.',
    descriptionAr: 'استخدام الاستعلامات الفرعية التي تُرجع قائمة من القيم لفلترة الصفوف.',
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
    contentAr: `
## IN مع الاستعلامات الفرعية — نتائج متعددة الصفوف

عندما تحتاج للفلترة بناءً على قائمة محسوبة ديناميكياً (لا قائمة ثابتة)، استخدم استعلاماً فرعياً داخل \`IN\`.

\`\`\`sql
-- إيجاد العملاء الذين قدّموا طلباً واحداً على الأقل
SELECT name, email, loyalty_tier
FROM customers
WHERE id IN (
  SELECT DISTINCT customer_id
  FROM orders
);
-- الاستعلام الفرعي يُرجع قائمة بمعرّفات العملاء الذين لديهم طلبات
-- الاستعلام الخارجي يُرجع العملاء الذين معرّفاتهم موجودة في تلك القائمة
\`\`\`

---

## أمثلة على IN مع الاستعلامات الفرعية

\`\`\`sql
-- الموظفون في الأقسام التي تتجاوز ميزانيتها 400 ألف دولار
SELECT name, department_id, salary
FROM employees
WHERE department_id IN (
  SELECT id
  FROM departments
  WHERE budget > 400000
);

-- المنتجات التي طُلبت مرة واحدة على الأقل
SELECT name, price, stock_quantity
FROM products
WHERE id IN (
  SELECT DISTINCT product_id
  FROM order_items
);

-- العملاء الذين طلبوا منتج 'Laptop'
SELECT name
FROM customers
WHERE id IN (
  SELECT DISTINCT o.customer_id
  FROM orders o
  JOIN order_items oi ON o.id = oi.order_id
  JOIN products p ON oi.product_id = p.id
  WHERE p.name LIKE '%Laptop%'
);

-- الموظفون الذين يُديرون موظفين آخرين (مديرون)
SELECT name, job_title
FROM employees
WHERE id IN (
  SELECT DISTINCT manager_id
  FROM employees
  WHERE manager_id IS NOT NULL
);
\`\`\`

---

## NOT IN مع الاستعلامات الفرعية — الاستثناء

\`\`\`sql
-- العملاء الذين لم يُقدّموا أي طلب قط
SELECT name, email
FROM customers
WHERE id NOT IN (
  SELECT DISTINCT customer_id
  FROM orders
);

-- المنتجات التي لم تُطلَب قط
SELECT name, price
FROM products
WHERE id NOT IN (
  SELECT DISTINCT product_id
  FROM order_items
);

-- الموظفون الذين ليسوا مديرين
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

## ⚠️ فخ NULL مع NOT IN

هذا من أخطر المزالق في SQL:

\`\`\`sql
-- إذا أرجع الاستعلام الفرعي أي NULL، فإن NOT IN تُرجع صفراً من الصفوف!
SELECT name
FROM customers
WHERE id NOT IN (
  SELECT customer_id   -- ⚠️ إذا كانت هناك أي customer_id بقيمة NULL!
  FROM orders
);
-- SQL تُقيّم: id NOT IN (1, 2, NULL, 3, ...)
-- "id <> NULL" تُعطي NULL (وليس TRUE) → لا يمر أي صف!

-- ✅ الحل الآمن: تصفية NULL من الاستعلام الفرعي
SELECT name
FROM customers
WHERE id NOT IN (
  SELECT customer_id
  FROM orders
  WHERE customer_id IS NOT NULL  -- ← أضف هذا!
);

-- ✅ البديل: استخدام NOT EXISTS (آمن دائماً مع NULL)
SELECT name
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);
-- سنتناول EXISTS في الدرس التالي
\`\`\`

---

## IN مقابل JOIN — متى تستخدم أيهما؟

\`\`\`sql
-- الاستعلام الفرعي مع IN: قصد واضح، جيد لـ "هل هذا المعرّف في المجموعة؟"
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE status = 'delivered');

-- JOIN: أفضل عندما تحتاج لأعمدة من كلا الجدولين
SELECT c.name, COUNT(o.id) AS orders
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'delivered'
GROUP BY c.id, c.name;

-- الأداء: تُحسّن قواعد البيانات الحديثة الاثنين بطريقة مشابهة
-- استخدم الأوضح في القراءة لحالتك
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
        questionAr: 'ابحث عن جميع الموظفين الذين يعملون في أقسام تقع في "Building A" (باستخدام IN مع استعلام فرعي).',
        hint: "WHERE department_id IN (SELECT id FROM departments WHERE location = 'Building A')",
        hintAr: "WHERE department_id IN (SELECT id FROM departments WHERE location = 'Building A')",
        expectedQuery: "SELECT name, department_id FROM employees WHERE department_id IN (SELECT id FROM departments WHERE location = 'Building A')",
        checkFunction: (result, q = '') => result.length > 0 && /IN\s*\(/i.test(q) && /SELECT[\s\S]*SELECT/i.test(q),
      },
      {
        id: 2,
        question: 'Find all products that have NEVER been ordered (using NOT IN with a subquery on order_items).',
        questionAr: 'ابحث عن جميع المنتجات التي لم تُطلَب قط (باستخدام NOT IN مع استعلام فرعي على order_items).',
        hint: 'WHERE id NOT IN (SELECT DISTINCT product_id FROM order_items)',
        hintAr: 'WHERE id NOT IN (SELECT DISTINCT product_id FROM order_items)',
        expectedQuery: 'SELECT name, price FROM products WHERE id NOT IN (SELECT DISTINCT product_id FROM order_items)',
        checkFunction: (result, q = '') => result.length > 0 && /NOT\s+IN/i.test(q) && /SELECT[\s\S]*SELECT/i.test(q),
      },
    ],
  },

  {
    id: 32,
    title: 'EXISTS / NOT EXISTS',
    titleAr: 'EXISTS / NOT EXISTS — التحقق من الوجود',
    description: 'Test for row existence — safer than IN/NOT IN and often faster on large datasets.',
    descriptionAr: 'التحقق من وجود صفوف — أكثر أماناً من IN/NOT IN وغالباً أسرع مع البيانات الكبيرة.',
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
    contentAr: `
## EXISTS

\`EXISTS\` تتحقق مما إذا كان الاستعلام الفرعي يُرجع **صفاً واحداً على الأقل**. تُرجع TRUE إذا وُجد أي صف، وFALSE إذا لم يوجد شيء. لا تهتم بالقيم — فقط بالوجود.

\`\`\`sql
SELECT columns FROM table
WHERE EXISTS (
  استعلام فرعي يُشير إلى الجدول الخارجي
);
\`\`\`

---

## EXISTS مقابل IN — الفروق الرئيسية

| الميزة | IN | EXISTS |
|--------|-----|--------|
| أمان NULL | ❌ غير آمنة في NOT IN | ✅ آمنة دائماً |
| الأداء (بيانات كبيرة) | قد تكون بطيئة | غالباً أسرع |
| تُرجع | قيماً فعلية | TRUE/FALSE فقط |
| التوقف عند أول تطابق | ❌ لا | ✅ نعم (دارة قصر) |

---

## أمثلة على EXISTS

\`\`\`sql
-- العملاء الذين قدّموا طلباً واحداً على الأقل
SELECT c.name, c.email
FROM customers c
WHERE EXISTS (
  SELECT 1              -- '1' بالاتفاق — القيمة لا تهم
  FROM orders o
  WHERE o.customer_id = c.id  -- مرتبط: يُشير إلى 'c' الخارجية
);

-- الأقسام التي تحتوي على موظف واحد على الأقل
SELECT d.name
FROM departments d
WHERE EXISTS (
  SELECT 1
  FROM employees e
  WHERE e.department_id = d.id
    AND e.is_active = 1
);

-- المنتجات التي طُلبت في آخر 60 يوماً
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

## NOT EXISTS — الاستثناء الآمن

NOT EXISTS هو البديل الآمن لـ NOT IN عندما قد تكون هناك قيم NULL:

\`\`\`sql
-- العملاء الذين لم يُقدّموا أي طلب قط
-- (آمن 100%، حتى لو كان customer_id قد يكون NULL في orders)
SELECT c.name, c.email, c.joined_date
FROM customers c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
);

-- المنتجات التي لم تُطلَب قط
SELECT p.name, p.price
FROM products p
WHERE NOT EXISTS (
  SELECT 1
  FROM order_items oi
  WHERE oi.product_id = p.id
);

-- الموظفون الذين ليس لديهم مرؤوسون مباشرون
SELECT e.name, e.job_title
FROM employees e
WHERE NOT EXISTS (
  SELECT 1
  FROM employees sub
  WHERE sub.manager_id = e.id
);
\`\`\`

---

## الاستعلام الفرعي المرتبط (Correlated Subquery)

يستخدم كلٌّ من EXISTS وNOT EXISTS دائماً تقريباً **استعلامات فرعية مرتبطة** — يُشير الاستعلام الداخلي إلى قيمة من الاستعلام الخارجي. هذا هو الأساس!

\`\`\`sql
-- الاستعلام الداخلي يُشير إلى c.id من الاستعلام الخارجي
-- يُنفَّذ مرة واحدة لكل صف في الاستعلام الخارجي
SELECT c.name
FROM customers c               -- الاستعلام الخارجي
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id  -- ← الربط: c.id من الاستعلام الخارجي
);
\`\`\`

---

## EXISTS في UPDATE وDELETE

\`\`\`sql
-- تعطيل الموظفين الذين ليس لديهم مرؤوسون ورواتبهم منخفضة
UPDATE employees
SET is_active = 0
WHERE salary < 50000
  AND NOT EXISTS (
    SELECT 1 FROM employees sub WHERE sub.manager_id = employees.id
  );

-- حذف الطلبات للعملاء غير الموجودين
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
        questionAr: 'ابحث عن جميع العملاء الذين قدّموا طلباً واحداً على الأقل باستخدام EXISTS.',
        hint: 'WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)',
        hintAr: 'WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)',
        expectedQuery: 'SELECT c.name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)',
        checkFunction: (result, q = '') => result.length > 0 && /EXISTS/i.test(q),
      },
      {
        id: 2,
        question: 'Find all employees who have at least one direct report (they are a manager) using EXISTS.',
        questionAr: 'ابحث عن جميع الموظفين الذين لديهم مرؤوس مباشر واحد على الأقل (أي أنهم مديرون) باستخدام EXISTS.',
        hint: 'WHERE EXISTS (SELECT 1 FROM employees sub WHERE sub.manager_id = e.id)',
        hintAr: 'WHERE EXISTS (SELECT 1 FROM employees sub WHERE sub.manager_id = e.id)',
        expectedQuery: 'SELECT e.name, e.job_title FROM employees e WHERE EXISTS (SELECT 1 FROM employees sub WHERE sub.manager_id = e.id)',
        checkFunction: (result, q = '') => result.length > 0 && /EXISTS/i.test(q),
      },
    ],
  },

  {
    id: 33,
    title: 'Correlated Subqueries & Derived Tables',
    titleAr: 'الاستعلامات الفرعية المرتبطة والجداول المشتقة',
    description: 'Row-by-row subqueries and inline views — the most powerful subquery techniques.',
    descriptionAr: 'الاستعلامات الفرعية على مستوى الصف والعروض المضمّنة — أقوى تقنيات الاستعلامات الفرعية.',
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
    contentAr: `
## الاستعلامات الفرعية المرتبطة (Correlated Subqueries)

الاستعلام الفرعي المرتبط يُشير إلى أعمدة من الاستعلام الخارجي. على خلاف الاستعلام الفرعي العادي (الذي يُنفَّذ مرة واحدة)، يُنفَّذ الاستعلام الفرعي المرتبط **مرة واحدة لكل صف** في الاستعلام الخارجي.

\`\`\`sql
-- لكل موظف، احسب راتبه مقارنةً بمتوسط قسمه
SELECT
  e.name,
  e.salary,
  e.department_id,
  (
    SELECT ROUND(AVG(salary), 0)
    FROM employees inner_e
    WHERE inner_e.department_id = e.department_id  -- ← مرتبط بـ e الخارجية
  ) AS dept_avg
FROM employees e
ORDER BY e.department_id, e.salary DESC;
\`\`\`

---

## المقارنة على مستوى الصف باستخدام الاستعلام الفرعي المرتبط

\`\`\`sql
-- الموظفون الذين يتقاضون أكثر من متوسط قسمهم
SELECT e.name, e.salary, e.department_id
FROM employees e
WHERE e.salary > (
  SELECT AVG(salary)
  FROM employees sub
  WHERE sub.department_id = e.department_id  -- مرتبط
);

-- المنتجات التي سعرها أعلى من متوسط فئتها
SELECT p.name, p.price, p.category_id
FROM products p
WHERE p.price > (
  SELECT AVG(price)
  FROM products sub
  WHERE sub.category_id = p.category_id  -- مرتبط
)
ORDER BY p.category_id, p.price DESC;
\`\`\`

---

## الجداول المشتقة (Derived Tables — استعلام فرعي في FROM)

**الجدول المشتق** هو استعلام فرعي يُستخدم في جملة \`FROM\`. يُنشئ جدولاً افتراضياً يتعامل معه الاستعلام الخارجي كجدول حقيقي.

\`\`\`sql
-- الخطوة 1: تلخيص بيانات الأقسام في استعلام فرعي
-- الخطوة 2: ربط ذلك الملخص بجدول departments
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
-- إيجاد المنتج الأعلى سعراً في كل فئة باستخدام جدول مشتق
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

## الجداول المشتقة متعددة المستويات

\`\`\`sql
-- إيجاد العملاء ذوي الإنفاق فوق المتوسط (مستويان)
SELECT customer_name, total_spent
FROM (
  -- المستوى 2: الفلترة بفوق المتوسط
  SELECT customer_name, total_spent
  FROM (
    -- المستوى 1: جمع طلبات كل عميل
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

> **ملاحظة:** يُعالَج هذا النوع من المنطق المتداخل بشكل أفضل باستخدام CTEs (يُغطى في المستوى 10). تعمل الجداول المشتقة لكنها تصبح صعبة القراءة بسرعة.

---

## اعتبارات الأداء

تُنفَّذ الاستعلامات الفرعية المرتبطة **مرة واحدة لكل صف** — في جدول يحتوي على مليون صف، يُنفَّذ الاستعلام الفرعي مليون مرة! وهذا غالباً بطيء.

لتحسين الأداء:
- استخدم JOINs كلما أمكن
- استخدم CTEs (المستوى 10) للوضوح
- استخدم Window Functions (المستوى 9) للتجميعات على مستوى الصف
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
        questionAr: 'ابحث عن جميع المنتجات التي سعرها أعلى من متوسط سعر فئتها (استخدم استعلاماً فرعياً مرتبطاً).',
        hint: 'WHERE p.price > (SELECT AVG(price) FROM products sub WHERE sub.category_id = p.category_id)',
        hintAr: 'WHERE p.price > (SELECT AVG(price) FROM products sub WHERE sub.category_id = p.category_id)',
        expectedQuery: 'SELECT p.name, p.price, p.category_id FROM products p WHERE p.price > (SELECT AVG(price) FROM products sub WHERE sub.category_id = p.category_id) ORDER BY p.category_id, p.price DESC',
        checkFunction: (result, q = '') => result.length > 0 && /SELECT[\s\S]*SELECT/i.test(q),
      },
      {
        id: 2,
        question: 'Using a derived table, find the average total_amount spent per customer (only for delivered orders), then show only customers who spent above $300 on average.',
        questionAr: 'باستخدام جدول مشتق، احسب متوسط total_amount لكل عميل (للطلبات المُسلَّمة فقط)، ثم اعرض العملاء الذين تجاوز متوسط إنفاقهم 300 دولار.',
        hint: 'SELECT ... FROM (SELECT customer_id, AVG(total_amount) AS avg_spent FROM orders WHERE status=\'delivered\' GROUP BY customer_id) AS cs WHERE avg_spent > 300',
        hintAr: 'SELECT ... FROM (SELECT customer_id, AVG(total_amount) AS avg_spent FROM orders WHERE status=\'delivered\' GROUP BY customer_id) AS cs WHERE avg_spent > 300',
        expectedQuery: "SELECT cs.customer_id, cs.avg_spent FROM (SELECT customer_id, AVG(total_amount) AS avg_spent FROM orders WHERE status = 'delivered' GROUP BY customer_id) AS cs WHERE cs.avg_spent > 300",
        checkFunction: (result, q = '') => result.length > 0 && /SELECT[\s\S]*SELECT/i.test(q) && /AVG/i.test(q),
      },
    ],
  },
];
