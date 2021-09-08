import firebase from "firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBgpEVFLNjGrGN-VGpOX4XtNXEvmMriY_E",
  authDomain: "dsw-sgea-project.firebaseapp.com",
  projectId: "dsw-sgea-project",
  storageBucket: "dsw-sgea-project.appspot.com",
  messagingSenderId: "647863291545",
  appId: "1:647863291545:web:ed0ca4e3c622f6fb407208"
};

firebase.apps.length < 1 && firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
