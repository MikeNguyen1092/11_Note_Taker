const express = require("express");
const path = require('path');


const api = require('./routes/index');

const app = express();

const PORT = 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static("public"));

app.use('/api', api);

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

app.listen(PORT, () => console.log(`Serving static asset routes on port ${PORT}!`));



