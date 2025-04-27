import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const API_BASE = "https://biletesmart.ro/api/stadium/getEvents";

export const useFetchEvents = (locationId) => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigation = useNavigation();

	useEffect(() => {
		if (!locationId) return;

		const fetchEvents = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await fetch(`${API_BASE}/${locationId}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setEvents(data.events || []);
			} catch (err) {
				console.error("Failed to fetch events:", err);
				setError(err);
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, [locationId, navigation]);

	return { events, loading, error };
};
