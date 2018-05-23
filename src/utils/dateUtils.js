// converts a unix timestamp to a user-friendly timestamp
//
// unixToTimestamp( String timestamp, int format)
//
// format = 1, friendly date format eg. 21 May 2018 23:55:52
// format = 2, SQL date format eg. 2018-05-21 23:56:07
//

export const unixToTimestamp = (UNIX_timestamp, format) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var monthRaw = (a.getMonth() + 1)  < 10 ? '0' + (a.getMonth() + 1) : (a.getMonth() + 1);
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time;
    if (format === 1 ) {
        time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    }
    else if (format === 2 ) {
        time = year + '-' + monthRaw + '-' + date + ' ' + hour + ':' + min + ':' + sec;
    }
    return time;
}