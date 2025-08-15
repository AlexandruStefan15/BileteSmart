// useAllEvents.js
import { useEffect, useState, useCallback, useRef } from "react";

const BASE = "https://biletesmart.ro/api/stadium";

async function fetchAllEvents(signal) {
	// 1) Get locations
	const locResp = await fetch(`${BASE}/getLocations`, { signal });
	if (!locResp.ok) throw new Error(`Locations request failed: ${locResp.status}`);
	const { locations } = await locResp.json();

	// 2) Fetch events for each location (in parallel)
	const perLocation = await Promise.all(
		locations.map(async (loc) => {
			const r = await fetch(`${BASE}/getEvents/${loc.id}`, { signal });
			if (!r.ok) {
				console.warn(`Events request failed for location ${loc.id}: ${r.status}`);
				return [];
			}
			const data = await r.json();
			const events = Array.isArray(data) ? data : (data && data.events) || [];

			// Attach location info (handy for grouping/filtering in UI)
			return events.map((ev) => ({
				...ev,
				location_id: loc.id,
				location_name: loc.name,
			}));
		})
	);

	// 3) Flatten to a single array
	return perLocation.flat();
}

export default function useFetchAllEvents() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const abortRef = useRef(null);

	const load = useCallback(async () => {
		// cancel any in-flight request
		if (abortRef.current) abortRef.current.abort();
		const ac = new AbortController();
		abortRef.current = ac;

		try {
			setLoading(true);
			setError(null);
			const all = await fetchAllEvents(ac.signal);
			setEvents(all);
		} catch (e) {
			if (e.name !== "AbortError") {
				setError(e.message || "Unknown error");
			}
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
		return () => abortRef.current && abortRef.current.abort();
	}, [load]);

	const refresh = useCallback(() => {
		load();
	}, [load]);

	return { events, loading, error, refresh };
}
