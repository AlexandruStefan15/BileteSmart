import { useFonts } from "expo-font";

export const useFonts = () => {
	const [fontsLoaded] = useFonts({
		"SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
		Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
	});

	return fontsLoaded;
};
