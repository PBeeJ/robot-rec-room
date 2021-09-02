import React from 'react';
import ArmPad from './ArmPad.js';
import GamePad from './GamePad.js';
import RobotPad from './RobotPad.js';
import GameInfo from './GameInfo.js';

export default function Controls({
  information,
  rotation,
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
        rotation={rotation}
        speed={movementSpeed}
        information={information}
      />
    </>
  );
}
