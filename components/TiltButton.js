import React, { useEffect, useState } from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { Compass } from 'react-native-feather';
import { orientation, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';
// eslint-disable-next-line import/no-unresolved
import { BUTTON_SIZE as SIZE, ACELEROMETER_REFRESH, DEFAULT_SPEED } from '@env';
import Button from './Button';

const BUTTON_SIZE = parseInt(SIZE, 10);

LogBox.ignoreLogs(['NativeEventEmitter']); // Ignore NativeEventEmitter warnings
setUpdateIntervalForType(
  SensorTypes.orientation,
  parseInt(ACELEROMETER_REFRESH, 10),
); // Limit interval to 500ms

// TODO Fine tune these controls, both here and move.py on the bot
function boundedRangeMap(val, min, max) {
  if (val < min) {
    return -100;
  } if (val > max) {
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

export default function TiltButton({ sendMessage }) {
  const [tiltMode, setTiltMode] = useState(false);
  const [rollTare, setRollTare] = useState(0);
  const [rotation, setRotation] = useState(null);
  const [movementSpeed, setMovementSpeed] = useState(parseInt(DEFAULT_SPEED, 10));
  console.log('movementSpeed: ', movementSpeed);

  useEffect(() => {
    if (tiltMode) {
      const [throttle, steering] = convertRotation(rotation, rollTare);
      setMovementSpeed(Math.abs(throttle));
      sendMessage(`TiltControl ${throttle} ${steering}`);
    }
  }, [tiltMode, rotation, rollTare, sendMessage]);

  useEffect(() => {
    // This is where we get the orientation data
    const subscription = orientation.subscribe(
      ({ pitch, roll, yaw }) => setRotation({ pitch, roll, yaw }),
    );

    // Unsubscribe on component unmount
    return () => subscription.unsubscribe();
  }, []);

  const onPressOut = () => {
    sendMessage('WheelStop');
  };

  return (
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
      style={[styles.control, styles.tilt]}
    />
  );
}

const styles = StyleSheet.create({
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
    right: 0,
    bottom: 0,
  },
});
