var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  // connection.end();
  //purchaseItems()
  checkInventory()
});

function checkInventory(){
  connection.query("SELECT * FROM products", function (err, results) {
    //console.log(results);
    
    if (err) throw err;
    var totalLength = results.length;
inquirer
    .prompt([
      {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    }
  ])
    .then(function(answer){
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
    })
  })
}

function viewProducts() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    //console.log(results);

    // instantiate
    var table = new Table({
      head: ['item_id', 'product_name', "department_name", "price", "stock_quantity"],
      colWidths: [10, 20, 25, 10, 10],
      style: {
        'padding-left': 1
        , 'padding-right': 1
        , head: []
        , border: []
      }
    });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    for (i = 0; i < results.length; i++) {
      table.push(
        [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
      );
    }
    console.log(table.toString());
  })
  checkInventory()
}
function viewLowInventory() {
  connection.query("SELECT * FROM products", function (err, results) {
    //console.log(results)
    var lowStockItem;
    lowStockItem = results.filter(item => item.stock_quantity < 5);
    //console.log(lowStockItem);

    var table = new Table({
      head: ['item_id', 'product_name', "department_name", "price", "stock_quantity"],
      colWidths: [10, 20, 25, 10, 10],
      style: {
        'padding-left': 1
        , 'padding-right': 1
        , head: []
        , border: []
      }
    });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    for (i = 0; i < lowStockItem.length; i++) {
      table.push(
        [lowStockItem[i].item_id, lowStockItem[i].product_name, lowStockItem[i].department_name, lowStockItem[i].price, lowStockItem[i].stock_quantity]
      );
    }
    console.log(table.toString());

  })
  checkInventory()
}

function addInventory(){
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    var totalLength = results.length;
    //console.log(totalLength);
    //console.log(results);
    inquirer
      .prompt([
        {
          name: "itemNumber",
          type: "input",
          message: "Please enter the product ID which you would like to add Inventory.",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "numbersAdd",
          type: "input",
          message: "How many would you like to add?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function (answer){
        //console.log(results);
        var chosenItem;
        var inventoryQuantity;
        var addQuantity;
        var updatedQuantity;
        var buyProduct;
        //console.log(totalLength);

        //console.log(chosenItem);
        chosenItem = results[answer.itemNumber - 1];
        //console.log(chosenItem.stock_quantity);
        inventoryQuantity = chosenItem.stock_quantity;
        //console.log(inventoryQuantity)
        addQuantity = parseInt(answer.numbersAdd);
        //console.log(buyAmount);
        updatedQuantity = inventoryQuantity + addQuantity;
        //console.log(updatedQuantity);
        addProductName = chosenItem.product_name;

        connection.query(
          "UPDATE products SET ? WHERE ?",
          [
            {
              stock_quantity: updatedQuantity
            },
            {
              item_id: chosenItem.item_id
            }
          ],
          function (error) {
            if (error) throw err;
            //purchaseItems();
            console.log("The  product " + buyProduct + " new count has been updated, the updated inventory is " + updatedQuantity + "\n");
            console.log("*************************************");
          }
        );
        checkInventory()
      });
  });
}

function addNewProduct(){
  inquirer
   .prompt([
  //   {
  //   name: "productID",
  //   type: "input",
  //   message: "Please enter the new product information."
  //  },
   {
     name: "productName",
     type: "input",
     message: "Please enter the product name."
   },
   {
     name: "productDepartment",
     type: "input",
     message: "Please enter the product Department."
   },
   {
    name: "productPrice",
    type: "input",
    message: "Please enter the product Price."
   },
  {
    name: "productQuantity",
    type: "input",
    message: "Please enter the product Quantity.",
    validate: function (value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }
  ])
   .then(function(answer){
    connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: answer.productName,
        department_name: answer.productDepartment,
        price: answer.productPrice,
        stock_quantity: answer.productQuantity
      },
      function(err){
        if (err) throw err;
        console.log("The new product has been add successfully!");
        console.log("*********************************************")
      
      }
      
    )
   checkInventory()
   })
}



