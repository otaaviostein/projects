exports.up = function(knex) {
    return knex.schema.createTable('activities', function(table) {
        table.increments('activityId');
        table.integer('activityProjectId').unsigned().references('projectId').inTable('projects').onDelete('CASCADE');
        table.text('activityName').notNullable();
        table.date('activityStartDate');
        table.date('activityEndDate');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('activities');
};
