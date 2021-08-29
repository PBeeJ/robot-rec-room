import React from 'react';
import {Pressable} from 'react-native';

import {BUTTON_SIZE} from '@env';

export default function Button({
  sendMessage,
  command,
  cancelCommand,
  color,
  style,
}) {
  return (
    <Pressable
      android_ripple={{
        color,
        borderless: true,
        radius: BUTTON_SIZE / 1.7,
      }}
      style={style}
      onPressIn={() => sendMessage(command)}
      onPressOut={() => sendMessage(cancelCommand)}
    />
  );
}
