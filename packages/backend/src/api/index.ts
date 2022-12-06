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
  const response = await apple.Music.getRecentlyPlayed(userToken);

  // failed to get recently played tracks
  if (response.status !== 200) {
    res.status(403).json({error: "Failed to get recently played tracks"});
    return;
  }

  // Recently Song
  let artistName;
  let songName;
  let encodedAlbumArtImage;
  if (response.body.data.length > 0) {
    const track = response.body.data[0];
    artistName = track.attributes.artistName;
    songName = track.attributes.name;
    const image = await axios.get(
      track.attributes.artwork.url.replace("{w}", "300").replace("{h}", "300"),
      {responseType: "arraybuffer"},
    );
    encodedAlbumArtImage = `data:image/jpg;base64,${Buffer.from(
      image.data,
    ).toString("base64")}`;
  }

  // debug logging
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.render("temp", {
    ...response,
    artistName,
    songName,
    encodedAlbumArtImage,
  });
});

app.use("/api/v1", v1Router);

export const v1 = functions.https.onRequest(app);
