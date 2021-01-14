const Token = require("../model/auth/tokenModel");
const jwtToken = require('jsonwebtoken');

class tokenController {
    /**
     * Validate a token, this will be used before any route for validating authorization
     *
     * @param req
     * @param res
     * @param next
     */
    static Validate(req, res, next) {
        let authtoken = req.headers["x-access-token"] || req.headers["authorization"];

        if (!authtoken) {
            return res.status(403).send({
                message: "No token provided!"
            });
        }
         const token = authtoken.split(' ')[1];
        jwtToken.verify(token, 'test1234', (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
            req.userId = decoded.uid;
            next();
        });
    }

}

module.exports = tokenController;
