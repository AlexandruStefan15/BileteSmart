import React from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { useFetchLocations } from "@/hooks/useFetchLocations";
import Ripple from "react-native-material-ripple";
import { useNavigation } from "@react-navigation/native";

import Title from "../Title";
import { LinearGradient } from "expo-linear-gradient";

import { locations } from "@/data/locations"; // to fetch from API

const Locations = () => {
	const { /* locations, */ loading, error } = useFetchLocations();
	const navigation = useNavigation();

	/* if (loading) return <ActivityIndicator />;
	if (error) return <Text style={{ color: "red" }}>Error: {error.message}</Text>; */

	return (
		<View style={styles.section}>
			<Title style={{ marginBlock: 30 }}>Evenimente dupa locatie</Title>
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.list}
					data={locations}
					scrollEnabled={false}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) => (
						<Ripple
							onPress={() =>
								navigation.navigate("LocationStack", {
									screen: "LocationScreen",
									params: { currentLocation: item },
								})
							}
							style={styles.listItem}
							rippleColor="white"
							rippleDuration={320}
							rippleCentered={false}
						>
							<LinearGradient
								colors={item.linearGradient.colors}
								start={item.linearGradient.start}
								end={item.linearGradient.end}
								style={styles.gradientOverlay}
							>
								<View style={styles.listItem_overlay}>
									<Text style={styles.listItem_title}>{item.name}</Text>
								</View>
								<Image source={item.images[0]} style={{ width: "100%", height: 245, zIndex: -1 }} />
							</LinearGradient>
						</Ripple>
					)}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	section: {
		marginBlock: 30,
		marginBottom: 70,
	},

	container: {
		paddingInline: 21,
	},

	list: {
		gap: 21,
	},

	listItem: {
		position: "relative",
		borderRadius: 10,
		overflow: "hidden",
	},

	listItem_overlay: {
		position: "absolute",
		inset: 0,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		zIndex: 2,
	},

	listItem_title: {
		fontSize: 23,
		fontWeight: "500",
		position: "absolute",
		zIndex: 1,
		color: "white",
		textAlign: "center",
		paddingInline: 35,
		textTransform: "uppercase",
	},
});

export default Locations;
