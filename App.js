/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeRouter, Route, Link} from 'react-router-native';
import WS from 'react-native-websocket';

import Loading from './components/Loading.js';
import Controls from './components/Controls.js';
import Home from './components/Home.js';
import {Home as HomeIcon, Sliders as ControlsIcon} from 'react-native-feather';
import storage from './storage.js';

import {
  ICON_SIZE,
  BUTTON_SIZE,
  OFFLINE_MODE,
  WEBSOCKET_PORT,
  SERVER_INFO_UPDATE_SPEED,
} from '@env';

const isOnline = OFFLINE_MODE !== 'true';
const INITIAL_OPTIONS = [
  {name: 'Phineas', address: '192.168.1.10'},
  {name: 'Passable', address: '10.1.1.10'},
];
export default function App() {
  const socketRef = useRef();
  const [information, setInformation] = useState(null);
  const [IPAddress, setIPAddress] = useState('192.168.1.10');
  const [options, setOptions] = useState([]);

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
    // Fetch initial options from storage
    storage
      .load({
        key: 'options',

        // autoSync (default: true) means if data is not found or has expired,
        // then invoke the corresponding sync method
        autoSync: true,

        // syncInBackground (default: true) means if data expired,
        // return the outdated data first while invoking the sync method.
        // If syncInBackground is set to false, and there is expired data,
        // it will wait for the new data and return only after the sync completed.
        // (This, of course, is slower)
        syncInBackground: true,

        // you can pass extra params to the sync method
        // see sync example below
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true,
        },
      })
      .then(initialOptions => {
        // found data go to then()
        console.log('initialOptions: ', initialOptions);
        setOptions(initialOptions.length ? initialOptions : INITIAL_OPTIONS);
      })
      .catch(err => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
      });
  }, []);

  useEffect(() => {
    if (options.length) {
      storage.save({
        key: 'options',
        data: options,
      });
    }
  }, [options]);

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
    <View style={styles.container}>
      {isOnline && (
        <WS
          ref={socketRef}
          url={`ws://${IPAddress}:${WEBSOCKET_PORT}`}
          onOpen={handleOpen}
          onMessage={handleMessage}
          onError={console.log}
          onClose={console.log}
          reconnect
        />
      )}
      {isLoading ? (
        <Loading
          message={`Connecting to ${IPAddress} on port ${WEBSOCKET_PORT}`}
        />
      ) : (
        <NativeRouter>
          <View style={styles.nav}>
            <Link to="/" style={{...styles.navItem, borderColor: 'orange'}}>
              <HomeIcon
                stroke="orange"
                fill="none"
                width={parseInt(ICON_SIZE, 10)}
                height={parseInt(ICON_SIZE, 10)}
                strokeWidth={1.5}
              />
            </Link>
            <Link
              to="/controls"
              style={{...styles.navItem, borderColor: 'lightgreen'}}>
              <ControlsIcon
                stroke="lightgreen"
                width={parseInt(ICON_SIZE, 10)}
                height={parseInt(ICON_SIZE, 10)}
                strokeWidth={1.5}
              />
            </Link>
          </View>
          <Route exact path="/">
            <Home
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
            />
          </Route>
        </NativeRouter>
      )}
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
