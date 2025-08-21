import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const LocationMap = () => {
	const location = {
		latitude: 44.4268, // Example: Bucharest
		longitude: 26.1025,
	};

	return (
		<View style={styles.container}>
			{/* <MapView
				style={styles.map}
				initialRegion={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.01, // zoom level
					longitudeDelta: 0.01,
				}}
			>
				<Marker coordinate={location} title="My Location" description="This is where I am" />
			</MapView> */}
			<MapView style={styles.map} />
		</View>
	);
};

export default LocationMap;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		flex: 1,
	},
});
