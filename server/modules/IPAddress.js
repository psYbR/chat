db = require('./database');
globals = require('./globals');
config = require ('../config');
session = require('./sessions');

//
// get the user's IP address and log it
//
const getIPAddress = (socket) => {

  //get the address value from the socket object
  var ipaddress = socket.handshake.address.substr(7);

  //if it was set (it is often not, particularly in dev)
  if (ipaddress) {

    //perform a reverse DNS lookup to see if we can get a hostname for the address
    require('dns').reverse(ipaddress, function(err, domains) {

      //if there was a result from the DNS lookup
      if (domains) {
        return domains[0];
      } else {
        return ipaddress;
      }

    });

  //if the IP couldn't be found
  } else {
    return "unknown IP;"
  }
  
}

//log the connection of the IP address
const logIPAddress = (socket) => {

  const IPAddress = getIPAddress(socket) || 'NULL'
  globals.log("(IPAddress) Connection from: " + IPAddress);

  db.query("SELECT * FROM IP WHERE IPAddress = ?",[IPAddress], (err, result) => {
    if (err) throw err;

    //console.log(result)

    if (result.length > 0 && result[0].isGlobalBanned) {
      socket.disconnect(); //drop like a hot potato if the IP is banned
      globals.log("(IPAddress) Banned user tried to connect.")
    } else if (result.length > 0) {

      +new Date;
      const now = globals.getSQLDate(Date.now());

      db.query("UPDATE IP SET lastActiveDatetime=? WHERE IPAddress=?",
        [now, IPAddress], (err, result) => {
        if (err) throw err;
        globals.log("(IPAddress) Updated record.")
      });

    } else {

      +new Date;
      const now = globals.getSQLDate(Date.now());

      db.query("INSERT INTO IP (IPAddress, lastActiveDatetime, lastUserId, lastNick) VALUES (?, ?, 0, '')",
        [IPAddress, now], (err, result) => {
        if (err) throw err;
        globals.log("(IPAddress) Added new record for IP: '" + IPAddress + "'")
      });

    }
  });

}

//regularly drops sessions that are expired
const purgeIPAddresses = () => {
  if (globals.databaseConnected) {
    +new Date;

    //get rid of IPs (that aren't banned) from the DB table if they are older than the configured age
    db.query("DELETE FROM IP WHERE lastActiveDatetime < ? AND isGlobalBanned = 0",[globals.getSQLDate(Date.now() - (config.maxIPLogAge * 24 * 60 * 60 * 1000))], (err, result) => {
      if (err) throw err;
      //globals.log("(session) Sessions purged from DB."); 
    });
  } else {
    globals.log("(IPAddress) IP logging disabled - no database connection")
  }
}
setInterval(purgeIPAddresses, 5 * 60 * 1000)

const onConnect = (socket) => {
  try {
    logIPAddress(socket)
  } catch(err) {
    globals.log('(index) Failed to get IP address: "' +  err)
  }
}

module.exports = {
  onConnect
}