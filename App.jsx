import React, { useEffect } from "react";
import RootNavigator from "./navigation/RootNavigator";
import * as SystemUI from "expo-system-ui";
import { useTheme } from "./hooks/useTheme";
import { ThemeContext } from "./context/ThemeContext";

function App() {
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		SystemUI.setBackgroundColorAsync(/* theme === "dark" ? "#000000" : "#ffffff" */ "black");
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<RootNavigator />
		</ThemeContext.Provider>
	);
}

export default App;
