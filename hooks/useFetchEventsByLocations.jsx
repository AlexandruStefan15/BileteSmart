import { useState, useCallback } from "react";

const API_BASE = "https://biletesmart.ro/api/stadium/getEvents";

export const useFetchEventsByLocations = () => {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchEvents = useCallback(async (locationIds = []) => {
		if (!Array.isArray(locationIds) || locationIds.length === 0) return;

		try {
			setLoading(true);
			setError(null);

			const results = await Promise.all(
				locationIds.map(async (id) => {
					const res = await fetch(`${API_BASE}/${id}`);
					if (!res.ok) throw new Error(`Failed for ${id}: ${res.status}`);
					const data = await res.json();
					return data.events || [];
				}),
			);

			// Flatten the results into a single array
			const mergedEvents = results.flat();

			mergedEvents.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

			setEvents(mergedEvents);
		} catch (err) {
			console.error("Error fetching events:", err);
			setError(err);
		} finally {
			setLoading(false);
		}
	}, []);

	return { events, loading, error, fetchEvents };
};
