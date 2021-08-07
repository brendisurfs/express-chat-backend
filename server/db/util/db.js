import { Sequelize } from "sequelize";

const connection = new Sequelize("db", "user", "pass", {
    host: "localhost",
    dialect: "sqlite",
    storage: "db.sqlite",
});

export default connection;
