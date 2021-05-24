const knex = require('../database');
const { create, update } = require('./ProjectsController');

module.exports = {
    async index(request, response, next) {
        try {
            const { id, page = 1 } = request.query;
            
            const query = knex('activities');

            const countObject = knex('activities').count();

            if( id ) {
                query
                .where({ activityProjectId: id })
                .join('projects', 'projects.projectId', '=', 'activities.activityProjectId')
                .select('activities.*', 'projects.projectName')
                .where('projects.projectDeleted', '=', false);
            }

            const [ count ] = await countObject;
            response.header('X-Total-Count', count["count"]);

            const results = await query;

            return response.json(results);
        } catch (error) {
            next(error);
        }

    },
    async create(request, response, next) {
        try {
            const { activityName, activityStartDate, activityEndDate, activityProjectId, activityFinished } = request.body;
            

            await knex('activities').insert({ 
                activityName, 
                activityStartDate:  new Date(activityStartDate).toJSON().slice(0, 10),
                activityEndDate: new Date(activityEndDate).toJSON().slice(0, 10), 
                activityProjectId,
                activityFinished
            });

            return response.send();
        } catch (error) {
            next(error);
        }
    },
    async update(request, response, next) {
        try {
            const { id } = request.params;
            await knex('activities')
            .update({ activityFinished: true })
            .where({ activityId: id });

            return response.send();
        } catch (error) {
            next(error);
        }
    }
};