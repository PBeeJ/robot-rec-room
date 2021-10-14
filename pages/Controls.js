import React from 'react';
import ArmPad from '../components/ArmPad.js'
import GamePad from '../components/GamePad.js';
import RobotPad from '../components/RobotPad.js';
import Video from '../components/Video.js';

export default function Controls({
  information,
  lastCommand,
  sendMessage,
  IPAddress
}) {
  return (
    <>
      <GamePad
        sendMessage={sendMessage}
        information={information}
        lastCommand={lastCommand}
      />
      <ArmPad sendMessage={sendMessage} />
      <RobotPad sendMessage={sendMessage} />
      <Video url={`http://${IPAddress}:5000/video_feed`} />
    </>
  );
}
