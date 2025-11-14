import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const LocationMap = ({ coordinates, options, styleContainer, styleMap }) => {
	const location = {
		latitude: coordinates?.latitude,
		longitude: coordinates?.longitude,
	};

	if (!coordinates) {
		return <Text style={{ color: "red" }}>Location data not available</Text>;
	}

	return (
		<View style={[styles.container, styleContainer]}>
			<MapView
				style={[styles.map, styleMap]}
				zoomEnabled={true}
				zoomControlEnabled={true}
				provider={PROVIDER_GOOGLE}
				region={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
				{...options}
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
		overflow: "hidden",
	},
	map: {
		width: "100%",
		height: 150,
	},
});
