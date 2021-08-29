import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {accelerometer} from 'react-native-sensors';
import {setUpdateIntervalForType, SensorTypes} from 'react-native-sensors';
import {LogBox} from 'react-native';
import WS from 'react-native-websocket';

import Loading from './components/Loading.js';
import Controls from './components/Controls.js';
// import Video from './components/Video.js';

import {
  // CAMERA_URL,
  OFFLINE_MODE,
  WEBSOCKET_URL,
  DEFAULT_SPEED,
  SERVER_INFO_UPDATE_SPEED,
  ACELEROMETER_REFRESH,
} from '@env';

const isOnline = OFFLINE_MODE !== 'true';

LogBox.ignoreLogs(['NativeEventEmitter']); // Ignore NativeEventEmitter warnings
setUpdateIntervalForType(
  SensorTypes.accelerometer,
  parseInt(ACELEROMETER_REFRESH, 10),
); // Limit interval to 500ms

export default function App() {
  const socketRef = useRef();
  const [information, setInformation] = useState(null);
  const [movement, setMovement] = useState(null);
  const [lastCommand, setLastCommand] = useState(null);
  const [isLoading, setIsLoading] = useState(isOnline && true); // Don't show loading when offline

  function sendMessage(message) {
    setLastCommand(message);
    if (socketRef?.current?.send) {
      socketRef?.current?.send(message);
    }
  }

  function handleMessage({data}) {
    // Don't parse the string if it contains the initial congratulation message
    if (typeof data === 'string' && !data.includes('congratulation')) {
      try {
        const message = JSON.parse(data);
        if (message.title === 'get_info') {
          setInformation(message.data);
        }
      } catch (e) {
        console.warn(e);
      }
    }
  }

  function handleOpen() {
    socketRef.current?.send('admin:123456'); // Authorize the connection
    socketRef.current?.send(`wsB ${DEFAULT_SPEED}`); // Set the default movement speed
    setIsLoading(false);
  }

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
    }, parseInt(SERVER_INFO_UPDATE_SPEED, 10));
    return () => clearInterval(timer);
  }, []);

  return (
    <Pressable
      style={styles.container}
      // onPressIn={handlePressIn}
      // onPressOut={handlePressOut}
    >
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
        <>
          <Controls
            movement={movement}
            information={information}
            lastCommand={lastCommand}
            defaultSpeed={DEFAULT_SPEED}
            sendMessage={sendMessage}
          />
          {/* <Video url={`http://${CAMERA_URL}/video`} width={200} height={100} /> */}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkturquoise',
    padding: 30,
  },
});
