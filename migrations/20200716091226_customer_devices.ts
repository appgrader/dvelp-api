import * as Knex from 'knex';

const tableNane: string = 'customer_devices';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableNane, function (table) {
        table.unique(['customer_id', 'device_id']);

        table.integer('customer_id');
        table.integer('device_id');

        table.dateTime('created_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at').defaultTo(knex.fn.now());

        table.index(['customer_id', 'device_id']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableNane);
}
