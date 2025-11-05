import { create } from "zustand";

export const useSelectedSeatsStore = create((set) => ({
	selectedSeats: [],

	toggleSeat: (seat) =>
		set((state) => {
			const exists = state.selectedSeats.find((s) => s.id_seat === seat.id_seat);
			const newSelection = exists
				? state.selectedSeats.filter((s) => s.id_seat !== seat.id_seat)
				: [...state.selectedSeats, seat];

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

				return { ...seat, is_discounted, price };
			}),
		})),
}));
