import { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 1,
    title: "SELECT Basics",
    titleAr: "أساسيات SELECT",
    description: "تعلم كيفية استرجاع البيانات من قاعدة البيانات",
    content: `
## ما هو SELECT؟

أمر \`SELECT\` هو الأمر الأكثر استخداماً في SQL. يُستخدم لاسترجاع البيانات من جدول أو أكثر.

### الصيغة الأساسية:
\`\`\`sql
SELECT column1, column2 FROM table_name;
\`\`\`

### لاسترجاع جميع الأعمدة:
\`\`\`sql
SELECT * FROM table_name;
\`\`\`

### أمثلة:
- \`SELECT name FROM employees;\` - استرجاع أسماء الموظفين فقط
- \`SELECT * FROM employees;\` - استرجاع جميع بيانات الموظفين
- \`SELECT name, salary FROM employees;\` - استرجاع الأسماء والرواتب
    `,
    example: "SELECT * FROM employees;",
    exercises: [
      {
        id: 1,
        question: "اكتب استعلام لاسترجاع جميع البيانات من جدول employees",
        hint: "استخدم * لاسترجاع جميع الأعمدة",
        expectedQuery: "SELECT * FROM employees",
        checkFunction: (result) => result.length > 0
      },
      {
        id: 2,
        question: "اكتب استعلام لاسترجاع أسماء الموظفين فقط",
        hint: "حدد عمود name فقط",
        expectedQuery: "SELECT name FROM employees",
        checkFunction: (result) => result.length > 0
      }
    ]
  },
  {
    id: 2,
    title: "WHERE Clause",
    titleAr: "شرط WHERE",
    description: "تعلم كيفية تصفية البيانات باستخدام الشروط",
    content: `
## شرط WHERE

يُستخدم \`WHERE\` لتصفية السجلات وإرجاع فقط تلك التي تطابق شرطاً معيناً.

### الصيغة:
\`\`\`sql
SELECT column1, column2
FROM table_name
WHERE condition;
\`\`\`

### عوامل المقارنة:
| العامل | الوصف |
|--------|-------|
| = | يساوي |
| > | أكبر من |
| < | أصغر من |
| >= | أكبر من أو يساوي |
| <= | أصغر من أو يساوي |
| <> أو != | لا يساوي |

### أمثلة:
\`\`\`sql
SELECT * FROM employees WHERE department = 'IT';
SELECT * FROM employees WHERE salary > 5000;
SELECT * FROM employees WHERE age >= 30;
\`\`\`
    `,
    example: "SELECT * FROM employees WHERE department = 'IT';",
    exercises: [
      {
        id: 1,
        question: "اكتب استعلام لاسترجاع الموظفين الذين رواتبهم أكبر من 5000",
        hint: "استخدم WHERE مع عامل أكبر من (>)",
        expectedQuery: "SELECT * FROM employees WHERE salary > 5000",
        checkFunction: (result) => result.length > 0
      },
      {
        id: 2,
        question: "اكتب استعلام لاسترجاع الموظفين في قسم IT",
        hint: "استخدم WHERE مع عامل المساواة (=)",
        expectedQuery: "SELECT * FROM employees WHERE department = 'IT'",
        checkFunction: (result) => result.length > 0
      }
    ]
  },
  {
    id: 3,
    title: "ORDER BY",
    titleAr: "ترتيب النتائج ORDER BY",
    description: "تعلم كيفية ترتيب نتائج الاستعلام",
    content: `
## ترتيب النتائج ORDER BY

يُستخدم \`ORDER BY\` لترتيب نتائج الاستعلام تصاعدياً أو تنازلياً.

### الصيغة:
\`\`\`sql
SELECT column1, column2
FROM table_name
ORDER BY column1 [ASC|DESC];
\`\`\`

### أنواع الترتيب:
- **ASC**: ترتيب تصاعدي (الافتراضي)
- **DESC**: ترتيب تنازلي

### أمثلة:
\`\`\`sql
-- ترتيب حسب الراتب تصاعدياً
SELECT * FROM employees ORDER BY salary;

-- ترتيب حسب الراتب تنازلياً
SELECT * FROM employees ORDER BY salary DESC;

-- ترتيب حسب أكثر من عمود
SELECT * FROM employees ORDER BY department, salary DESC;
\`\`\`
    `,
    example: "SELECT * FROM employees ORDER BY salary DESC;",
    exercises: [
      {
        id: 1,
        question: "اكتب استعلام لاسترجاع الموظفين مرتبين حسب الراتب تنازلياً",
        hint: "استخدم ORDER BY مع DESC",
        expectedQuery: "SELECT * FROM employees ORDER BY salary DESC",
        checkFunction: (result) => result.length > 0
      }
    ]
  },
  {
    id: 4,
    title: "AND, OR, NOT",
    titleAr: "العوامل المنطقية AND, OR, NOT",
    description: "تعلم كيفية دمج الشروط المتعددة",
    content: `
## العوامل المنطقية

### AND
يُرجع السجلات التي تتحقق فيها **جميع** الشروط:
\`\`\`sql
SELECT * FROM employees 
WHERE department = 'IT' AND salary > 5000;
\`\`\`

### OR
يُرجع السجلات التي تتحقق فيها **أي** من الشروط:
\`\`\`sql
SELECT * FROM employees 
WHERE department = 'IT' OR department = 'HR';
\`\`\`

### NOT
يُرجع السجلات التي **لا** تتحقق فيها الشرط:
\`\`\`sql
SELECT * FROM employees 
WHERE NOT department = 'IT';
\`\`\`

### الدمج بين العوامل:
\`\`\`sql
SELECT * FROM employees 
WHERE (department = 'IT' OR department = 'HR') 
AND salary > 4000;
\`\`\`
    `,
    example: "SELECT * FROM employees WHERE department = 'IT' AND salary > 5000;",
    exercises: [
      {
        id: 1,
        question: "اكتب استعلام لاسترجاع الموظفين في قسم IT الذين رواتبهم أكبر من 5000",
        hint: "استخدم AND لدمج شرطين",
        expectedQuery: "SELECT * FROM employees WHERE department = 'IT' AND salary > 5000",
        checkFunction: (result) => result.length >= 0
      }
    ]
  },
  {
    id: 5,
    title: "INSERT INTO",
    titleAr: "إضافة البيانات INSERT INTO",
    description: "تعلم كيفية إضافة سجلات جديدة إلى الجدول",
    content: `
## إضافة البيانات INSERT INTO

يُستخدم \`INSERT INTO\` لإضافة سجلات جديدة إلى الجدول.

### الصيغة الأولى (تحديد الأعمدة):
\`\`\`sql
INSERT INTO table_name (column1, column2, column3)
VALUES (value1, value2, value3);
\`\`\`

### الصيغة الثانية (جميع الأعمدة):
\`\`\`sql
INSERT INTO table_name
VALUES (value1, value2, value3);
\`\`\`

### أمثلة:
\`\`\`sql
-- إضافة موظف جديد
INSERT INTO employees (name, department, salary)
VALUES ('محمد أحمد', 'IT', 6000);

-- إضافة عدة سجلات
INSERT INTO employees (name, department, salary)
VALUES 
  ('علي حسن', 'HR', 5000),
  ('سارة محمد', 'IT', 7000);
\`\`\`
    `,
    example: "INSERT INTO employees (name, department, salary) VALUES ('أحمد علي', 'IT', 6500);",
    exercises: [
      {
        id: 1,
        question: "أضف موظف جديد اسمه 'سامي خالد' في قسم HR براتب 5500",
        hint: "استخدم INSERT INTO مع تحديد القيم",
        expectedQuery: "INSERT INTO employees (name, department, salary) VALUES ('سامي خالد', 'HR', 5500)",
        checkFunction: () => true
      }
    ]
  },
  {
    id: 6,
    title: "UPDATE",
    titleAr: "تحديث البيانات UPDATE",
    description: "تعلم كيفية تعديل البيانات الموجودة",
    content: `
## تحديث البيانات UPDATE

يُستخدم \`UPDATE\` لتعديل السجلات الموجودة في الجدول.

### الصيغة:
\`\`\`sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
\`\`\`

⚠️ **تحذير**: إذا لم تستخدم WHERE، سيتم تحديث جميع السجلات!

### أمثلة:
\`\`\`sql
-- تحديث راتب موظف معين
UPDATE employees
SET salary = 7000
WHERE name = 'محمد أحمد';

-- تحديث عدة أعمدة
UPDATE employees
SET salary = 8000, department = 'Management'
WHERE id = 1;

-- زيادة جميع الرواتب بنسبة 10%
UPDATE employees
SET salary = salary * 1.10;
\`\`\`
    `,
    example: "UPDATE employees SET salary = 7500 WHERE name = 'أحمد محمد';",
    exercises: [
      {
        id: 1,
        question: "حدّث راتب الموظف 'أحمد محمد' إلى 8000",
        hint: "استخدم UPDATE مع SET و WHERE",
        expectedQuery: "UPDATE employees SET salary = 8000 WHERE name = 'أحمد محمد'",
        checkFunction: () => true
      }
    ]
  },
  {
    id: 7,
    title: "DELETE",
    titleAr: "حذف البيانات DELETE",
    description: "تعلم كيفية حذف السجلات من الجدول",
    content: `
## حذف البيانات DELETE

يُستخدم \`DELETE\` لحذف السجلات من الجدول.

### الصيغة:
\`\`\`sql
DELETE FROM table_name
WHERE condition;
\`\`\`

⚠️ **تحذير**: إذا لم تستخدم WHERE، سيتم حذف جميع السجلات!

### أمثلة:
\`\`\`sql
-- حذف موظف معين
DELETE FROM employees
WHERE name = 'محمد أحمد';

-- حذف جميع الموظفين في قسم معين
DELETE FROM employees
WHERE department = 'IT';

-- حذف جميع السجلات (خطير!)
DELETE FROM employees;
\`\`\`

### الفرق بين DELETE و TRUNCATE:
- \`DELETE\`: يحذف سجلات محددة ويمكن استخدام WHERE
- \`TRUNCATE\`: يحذف جميع السجلات بشكل أسرع
    `,
    example: "DELETE FROM employees WHERE department = 'Temp';",
    exercises: [
      {
        id: 1,
        question: "احذف الموظفين الذين رواتبهم أقل من 3000",
        hint: "استخدم DELETE مع WHERE",
        expectedQuery: "DELETE FROM employees WHERE salary < 3000",
        checkFunction: () => true
      }
    ]
  },
  {
    id: 8,
    title: "Aggregate Functions",
    titleAr: "دوال التجميع",
    description: "تعلم استخدام دوال COUNT, SUM, AVG, MIN, MAX",
    content: `
## دوال التجميع

دوال التجميع تُجري عمليات حسابية على مجموعة من القيم.

### الدوال الأساسية:

| الدالة | الوصف |
|--------|-------|
| COUNT() | عدد السجلات |
| SUM() | مجموع القيم |
| AVG() | المتوسط الحسابي |
| MIN() | أصغر قيمة |
| MAX() | أكبر قيمة |

### أمثلة:
\`\`\`sql
-- عدد الموظفين
SELECT COUNT(*) FROM employees;

-- مجموع الرواتب
SELECT SUM(salary) FROM employees;

-- متوسط الرواتب
SELECT AVG(salary) FROM employees;

-- أعلى وأقل راتب
SELECT MAX(salary), MIN(salary) FROM employees;

-- عدد الموظفين في كل قسم
SELECT department, COUNT(*) 
FROM employees 
GROUP BY department;
\`\`\`
    `,
    example: "SELECT COUNT(*) as total, AVG(salary) as avg_salary FROM employees;",
    exercises: [
      {
        id: 1,
        question: "اكتب استعلام لحساب متوسط الرواتب",
        hint: "استخدم دالة AVG",
        expectedQuery: "SELECT AVG(salary) FROM employees",
        checkFunction: (result) => result.length > 0
      }
    ]
  },
  {
    id: 9,
    title: "GROUP BY",
    titleAr: "تجميع البيانات GROUP BY",
    description: "تعلم كيفية تجميع البيانات وتحليلها",
    content: `
## تجميع البيانات GROUP BY

يُستخدم \`GROUP BY\` لتجميع السجلات التي لها نفس القيمة.

### الصيغة:
\`\`\`sql
SELECT column, aggregate_function(column)
FROM table_name
GROUP BY column;
\`\`\`

### أمثلة:
\`\`\`sql
-- عدد الموظفين في كل قسم
SELECT department, COUNT(*) as count
FROM employees
GROUP BY department;

-- متوسط الرواتب في كل قسم
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department;

-- مجموع الرواتب في كل قسم مع الترتيب
SELECT department, SUM(salary) as total
FROM employees
GROUP BY department
ORDER BY total DESC;
\`\`\`

### HAVING - تصفية المجموعات:
\`\`\`sql
-- الأقسام التي بها أكثر من 2 موظفين
SELECT department, COUNT(*) as count
FROM employees
GROUP BY department
HAVING COUNT(*) > 2;
\`\`\`
    `,
    example: "SELECT department, COUNT(*) as count, AVG(salary) as avg_salary FROM employees GROUP BY department;",
    exercises: [
      {
        id: 1,
        question: "اكتب استعلام لحساب عدد الموظفين في كل قسم",
        hint: "استخدم GROUP BY مع COUNT",
        expectedQuery: "SELECT department, COUNT(*) FROM employees GROUP BY department",
        checkFunction: (result) => result.length > 0
      }
    ]
  },
  {
    id: 10,
    title: "JOIN",
    titleAr: "ربط الجداول JOIN",
    description: "تعلم كيفية ربط جدولين أو أكثر",
    content: `
## ربط الجداول JOIN

يُستخدم \`JOIN\` لدمج السجلات من جدولين بناءً على عمود مشترك.

### أنواع JOIN:

#### INNER JOIN
يُرجع السجلات المتطابقة في كلا الجدولين:
\`\`\`sql
SELECT employees.name, departments.dept_name
FROM employees
INNER JOIN departments ON employees.dept_id = departments.id;
\`\`\`

#### LEFT JOIN
يُرجع جميع سجلات الجدول الأيسر والمتطابقة من الأيمن:
\`\`\`sql
SELECT employees.name, departments.dept_name
FROM employees
LEFT JOIN departments ON employees.dept_id = departments.id;
\`\`\`

#### RIGHT JOIN
يُرجع جميع سجلات الجدول الأيمن والمتطابقة من الأيسر.

### مثال عملي:
\`\`\`sql
SELECT e.name, e.salary, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id
WHERE e.salary > 5000;
\`\`\`
    `,
    example: "SELECT e.name, d.dept_name FROM employees e INNER JOIN departments d ON e.dept_id = d.id;",
    exercises: [
      {
        id: 1,
        question: "اكتب استعلام لربط جدول employees مع departments",
        hint: "استخدم INNER JOIN",
        expectedQuery: "SELECT * FROM employees e INNER JOIN departments d ON e.dept_id = d.id",
        checkFunction: (result) => result.length >= 0
      }
    ]
  }
];
