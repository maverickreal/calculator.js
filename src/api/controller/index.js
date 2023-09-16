const Handler = require('../../logic/handler/index.js'),
    { Router } = require('express');

class Controller {
    static getRouter = () => {
        const router = Router();

        router.post('init', Handler.init);
        router.post('operation', Handler.operation);
        router.put('undo', Handler.undo);
        router.get('reset', Handler.reset);

        return router;
    }
}

module.exports = Controller;