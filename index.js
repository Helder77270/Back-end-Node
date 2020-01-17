const express = require('express');
const { pool } = require('./config/db');
const customerRouter = require('./routes/customer');
const transactionRouter = require('./routes/transaction');
const responsibleRouter = require('./routes/responsible');
const bankAccountsRouter = require('./routes/bankaccount');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/customers', customerRouter);
app.use('/transactions', transactionRouter);
app.use('/responsibles', responsibleRouter);
app.use('/bankaccounts', bankAccountsRouter);

app.get('/', (request, response) => {
    response.send('Hello ESGI !');
});
app.listen(6565, () => {
    console.log('Listen on port 6565');
});
