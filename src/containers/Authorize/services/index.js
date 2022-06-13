import { 
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth';
import {
    doc,
    getDoc
} from 'firebase/firestore'
import { db } from "../../../services/requests";

const auth = getAuth();

export async function GetUser(uid){
    const userRef = doc(db, "users", uid);
    const user = await getDoc(userRef);
    console.log(user);
    return user;
}

export async function SignUp(email, password){
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created: ',cred.user);
            // signupForm.reset();
        })
        .catch((err) => {
            console.log(err.message);
        })
}

export async function UserLogin(loginForm){
    await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
        .then((cred) => {
            console.log("cred",cred.user)   
         })
        .catch((err) => {
            console.log(err.message);
        })
}

export async function LogOut(){
    signOut(auth)
        .then(() => {
            
            console.log('the user signed out');
        })
        .catch((err) => {
            console.log(err.message);
        })
}