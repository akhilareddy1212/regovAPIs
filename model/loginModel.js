var db = require('../db/dbConnection');

var loginModel = {
    Logout: function (params) {
        try {
            return new Promise((resolve, reject) => {
                var query = "UPDATE ?? SET ??=? WHERE ?? =?";
                var table = ["user_login", "logout_time", new Date(), "uid", params.userId];
                db.query(query, table, (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    }
};
module.exports = loginModel;
