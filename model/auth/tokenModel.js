const jwt = require("jsonwebtoken");
const HttpStatus = require('http-status-codes');

class tokenModel {
    /**
     * Create a new token
     *
     * @param {Object} user
     * @param {String} [expiresIn='2h']  Expiry time of this token, e.g 2h
     */
    constructor(user, expiresIn) {
        /**
         * @type string
         */
        this.token = jwt.sign(
            {
                user: {
                    id: user.id,
                    email: user.email,
                    roles: user.roles,
                    isVerified: user.isVerified
                }
            },
            'test1234',
            {
                expiresIn: expiresIn || "2h"
            }
        );
    }

    /**
     * Validate a token and return the decoded object
     *
     * @param {string} token
     * @returns {Object}
     */
    static Validate(token, callback) {
        console.log(token, 'validate')
        let decodedToken = tokenModel.DecodeAndVerify(token, callback);

        // TODO: use isVerified with the email.
        // This will prevent reusing the JWT that was used in the email verification
        // if (!decodedToken.user.isVerified) {
        //    throw new Error('Token is invalid, this token can only be used for user verification.', HttpStatus.UNAUTHORIZED);
        // }
        return decodedToken;
    }

    /**
     * Decode and verify the specified token.
     *
     * @function Token.DecodeAndVerify
     * @param token
     * @returns {*}
     */
    static DecodeAndVerify(token, resolve, callback) {
        console.log(typeof token, 'tpkoen')
        if (!token || typeof token == 'undefined') {
            console.log('token is not specified')
            throw ({ status: "fail", message: 'token is not specified.' });

            // return callback({"status":"fail","msg":"token is not specified"});

        }
        console.log(token, 'data')
        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'test1234');
        } catch (err) {
            console.log(err, '##')
            throw ({ status: "fail", message: 'token is invalid.' });
        }

        return decodedToken;
    }

}

module.exports = tokenModel;
