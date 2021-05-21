const express = require('express');
const routes = express.Router();

const ProjectController = require('./controllers/ProjectsController')
const ActivityController = require('./controllers/ActivitiesController')

routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectController.create);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.delete);

routes.get('/activities', ActivityController.index);
routes.post('/activities', ActivityController.create);
routes.put('/activities/:id', ActivityController.update);

module.exports = routes;