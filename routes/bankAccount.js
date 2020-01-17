const express = require('express');
const { pool } = require('../config/db');

const router = express.Router();

router.get('/', (request, response) =>{
    pool.query('SELECT * FROM bankaccount', (error, result) =>{
        if(error){
            throw new Error('error request');
        } else{
            response.status(200).json(result.rows);
        }
    });
});

//Post data
router.post('/insert', (request, response) =>{
    const {card_number, validity_date, cryptogram, fk_customer_id, amount, autorizedoverdraft,alert} = request.body;

    pool.query('INSERT INTO bankaccount (card_number, validity_date, cryptogram, fk_customer_id, amount, autorizedoverdraft,alert) VALUES ($1, $2, $3, $4 , $5 , $6 , $7)', [card_number, validity_date, cryptogram, fk_customer_id, amount, autorizedoverdraft,alert], error =>{
        if(error){
            response.status(400).json({status: 'error', message: 'Remplir tous les champs'});
        } else{
            response.status(201).json({status:'success', message:'Bank account ajouté'});
        }
    });
});

//Delete data by ID
router.delete('/delete/:id', (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM bankaccount WHERE account_id = $1', [id], error => {
        if(error){
            response.status(400).json({status:'error', message:'No'});
        } else {
            response.status(201).json({status:'sucess', message:'bankaccount supprimé'});
        }
    });
});

// //Edit data by ID
router.put('/edit/:id', (request, response) => {
    const id = parseInt(request.params.id);

    const {card_number, validity_date, cryptogram, fk_customer_id, amount, autorizedoverdraft,alert} = request.body;

    pool.query('UPDATE bankaccount SET card_number = $1, validity_date = $2, cryptogram = $3, fk_customer_id = $4, amount = $5, autorizedoverdraft = $6, alert = $7', [card_number, validity_date, cryptogram, fk_customer_id, amount, autorizedoverdraft,alert], error => {
        if(error){
            response.status(400).json({status:'error', message:'No'});
        } else {
            response.status(201).json({status:'sucess', message:'bankaccount édité'});
        }
    });
});

module.exports = router;
