const fs = require("fs");
const { JSDOM } = require("jsdom");

// Function to parse SVG and generate JSON
function extractPathsFromSVG(svgString) {
	const dom = new JSDOM(svgString);
	const paths = dom.window.document.querySelectorAll("path");

	const seatsArray = Array.from(paths).map((path, index) => ({
		id_seat: (40857 + index).toString(),
		id_room: 4,
		path_d: path.getAttribute("d"),
		price: 25,
		row_no: "0",
		col_no: "0",
		seat_no: (index + 1).toString(),
		room_name: "A4",
		is_valid: "1",
		is_booking_blocked: "0",
		is_for_child: "0",
		is_premium: "0",
		busy: 0,
		base_price: 25,
	}));

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
