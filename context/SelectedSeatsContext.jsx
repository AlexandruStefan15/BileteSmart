import { createContext, useContext } from "react";

export const SelectedSeatsContext = createContext(null);

export const useSelectedSeatsContext = () => {
	const ctx = useContext(SelectedSeatsContext);
	if (!ctx) throw new Error("SelectedSeatsContext must be used within its Provider");
	return ctx;
};
