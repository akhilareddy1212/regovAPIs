var loginModel = require('../model/loginModel');
var paramValidator = require('../validators/paramValidator');
const User = require('../model/userModel');

let loginController =
{
    getSampleAPIInfo(req, res) {
        if (paramValidator.checkObject({
            inputText: req.query.inputText
        }) !== true) {
            return res.status(500).json({ error: paramValidator.errorMessage });
        }
        loginModel.getSampleAPIInfo(req.query).then(response => {
            var responseData = {
                "data": response ? response : []
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    getSampleAPI(req, res) {
        if (paramValidator.checkObject({
            inputText: req.query.inputText
        }) !== true) {
            return res.status(500).json({ error: paramValidator.errorMessage });
        }
        loginModel.getSampleAPI(req.query).then(response => {
            var responseData = {
                "data": response ? response : []
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    async Login(req, res) {
        try {
            var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            var ip = req.client.remoteAddress;
            var user_agent = req.get('User-Agent');

            let loginDetails = await User.LoginAttempt(req.body.username, req.body.password, ip, user_agent, function (result) {

                return res.json(result);

                //rest of your code goes in here
            });

        } catch (err) {
            return res.json({
                msg: "Wrong Username or Password"
            });
        }

    },
    async Logout(req, res) {
        try {
                    return res.json({token:""});

        } catch (err) {
            return res.json({
                msg: "something went wrong"
            });
        }

    }
};
module.exports = loginController;
