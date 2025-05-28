import React from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";

//components
import Header from "@/components/Header";
import CheckoutForm from "@/components/CheckoutForm";

const CheckoutScreen = () => {
	return (
		<SafeAreaView>
			<Header variant="2" arrowColor="black" />
			<ScrollView style={{ marginTop: 60 }}>
				<CheckoutForm />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({});

export default CheckoutScreen;
