export const initSQL = `
-- إنشاء جدول الأقسام
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  dept_name TEXT NOT NULL,
  location TEXT
);

-- إضافة بيانات الأقسام
INSERT INTO departments (id, dept_name, location) VALUES
  (1, 'IT', 'المبنى A'),
  (2, 'HR', 'المبنى B'),
  (3, 'Finance', 'المبنى C'),
  (4, 'Marketing', 'المبنى A'),
  (5, 'Sales', 'المبنى D');

-- إنشاء جدول الموظفين
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  department TEXT,
  dept_id INTEGER,
  salary REAL,
  age INTEGER,
  hire_date TEXT,
  FOREIGN KEY (dept_id) REFERENCES departments(id)
);

-- إضافة بيانات الموظفين
INSERT INTO employees (id, name, department, dept_id, salary, age, hire_date) VALUES
  (1, 'أحمد محمد', 'IT', 1, 7500, 32, '2020-01-15'),
  (2, 'فاطمة علي', 'HR', 2, 5500, 28, '2019-06-20'),
  (3, 'محمد خالد', 'IT', 1, 8500, 35, '2018-03-10'),
  (4, 'سارة أحمد', 'Finance', 3, 6500, 30, '2021-02-01'),
  (5, 'عمر حسن', 'Marketing', 4, 5000, 26, '2022-01-10'),
  (6, 'نورة سعيد', 'IT', 1, 9000, 38, '2017-05-15'),
  (7, 'يوسف محمود', 'Sales', 5, 4500, 24, '2023-03-01'),
  (8, 'ليلى عبدالله', 'HR', 2, 5800, 29, '2020-09-15'),
  (9, 'خالد إبراهيم', 'Finance', 3, 7000, 33, '2019-11-20'),
  (10, 'مريم حسين', 'Marketing', 4, 5200, 27, '2021-07-10');

-- إنشاء جدول المشاريع
CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  project_name TEXT NOT NULL,
  budget REAL,
  start_date TEXT,
  dept_id INTEGER,
  FOREIGN KEY (dept_id) REFERENCES departments(id)
);

-- إضافة بيانات المشاريع
INSERT INTO projects (id, project_name, budget, start_date, dept_id) VALUES
  (1, 'نظام إدارة الموارد', 50000, '2023-01-01', 1),
  (2, 'تطوير الموقع', 30000, '2023-03-15', 1),
  (3, 'حملة تسويقية', 25000, '2023-06-01', 4),
  (4, 'نظام المحاسبة', 40000, '2023-02-01', 3);
`;

export const sampleData = {
  employees: [
    { id: 1, name: 'أحمد محمد', department: 'IT', salary: 7500, age: 32 },
    { id: 2, name: 'فاطمة علي', department: 'HR', salary: 5500, age: 28 },
    { id: 3, name: 'محمد خالد', department: 'IT', salary: 8500, age: 35 },
    { id: 4, name: 'سارة أحمد', department: 'Finance', salary: 6500, age: 30 },
    { id: 5, name: 'عمر حسن', department: 'Marketing', salary: 5000, age: 26 },
  ],
  departments: [
    { id: 1, dept_name: 'IT', location: 'المبنى A' },
    { id: 2, dept_name: 'HR', location: 'المبنى B' },
    { id: 3, dept_name: 'Finance', location: 'المبنى C' },
  ]
};
