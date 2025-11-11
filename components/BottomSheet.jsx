/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  BackHandler,
} from 'react-native';
import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BottomSheet = forwardRef(
  (
    {
      activeHeight,
      children,
      backgroundColor,
      backDropColor,
      closeOnExternalInteraction,
      collapseOnExternalInteraction,
    },
    ref
  ) => {
    const inset = useSafeAreaInsets();
    const { height } = Dimensions.get('screen');
    const collapsedOffset = height - 105;
    const newActiveHeight = height - activeHeight - 35;
    const topAnimation = useSharedValue(height);
    const context = useSharedValue(0);
    const isCollapsed = useRef(false);
    const isClosed = useRef(true);
    const isExpanded = useRef(false);

    const setCollapsed = (value) => {
      isCollapsed.current = value;
    };

    const setClosed = (value) => {
      isClosed.current = value;
    };

    const setExpanded = (value) => {
      isExpanded.current = value;
    };

    const expand = useCallback(() => {
      'worklet';
      topAnimation.value = withSpring(newActiveHeight, {
        damping: 100,
        stiffness: 400,
      });

      runOnJS(setExpanded)(true);
      runOnJS(setCollapsed)(false);
      runOnJS(setClosed)(false);
    }, []);

    const collapse = useCallback(() => {
      'worklet';
      topAnimation.value = withSpring(collapsedOffset, {
        damping: 100,
        stiffness: 400,
      });
      runOnJS(setCollapsed)(true);
      runOnJS(setClosed)(false);
      runOnJS(setExpanded)(false);
    }, []);

    const close = useCallback(() => {
      'worklet';
      topAnimation.value = withSpring(height, {
        damping: 100,
        stiffness: 400,
      });
      runOnJS(setClosed)(true);
      runOnJS(setCollapsed)(false);
      runOnJS(setExpanded)(false);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        collapse,
        close,
        isCollapsed,
        isExpanded,
        isClosed,
      }),
      [expand, collapse, close, isCollapsed, isExpanded, isClosed]
    );

    /* useEffect(() => {
			let subscription;

			if (isExpanded.current) {
				// only listen when expanded
				subscription = BackHandler.addEventListener("hardwareBackPress", () => {
					collapse();
					return true;
				});
			}

			// clean up when collapsed or closed
			return () => {
				if (subscription) subscription.remove();
			};
		}, [isExpanded.current]); */

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });
    const backDropAnimation = useAnimatedStyle(() => {
      const opacity = interpolate(
        topAnimation.value,
        [collapsedOffset - 10, newActiveHeight],
        [0, 0.5],
        'clamp'
      );

      return {
        opacity,
        display: opacity === 0 ? 'none' : 'flex',
      };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate((event) => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(context.value + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (topAnimation.value > collapsedOffset + 100) {
          // close
          topAnimation.value = withSpring(height, {
            damping: 100,
            stiffness: 400,
          });
          runOnJS(setClosed)(true);
          runOnJS(setCollapsed)(false);
          runOnJS(setExpanded)(false);
        } else if (topAnimation.value > newActiveHeight + 75) {
          // collapse
          topAnimation.value = withSpring(collapsedOffset, {
            damping: 100,
            stiffness: 400,
          });
          runOnJS(setCollapsed)(true);
          runOnJS(setExpanded)(false);
          runOnJS(setClosed)(false);
        } else {
          // remain open
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 400,
          });
          runOnJS(setExpanded)(true);
          runOnJS(setCollapsed)(false);
          runOnJS(setClosed)(false);
        }
      });

    return (
      <>
        {collapseOnExternalInteraction ? (
          <TouchableWithoutFeedback
            onPress={() => {
              collapse();
            }}
          >
            <Animated.View
              style={[
                styles.backDrop,
                backDropAnimation,
                { backgroundColor: backDropColor, display: 'none' },
              ]}
            />
          </TouchableWithoutFeedback>
        ) : (
          <></>
        )}
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              animationStyle,
              {
                height: activeHeight,
                backgroundColor: backgroundColor,
                paddingBottom: inset.bottom,
              },
            ]}
          >
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  }
);

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'grey',
    borderRadius: 35,
  },
  backDrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'none',
  },
});
