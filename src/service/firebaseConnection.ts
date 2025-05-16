// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQR1yArPZtPkwDl8cc47iIhtoFOd5kvaU",
  authDomain: "react-com-ts.firebaseapp.com",
  projectId: "react-com-ts",
  storageBucket: "react-com-ts.firebasestorage.app",
  messagingSenderId: "387540994117",
  appId: "1:387540994117:web:23c779cf87f1f98625fb2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

//Exportar as configurações do meu banco pra acessar no login
export {db, auth}