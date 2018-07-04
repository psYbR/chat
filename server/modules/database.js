const sql = require('mssql')
const config = {
  user: 'username',
  password: 'password',
  server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
  database: 'database',
  options: {
    encrypt: false // Use this if you're on Windows Azure
  }
}

sql.close()
sql.connect(config).then(() => {
  var request = new sql.Request();
  request.query("INSERT INTO tbl (col) VALUES ('" + value + "');select @@IDENTITY AS \'identity\'").then((recordset) => {
    if (recordset.rowsAffected[0] > 0) {
      globals.log("ID of first inserted row: " + recordset.recordset[0].identity);
    }
    else {
      globals.log("no rows affected", 2);
    }
  }).catch(function(err) {
    globals.log("Wuery error: " + err, 2)
  });
}).catch(function(err) { if (err) {
  globals.log('Connection Error: ' + err, 2); }
});