const express = require('express');
const { pool } = require('../config/db');

const router = express.Router();

router.get('/', (request, response) =>{
    pool.query('SELECT * FROM transactions', (error, result) =>{
        if(error){
            throw new Error('error request');
        } else{
            response.status(200).json(result.rows);
        }
    });
});

//Post data
router.post('/insert', (request, response) =>{
    const {fk_sender, fk_receiver} = request.body;

    pool.query('INSERT INTO transactions (fk_sender, fk_receiver) VALUES ($1, $2)', [fk_sender, fk_receiver], error =>{
        if(error){
            response.status(400).json({status: 'error', message: 'Remplir tous les champs'});
        } else{
            response.status(201).json({status:'success', message:'Transaction ajouté'});
        }
    });
});

//Delete data by ID
router.delete('/delete/:id', (request, response) => {
    const id = parseInt(request.params.id);
    console.info('toto');

    pool.query('DELETE FROM transactions WHERE transaction_id = $1', [id], error => {
        if(error){
            response.status(400).json({status:'error', message:'No'});
        } else {
            response.status(201).json({status:'sucess', message:'Transaction supprimé'});
        }
    });
});

//Edit data by ID
router.put('/edit/:id', (request, response) => {
    const id = parseInt(request.params.id);

    const {fk_sender, fk_receiver, date_transaction} = request.body;

    pool.query('UPDATE transactions SET fk_sender = $1, fk_receiver = $2, date_transaction = $3', [fk_sender, fk_receiver, date_transaction], error => {
        if(error){
            response.status(400).json({status:'error', message:'No'});
        } else {
            response.status(201).json({status:'sucess', message:'Transaction édité'});
        }
    });
});

module.exports = router;
