import React from 'react';
import {StyleSheet, View} from 'react-native';

import Button from './Button';

import {BUTTON_SIZE as SIZE} from '@env';
const BUTTON_SIZE = parseInt(SIZE, 10);

export default function ButtonPad({sendMessage}) {
  return (
    <View style={styles.container}>
      <Button
        sendMessage={sendMessage}
        command="handUp"
        cancelCommand="HAstop"
        color="red"
        style={{...styles.control, ...styles.handUp}}
      />
      <Button
        sendMessage={sendMessage}
        command="handDown"
        cancelCommand="HAstop"
        color="red"
        style={{...styles.control, ...styles.handDown}}
      />
      <Button
        sendMessage={sendMessage}
        command="armUp"
        cancelCommand="Armstop"
        color="blue"
        style={{...styles.control, ...styles.armUp}}
      />
      <Button
        sendMessage={sendMessage}
        command="armDown"
        cancelCommand="Armstop"
        color="blue"
        style={{...styles.control, ...styles.armDown}}
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
});
