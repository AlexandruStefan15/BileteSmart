// context/SelectedSeatsContext.js
import { useContext } from "react";

import { SelectedSeatsContext } from "@/context/SelectedSeatsContext";

export const useSelectedSeatsContext = () => {
	const ctx = useContext(SelectedSeatsContext);
	if (!ctx) throw new Error("SelectedSeatsContext must be used within its Provider");
	return ctx;
};
