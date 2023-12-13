const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let tasks = [];

tasks.push({
    id: '0',
    description: 'Task Zero',
    isCompleted: false,
    });

// Rota hello world
app.get('/', (req, res) => {
    // Acessando as variáveis de ambiente
    const username = process.env.USERNAME || 'Username não definido';
    const password = process.env.PASSWORD || 'Senha não definida';
    const databaseUrl = process.env.DATABASE_URL || 'URL do banco de dados não definida';
    const apiKey = process.env.API_KEY || 'Chave de API não definida';
  
    // Exibindo as informações (mesmo que sensíveis, apenas para teste)
    res.send(`Username: ${username}<br> Password: ${password}<br> Database URL: ${databaseUrl}<br> API Key: ${apiKey}`);
  });

// Rota para obter todas as tarefas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Rota para adicionar uma nova tarefa
app.post('/tasks', (req, res) => {
  const newTask = req.body;
    if (!newTask.description) {
        return res.status(400).json({ message: 'Task description is required' });
    }
    newTask.id = String(tasks.length + 1);
    newTask.isCompleted = false;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Rota para atualizar status de uma tarefa
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks[taskIndex].isCompleted = !tasks[taskIndex].isCompleted;
  res.json(tasks[taskIndex]);
});

// Rota para deletar uma tarefa
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks = tasks.filter((task) => task.id !== id);
  res.status(204).end();
});

// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
