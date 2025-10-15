import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import ReactNativeModal from "react-native-modal";

const Modal = ({ isVisible, style, ...props }) => {
	return (
		<ReactNativeModal isVisible={isVisible} {...props}>
			<View style={[styles.modalContent, style]}>
				<View style={styles.header}>
					<Text style={styles.title}>{props.title}</Text>
					<Text style={styles.subtitle}>{props.subtitle}</Text>
				</View>
				<View style={[styles.separator]}></View>
				{props.footer ? (
					<View style={styles.footer}>{props.footer}</View>
				) : (
					<View style={styles.footer}>
						<TouchableOpacity
							style={styles.label}
							onPress={() => {
								props.onClose?.();
							}}
						>
							<Text style={styles.labelText}>OK</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</ReactNativeModal>
	);
};

Modal.Footer = ({ children, style, ...props }) => {
	return (
		<View style={[styles.footer, style]} {...props}>
			{children}
		</View>
	);
};

Modal.Label = ({ children, style, ...props }) => {
	return (
		<View style={[styles.label, style]} {...props}>
			{children}
		</View>
	);
};

Modal.LabelText = ({ children, style, ...props }) => {
	return (
		<Text style={[styles.labelText, style]} {...props}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	modalContent: {
		backgroundColor: "white",
		borderRadius: 20,
		paddingInline: 1,
		paddingBottom: 3,
		overflow: "hidden",
	},

	header: {
		paddingBlock: 20,
		borderColor: "#eee",
		gap: 10,
	},

	title: {
		fontSize: 19.5,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 9,
		lineHeight: 20,
	},

	subtitle: {
		fontSize: 15.5,
		paddingInline: 25,
		textAlign: "center",
		alignSelf: "center",
		lineHeight: 20,
	},

	separator: {
		borderTopWidth: 1,
		borderColor: "#ccccccad",
		width: "100%",
	},

	label: {
		width: "100%",
	},

	labelText: {
		fontSize: 17,
		textAlign: "center",
		marginBlock: 9,
		marginInline: 12,
		paddingBlock: 10,
		paddingInline: 16,
		fontWeight: "600",
		borderRadius: 13,
	},

	selectedLabel: {
		backgroundColor: "#2196f3",
		color: "white",
	},

	footer: {},
});

export default Modal;

/* 
example props:

<ReactNativeModal
  isVisible={isVisible}
  onBackdropPress={() => setIsVisible(false)}
  onBackButtonPress={() => setIsVisible(false)}
  style={[styles.modal, styles]}
  animationIn="fadeInUp"
  animationOut="fadeOutDown"
  animationInTiming={250}
  animationOutTiming={250}
  backdropTransitionInTiming={1}
  backdropTransitionOutTiming={1}
  useNativeDriver={true}
  hideModalContentWhileAnimating={false}
>
...modal content here...
</ReactNativeModal>
*/
