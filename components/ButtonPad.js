import React from 'react';
import {StyleSheet, View} from 'react-native';

import Button from './Button';

import {BUTTON_SIZE as SIZE} from '@env';
const BUTTON_SIZE = parseInt(SIZE, 10);

export default function ButtonPad() {
  return (
    <View style={styles.container}>
      <Button
        color="green"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.grab}}
      />
      <Button
        color="green"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.loose}}
      />
      <Button
        color="red"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.handUp}}
      />
      <Button
        color="red"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.handDown}}
      />
      <Button
        color="blue"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.armUp}}
      />
      <Button
        color="blue"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.armDown}}
      />
      <Button
        color="orange"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.lookleft}}
      />
      <Button
        color="orange"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.lookright}}
      />
      <Button
        color="purple"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.cameraUp}}
      />
      <Button
        color="purple"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.cameraDown}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    right: 30,
    padding: 10,
    width: BUTTON_SIZE * 3,
    height: BUTTON_SIZE * 3,
  },
  control: {
    position: 'absolute',
    left: 0,
    backgroundColor: 'white',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
  },
  armUp: {
    top: BUTTON_SIZE,
    left: 0,
  },
  armDown: {
    top: BUTTON_SIZE,
    left: BUTTON_SIZE * 2,
  },
  handUp: {
    top: 0,
    left: BUTTON_SIZE,
  },
  handDown: {
    top: BUTTON_SIZE * 2,
    left: BUTTON_SIZE,
  },
  grab: {
    top: BUTTON_SIZE * 3.5,
    left: BUTTON_SIZE * -1,
  },
  loose: {
    top: BUTTON_SIZE * 3.5,
    left: BUTTON_SIZE * 0.3,
  },
  lookleft: {
    top: BUTTON_SIZE * 4.8,
    left: BUTTON_SIZE * -1,
  },
  lookright: {
    top: BUTTON_SIZE * 4.8,
    left: BUTTON_SIZE * 0.3,
  },
  cameraUp: {
    top: BUTTON_SIZE * 3.5,
    left: BUTTON_SIZE * 2,
  },
  cameraDown: {
    top: BUTTON_SIZE * 4.8,
    left: BUTTON_SIZE * 2,
  },
});
