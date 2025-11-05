import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";

//store
import { useSelectedSeatsStore } from "@/store";

//constants
import { Colors } from "@/constants/Colors";

//utils
import { formatDate } from "@/utils/helpers";

//hooks
import { useCustomFonts } from "@/hooks/useCustomFonts";

//components
import Select from "./Select";
import QRCodeModalButton from "./QRCodeModalButton";

const teeth = Array.from({ length: 6 });

const Ticket = ({ data, variant = "" }) => {
	const updateSeatType = useSelectedSeatsStore((state) => state.updateSeatType);
	const styles = getStyles(variant);
	const fonts = useCustomFonts();

	const handleTypeChange = useCallback(
		(value) => updateSeatType(data.id_seat, value),
		[data.id_seat, updateSeatType]
	);

	if (!fonts) return null;

	if (variant == 2)
		return (
			<View style={styles.container}>
				<Text style={[styles.text, styles.ticketNumber]}>Nr. bilet: {data.ticket_codes}</Text>
				<View style={styles.left}>
					<Text style={[styles.text, styles.title]} numberOfLines={2} ellipsizeMode="tail">
						{data.event_title}
					</Text>
				</View>
				<Text style={[styles.text, styles.buyDate]}>
					{formatDate(data.buy_date.trim().split(/\s+/)[0], "numeric")}{" "}
					{data.buy_date.trim().split(/\s+/)[1]}
				</Text>
				<View style={styles.middle}>
					<QRCodeModalButton style={styles.qrCode} variant="2" id={data.ticket_codes} />
				</View>
				<View style={styles.right}>
					<View style={styles.right_item}>
						<Text style={[styles.right_text, styles.right_top]}>Loc</Text>
						<Text style={[styles.right_text, styles.place]}>4</Text>
					</View>
					<View style={styles.right_item}>
						<Text style={[styles.right_text, styles.right_top]}>Rand</Text>
						<Text style={[styles.right_text, styles.row]}>2</Text>
					</View>
					<View style={styles.right_item}>
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
				selectStyles={styles.selectType}
				textStyles={{ color: "#d3d3d3ed", fontWeight: "bold", fontSize: 13.8 }}
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
				position: "relative",
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
				padding: 16,
				paddingRight: 0,
				justifyContent: "center",
				flexShrink: 1,
			},

			ticketNumber: {
				fontFamily: "Poppins-SemiBold",
				position: "absolute",
				top: 15,
				left: 15,
				zIndex: 999,
			},

			title: {
				fontFamily: "Poppins-Bold",
				fontSize: 16,
				paddingRight: 10,
			},

			buyDate: {
				fontFamily: "Poppins-SemiBold",
				position: "absolute",
				bottom: 15,
				left: 15,
			},

			middle: {
				justifyContent: "center",
				alignItems: "center",
				alignSelf: "center",
			},

			qrCode: {
				marginInline: 15,
			},

			right: {
				backgroundColor: "#e9e9e9ff",
				paddingInline: 12,
				paddingBlock: 7,
				gap: 3,
				alignItems: "center",
				justifyContent: "space-evenly",
				borderLeftWidth: 1.9,
				borderColor: Colors.primary,
				borderStyle: "dashed",
			},

			right_item: {
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
		});

	return StyleSheet.create({
		container: {
			position: "relative",
			width: "84%",
			padding: 16,
			backgroundColor: "#363736",
			gap: 0,
			paddingHorizontal: 28,
			borderRadius: 10,
			paddingLeft: 30,
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
			right: -3.6,
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
			fontSize: 17.5,
			marginTop: 12,
			color: "#74b7dd",
		},

		selectType: {
			position: "absolute",
			zIndex: 999,
			right: 38,
			top: 49,
			backgroundColor: "#2e2d2d",
			borderColor: "transparent",
			borderRadius: 6,
		},
	});
};
