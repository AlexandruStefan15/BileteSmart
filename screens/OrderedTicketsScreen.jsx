import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

//components
import Header from "@/components/Header";

const OrderedTicketsScreen = () => {
	return (
		<SafeAreaView style={styles.screen}>
			<Header />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				{/* <OrderHistoryList orders={ordersData} /> */}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default OrderedTicketsScreen;
