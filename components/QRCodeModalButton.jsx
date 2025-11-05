import React, { useState, useRef } from "react";
import {
	View,
	Pressable,
	Modal,
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import Share from "react-native-share";
import Icon from "./Icon";

//components
import Button from "./Button";

const { width: screenWidth } = Dimensions.get("window");

const QRCodeModalButton = ({ id, style, variant = "" }) => {
	const [visible, setVisible] = useState(false);
	const styles = getStyles(variant);
	const viewShotRef = useRef(null);

	const handleShare = async () => {
		try {
			// Capture the QR code view as an image
			const uri = await viewShotRef.current.capture();

			// Share directly to WhatsApp
			await Share.open({
				url: uri,
				message: "Hi, here's your ticket QR code 🎟️",
				/* social: Share.Social.WHATSAPP, */
			});
		} catch (error) {
			if (error?.message?.includes("User did not share")) {
				// user cancelled share — ignore silently
				return;
			}
		}
	};

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
							<ViewShot ref={viewShotRef} options={{ format: "png", quality: 1 }}>
								<QRCode value={id.toString()} size={screenWidth * 0.7} />
							</ViewShot>
						</Pressable>
						<TouchableOpacity onPress={handleShare} style={styles.whatsappButton}>
							<Icon style={styles.shareIcon} lib="en" name="share" size={24} color="white" />
							<Text style={styles.buttonText}>Distribuie</Text>
						</TouchableOpacity>
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
			backgroundColor: "rgba(0, 0, 0, 0.63)",
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
		whatsappButton: {
			marginTop: 18,
			backgroundColor: "#25D366",
			paddingVertical: 10,
			paddingHorizontal: 20,
			borderRadius: 8,
			flexDirection: "row",
			alignItems: "center",
			gap: 7,
		},
		buttonText: {
			color: "white",
			fontWeight: "bold",
			fontSize: 15,
		},
	});
};
