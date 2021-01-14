// import {AxiosRequestConfig as req} from "axios";

const mysql = require('mysql');
const config = require('../config/config');
const jwt = require('../config/jwt');
const HttpStatus = require('http-status-codes');
const jwtToken = require('jsonwebtoken');
const md5 = require('md5');



const connection = mysql.createConnection(config);

/**
 * @typedef {Object} User
 * @property id
 * @property phone
 * @property email
 * @property password
 * @property isVerified
 */
class userModel {
    /**
     * Attempt to sign in the user with the following email and password
     *
     * @function User.LoginAttempt
     * @param {string} email
     * @param {string} password
     * @returns {{user: User, token: Token.token, refreshToken: RefreshToken.refreshToken}}
     * @throws {Error}
     */
    static async LoginAttempt(username, password, ip, user_agent, callback) {
        var post = {
            password: md5(password),
            username: username
        }
        var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";

        var table = ["user", "u_password", post.password, "u_username", post.username];

        query = mysql.format(query, table);
        connection.query(query, function (err, rows) {
            if (err) {
            console.log(err,'test')
                return { "Error": true, "Message": "Error executing MySQL query" };
            }
            else {
                if (rows.length == 1) {

                    var user = {
                        id: rows[0].id,
                    }
                    var token = jwtToken.sign(user, 'test1234', {
                        expiresIn: 1440
                    });
                    var userData = {
                        token: token,
                    }

                    connection.query(query, userData, function (err, rows) {
                        if (err) {
                            throw new Error('An error occurred');
                        } else {
                            return callback(userData);
                        }
                    });
                }
                else {

                    connection.query(query, function (err, rows) {
                        console.log(err, rows, "#$#$")
                        if (err) {
                            throw new Error('An error occurred');
                        } else {
                            return callback({ "status": "fail", "msg": "wrong Username or Password" });
                        }
                    });

                }

            }
        });

    }


}

/**
 * @class User
 */
module.exports = userModel;
