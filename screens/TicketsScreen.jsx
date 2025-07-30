import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, ActivityIndicator } from "react-native";
import { Colors } from "@/constants";
import { useFocusEffect } from "@react-navigation/native";

//store
import { useDrawerStore } from "@/store/store";

//hooks
import { useOrdersByEmail } from "@/hooks/useOrdersByEmail";

//components
import Header from "@/components/Header";
import OrderHistoryList from "@/components/OrderHistoryList";

const TicketsScreen = ({ navigation, route }) => {
	const { orders, loading, error, refetch } = useOrdersByEmail("zyx_sprite@yahoo.com");
	const closeDrawer = useDrawerStore((state) => state.closeDrawer);

	useFocusEffect(
		React.useCallback(() => {
			refetch();
			closeDrawer();
		}, [refetch])
	);

	if (loading)
		return <ActivityIndicator style={styles.activityIndicator} color={"#365771"} size="large" />;
	/* if (error) return <Text>Oops, something went wrong. Please try again later.</Text>; */

	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<OrderHistoryList orders={orders} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
	},

	activityIndicator: {
		margin: "auto",
	},
});

export default TicketsScreen;
