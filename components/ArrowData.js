import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function ArrowData({movement, zeroPoint}) {
  if (!zeroPoint) {
    return null;
  }

  function DataItem({pos}) {
    const value = zeroPoint ? Math.round(movement[pos] - zeroPoint[pos]) : 0;
    const rawValue = movement[pos]?.toFixed(1);

    return <Text>{`${pos}: ${value} / ${rawValue}`}</Text>;
  }

  return (
    <View style={styles.container}>
      <DataItem pos="x" />
      <DataItem pos="y" />
      <DataItem pos="z" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
