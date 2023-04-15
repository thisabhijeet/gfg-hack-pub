import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import { firebase } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDWntdj23HGf1pY3-ykOoUT7vv-XmYoBT0",
  authDomain: "gfg-hack.firebaseapp.com",
  projectId: "gfg-hack",
  storageBucket: "gfg-hack.appspot.com",
  messagingSenderId: "249759723754",
  appId: "1:249759723754:web:c03d19c50d4abf090f6793",
  measurementId: "G-V24ENJZVQJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
