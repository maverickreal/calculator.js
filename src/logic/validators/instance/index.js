const Operators = require('../../utility/constants/operators/index.js');

class InstanceValidator{
    static #logger = (err, res) => {
        console.log('Error in instance valdator: ', err);
        res.status(400).send(err);
    }
    static validate = (req, res, next)=>{
        try{
            let { operator, num1, num2 } = req.query;

            operator = Operators[operator.toUpperCase()];
            num1 = parseInt(num1);
            num2 = parseInt(num2);
            if (!operator || isNaN(num1) || isNaN(num2)) {
                return res.status(400).send('Invalid operation');
            }
            if(operator === Operators.DIVIDE && num2 === 0){
                return res.status(400).send('Cannot divide by zero');
            }
            req.query.operator = operator.toLowerCase();
            next();
        } catch(error){
            this.#logger(error, res);
        }
    }
}

module.exports = InstanceValidator;