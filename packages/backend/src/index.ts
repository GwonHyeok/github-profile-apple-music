import * as admin from "firebase-admin";
import {AppOptions} from "firebase-admin";

const adminConfig = JSON.parse(
  process.env.FIREBASE_CONFIG as any,
) as AppOptions;

// apply base64 encoded firebase admin service account credential
if (process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT) {
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT, "base64").toString(
      "utf8",
    ),
  );
  adminConfig.credential = admin.credential.cert(serviceAccount);
}

admin.initializeApp(adminConfig);

export * as scheduler from "./scheduler";
export * as api from "./api";
