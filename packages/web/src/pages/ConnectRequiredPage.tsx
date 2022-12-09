import { AppleMusicConnectButton } from '../components/AppleMusicConnectButton';
import { Background } from '../components/background/Background';
import { Logo } from '../components/Logo';

export function ConnectRequiredPage() {
  return (
    <div className="background">
      <Logo className="logo" />
      <Background />
      <div className="wrapper">
        <div className="left">
          <h1>
            Connect to
            <br />
            Apple Music
            <br />
            Github Profile
          </h1>
          <AppleMusicConnectButton />
        </div>
        <div className="right">
          <img
            src="https://github-profile-apple-music.web.app/api/v1/users/rpMHqh68GCkK2hQNgkMl/recent/played/tracks"
            alt="preview"
          />
        </div>
      </div>
    </div>
  );
}
