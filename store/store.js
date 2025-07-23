import { create } from "zustand";
import { withTiming, makeMutable, Easing, ReduceMotion } from "react-native-reanimated";
import { Dimensions } from "react-native";

//selectedSeats Store

export const useSelectedSeats = create((set) => ({
	selectedSeats: [],

	toggleSeat: (seat) =>
		set((state) => {
			const exists = state.selectedSeats.find((s) => s.id_seat === seat.id_seat);
			let newSelection;

			if (exists) {
				// remove the seat
				newSelection = state.selectedSeats.filter((s) => s.id_seat !== seat.id_seat);
			} else {
				// add the seat
				newSelection = [...state.selectedSeats, seat];
			}

			return { selectedSeats: newSelection };
		}),

	removeSeat: (id) =>
		set((state) => ({
			selectedSeats: state.selectedSeats.filter((s) => s.id_seat !== id),
		})),

	resetSeats: () => set({ selectedSeats: [] }),

	updateSeatType: (id_seat, type) =>
		set((state) => ({
			selectedSeats: state.selectedSeats.map((seat) => {
				if (seat.id_seat !== id_seat) return seat;

				const basePrice = seat.base_price;
				const is_discounted = type === "Redus" ? "1" : "0";
				const price = type === "Redus" ? basePrice * 0.72 : basePrice;

				return {
					...seat,
					is_discounted,
					price,
				};
			}),
		})),
}));

// Drawer Store

export const useDrawerStore = create((set) => ({
	isDrawerOpen: false,
	openDrawer: () => set({ isDrawerOpen: true }),
	closeDrawer: () => set({ isDrawerOpen: false }),
	toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));

// CartSideBar Store

const SIDEBAR_WIDTH = Dimensions.get("window").width;

const sidebarX = makeMutable(-SIDEBAR_WIDTH);

export const useCartSidebarStore = create(() => ({
	sidebarX,
	openSidebar: () => {
		sidebarX.value = withTiming(0, {
			duration: 300,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			reduceMotion: ReduceMotion.System,
		});
	},
	closeSidebar: () => {
		sidebarX.value = withTiming(-SIDEBAR_WIDTH, {
			duration: 300,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			reduceMotion: ReduceMotion.System,
		});
	},
}));
