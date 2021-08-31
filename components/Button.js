import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

import {BUTTON_SIZE, ICON_SIZE} from '@env';

// TODO: use hitSlop to make the button hit area bigger

export default function Button({
  sendMessage,
  command,
  cancelCommand,
  style,
  icon,
  iconSize,
  iconColor,
  label,
}) {
  const Icon = icon;
  const defaultIconSize = iconSize || parseInt(ICON_SIZE, 10) || 30;
  const buttonSize = parseInt(BUTTON_SIZE, 10) || 50;

  return (
    <Pressable
      android_ripple={{
        color: 'rgba(0,0,0,0.2)',
        borderless: true,
        radius: buttonSize,
      }}
      style={style}
      onPressIn={() => {
        console.log('command: ', command);
        command && sendMessage(command);
      }}
      onPressOut={() => cancelCommand && sendMessage(cancelCommand)}>
      {icon && (
        <Icon
          stroke={iconColor || 'brown'}
          width={defaultIconSize}
          height={defaultIconSize}
          style={styles.icon}
        />
      )}
      {label && <Text style={styles.text}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    textTransform: 'capitalize',
    fontWeight: '700',
    fontSize: 8,
    lineHeight: 8,
    position: 'absolute',
    bottom: -15,
    color: 'white',
  },
  icon: {
    position: 'relative',
    zIndex: 1,
  },
});
