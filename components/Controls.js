import React from 'react';
import ArmPad from './ArmPad.js';
import GamePad from './GamePad.js';
import RobotPad from './RobotPad.js';
import GameInfo from './GameInfo.js';

export default function Controls({
  information,
  movement,
  lastCommand,
  defaultSpeed,
  sendMessage,
}) {
  return (
    <>
      <GamePad sendMessage={sendMessage} />
      <ArmPad sendMessage={sendMessage} />
      <RobotPad sendMessage={sendMessage} />
      {/* <Arrows arrows={arrows} zeroPoint={zeroPoint} /> */}
      <GameInfo
        lastCommand={lastCommand}
        movement={movement}
        speed={defaultSpeed}
        information={information}
      />
    </>
  );
}
