const Operators = require('../../utility/constants/operators/index.js');

class OperationValidator {
    static #logger = (err, res) => {
        console.log('Error in operation valdator: ', err);
        res.status(400).send(err);
    }
    static validate = (req, res, next) => {
        try {
            let { operator, operand } = req.query;

            operator = Operators[operator.toUpperCase()];
            operand = parseInt(operand);
            if (!operator || isNaN(operand)) {
                return res.status(400).send('Invalid operation');
            }
            if(operator === Operators.DIVIDE && operand === 0){
                return res.status(400).send('Cannot divide by zero');
            }
            req.query.operator = operator.toLowerCase();
            next();
        } catch (error) {
            this.#logger(error, res);
        }
    }
}

module.exports = OperationValidator;