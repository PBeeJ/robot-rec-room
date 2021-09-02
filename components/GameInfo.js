import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {WEBSOCKET_URL} from '@env'; // I'm a file edit for the magic to recognize a change has happened.

function Item({name}) {
  return <Text style={styles.text}>{name}</Text>;
}

export default function GameInfo({lastCommand, rotation, speed, information}) {
  function formatValue(value) {
    return value.toFixed(2);
  }

  return (
    <View style={styles.container}>
      {!isNaN(speed) && (
        <View style={styles.wrapper}>
          <Text style={styles.title}>Config</Text>
          <View style={styles.column}>
            <Item name={`server: ${WEBSOCKET_URL}`} />
            <Item name={`movement speed: ${speed}%`} />
          </View>
        </View>
      )}
      {information && (
        <View style={styles.wrapper}>
          <Text style={styles.title}>Server</Text>
          <View style={styles.column}>
            <Item name={`CPU temp: ${information[0]}°C`} />
            <Item name={`CPU usage: ${information[1]}%`} />
            <Item name={`RAM usage: ${information[2]}%`} />
          </View>
        </View>
      )}
      {rotation && (
        <View style={styles.wrapper}>
          <Text style={styles.title}>Orientation</Text>
          <View style={styles.column}>
            <Item name={`pitch: ${formatValue(rotation.pitch)}`} />
            <Item name={`roll: ${formatValue(rotation.roll)}`} />
            <Item name={`yaw: ${formatValue(rotation.yaw)}`} />
          </View>
        </View>
      )}
      {lastCommand && (
        <View style={styles.wrapper}>
          <Text style={styles.title}>Last command</Text>
          <View style={styles.column}>
            <Item name={lastCommand} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'row',
  },
  wrapper: {
    paddingRight: 20,
  },
  column: {
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    color: 'white',
    fontSize: 9,
  },
  title: {
    color: 'white',
    fontSize: 9,
    fontWeight: '600',
  },
});
