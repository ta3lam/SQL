export const initSQL = `
-- ============================================================
--  SQL MASTERY PLATFORM — TRAINING DATABASE
--  Tables: departments, employees, customers, categories,
--          products, orders, order_items
-- ============================================================

-- ── DEPARTMENTS ────────────────────────────────────────────
CREATE TABLE departments (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  location    TEXT    NOT NULL,
  budget      REAL,
  manager_id  INTEGER
);

INSERT INTO departments (id, name, location, budget, manager_id) VALUES
  (1, 'Engineering',  'Building A', 850000, 3),
  (2, 'Marketing',    'Building B', 320000, 7),
  (3, 'Sales',        'Building C', 500000, 12),
  (4, 'HR',           'Building B', 210000, 5),
  (5, 'Finance',      'Building D', 430000, 9),
  (6, 'Legal',        'Building D', 190000, NULL);

-- ── EMPLOYEES ──────────────────────────────────────────────
CREATE TABLE employees (
  id            INTEGER PRIMARY KEY,
  name          TEXT    NOT NULL,
  email         TEXT    UNIQUE,
  department_id INTEGER,
  manager_id    INTEGER,
  job_title     TEXT,
  salary        REAL    NOT NULL,
  hire_date     TEXT    NOT NULL,
  is_active     INTEGER DEFAULT 1,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (manager_id)    REFERENCES employees(id)
);

INSERT INTO employees (id, name, email, department_id, manager_id, job_title, salary, hire_date, is_active) VALUES
  (1,  'Alice Johnson',   'alice@company.com',   1, NULL, 'VP of Engineering',     120000, '2015-03-10', 1),
  (2,  'Bob Smith',       'bob@company.com',     1, 1,    'Senior Engineer',        95000, '2017-06-15', 1),
  (3,  'Carol Williams',  'carol@company.com',   1, 1,    'Lead Engineer',         105000, '2016-01-20', 1),
  (4,  'David Brown',     'david@company.com',   1, 3,    'Software Engineer',      78000, '2019-09-01', 1),
  (5,  'Emma Davis',      'emma@company.com',    4, NULL, 'HR Director',            88000, '2016-07-11', 1),
  (6,  'Frank Miller',    'frank@company.com',   4, 5,    'HR Specialist',          62000, '2020-02-14', 1),
  (7,  'Grace Wilson',    'grace@company.com',   2, NULL, 'Marketing Director',     92000, '2017-04-03', 1),
  (8,  'Henry Moore',     'henry@company.com',   2, 7,    'Marketing Manager',      75000, '2018-11-22', 1),
  (9,  'Irene Taylor',    'irene@company.com',   5, NULL, 'Finance Director',       98000, '2015-08-30', 1),
  (10, 'Jack Anderson',   'jack@company.com',    5, 9,    'Senior Accountant',      71000, '2019-01-07', 1),
  (11, 'Karen Thomas',    'karen@company.com',   5, 9,    'Accountant',             58000, '2021-05-19', 1),
  (12, 'Leo Jackson',     'leo@company.com',     3, NULL, 'Sales Director',         94000, '2016-10-05', 1),
  (13, 'Mia White',       'mia@company.com',     3, 12,   'Sales Manager',          72000, '2018-03-28', 1),
  (14, 'Nathan Harris',   'nathan@company.com',  3, 13,   'Sales Rep',              54000, '2021-07-12', 1),
  (15, 'Olivia Martin',   'olivia@company.com',  3, 13,   'Sales Rep',              54000, '2022-01-03', 1),
  (16, 'Paul Garcia',     'paul@company.com',    1, 3,    'Junior Engineer',        65000, '2022-06-20', 1),
  (17, 'Quinn Martinez',  'quinn@company.com',   1, 2,    'DevOps Engineer',        85000, '2020-08-17', 1),
  (18, 'Rachel Robinson', 'rachel@company.com',  2, 8,    'Content Writer',         55000, '2021-11-09', 1),
  (19, 'Sam Clark',       'sam@company.com',     4, 5,    'Recruiter',              60000, '2022-03-14', 1),
  (20, 'Tina Lewis',      NULL,                  3, 12,   'Account Executive',      68000, '2019-12-01', 1),
  (21, 'Uma Lee',         'uma@company.com',     1, 3,    'QA Engineer',            72000, '2020-04-25', 1),
  (22, 'Victor Hall',     'victor@company.com',  6, NULL, 'Legal Counsel',          89000, '2018-09-13', 1),
  (23, 'Wendy Allen',     NULL,                  NULL, NULL, 'Consultant',          45000, '2023-01-15', 0),
  (24, 'Xander Young',    'xander@company.com',  1, 1,    'Principal Engineer',    110000, '2016-05-08', 1),
  (25, 'Yara King',       'yara@company.com',    2, 7,    'SEO Specialist',         61000, '2021-08-30', 1);

-- ── CUSTOMERS ──────────────────────────────────────────────
CREATE TABLE customers (
  id           INTEGER PRIMARY KEY,
  name         TEXT    NOT NULL,
  email        TEXT    UNIQUE,
  city         TEXT,
  country      TEXT    DEFAULT 'USA',
  phone        TEXT,
  joined_date  TEXT    NOT NULL,
  loyalty_tier TEXT    DEFAULT 'Bronze'
);

INSERT INTO customers (id, name, email, city, country, phone, joined_date, loyalty_tier) VALUES
  (1,  'Liam Scott',       'liam@email.com',     'New York',    'USA',       '555-0101', '2020-01-15', 'Gold'),
  (2,  'Emma Turner',      'emma.t@email.com',   'Los Angeles', 'USA',       '555-0102', '2020-03-22', 'Silver'),
  (3,  'Noah Parker',      'noah@email.com',     'Chicago',     'USA',       '555-0103', '2019-11-08', 'Gold'),
  (4,  'Sophia Evans',     'sophia@email.com',   'Houston',     'USA',       '555-0104', '2021-06-14', 'Bronze'),
  (5,  'James Collins',    'james@email.com',    'Toronto',     'Canada',    '555-0105', '2020-09-01', 'Silver'),
  (6,  'Isabella Stewart', 'isabella@email.com', 'London',      'UK',        '555-0106', '2021-02-28', 'Bronze'),
  (7,  'Oliver Morris',    'oliver@email.com',   'Sydney',      'Australia', '555-0107', '2019-07-19', 'Gold'),
  (8,  'Ava Rogers',       'ava@email.com',      'New York',    'USA',       '555-0108', '2022-04-05', 'Bronze'),
  (9,  'Elijah Reed',      'elijah@email.com',   'Phoenix',     'USA',       '555-0109', '2020-12-20', 'Silver'),
  (10, 'Mia Cook',         'mia.c@email.com',    'Philadelphia','USA',       NULL,       '2021-08-11', 'Bronze'),
  (11, 'William Morgan',   'william@email.com',  'San Antonio', 'USA',       '555-0111', '2019-05-03', 'Gold'),
  (12, 'Charlotte Bell',   'charlotte@email.com','San Diego',   'USA',       '555-0112', '2022-07-22', 'Bronze'),
  (13, 'Benjamin Murphy',  'ben@email.com',      'Dallas',      'USA',       '555-0113', '2020-10-30', 'Silver'),
  (14, 'Amelia Bailey',    'amelia@email.com',   'Berlin',      'Germany',   '555-0114', '2021-01-17', 'Silver'),
  (15, 'Lucas Rivera',     'lucas@email.com',    'San Jose',    'USA',       '555-0115', '2019-03-25', 'Gold'),
  (16, 'Harper Cooper',    'harper@email.com',   'Austin',      'USA',       NULL,       '2022-11-08', 'Bronze'),
  (17, 'Henry Richardson', 'henry.r@email.com',  'Jacksonville','USA',       '555-0117', '2020-06-14', 'Silver'),
  (18, 'Evelyn Cox',       'evelyn@email.com',   'Vancouver',   'Canada',    '555-0118', '2021-09-03', 'Bronze'),
  (19, 'Alexander Howard', 'alex.h@email.com',   'Paris',       'France',    '555-0119', '2019-12-11', 'Gold'),
  (20, 'Abigail Ward',     'abigail@email.com',  'Columbus',    'USA',       '555-0120', '2023-02-14', 'Bronze');

-- ── CATEGORIES ─────────────────────────────────────────────
CREATE TABLE categories (
  id          INTEGER PRIMARY KEY,
  name        TEXT    NOT NULL,
  description TEXT
);

INSERT INTO categories (id, name, description) VALUES
  (1, 'Electronics',   'Computers, phones, gadgets, and accessories'),
  (2, 'Books',         'Fiction, non-fiction, textbooks, and e-books'),
  (3, 'Clothing',      'Apparel, footwear, and fashion accessories'),
  (4, 'Home & Garden', 'Furniture, tools, and home improvement'),
  (5, 'Sports',        'Equipment, apparel, and outdoor gear');

-- ── PRODUCTS ───────────────────────────────────────────────
CREATE TABLE products (
  id             INTEGER PRIMARY KEY,
  name           TEXT    NOT NULL,
  category_id    INTEGER,
  price          REAL    NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  supplier       TEXT,
  is_available   INTEGER DEFAULT 1,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO products (id, name, category_id, price, stock_quantity, supplier, is_available) VALUES
  (1,  'Laptop Pro 15"',             1, 1299.99, 45,  'TechCorp',    1),
  (2,  'Wireless Mouse',              1,   29.99, 200, 'TechCorp',    1),
  (3,  'Mechanical Keyboard',         1,   89.99, 120, 'KeyMaster',   1),
  (4,  'USB-C Hub 7-Port',            1,   49.99,  85, 'ConnectPlus', 1),
  (5,  'Monitor 27" 4K',              1,  449.99,  30, 'ViewMax',     1),
  (6,  'SQL for Beginners',           2,   34.99, 300, 'BookHouse',   1),
  (7,  'Clean Code',                  2,   42.99, 180, 'BookHouse',   1),
  (8,  'Database Design Patterns',    2,   38.99,  95, 'TechBooks',   1),
  (9,  'The Pragmatic Programmer',    2,   44.99, 150, 'BookHouse',   1),
  (10, 'Running Shoes Pro',           5,  119.99,  75, 'SportFit',    1),
  (11, 'Yoga Mat Premium',            5,   35.99, 140, 'FitLife',     1),
  (12, 'Cycling Helmet',              5,   79.99,  60, 'SafeRide',    1),
  (13, 'Men''s Hoodie XL',            3,   49.99,  90, 'FashionCo',   1),
  (14, 'Women''s Jacket M',           3,   89.99,  55, 'FashionCo',   1),
  (15, 'Standing Desk',               4,  349.99,  20, 'OfficePro',   1),
  (16, 'Office Chair Ergonomic',      4,  279.99,  25, 'OfficePro',   1),
  (17, 'Noise-Cancelling Headphones', 1,  199.99,  65, 'SoundMax',    1),
  (18, 'Tablet 10"',                  1,  399.99,  40, 'TechCorp',    1),
  (19, 'Fitness Tracker Band',        5,   59.99, 110, 'FitLife',     1),
  (20, 'LED Desk Lamp',               4,   39.99,  95, 'LightUp',     0);

-- ── ORDERS ─────────────────────────────────────────────────
CREATE TABLE orders (
  id           INTEGER PRIMARY KEY,
  customer_id  INTEGER NOT NULL,
  order_date   TEXT    NOT NULL,
  status       TEXT    NOT NULL DEFAULT 'pending',
  total_amount REAL,
  notes        TEXT,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

INSERT INTO orders (id, customer_id, order_date, status, total_amount, notes) VALUES
  (1,  1,  '2024-01-05', 'delivered',   1329.98, NULL),
  (2,  2,  '2024-01-12', 'delivered',    119.98, NULL),
  (3,  3,  '2024-01-18', 'delivered',   1749.97, 'Priority shipping'),
  (4,  1,  '2024-02-03', 'delivered',    449.99, NULL),
  (5,  5,  '2024-02-14', 'delivered',    163.98, NULL),
  (6,  7,  '2024-02-20', 'delivered',    239.98, NULL),
  (7,  4,  '2024-03-01', 'shipped',      349.99, NULL),
  (8,  9,  '2024-03-10', 'shipped',      629.98, NULL),
  (9,  11, '2024-03-15', 'processing',   199.99, NULL),
  (10, 3,  '2024-03-22', 'processing',   399.98, 'Fragile items'),
  (11, 15, '2024-04-02', 'pending',      279.99, NULL),
  (12, 13, '2024-04-08', 'cancelled',    119.97, 'Customer request'),
  (13, 6,  '2024-04-11', 'pending',       89.98, NULL),
  (14, 19, '2024-04-15', 'delivered',   1499.98, NULL),
  (15, 2,  '2024-04-20', 'delivered',     77.98, NULL),
  (16, 8,  '2024-04-25', 'shipped',      159.98, NULL),
  (17, 10, '2024-05-01', 'pending',       74.98, NULL),
  (18, 12, '2024-05-05', 'processing',   279.99, NULL),
  (19, 14, '2024-05-09', 'shipped',      349.98, NULL),
  (20, 17, '2024-05-14', 'delivered',    199.99, NULL),
  (21, 1,  '2024-05-20', 'delivered',     94.98, NULL),
  (22, 19, '2024-05-25', 'delivered',    629.98, NULL),
  (23, 7,  '2024-06-01', 'pending',      449.99, NULL),
  (24, 11, '2024-06-07', 'processing',   124.98, NULL),
  (25, 15, '2024-06-12', 'shipped',      534.97, NULL),
  (26, 3,  '2024-06-18', 'delivered',     84.98, NULL),
  (27, 5,  '2024-06-22', 'pending',       59.99, NULL),
  (28, 20, '2024-07-01', 'processing',   389.98, 'First order'),
  (29, 16, '2024-07-05', 'pending',      119.99, NULL),
  (30, 18, '2024-07-10', 'shipped',       94.97, NULL);

-- ── ORDER ITEMS ─────────────────────────────────────────────
CREATE TABLE order_items (
  id          INTEGER PRIMARY KEY,
  order_id    INTEGER NOT NULL,
  product_id  INTEGER NOT NULL,
  quantity    INTEGER NOT NULL DEFAULT 1,
  unit_price  REAL    NOT NULL,
  FOREIGN KEY (order_id)   REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES
  (1,  1,  1,  1, 1299.99), (2,  1,  2,  1,   29.99), (3,  2,  2,  2,   29.99),
  (4,  2,  3,  2,   89.99), (5,  3,  1,  1, 1299.99), (6,  3,  17, 1,  199.99),
  (7,  3,  6,  7,   34.99), (8,  4,  5,  1,  449.99), (9,  5,  11, 1,   35.99),
  (10, 5,  10, 1,  119.99), (11, 6,  3,  1,   89.99), (12, 6,  4,  3,   49.99),
  (13, 7,  15, 1,  349.99), (14, 8,  5,  1,  449.99), (15, 8,  17, 1,  199.99),
  (16, 9,  17, 1,  199.99), (17, 10, 18, 1,  399.99), (18, 11, 16, 1,  279.99),
  (19, 12, 6,  2,   34.99), (20, 12, 7,  1,   42.99), (21, 13, 13, 1,   49.99),
  (22, 13, 14, 1,   89.99), (23, 14, 1,  1, 1299.99), (24, 14, 17, 1,  199.99),
  (25, 15, 9,  1,   44.99), (26, 15, 6,  1,   34.99), (27, 16, 2,  2,   29.99),
  (28, 16, 4,  2,   49.99), (29, 17, 11, 1,   35.99), (30, 17, 19, 1,   59.99),
  (31, 18, 16, 1,  279.99), (32, 19, 14, 1,   89.99), (33, 19, 13, 1,   49.99),
  (34, 19, 10, 1,  119.99), (35, 20, 17, 1,  199.99), (36, 21, 12, 1,   79.99),
  (37, 21, 10, 1,  119.99), (38, 22, 5,  1,  449.99), (39, 22, 17, 1,  199.99),
  (40, 23, 5,  1,  449.99), (41, 24, 9,  1,   44.99), (42, 24, 7,  1,   42.99),
  (43, 24, 8,  1,   38.99), (44, 25, 1,  1,  399.99), (45, 25, 3,  1,   89.99),
  (46, 25, 2,  1,   29.99), (47, 26, 6,  1,   34.99), (48, 26, 8,  1,   38.99),
  (49, 27, 19, 1,   59.99), (50, 28, 15, 1,  349.99), (51, 28, 20, 1,   39.99),
  (52, 29, 10, 1,  119.99), (53, 30, 11, 1,   35.99), (54, 30, 19, 1,   59.99);
`;

export const sampleData = {
  departments: [
    { id: 1, name: 'Engineering',  location: 'Building A', budget: 850000 },
    { id: 2, name: 'Marketing',    location: 'Building B', budget: 320000 },
    { id: 3, name: 'Sales',        location: 'Building C', budget: 500000 },
    { id: 4, name: 'HR',           location: 'Building B', budget: 210000 },
    { id: 5, name: 'Finance',      location: 'Building D', budget: 430000 },
  ],
  employees: [
    { id: 1, name: 'Alice Johnson',  job_title: 'VP of Engineering', salary: 120000 },
    { id: 2, name: 'Bob Smith',      job_title: 'Senior Engineer',   salary:  95000 },
    { id: 3, name: 'Carol Williams', job_title: 'Lead Engineer',     salary: 105000 },
  ],
};
