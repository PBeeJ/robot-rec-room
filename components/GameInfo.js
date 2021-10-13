import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// eslint-disable-next-line import/no-unresolved
import { WEBSOCKET_URL } from '@env';

function Item({ name }) {
  return <Text style={styles.text}>{name}</Text>;
}

function formatValue(value) {
  return value.toFixed(2);
}

export default function GameInfo({
  movementSpeed,
  lastCommand,
  rotation,
  information,
  dragPosition,
}) {
  const convertedX = Math.round((dragPosition.x - 40) * 2);
  const convertedY = Math.round((dragPosition.y - 40) * 2);

  return (
    <View style={styles.container}>
      {!Number.isNaN(movementSpeed) && (
        <View style={styles.wrapper}>
          <Text style={styles.title}>Config</Text>
          <View style={styles.column}>
            <Item name={`server: ${WEBSOCKET_URL}`} />
            <Item name={`movement speed: ${movementSpeed}%`} />
            <Item name={`horizontal: ${convertedX}%`} />
            <Item name={`vertical: ${convertedY}%`} />
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
