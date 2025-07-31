import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";

//store
import { useSelectedSeats } from "@/store/store";

//constants
import { Colors } from "@/constants/Colors";

//components
import Select from "./Select";
import QRCodeModalButton from "./QRCodeModalButton";

const teeth = Array.from({ length: 6 });

const Ticket = ({ data, variant = "" }) => {
	const updateSeatType = useSelectedSeats((state) => state.updateSeatType);
	const styles = getStyles(variant);

	const handleTypeChange = useCallback(
		(value) => updateSeatType(data.id_seat, value),
		[data.id_seat, updateSeatType]
	);

	if (variant == 2)
		return (
			<View style={styles.container}>
				<View style={styles.left}>
					<Text style={[styles.text, styles.ticketNumber]}>Nr. bilet: {data.ticket_codes}</Text>
					<Text style={[styles.text, styles.title]}>{data.event_title}</Text>
					<Text style={[styles.text, styles.buyDate]}>{data.buy_date}</Text>
				</View>
				<View style={styles.middle}>
					<QRCodeModalButton style={styles.qrCode} variant="2" id={data.ticket_codes} />
				</View>
				<View style={styles.right}>
					<View style={styles.right_wrapper}>
						<Text style={[styles.right_text, styles.right_top]}>Loc</Text>
						<Text style={[styles.right_text, styles.place]}>4</Text>
					</View>
					<View style={styles.right_wrapper}>
						<Text style={[styles.right_text, styles.right_top]}>Rand</Text>
						<Text style={[styles.right_text, styles.row]}>2</Text>
					</View>
					<View style={styles.right_wrapper}>
						<Text style={[styles.right_text, styles.right_top]}>Sec.</Text>
						<Text style={[styles.right_text, styles.room]}>{data.room}</Text>
					</View>
				</View>
			</View>
		);

	return (
		<View style={styles.container}>
			<View style={styles.teethWrapperLeft}>
				{teeth.map((_, index) => (
					<View key={index} style={[styles.tooth]} />
				))}
			</View>
			<View style={styles.item_details}>
				<Text style={styles.item_text}>
					Locul: <Text style={styles.highlight}>{data.seat_no}</Text>
				</Text>
				<Text style={styles.item_text}>
					Randul: <Text style={styles.highlight}>{data.row_no}</Text>
				</Text>
				<Text style={styles.item_text}>
					Sectorul: <Text style={styles.highlight}>{data.room_name}</Text>
				</Text>
			</View>
			<Text style={styles.priceText}>{data.price} RON</Text>
			<Select
				selected={data.is_discounted === "1" ? "Redus" : "Intreg"}
				onChange={handleTypeChange}
				selectStyles={{
					position: "absolute",
					zIndex: 999,
					right: 40,
					top: 49,
					backgroundColor: "#2e2d2d",
					borderColor: "transparent",
					borderRadius: 6,
				}}
				textStyles={{ color: "lightgrey", fontWeight: "bold", fontSize: 13.8 }}
			/>
			<View style={styles.teethWrapperRight}>
				{teeth.map((_, index) => (
					<View key={index} style={[styles.tooth]} />
				))}
			</View>
		</View>
	);
};

export default React.memo(Ticket);

const getStyles = (variant) => {
	if (variant == "2")
		return StyleSheet.create({
			container: {
				backgroundColor: "#363736",
				borderLeftWidth: 15,
				borderLeftColor: Colors.primary,
				flexDirection: "row",
				justifyContent: "space-between",
			},

			text: {
				color: "white",
			},

			left: {
				gap: 12,
				width: "60%",
				padding: 16,
				justifyContent: "space-between",
			},

			middle: {
				justifyContent: "center",
				alignItems: "center",
			},

			qrCode: {
				marginBottom: 3,
				marginRight: 15,
			},

			right: {
				backgroundColor: "#ececec",
				paddingInline: 12,
				paddingBlock: 5,
				gap: 3,
				alignItems: "center",
				justifyContent: "center",
				borderLeftWidth: 1.9,
				borderColor: Colors.primary,
				borderStyle: "dashed",
			},

			right_wrapper: {
				transform: [{ rotate: "-90deg" }],
				alignItems: "center",
				paddingInline: 5,
			},

			right_text: {
				fontSize: 15,
				fontWeight: "600",
				color: Colors.secondary,
			},

			place: {
				fontSize: 18,
				fontWeight: "bold",
			},

			row: {
				fontSize: 18,
				fontWeight: "bold",
			},

			room: {
				fontSize: 18,
				fontWeight: "bold",
			},

			ticketNumber: {
				fontFamily: "Poppins-SemiBold",
			},

			title: {
				fontFamily: "Poppins-Bold",
				fontSize: 16,
			},

			buyDate: {
				fontFamily: "Poppins-SemiBold",
			},
		});

	return StyleSheet.create({
		container: {
			position: "relative",
			width: "84%",
			padding: 16,
			backgroundColor: "#363736",
			gap: 2.5,
			paddingHorizontal: 28,
			borderRadius: 10,
		},

		teethWrapperLeft: {
			position: "absolute",
			gap: 6,
			left: -3.7,
			top: 28,
		},

		teethWrapperRight: {
			position: "absolute",
			gap: 6,
			right: -3.7,
			top: 28,
		},

		tooth: {
			width: 8.8,
			height: 8.8,
			borderRadius: 10,
			backgroundColor: "#f5f5f6",
			zIndex: 2,
		},

		item_details: {
			gap: 2.8,
		},

		item_text: {
			fontWeight: "500",
			fontSize: 14.5,
			color: "white",
		},

		highlight: {
			color: "#74b7dd",
			fontWeight: "bold",
		},

		priceText: {
			fontWeight: "600",
			fontSize: 17,
			marginTop: 12,
			color: "#74b7dd",
		},
	});
};
