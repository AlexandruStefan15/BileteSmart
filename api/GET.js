export const fetchLocations = async () => {
	try {
		const response = await fetch("https://biletesmart.ro/api/stadium/getLocations");
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data.results;
	} catch (err) {
		console.error(err);
		throw err;
	}
};
