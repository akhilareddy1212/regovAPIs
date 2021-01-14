var mysql = require('mysql');
const util = require('util');
var config = require('../config/config');
var connection = mysql.createPool({

    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database

});
connection.query = util.promisify(connection.query).bind(connection);
module.exports = connection;