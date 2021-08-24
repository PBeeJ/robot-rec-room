import React from 'react';
import {StyleSheet, Button, View} from 'react-native';

export default function ToggleControls({zeroPoint, setZeroPoint, movement}) {
  const toggleControls = () => {
    if (zeroPoint) {
      setZeroPoint(null);
    } else {
      setZeroPoint(movement);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={toggleControls}
        title={zeroPoint ? 'Stop Controls' : 'Start Controls'}
        style={styles.button}
        color={zeroPoint ? 'darkred' : 'green'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
  },
  button: {
    marginBottom: 5,
    padding: 5,
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 5,
    fontSize: 16,
  },
});
