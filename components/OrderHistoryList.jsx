import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	ReduceMotion,
	LinearTransition,
	FadeIn,
	FadeOut,
} from "react-native-reanimated";

//utils
import { formatDate } from "@/utils/helpers";

//components
import QRCodeModalButton from "./QRCodeModalButton";
import Button from "./Button";
import SeeMoreFlatList from "@/components/SeeMoreFlatList";

const OrderHistoryList = ({ orders }) => {
	const [expandedOrderId, setExpandedOrderId] = useState(null);

	const newlyAddedOrders = useMemo(() => {
		return [...orders].sort((a, b) => new Date(b.buy_date) - new Date(a.buy_date));
	}, [orders]);

	const toggleOrder = (id) => {
		setExpandedOrderId((prevId) => (prevId === id ? null : id));
	};

	const renderItem = React.useCallback(
		({ item }) => (
			<AccordionItem
				order={item}
				isExpanded={expandedOrderId === item.id_order}
				onToggle={() => toggleOrder(item.id_order)}
			/>
		),
		[expandedOrderId]
	);

	return (
		<SeeMoreFlatList
			data={newlyAddedOrders}
			renderItem={renderItem}
			keyExtractor={(item) => String(item.id_order)}
			initialCount={8}
			step={8}
			initialNumToRender={8}
			maxToRenderPerBatch={6}
			updateCellsBatchingPeriod={30}
			windowSize={5}
			removeClippedSubviews
		/>
	);
};

const AccordionItem = React.memo(({ order, isExpanded, onToggle }) => {
	const navigation = useNavigation();

	const buyParts = React.useMemo(() => order.buy_date.trim().split(/\s+/), [order.buy_date]);
	const eventParts = React.useMemo(() => order.date.trim().split(/\s+/), [order.date]);

	return (
		<View style={styles.itemContainer}>
			<TouchableOpacity style={styles.header} onPress={onToggle}>
				<Text style={styles.headerText}>{order.movie}</Text>
				<Text style={styles.headerSubText}>
					Achiziționat în {formatDate(buyParts[0], "numeric")} la {buyParts[1]}
				</Text>
			</TouchableOpacity>

			<Animated.View
				layout={LinearTransition.duration(75)}
				style={[styles.animatedContent]}
				collapsable={false}
			>
				{isExpanded && (
					<Animated.View
						style={styles.innerContent}
						entering={FadeIn.duration(400)}
						exiting={FadeOut.duration(400)}
					>
						<View style={{ gap: 8, marginBottom: 8 }}>
							<Text style={styles.innerContent_text}>
								<Text style={{ fontWeight: "600" }}>ID Order:</Text> #{order.id_order}
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
								{formatDate(eventParts[0], "numeric")}, {eventParts[1]}
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
					</Animated.View>
				)}
			</Animated.View>
		</View>
	);
});

export default React.memo(OrderHistoryList);

const styles = StyleSheet.create({
	itemContainer: {
		borderRadius: 8,
		overflow: "hidden",
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
		justifyContent: "center",
		paddingInline: 12,
		backgroundColor: "white",
		gap: 5,
		borderBottomWidth: 1,
		borderRightWidth: 1,
		borderLeftWidth: 1,
		borderColor: "#ccc",
		borderBottomEndRadius: 8,
		borderBottomStartRadius: 8,
	},

	innerContent: {
		paddingBlock: 11,
		gap: 5,
	},

	innerContent_text: {
		fontSize: 14,
	},
});
