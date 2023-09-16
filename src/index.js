const express = require('express'),
    Controller = require('./api/controller/index.js'),
    cors = require('cors'),
    helmet = require('helmet'),
    Db = require('./data/index.js');

const app = express();

app.use(cors()); app.use(helmet());
app.use(express.json()); app.use(Controller.getRouter());
Db.init();

app.listen(process.env.PORT, () => console.log('Started the calculator service.'));