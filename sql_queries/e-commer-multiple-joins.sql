CREATE TABLE customers (
c_id SERIAL PRIMARY KEY,
name varchar(50)
);

CREATE TABLE orders (
o_id SERIAL PRIMARY KEY,
order_date DATE NOT NULL,
c_id INT NOT NULL,
FOREIGN KEY (c_id) REFERENCES customers(c_id)
);

CREATE TABLE products (
p_id SERIAL PRIMARY KEY,
name VARCHAR(50),
price INT NOT NULL
);

-- CREATE TABLE order_items

INSERT INTO customers(name) VALUES('John Doe'), ('Angel'), ('Isha'), ('Ishu'), ('Yashu')

ALTER TABLE orders
ADD COLUMN p_id SERIAL NOT NULL;
-- FOREIGN KEY (p_id) REFERENCES products(p_id);

ALTER TABLE orders
ADD CONSTRAINT fk_product
FOREIGN KEY (p_id)
REFERENCES products(p_id);

SELECT * FROM customers;

INSERT INTO orders (order_date, c_id) VALUES
('2024/12/02', 1),
('2024/12/03', 1),
('2024/11/02', 2),
('2026/12/03', 3),
('2021/1/01', 2),
('2020/3/03', 4);

INSERT INTO products (name, price) 
VALUES
('Keyboard', 4000),
('Kreo Mouse', 600),
('Lenovo LOQ', 90000),
('iPhone 17', 80000),
('A5 Mackboo', 150000),
('Kreo Gaming Chai', 30000);


SELECT * FROM products;
SELECT * FROM orders;
DELETE  FROM orders WHERE c_id > 0;



SELECT * FROM orders;


INSERT INTO orders (order_date, c_id, p_id)
VALUES
('2023/01/01', 1, 1),
('2023/03/02', 1, 2),
('2021/03/02', 2, 3),
('2020/04/02', 3, 4);


SELECT p.name, p.price, o.o_id, c.name from orders o JOIN products p ON o.p_id=p.p_id JOIN customers c ON o.c_id=c.c_id;