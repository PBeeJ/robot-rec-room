import React, {useRef, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import WebsocketConnection from './components/WebsocketConnection.js';
import Information from './components/Information.js';
import ButtonSet from './components/ButtonSet.js';
import Arrows from './components/Arrows.js';
import ArrowData from './components/ArrowData.js';
import ToggleControls from './components/ToggleControls.js';
import buttons from './buttons.js';

import {accelerometer} from 'react-native-sensors';
import {setUpdateIntervalForType, SensorTypes} from 'react-native-sensors';
setUpdateIntervalForType(SensorTypes.accelerometer, 50); // Limit interval to 500ms

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['NativeEventEmitter']); // Ignore NativeEventEmitter warnings

const DEFAULT_VALUES = {x: 0, y: 0, z: 0};

export default function App() {
  const [information, setInformation] = useState(['0', '0', '0']);
  const [movement, setMovement] = useState(DEFAULT_VALUES);
  const [arrows, setArrows] = useState(DEFAULT_VALUES);
  const [zeroPoint, setZeroPoint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const socketRef = useRef();
  const connectionStatus = 'CONNECTED';
  const DEFAULT_SPEED = 25; // percentage (0 to 100)
  const movementTolerance = 3;
  const WEBSOCKET_URL = '192.168.1.10:8888';

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
    // This is where we get the accelerometer data
    const subscription = accelerometer.subscribe(({x, y, z}) =>
      setMovement({x, y, z}),
    );

    // Unsubscribe on component unmount
    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <WebsocketConnection
        url={WEBSOCKET_URL}
        setIsLoading={setIsLoading}
        setInformation={setInformation}
        defaultSpeed={DEFAULT_SPEED}
      />
      {isLoading ? (
        <>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.text}>{`Connecting to ${WEBSOCKET_URL}`}</Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>{`Websocket ${connectionStatus}`}</Text>
          <ToggleControls
            setZeroPoint={setZeroPoint}
            movement={movement}
            zeroPoint={zeroPoint}
          />
          {<Arrows arrows={arrows} zeroPoint={zeroPoint} />}
          {<ArrowData movement={movement} zeroPoint={zeroPoint} />}
          <Information data={information} />
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
  text: {
    textAlign: 'center',
    marginTop: 20,
    color: 'white',
  },
});
