import { useFonts } from "expo-font";

export const useCustomFonts = () => {
	const [fontsLoaded] = useFonts({
		"SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
		//poppins fonts
		"Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
		"Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
		"Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
		"Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
		//inter fonts
		"Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
		"Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
		"Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
		"Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
	});

	return fontsLoaded;
};
