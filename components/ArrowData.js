import React from 'react';
import {Text, View} from 'react-native';

export default function ArrowData({movement, zeroPoint}) {
  if (!zeroPoint) {
    return null;
  }

  return (
    <View>
      <Text>{`X: ${(movement.x - zeroPoint.x).toFixed(
        0,
      )} / ${movement.x.toFixed(3)}`}</Text>
      <Text>{`Y: ${(movement.y - zeroPoint.y).toFixed(
        0,
      )} / ${movement.y.toFixed(3)}`}</Text>
      <Text>{`Z: ${(movement.z - zeroPoint.z).toFixed(
        0,
      )} / ${movement.z.toFixed(3)}`}</Text>
    </View>
  );
}
