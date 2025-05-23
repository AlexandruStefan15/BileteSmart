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
				onModalHide={() => {}}
				style={modalStyles}
				useNativeDriver={true}
				backdropTransitionOutTiming={0}
				animationIn="fadeInUp"
				animationOut="fadeOutDown"
				hideModalContentWhileAnimating={true}
			>
				<View style={styles.modalContent}>
					{options.map((opt, index) => (
						<TouchableOpacity
							key={opt.value}
							style={[styles.option, index === 1 && styles.option1]}
							onPress={() => {
								onChange(opt.value);
								setIsVisible(false); // no delay
							}}
						>
							<Text style={{ paddingLeft: 5, fontSize: 15 }}>{opt.label}</Text>
						</TouchableOpacity>
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
		borderRadius: 8,
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
		paddingVertical: 15,
	},

	option1: {
		borderTopWidth: 1,
		borderColor: "#ccc",
	},
});
