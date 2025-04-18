import React from "react";
import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { images } from "@/assets/images";
import { useFetchLocations } from "@/hooks/useFetchLocations";

import Title from "../Title";

const eventsImages = [
	images.salaPolivalentaBistrita,
	images.salaPolivalentaAlbaBlaj,
	images.salaPolivalentaPitesti,
	images.salaPolivalentaTurda,
];

const Events = () => {
	const { locations, loading, error } = useFetchLocations();

	if (loading) return <ActivityIndicator />;
	if (error) return <Text style={{ color: "red" }}>Error: {error.message}</Text>;

	return (
		<View style={styles.section}>
			<Title>Evenimente dupa locatie</Title>
			<View style={styles.container}>
				<FlatList
					data={locations}
					scrollEnabled={false}
					keyExtractor={(item) => item.id}
					renderItem={({ item, index }) => (
						<View style={{ marginBottom: 20 }}>
							<Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
							<Image
								source={eventsImages[index]}
								style={{ width: "100%", height: 200 }}
							/>
						</View>
					)}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	section: {
		marginTop: 30,
	},
});

export default Events;
