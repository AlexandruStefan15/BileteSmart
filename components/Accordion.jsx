import React, {
	createContext,
	useContext,
	useCallback,
	useRef,
	useMemo,
	useState,
} from "react";
import {
	View,
	TouchableOpacity,
	StyleSheet,
	PixelRatio,
	Platform,
	Text,
} from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
	ReduceMotion,
} from "react-native-reanimated";

// ----------------- Context -----------------
const AccordionContext = createContext(null);

const useAccordionContext = () => {
	const ctx = useContext(AccordionContext);
	if (!ctx)
		throw new Error("Accordion compound components must be used within <Accordion>");
	return ctx;
};

// ----------------- Accordion Root -----------------
const AccordionRoot = ({ children }) => {
	const openItemRef = useRef(null);

	const requestOpen = useCallback((id, controls) => {
		if (openItemRef.current && openItemRef.current.id !== id) {
			openItemRef.current.close?.();
		}
		openItemRef.current = { id, close: controls.close };
	}, []);

	const value = useMemo(() => ({ requestOpen }), [requestOpen]);

	return <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>;
};

// ----------------- Item Context -----------------
const AccordionItemContext = createContext(null);
const useAccordionItemContext = () => {
	const ctx = useContext(AccordionItemContext);
	if (!ctx)
		throw new Error("Accordion sub-components must be used inside <Accordion.Item>");
	return ctx;
};

const SCALE = PixelRatio.get();
const IS_ANDROID = Platform.OS === "android";
const IS_IOS = Platform.OS === "ios";

// ----------------- Accordion.Item -----------------
const AccordionItem = ({ id, duration = 300, children }) => {
	const { requestOpen } = useAccordionContext();

	const contentHeight = useSharedValue(0); // measured height
	const progress = useSharedValue(0); // 0 closed, 1 open

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

	const toggle = useCallback(() => {
		if (isOpenRef.current) {
			close();
		} else {
			requestOpen(id, { close });
			open();
		}
	}, [close, open, requestOpen, id]);

	const animatedContent = useAnimatedStyle(() => {
		"worklet";
		const raw = contentHeight.value * progress.value;
		const snapped = Math.round(raw * SCALE) / SCALE;
		return {
			maxHeight: snapped,
			overflow: "hidden",
			...(IS_ANDROID ? { renderToHardwareTextureAndroid: true } : null),
			...(IS_IOS ? { shouldRasterizeIOS: true } : null),
		};
	});

	const ctxValue = useMemo(
		() => ({ toggle, animatedContent, contentHeight, pendingOpenRef, animateTo }),
		[toggle, animatedContent, contentHeight, animateTo]
	);

	return (
		<AccordionItemContext.Provider value={ctxValue}>
			<View style={styles.item}>{children}</View>
		</AccordionItemContext.Provider>
	);
};

// ----------------- Accordion.Header -----------------
const AccordionHeader = ({ children, style }) => {
	const { toggle } = useAccordionItemContext();

	return (
		<TouchableOpacity style={[styles.header, style]} onPress={toggle} activeOpacity={0.8}>
			{typeof children === "string" ? (
				<Text style={styles.headerText}>{children}</Text>
			) : (
				children
			)}
		</TouchableOpacity>
	);
};

// ----------------- Accordion.Content -----------------
// Ghost-measure approach: always render an invisible "ghost" with onLayout
// so the measured height is reliable for the animated panel.
const AccordionContent = ({ children, style }) => {
	const { animatedContent, contentHeight, pendingOpenRef, animateTo } =
		useAccordionItemContext();
	const [measured, setMeasured] = useState(0);

	const handleLayout = (e) => {
		const h = e.nativeEvent.layout.height;
		if (h > 0) {
			const snapped = Math.round(h * SCALE) / SCALE;
			if (snapped !== measured) setMeasured(snapped);
			if (snapped !== contentHeight.value) contentHeight.value = snapped;

			if (pendingOpenRef.current) {
				pendingOpenRef.current = false;
				animateTo(1);
			}
		}
	};

	return (
		<View style={[styles.body, style]}>
			{/* Animated container that the user sees */}
			<Animated.View style={animatedContent}>
				<View pointerEvents="auto">{children}</View>
			</Animated.View>

			{/* Invisible ghost for stable measurement (kept in tree) */}
			<View
				collapsable={false}
				onLayout={handleLayout}
				style={styles.ghostMeasure}
				pointerEvents="none"
			>
				{children}
			</View>
		</View>
	);
};

// ----------------- Styles -----------------
const styles = StyleSheet.create({
	item: {
		borderRadius: 8,
		overflow: "hidden",
		marginBottom: 12,
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "#D9E1E7",
	},
	header: {
		padding: 16,
		backgroundColor: "#365771",
	},
	headerText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
	body: {
		backgroundColor: "white",
	},
	ghostMeasure: {
		position: "absolute",
		left: 0,
		right: 0,
		opacity: 0, // invisible
		zIndex: -1, // behind
	},
});

// ----------------- Attach Subcomponents -----------------
const Accordion = Object.assign(AccordionRoot, {
	Item: AccordionItem,
	Header: AccordionHeader,
	Content: AccordionContent,
});

export default Accordion;

/*  example usage:

<Accordion>
  <Accordion.Item id="1">
    <Accordion.Header>First Item</Accordion.Header>
    <Accordion.Content>
      <View style={{ padding: 16 }}>
        <Text>
          This is the hidden contenasd asd asda dasdast of the first item.
        </Text>
      </View>
    </Accordion.Content>
  </Accordion.Item>

  <Accordion.Item id="2">
    <Accordion.Header>Second Item</Accordion.Header>
    <Accordion.Content>
      <View style={{ padding: 16 }}>
        <Text>More content inside the second item.</Text>
      </View>
    </Accordion.Content>
  </Accordion.Item>
</Accordion> 

*/
