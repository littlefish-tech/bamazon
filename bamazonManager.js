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
      connection.query("SELECT * FROM products", function(err, results) {
        //console.log(results)
        var lowStockItem;
       lowStockItem = results.filter(item => item.stock_quantity < 100 );
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
  