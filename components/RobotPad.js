import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  Sliders,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  RotateCw,
  Plus,
  Minus,
} from 'react-native-feather';

// eslint-disable-next-line import/no-unresolved
import { BUTTON_SIZE as SIZE } from '@env';
import Button from './Button';

const BUTTON_SIZE = parseInt(SIZE, 10);

export default function RobotPad({ sendMessage }) {
  const containerWidth = styles.draggable.left * -1;
  const [dragPosition, setDragPosition] = useState(containerWidth + 95);
  const [start, setStart] = useState(null);

  function handleStart({ nativeEvent }) {
    const { pageX } = nativeEvent;
    setStart(pageX);
    return true;
  }

  function handleMove({ nativeEvent }) {
    const { pageX } = nativeEvent;
    const position = Math.round(pageX - containerWidth);
    setDragPosition(position);
    return true;
  }

  function handleEnd({ nativeEvent }) {
    const { pageX } = nativeEvent;
    const distanceDragged = Math.abs(start - pageX);

    if (distanceDragged < 10) {
      // Tap detected
      if (dragPosition < 10) {
        setDragPosition(containerWidth + 95);
      } else {
        setDragPosition(0);
      }
    } else {
      const pos = dragPosition < containerWidth / 2 + 60;
      // Drag detected
      if (pos) {
        setDragPosition(0);
      } else {
        setDragPosition(containerWidth + 95);
      }
    }
  }

  // TODO: read through the code and add comments where things are unclear

  const right = dragPosition
    ? styles.container.right - dragPosition
    : styles.container.right;

  return (
    <View
      style={[styles.container, right]}
      onStartShouldSetResponder={handleStart}
      onResponderMove={handleMove}
      onResponderRelease={handleEnd}>
      <View style={[styles.control, styles.draggable]}>
        <Sliders stroke="white" width={30} height={30} />
        <Text style={styles.text}>controls</Text>
      </View>
      <Button
        icon={Plus}
        iconSize={24}
        label="claw"
        onPressIn={() => sendMessage('grab')}
        onPressOut={() => sendMessage('stop')}
        style={[styles.control, styles.grab]}
      />
      <Button
        icon={Minus}
        iconSize={24}
        label="claw"
        onPressIn={() => sendMessage('loose')}
        onPressOut={() => sendMessage('stop')}
        style={[styles.control, styles.loose]}
      />
      <Button
        icon={RotateCcw}
        iconSize={24}
        label="claw"
        onPressIn={() => sendMessage('lookleft')}
        onPressOut={() => sendMessage('LRstop')}
        style={[styles.control, styles.lookleft]}
      />
      <Button
        icon={RotateCw}
        iconSize={24}
        label="claw"
        onPressIn={() => sendMessage('lookright')}
        onPressOut={() => sendMessage('LRstop')}
        style={[styles.control, styles.lookright]}
      />
      <Button
        icon={ArrowUp}
        iconSize={24}
        label="camera"
        onPressIn={() => sendMessage('up')}
        onPressOut={() => sendMessage('UDstop')}
        style={[styles.control, styles.up]}
      />
      <Button
        icon={ArrowDown}
        iconSize={24}
        label="camera"
        onPressIn={() => sendMessage('down')}
        onPressOut={() => sendMessage('UDstop')}
        style={[styles.control, styles.down]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
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
  draggable: {
    top: BUTTON_SIZE * 3.5,
    left: BUTTON_SIZE * -6.6,
    backgroundColor: 'rgba(255,255,255,0.25)',
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
  text: {
    textTransform: 'capitalize',
    fontWeight: '700',
    fontSize: 8,
    lineHeight: 8,
    position: 'absolute',
    bottom: -15,
    color: 'white',
  },
});
