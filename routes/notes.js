const notes = require("express").Router(); // Define your route handlers
const { readFromFile, readAndAppend, writeToFile } = require("../helper/fsUtils");
const uuid = require("../helper/uuid");


notes.get("/", (req, res) => {
	readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.delete("/:id", (req, res) => {
    const notesID = req.params.id;
    readFromFile("./db/db.json")
        .then((data) => {
            let notes = JSON.parse(data);
            const indexToRemove = notes.findIndex((note) => note.id === notesID);

            if (indexToRemove !== -1) {
                const removedNote = notes.splice(indexToRemove, 1)[0];
                writeToFile("./db/db.json", notes);
                res.json(removedNote);
            } else {
                res.status(404).json({ error: "Note not found" });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Internal Server Error");
        });
});

notes.post("/", (req, res) => {
	console.info(`${req.method} request received to add a note`);
	console.log(req.body);

	const { title, text } = req.body;

	if (req.body) {
		const newNote = {
			title,
			text,
			id: uuid(),
		};

		readAndAppend(newNote, `./db/db.json`);
		res.json(`Note added successfully`);
	} else {
		res.error("notes - Error in adding note");
	}
});

module.exports = notes;
