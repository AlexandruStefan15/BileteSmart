import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const LocationMap = () => {
	const location = {
		latitude: 44.4268, // Bucharest
		longitude: 26.1025,
	};

	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<Marker coordinate={location} title="My Location" description="This is where I am" />
			</MapView>
		</View>
	);
};

export default LocationMap;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: 250,
	},
});
