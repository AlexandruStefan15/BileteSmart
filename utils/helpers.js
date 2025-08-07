export function formatRomanianDate(dateStr) {
	const date = new Date(dateStr);

	const days = ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"];

	const months = [
		"ianuarie",
		"februarie",
		"martie",
		"aprilie",
		"mai",
		"iunie",
		"iulie",
		"august",
		"septembrie",
		"octombrie",
		"noiembrie",
		"decembrie",
	];

	const dayOfWeek = days[date.getDay()];
	const dayOfMonth = date.getDate();
	const month = months[date.getMonth()];

	return `${dayOfWeek} ${dayOfMonth} ${month}`;
}

export function formatDate(dateString, variant = "") {
	const date = new Date(dateString);

	if (variant === "short")
		return date.toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" });

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
