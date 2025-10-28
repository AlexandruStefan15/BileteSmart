import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSavedEventsStore = create(
	persist(
		(set, get) => ({
			savedEvents: [],

			// Toggle save/unsave
			toggleSaveEvent: (event) => {
				const exists = get().savedEvents.find((e) => e.id_event === event.id_event);
				const updated = exists
					? get().savedEvents.filter((e) => e.id_event !== event.id_event)
					: [...get().savedEvents, event];

				set({ savedEvents: updated });
			},

			// Remove a specific event
			removeEvent: (id_event) =>
				set((state) => ({
					savedEvents: state.savedEvents.filter((e) => e.id_event !== id_event),
				})),

			// Clear all
			clearSavedEvents: () => set({ savedEvents: [] }),

			//check if an event is saved
			isEventSaved: (id_event) => {
				return get().savedEvents.some((e) => e.id_event === id_event);
			},

			// Sync from backend after login
			loadFromBackend: async (userEmail) => {
				try {
					const res = await fetch(
						`https://biletesmart.ro/api/user/getSavedEvents?email=${userEmail}`
					);
					const data = await res.json();
					if (Array.isArray(data)) {
						set({ savedEvents: data });
					}
				} catch (err) {
					console.error("Failed to load saved events:", err);
				}
			},

			// Sync to backend when changes occur (optional)
			syncToBackend: async (userEmail) => {
				try {
					const { savedEvents } = get();
					await fetch(`https://biletesmart.ro/api/user/setSavedEvents`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email: userEmail, savedEvents }),
					});
				} catch (err) {
					console.error("Failed to sync saved events:", err);
				}
			},
		}),
		{
			name: "saved-events-storage", // key in AsyncStorage
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
