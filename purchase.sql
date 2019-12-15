DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(50) NULL,
    PRIMARY KEY (item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Eletronic", 750, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "Eletronic", 900, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Peanut Butter", "Food", 6.5, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Juice", "Food", 3, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hand Cream", "Beauty", 10, 110);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Addidas Running Shoes", "Appreal", 90, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dish Washer", "Kitchen Appliance", 300, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pressure Cooker", "Kitchen Appliance", 90, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chocolate", "Food", 15, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LEGO", "Kids Toys", 50, 180);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Refrigerator", "Kitchen Appliance", 2150, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Refrigerator", "Kitchen Appliance", 2150, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HP Printer", "Office", 2150, 10);

