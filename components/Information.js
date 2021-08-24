import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Information({data}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`CPU temp: ${data[0]}°C`}</Text>
      <Text style={styles.text}>{`CPU usage: ${data[1]}%`}</Text>
      <Text style={styles.text}>{`RAM usage: ${data[2]}%`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    display: 'flex',
    marginBottom: 40,
    padding: 10,
    borderRadius: 3,
  },
  text: {
    color: 'white',
  },
});
