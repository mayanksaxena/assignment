module.exports = {
    cors: {
        origins: [],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    },
    database: {
        client: "mysql",
        connection: {
            host: process.env.DB_HOSTNAME || "localhost",
            database: process.env.DB_NAME || "assignment",
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
    googleMapKey:
        process.env.MAP_KEY || "AIzaSyBz_qEtbveatUdOjFgEBAqLWh2nvSrbe-4",
    googleMapApi: "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&"
};
