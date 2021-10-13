class FunctionalErrorException {
    constructor(ex) {
        this.httpStatus = ex.httpStatus;
        this.message = ex.message;
    }
}

module.exports = FunctionalErrorException;