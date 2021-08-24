/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import WS from 'react-native-websocket';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import UsageData from './components/UsageData.js';
import ButtonSet from './components/ButtonSet.js';
import Arrows from './components/Arrows.js';
import buttons from './buttons.js';

import {accelerometer} from 'react-native-sensors';
import {setUpdateIntervalForType, SensorTypes} from 'react-native-sensors';
setUpdateIntervalForType(SensorTypes.accelerometer, 50); // Limit interval to 500ms

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['NativeEventEmitter']); // Ignore NativeEventEmitter warnings

const DEFAULT_VALUES = {x: 0, y: 0, z: 0};

export default function App() {
  const [usageData, setUsageData] = useState(['0', '0', '0']);
  const [movement, setMovement] = useState(DEFAULT_VALUES);
  const [arrows, setArrows] = useState(DEFAULT_VALUES);
  const [zeroPoint, setZeroPoint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const socketRef = useRef();
  const connectionStatus = 'CONNECTED';
  const DEFAULT_SPEED = 25; // percentage (0 to 100)
  const INFO_UPDATE_SPEED = 10000; // fetch info every 10 seconds
  const movementTolerance = 3;

  const toggleControls = () => {
    if (zeroPoint) {
      setZeroPoint(null);
    } else {
      setZeroPoint(movement);
    }
  };

  useEffect(() => {
    if (zeroPoint) {
      if (movement.x - zeroPoint.x > movementTolerance) {
        setArrows(a => ({...a, x: 'left'}));
      } else if (movement.x - zeroPoint.x < -1 * movementTolerance) {
        setArrows(a => ({...a, x: 'right'}));
      } else {
        setArrows(a => ({...a, x: null}));
      }
      if (movement.y - zeroPoint.y > movementTolerance) {
        setArrows(a => ({...a, y: 'backward'}));
      } else if (movement.y - zeroPoint.y < -1 * movementTolerance) {
        setArrows(a => ({...a, y: 'forward'}));
      } else {
        setArrows(a => ({...a, y: null}));
      }
      if (movement.z - zeroPoint.z > movementTolerance) {
        setArrows(a => ({...a, z: 'forward'}));
      } else if (movement.z - zeroPoint.z < -1 * movementTolerance) {
        setArrows(a => ({...a, z: 'backward'}));
      } else {
        setArrows(a => ({...a, z: null}));
      }
    }
  }, [movement, zeroPoint]);

  useEffect(() => {
    let timer;
    // Fetch the usage data
    clearInterval(timer);
    timer = setInterval(() => {
      if (socketRef.current?.send) {
        socketRef.current?.send('get_info');
      }
    }, INFO_UPDATE_SPEED);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const subscription = accelerometer.subscribe(({x, y, z}) =>
      setMovement({x, y, z}),
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <WS
        ref={socketRef}
        url="ws://192.168.1.10:8888"
        onOpen={() => {
          console.log('Socket connected!');

          // This will authorize the connection and start to recieve messages
          socketRef.current?.send('admin:123456');

          // Set the movement speed to 25% initially
          socketRef.current?.send(`wsB ${DEFAULT_SPEED}`);

          setIsLoading(false);
        }}
        onMessage={({data}) => {
          // Don't parse the string if it contains the initial congratulation message
          if (typeof data === 'string' && !data.includes('congratulation')) {
            try {
              const message = JSON.parse(data);
              if (message.title === 'get_info') {
                setUsageData(message.data);
              }
            } catch (e) {
              console.log(e);
            }
          }
        }}
        onError={console.warn}
        onClose={console.log}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={styles.title}>{`Websocket ${connectionStatus}`}</Text>
      )}
      {!isLoading && zeroPoint && <Arrows arrows={arrows} />}
      {!isLoading && zeroPoint && (
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
      )}
      {!isLoading && (
        <>
          <Pressable onPress={toggleControls}>
            <Text
              title="description"
              style={{
                marginBottom: 5,
                padding: 5,
                backgroundColor: 'green',
                color: 'white',
                borderRadius: 5,
                fontSize: 16,
              }}>
              {zeroPoint ? 'Stop Controls' : 'Start Controls'}
            </Text>
          </Pressable>
          <UsageData data={usageData} />
          <ButtonSet
            buttons={buttons}
            sendMessage={socketRef.current?.send}
            sendJsonMessage={socketRef.current?.send}
            defaultSpeed={DEFAULT_SPEED}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkturquoise',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
});
