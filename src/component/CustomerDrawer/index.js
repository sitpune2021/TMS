import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';


const CustomDrawer = ({ isOpen, onClose, children }) => {
    // Dimensions of the screen
    const { width } = Dimensions.get('window');
  
    // Animated value to track the position of the drawer
    const translateX = useSharedValue(isOpen ? 0 : width);
  
    // Animation gesture handler
    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
        ctx.startX = translateX.value;
      },
      onActive: (event, ctx) => {
        translateX.value = ctx.startX + event.translationX;
      },
      onEnd: (event) => {
        if (event.translationX < -(width / 2)) {
          onClose();
        } else {
          translateX.value = withSpring(0);
        }
      },
    });
  
    // Animated style
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });
  
    return (
      <React.Fragment>
        {/* Overlay to capture touches outside the drawer */}
        {isOpen && (
          <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1} />
        )}
  
        {/* Drawer */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.drawer, animatedStyle]}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </React.Fragment>
    );
  };
  
  const styles = StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    drawer: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '80%', // You can adjust this as needed
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
    },
  });
  
  export default CustomDrawer;
  