module.exports = {
    database: {
        connection: {
            host: process.env.DB_HOSTNAME || "localhost",
            database: "assignment_test",
            user: "root",
            password: "rootroot",
        },
    },
};
