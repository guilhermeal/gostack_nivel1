const express = require('express');
const { response } = require('express');

const app = express();

app.use(express.json());

app.get('/projects', (request, response) => {

  const { title, owner } = request.paramas;

  console.log(title);
  console.log(owner);
  
  return response.json([
    'Projeto 1',
    'Projeto 2',
  ]);
});

app.post('/projects', (request, response) => {

  const {title, owner} = request.body;
  console.log(title);
  console.log(owner);

  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ]);
});

app.put('/projects/:id', (request, response) => {
  
  const params = request.params;
  console.log(params);
  
  return response.json([
    'Projeto 2',
    'Projeto 3',
    'Projeto 4',
  ]);
});

app.delete('/projects/:id', (request, response) => {

  const { id } = request.params;
  console.log(id);

  return response.json([
    'Projeto 3',
    'Projeto 4',
  ]);
});

app.get('/', (request, response) => {
  return response.json({
    "user": {
      "name": "Guilherme Almeida",
      "mail": "guiallan.al@gmail.com",
      "github": "@guilhermeal",
      "bio": "Hello World!",
    }
  })
});

app.listen(3333, () => {
  console.log('💡 Back-end started! 💡')
});