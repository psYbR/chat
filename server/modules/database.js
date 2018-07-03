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
      console.log("ID of first inserted row: " + recordset.recordset[0].identity);
    }
    else {
      console.log("no rows affected");
    }
  }).catch(function(err) {
    console.log("Wuery error: " + err)
  });
}).catch(function(err) { if (err) {
  console.log('Connection Error: ' + err); }
});