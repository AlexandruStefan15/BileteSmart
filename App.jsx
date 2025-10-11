import React, { useEffect } from "react";
import RootNavigator from "./navigation/RootNavigator";
import { useTheme } from "./hooks/useTheme";
import { ThemeContext } from "./context/ThemeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App() {
	const { theme, setTheme } = useTheme();

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeContext.Provider value={{ theme, setTheme }}>
				<SafeAreaProvider>
					<RootNavigator />
				</SafeAreaProvider>
			</ThemeContext.Provider>
		</GestureHandlerRootView>
	);
}

export default App;
