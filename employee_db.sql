DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30)NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30)NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30)NOT NULL,
  last_name VARCHAR(30)NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);


INSERT INTO department (department_name)
VALUES ("finance"), ("Human resorces"), ("legal"), ("Tech"), ("Organization"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 120000, 1), ("manager", 70000, 2), ("lawyer", 140000, 3), ("I.T", 600000, 4), ("receptionist", 40000, 5), ("Sales Lead", 50000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Soleman", "Sayeed", 1, 2), ("Sarah", "Connor", 2, NULL), ("John", "Carter", 3, 4), ("Peter", "Parker", 2, NULL), ("Mary", "Sully", 6, 4), ("Lawrence", "Muhtrap", 2, NULL), ("Jack", "Mcreedy", 2, NULL), ("Felicia", "Johnson", 2, NULL), ("Chong", "Wang", 4, 7);


SELECT department_name, salary, title
FROM department
INNER JOIN role
ON department.id = role.department_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, employee.manager_id
FROM department 
INNER JOIN role
ON department.id = role.department_id
INNER JOIN employee
ON employee.role_id = role.id;
-- INNER JOIN employee
-- ON employee.manager_id = employee.id;


SELECT * FROM employee;
