import deepstream from 'deepstream.io-client-js';
let client = null;

export function connect() {
  client = deepstream('localhost:6020', { silentDeprecation: true });
  setEventHandlers();
};

export function setEventHandlers() {
  client.login(null, ( success ) => {
    if ( success ) {
      console.log('Websocket Login Success!');
    } else {
      console.log('Websocket Login Failed!');
    }
  });

  client.on( 'error', function( msg, event, topic ) {
    console.log('Websocket error event: ', event );
  });
};

export function getSocketClient() {
  return client.event;
};

export function sendEmitOnRoom(room, data) {
  client.event.emit(room, data);
};
