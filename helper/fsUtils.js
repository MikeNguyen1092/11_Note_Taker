//===== Imports ======//
const fs = require("fs");
const util = require("util");

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) => fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => (err ? console.error(err) : console.info(`\nData written to ${destination}`)));

const readAndAppend = (content, file) => {
	fs.readFile(file, "utf8", (err, data) => {
		if (err) {
			if(file) {
				writeToFile(file, [content])
			}
			
		} else {
			const parsedData = JSON.parse(data);
			parsedData.push(content);
			writeToFile(file, parsedData);
		}
	});
};

module.exports = { readFromFile, writeToFile, readAndAppend };
