const express = require('express');
const { response } = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();
app.use(express.json());

const projects = [];

//Middleware: logRequest
function logRequest(request, response, next) {
  const {method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;  
  
  console.time(logLabel);
  
  next(); // Próximo middleware

  console.timeEnd(logLabel);

}

//Middleware: validaProjectId
function validaProjectId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid project ID.' });
  }

  return next();
}

// a chamada do middleware só deve acontecer nesse ponto, se for preciso executar em todas as rotas
app.use(logRequest);
app.use('/projects/:id', validaProjectId);

app.get('/projects', (request, response) => {

  const { title } = request.query;

  const results = title 
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {

  const { title, owner } = request.body;

  const project = { id:uuid(), title, owner };
  
  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {

  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found!' });
  }

  const projetc = {
    id,
    title,
    owner
  }

  projects[projectIndex] = projetc;
    
  return response.json(projetc);
});

app.delete('/projects/:id', (request, response) => {

  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found!' });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
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