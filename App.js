import React, { useRef } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import UsageData from './components/UsageData.js';
import ButtonSet from './components/ButtonSet.js';
import buttons from './buttons.js';
import WS from 'react-native-websocket'

export default function App() {
  const ENABLE_VIDEO = false;
  const isLoading = false;
  const connectionStatus = 'CONNECTED'
  const usageData = ['99', '88', '77'];
  const DEFAULT_SPEED = 25;
  const socketRef = useRef();
  const sendMessage = () => {};
  const sendJsonMessage = () => {};
  
  // If we are not not connected, load the waiting graphic
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white", marginBottom: 10 }}>Loading</Text>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WS
          ref={socketRef}
          url="ws://192.168.1.10:8888"
          onOpen={() => {
            console.log('Socket connected!')

            // This will authorize the connection and start to recieve messages
            socketRef.current?.send('admin:123456')

            // Set the movement speed to 25% initially
            socketRef.current?.send(`wsB ${DEFAULT_SPEED}`);

          }}
          onMessage={console.log}
          onError={console.log}
          onClose={console.log}
          reconnect // Will try to reconnect onClose
        />
      <Text style={{ color: 'darkgreen' }}>
        {`Websocket ${connectionStatus}`}
      </Text>
      <UsageData data={usageData} />
      <ButtonSet
        buttons={buttons}
        sendMessage={socketRef.current?.send}
        sendJsonMessage={socketRef.current?.send}
        defaultSpeed={DEFAULT_SPEED}
      />
      {ENABLE_VIDEO === 'true' && <Video />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkturquoise',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
});
