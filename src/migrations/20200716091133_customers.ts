import * as Knex from 'knex';

const tableNane: string = 'customers';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableNane, function (table) {
        table.increments('id').primary();
        table.string('name');
        table.string('postcode');
        table.string('contractEndDate');
        table.string('contractTier');
        table.dateTime('created_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableNane);
}
