//=========== Imports ===========//
const notes = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helper/fsUtils");
const uuid = require("../helper/uuid");

// Get from localhost:PORT/api/notes
notes.get("/", (req, res) => {
	readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// Delete a note when the id matches to delete on script.js in the public folder
notes.delete("/:id", (req, res) => {
	const notesID = req.params.id;
	readFromFile("./db/db.json")
		.then((data) => {
			let notes = JSON.parse(data);

			// findIndex() returns -1 when nothing matches is found
			const indexToRemove = notes.findIndex((note) => note.id === notesID);

			// if not -1, then it found something
			if (indexToRemove !== -1) {
				const removedNote = notes.splice(indexToRemove, 1)[0];
				writeToFile("./db/db.json", notes);
				res.json(removedNote);
			}
		})
		.catch((error) => {
			console.error(error);
		});
});

notes.post("/", (req, res) => {
	console.info(`${req.method} request received to add a note`);

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

//====== Export =====//
module.exports = notes;
