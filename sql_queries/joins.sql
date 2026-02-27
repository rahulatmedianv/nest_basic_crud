CREATE TABLE customers(
	cust_id SERIAL PRIMARY KEY,
	cust_name VARCHAR(100) NOT NULL
);


CREATE TABLE orders(
	order_id SERIAL PRIMARY KEY,
	order_date DATE NOT NULL,
	price NUMERIC NOT NULL,
	cust_id INTEGER NOT NULL,
	FOREIGN KEY (cust_id) REFERENCES
	customers(cust_id)
);

INSERT INTO customers (cust_name)
VALUES
('Raju'), ('Sham'), ('Paul'), ('Alex');

SELECT * FROM customers;

INSERT INTO orders (order_date, cust_id, price)
VALUES
('2024-01-01', 1, 250.00),
('2024-01-15', 1, 300.00),
('2024-02-01', 2, 150.00),
('2024-03-01', 3, 450.00),
('2024-04-04', 2, 550.00);


-- INNER JOIN
SELECT c.cust_name, COUNT(o.order_id), SUM(o.price) FROM customers c
INNER JOIN
orders o
ON c.cust_id=o.cust_id
GROUP BY cust_name;


-- LEFT JOIN

SELECT * FROM customers
RIGHT JOIN orders
ON customers.cust_id=orders.cust_id;


