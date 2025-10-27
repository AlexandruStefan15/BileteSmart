import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants";
import { useFocusEffect } from "@react-navigation/native";

//store
import { useDrawerStore } from "@/store/store";

//components
import ProfileBanner from "@/components/sections/ProfileBanner";
import NavigationMenu from "@/components/NavigationMenu";

const MyAccountScreen = ({ navigation }) => {
	const closeDrawer = useDrawerStore((state) => state.closeDrawer);

	useFocusEffect(
		React.useCallback(() => {
			// On focus, close the drawer
			closeDrawer();
		}, [])
	);

	return (
		<SafeAreaView style={styles.screen}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<ProfileBanner />
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<NavigationMenu style={{ width: "85%" }} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
	},
});

export default MyAccountScreen;
