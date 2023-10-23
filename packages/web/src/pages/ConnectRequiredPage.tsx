import { Heading, Stack } from '@chakra-ui/react';
import { AppleMusicConnectButton } from '../components/AppleMusicConnectButton';
import { Background } from '../components/background/Background';
import { Logo } from '../components/Logo';

export function ConnectRequiredPage() {
  return (
    <div className="background">
      <Logo className="logo" />
      <Background />
      <div className="wrapper">
        <Stack className="left" gap={16}>
          <Heading size="3xl" lineHeight={1.2}>
            Connect to
            <br />
            Apple Music
            <br />
            Github Profile
          </Heading>
          <AppleMusicConnectButton />
        </Stack>
        <div className="right">
          <img
            src={`https://github-profile-apple-music.web.app/api/v1/users/${
              import.meta.env.VITE_PREVIEW_USER_ID
            }/recent/played/tracks?template=template_1_1`}
            alt="preview"
          />
        </div>
      </div>
    </div>
  );
}
