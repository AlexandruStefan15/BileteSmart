export function formatRomanianDate(dateStr, showYear = false) {
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
	const year = date.getFullYear();

	if (showYear) {
		return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
	}

	return `${dayOfWeek} ${dayOfMonth} ${month}`;
}

export function formatDate(dateString, variant) {
	const date = new Date(dateString);
	let formattedDate = "";

	if (variant === "numeric") {
		formattedDate = date.toLocaleDateString("ro-RO", {
			day: "numeric",
			month: "numeric",
			year: "numeric",
		});
	} else if (variant === "short") {
		formattedDate = date
			.toLocaleDateString("ro-RO", {
				day: "numeric",
				month: "short",
				year: "numeric",
			})
			.replace(/\./g, "");
	} else {
		formattedDate = date.toLocaleDateString("ro-RO", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	}

	return formattedDate.toUpperCase();
}

export function removeFirstWord(str) {
	const words = str.trim().split(" ");
	words.shift(); // remove the first word
	return words.join(" ");
}
