import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
// eslint-disable-next-line import/no-unresolved
import { BUTTON_SIZE as SIZE, DEFAULT_SPEED } from '@env';
import GameInfo from './GameInfo';
// import TiltButton from './TiltButton';

const BUTTON_SIZE = parseInt(SIZE, 10);

export default function GamePad({ sendMessage, lastCommand, information }) {
  const [isJoystickEnabled, setIsJoystickEnabled] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 40, y: 40 });
  const [movementSpeed, setMovementSpeed] = useState(
    parseInt(DEFAULT_SPEED, 10),
  );

  function handleStart(e) {
    setIsJoystickEnabled(true);
    // Set position on start
    return handleMove(e);
  }

  function handleMove({ nativeEvent }) {
    // TODO: get these values from the target element
    const { pageX, pageY } = nativeEvent;
    const X_EXTRA = 70;
    const Y_EXTRA = 65;
    const X_BUFFER = 10; // distance to go over the x axis
    const Y_BUFFER = 10; // distance to go over the y axis
    const zeroedX = pageX - X_EXTRA;
    const zeroedY = pageY - Y_EXTRA;
    const x = Math.max(Math.min(zeroedX, 80 + X_BUFFER), -X_BUFFER);
    const y = Math.max(Math.min(zeroedY, 80 + Y_BUFFER), -Y_BUFFER);

    setDragPosition({ x, y });

    const convertedX = Math.round((x - 40) * 2);
    const convertedY = Math.round((y - 40) * 2);
    sendMessage(`TiltControl ${convertedY} ${convertedX}`);
    return true;
  }

  // Reset back to the center position
  function handleEnd() {
    setDragPosition({ x: 40, y: 40 });
    setIsJoystickEnabled(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.sliderWrapper}>
        <Slider
          style={styles.slider}
          value={movementSpeed || 0}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="white"
          maximumTrackTintColor="white"
          onSlidingComplete={(value) => {
            setMovementSpeed(Math.round(value));
            sendMessage(`wsB ${Math.round(value)}`);
          }}
          thumbTintColor="brown"
        />
        <Text style={styles.text}>{`Movement speed ${movementSpeed}%`}</Text>
      </View>
      <View style={styles.circleOuter}>
        <View
          style={[styles.circleInner, { left: dragPosition.x, top: dragPosition.y }]}
          onStartShouldSetResponder={handleStart}
          onResponderMove={handleMove}
          onResponderRelease={handleEnd}
       />
      </View>
      <View style={styles.info}>
        <GameInfo
          movementSpeed={movementSpeed}
          dragPosition={dragPosition}
          lastCommand={lastCommand}
          information={information}
        />
      </View>
      {/* <TiltButton sendMessage={sendMessage}></TiltButton> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 35,
    padding: 10,
    width: BUTTON_SIZE * 3,
    height: BUTTON_SIZE * 3,
  },
  sliderWrapper: {
    position: 'absolute',
    height: 50,
    bottom: -85,
    left: -30,
    alignItems: 'center',
  },
  slider: {
    width: 220,
    height: 30,
  },
  circleOuter: {
    position: 'absolute',
    top: 10,
    left: 0,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  circleInner: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    elevation: 5,
  },
  text: {
    textTransform: 'capitalize',
    fontWeight: '700',
    fontSize: 8,
    lineHeight: 8,
    color: 'white',
  },
  info: {
    position: 'absolute',
    bottom: -160,
    left: 0,
  },
});
