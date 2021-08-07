// WHAT I WANT TO DO: allow for the method to both write to the front end and write to the db.
// EXTRA: I want to hash the message ID becuase incrementing is boring, and hash the user message in the db.

import Message from "../Models/MessageModel.js";

let messages = [];
let messageID = 0;

// MESSAGE CREATE AND DESTORY MDOULE
const mc = {
    // should return the messages in the array.
    read: (req, res) => {
        Message.findAll()
            .then((message) => {
                res.status(200).send(message);
            })
            .catch((err) => {
                console.error(err);
            });
    },

    // create a message using the text and time off of the req.body.
    create: (req, res) => {
        // construct db stuff
        const text = req.body;
        Message.create(text)
            .then(() => {
                res.status(200).send("post created");
            })
            .catch((err) => {
                console.log(err);
            });
    },
    update: (req, res) => {
        const { text } = req.body;
        const updateID = req.params.id;

        // get the message from the messages array by using the message index
        let message = Message[updateID];

        // find the message index with the method findIndex
        const messageIDX = messages.findIndex(
            (message) => message.id == updateID
        );

        // remake the message, but add a new id.
        messages[messageIDX] = {
            id: message.id,
            text: text || message.text,
            time: message.time,
        };
        res.status(200).send(messages);
    },
    // delete the users message by finding the id.
    delete: (req, res) => {
        let deleteID = req.params.id;
        messageIDX = messages.findIndex((message) => message.id == deleteID);
        messages.splice(messageIDX, 1);
        res.status(200).send(messages);
    },
};

export default mc;
