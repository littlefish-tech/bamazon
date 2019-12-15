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

connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  // connection.end();
  
});

 
function purchaseItems() {
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
    for (i = 0; i < results.length; i++){
    table.push(
      [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
    );
    }
    console.log(table.toString());


    //var choiceArray = [];
    // for (var i = 0; i < results.length; i++){
      //choiceArray.push(results[i].item_id)
    //}
  
    inquirer
        .prompt([
          {
        name: "selectItem",
        type: "input",
        message: "Please enter the product ID which you would like to buy."
        },
        {
        name: "numbersBuy",
        type: "input",
        message: "How many would you like to buy?"
        }
        ])
        .then(function(answer){
            var chosenItem;
            var inventoryQuantity;
            for(var i = 0; i < results.length; i++){
              if (results[i].item_id === answer.selectItem){
                chosenItem = results[i];
                inventoryQuantity = chosenItem.stock_quantity;
                
                //console.log("The Item you pick is " + chosenItem)
              }
            }
            var buyAmount = parseInt(answer.numbersBuy);
            //var inventoryQuantity = chosenItem.stock_quantity;
            if (inventoryQuantity > buyAmount){
              console.log("Your order has been placed");
              var updatedQuantity = inventoryQuantity - buyAmount;
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                  stock_quantity: updatedQuantity
                },
                {
                  item_id: answer.selectItem
                }
              ],
                function(error) {
                  if (error) throw err;
                  //purchaseItems();
                }
              );
              
            } else{
              console.log("We don't have enough stocks");
              //purchaseItems();
            }
        })
      })

}  
        purchaseItems()
        
                
            
        
