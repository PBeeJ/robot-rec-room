import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {accelerometer} from 'react-native-sensors';
import {setUpdateIntervalForType, SensorTypes} from 'react-native-sensors';
import {LogBox} from 'react-native';
import WS from 'react-native-websocket';

import Loading from './components/Loading.js';
import Controls from './components/Controls.js';

import {OFFLINE_MODE} from '@env';

const DEFAULT_VALUES = {x: 0, y: 0, z: 0};
const isOnline = OFFLINE_MODE !== 'true';
const TOLERANCE = {x: 2, y: 1.5, z: 1.5};
const WEBSOCKET_URL = '192.168.1.10:8888';
const DEFAULT_SPEED = 30; // percentage (0 to 100)
const INFO_UPDATE_SPEED = 10000; // fetch info every 10 seconds

LogBox.ignoreLogs(['NativeEventEmitter']); // Ignore NativeEventEmitter warnings
setUpdateIntervalForType(SensorTypes.accelerometer, 200); // Limit interval to 500ms

export default function App() {
  const socketRef = useRef();
  const [information, setInformation] = useState(['0', '0', '0']);
  const [movement, setMovement] = useState(DEFAULT_VALUES);
  const [arrowLengths, setArryLengths] = useState(DEFAULT_VALUES);
  // Deprecated: These are actly arrow labels.
  const [arrows, setArrows] = useState(DEFAULT_VALUES);
  const [zeroPoint, setZeroPoint] = useState(null);
  const [isLoading, setIsLoading] = useState(isOnline && true); // Don't show loading when offline

  const handleMessage = ({data}) => {
    // Don't parse the string if it contains the initial congratulation message
    if (typeof data === 'string' && !data.includes('congratulation')) {
      try {
        const message = JSON.parse(data);
        if (message.title === 'get_info') {
          setInformation(message.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleOpen = () => {
    socketRef.current?.send('admin:123456'); // Authorize the connection
    socketRef.current?.send(`wsB ${DEFAULT_SPEED}`); // Set the default movement speed
    setIsLoading(false);
  };

  // We want our range to be -10, 10, regardless of choice of zeroPoint
  function minusMovement(movement, zeroPoint) {
    const diff = movement - zeroPoint;
    if(diff < -10) {
      return diff + 20;
    } else if(diff > 10) {
      return diff - 20;
    }
    return diff;
  }

  useEffect(() => {
    function convertMovement(pos, a, b) {
      const diff = minusMovement(movement[pos], zeroPoint[pos]);
      if (Math.abs(diff) > TOLERANCE[pos]) {
        setArrows(m => ({...m, [pos]: a}));
      } else {
        setArrows(m => ({...m, [pos]: null}));
      }
      setArrowLengths(m => ({...m, [pos]: diff}))
    }

    if (zeroPoint) {
      convertMovement('x', 'forward', 'backward');
      convertMovement('y', 'right', 'left');
      convertMovement('z', 'forward', 'backward');
    }
  }, [movement, zeroPoint]);

  useEffect(() => {
    // If we have arrows data and we are loaded
    if (arrows && !isLoading) {
      socketRef.current?.send(arrows.y ? arrows.y : 'TS');
      socketRef.current?.send(arrows.z ? arrows.z : 'DS');
    }
  }, [arrows, isLoading]);

  useEffect(() => {
    // This is where we get the accelerometer data
    const subscription = accelerometer.subscribe(({x, y, z}) =>
      setMovement({x, y, z}),
    );

    // Unsubscribe on component unmount
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let timer;
    // Fetch the info data
    clearInterval(timer);
    timer = setInterval(() => {
      if (socketRef.current?.send) {
        socketRef.current?.send('get_info');
      }
    }, INFO_UPDATE_SPEED);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      {isOnline && (
        <WS
          ref={socketRef}
          url={`ws://${WEBSOCKET_URL}`}
          onOpen={handleOpen}
          onMessage={handleMessage}
          onError={console.log}
          onClose={console.log}
          reconnect
        />
      )}
      {isLoading ? (
        <Loading message={`Connecting to ${WEBSOCKET_URL}`} />
      ) : (
        <Controls
          setZeroPoint={setZeroPoint}
          movement={movement}
          zeroPoint={zeroPoint}
          arrows={arrows}
          information={information}
          defaultSpeed={DEFAULT_SPEED}
          sendMessage={socketRef?.current?.send}
        />
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
