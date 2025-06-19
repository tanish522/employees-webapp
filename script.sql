CREATE DATABASE IF NOT EXISTS employee_manager;
    USE employee_manager;

    -- Departments Table
    CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    status TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Employee Table
    CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    name VARCHAR(100) NOT NULL,
    dob DATE,
    phone VARCHAR(15),
    photo VARCHAR(255),
    email VARCHAR(100),
    salary DECIMAL(10,2),
    status TINYINT DEFAULT 1,
    created DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES department(id)
    );

    INSERT INTO department (name) VALUES ('HR'), ('Engineering'), ('Sales') ('Marketing');

    INSERT INTO employee (department_id, name, dob, phone, photo, email, salary)
    VALUES
    (1, 'Alice', '1995-01-01', '1234567890', '', 'alice@example.com', 60000),
    (2, 'Bob', '1990-03-10', '9876543210', '', 'bob@example.com', 75000),
    (3, 'Charlie', '2000-07-20', '4567890123', '', 'charlie@example.com', 45000);
