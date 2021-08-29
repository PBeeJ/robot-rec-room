import React from 'react';
import {Pressable} from 'react-native';

function handlePress() {}

export default function Button({radius, color, style}) {
  return (
    <Pressable
      android_ripple={{
        color,
        borderless: true,
        radius,
      }}
      style={style}
      onPress={handlePress}
    />
  );
}
