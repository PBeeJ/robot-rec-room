import React from 'react';
import ArmPad from '../components/ArmPad.js'
import GamePad from '../components/GamePad.js';
import RobotPad from '../components/RobotPad.js';
// import Arrows from '../components/Arrows.js';

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
