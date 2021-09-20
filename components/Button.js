import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

import {BUTTON_SIZE, ICON_SIZE} from '../App';

// TODO: use hitSlop to make the button hit area bigger

export default function Button({
  onPressIn,
  onPressOut,
  style,
  icon,
  iconSize,
  iconColor,
  label,
  disabled,
}) {
  const Icon = icon;
  const defaultIconSize = iconSize || parseInt(ICON_SIZE, 10) || 30;

  return (
    <Pressable
      android_ripple={{
        color: 'rgba(0,0,0,0.2)',
        borderless: true,
        radius: BUTTON_SIZE,
      }}
      disabled={disabled}
      style={style}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
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
