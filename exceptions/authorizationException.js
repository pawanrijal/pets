class AuthorizationException extends Error {
    constructor(statusCode) {
        super("Not Authorized")
        this.statusCode = statusCode;
        this.message = "Not Authorized";
    }
}

module.exports = AuthorizationException;