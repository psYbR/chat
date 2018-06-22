//
// get the user's IP address
//

// to do: associate it with the socket / session ID

const getIpAddress = (socket) => {

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

module.exports = getIpAddress;