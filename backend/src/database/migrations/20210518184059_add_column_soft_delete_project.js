exports.up = function(knex) {
    return knex.schema.alterTable('projects', function(table) {
        table.boolean('projectDeleted').defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('projects', function(table) {
        table.dropColumn('projectDeleted');
    });
};
