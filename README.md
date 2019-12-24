# bamazon

### bamazon is similar as a online shopping tool, but very simplier functions. Cumstomers can purchase products, and manager can check the inventory and add new inventory products

*Customer order view*
![](1.gif)

*Manager view all the stocks and view the stocks with low stocks(item number less than 5)*
![](2.gif)

*Manager add inventory to the products*
![](3.gif)

*Manager add new products to the stock*
![](4.gif)

### I will need to use MySQL to have my inventory, I will need the Node and npm packages to be able to make this work.
### Technologies I have been use for
- Javascript
- MySQL
- Node.js

### To be able to drive for MySQL, I will need install npm package for MySQL, I will also need to include the package at the beginning of the js file.

``` javascript
var mysql = require("mysql");
```

### To be able to connect Javascript file and MySQL, I will need to use the user name and password from my MySQLdatabase:
``` javascript
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "**********",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  // connection.end();
  //purchaseItems()
  readInventory()
});

```
### I also need to include the connection in all function.
``` javascript
connection.query("SELECT * FROM products", function (err, results)
```

### To show the inventory of products, tables is better to present the products, after I did some reserch, I find cli-table is helpful, so I include the cli-table package at the beginning of the js file.

``` javascript
var Table = require('cli-table');
```
### As I will need add prompts and interactive command-line user interfaces, I will also need to include inquirer package.
```javascript 
var inquirer = require("inquirer");
```

### On bamazonManager Javascript file, I have added the switch statement. It is reaally useful as the manager will choose different expressions, and the selected block of code will be executed.

``` javascript

switch (answer.action) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewLowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;
            
            case "Add New Product":
                addNewProduct();
                break;

        }

```

