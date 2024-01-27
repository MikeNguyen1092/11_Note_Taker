const notes = require("express").Router(); // Define your route handlers
const { readFromFile, readAndAppend } = require("../helper/fsUtils");
const uuid = require('../helpers/uuid');


notes.get("/", (req, res) => {
	readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
	// Logic for handling GET request to /notes
	res.send("This is the /notes route");
});

notes.post("/", (req, res) => {
	console.info(`${req.method} request received to add a tip`);
	console.log(req.body);

	const { title, text } = req.body;

	if (req.body) {
		const newNote = {
			title,
			text,
			note_id: uuid(),
		};

		readAndAppend(newNote, "./db/notes.json");
		res.json(`Note added successfully`);
	} else {
		res.error("Error in adding note");
	}
});

// Additional route handlers for /notes

module.exports = notes;
