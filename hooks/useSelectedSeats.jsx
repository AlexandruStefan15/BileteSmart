import { useContext } from "react";
import { SelectedSeatsContext } from "@/context/SelectedSeatsContext";

export const useSelectedSeats = () => {
	const context = useContext(SelectedSeatsContext);
	if (!context) {
		return { selectedSeats: [], setSelectedSeats: () => {} };
	}
	return context;
};
