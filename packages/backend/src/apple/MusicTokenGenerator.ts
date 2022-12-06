import * as jwt from "jsonwebtoken";

export async function generateDeveloperToken() {
  const teamId: string | undefined = process.env.APPLE_MEDIA_SERVICE_TEAM_ID;
  const keyId: string | undefined = process.env.APPLE_MEDIA_SERVICE_KEY_ID;
  const key: string | undefined = process.env.APPLE_MEDIA_SERVICE_KEY;

  if (!teamId) throw Error("APPLE_MEDIA_SERVICE_TEAM_ID is not defined");
  if (!keyId) throw Error("APPLE_MEDIA_SERVICE_KEY_ID is not defined");
  if (!key) throw Error("APPLE_MEDIA_SERVICE_KEY is not defined");

  const now = Math.floor(Date.now() / 1000);
  const token = jwt.sign(
      {
        iss: teamId,
        exp: now + 15777000, // 6 months
        iat: now,
      },
      key,
      {
        header: {alg: "ES256", kid: keyId},
      }
  );

  return token;
}
