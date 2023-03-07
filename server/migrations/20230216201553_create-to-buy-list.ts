import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('to_buy_lists', (table)=> {
        table.increments();
		table.string('item_name').notNullable();
        table.integer('quantity').defaultTo(1);
        table.string('remarks');
        table.string('state').defaultTo('pending')
        table.integer('handler').unsigned();
        table.foreign('handler').references('users.id')
        table.timestamps(false, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('to_buy_lists');
}

