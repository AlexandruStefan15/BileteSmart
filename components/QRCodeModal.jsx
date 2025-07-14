import React, { useState } from "react";
import { View, Pressable, Modal, StyleSheet, Dimensions, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

const { width: screenWidth } = Dimensions.get("window");

const QRCodeModal = ({ id, style }) => {
	const [visible, setVisible] = useState(false);

	return (
		<View style={[styles.container, style]}>
			<Pressable style={styles.button} onPress={() => setVisible(true)}>
				<Text style={styles.buttonText}>Vezi codul QR</Text>
			</Pressable>

			<Modal
				animationType="slide"
				transparent={true}
				visible={visible}
				onRequestClose={() => setVisible(false)}
			>
				<Pressable onPress={() => setVisible(false)} style={styles.modalOverlay}>
					<Pressable onPress={() => {}} style={styles.modalContent}>
						<QRCode value={id.toString()} size={screenWidth * 0.7} />
					</Pressable>
				</Pressable>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},

	button: {
		padding: 10,
		backgroundColor: "#2196f3",
		borderRadius: 3,
		alignItems: "center",
	},

	buttonText: {
		color: "white",
		fontWeight: "600",
		fontSize: 13.7,
		textTransform: "uppercase",
	},

	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.6)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	closeButton: {
		marginTop: 20,
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: "white",
		borderRadius: 5,
	},
	closeText: {
		fontWeight: "bold",
	},
});

export default QRCodeModal;
