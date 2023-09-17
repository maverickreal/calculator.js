const Handler = require('../../logic/handler/index.js'),
    { Router } = require('express'),
    OperationsValidator = require('../../logic/validators/operation/index.js'),
    InstanceValidator = require('../../logic/validators/instance/index.js');

class Controller {
    static #router = Router();
    static getRouter() {
        this.#router.post('/init', InstanceValidator.validate, Handler.init, Handler.operation);
        this.#router.post('/operation', OperationsValidator.validate, Handler.operation);
        this.#router.put('/undo', Handler.undo);
        this.#router.get('/reset', Handler.reset);

        return this.#router;
    }
}

module.exports = Controller;