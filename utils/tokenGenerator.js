const jwt = require("jsonwebtoken");
require("dotenv").config();

const KEY = process.env.JSON_WEB_TOKEN_SECRET

const generateToken = ({ id }) => {
    try {
        let token = jwt.sign(
            {
                sub: id,
            },
            KEY,
            { expiresIn: 9000 }
        );
        return token;
    } catch (err) {
        next(err);
    }
};

module.exports = generateToken;
