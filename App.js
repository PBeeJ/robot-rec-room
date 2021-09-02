import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {orientation} from 'react-native-sensors';
import {setUpdateIntervalForType, SensorTypes} from 'react-native-sensors';
import {LogBox} from 'react-native';
import WS from 'react-native-websocket';

import Loading from './components/Loading.js';
import Controls from './components/Controls.js';
// import Video from './components/Video.js';

import {
  // CAMERA_URL,
  OFFLINE_MODE,
  WEBSOCKET_URL, // Ooh, look at me.
  DEFAULT_SPEED,
  SERVER_INFO_UPDATE_SPEED,
  ACELEROMETER_REFRESH,
} from '@env';

const isOnline = OFFLINE_MODE !== 'true';

LogBox.ignoreLogs(['NativeEventEmitter']); // Ignore NativeEventEmitter warnings
setUpdateIntervalForType(
  SensorTypes.orientation,
  parseInt(ACELEROMETER_REFRESH, 10),
); // Limit interval to 500ms

export default function App() {
  const socketRef = useRef();
  const [information, setInformation] = useState(null);
  const [rotation, setRotation] = useState(null);
  const [movementSpeed, setMovementSpeed] = useState(
    parseInt(DEFAULT_SPEED, 10),
  );
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
      setIsLoading(false);
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
    setLastCommand(`wsB ${DEFAULT_SPEED}`);
  }

  useEffect(() => {
    // This is where we get the orientation data
    const subscription = orientation.subscribe(({pitch, roll, yaw}) =>
      setRotation({pitch, roll, yaw}),
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
    <Pressable style={styles.container}>
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
            rotation={rotation}
            information={information}
            lastCommand={lastCommand}
            movementSpeed={movementSpeed}
            setMovementSpeed={setMovementSpeed}
            sendMessage={sendMessage}
          />
          {/* <Video url={`http://${CAMERA_URL}/video_feed`} /> */}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#888',
  },
});
