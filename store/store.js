import { create } from "zustand";

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

				const is_discounted = type === "Redus" ? "1" : "0";
				const discounted_price = type === "Redus" ? seat.price * 0.8 : seat.price;

				return {
					...seat,
					is_discounted,
					price: discounted_price,
				};
			}),
		})),
}));
