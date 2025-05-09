import { create } from "zustand";

export const useSelectedSeats = create((set) => ({
	selectedSeats: new Set(),
	toggleSeats: (seatId) =>
		set((state) => {
			const newSelection = new Set(state.selectedSeats);
			if (newSelection.has(seatId)) {
				newSelection.delete(seatId);
			} else {
				newSelection.add(seatId);
			}
			return { selectedSeats: newSelection };
		}),
	resetSeats: () => set({ selectedSeats: new Set() }),
	/* setSeats: (seats) => set({ selectedSeats: new Set(seats) }), */
}));
