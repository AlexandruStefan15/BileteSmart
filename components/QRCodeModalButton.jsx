import React, { useState } from "react";
import { View, Pressable, Modal, StyleSheet, Dimensions, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

//components
import Button from "./Button";

const { width: screenWidth } = Dimensions.get("window");

const QRCodeModalButton = ({ id, style, variant = "" }) => {
	const [visible, setVisible] = useState(false);
	const styles = getStyles(variant);

	return (
		<View style={[styles.container, style]}>
			{variant == "2" ? (
				<>
					<Pressable onPress={() => setVisible(true)}>
						<QRCode value={id.toString()} size={56} />
					</Pressable>
				</>
			) : (
				<Button variant="2" onPress={() => setVisible(true)}>
					Vezi codul QR
				</Button>
			)}

			{visible && (
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
			)}
		</View>
	);
};

export default QRCodeModalButton;

const getStyles = (variant) => {
	return StyleSheet.create({
		container: {},

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
};
