export function formatDateToRomanian(dateString) {
	const date = new Date(dateString);

	return date.toLocaleDateString("ro-RO", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	// console.log(formatDateToRomanian("2025-04-26"));
	// Output: "26 aprilie 2025"
}

export function removeFirstWord(str) {
	const words = str.trim().split(" ");
	words.shift(); // remove the first word
	return words.join(" ");
}
