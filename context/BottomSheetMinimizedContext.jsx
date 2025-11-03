import { createContext, useContext } from "react";

export const BottomSheetMinimizedContext = createContext();

export const useBottomSheetMinimizedContext = () => {
	const ctx = useContext(BottomSheetMinimizedContext);
	return ctx;
};
