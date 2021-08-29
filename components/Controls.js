import React from 'react';
import ButtonSet from './ButtonSet.js';
import Arrows from './Arrows.js';
import ArrowData from './ArrowData.js';
// import ToggleControls from './ToggleControls.js';
import GrowyArrows from './GrowyArrows.js';
import buttons from '../buttons.js';
import GamePad from './GamePad.js';
import ButtonPad from './ButtonPad.js';

export default function Controls({
  setZeroPoint,
  movement,
  zeroPoint,
  arrows,
  defaultSpeed,
  sendMessage,
  sendJsonMessage,
}) {
  return (
    <>
      <GamePad />
      <ButtonPad />
      {/* <ToggleControls
        setZeroPoint={setZeroPoint}
        movement={movement}
        zeroPoint={zeroPoint}
      /> */}
      {/* <ButtonSet
        buttons={buttons}
        sendMessage={sendMessage}
        sendJsonMessage={sendJsonMessage}
        defaultSpeed={defaultSpeed}
      /> */}
      <Arrows arrows={arrows} zeroPoint={zeroPoint} />
      <GrowyArrows arrows={arrows} zeroPoint={zeroPoint} />
      <ArrowData movement={movement} zeroPoint={zeroPoint} />
    </>
  );
}
