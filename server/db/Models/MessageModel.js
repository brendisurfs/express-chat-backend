import connection from "../util/db.js";
import { Sequelize } from "sequelize";
// create a message model for our db to read into.
const Message = connection.define("Message", {
    message: {
        allowNull: false,
        type: Sequelize.JSON,
    },
});

export default Message;
