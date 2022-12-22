class AuthenticationException extends Error {
    constructor(statusCode) {
        super("Unauthenticated")
        this.statusCode = statusCode;
        this.message = "Unauthenticated";
    }
}

module.exports = AuthenticationException;