import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ArrowLeft, ArrowRight, ArrowUp, ArrowDown} from 'react-native-feather';

import Button from './Button';

import {BUTTON_SIZE as SIZE} from '@env';
const BUTTON_SIZE = parseInt(SIZE, 10);

export default function ButtonPad({sendMessage}) {
  const onPressOut = () => {
    // Aggh... sent ALL the stop commands!!
    sendMessage('HAstop');
    sendMessage('Armstop');
  };

  return (
    <View style={styles.container}>
      <Button
        icon={ArrowUp}
        iconSize={24}
        label="hand"
        onPressIn={() => sendMessage('handup')}
        onPressOut={onPressOut}
        style={{...styles.control, ...styles.handUp}}
      />
      <Button
        icon={ArrowDown}
        iconSize={24}
        label="hand"
        onPressIn={() => sendMessage('handdown')}
        onPressOut={onPressOut}
        style={{...styles.control, ...styles.handDown}}
      />
      <Button
        icon={ArrowLeft}
        iconSize={24}
        label="arm"
        onPressIn={() => sendMessage('armdown')}
        onPressOut={onPressOut}
        style={{...styles.control, ...styles.armDown}}
      />
      <Button
        icon={ArrowRight}
        iconSize={24}
        label="arm"
        onPressIn={() => sendMessage('armup')}
        onPressOut={onPressOut}
        style={{...styles.control, ...styles.armUp}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 35,
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
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  armUp: {
    top: BUTTON_SIZE,
    left: BUTTON_SIZE * 2,
  },
  armDown: {
    top: BUTTON_SIZE,
    left: 0,
  },
  handUp: {
    top: 0,
    left: BUTTON_SIZE,
  },
  handDown: {
    top: BUTTON_SIZE * 2,
    left: BUTTON_SIZE,
  },
});
