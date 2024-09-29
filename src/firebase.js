import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDl4Axx46YR63xwASMLvDrJqQktXjNjCsk",
    authDomain: "projetoead-75fbc.firebaseapp.com",
    projectId: "projetoead-75fbc",
    storageBucket: "projetoead-75fbc.appspot.com",
    messagingSenderId: "455880187540",
    appId: "1:455880187540:web:b4a77ce89fdb1c09579e81"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
