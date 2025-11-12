import React, { createContext, useContext, useState, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	useDerivedValue,
	withTiming,
} from "react-native-reanimated";

const AccordionContext = createContext();
const AccordionItemContext = createContext();

export function Accordion({ children, multiple = false }) {
	const [openItems, setOpenItems] = useState([]);

	const toggleItem = (id) => {
		setOpenItems((prev) => {
			if (multiple) {
				return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
			}
			return prev.includes(id) ? [] : [id];
		});
	};

	return (
		<AccordionContext.Provider value={{ openItems, toggleItem }}>
			<View>{children}</View>
		</AccordionContext.Provider>
	);
}

function AccordionItem({ id, children }) {
	return (
		<AccordionItemContext.Provider value={{ id }}>
			<View style={styles.item}>{children}</View>
		</AccordionItemContext.Provider>
	);
}

function AccordionHeader({ children }) {
	const { id } = useContext(AccordionItemContext);
	const { openItems, toggleItem } = useContext(AccordionContext);
	const isOpen = openItems.includes(id);

	return (
		<TouchableOpacity onPress={() => toggleItem(id)} style={styles.header}>
			<Text style={styles.headerText}>{children}</Text>
			<Text style={styles.arrow}>{isOpen ? "▲" : "▼"}</Text>
		</TouchableOpacity>
	);
}

function AccordionContent({ children, duration = 300 }) {
	const { id } = useContext(AccordionItemContext);
	const { openItems } = useContext(AccordionContext);
	const isExpanded = useSharedValue(openItems.includes(id));
	const height = useSharedValue(0);
	const contentRef = useRef(null);

	// sync shared value when context changes
	React.useEffect(() => {
		isExpanded.value = openItems.includes(id);
	}, [openItems]);

	const derivedHeight = useDerivedValue(() =>
		withTiming(isExpanded.value ? height.value : 0, { duration })
	);

	const animatedStyle = useAnimatedStyle(() => ({
		height: derivedHeight.value,
	}));

	return (
		<Animated.View style={[styles.animatedContainer, animatedStyle]}>
			<View
				ref={contentRef}
				onLayout={(e) => {
					height.value = e.nativeEvent.layout.height;
				}}
				style={styles.hiddenContent}
			>
				{children}
			</View>
		</Animated.View>
	);
}

// Attach subcomponents
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export default Accordion;

const styles = StyleSheet.create({
	item: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		marginVertical: 6,
		overflow: "hidden",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#f2f2f2",
	},
	headerText: {
		fontSize: 16,
		fontWeight: "500",
	},
	arrow: {
		fontSize: 16,
	},
	animatedContainer: {
		overflow: "hidden",
	},
	hiddenContent: {
		position: "absolute",
		width: "100%",
	},
});
