import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//components
import Header from "@/components/Header";
import Form from "@/components/Form";

const ChangeAccountDataScreen = ({ navigation, route }) => {
	return (
		<SafeAreaView style={styles.screen}>
			<Header
				title={"Datele mele"}
				variant="2"
				style={{
					backgroundColor: "white",
					boxShadow: "0px 0.5px 5px rgba(0, 0, 0, 0.34)",
					paddingHorizontal: 16,
					gap: 2,
					position: "relative",
				}}
				styleTitle={{ color: "black", fontSize: 19, fontWeight: "500" }}
				arrowColor="black"
				backButtonSize={24.5}
			/>
			<Text>hiasd asd asd adas </Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default ChangeAccountDataScreen;
