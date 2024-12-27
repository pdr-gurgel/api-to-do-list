require('dotenv').config({ path: '../.env' });
const fastify = require('fastify')({ logger: true });
const database = require('../database/database.js');
const tasksRoutes = require('./tasks.js');

fastify.register(tasksRoutes);

// Mensagem de Teste
fastify.get('/', async (request, reply) => {
  return { message: 'Seja bem-vindo ao gerenciador de Tarefas!' };
});

// Inicializando o servidor
const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
