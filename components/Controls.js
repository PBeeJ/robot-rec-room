import React from 'react';
// import Arrows from './Arrows.js';
import GamePad from './GamePad.js';
import ButtonPad from './ButtonPad.js';
import GameInfo from './GameInfo.js';

export default function Controls({
  information,
  movement,
  zeroPoint,
  // arrows,
  defaultSpeed,
  sendMessage,
}) {
  return (
    <>
      <GamePad sendMessage={sendMessage} />
      <ButtonPad sendMessage={sendMessage} />
      {/* <Arrows arrows={arrows} zeroPoint={zeroPoint} /> */}
      <GameInfo
        movement={movement}
        zeroPoint={zeroPoint}
        speed={defaultSpeed}
        information={information}
      />
    </>
  );
}
