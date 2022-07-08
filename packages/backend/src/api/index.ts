import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";

const firestore = admin.firestore();
const app = express();
const v1Router = express.Router();

v1Router.get("/", (req, res) => {
  res.json({
    result: "Github Profile Apple Music",
    apiVersion: "1",
  });
});

v1Router.get("/:id", async (req, res) => {
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

app.use("/api/v1", v1Router);

export const v1 = functions.https.onRequest(app);
