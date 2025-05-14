import { initializeApp, getApp, getApps } from "firebase/app"
import { getAuth } from "firebase-admin/auth"
import { getFirestore } from "firebase-admin/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeGO0IRViVX0BS1ra1N3GWvb-wk96NE7M",
  authDomain: "prepwise-55e7a.firebaseapp.com",
  projectId: "prepwise-55e7a",
  storageBucket: "prepwise-55e7a.firebasestorage.app",
  messagingSenderId: "399901525128",
  appId: "1:399901525128:web:7b6d3c09d1073f65a78b3d",
  measurementId: "G-DZBYCKNQ0N",
}

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)
