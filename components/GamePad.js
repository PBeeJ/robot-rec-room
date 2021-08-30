import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from './Button';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'react-native-feather';
import Slider from '@react-native-community/slider';

import {BUTTON_SIZE as SIZE} from '@env';
const BUTTON_SIZE = parseInt(SIZE, 10);

export default function GamePad({
  sendMessage,
  movementSpeed,
  setMovementSpeed,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.sliderWrapper}>
        <Slider
          style={styles.slider}
          value={movementSpeed || 0}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onSlidingComplete={value => {
            setMovementSpeed(Math.round(value));
            sendMessage(`wsB ${Math.round(value)}`);
          }}
          thumbTintColor="brown"
        />
        <Text style={styles.text}>{`Movement speed ${movementSpeed}%`}</Text>
      </View>
      <Button
        icon={ChevronUp}
        sendMessage={sendMessage}
        label="forward"
        command="forward"
        cancelCommand="DS"
        style={{...styles.control, ...styles.forward}}
      />
      <Button
        icon={ChevronDown}
        sendMessage={sendMessage}
        label="backward"
        command="backward"
        cancelCommand="DS"
        style={{...styles.control, ...styles.backward}}
      />
      <Button
        icon={ChevronLeft}
        sendMessage={sendMessage}
        label="left"
        command="left"
        cancelCommand="TS"
        style={{...styles.control, ...styles.left}}
      />
      <Button
        icon={ChevronRight}
        sendMessage={sendMessage}
        label="right"
        command="right"
        cancelCommand="TS"
        style={{...styles.control, ...styles.right}}
      />
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
    zIndex: 1,
  },
  sliderWrapper: {
    position: 'absolute',
    bottom: -85,
    left: -30,
    alignItems: 'center',
  },
  slider: {
    width: 280,
    height: 30,
  },
  text: {
    textTransform: 'capitalize',
    fontWeight: '700',
    fontSize: 8,
    lineHeight: 8,
    color: 'white',
  },
  control: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'white',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forward: {
    top: 0,
    left: BUTTON_SIZE,
    paddingBottom: 5,
  },
  backward: {
    top: BUTTON_SIZE * 2,
    left: BUTTON_SIZE,
    paddingTop: 5,
  },
  left: {
    top: BUTTON_SIZE,
    left: 0,
    paddingRight: 5,
  },
  right: {
    top: BUTTON_SIZE,
    left: BUTTON_SIZE * 2,
    paddingLeft: 5,
  },
});
