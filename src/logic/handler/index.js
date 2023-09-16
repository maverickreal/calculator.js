const { v4: uuid } = require('uuid'),
    Db = require('../../data/index.js'),
    Operators = require('../utility/constants/operators/index.js');

class Handler {
    static #logger = (err, res) => {
        console.log(err);
        res.status(500).send();
    }
    static init = async (req, res, next) => {
        try {
            const id = uuid();
            Db.build(id);
            res.status(200).send({ id });
            next();
        } catch (error) {
            this.#logger(error, res);
        }
    }
    static operation = async (req, res, next) => {
        try {
            const { operator, operand } = req.query,
                optr = Operators.operators[operator.toUpperCase()],
                opnd = Integer.parseInt(operand);
            if (!optr || isNaN(opnd)) {
                return res.status(400).send('Invalid operation');
            }
            const answer = await Db[optr](opnd);
            res.status(200).send({ answer });
            next();
        } catch (error) {
            this.#logger(error, res);
        }
    }
    static undo = async (req, res, next) => {
        try {
            Db.undo();
            res.status(200).send();
            next();
        } catch (error) {
            this.#logger(error, res);
        }
    }
    static reset = async (req, res, next) => {
        try {
            Db.reset();
            res.status(200).send();
            next();
        } catch (error) {
            this.#logger(error, res);
        }
    }
}
module.exports = Handler;