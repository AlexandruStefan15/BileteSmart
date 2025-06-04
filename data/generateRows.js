const fs = require("fs");
const { JSDOM } = require("jsdom");

// Function to parse SVG and generate JSON
function extractPathsFromSVG(svgString) {
	const dom = new JSDOM(svgString);
	const paths = dom.window.document.querySelectorAll("path");

	const seatsArray = Array.from(paths).map((path, index) => path.getAttribute("d"));

	return JSON.stringify(seatsArray, null, 2);
}

// Read SVG file and create JSON file
fs.readFile("input.svg", "utf8", (err, data) => {
	if (err) {
		console.error("Error reading SVG file:", err);
		return;
	}

	const jsonContent = extractPathsFromSVG(data);

	fs.writeFile("output.json", jsonContent, "utf8", (err) => {
		if (err) {
			console.error("Error writing JSON file:", err);
		} else {
			console.log("JSON file successfully created: output.json");
		}
	});
});
