import { useRecoilValue } from 'recoil';
import { userConnectedState } from '../states';
import { ConnectedPage } from './ConnectedPage';
import { ConnectRequiredPage } from './ConnectRequiredPage';

export function RootPage() {
  const userConnected = useRecoilValue(userConnectedState);
  return userConnected ? <ConnectedPage /> : <ConnectRequiredPage />;
}
