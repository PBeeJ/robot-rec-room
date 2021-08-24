import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

export default function ToggleControls({zeroPoint, setZeroPoint, movement}) {
  const toggleControls = () => {
    if (zeroPoint) {
      setZeroPoint(null);
    } else {
      setZeroPoint(movement);
    }
  };

  return (
    <Pressable onPress={toggleControls}>
      <Text title="description" style={styles.container}>
        {zeroPoint ? 'Stop Controls' : 'Start Controls'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    padding: 5,
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 5,
    fontSize: 16,
  },
});
