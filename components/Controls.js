import React from 'react';
import ArmPad from './ArmPad.js';
import GamePad from './GamePad.js';
import RobotPad from './RobotPad.js';

export default function Controls({
  information,
  rotation,
  lastCommand,
  sendMessage,
}) {
  return (
    <>
      <GamePad
        sendMessage={sendMessage}
        rotation={rotation}
        information={information}
        lastCommand={lastCommand}
      />
      <ArmPad sendMessage={sendMessage} />
      <RobotPad sendMessage={sendMessage} />
      {/* <Arrows arrows={arrows} zeroPoint={zeroPoint} /> */}
    </>
  );
}
