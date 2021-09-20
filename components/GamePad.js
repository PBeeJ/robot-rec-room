import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from './Button';
import GameInfo from './GameInfo';
import {orientation} from 'react-native-sensors';

import {setUpdateIntervalForType, SensorTypes} from 'react-native-sensors';
import {LogBox} from 'react-native';

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Compass,
} from 'react-native-feather';
import Slider from '@react-native-community/slider';

import {BUTTON_SIZE} from '../Constants';

const ACELEROMETER_REFRESH = 300;
// This is a percentage
const DEFAULT_SPEED = 30;

LogBox.ignoreLogs(['NativeEventEmitter']); // Ignore NativeEventEmitter warnings
setUpdateIntervalForType(SensorTypes.orientation, ACELEROMETER_REFRESH); // Limit interval to 500ms

// TODO Fine tune these controls, both here and move.py on the bot
function boundedRangeMap(val, min, max) {
  if (val < min) {
    return -100;
  } else if (val > max) {
    return 100;
  }
  return Math.round(((val - min) / (max - min)) * 200 - 100);
}

function convertRotation(rotation, rollTare) {
  return [
    boundedRangeMap(rotation.roll - rollTare, -1, 1),
    boundedRangeMap(rotation.pitch, -1, 1),
  ];
}

export default function GamePad({sendMessage, lastCommand, information}) {
  const [movementSpeed, setMovementSpeed] = useState(
    parseInt(DEFAULT_SPEED, 10),
  );

  const [tiltMode, setTiltMode] = useState(false);
  const [rollTare, setRollTare] = useState(0);

  const [rotation, setRotation] = useState(null);

  useEffect(() => {
    if (tiltMode) {
      const [throttle, steering] = convertRotation(rotation, rollTare);
      setMovementSpeed(Math.abs(throttle));
      sendMessage(`TiltControl ${throttle} ${steering}`);
    }
  }, [tiltMode, rotation, rollTare, sendMessage]);

  useEffect(() => {
    // This is where we get the orientation data
    const subscription = orientation.subscribe(({pitch, roll, yaw}) =>
      setRotation({pitch, roll, yaw}),
    );

    // Unsubscribe on component unmount
    return () => subscription.unsubscribe();
  }, []);

  const onPressOut = () => {
    // Aggh... sent ALL the stop commands!!
    sendMessage('WheelStop');
    sendMessage('DS');
    sendMessage('TS');
  };

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
          onSlidingComplete={value => {
            setMovementSpeed(Math.round(value));
            sendMessage(`wsB ${Math.round(value)}`);
          }}
          disabled={tiltMode}
          thumbTintColor="brown"
        />
        <Text style={styles.text}>{`Movement speed ${movementSpeed}%`}</Text>
      </View>
      <Button
        icon={Compass}
        onPressIn={() => {
          setRollTare(rotation.roll);
          setTiltMode(true);
        }}
        onPressOut={() => {
          onPressOut();
          setTiltMode(false);
        }}
        sendMessage={sendMessage}
        style={{...styles.control, ...styles.tilt}}
      />
      <Button
        icon={ChevronUp}
        onPressIn={() => sendMessage('forward')}
        onPressOut={onPressOut}
        disabled={tiltMode}
        label="forward"
        style={{...styles.control, ...styles.forward}}
      />
      <Button
        icon={ChevronDown}
        label="backward"
        onPressIn={() => sendMessage('backward')}
        onPressOut={onPressOut}
        disabled={tiltMode}
        style={{...styles.control, ...styles.backward}}
      />
      <Button
        icon={ChevronLeft}
        label="left"
        onPressIn={() => sendMessage('left')}
        onPressOut={onPressOut}
        disabled={tiltMode}
        style={{...styles.control, ...styles.left}}
      />
      <Button
        icon={ChevronRight}
        label="right"
        onPressIn={() => sendMessage('right')}
        onPressOut={onPressOut}
        disabled={tiltMode}
        style={{...styles.control, ...styles.right}}
      />
      <View style={styles.info}>
        <GameInfo
          movementSpeed={movementSpeed}
          rollTare={rollTare}
          lastCommand={lastCommand}
          rotation={rotation}
          information={information}
        />
      </View>
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
    zIndex: 1,
  },
  tilt: {
    top: 0,
    left: 0,
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
  info: {
    position: 'absolute',
    bottom: -160,
    left: 0,
  },
});
