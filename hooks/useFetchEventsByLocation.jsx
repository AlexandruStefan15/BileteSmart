import { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

const API_BASE = "https://biletesmart.ro/api/stadium/getEvents";

export const useFetchEventsByLocation = (locationId) => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigation = useNavigation();

	const fetchEvents = useCallback(
		async (id = locationId) => {
			if (!id) return;

			try {
				setLoading(true);
				setError(null);

				const response = await fetch(`${API_BASE}/${id}`);
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
		},
		[locationId]
	);

	useEffect(() => {
		fetchEvents();
	}, [fetchEvents, navigation]);

	return { events, loading, error, fetchEvents };
};
