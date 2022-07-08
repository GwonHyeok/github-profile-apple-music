import * as admin from "firebase-admin";
import {AppOptions} from "firebase-admin";

const adminConfig = JSON.parse(
  process.env.FIREBASE_CONFIG as any,
) as AppOptions;
admin.initializeApp(adminConfig);

export * as scheduler from "./scheduler";
export * as api from "./api";
