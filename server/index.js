import morgan from "morgan";
import express from "express";
import sequelize from "./db/util/db.js";
import mc from "./db/controllers/messages_controller.js";

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public/build"));

// routes
const API_EP = "/api/messages";

app.get(API_EP, mc.read);
// add message to the messages.
app.post(API_EP, mc.create);

// PUT: update the message with the id that is given.
app.put(`${API_EP}/:id`, mc.update);

// DELETE: deletes the message that the user put up.
app.delete(`${API_EP}/:id`, mc.delete);

// syncing sequelize db with our stuff
sequelize
    .sync({
        force: false,
    })
    .then((res) => {
        console.log("connected to the db");
    })
    .then(() => {
        console.log("updating tables");
    })
    .catch((err) => {
        console.error("something went wrong: " + err);
    });

app.listen(PORT, () => {
    console.log(`transport:${PORT} is away`);
});
