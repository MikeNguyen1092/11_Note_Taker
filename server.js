//====== Imports ======//
const express = require("express");
const path = require('path');
const api = require('./routes/index');


const app = express();

//== dynamic port for Heroku ===//
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve up static assets from the public folder
app.use(express.static("public"));

// Go to index.js in routes folder when see /api
app.use('/api', api);

// Go to notes.html
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

app.listen(PORT, () => console.log(`Serving static asset routes on port ${PORT}!`));



