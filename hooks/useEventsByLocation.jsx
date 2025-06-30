// hooks/useEventsByLocation.js or .ts
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { eventsByLocation } from "@/data/events";
import { locations } from "@/data/locations";

export function useEventsByLocation() {
	const [eventsGrouped, setEventsGrouped] = useState({});

	/* 	const hasNoEvents = Object.values(eventsGrouped).every(
		(eventsArray) => Array.isArray(eventsArray) && eventsArray.length === 0
	); */

	useFocusEffect(
		useCallback(() => {
			const fetchEvents = async () => {
				try {
					const result = {};
					for (const location of locations) {
						const locationId = location.id;
						result[locationId] = eventsByLocation[locationId] || [];
					}
					setEventsGrouped(result);
				} catch (err) {
					console.error("Failed to fetch events:", err);
				}
			};

			fetchEvents();
		}, [])
	);

	return { eventsGrouped };
}
