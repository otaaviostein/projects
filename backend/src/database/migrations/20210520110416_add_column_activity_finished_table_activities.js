exports.up = function(knex) {
    return knex.schema.alterTable('activities', function(table) {
        table.boolean('activityFinished').defaultTo(false);
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('activities', function(table) {
        table.dropColumn('activityFinished');
    });
};
