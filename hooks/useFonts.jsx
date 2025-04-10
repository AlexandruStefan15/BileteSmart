import React, { useState, useEffect } from "react";
import { loadAsync } from "expo-font";

export const UseFonts = () => {
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		const loadFonts = async () => {
			await loadAsync({
				"SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
				/* "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
				"Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
				"Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"), */
			});
			setFontsLoaded(true);
		};

		loadFonts();
	}, []);

	return fontsLoaded;
};
