var express = require('express');
var app = express();
var pg  = require('pg');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'));

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/salesforce';
if (process.env.DATABASE_URL !== undefined) {
  pg.defaults.ssl = true;
}
var client = new pg.Client(connectionString);
client.connect();

app.get('/', function(request, response) {
  client.query('SELECT * FROM salesforce.Account', function(error, data) {
    response.json(data.rows);
  });  
})

app.get('/multiply/:num1/:num2', function(request, response) {
  response.send((request.params.num1 * request.params.num2)+'');
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
