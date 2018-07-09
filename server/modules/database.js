
/*

Database structure

users: userId, nick, isAdmin, lastSeen, isGlobalBanned
userChannelPermissions: userChannelPermissionId, channelId, userId, permissionType
channels: channelId, name, topic, isVisible, isDefault, requireImage, requireVoice, requireLogin, isActive
userIPHistory: userIPHistoryId, userId, IPAddress, hostname, nick, seen

*/

mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "blaze",
  password: "blazes",
  database: "blazechat"
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
  con.query("SELECT * FROM users", (err, result) => {
    if (err) throw err;
    console.log("Result: " + result);
  });
});

module.exports = {
  db
}