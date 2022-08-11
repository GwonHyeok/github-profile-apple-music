import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import * as core from "core";

const firestore = admin.firestore();
const app = express();
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
  const response = await core.apple.Music.getRecentlyPlayed(userToken);

  // failed to get recently played tracks
  if (response.status !== 200) {
    res.status(403).json({error: "Failed to get recently played tracks"});
    return;
  }

  res.json({
    id: document.id,
    data: response.body.data,
  });
  res.render("recentlyPlayed", {});
});

app.use("/api/v1", v1Router);

export const v1 = functions.https.onRequest(app);
