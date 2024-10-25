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


// Class is property of SAASController
class AuthService {
    auth;
    constructor(app: any) {
        // Initialize Firebase Auth
        this.auth = getAuth(app);
        connectAuthEmulator(this.auth, "http://127.0.0.1:9099");
    }

     // Create a user
    // @returns promise
    createUser(email: string, password: string) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    }

    // Log in
    // @returns promise
    loginUser(email: string, password: string) {
            return signInWithEmailAndPassword(this.auth, email, password)
    }

    async logout(){
        return signOut(this.auth)
    }

    // @TODO Add logic to protect page routes
}



class SAASController {
    app
    authService
    analytics;
    constructor() {
        this.app = initializeApp(firebaseConfig);
        // Initialize Firebase Authentication and get a reference to the service
        this.authService = new AuthService(this.app)
        this.analytics = getAnalytics(this.app);
    }
}

export default new SAASController()


