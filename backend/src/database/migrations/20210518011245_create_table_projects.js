exports.up = function(knex) {
    return knex.schema.createTable('projects', function(table) {
        table.increments('projectId');
        table.text('projectName').notNullable();
        table.date('projectStartDate');
        table.date('projectEndDate');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects');
};
