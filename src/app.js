const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');
const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body; //request body pega o que o usuário inseriu e executa de acordo com a rota.

    const repository = { id: uuid(), title, url, techs, likes:0 }; //inserindo os dados digitados dentro da variável repository.

    repositories.push(repository); //pegando a variável e jogando no vetor.

    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
 
  if (repositoryIndex < 0) {
      return response.status(400).json({ error: 'Repository Not Found.'})
  }

  const repository = {
  id,
  title,
  url,
  techs,
  likes: repositories[repositoryIndex].likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params; //request params busca alguma informação pesquisada em filtro.

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
 
  if (repositoryIndex < 0) {
      return response.status(400).json({ error: 'Repository Not Found.'})
  }
  else {
  repositories.splice(repositoryIndex, 1);
  }
  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const{id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  const repository = repositories.find(repository => repository.id === id);

  if(repositoryIndex <0){
    return response.status(400).json({error: 'Repository not found.'});
  }

  repositories[repositoryIndex].likes++;
 
    return response.json(repositories[repositoryIndex]);
});

module.exports = app;


//app.listen(3333, () => {
//console.log('👍 back-end started!');
//});