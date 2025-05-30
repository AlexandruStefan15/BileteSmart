import React, { useEffect } from "react";
import RootNavigator from "./navigation/RootNavigator";
import { useTheme } from "./hooks/useTheme";
import { ThemeContext } from "./context/ThemeContext";

function App() {
	const { theme, setTheme } = useTheme();

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<RootNavigator />
		</ThemeContext.Provider>
	);
}

export default App;
