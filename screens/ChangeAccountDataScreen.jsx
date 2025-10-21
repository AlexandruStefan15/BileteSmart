import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//components
import Header from "@/components/Header";
import Form from "@/components/Form";

const ChangeAccountDataScreen = ({ navigation, route }) => {
	return (
		<SafeAreaView style={styles.screen}>
			<Header title={"Schimba datele"} variant="3" arrowColor="black" backButtonSize={24.5} />
			<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
				<Form onSubmit={(v) => console.log(v)}>
					<Form.Field>
						<Form.Input
							name="Nume"
							label="Nume"
							validate={(val) => (!val ? "Campul este obligatoriu" : "")}
						/>
					</Form.Field>
					<Form.Field>
						<Form.Input
							name="Prenume"
							label="Prenume"
							validate={(val) => (!val ? "Campul este obligatoriu" : "")}
						/>
					</Form.Field>
					<Form.Field>
						<Form.Input
							name="Telefon"
							label="Telefon"
							keyboardType="number-pad"
							validate={(val) => (!val ? "Campul este obligatoriu" : "")}
						/>
					</Form.Field>
					<Form.Field>
						<Form.Input
							name="Email"
							label="Email"
							keyboardType="email-address"
							validate={(val) => (!val ? "Campul este obligatoriu" : "")}
						/>
					</Form.Field>
					<Form.SubmitButton title="Actualizeaza" />
				</Form>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "white",
	},
});

export default ChangeAccountDataScreen;
