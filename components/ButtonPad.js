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
        command="grab"
        cancelCommand="stop"
        color="green"
        style={{...styles.control, ...styles.grab}}
      />
      <Button
        sendMessage={sendMessage}
        command="loose"
        cancelCommand="stop"
        color="green"
        style={{...styles.control, ...styles.loose}}
      />
      <Button
        sendMessage={sendMessage}
        command="lookleft"
        cancelCommand="LRstop"
        color="orange"
        style={{...styles.control, ...styles.lookleft}}
      />
      <Button
        sendMessage={sendMessage}
        command="lookright"
        cancelCommand="LRstop"
        color="orange"
        style={{...styles.control, ...styles.lookright}}
      />
      <Button
        sendMessage={sendMessage}
        command="up"
        cancelCommand="UDstop"
        color="purple"
        style={{...styles.control, ...styles.up}}
      />
      <Button
        sendMessage={sendMessage}
        command="down"
        cancelCommand="UDstop"
        color="purple"
        style={{...styles.control, ...styles.down}}
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
  grab: {
    top: BUTTON_SIZE * 3.5,
    left: BUTTON_SIZE * 1.7,
  },
  loose: {
    top: BUTTON_SIZE * 3.5,
    left: BUTTON_SIZE * 0.5,
  },
  lookleft: {
    top: BUTTON_SIZE * 3.5,
    left: BUTTON_SIZE * -2.2,
  },
  lookright: {
    top: BUTTON_SIZE * 3.5,
    left: BUTTON_SIZE * -1,
  },
  up: {
    top: BUTTON_SIZE * 3.5,
    left: BUTTON_SIZE * -5,
  },
  down: {
    top: BUTTON_SIZE * 3.5,
    left: BUTTON_SIZE * -3.8,
  },
});
