import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import * as apple from "../apple";
import * as path from "path";
import axios from "axios";

const firestore = admin.firestore();
const app = express();
app.set("views", [path.join(__dirname, "/views")]);
app.set("view engine", "pug");
const v1Router = express.Router();

v1Router.get("/", (req, res) => {
  res.json({
    result: "Github Profile Apple Music",
    apiVersion: "1",
  });
});

v1Router.get("/users/:id", async (req, res) => {
  const document = await firestore
    .collection("musicKitUserTokens")
    .doc(req.params.id)
    .get();

  if (!document.exists) {
    res.status(403).json({error: "User Token not found"});
    return;
  }

  res.json({
    id: document.id,
    token: document.get("token"),
    issuedAt: document.get("createdAt"),
  });
});

v1Router.get("/users/:id/recent/played/tracks", async (req, res) => {
  const document = await firestore
    .collection("musicKitUserTokens")
    .doc(req.params.id)
    .get();

  if (!document.exists) {
    res.status(403).json({error: "User Token not found"});
    return;
  }

  const userToken = document.get("token");
  let response: MusicKitResponse<PaginatedResourceCollectionResponse>;
  try {
    response = await apple.Music.getRecentlyPlayed(userToken);
  } catch (e) {
    res.status(403).json({error: "Failed to get recently played tracks"});
    return;
  }

  // failed to get recently played tracks
  if (response.status !== 200) {
    res.status(403).json({error: "Failed to get recently played tracks"});
    return;
  }

  const tracks = await Promise.all(
    response.body.data.map(async (track) => {
      const artistName = track.attributes.artistName;
      const songName = track.attributes.name;
      const backgroundColor = track.attributes.artwork.bgColor;
      const textColor1 = track.attributes.artwork.textColor1;
      const textColor2 = track.attributes.artwork.textColor2;
      const image = await axios.get(
        track.attributes.artwork.url
          .replace("{w}", "300")
          .replace("{h}", "300"),
        {responseType: "arraybuffer"},
      );

      const encodedAlbumArtImage = `data:image/jpeg;base64,${Buffer.from(
        image.data,
      ).toString("base64")}`;

      return {
        artistName,
        songName,
        encodedAlbumArtImage,
        backgroundColor,
        textColor1,
        textColor2,
      };
    }),
  );

  const templateId: string = (req.query.template as string) || "template_1_1";

  // debug logging
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.render(templateId, {...response, tracks});
});

app.use("/api/v1", v1Router);

export const v1 = functions.runWith({memory: "1GB"}).https.onRequest(app);
