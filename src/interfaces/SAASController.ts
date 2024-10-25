// This files abstracts logic for interacting with Firebase

import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
// import admin from 'firebase-admin'

import { firebaseConfig } from '../config/firebaseConfig';


// connect to firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
// const analytics = getAnalytics(app);

// admin.initializeApp({ projectId: "login-signup-form-2024" });

// Server as a service
// Class for loose coupling of SAAS logic
class SAASController {
    app
    auth;
    analytics;
    constructor() {
        this.app = initializeApp(firebaseConfig);
        // Initialize Firebase Authentication and get a reference to the service
        this.auth = getAuth()
        this.analytics = getAnalytics(this.app);

        connectAuthEmulator(this.auth, "http://127.0.0.1:9099");
    }

    // Create a user
    async createUser(email: string, password: string) {
        try {
            const user = await createUserWithEmailAndPassword(this.auth, email, password);
            console.log('User created successfully:', user);

            // Add custom claims
            // By default all users are not admin.
            // await admin.auth().setCustomUserClaims(user.uid, { admin: false });
            // console.log('Custom claims set for user:', user.uid);

            return user;
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw error;
        }
    }

    // Log in
    async loginUser(email: string, password: string) {
        return new Promise((res, rej) => {

            console.log("about to login", {auth: this.auth, email, password})
            // debugger;
            signInWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
                console.log("success?", {userCredential})
                res(userCredential)
            }).catch(err => {
                console.log("Err?", {err})
                rej(err.message)
            })
       
    })

    }

    async logout(){
        return signOut(this.auth)
    }
}

export default new SAASController()



// Class is property of SAASController
class AuthService {
    // auth;
    constructor() {
        // Initialize Firebase Auth
        // this.auth = getAuth(app);
    }

    // Method to sign up a new user
    // async signUp(email: string, password: string) {
    //     try {
    //         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    //         return userCredential.user;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // // Method to sign in an existing user
    // async signIn(email: string, password: string) {
    //     try {
    //         const userCredential = await signInWithEmailAndPassword(auth, email, password);
    //         return userCredential.user;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }

    // Method to sign out the current user
    // async signOut() {
    //     try {
    //         await this.auth.signOut();
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // }
}