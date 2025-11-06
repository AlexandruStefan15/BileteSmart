import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLikedLocationsStore = create(
	persist(
		(set, get) => ({
			likedLocations: [],

			// Toggle like/unlike
			toggleLikeLocation: (location) => {
				const exists = get().likedLocations.find((l) => l.id === location.id);
				const updated = exists
					? get().likedLocations.filter((l) => l.id !== location.id)
					: [...get().likedLocations, location];

				set({ likedLocations: updated });
			},

			// Remove a specific location
			removeLocation: (id_location) =>
				set((state) => ({
					likedLocations: state.likedLocations.filter((l) => l.id !== id_location),
				})),

			// Clear all liked locations
			clearLikedLocations: () => set({ likedLocations: [] }),

			// Check if a location is liked
			isLocationLiked: (id_location) => {
				return get().likedLocations.some((l) => l.id === id_location);
			},

			// Sync from backend after login
			loadFromBackend: async (userEmail) => {
				try {
					const res = await fetch(
						`https://biletesmart.ro/api/user/getLikedLocations?email=${userEmail}`
					);
					const data = await res.json();
					if (Array.isArray(data)) {
						set({ likedLocations: data });
					}
				} catch (err) {
					console.error("Failed to load liked locations:", err);
				}
			},

			// Sync to backend when changes occur (optional)
			syncToBackend: async (userEmail) => {
				try {
					const { likedLocations } = get();
					await fetch(`https://biletesmart.ro/api/user/setLikedLocations`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email: userEmail, likedLocations }),
					});
				} catch (err) {
					console.error("Failed to sync liked locations:", err);
				}
			},
		}),
		{
			name: "liked-locations-storage", // key in AsyncStorage
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
