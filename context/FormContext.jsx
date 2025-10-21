import { createContext, useContext } from "react";

export const FormContext = createContext(null);

export const useFormContext = () => {
	const ctx = useContext(FormContext);
	if (!ctx) throw new Error("Form compound components must be used within <Form>");
	return ctx;
};
