require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2');

// CONEXÃO COM MYSQLL
const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_NAME,
});

// Teste de conexão
database.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no banco de dados:', err.stack);
    return;
  } else {
  console.log('MySQL conectado com sucesso!');
  }
});

module.exports = database;
