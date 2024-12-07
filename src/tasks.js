const database = require('../database/database.js');

// CRIAR TAREFA NOVA
function createTask(request, reply) {
  const { title, description } = request.body;

  if (!title) {
    return reply.status(400).send({ error: 'O título é obrigatório!' });
  } else {

  const query = 'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)';
  const values = [title, description || '', 0];

  database.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao salvar a tarefa:', err);
      reply.status(201).send({ error: 'Erro ao salvar a tarefa.' })
    } else {

    const taskCreated = {
      id: result.insertId,
      title: title,
      description: description || 'Sem descrição',
      completed: false,
    };

    console.log('Tarefa criada com sucesso:', taskCreated);

    return reply.status(201). send({
      message: 'Tarefa criada com sucesso!',
      task: taskCreated,
       });
     }
    });
   }
}

// Listar todas as tarefas
function listTasks(request, reply) {
  const { status } = request.query;
  let query = 'SELECT * FROM tasks';
  let values = [];

  if (status) {
    query += ' WHERE completed = ?';
    values.push(status === 'true' ? 1 : 0);
  }

  database.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao buscar tarefas:', err);
      return reply.status(500).send({ error: 'Erro ao buscar as tarefas.' });
    } else {

      // Converte o 0 e 1 para False e True
    const resultAtt = result.map(task => ({
        ...task,
        completed: !!task.completed, 
      }))

    console.log('Tarefas encontradas:', resultAtt);
    reply.status(200).send(resultAtt);
  }
  });
}

// Atualizar uma tarefa
function updateTask(request, reply) {
  const { id } = request.params;
  const { title, description, completed } = request.body;

  if (!title) {
    return reply.status(400).send({ error: 'O título é obrigatório!' });
  }

  const query = 'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?';
  const values = [title, description || '', completed ? 1 : 0, id];

  database.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao atualizar a tarefa:', err);
      return reply.status(500).send({ error: 'Erro ao atualizar a tarefa!' });
    } else if (result.affectedRows === 0) {
      return reply.status(404).send({ error: 'Tarefa não encontrada!' });
    } else {
    const updatedTask = {
      id,
      title,
      description: description || 'Sem descrição',
      completed: completed ? true : false,
    };

    console.log('Tarefa atualizada com sucesso:', updatedTask);

    reply.status(200).send({
      message: 'Tarefa atualizada com sucesso!',
      task: updatedTask,
    });
  }
  });
}

// Excluir uma tarefa
function deleteTask(request, reply) {
  const { id } = request.params;

  const query = 'DELETE FROM tasks WHERE id = ?';
  const values = [id];

  database.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao excluir a tarefa:', err);
      return reply.status(500).send({ error: 'Erro ao excluir a tarefa!' });
    } else if (result.affectedRows === 0) {
      return reply.status(404).send({ error: 'Tarefa não encontrada!' });
    } else {
    console.log('Tarefa excluída com sucesso! ID:', id);

    reply.status(200).send({ message: 'Tarefa excluída com sucesso!' });
    }
  }); 
}

// Registra as rotas no Fastify
async function taskRoutes(fastify) {
  fastify.post('/tasks', createTask);
  fastify.get('/tasks', listTasks);
  fastify.put('/tasks/:id', updateTask);
  fastify.delete('/tasks/:id', deleteTask);
}

module.exports = taskRoutes;
