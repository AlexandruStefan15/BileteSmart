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

			// Fetch all in parallel
			const results = await Promise.all(
				locationIds.map(async (id) => {
					const res = await fetch(`${API_BASE}/${id}`);
					if (!res.ok) throw new Error(`Failed for ${id}: ${res.status}`);
					const data = await res.json();
					return data.events || [];
				})
			);

			// Flatten the results into a single array
			const mergedEvents = results.flat();

			// Sort by date
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

// USAGE EXAMPLE:

/* const EventsScreen = ({ locations, navigation }) => {
  const { events, loading, error, fetchEvents } = useFetchEventsByLocations();

  useEffect(() => {
    const locationIds = locations.map((loc) => loc.id);
    fetchEvents(locationIds); // fetch all at once
  }, [locations]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading events</Text>;

  return (
    <FlatList
      data={events}
      keyExtractor={(item) => item.id_event.toString()}
      renderItem={({ item }) => (
        <EventCard
          variant="2"
          eventData={item}
          onPress={() =>
            navigation.navigate("EventDetailsStack", {
              screen: "EventDetailsScreen",
              params: {
                locationId: item.id_location,
                event: item,
                currentLocation: locations.find(
                  (loc) => loc.id === item.id_location
                ),
              },
            })
          }
        />
      )}
    />
  );
}; */
