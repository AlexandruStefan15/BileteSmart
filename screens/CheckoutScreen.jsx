import React, { useCallback } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text, BackHandler } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

//components
import Header from "@/components/Header";
import CheckoutForm from "@/components/CheckoutForm";
import OrderSummary from "@/components/sections/OrderSummary";

const CheckoutScreen = () => {
	const navigation = useNavigation();

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				navigation.goBack();
				return true;
			};

			const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

			return () => subscription.remove();
		}, [navigation])
	);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
			<ScrollView style={{ flexGrow: 1 }}>
				<Header variant="2" arrowColor="black" />
				<CheckoutForm style={{ marginTop: 55 }} />
				<OrderSummary />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default CheckoutScreen;
