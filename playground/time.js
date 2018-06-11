const moment = require('moment');
//Jan Ist 1970 00:00:10 am
//console.log(new Date().getMonth());
const date = moment();
console.log(date);
//date.add('100', 'year').subtract(9, 'months');
console.log(date.format('h:mm a'));
