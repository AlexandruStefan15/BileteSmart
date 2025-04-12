import React from "react";
import RootNavigator from "./navigation/RootNavigator";
import { useTheme } from "./hooks/useTheme";

function App() {
	const { theme, setTheme } = useTheme();

	return <RootNavigator />;
}

export default App;
