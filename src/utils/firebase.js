import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDULs_d8ko7Kl_1CookoRbgKthGcFMUCGg",
    authDomain: "webpage-dc83a.firebaseapp.com",
    projectId: "webpage-dc83a",
    storageBucket: "webpage-dc83a.appspot.com",
    messagingSenderId: "719100122002",
    appId: "1:719100122002:web:86643914a49d29db78a74b",
    measurementId: "G-ZBNQ9F66QZ",
};
const app = firebase.initializeApp(firebaseConfig, "firebaseConfig");

// Obtener los servicios de Firebase para cada configuración
const auth = app.auth();
const db = app.firestore();
const storage = app.storage();

// Exportar los servicios de Firebase para cada configuración
export { auth, db, storage};
