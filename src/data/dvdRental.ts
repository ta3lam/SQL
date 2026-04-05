export const dvdRentalSQL = `
PRAGMA foreign_keys = OFF;

-- ══════════════════════════════════════════
--  DVD RENTAL DATABASE  (SQLite edition)
-- ══════════════════════════════════════════

CREATE TABLE country (
  country_id  INTEGER PRIMARY KEY,
  country     TEXT NOT NULL,
  last_update TEXT DEFAULT '2024-02-15'
);

CREATE TABLE city (
  city_id     INTEGER PRIMARY KEY,
  city        TEXT NOT NULL,
  country_id  INTEGER NOT NULL,
  last_update TEXT DEFAULT '2024-02-15',
  FOREIGN KEY (country_id) REFERENCES country(country_id)
);

CREATE TABLE address (
  address_id  INTEGER PRIMARY KEY,
  address     TEXT NOT NULL,
  address2    TEXT,
  district    TEXT,
  city_id     INTEGER NOT NULL,
  postal_code TEXT,
  phone       TEXT,
  last_update TEXT DEFAULT '2024-02-15',
  FOREIGN KEY (city_id) REFERENCES city(city_id)
);

CREATE TABLE language (
  language_id INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  last_update TEXT DEFAULT '2024-02-15'
);

CREATE TABLE category (
  category_id INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  last_update TEXT DEFAULT '2024-02-15'
);

CREATE TABLE actor (
  actor_id    INTEGER PRIMARY KEY,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  last_update TEXT DEFAULT '2024-02-15'
);

CREATE TABLE film (
  film_id          INTEGER PRIMARY KEY,
  title            TEXT NOT NULL,
  description      TEXT,
  release_year     INTEGER,
  language_id      INTEGER NOT NULL,
  rental_duration  INTEGER DEFAULT 3,
  rental_rate      REAL    DEFAULT 4.99,
  length           INTEGER,
  replacement_cost REAL    DEFAULT 19.99,
  rating           TEXT    DEFAULT 'G',
  last_update      TEXT    DEFAULT '2024-02-15',
  special_features TEXT,
  fulltext         TEXT,
  FOREIGN KEY (language_id) REFERENCES language(language_id)
);

CREATE TABLE film_actor (
  actor_id    INTEGER NOT NULL,
  film_id     INTEGER NOT NULL,
  last_update TEXT DEFAULT '2024-02-15',
  PRIMARY KEY (actor_id, film_id),
  FOREIGN KEY (actor_id) REFERENCES actor(actor_id),
  FOREIGN KEY (film_id)  REFERENCES film(film_id)
);

CREATE TABLE film_category (
  film_id     INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  last_update TEXT DEFAULT '2024-02-15',
  PRIMARY KEY (film_id, category_id),
  FOREIGN KEY (film_id)     REFERENCES film(film_id),
  FOREIGN KEY (category_id) REFERENCES category(category_id)
);

CREATE TABLE store (
  store_id         INTEGER PRIMARY KEY,
  manager_staff_id INTEGER,
  address_id       INTEGER NOT NULL,
  last_update      TEXT DEFAULT '2024-02-15',
  FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE staff (
  staff_id    INTEGER PRIMARY KEY,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  address_id  INTEGER NOT NULL,
  email       TEXT,
  store_id    INTEGER NOT NULL,
  active      INTEGER DEFAULT 1,
  username    TEXT NOT NULL,
  password    TEXT,
  last_update TEXT DEFAULT '2024-02-15',
  picture     TEXT,
  FOREIGN KEY (address_id) REFERENCES address(address_id),
  FOREIGN KEY (store_id)   REFERENCES store(store_id)
);

CREATE TABLE customer (
  customer_id INTEGER PRIMARY KEY,
  store_id    INTEGER NOT NULL,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  email       TEXT,
  address_id  INTEGER NOT NULL,
  activebool  INTEGER DEFAULT 1,
  create_date TEXT DEFAULT '2024-02-14',
  last_update TEXT DEFAULT '2024-02-15',
  active      INTEGER DEFAULT 1,
  FOREIGN KEY (store_id)   REFERENCES store(store_id),
  FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE inventory (
  inventory_id INTEGER PRIMARY KEY,
  film_id      INTEGER NOT NULL,
  store_id     INTEGER NOT NULL,
  last_update  TEXT DEFAULT '2024-02-15',
  FOREIGN KEY (film_id)  REFERENCES film(film_id),
  FOREIGN KEY (store_id) REFERENCES store(store_id)
);

CREATE TABLE rental (
  rental_id    INTEGER PRIMARY KEY,
  rental_date  TEXT NOT NULL,
  inventory_id INTEGER NOT NULL,
  customer_id  INTEGER NOT NULL,
  return_date  TEXT,
  staff_id     INTEGER NOT NULL,
  last_update  TEXT DEFAULT '2024-02-15',
  FOREIGN KEY (inventory_id) REFERENCES inventory(inventory_id),
  FOREIGN KEY (customer_id)  REFERENCES customer(customer_id),
  FOREIGN KEY (staff_id)     REFERENCES staff(staff_id)
);

CREATE TABLE payment (
  payment_id   INTEGER PRIMARY KEY,
  customer_id  INTEGER NOT NULL,
  staff_id     INTEGER NOT NULL,
  rental_id    INTEGER NOT NULL,
  amount       REAL NOT NULL,
  payment_date TEXT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
  FOREIGN KEY (staff_id)    REFERENCES staff(staff_id),
  FOREIGN KEY (rental_id)   REFERENCES rental(rental_id)
);

-- ──────────────────────────────────────────
--  DATA
-- ──────────────────────────────────────────

INSERT INTO country (country_id, country) VALUES
  (1,'United States'),(2,'United Kingdom'),(3,'France'),
  (4,'Germany'),(5,'Japan'),(6,'Australia'),
  (7,'Canada'),(8,'Brazil'),(9,'Italy'),(10,'Spain');

INSERT INTO city (city_id, city, country_id) VALUES
  (1,'Los Angeles',1),(2,'New York',1),(3,'Chicago',1),
  (4,'London',2),(5,'Manchester',2),(6,'Paris',3),(7,'Lyon',3),
  (8,'Berlin',4),(9,'Munich',4),(10,'Tokyo',5),(11,'Osaka',5),
  (12,'Sydney',6),(13,'Toronto',7),(14,'Sao Paulo',8),(15,'Rome',9);

INSERT INTO address (address_id, address, district, city_id, postal_code, phone) VALUES
  (1, '47 MySakila Drive',    'Alberta',    1,  '35200', ''),
  (2, '28 MySQL Boulevard',   'Queensland', 12, '4352',  ''),
  (3, '23 Workhaven Lane',    'Alberta',    1,  '35200', '14033335568'),
  (4, '1411 Lillydale Drive', 'Queensland', 12, '4352',  '6172235589'),
  (5, '1913 Hanoi Way',       'Nagasaki',   10, '35200', '28303384290'),
  (6, '1121 Loja Avenue',     'California', 1,  '17886', '838635286'),
  (7, '692 Joliet Street',    'Attika',     2,  '83579', '448477190'),
  (8, '1566 Inegl Manor',     'Mandalay',   9,  '53561', '705814003'),
  (9, '53 Idfu Parkway',      'Nantou',     10, '42399', '10655648674'),
  (10,'1795 Hashima Boulevard','Texas',     3,  '18743', '860452626'),
  (11,'900 Santiago Drive',   'Central Java',14,'82235', '716571220'),
  (12,'83 Vung Tau Lane',     'Gansu',      6,  '55591', '262011723'),
  (13,'1947 Podgorica Lane',  'Taipei',     10, '23793', '329975078'),
  (14,'76 Tete Way',          'Ohio',       2,  '57328', '570762402'),
  (15,'346 Skikda Parkway',   'Ontario',    13, '37636', '015453512');

INSERT INTO language (language_id, name) VALUES
  (1,'English'),(2,'Italian'),(3,'Japanese'),
  (4,'Mandarin'),(5,'French'),(6,'German');

INSERT INTO category (category_id, name) VALUES
  (1,'Action'),(2,'Animation'),(3,'Children'),(4,'Classics'),
  (5,'Comedy'),(6,'Documentary'),(7,'Drama'),(8,'Family'),
  (9,'Foreign'),(10,'Games'),(11,'Horror'),(12,'Music'),
  (13,'New'),(14,'Sci-Fi'),(15,'Sports'),(16,'Travel');

INSERT INTO actor (actor_id, first_name, last_name) VALUES
  (1, 'PENELOPE','GUINESS'),  (2, 'NICK',     'WAHLBERG'),
  (3, 'ED',      'CHASE'),    (4, 'JENNIFER', 'DAVIS'),
  (5, 'JOHNNY',  'LOLLOBRIGIDA'),(6,'BETTE',  'NICHOLSON'),
  (7, 'GRACE',   'MOSTEL'),   (8, 'MATTHEW', 'JOHANSSON'),
  (9, 'JOE',     'SWANK'),    (10,'CHRISTIAN','GABLE'),
  (11,'ZERO',    'CAGE'),     (12,'KARL',    'BERRY'),
  (13,'UMA',     'WOOD'),     (14,'VIVIEN',  'BERGEN'),
  (15,'CUBA',    'OLIVIER'),  (16,'FRED',    'COSTNER'),
  (17,'HELEN',   'VOIGHT'),   (18,'DAN',     'TORN'),
  (19,'BOB',     'FAWCETT'),  (20,'LUCILLE', 'TRACY');

INSERT INTO film (film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating) VALUES
  (1, 'ACADEMY DINOSAUR',   'A Epic Drama of a Feminist and a Mad Scientist',              2006,1,6,0.99, 86, 20.99,'PG'),
  (2, 'ACE GOLDFINGER',     'A Astounding Epistle of a Database Administrator and a Explorer',2006,1,3,4.99,48, 12.99,'G'),
  (3, 'ADAPTATION HOLES',   'A Astounding Reflection of a Lumberjack and a Car',           2006,1,7,2.99, 50, 18.99,'NC-17'),
  (4, 'AFFAIR PREJUDICE',   'A Fanciful Documentary of a Frisbee and a Lumberjack',        2006,1,5,2.99, 117,26.99,'G'),
  (5, 'AFRICAN EGG',        'A Fast-Paced Documentary of a Pastry Chef and a Monkey',      2006,1,6,2.99, 130,22.99,'G'),
  (6, 'AGENT TRUMAN',       'A Intrepid Panorama of a Robot and a Boy',                    2006,1,3,2.99, 169,17.99,'PG'),
  (7, 'AIRPLANE SIERRA',    'A Touching Epistle of a Hunter and a Butler',                 2006,1,6,4.99, 62, 28.99,'PG-13'),
  (8, 'AIRPORT POLLOCK',    'A Brilliant Reflection of a Pastry Chef and a Boat',          2006,1,6,4.99, 54, 15.99,'R'),
  (9, 'ALABAMA DEVIL',      'A Thoughtful Panorama of a Database Administrator and a Husband',2006,1,3,2.99,114,31.99,'PG-13'),
  (10,'ALADDIN CALENDAR',   'A Action-Packed Tale of a Man and a Lumberjack',              2006,1,6,4.99, 63, 29.99,'NC-17'),
  (11,'ALAMO VIDEOTAPE',    'A Boring Epistle of a Butler and a Cat',                      2006,1,6,0.99, 126,16.99,'G'),
  (12,'ALASKA PHANTOM',     'A Fanciful Saga of a Hunter and a Pastry Chef',               2006,1,6,0.99, 136,22.99,'PG'),
  (13,'ALI FOREVER',        'A Action-Packed Drama of a Dentist and a Crocodile',          2006,1,4,4.99, 150,35.99,'PG'),
  (14,'ALICE FANTASIA',     'A Ancient Drama of a Technical Writer and a Moose',           2006,1,6,0.99, 94, 23.99,'NC-17'),
  (15,'ALIEN CENTER',       'A Brilliant Drama of a Cat and a Mad Scientist who must Fight',2006,1,6,2.99,46, 10.99,'NC-17'),
  (16,'ALLEY EVOLUTION',    'A Fast-Paced Drama of a Robot and a Composer',                2006,1,6,2.99, 180,23.99,'NC-17'),
  (17,'ALONE TRIP',         'A Fast-Paced Character Study of a Composer and a Dog',        2006,1,3,0.99, 82, 14.99,'R'),
  (18,'ALTERED SCIENCE',    'A Intrepid Reflection of a Pastry Chef and a Frisbee',        2006,1,6,2.99, 185,23.99,'R'),
  (19,'AMADEUS HOLY',       'A Emotional Display of a Pioneer and a Technical Writer',     2006,1,6,0.99, 113,20.99,'PG'),
  (20,'AMELIE HELLFIGHTERS','A Boring Drama of a Woman and a Squirrel who must Conquer',   2006,1,4,4.99, 79, 23.99,'R');

INSERT INTO film_actor (actor_id, film_id) VALUES
  (1,1),(1,6),(2,3),(2,9),(3,5),(3,11),(4,2),(4,14),
  (5,6),(5,16),(6,8),(6,20),(7,4),(7,17),(8,9),(8,12),
  (9,10),(9,15),(10,7),(10,18),(11,1),(11,13),(12,3),(12,19),
  (13,6),(13,20),(14,2),(14,8),(15,5),(15,17),(16,9),(16,14),
  (17,4),(17,11),(18,7),(18,16),(19,10),(19,18),(20,1),(20,13);

INSERT INTO film_category (film_id, category_id) VALUES
  (1,6),(2,11),(3,6),(4,11),(5,8),(6,9),(7,5),(8,11),
  (9,11),(10,7),(11,6),(12,14),(13,7),(14,2),(15,9),
  (16,4),(17,4),(18,14),(19,3),(20,9);

INSERT INTO store (store_id, address_id) VALUES (1,1),(2,2);

INSERT INTO staff (staff_id, first_name, last_name, address_id, email, store_id, active, username) VALUES
  (1,'Mike', 'Hillyer',  3,'Mike.Hillyer@sakilastaff.com',  1,1,'Mike'),
  (2,'Jon',  'Stephens', 4,'Jon.Stephens@sakilastaff.com',  2,1,'Jon'),
  (3,'Linda','Williams', 5,'Linda.Williams@sakilastaff.com',1,1,'Linda'),
  (4,'Chris','Taylor',   6,'Chris.Taylor@sakilastaff.com',  2,1,'Chris');

UPDATE store SET manager_staff_id = 1 WHERE store_id = 1;
UPDATE store SET manager_staff_id = 2 WHERE store_id = 2;

INSERT INTO customer (customer_id, store_id, first_name, last_name, email, address_id, activebool, create_date) VALUES
  (1, 1,'MARY',     'SMITH',    'MARY.SMITH@sakilacustomer.org',    7, 1,'2006-02-14'),
  (2, 1,'PATRICIA', 'JOHNSON',  'PATRICIA.JOHNSON@sakilacustomer.org',8,1,'2006-02-14'),
  (3, 1,'LINDA',    'WILLIAMS', 'LINDA.WILLIAMS@sakilacustomer.org', 9, 1,'2006-02-14'),
  (4, 2,'BARBARA',  'JONES',    'BARBARA.JONES@sakilacustomer.org', 10,1,'2006-02-14'),
  (5, 1,'ELIZABETH','BROWN',    'ELIZABETH.BROWN@sakilacustomer.org',11,1,'2006-02-14'),
  (6, 2,'JENNIFER', 'DAVIS',    'JENNIFER.DAVIS@sakilacustomer.org',12,1,'2006-02-14'),
  (7, 1,'MARIA',    'MILLER',   'MARIA.MILLER@sakilacustomer.org',  13,1,'2006-02-14'),
  (8, 2,'SUSAN',    'WILSON',   'SUSAN.WILSON@sakilacustomer.org',  14,1,'2006-02-14'),
  (9, 2,'MARGARET', 'MOORE',    'MARGARET.MOORE@sakilacustomer.org',15,1,'2006-02-14'),
  (10,1,'DOROTHY',  'TAYLOR',   'DOROTHY.TAYLOR@sakilacustomer.org', 3,1,'2006-02-14'),
  (11,2,'LISA',     'ANDERSON', 'LISA.ANDERSON@sakilacustomer.org',  4,1,'2006-02-14'),
  (12,1,'NANCY',    'THOMAS',   'NANCY.THOMAS@sakilacustomer.org',   5,1,'2006-02-14'),
  (13,2,'KAREN',    'JACKSON',  'KAREN.JACKSON@sakilacustomer.org',  6,1,'2006-02-14'),
  (14,1,'BETTY',    'WHITE',    'BETTY.WHITE@sakilacustomer.org',    7,1,'2006-02-14'),
  (15,1,'HELEN',    'HARRIS',   'HELEN.HARRIS@sakilacustomer.org',   8,1,'2006-02-14'),
  (16,2,'SANDRA',   'MARTIN',   'SANDRA.MARTIN@sakilacustomer.org',  9,1,'2006-02-14'),
  (17,1,'DONNA',    'THOMPSON', 'DONNA.THOMPSON@sakilacustomer.org',10,1,'2006-02-14'),
  (18,2,'CAROL',    'GARCIA',   'CAROL.GARCIA@sakilacustomer.org',  11,1,'2006-02-14'),
  (19,1,'RUTH',     'MARTINEZ', 'RUTH.MARTINEZ@sakilacustomer.org', 12,1,'2006-02-14'),
  (20,2,'SHARON',   'ROBINSON', 'SHARON.ROBINSON@sakilacustomer.org',13,1,'2006-02-14');

INSERT INTO inventory (inventory_id, film_id, store_id) VALUES
  (1,1,1),(2,1,1),(3,1,2),(4,2,1),(5,2,2),(6,3,1),(7,3,2),
  (8,4,1),(9,4,2),(10,5,1),(11,5,2),(12,6,1),(13,6,2),
  (14,7,1),(15,7,2),(16,8,1),(17,8,2),(18,9,1),(19,9,2),
  (20,10,1),(21,10,2),(22,11,1),(23,11,2),(24,12,1),(25,12,2),
  (26,13,1),(27,13,2),(28,14,1),(29,14,2),(30,15,1),
  (31,16,1),(32,16,2),(33,17,1),(34,17,2),(35,18,1),
  (36,19,1),(37,19,2),(38,20,1),(39,20,2),(40,1,2);

INSERT INTO rental (rental_id, rental_date, inventory_id, customer_id, return_date, staff_id) VALUES
  (1, '2005-05-24 22:53:30',1, 1, '2005-05-26 22:04:30',1),
  (2, '2005-05-24 22:54:33',2, 2, '2005-05-28 19:40:33',1),
  (3, '2005-05-25 00:39:22',3, 3, '2005-06-01 22:12:22',1),
  (4, '2005-05-25 10:35:31',4, 4, '2005-06-03 13:43:31',2),
  (5, '2005-05-25 11:30:37',5, 5, '2005-06-02 04:33:37',1),
  (6, '2005-05-25 12:00:19',6, 6, '2005-06-04 12:28:19',2),
  (7, '2005-05-25 12:30:37',7, 7, '2005-06-01 19:09:37',1),
  (8, '2005-05-25 13:39:43',8, 8, '2005-05-27 20:30:43',2),
  (9, '2005-05-25 14:15:19',9, 9, '2005-05-28 07:22:19',1),
  (10,'2005-05-25 17:22:10',10,10,'2005-05-31 13:14:10',2),
  (11,'2005-05-26 07:33:55',11,11,'2005-05-29 11:43:55',1),
  (12,'2005-05-26 09:43:55',12,12,'2005-05-30 07:27:55',2),
  (13,'2005-05-26 11:50:04',13,13,'2005-06-02 19:46:04',1),
  (14,'2005-05-26 12:18:09',14,14,'2005-05-27 09:55:09',2),
  (15,'2005-05-26 13:45:29',15,15,'2005-05-28 22:20:29',1),
  (16,'2005-05-26 15:18:25',16,16,'2005-05-30 13:08:25',2),
  (17,'2005-05-26 16:22:59',17,17,'2005-05-29 21:14:59',1),
  (18,'2005-05-26 17:30:24',18,18,'2005-06-04 17:09:24',2),
  (19,'2005-05-27 08:55:01',19,19,'2005-05-29 06:27:01',1),
  (20,'2005-05-27 09:21:45',20,20,'2005-05-29 09:19:45',2),
  (21,'2005-05-27 10:44:19',21,1, '2005-06-01 08:19:19',1),
  (22,'2005-05-27 12:11:17',22,2, '2005-05-30 06:52:17',2),
  (23,'2005-05-27 13:03:16',23,3, '2005-05-30 09:39:16',1),
  (24,'2005-05-27 14:17:34',24,4, '2005-05-31 11:18:34',2),
  (25,'2005-05-27 16:23:57',25,5, '2005-05-31 16:15:57',1),
  (26,'2005-05-27 17:10:18',26,6, '2005-06-01 13:13:18',2),
  (27,'2005-05-28 07:55:55',27,7, '2005-06-03 07:30:55',1),
  (28,'2005-05-28 09:30:12',28,8, '2005-05-30 09:17:12',2),
  (29,'2005-05-28 11:48:53',29,9, '2005-05-31 09:27:53',1),
  (30,'2005-05-28 13:30:11',30,10,'2005-06-01 19:07:11',2);

INSERT INTO payment VALUES
  (1, 1, 1,1, 2.99,'2005-05-25 11:30:37'),
  (2, 1, 1,2, 0.99,'2005-05-28 10:35:23'),
  (3, 2, 1,3, 5.99,'2005-06-02 19:46:04'),
  (4, 2, 2,4, 0.99,'2005-06-04 06:15:05'),
  (5, 3, 2,5, 9.99,'2005-05-31 19:46:04'),
  (6, 3, 1,6, 4.99,'2005-06-04 15:28:19'),
  (7, 4, 2,7, 2.99,'2005-06-01 20:09:37'),
  (8, 4, 1,8, 0.99,'2005-05-27 21:30:43'),
  (9, 5, 1,9, 3.99,'2005-05-28 08:22:19'),
  (10,5, 2,10,2.99,'2005-05-31 14:14:10'),
  (11,6, 1,11,7.99,'2005-05-29 12:43:55'),
  (12,6, 2,12,1.99,'2005-05-30 08:27:55'),
  (13,7, 1,13,0.99,'2005-06-02 20:46:04'),
  (14,7, 2,14,4.99,'2005-05-27 10:55:09'),
  (15,8, 1,15,3.99,'2005-05-28 23:20:29'),
  (16,8, 2,16,4.99,'2005-05-30 14:08:25'),
  (17,9, 1,17,2.99,'2005-05-29 22:14:59'),
  (18,9, 2,18,5.99,'2005-06-04 18:09:24'),
  (19,10,1,19,4.99,'2005-05-29 07:27:01'),
  (20,10,2,20,2.99,'2005-05-29 10:19:45'),
  (21,11,1,21,6.99,'2005-06-01 09:19:19'),
  (22,11,2,22,0.99,'2005-05-30 07:52:17'),
  (23,12,1,23,1.99,'2005-05-30 10:39:16'),
  (24,12,2,24,3.99,'2005-05-31 12:18:34'),
  (25,13,1,25,7.99,'2005-05-31 17:15:57'),
  (26,13,2,26,2.99,'2005-06-01 14:13:18'),
  (27,14,1,27,5.99,'2005-06-03 08:30:55'),
  (28,14,2,28,4.99,'2005-05-30 10:17:12'),
  (29,15,1,29,1.99,'2005-05-31 10:27:53'),
  (30,15,2,30,0.99,'2005-06-01 20:07:11');
`;
