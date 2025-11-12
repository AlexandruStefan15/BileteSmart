import React, { createContext, useContext, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
	useSharedValue,
	useDerivedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from "react-native-reanimated";

// context to share expandedId
const AccordionContext = createContext();
const AccordionItemContext = createContext();

export const Accordion2 = ({ children }) => {
	const expandedId = useSharedValue(null);

	const value = useMemo(() => ({ expandedId }), []);
	return (
		<AccordionContext.Provider value={value}>
			<View style={styles.container}>{children}</View>
		</AccordionContext.Provider>
	);
};

// ---------- ITEM ----------
const AccordionItem = ({ id, children }) => {
	return (
		<AccordionItemContext.Provider value={{ id }}>
			<View style={styles.item}>{children}</View>
		</AccordionItemContext.Provider>
	);
};

// ---------- HEADER ----------
const AccordionHeader = ({ children }) => {
	const { expandedId } = useContext(AccordionContext);
	const { id } = useContext(AccordionItemContext);

	const handleToggle = () => {
		expandedId.value = expandedId.value === id ? null : id;
	};

	return (
		<TouchableOpacity onPress={handleToggle} style={styles.header}>
			<Text style={styles.headerText}>{children}</Text>
		</TouchableOpacity>
	);
};

// ---------- CONTENT ----------
const AccordionContent = ({ children, duration = 300 }) => {
	const { expandedId } = useContext(AccordionContext);
	const { id } = useContext(AccordionItemContext);

	const contentHeight = useSharedValue(0);
	const isExpanded = useDerivedValue(() => expandedId.value === id);

	const animatedHeight = useDerivedValue(() =>
		withTiming(contentHeight.value * Number(isExpanded.value), {
			duration,
			easing: Easing.bezier(0.25, 0.1, 0.25, 1),
		})
	);

	const animatedStyle = useAnimatedStyle(() => ({
		height: animatedHeight.value,
		overflow: "hidden",
	}));

	return (
		<Animated.View style={[styles.contentWrapper, animatedStyle]}>
			<View
				onLayout={(e) => {
					contentHeight.value = e.nativeEvent.layout.height;
				}}
				style={styles.absoluteContent}
			>
				{children}
			</View>
		</Animated.View>
	);
};

// Attach compound subcomponents
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export default Accordion2;

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
	item: {
		marginVertical: 4,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		overflow: "hidden",
	},
	header: {
		padding: 16,
		backgroundColor: "#365771",
	},
	headerText: {
		fontSize: 16,
		fontWeight: "600",
		color: "white",
		textAlign: "center",
		textTransform: "uppercase",
	},
	contentWrapper: {
		backgroundColor: "white",
		borderTopWidth: 1,
		borderColor: "#ccc",
	},
	absoluteContent: {
		position: "absolute", // crucial for smooth animation
		width: "100%",
	},
});

/*  example usage:

<Accordion2>
  <Accordion2.Item id="1">
    <Accordion2.Header>First Item</Accordion.Header>
    <Accordion2.Content>
      <View style={{ padding: 16 }}>
        <Text>
          This is the hidden content of the first item.
        </Text>
      </View>
    </Accordion2.Content>
  </Accordion2.Item>

  <Accordion.Item id="2">
    <Accordion2.Header>Second Item</Accordion.Header>
    <Accordion2.Content>
      <View style={{ padding: 16 }}>
        <Text>More content inside the second item.</Text>
      </View>
    </Accordion2.Content>
  </Accordion2.Item>
</Accordion2> 

*/
