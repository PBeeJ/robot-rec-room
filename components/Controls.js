import React from 'react';
import ArmPad from './ArmPad.js';
import GamePad from './GamePad.js';
import RobotPad from './RobotPad.js';
import GameInfo from './GameInfo.js';
import Video from './Video.js';

import {CAMERA_URL} from '@env';
import {View} from 'react-native';

export default function Controls({
  information,
  movement,
  lastCommand,
  movementSpeed,
  setMovementSpeed,
  sendMessage,
}) {
  return (
    <>
      <GamePad
        sendMessage={sendMessage}
        setMovementSpeed={setMovementSpeed}
        movementSpeed={movementSpeed}
      />
      <ArmPad sendMessage={sendMessage} />
      <RobotPad sendMessage={sendMessage} />
      {/* <Arrows arrows={arrows} zeroPoint={zeroPoint} /> */}
      <GameInfo
        lastCommand={lastCommand}
        movement={movement}
        speed={movementSpeed}
        information={information}
      />
      <Video url={`http://${CAMERA_URL}/video_feed`} width={200} height={100} />
    </>
  );
}
