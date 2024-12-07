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
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor rodando em: http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
