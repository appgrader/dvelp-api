import * as Knex from 'knex';

const tableNane: string = 'devices';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableNane, function (table) {
        table.increments('id').primary();
        table.string('name');
        table.string('device_type').nullable();
        table.string('device_tier');
        table.boolean('is_active');
        table.dateTime('created_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at').defaultTo(knex.fn.now());

        table.index(['device_tier']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableNane);
}
