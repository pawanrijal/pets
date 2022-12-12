class AuthorizationException extends Error {
    constructor(statusCode) {
        super(statusCode)
        this.statusCode = statusCode;
        this.message = "Not Authorized";
    }
}

module.exports = AuthorizationException;