// This files abstracts logic for interacting with Firebase

import { getAuth, connectAuthEmulator  } from "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';
import { firebaseConfig } from '../config/firebaseConfig';
import admin from 'firebase-admin'


// connect to firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

admin.initializeApp({ projectId: "login-signup-form-2024" });

// Server as a service
// Class for loose coupling of SAAS logic
 class SAASController {
    public authService: AuthService;
    constructor() {
        this.authService = new AuthService();
        connectAuthEmulator(auth, "http://127.0.0.1:9099");
    }

    // Create a user
    async createUser(email: string, password: string) {
        try {
            const user = await this.authService.signUp(email, password);
            console.log('User created successfully:', user);

            // Add custom claims
            // By default all users are not admin.
            await admin.auth().setCustomUserClaims(user.uid, { admin: false });
            console.log('Custom claims set for user:', user.uid);

            return user;
        } catch (error) {
            console.error('Error creating user:', error.message);
            throw error;
        }
    }

    // Log in
    async loginUser(email: string, password: string) {
        try {
            const user = await this.authService.signIn(email, password);
            console.log('User logged in successfully:', user);
            return user;
        } catch (error) {
            console.error('Error logging in user:', error.message);
            throw error;
        }
    }
}

export default new SAASController()



// Class is property of SAASController
class AuthService {
    auth;
    constructor() {
        // Initialize Firebase Auth
        this.auth = getAuth(app);
    }

    // Method to sign up a new user
    async signUp(email: string, password: string) {
        try {
            const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to sign in an existing user
    async signIn(email: string, password: string) {
        try {
            const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
            return userCredential.user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // Method to sign out the current user
    async signOut() {
        try {
            await this.auth.signOut();
        } catch (error) {
            throw new Error(error.message);
        }
    }
}