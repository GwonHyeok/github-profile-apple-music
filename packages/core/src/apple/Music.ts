import * as MusicKit from "node-musickit-api/personalized";

export async function getRecentlyPlayed(userToken: string) {
  const teamId = process.env.APPLE_MEDIA_SERVICE_TEAM_ID;
  const keyId = process.env.APPLE_MEDIA_SERVICE_KEY_ID;
  const key = process.env.APPLE_MEDIA_SERVICE_KEY;
  if (!teamId) {
    throw Error("APPLE_MEDIA_SERVICE_TEAM_ID is not defined");
  }
  if (!keyId) {
    throw Error("APPLE_MEDIA_SERVICE_KEY_ID is not defined");
  }
  if (!key) {
    throw Error("APPLE_MEDIA_SERVICE_KEY is not defined");
  }

  const MusicKitConst = new MusicKit({
    key: key,
    teamId: teamId,
    keyId: keyId,
    userToken: userToken,
  });

  return MusicKitConst.getRecentlyPlayed(10, 0, "songs");
}
