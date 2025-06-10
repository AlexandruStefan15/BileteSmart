/* import React from "react";
import { StyleSheet, View, FlatList } from "react-native";

const Events = ({ events, title }) => {
	return (
		<View style={styles.section}>
			{title && (
				<View style={{ marginVertical: 20 }}>
					<Text style={{ fontSize: 24, fontWeight: "bold" }}>{title}</Text>
				</View>
			)}
			<FlatList
				data={events}
				keyExtractor={(item) => item.id_event}
				renderItem={({ item }) => (
					<View>
						<Text>{item.title}</Text>
					</View>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	section: {
		padding: 16,
		backgroundColor: "white",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 2,
	},
});

export default Events;
 */
