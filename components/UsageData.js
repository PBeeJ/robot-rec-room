import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function UsageData({data}) {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>{`CPU temp: ${data[0]}°C`}</Text>
      <Text style={{color: 'white'}}>{`CPU usage: ${data[1]}%`}</Text>
      <Text style={{color: 'white'}}>{`RAM usage: ${data[2]}%`}</Text>
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
});
