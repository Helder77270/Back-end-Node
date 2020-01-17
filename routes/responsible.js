const express = require('express');
const { pool } = require('../config/db');

const router = express.Router();

router.get('/', (request, response) =>{
    pool.query('SELECT * FROM responsible', (error, result) =>{
        if(error){
            throw new Error('error request');
        } else{
            response.status(200).json(result.rows);
        }
    });
});

//Post data
router.post('/insert', (request, response) =>{
    const {firstname, lastname, mail, pwd, fk_customer_id} = request.body;

    pool.query('INSERT INTO responsible (firstname, lastname, mail, pwd, fk_customer_id) VALUES ($1, $2, $3, $4, $5)', [firstname, lastname, mail, pwd, fk_customer_id], error =>{
        if(error){
            response.status(400).json({status: 'error', message: 'Remplir tous les champs'});
        } else{
            response.status(201).json({status:'success', message:'Respondible ajouté'});
        }
    });
});

//Delete data by ID
router.delete('/delete/:id', (request, response) => {
    const id = parseInt(request.params.id);
    console.info('toto');

    pool.query('DELETE FROM responsible WHERE responsible_id = $1', [id], error => {
        if(error){
            response.status(400).json({status:'error', message:'No'});
        } else {
            response.status(201).json({status:'sucess', message:'Respondible supprimé'});
        }
    });
});

//Edit data by ID
router.put('/edit/:id', (request, response) => {
    const id = parseInt(request.params.id);

    const {firstname, lastname, mail, pwd, fk_customer_id} = request.body;

    pool.query('UPDATE responsible SET firstname = $1, lastname = $2, mail = $3, pwd = $4, fk_customer_id = $5', [firstname, lastname, mail, pwd, fk_customer_id], error => {
        if(error){
            response.status(400).json({status:'error', message:'No'});
        } else {
            response.status(201).json({status:'sucess', message:'Respondible édité'});
        }
    });
});

module.exports = router;
