import { useFonts } from "expo-font";

export const useCustomFonts = () => {
	const [fontsLoaded] = useFonts({
		"SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
		"Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
		"Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
		"Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
	});

	return fontsLoaded;
};
