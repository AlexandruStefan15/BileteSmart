const fs = require("fs");

const inputPath = "./roomsWithSeats.json";
const outputPath = "./roomsWithSeats.updated.json";

const data = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

for (const locationId in data) {
	const events = data[locationId];
	for (const eventId in events) {
		const event = events[eventId];
		event.rooms.forEach((room) => {
			if (Array.isArray(room.seats)) {
				room.seats = room.seats.map((seat) => ({
					...seat,
					base_price: seat.price,
				}));
			}
		});
	}
}

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
