import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDMNiLWUjiGlK59Nx20FxRphYPpj7UBF_w",
  authDomain: "photometa-1f1c1.firebaseapp.com",
  projectId: "photometa-1f1c1",
  storageBucket: "photometa-1f1c1.appspot.com",
  messagingSenderId: "96276976121",
  appId: "1:96276976121:web:683c921df21a269b54ad28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
