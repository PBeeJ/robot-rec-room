import React, {useRef, useEffect} from 'react';
import WS from 'react-native-websocket';

const INFO_UPDATE_SPEED = 10000; // fetch info every 10 seconds

export default function WebsocketConnection({
  setInformation,
  url,
  setIsLoading,
  defaultSpeed,
}) {
  const socketRef = useRef();

  const handleMessage = ({data}) => {
    // Don't parse the string if it contains the initial congratulation message
    if (typeof data === 'string' && !data.includes('congratulation')) {
      try {
        const message = JSON.parse(data);
        if (message.title === 'get_info') {
          setInformation(message.data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    let timer;
    // Fetch the info data
    clearInterval(timer);
    timer = setInterval(() => {
      if (socketRef.current?.send) {
        socketRef.current?.send('get_info');
      }
    }, INFO_UPDATE_SPEED);
    return () => clearInterval(timer);
  }, []);

  return (
    <WS
      ref={socketRef}
      url={`ws://${url}`}
      onOpen={() => {
        socketRef.current?.send('admin:123456'); // Authorize the connection
        socketRef.current?.send(`wsB ${defaultSpeed}`); // Set the default movement speed
        setIsLoading(false);
      }}
      onMessage={handleMessage}
      onError={console.warn}
      onClose={console.log}
    />
  );
}
