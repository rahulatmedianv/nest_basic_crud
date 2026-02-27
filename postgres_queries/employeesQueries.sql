CREATE TABLE employees (
	emp_id SERIAL PRIMARY KEY,
	fname VARCHAR(50),
	lname VARCHAR(50),
	email VARCHAR(50),
	dept VARCHAR(50),
	salary INTEGER,
	hire_date DATE
);

INSERT INTO employees (fname, lname, email, dept, salary, hire_date)
VALUES 
('Raj', 'Sharma', 'raj.sharma@example.com', 'IT', 50000, '2020-01-15'),
('Priya', 'Singh', 'priya.singh@example.com', 'HR', 45000, '2019-03-22'),
('Arjun', 'Verma', 'arjun.verma@example.com', 'IT', 55000, '2021-06-01'),
('Suman', 'Patel', 'suman.patel@example.com', 'Finance', 60000, '2018-07-30'),
('Kavita', 'Rao', 'kavita.rao@example.com', 'HR', 47000, '2020-11-10'),
('Amit', 'Gupta', 'amit.gupta@example.com', 'Marketing', 52000, '2020-09-25'),
('Neha', 'Desai', 'neha.desai@example.com', 'IT', 48000, '2019-05-18'),
('Rahul', 'Kumar', 'rahul.kumar@example.com', 'IT', 53000, '2021-02-14'),
('Anjali', 'Mehta', 'anjali.mehta@example.com', 'Finance', 61000, '2018-12-03'),
('Vijay', 'Nair', 'vijay.nair@example.com', 'Marketing', 50000, '2020-04-20');


SELECT * FROM employees;

ALTER TABLE employees ALTER COLUMN fname SET NOT NULL;
ALTER TABLE employees ALTER COLUMN lname SET NOT NULL;
ALTER TABLE employees ALTER COLUMN email SET NOT NULL;
ALTER TABLE employees ADD UNIQUE (email);
ALTER TABLE employees ALTER COLUMN dept SET NOT NULL;
ALTER TABLE employees ALTER COLUMN salary SET NOT NULL;
ALTER TABLE employees ALTER COLUMN hire_date SET DEFAULT CURRENT_DATE;

-- clouses 
SELECT fname, dept FROM employees WHERE dept IN ('IT', 'HR');
--  here 40000 and 65000 is included
SELECT fname, dept, salary FROM employees WHERE salary BETWEEN 40000 AND 65000;


SELECT DISTINCT dept FROM employees;


--  Order by
SELECT * FROM employees ORDER BY fname;

SELECT * FROM employees ORDER BY fname DESC;

-- LIMIT
SELECT * FROM employees ORDER BY fname LIMIT 3;

-- LIKE here all the employees where fname starts with R
SELECT * FROM employees WHERE fname LIKE 'R%'

SELECT * FROM employees WHERE fname LIKE '%a%'
--  second character has a
SELECT * FROM employees WHERE fname LIKE '_a%'

--  case insensitive
SELECT * FROM employees WHERE fname ILIKE 'a%'

--  all the department with two character
SELECT fname, dept FROM employees WHERE dept  LIKE '__';

-- Aggeregation ( count, sum, min, average)
-- total employees
SELECT COUNT(emp_id) FROM employees;

-- total salary
SELECT SUM(salary) FROM employees;
-- min salary
SELECT MIN(salary) FROM employees;

-- average salary
SELECT AVG(salary) FROM employees;


-- max salary
SELECT MAX(salary) FROM employees;






-- Group by

-- no. of employees in each department
SELECT dept FROM employees GROUP BY dept;

SELECT dept, COUNT(fname) FROM employees GROUP BY dept;
SELECT dept, AVG(salary) FROM employees GROUP BY dept ORDER BY dept;



-- strign function

-- concat
SELECT  CONCAT(fname, ' ',  lname) AS fullname from employees;

-- concat_WS
SELECT  CONCAT_WS(' ', fname, lname) AS fullname, dept from employees;


-- substring (both character are included ) 
SELECT SUBSTR('Hello buddy!', 1, 4);

-- replace REPLACE(str, from_str, to_str)
SELECT REPLACE('Hey Buddy', 'Hey', 'Hello')

SELECT CONCAT_WS(' ', fname, lname) AS fullname, REPLACE(dept, 'IT', 'Technologia') FROM employees;


--  reverse
SELECT REVERSE('Hello');

-- Length
SELECT LENGTH('Hello');

SELECT CONCAT_WS(' ', fname, lname) AS fullname, LENGTH(CONCAT(fname, lname)) AS len FROM employees;

-- select employes whose name length is 4
SELECT CONCAT_WS(' ', fname, lname) AS fullname, LENGTH(fname) AS len FROM employees WHERE LENGTH(fname) = 4;

-- upper case
SELECT UPPER('Rahul')

-- lower case
SELECT LOWER('Rahul')


-- LEFT
SELECT LEFT('Rahul', 2);

-- Right
SELECT RIGHT('Rahul', 2);

-- Trim
SELECT TRIM(' OKKOK        ');

-- position
SELECT POSITION('om' in 'Thomas');


SELECT CONCAT_WS(':', emp_id,fname, lname, dept) as task1 from employees;
SELECT CONCAT_WS(':', emp_id, CONCAT_WS(' ',fname, lname), dept, salary) as task1 from employees;



SELECT CONCAT_WS(':', emp_id, fname, UPPER(dept)) as task1 from employees;

SELECT CONCAT_WS(' ', CONCAT(SUBSTR(dept, 1,1), emp_id), fname) as task4 from employees;



SELECT DISTINCT dept FROM employees;

SELECT salary, fname, dept from employees order by salary desc;

SELECT salary, fname, dept from employees order by salary desc limit 3;


SELECT fname from employees where fname LIKE 'A%'

SELECT fname, lname from employees where LENGTH(lname) =4;



-- Aggregate functions

select count(emp_id) from employees;

select dept,  count(emp_id) as count from employees group by dept;

select dept, avg(salary) as average from employees group by dept 
order by average; 


-- add a column
ALTER TABLE employees 
ADD COLUMN age INT;

-- drop a column
ALTER TABLE employees 
DROP COLUMN age;

-- Rename a column
ALTER TABLE employees 
RENAME COLUMN first_name TO fname;

-- rename a table name
ALTER TABLE empl 
RENAME TO employees;


select * from employees;


-- new table
CREATE TABLE person(
id integer,
fname varchar(150),
city varchar(150),
mob varchar(15)
)




-- check constraint 



ALTER TABLE person 
ADD COLUMN 
	mob VARCHAR(15)
		CHECK (LENGTH(mob) >=10);


INSERT INTO person (fname, city, mob) VALUES
('Rahul Sharma', 'Mumbai', '9876543210'),
('Priya Verma', 'Delhi', '9876543211'),
('Amit Singh', 'Bangalore', '9876543212'),
('Neha Gupta', 'Hyderabad', '9876543213'),
('Arjun Mehta', 'Pune', '9876543214'),
('Sneha Reddy', 'Chennai', '9876543215'),
('Vikram Patel', 'Ahmedabad', '9876543216'),
('Anjali Desai', 'Surat', '9876543217'),
('Karan Malhotra', 'Jaipur', '9876543218'),
('Pooja Nair', 'Kochi', '9876543219'),
('Rohit Kulkarni', 'Nagpur', '9876543220'),
('Simran Kaur', 'Chandigarh', '9876543221'),
('Manish Yadav', 'Lucknow', '9876543222'),
('Divya Iyer', 'Coimbatore', '9876543223'),
('Suresh Babu', 'Vijayawada', '9876543224'),
('Meena Joshi', 'Indore', '9876543225'),
('Nikhil Jain', 'Bhopal', '9876543226'),
('Kavita Rao', 'Mysore', '9876543227'),
('Harsh Vardhan', 'Patna', '9876543228'),
('Isha Kapoor', 'Noida', '9876543229'),
('Deepak Mishra', 'Kanpur', '9876543230'),
('Ritika Sharma', 'Thane', '9876543231'),
('Aditya Roy', 'Gurgaon', '9876543232'),
('Tanvi Shah', 'Rajkot', '9876543233'),
('Sanjay Das', 'Kolkata', '9876543234'),
('Preeti Chawla', 'Amritsar', '9876543235'),
('Abhishek Tiwari', 'Varanasi', '9876543236'),
('Nandini Pillai', 'Trivandrum', '9876543237'),
('Yash Agarwal', 'Meerut', '9876543238'),
('Shruti Sinha', 'Ranchi', '9876543239'),
('Gaurav Khanna', 'Jodhpur', '9876543240'),
('Aarti Kulshrestha', 'Udaipur', '9876543241'),
('Mohit Arora', 'Faridabad', '9876543242'),
('Payal Saxena', 'Ghaziabad', '9876543243'),
('Ramesh Gowda', 'Mangalore', '9876543244'),
('Komal Thakur', 'Shimla', '9876543245'),
('Ankit Srivastava', 'Allahabad', '9876543246'),
('Bhavna Sood', 'Dehradun', '9876543247'),
('Chirag Parekh', 'Vadodara', '9876543248'),
('Lakshmi Narayan', 'Madurai', '9876543249'),
('Prakash Shetty', 'Udupi', '9876543250'),
('Swati Jaiswal', 'Gwalior', '9876543251'),
('Tushar Bansal', 'Agra', '9876543252'),
('Rekha Menon', 'Thrissur', '9876543253'),
('Varun Chopra', 'Ludhiana', '9876543254'),
('Sonal Arvind', 'Nashik', '9876543255'),
('Hemant Dubey', 'Raipur', '9876543256'),
('Jyoti Rawat', 'Haridwar', '9876543257'),
('Kishore Pillai', 'Salem', '9876543258'),
('Alok Pandey', 'Bareilly', '9876543259');

ALTER TABLE person
ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY;

-- add check constraint for checking user 
ALTER TABLE person
ADD CONSTRAINT mob_no_less_than_10
	CHECK (LENGTH(mob) >= 10);



INSERT INTO person (fname, city, mob)
VALUES('Varun Semwal', 'Uttarkashi', '2378654314');



-- case expression

SELECT fname, salary,
CASE 
	WHEN salary >=50000 THEN 'High'
	ELSE 'Low'
END AS sal_cat
FROM employees;

SELECT fname, salary,
CASE 
	WHEN salary >=50000 THEN 'High'
	WHEN salary >= 48000 THEN 'Mid'
	ELSE 'Low'
END AS sal_cat
FROM employees;


SELECT fname, salary,
	salary/10
 AS bonus
FROM employees;


SELECT 
CASE 
	WHEN salary >=50000 THEN 'High'
	WHEN salary >= 48000 THEN 'Mid'
	ELSE 'Low'
END AS sal_cat,
COUNT(salary)
FROM employees
GROUP BY sal_cat;


-- Relationship

-- One to one
-- one to many
-- many to many
 



