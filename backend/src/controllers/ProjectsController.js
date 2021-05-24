const knex = require('../database');

module.exports = {
    async index(request, response) {
        const results = await knex('projects')
        .where('projectDeleted', false);


        for (let i = 0; i < results.length; i++) {

            const [activities_biggest_date] = await knex('activities').where('activityProjectId', results[i].projectId).orderBy('activityEndDate', 'desc');


            const [activities_finished] = await knex('activities').where('activityProjectId', results[i].projectId).where('activityFinished', true).count();
            const {count: finished} = activities_finished;

            const [activities_total] = await knex('activities').where('activityProjectId', results[i].projectId).count();
            let {count: total} = activities_total;

            if(total == 0) {
                total = 1;
            }

            const percentage = Math.floor((finished / total) * 100);
            results[i].percentage = percentage;
            if(activities_biggest_date) {
                results[i].latestActivity = activities_biggest_date;
            } else {
                results[i].latestActivity = {};
            }

        }

        return response.json(results);
    },
    async create(request, response, next) {  
        try {
            const {projectName, projectStartDate, projectEndDate } = request.body;
    
            await knex('projects').insert({
                projectName,
                projectStartDate,
                projectEndDate
            });  
            return response.status(201).send();
        } catch (error) {
            next(error);
        }
    },
    async update(request, response, next) {
        try {
            const { projectName, projectStartDate, projectEndDate } = request.body;
            const { id } = request.params;

            await knex('projects')
            .update({ projectName, projectStartDate, projectEndDate })
            .where({ projectId: id });

            return response.send();
        } catch (error) {
            next(error);
        }
    },
    async delete(request, response, next) {
        try {
            const { id } = request.params;
            
            await knex('projects')
            .where({ projectId: id })
            .update('projectDeleted', true);

            return response.send();
        } catch (error) {
            next(error);
        }
    }
};