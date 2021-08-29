import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {WEBSOCKET_URL} from '@env';

function Item({name}) {
  return <Text style={styles.text}>{name}</Text>;
}

export default function Information({movement, zeroPoint, speed, information}) {
  function getValue(axis) {
    const value = zeroPoint[axis] - movement[axis];
    return value.toFixed(0);
  }

  return (
    <View style={styles.container}>
      {speed && (
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
      {movement && (
        <View style={styles.wrapper}>
          <Text style={styles.title}>Movement</Text>
          <View style={styles.column}>
            <Item name={`x: ${movement.x.toFixed(0)}`} />
            <Item name={`y: ${movement.y.toFixed(0)}`} />
            <Item name={`z: ${movement.z.toFixed(0)}`} />
          </View>
        </View>
      )}
      {zeroPoint && (
        <View style={styles.wrapper}>
          <Text style={styles.title}>Zero</Text>
          <View style={styles.column}>
            <Item name={`x: ${zeroPoint.x.toFixed(0)}`} />
            <Item name={`y: ${zeroPoint.y.toFixed(0)}`} />
            <Item name={`z: ${zeroPoint.z.toFixed(0)}`} />
          </View>
        </View>
      )}
      {zeroPoint && (
        <View style={styles.wrapper}>
          <Text style={styles.title}>Value</Text>
          <View style={styles.column}>
            <Item name={`x: ${getValue('x')}`} />
            <Item name={`y: ${getValue('y')}`} />
            <Item name={`z: ${getValue('z')}`} />
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
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    zIndex: 1,
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
