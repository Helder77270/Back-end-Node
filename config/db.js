//initialiser connexion et retourner erreur s'il y en
const { Pool } = require('pg');

const pool = new Pool({
    host : 'localhost',
    port : 5432,
    user : 'postgres',
    database : 'bank',
    password : '37564'
});

pool.connect(error => {
    if(error){
        console.log('Error DB : ', error.stack);
    }
    console.log('Database : OK')
});

module.exports = { pool };
