module.exports = {
    cors: {
        origins: [],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    },
    database: {
        client: "mysql",
        connection: {
            host: process.env.DB_HOSTNAME || "localhost",
            database: process.env.TEST_DB_NAME || "assignment_test",
            user: process.env.DB_USERNAME || "root",
            password: process.env.DB_PASSWORD || "rootroot",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    googleMapKey: process.env.MAP_KEY || "",
    googleMapApi:
		"https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial",
};
