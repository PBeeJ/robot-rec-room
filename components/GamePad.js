import React from 'react';
import {StyleSheet, View} from 'react-native';

import Button from './Button';

import {BUTTON_SIZE as SIZE} from '@env';
const BUTTON_SIZE = parseInt(SIZE, 10);

export default function GamePad() {
  return (
    <View style={styles.container}>
      <Button
        color="green"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.up}}
      />
      <Button
        color="green"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.down}}
      />
      <Button
        color="green"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.left}}
      />
      <Button
        color="green"
        radius={BUTTON_SIZE / 1.7}
        style={{...styles.control, ...styles.right}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 30,
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
  up: {
    top: 0,
    left: BUTTON_SIZE,
  },
  down: {
    top: BUTTON_SIZE * 2,
    left: BUTTON_SIZE,
  },
  left: {
    top: BUTTON_SIZE,
    left: 0,
  },
  right: {
    top: BUTTON_SIZE,
    left: BUTTON_SIZE * 2,
  },
});
