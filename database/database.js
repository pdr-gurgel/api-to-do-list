const mysql = require('mysql2');

// CONEXÃO COM MYSQLL
const database = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '', 
  database: 'to_do_list'
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
