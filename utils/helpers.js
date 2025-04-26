export function formatDateToRomanian(dateString) {
	const date = new Date(dateString);

	return date.toLocaleDateString("ro-RO", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}
/* console.log(formatDateToRomanian("2025-04-26")); */
// Output: "26 aprilie 2025"
