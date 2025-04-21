import React from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { images } from "@/assets/images";
import { useFetchLocations } from "@/hooks/useFetchLocations";
import Ripple from "react-native-material-ripple";

import Title from "../Title";
import { LinearGradient } from "expo-linear-gradient";

const eventLocations = [
	{
		id: "1",
		name: "Sala Polivalenta Bistrita",
		image: images.salaPolivalentaBistrita,
		linearGradient: {
			colors: ["#dc0f19d9", "#1111116b"],
			start: { x: 0, y: 0 },
			end: { x: 1, y: 0 },
		},
	},
	{
		id: "2",
		name: "Sala Polivalenta Pitesti",
		image: images.salaPolivalentaPitesti,
		linearGradient: {
			colors: ["#540682db", "#949494b3"],
			start: { x: 0, y: 0 },
			end: { x: 1, y: 0 },
		},
	},
	{
		id: "3",
		name: "Sala Polivalenta Alba Blaj",
		image: images.salaPolivalentaAlbaBlaj,
		linearGradient: {
			colors: ["#0675c4", "#337ab72e"],
			start: { x: 0, y: 0 },
			end: { x: 0, y: 1 },
		},
	},
	{
		id: "4",
		name: "Sala Polivalenta Turda",
		image: images.salaPolivalentaTurda,
		linearGradient: {
			colors: ["#d3540033", "#f89406e6"],
			start: { x: 0, y: 0 },
			end: { x: 1, y: 0 },
		},
	},
];

const Locations = ({ navigation }) => {
	const { locations, loading, error } = useFetchLocations();

	if (loading) return <ActivityIndicator />;
	if (error) return <Text style={{ color: "red" }}>Error: {error.message}</Text>;

	return (
		<View style={styles.section}>
			<Title style={{ marginBlock: 30 }}>Evenimente dupa locatie</Title>
			<View style={styles.container}>
				<FlatList
					contentContainerStyle={styles.list}
					data={eventLocations}
					scrollEnabled={false}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) => (
						<Ripple
							style={styles.listItem}
							rippleColor="white"
							rippleDuration={400}
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
								<Image source={item.image} style={{ width: "100%", height: 245, zIndex: -1 }} />
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
