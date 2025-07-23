import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	ReduceMotion,
} from "react-native-reanimated";

//components
import QRCodeModal from "./QRCodeModal";
import Button from "./Button";

const AccordionItem = ({ order, isExpanded, onToggle }) => {
	const navigation = useNavigation();
	const height = useSharedValue(isExpanded ? 300 : 0);
	const opacity = useSharedValue(isExpanded ? 1 : 0);

	React.useEffect(() => {
		height.value = withTiming(isExpanded ? 300 : 0, {
			duration: 300,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			reduceMotion: ReduceMotion.System,
		});

		opacity.value = withTiming(isExpanded ? 1 : 0, {
			duration: 250,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			reduceMotion: ReduceMotion.System,
		});
	}, [isExpanded]);

	const animatedStyle = useAnimatedStyle(() => ({
		maxHeight: height.value,
		opacity: opacity.value,
		overflow: "hidden",
	}));

	return (
		<View style={styles.itemContainer}>
			<TouchableOpacity style={styles.header} onPress={onToggle}>
				<Text style={styles.headerText}>{order.movie}</Text>
				<Text style={styles.headerSubText}>Achizitionat in {order.buy_date}</Text>
			</TouchableOpacity>
			<Animated.View style={[styles.animatedContent, animatedStyle]}>
				<View style={styles.innerContent}>
					<View style={{ gap: 7, marginBottom: 8 }}>
						<Text style={styles.innerContent_text}>ID Order: {order.id_order}</Text>
						<Text style={styles.innerContent_text}>Event Date: {order.date}</Text>
						<Text style={styles.innerContent_text}>First Name: {order.first_name}</Text>
						<Text style={styles.innerContent_text}>Last Name: {order.last_name}</Text>
						<Text style={styles.innerContent_text}>Phone: {order.phone}</Text>
						<Text style={styles.innerContent_text}>Total: {order.total} RON</Text>
					</View>
					<QRCodeModal style={{ marginBottom: 3 }} id={order.id_order} />
					<Button
						variant="2"
						onPress={() => {
							navigation.navigate({});
						}}
					>
						Vezi bilete
					</Button>
				</View>
			</Animated.View>
		</View>
	);
};

const OrderHistoryList = ({ orders }) => {
	const [expandedOrderIds, setExpandedOrderIds] = useState([]);

	const toggleOrder = (id) => {
		setExpandedOrderIds((prev) =>
			prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
		);
	};

	const renderItem = ({ item: order }) => (
		<AccordionItem
			order={order}
			isExpanded={expandedOrderIds.includes(order.id_order)}
			onToggle={() => toggleOrder(order.id_order)}
		/>
	);

	return (
		<FlatList
			data={orders}
			keyExtractor={(item) => item.id_order.toString()}
			renderItem={renderItem}
			contentContainerStyle={styles.list}
			scrollEnabled={false}
			style={{ width: "100%" }}
		/>
	);
};

const styles = StyleSheet.create({
	list: {
		padding: 16,
		gap: 12,
	},

	itemContainer: {
		borderRadius: 8,
		overflow: "hidden",
	},

	header: {
		padding: 12,
		paddingBlock: 16,
		backgroundColor: "#365771",
		flexDirection: "column",
		gap: 15,
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

export default OrderHistoryList;
