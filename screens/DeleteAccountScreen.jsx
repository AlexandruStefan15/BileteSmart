import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//constants
import { Colors } from "@/constants";

//components
import Header from "@/components/Header";
import Form, { validation } from "@/components/Form";

const DeleteAccountScreen = ({ navigation, route }) => {
	return (
		<SafeAreaView style={styles.screen}>
			<Header title={"Sterge contul"} variant="3" arrowColor="black" backButtonSize={24.5} />
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
					paddingInline: 36,
					gap: 12,
				}}
			>
				<Text style={styles.caption}>
					Sigur doriți să vă ștergeți contul? Acest lucru va șterge toate datele contului dvs. de pe
					aplicatie. Pentru a vă șterge contul, introduceți parola mai jos.
				</Text>
				<Form style={styles.form} initialValues={{ parola: "" }} onSubmit={(v) => console.log(v)}>
					<Form.Field>
						<Form.Label>Parola</Form.Label>
						<Form.Input name="parola" inputStyle={[styles.input]} validate={validation.required} />
						<Form.Error name="parola" />
					</Form.Field>
					<Form.SubmitButton style={{ marginTop: 13 }} title="Sterge contul" />
				</Form>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors["light"].background.primary,
	},

	caption: {
		fontSize: 16,
		textAlign: "center",
		lineHeight: 24,
	},

	input: {
		backgroundColor: "white",
	},
});

export default DeleteAccountScreen;
