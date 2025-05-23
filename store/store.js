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
			selectedSeats: state.selectedSeats.map((seat) =>
				seat.id_seat === id_seat ? { ...seat, is_for_child: type === "child" ? "1" : "0" } : seat
			),
		})),
}));
