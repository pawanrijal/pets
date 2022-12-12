class notFoundException extends Error {
    constructor(source) {
        super(`${source} not found`);
        this.status = 404;
        this.message = `${source} not found`;

    }
}

module.exports =  {notFoundException};