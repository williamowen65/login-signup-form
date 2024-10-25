// This files abstracts logic for interacting with Firebase
// @TODO: Implement validatePassword
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, validatePassword } from "firebase/auth";
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
    routes: { [key: string]: { callback: () => void, fallback: () => void } } = {};

    constructor(app: any) {
        console.log('Initializing Auth Service')
        // Initialize Firebase Auth
        this.auth = getAuth(app);
        connectAuthEmulator(this.auth, "http://127.0.0.1:9099");
        this.initializeRoutes();
        // this.watchRoutes(); // <-- Implement this with onAuthStateChanged (https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user)
    }

       // Add a route to be protected
    // @param route - string representing the route path
    // @param callback - function to be called if user is logged in
    // @param fallback - function to be called if user is not logged in
    private addRoute(route: string, callback = () => {}, fallback = () => {}) {
        console.log('Adding route', {route, callback, fallback, routes: this.routes})
        this.routes[route] = { callback, fallback };
    }


    // Initialize routes
    private initializeRoutes() {
        try {
            console.log('Initializing routes', {
                addRoute: this.addRoute})
            this.addRoute('/dist/index.html', () => { document.location.href = "dist/welcome.html"}, undefined); // the login page
            this.addRoute('/dist/', () => { document.location.href = "dist/welcome.html"}, undefined); // the login page
            this.addRoute('/dist/welcome.html', null, () => document.location.href = "/dist/index.html"); // the login page      
        } catch (error) {
            console.log("Error initializing routes", error)
        }
        
    }

    private watchRoutes() {
        // Watch for route changes
        const pathname = document.location.pathname;
        console.log({ pathname: pathname })
        this.protectRoute(pathname)
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
 

    // Check if user is logged in
    isUserLoggedIn(): boolean {
        const user = this.auth.currentUser;
        return user !== null;
    }
    // Protect page routes
     // Protect page routes
     protectRoute(route: string) {
        console.log({route, routes: this.routes})
        if (this.routes[route]) {
            const { callback, fallback } = this.routes[route];
            if (this.isUserLoggedIn()) {
                callback();
            } else {
                fallback();
            }
        } else {
            console.error(`Route ${route} is not defined.`);
        }
    }
}



class SAASController {
    app
    authService
    analytics;
    constructor() {
        console.log('Initializing SAAS Controller')
        this.app = initializeApp(firebaseConfig);
        // Initialize Firebase Authentication and get a reference to the service
        this.authService = new AuthService(this.app)
        this.analytics = getAnalytics(this.app);
    }
}

export default new SAASController()


