/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import WS from 'react-native-websocket';

import { Home as HomeIcon, Sliders as ControlsIcon } from 'react-native-feather';
import {
  ICON_SIZE,
  BUTTON_SIZE,
  OFFLINE_MODE,
  WEBSOCKET_PORT,
  SERVER_INFO_UPDATE_SPEED,
} from '@env';
import Controls from './pages/Controls.js';
import Home from './pages/Home.js';
import storage from './storage.js';

const isOnline = OFFLINE_MODE !== 'true';
const INITIAL_OPTIONS = [];

export default function App() {
  const socketRef = useRef();
  const [information, setInformation] = useState(null);
  const [IPAddress, setIPAddress] = useState(null);
  const [options, setOptions] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastCommand, setLastCommand] = useState(null);
  const isEnabled = isConnected || !isOnline;

  function sendMessage(message) {
    if (isConnected && socketRef?.current?.send) {
      socketRef?.current?.send(message);
      if (message !== 'get_info') {
        setLastCommand(message);
      }
    }
  }

  function handleMessage({ data }) {
    console.log('data: ', data);
    // Don't parse the string if it contains the initial congratulation message
    if (typeof data === 'string' && !data.includes('congratulation')) {
      try {
        const message = JSON.parse(data);
        if (message.title === 'get_info') {
          setInformation(message.data);
        }
      } catch (e) {
        console.warn(e.message);
      }
    }
  }

  function handleOpen() {
    console.log('Connection opened');
    sendMessage('admin:123456'); // Authorize the connection
    setIsConnected(true);
  }

  function handleError({ message }) {
    console.log('Connection error:', message);
    setIsConnected(null);
  }

  function handleClose() {
    console.log('Connection closed');
    setIsConnected(false);
  }

  // Fetch initial options from storage
  useEffect(() => {
    storage
      .load({ key: 'options', autoSync: true, syncInBackground: true })
      .then((initialOptions) => setOptions(initialOptions.length ? initialOptions : INITIAL_OPTIONS))
      .catch((err) => console.warn(err.message));
  }, []);

  // Persist options to storage
  useEffect(() => {
    if (options.length) {
      storage
        .save({ key: 'options', data: options })
        .catch((err) => console.warn(err.message));
    }
  }, [options]);

  useEffect(() => {
    if (IPAddress) {
      let timer;
      // Fetch the info data
      clearInterval(timer);
      timer = setInterval(() => {
        sendMessage('get_info');
      }, parseInt(SERVER_INFO_UPDATE_SPEED, 10));
      return () => clearInterval(timer);
    }
  }, [IPAddress]);

  return (
    <View style={styles.container}>
      {isOnline && IPAddress !== null && (
        <WS
          ref={socketRef}
          url={`ws://${IPAddress}:${WEBSOCKET_PORT}`}
          onOpen={handleOpen}
          onClose={handleClose}
          onMessage={handleMessage}
          onError={handleError}
          reconnect // Will try to reconnect onClose
        />
      )}
      <NativeRouter>
        <View style={styles.nav}>
          <Link to="/" style={{ ...styles.navItem, borderColor: 'orange' }}>
            <HomeIcon
              stroke="orange"
              fill="none"
              width={parseInt(ICON_SIZE, 10)}
              height={parseInt(ICON_SIZE, 10)}
              strokeWidth={1.5}
            />
          </Link>
          <Link
            to={isEnabled ? '/controls' : undefined}
            style={{ ...styles.navItem, borderColor: isEnabled ? 'lightgreen' : 'grey' }}>
            <ControlsIcon
              stroke={isEnabled ? 'lightgreen' : 'grey'}
              width={parseInt(ICON_SIZE, 10)}
              height={parseInt(ICON_SIZE, 10)}
              strokeWidth={1.5}
            />
          </Link>
        </View>
        <Route exact path="/">
          <Home
            isOnline={isOnline}
            isConnected={isConnected}
            setIsConnected={setIsConnected}
            setIPAddress={setIPAddress}
            IPAddress={IPAddress}
            options={options}
            setOptions={setOptions}
          />
        </Route>
        <Route path="/controls">
          <Controls
            information={information}
            lastCommand={lastCommand}
            sendMessage={sendMessage}
            IPAddress={IPAddress}
          />
        </Route>
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
  },
  nav: {
    position: 'absolute',
    top: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    zIndex: 2,
  },
  navItem: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 1,
    width: parseInt(BUTTON_SIZE, 10),
    height: parseInt(BUTTON_SIZE, 10),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
});
