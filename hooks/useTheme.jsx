import { useState, useEffect } from "react";
import { useColorScheme } from "react-native";

export function useTheme() {
	const systemColorScheme = useColorScheme();
	const [theme, setTheme] = useState(systemColorScheme || "light");

	useEffect(() => {
		setTheme("light"); //setTheme("systemColorScheme");
	}, [systemColorScheme]);

	return { theme, setTheme };
}
