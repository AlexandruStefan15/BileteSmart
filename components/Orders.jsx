import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const AccordionItem = ({ order, isExpanded, onToggle }) => {
	const height = useSharedValue(isExpanded ? 145 : 0);
	const opacity = useSharedValue(isExpanded ? 1 : 0);

	React.useEffect(() => {
		height.value = withTiming(isExpanded ? 145 : 0, { duration: 300 });
		opacity.value = withTiming(isExpanded ? 1 : 0, { duration: 300 });
	}, [isExpanded]);

	const animatedStyle = useAnimatedStyle(() => ({
		height: height.value,
		opacity: opacity.value,
		overflow: "hidden",
	}));

	return (
		<View style={styles.itemContainer}>
			<TouchableOpacity onPress={onToggle} style={styles.header}>
				<Text style={styles.headerText}>{order.movie}</Text>
				<Text style={styles.headerSubText}>Achizitionat in {order.buy_date}</Text>
			</TouchableOpacity>

			<Animated.View style={[styles.animatedContent, animatedStyle]}>
				<Text>ID Order: {order.id_order}</Text>
				<Text>Buy Date: {order.buy_date}</Text>
				<Text>First Name: {order.first_name}</Text>
				<Text>Last Name: {order.last_name}</Text>
				<Text>Phone: {order.phone}</Text>
			</Animated.View>
		</View>
	);
};

const Orders = ({ orders }) => {
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
		backgroundColor: "white",
		borderRadius: 8,
		overflow: "hidden",
	},

	header: {
		padding: 12,
		paddingBottom: 14,
		backgroundColor: "#365771",
		flexDirection: "column",
		gap: 10,
	},
	headerText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
		marginBottom: 5,
	},

	headerSubText: {
		fontSize: 14,
		color: "white",
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
});

export default Orders;
