import { useEffect, useState } from "react";

const API_URL = "https://biletesmart.ro/api/stadium/getLocations";

export const useFetchLocations = () => {
	const [locations, setLocations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchLocations = async () => {
			try {
				const response = await fetch(API_URL);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				setLocations(data.locations);
			} catch (err) {
				console.error("Failed to fetch locations:", err);
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchLocations();
	}, []);

	return { locations, loading, error };
};
