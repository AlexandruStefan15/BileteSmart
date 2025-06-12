import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Modal from "react-native-modal";

//icons
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const options = [
	{ label: "Bilet intreg", value: "Intreg" },
	{ label: "Bilet redus (elevi, studenti, pensionari)", value: "Redus" },
];

function Select({ selected, onChange, modalStyles, selectStyles, textStyles }) {
	const [isVisible, setIsVisible] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);

	return (
		<>
			<TouchableOpacity
				style={[styles.pickerButton, selectStyles]}
				onPress={() => setIsVisible(true)}
			>
				<Text style={[styles.pickerText, textStyles]}>{selected || "Select..."}</Text>
				<FontAwesomeIcon name="caret-down" size={18} color={textStyles.color} />
			</TouchableOpacity>

			<Modal
				isVisible={isVisible}
				onBackdropPress={() => setIsVisible(false)}
				onBackButtonPress={() => setIsVisible(false)}
				style={[styles.modal, modalStyles]}
				animationIn="fadeInUp"
				animationOut="fadeOutDown"
				animationInTiming={250}
				animationOutTiming={250}
				backdropTransitionInTiming={1}
				backdropTransitionOutTiming={1}
				useNativeDriver={true}
				hideModalContentWhileAnimating={false}
			>
				<View style={styles.modalContent}>
					<View style={styles.header}>
						<Text style={styles.title}>Selectează tipul biletului</Text>
						<Text style={styles.caption}>Va rugam sa selectati tipul de bilet dorit.</Text>
					</View>
					<View style={[styles.separator]}></View>
					{options.map((opt, index) => (
						<React.Fragment key={opt.value}>
							<TouchableOpacity
								style={[styles.option]}
								onPress={(event) => {
									setSelectedOption(opt.value);
									setTimeout(() => {
										setIsVisible(false);
									}, 0);
									setTimeout(() => {
										onChange(opt.value);
									}, 0);
								}}
							>
								<Text
									style={[
										styles.labelText,
										selectedOption === opt.value && styles.selectedLabel,
										index == 0 && !selectedOption && styles.selectedLabel,
									]}
								>
									{opt.label}
								</Text>
							</TouchableOpacity>
							<View style={[styles.separator, index === 1 && styles.lastSeparator]}></View>
						</React.Fragment>
					))}
				</View>
			</Modal>
		</>
	);
}

export default React.memo(Select);

const styles = StyleSheet.create({
	pickerButton: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 25,
		padding: 8,
		paddingInline: 15,
		backgroundColor: "#444",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "white",
	},

	pickerText: {
		color: "white",
		textAlign: "center",
	},

	modal: {
		alignSelf: "center",
	},

	modalContent: {
		backgroundColor: "white",
		borderRadius: 20,
		paddingInline: 1,
		paddingBottom: 3,
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
		marginTop: 10,
		lineHeight: 20,
	},

	caption: {
		fontSize: 15.5,
		textAlign: "center",
		maxWidth: 220,
		alignSelf: "center",
		lineHeight: 20,
	},

	labelText: {
		fontSize: 16,
		textAlign: "center",
		paddingBlock: 12,
		marginBlock: 9,
		paddingInline: 16,
		marginInline: 12,
		fontWeight: "600",
		borderRadius: 13,
	},

	selectedLabel: {
		backgroundColor: "#5fa0c4",
		color: "white",
	},

	separator: {
		borderTopWidth: 1,
		borderColor: "#ccccccad",
		width: "100%",
	},

	lastSeparator: {
		display: "none",
	},
});
