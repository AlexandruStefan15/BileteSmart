import React, { useMemo, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	useDerivedValue,
	useAnimatedReaction,
	runOnJS,
} from "react-native-reanimated";

import { formatDate } from "@/utils/helpers";
import QRCodeModalButton from "./QRCodeModalButton";
import Button from "./Button";
import SeeMoreFlatList from "@/components/SeeMoreFlatList";

const OrderHistoryList = ({ orders }) => {
	const expandedId = useSharedValue(null);

	const newlyAddedOrders = useMemo(
		() => [...orders].sort((a, b) => new Date(b.buy_date) - new Date(a.buy_date)),
		[orders]
	);

	const renderItem = useCallback(
		({ item }) => <AccordionItem order={item} expandedId={expandedId} />,
		[]
	);

	return (
		<SeeMoreFlatList
			data={newlyAddedOrders}
			renderItem={renderItem}
			keyExtractor={(item) => item.id_order.toString()}
			contentContainerStyle={{ gap: 5 }}
			initialCount={8}
			step={8}
		/>
	);
};

const AccordionItem = React.memo(({ order, expandedId }) => {
	const navigation = useNavigation();
	const animatedHeight = useSharedValue(0);
	const isExpanded = useDerivedValue(() => expandedId.value === order.id_order);

	// Animate on change
	useAnimatedReaction(
		() => isExpanded.value,
		(current, prev) => {
			if (current === prev) return;
			animatedHeight.value = withTiming(current ? 310 : 0, {
				duration: 300,
				easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			});
		}
	);

	const animatedStyle = useAnimatedStyle(() => ({
		height: animatedHeight.value,
	}));

	const toggleExpand = () => {
		runOnJS(() => {
			expandedId.value = expandedId.value === order.id_order ? null : order.id_order;
		})();
	};

	return (
		<View style={styles.itemContainer}>
			<TouchableOpacity style={styles.header} onPress={toggleExpand}>
				<Text style={styles.headerText}>{order.movie}</Text>
				<Text style={styles.headerSubText}>
					Plasata pe {formatDate(order.buy_date.trim().split(/\s+/)[0], "numeric")} la{" "}
					{order.buy_date.trim().split(/\s+/)[1]}
				</Text>
			</TouchableOpacity>

			<Animated.View style={[styles.animatedContent, animatedStyle]}>
				<View style={styles.innerContent}>
					<View style={{ gap: 8, marginBottom: 8 }}>
						<Text style={styles.innerContent_text}>
							<Text style={{ fontWeight: "600" }}>ID Comanda:</Text> #{order.id_order}
						</Text>
						<Text style={styles.innerContent_text}>
							<Text style={{ fontWeight: "600" }}>Nume:</Text> {order.last_name}
						</Text>
						<Text style={styles.innerContent_text}>
							<Text style={{ fontWeight: "600" }}>Prenume:</Text> {order.first_name}
						</Text>
						<Text style={styles.innerContent_text}>
							<Text style={{ fontWeight: "600" }}>Telefon:</Text> {order.phone}
						</Text>
						<Text style={styles.innerContent_text}>
							<Text style={{ fontWeight: "600" }}>Data evenimentului:</Text>{" "}
							{formatDate(order.date.trim().split(/\s+/)[0], "numeric")}
						</Text>
						<Text style={styles.innerContent_text}>
							<Text style={{ fontWeight: "600" }}>Ora evenimentului:</Text>{" "}
							{order.date.trim().split(/\s+/)[1]}
						</Text>
						<Text style={styles.innerContent_text}>
							<Text style={{ fontWeight: "600" }}>Total:</Text> {order.total} RON
						</Text>
					</View>
					<QRCodeModalButton style={{ marginBottom: 3 }} id={order.id_order} />
					<Button
						variant="2"
						onPress={() =>
							navigation.navigate("OrderedTicketsScreen", {
								tickets: order.tickets,
								event_title: order.movie,
							})
						}
					>
						Vezi bilete
					</Button>
				</View>
			</Animated.View>
		</View>
	);
});

export default React.memo(OrderHistoryList);

const styles = StyleSheet.create({
	itemContainer: {
		borderRadius: 8,
		overflow: "hidden",
		marginBottom: 8,
	},

	header: {
		gap: 12,
		padding: 12,
		paddingBlock: 20,
		backgroundColor: "#365771",
		flexDirection: "column",
	},

	headerText: {
		fontSize: 15.5,
		fontWeight: "700",
		color: "white",
		textAlign: "center",
		textTransform: "uppercase",
	},

	headerSubText: {
		fontSize: 14,
		fontWeight: "500",
		color: "white",
		textAlign: "center",
	},

	animatedContent: {
		backgroundColor: "white",
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderColor: "#ccc",
		borderBottomEndRadius: 8,
		borderBottomStartRadius: 8,
	},

	innerContent: {
		padding: 12,
		gap: 5,
	},

	innerContent_text: {
		fontSize: 14.4,
	},
});
