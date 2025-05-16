import { View, Text, TextInput, Image, StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";

//images
import { images } from "@/assets/images";

//components
import Button from "../Button";
import Title from "../Title";

const { height: windowHeight } = Dimensions.get("window");

export default function Newsletter() {
	const [inputValue, setInputValue] = useState("");

	return (
		<View style={styles.section}>
			{/* <Title style={[styles.title]}>Ultimele noutati</Title> */}
			<View style={styles.container}>
				<Image style={styles.backgroundImage} source={require("@/assets/images/newsletter.jpg")} />
				<View style={styles.content}>
					<Text style={styles.innerTitle}>Fii la curent cu ultimele noutăți</Text>
					<Text style={styles.innerSubtitle}>
						Abonează-te pentru a afla primul când apar evenimente noi
					</Text>
					<View style={styles.buttonsContainer}>
						<Button style={styles.button} styleText={styles.buttonText}>
							Aboneaza-te
						</Button>
						<TextInput
							style={styles.input}
							onChangeText={(text) => setInputValue(text)}
							value={inputValue}
							placeholder="Adresa de email"
							keyboardType="text"
							placeholderTextColor="white"
						/>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	section: {
		marginTop: -1,
		flex: 1,
		gap: 10,
	},

	container: {
		backgroundColor: "#365771e6",
		position: "relative",
		height: windowHeight - 132,
	},

	backgroundImage: {
		position: "absolute",
		width: "100%",
		height: "100%",
		resizeMode: "cover",
		zIndex: -1,
	},

	content: {
		padding: 20,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 21,
	},

	innerTitle: {
		fontSize: 25,
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
	},

	innerSubtitle: {
		fontSize: 16,
		color: "white",
		textAlign: "center",
	},

	buttonsContainer: {
		gap: 21,
		width: "100%",
		alignItems: "center",
		flexDirection: "column-reverse",
	},

	input: {
		width: "98%",
		color: "white",
		borderWidth: 1,
		borderRadius: 55,
		height: 56,
		fontWeight: 500,
		borderColor: "white",
		textAlign: "center",
		fontSize: 17,
		backgroundColor: "#00000059",
	},

	button: {
		backgroundColor: "white",
		width: "100%",
		maxWidth: 190,
		justifyContent: "center",
	},

	buttonText: {
		color: "#365771",
		fontWeight: "bold",
		fontSize: 17.5,
	},
});
