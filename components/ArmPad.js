import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ArrowLeft, ArrowRight, ArrowUp, ArrowDown} from 'react-native-feather';

import Button from './Button';

import {BUTTON_SIZE as SIZE} from '@env';
const BUTTON_SIZE = parseInt(SIZE, 10);

export default function ButtonPad({sendMessage}) {
  return (
    <View style={styles.container}>
      <Button
        icon={ArrowUp}
        iconSize={24}
        label="hand"
        sendMessage={sendMessage}
        command="handup"
        cancelCommand="HAstop"
        style={{...styles.control, ...styles.handUp}}
      />
      <Button
        icon={ArrowDown}
        iconSize={24}
        label="hand"
        sendMessage={sendMessage}
        command="handdown"
        cancelCommand="HAstop"
        style={{...styles.control, ...styles.handDown}}
      />
      <Button
        icon={ArrowLeft}
        iconSize={24}
        label="arm"
        sendMessage={sendMessage}
        command="armdown"
        cancelCommand="Armstop"
        style={{...styles.control, ...styles.armDown}}
      />
      <Button
        icon={ArrowRight}
        iconSize={24}
        label="arm"
        sendMessage={sendMessage}
        command="armup"
        cancelCommand="Armstop"
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
    zIndex: 1,
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
    zIndex: 10,
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
