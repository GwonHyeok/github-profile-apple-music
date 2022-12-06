import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as apple from "../apple";

const AppleMusicToken = apple.MusicToken;
const firestore = admin.firestore();

export const temporaryTokenGenerate = functions.https.onRequest(
  async (req, res) => {
    const developerToken = await AppleMusicToken.generateDeveloperToken();
    await firestore.collection("musicKitDeveloperTokens").doc().set({
      token: developerToken,
      createdAt: new Date(),
    });
  },
);

export const musicKitDeveloperTokenGenerator = functions.pubsub
  .schedule("1 of jan,april,july,oct 00:00")
  .onRun(async () => {
    const developerToken = await AppleMusicToken.generateDeveloperToken();
    await firestore.collection("musicKitDeveloperTokens").doc().set({
      token: developerToken,
      createdAt: new Date(),
    });
  });
