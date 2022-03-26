import useSocket from 'socket.io-client';
import Config from './helpers/Config';

export default useSocket(Config.ConfigSocketUrl);
