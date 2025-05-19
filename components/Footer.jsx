import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Link } from "@react-navigation/native";

//images
import { images } from "@/assets/images";

const Footer = () => {
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Image style={styles.logoImage} source={images.logo} />
			</View>
			<View style={styles.bottom}>
				<View style={styles.links_list}>
					<Link style={styles.link} screen="AboutTicketingScreen" params={{ id: "test" }}>
						Despre ticketing
					</Link>
					<Link style={styles.link} screen="TermsAndConditionsScreen" params={{ id: "test" }}>
						Termeni și condiții
					</Link>
					<Link style={styles.link} screen="PrivacyPolicyScreen" params={{ id: "test" }}>
						Politica de confidentialitate
					</Link>
					<Link style={styles.link} screen="TicketReturnPolicyScreen" params={{ id: "test" }}>
						Politica de returnare a biletelor
					</Link>
				</View>
				<Text
					style={{
						color: "grey",
						alignSelf: "center",
						marginBlock: 12,
						fontSize: 16.5,
						fontWeight: 500,
					}}
				>
					© 2023 Biletesmart.ro | Powered by Xplication
				</Text>
				<View style={styles.images_container}>
					<Image style={styles.anpcImage} source={images.anpc} />
					<Image style={styles.litigiiImage} source={images.litigii} />
					<Image style={styles.metopiaPaymentsImage} source={images.metopia} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#1f1f1f",
		gap: 25,
	},

	top: {
		alignItems: "center",
		paddingBlock: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#4e4e4e",
	},

	logoImage: {
		width: "100%",
		maxWidth: 180,
		height: 100,
		resizeMode: "contain",
	},

	bottom: {
		paddingInline: 10,
	},

	links_list: {
		gap: 7,
	},

	link: {
		fontSize: 16.5,
		fontWeight: "bold",
		color: "#fff",
	},

	images_container: {
		marginTop: 5,
		marginBottom: 20,
		alignItems: "center",
		gap: 5,
	},
});

export default Footer;
