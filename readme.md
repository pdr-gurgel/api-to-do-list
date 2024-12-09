# API TO-DO-LIST -> CRUD
Uma API RESTful desenvolvida em Node.js usando o framework Fastify, para gerenciar tarefas (To-Do List) com persistência de dados em um banco de dados MySQL.

### Descrição
A API é baseada em um gerenciador de tarefas, que permite criar, listar, atualizar e excluir tarefas. Cada tarefa é baseada nos seguintes atributos:
- `id:` Identificador da Tarefa
- `title:` Título da Tarefa(Obrigatório)
- `description:` Descrição da Tarefa(Opcional)
- `completed:` Status de Conclusão(True ou False)

<hr>

### Endpoints da API
#### 1. Criar nova Tarefa
- Rota: `POST /tasks`
- Corpo JSON:
```
{
  "title": "Título da tarefa",
  "description": "Descrição opcional"
}
```

#### 2. Listar Tarefas
- Rota: `GET /tasks`
- Query Params(Opcional):
```
/tasks?status=true -> Retorna apenas tarefas concluídas
/tasks?status=false -> Retorna apenas tarefas não concluídas
```

#### 3. Atualizar uma tarefa
- Rota: `PUT /tasks/id` (ID da tarefa atualizada)
- Corpo JSON:
```
{
  "title": "Novo título",
  "description": "Nova descrição",
  "completed": true (ou false)
}
```

#### 4. Deletar uma tarefa
- Rota: `DELETE /tasks/id` (ID da tarefa deletada)


<hr>

### Tecnologias Utilizadas
- **Node.JS** - Utilizado para Construção da API
- **Fastify** - Framework usada
- **MySQL** - Banco de dados relacional
### Dependências Utilizadas
- **Fastify 5.1.0** - Framework de construção de APIs
- **MySQL2 3.11.5** - Driver de conexão com banco de dados MySQL 
<br>
*Mais informações no arquivo package.json*

<hr>

### Requisitos de Instalação
- **Node.JS** - Recomendado versão mais recente
- **MySQL** - Para fazer o banco de Dados
- **Postman** - Recomendação pessoal para fazer teste dos Endpoints e da API

<hr>

### Como configurar o Banco de Dados

#### 1. Crie o Banco de Dados
```
CREATE DATABASE to_do_list;
USE to_do_list;
```

#### 2. Crie a Tabela 
```
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT 0
);
```

#### 3. Verifique se a tabela foi devidamente criada
```
DESCRIBE tasks;
```