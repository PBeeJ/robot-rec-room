import React, {useEffect, useRef, useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';

import WS from 'react-native-websocket';

import Loading from './components/Loading.js';
import Controls from './components/Controls.js';
// import Video from './components/Video.js';

import {
  // CAMERA_URL,
  OFFLINE_MODE,
  WEBSOCKET_URL, // Ooh, look at me.
  SERVER_INFO_UPDATE_SPEED,
} from '@env';

const isOnline = OFFLINE_MODE !== 'true';

export default function App() {
  const socketRef = useRef();
  const [information, setInformation] = useState(null);

  const [lastCommand, setLastCommand] = useState(null);
  const [isLoading, setIsLoading] = useState(isOnline && true); // Don't show loading when offline

  function sendMessage(message) {
    if (socketRef?.current?.send) {
      socketRef?.current?.send(message);
      if (message !== 'get_info') {
        console.log('message: ', message);
        setLastCommand(message);
      }
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
    sendMessage('admin:123456'); // Authorize the connection
  }

  useEffect(() => {
    let timer;
    // Fetch the info data
    clearInterval(timer);
    timer = setInterval(() => {
      sendMessage('get_info');
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
          onError={e => {
            console.error(e);
            setIsLoading(true);
          }}
          onClose={e => {
            console.error(e);
            setIsLoading(true);
          }}
          reconnect
        />
      )}
      {isLoading ? (
        <Loading message={`Connecting to ${WEBSOCKET_URL}`} />
      ) : (
        <>
          <Controls
            information={information}
            lastCommand={lastCommand}
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
