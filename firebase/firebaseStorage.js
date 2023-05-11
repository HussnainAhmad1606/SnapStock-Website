import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_API_KEY,
  authDomain: process.env.NEXT_AUTH_DOMAIN,
  projectId: process.env.NEXT_PROJECT_ID,
  storageBucket: "snapstock-94521.appspot.com",
  messagingSenderId: process.env.NEXT_MESSAGING_ID,
  appId: process.env.NEXT_APP_ID,
  measurementId: process.envNEXT_MEASUREMENT_ID
};



const app = initializeApp(firebaseConfig);


export const storage = getStorage();