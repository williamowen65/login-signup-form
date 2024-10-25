// This files abstracts logic for interacting with Firebase
// @TODO: Implement validatePassword
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, validatePassword, onAuthStateChanged } from "firebase/auth";
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
        this.watchAuthState();
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
            this.addRoute('/dist/index.html', () => { this.pushToHistory({page: 'welcome'}, 'Welcome Page', '/dist/welcome.html'); }, undefined); // the login page
            this.addRoute('/dist/', () => { this.pushToHistory({page: 'welcome'}, 'Welcome Page', '/dist/welcome.html');}, undefined); // the login page
            this.addRoute('/dist/welcome.html', undefined, () => this.pushToHistory({page: 'home'}, 'Home Page', '/dist/index.html');); // the login page      
        } catch (error) {
            console.log("Error initializing routes", error)
        }
    }
    // Add a new state to the history stack
    pushToHistory(state: object, title: string, url: string) {
        window.history.pushState(state, title, url);
        window.location.href= url;
    }
  
//   // Example usage
//   const data = { page: 'about' };
//   pushToHistory(data, 'About Page', '/about'); 
    

    private watchRoutes() {
        // Watch for route changes
        const pathname = document.location.pathname;
        console.log({ pathname: pathname })
        this.protectRoute(pathname)
    }

    private watchAuthState(){
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                // User is signed in.
                const uid = user.uid;
                console.log('User is signed in', {uid})
            } else {
                // User is signed out.
                console.log('User is signed out')
            }
            // No matter what, protect the route
            this.protectRoute(document.location.pathname)
        });
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
     async protectRoute(route: string) {
        console.log({route, routes: this.routes, isUserLoggedIn: await this.isUserLoggedIn()})
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


