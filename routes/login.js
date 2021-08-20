var express = require('express');
var router = express.Router();
var azureTable = require('azure-table-node');

//set azure storage credentials
   azureTable.setDefaultClient({
       accountUrl: 'https://nodeapp1.table.core.windows.net/', //go to storage account-> settings ->endpoints -> table service endpoint
       accountName: 'nodeapp1', //get this from access keys section
       accountKey: 'UPRpYI6ENsKxlRclCGQCl31NVAJD0TON2qDoZQH7Z5GRv/833TeQPtYWoZ1bZ5KsjsC8+XFiWFM90FpMOAS3Kg=='
   });
   
//after creating a table in azure storage, go to storage explorer to enter data and query table. 
   

router.post('/', function(req, res, next) {
	var name = req.body.name;
	var pwd = req.body.pwd;
	console.log(name+"  "+pwd);
//////connecting to azure Storage table	
	var client = azureTable.getDefaultClient();
   
      client.queryEntities('ujjwal', {
          query: azureTable.Query.create('PartitionKey', '==', '123') 
   
      }, function (err, data, continuation) {
          if (err) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.write("Got error :-( " + err);
              res.end("");
              return;
          }
			
          var json = JSON.stringify(data);
		 
			var obj = JSON.parse(json);
			console.log("From Azure "+ obj[0].Name+"    "+obj[0].Pwd);
			
          //res.writeHead(200, { 'Content-Type': 'text/plain' })
			console.log("Table displayed: " + json);
          //res.end("Table displayed: " + json);
		  if(name==obj[0].Name && pwd==obj[0].Pwd){
			  console.log("checked");
		  res.render('welcome', { title: name });}
		 else{
		 res.writeHead(404, { 'Content-Type': 'text/plain' })
   
         res.end("No user ");
		 }
         });
   
	
	
	
	
	//res.send("Hello");
	
});
module.exports = router;