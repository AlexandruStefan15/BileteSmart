import React, { useMemo, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, PixelRatio, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	ReduceMotion,
	useDerivedValue,
} from "react-native-reanimated";

// utils
import { formatDate } from "@/utils/helpers";

// components
import QRCodeModalButton from "./QRCodeModalButton";
import Button from "./Button";
import SeeMoreFlatList from "@/components/SeeMoreFlatList";

const OrderHistoryList = ({ orders, style, contentContainerStyle }) => {
	const openItemRef = useRef(null); // { id: number|string, close: () => void }

	const sortedOrders = useMemo(() => {
		return [...orders].sort((a, b) => new Date(b.buy_date) - new Date(a.buy_date));
	}, [orders]);

	const handleRequestOpen = useCallback((id, controls) => {
		// Close previously-open item (if different)
		if (openItemRef.current && openItemRef.current.id !== id) {
			openItemRef.current.close?.();
		}
		// Track current item
		openItemRef.current = { id, close: controls.close };
	}, []);

	const renderItem = useCallback(
		({ item }) => <AccordionItem order={item} onRequestOpen={handleRequestOpen} />,
		[handleRequestOpen]
	);

	return (
		<SeeMoreFlatList
			data={sortedOrders}
			renderItem={renderItem}
			keyExtractor={(item) => item.id_order.toString()}
			initialCount={10}
			step={10}
			windowSize={7}
			style={style}
			contentContainerStyle={contentContainerStyle}
		/>
	);
};

export default React.memo(OrderHistoryList);

const SCALE = PixelRatio.get();
const IS_ANDROID = Platform.OS === "android";
const IS_IOS = Platform.OS === "ios";

export const AccordionItem = React.memo(function AccordionItem({
	order,
	onRequestOpen,
	duration = 300,
}) {
	const navigation = useNavigation();

	// Measured content height (px)
	const contentHeight = useSharedValue(0);
	// Animation driver: 0 (closed) → 1 (open)
	const progress = useSharedValue(0);

	// JS-side flags (don’t read shared values in handlers)
	const isOpenRef = useRef(false);
	const pendingOpenRef = useRef(false);

	const animateTo = useCallback(
		(to) => {
			progress.value = withTiming(to, {
				duration,
				easing: Easing.bezier(0.25, 0.1, 0.25, 1),
				reduceMotion: ReduceMotion.System,
			});
		},
		[duration, progress]
	);

	const open = useCallback(() => {
		if (contentHeight.value === 0) {
			// Defer until we get a real height from onLayout
			pendingOpenRef.current = true;
		} else {
			animateTo(1);
		}
		isOpenRef.current = true;
	}, [animateTo, contentHeight]);

	const close = useCallback(() => {
		pendingOpenRef.current = false;
		animateTo(0);
		isOpenRef.current = false;
	}, [animateTo]);

	const onHeaderPress = useCallback(() => {
		if (isOpenRef.current) {
			close();
			return;
		}
		onRequestOpen?.(order.id_order, { close });
		open();
	}, [close, onRequestOpen, open, order.id_order]);

	// Animate HEIGHT only (no opacity) and snap to pixel grid to avoid “shake”
	const animatedContent = useAnimatedStyle(() => {
		"worklet";
		const raw = contentHeight.value * progress.value;
		const snapped = Math.round(raw * SCALE) / SCALE;
		return {
			height: snapped,
			overflow: "hidden",
			// Optional raster hints (captured booleans are safe)
			...(IS_ANDROID ? { renderToHardwareTextureAndroid: true } : null),
			...(IS_IOS ? { shouldRasterizeIOS: true } : null),
		};
	});

	return (
		<View style={styles.itemContainer}>
			<TouchableOpacity style={styles.header} onPress={onHeaderPress}>
				<Text style={styles.headerText}>{order.movie}</Text>
				<Text style={styles.headerSubText}>
					Achizitionat in {formatDate(order.buy_date.trim().split(/\s+/)[0], "numeric")} la{" "}
					{order.buy_date.trim().split(/\s+/)[1]}
				</Text>
			</TouchableOpacity>

			{/* Static border wrapper so borders don't repaint each frame */}
			<View style={styles.body}>
				<Animated.View style={animatedContent}>
					<View
						collapsable={false}
						style={styles.innerContent}
						onLayout={(e) => {
							const h = e.nativeEvent.layout.height;
							if (h > 0) {
								// Snap the measured height as well
								const snapped = Math.round(h * SCALE) / SCALE;
								contentHeight.value = snapped;

								if (pendingOpenRef.current) {
									pendingOpenRef.current = false;
									animateTo(1);
								}
							}
						}}
					>
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
							onPress={() => {
								navigation.navigate("OrderedTicketsScreen", {
									tickets: order.tickets,
									event_title: order.movie,
								});
							}}
						>
							Vezi bilete
						</Button>
					</View>
				</Animated.View>
			</View>
		</View>
	);
});

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
	body: {
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
		fontSize: 14.4,
	},
});

/*

import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	ReduceMotion,
} from "react-native-reanimated";

//utils
import { formatDate } from "@/utils/helpers";

//components
import QRCodeModalButton from "./QRCodeModalButton";
import Button from "./Button";
import SeeMoreFlatList from "@/components/SeeMoreFlatList";

const OrderHistoryList = ({ orders }) => {
	const newlyAddedOrders = useMemo(() => {
		return [...orders].sort((a, b) => new Date(b.buy_date) - new Date(a.buy_date));
	}, [orders]);

	const renderItem = React.useCallback(({ item }) => <AccordionItem order={item} />, []);

	return (
		<SeeMoreFlatList
			data={newlyAddedOrders}
			renderItem={renderItem}
			keyExtractor={(item) => item.id_order.toString()}
			initialCount={8}
			step={8}
		/>
	);
};

const AccordionItem = React.memo(({ order, isExpanded, onToggle }) => {
	const [expanded, setExpanded] = useState(false);
	const contentHeight = useSharedValue(0);
	const contentOpacity = useSharedValue(0);
	const navigation = useNavigation();

	const toggleExpand = () => {
		contentHeight.value = withTiming(expanded ? 0 : 300, {
			duration: 300,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			reduceMotion: ReduceMotion.System,
		});
		contentOpacity.value = withTiming(expanded ? 0 : 1, {
			duration: 250,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
			reduceMotion: ReduceMotion.System,
		});
		setExpanded(!expanded);
	};

	const animatedContentStyle = useAnimatedStyle(() => ({
		maxHeight: contentHeight.value,
		opacity: contentOpacity.value,
		overflow: "hidden",
	}));

	return (
		<View style={styles.itemContainer}>
			<TouchableOpacity style={styles.header} onPress={toggleExpand}>
				<Text style={styles.headerText}>{order.movie}</Text>
				<Text style={styles.headerSubText}>
					Achizitionat in {formatDate(order.buy_date.trim().split(/\s+/)[0], "numeric")} la{" "}
					{order.buy_date.trim().split(/\s+/)[1]}
				</Text>
			</TouchableOpacity>

			<Animated.View style={[styles.animatedContent, animatedContentStyle]}>
				<View style={styles.innerContent}>
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
							{formatDate(order.date.trim().split(/\s+/)[0], "numeric")},{" "}
							{order.date.trim().split(/\s+/)[1]}
						</Text>
						<Text style={styles.innerContent_text}>
							<Text style={{ fontWeight: "600" }}>Total:</Text> {order.total} RON
						</Text>
					</View>
					<QRCodeModalButton style={{ marginBottom: 3 }} id={order.id_order} />
					<Button
						variant="2"
						onPress={() => {
							navigation.navigate("OrderedTicketsScreen", {
								tickets: order.tickets,
								event_title: order.movie,
							});
						}}
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


*/
