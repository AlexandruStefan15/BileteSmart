import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants";
import { useFocusEffect } from "@react-navigation/native";

//store
import { useDrawerStore } from "@/store";

//hooks
import { useOrdersByEmail } from "@/hooks/useOrdersByEmail";

//components
import Header from "@/components/Header";
import OrderHistoryList from "@/components/OrderHistoryList";

const MyOrdersScreen = ({ navigation, route }) => {
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

	if (error) return <Text>Oops, something went wrong. Please try again later.</Text>;

	return (
		<SafeAreaView style={styles.screen}>
			<Header title={"Comenzile mele"} variant="3" arrowColor="black" backButtonSize={24.5} />
			<OrderHistoryList orders={orders} contentContainerStyle={{ paddingTop: 20 }} />
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

export default MyOrdersScreen;
