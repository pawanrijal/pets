class alreadyExistsException extends Error {
    constructor(source) {
        super(`${source} already exists`);
        this.status = 409;
        this.message = `${source} already exists`;
    }
}

module.exports = { alreadyExistsException };