const notes = require("express").Router(); // Define your route handlers
const { readFromFile, readAndAppend } = require("../helper/fsUtils");
const uuid = require('../helper/uuid');


notes.get("/", (req, res) => {
	readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
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
