
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import {
     addDoc,
      collection, 
      getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDYyZXSoORFM8Hcyr6i9Cf2kkeqExcL35o",
  authDomain: "netflix-clone-95a54.firebaseapp.com",
  projectId: "netflix-clone-95a54",
  storageBucket: "netflix-clone-95a54.appspot.com",
  messagingSenderId: "210704407238",
  appId: "1:210704407238:web:90b466a71fe7dd58b755c7",
  measurementId: "G-B6VW98KQBV"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth =getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=> {
try {
   const res = await createUserWithEmailAndPassword(auth, email, password);
   const user = res.user;
   await addDoc(collection(db, "user"),{
    uid: user.uid,
    name,
    authProvider: "local",
    email,
   });
} catch (error) {
    console.log(error);
   toast.error(error.code.split('/')[1].split('-').join(" "));
    
}
}

const login = async (email, password)=>{
    try {
     await  signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout =()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};