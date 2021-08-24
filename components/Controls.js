import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Information from './Information.js';
import ButtonSet from './ButtonSet.js';
import Arrows from './Arrows.js';
import ArrowData from './ArrowData.js';
import ToggleControls from './ToggleControls.js';
import buttons from '../buttons.js';

export default function Controls({
  setZeroPoint,
  movement,
  zeroPoint,
  arrows,
  information,
  defaultSpeed,
  sendMessage,
  sendJsonMessage,
}) {
  const connectionStatus = 'CONNECTED';
  // TODO: figure out how to get the connection status

  const isLandscape = true;
  // TODO: figure out how to get this from the device

  return (
    <>
      {!isLandscape && (
        <Text style={styles.title}>{`Websocket ${connectionStatus}`}</Text>
      )}
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
        sendMessage={sendMessage}
        sendJsonMessage={sendJsonMessage}
        defaultSpeed={defaultSpeed}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
});
