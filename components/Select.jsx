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

	return (
		<>
			<TouchableOpacity
				style={[styles.pickerButton, selectStyles]}
				onPress={() => setIsVisible(true)}
			>
				<Text style={[styles.pickerText, textStyles]}>{selected || "Select..."}</Text>
				<FontAwesomeIcon name="caret-down" size={18} color={"#5fa0c4"} />
			</TouchableOpacity>

			<Modal
				isVisible={isVisible}
				onBackdropPress={() => setIsVisible(false)}
				onBackButtonPress={() => setIsVisible(false)}
				style={modalStyles}
				animationIn="fadeInUp"
				animationOut="fadeOutDown"
				animationInTiming={250}
				animationOutTiming={200}
				backdropTransitionInTiming={1}
				backdropTransitionOutTiming={1}
				useNativeDriver={true}
				hideModalContentWhileAnimating={false}
			>
				<View style={styles.modalContent}>
					{options.map((opt, index) => (
						<React.Fragment key={opt.value}>
							<TouchableOpacity
								style={[styles.option]}
								onPress={() => {
									onChange(opt.value);
									setIsVisible(false);
								}}
							>
								<Text style={{ paddingLeft: 5, fontSize: 15 }}>{opt.label}</Text>
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

	modalContent: {
		backgroundColor: "white",
		borderRadius: 8,
		padding: 5,
		paddingLeft: 10,
	},

	option: {
		paddingBlock: 15,
	},

	separator: {
		borderTopWidth: 1,
		borderColor: "#ccc",
	},

	lastSeparator: {
		display: "none",
	},
});
