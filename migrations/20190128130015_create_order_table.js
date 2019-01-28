const TABLE_NAME = "orders";

exports.up = knex =>
    knex.schema.createTable(TABLE_NAME, table => {
        table
            .increments("id")
            .unsigned()
            .primary();
        table.integer("distance", 36).unsigned();
        table.string("origin", 255).notNull();
        table.text("destination", 255).nullable();
        table
            .enu("status", ["UNASSIGNED", "TAKEN"])
            .notNullable()
            .default("UNASSIGNED");
        table.dateTime("createdAt").notNull();
        table.dateTime("updatedAt").nullable();
    });

exports.down = knex => knex.schema.dropTable(TABLE_NAME);
