const { v4: uuid } = require('uuid'),
    Db = require('../../data/index.js'),
    Operators = require('../utility/constants/operators/index.js');

class Handler {
    static #logger = (err, res) => {
        console.log('Error in handler: ', err);
        res.status(500).send();
    }
    static init = async (req, res, next) => {
        try {
            const id = uuid();
            await Db.build(id);
            switch (req.query.operator) {
                case Operators.ADD:
                    req.query.operand = parseInt(req.query.num2) + parseInt(req.query.num1);
                    break;
                case Operators.SUBTRACT:
                    req.query.operand = parseInt(req.query.num1) - parseInt(req.query.num2);
                    break;
                case Operators.MULTIPLY:
                    req.query.operand = parseInt(req.query.num2) * parseInt(req.query.num1);
                    break;
                case Operators.DIVIDE:
                    req.query.operand = parseInt(req.query.num1) / parseInt(req.query.num2);
                    break;
                case Operators.MODULO:
                    req.query.operand = parseInt(req.query.num1) % parseInt(req.query.num2);
                    break;
                case Operators.EXPONENT:
                    req.query.operand = parseInt(req.query.num1) ** parseInt(req.query.num2);
                    break;
            }
            req.query.operand = String(req.query.operand);
            req.query.id = id;
            req.query.operator = Operators.ADD;
            next();
        } catch (error) {
            this.#logger(error, res);
        }
    }
    static operation = async (req, res) => {
        try {
            const answer = await Db[req.query.operator](req.query.id, req.query.operand);
            res.status(200).send({ id: req.query.id, answer });
        } catch (error) {
            this.#logger(error, res);
        }
    }
    static undo = async (req, res) => {
        try {
            if (!req.query.id) {
                return res.status(400).send('No id supplied.');
            }
            const msg = await Db.undo(req.query.id);
            res.status(200).send(msg);
        } catch (error) {
            this.#logger(error, res);
        }
    }
    static reset = async (req, res) => {
        try {
            if (!req.query.id) {
                return res.status(400).send('No id supplied.');
            }
            Db.reset(req.query.id);
            res.status(200).send();
        } catch (error) {
            this.#logger(error, res);
        }
    }
}
module.exports = Handler;