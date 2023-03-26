let mysql = require('mysql2');

let connection = mysql.createConnection({
    host:        'localhost',
    user:        'root',
    password:    '',
    database:    'nodejs_database'
});

connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Connection Succuessfully!');
    }
});

module.exports = connection; 