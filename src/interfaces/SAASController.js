var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// This files abstracts logic for interacting with Firebase
// @TODO: Implement validatePassword
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "firebase/auth";
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
var AuthService = /** @class */ (function () {
    function AuthService(app) {
        this.routes = {};
        console.log('Initializing Auth Service');
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
    AuthService.prototype.addRoute = function (route, callback, fallback) {
        if (callback === void 0) { callback = function () { }; }
        if (fallback === void 0) { fallback = function () { }; }
        console.log('Adding route', { route: route, callback: callback, fallback: fallback, routes: this.routes });
        this.routes[route] = { callback: callback, fallback: fallback };
    };
    // Initialize routes
    AuthService.prototype.initializeRoutes = function () {
        var _this = this;
        try {
            console.log('Initializing routes', {
                addRoute: this.addRoute
            });
            this.addRoute('/dist/index.html', function () { _this.pushToHistory({ page: 'welcome' }, 'Welcome Page', '/dist/welcome.html'); }, undefined); // the login page
            this.addRoute('/dist/', function () { _this.pushToHistory({ page: 'welcome' }, 'Welcome Page', '/dist/welcome.html'); }, undefined); // the login page
            this.addRoute('/dist/welcome.html', undefined, function () { return _this.pushToHistory({ page: 'home' }, 'Home Page', '/dist/index.html'); });
            ; // the login page      
        }
        catch (error) {
            console.log("Error initializing routes", error);
        }
    };
    // Add a new state to the history stack
    AuthService.prototype.pushToHistory = function (state, title, url) {
        window.history.pushState(state, title, url);
        window.location.href = url;
    };
    //   // Example usage
    //   const data = { page: 'about' };
    //   pushToHistory(data, 'About Page', '/about'); 
    AuthService.prototype.watchRoutes = function () {
        // Watch for route changes
        var pathname = document.location.pathname;
        console.log({ pathname: pathname });
        this.protectRoute(pathname);
    };
    AuthService.prototype.watchAuthState = function () {
        var _this = this;
        onAuthStateChanged(this.auth, function (user) {
            if (user) {
                // User is signed in.
                var uid = user.uid;
                console.log('User is signed in', { uid: uid });
            }
            else {
                // User is signed out.
                console.log('User is signed out');
            }
            // No matter what, protect the route
            _this.protectRoute(document.location.pathname);
        });
    };
    // Create a user
    // @returns promise
    AuthService.prototype.createUser = function (email, password) {
        return createUserWithEmailAndPassword(this.auth, email, password);
    };
    // Log in
    // @returns promise
    AuthService.prototype.loginUser = function (email, password, rememberMe) {
        var _this = this;
        console.log("Logging in user", { email: email, password: password, rememberMe: rememberMe, browserLocalPersistence: browserLocalPersistence });
        if (rememberMe) {
            return signInWithEmailAndPassword(this.auth, email, password);
        }
        else {
            // @TODO: This don't seem to be working (the Remember be button...)
            // Expected behavior: User should be logged out when the browser is closed
            // Actual behavior: User is still logged in when the browser is closed
            return setPersistence(this.auth, browserLocalPersistence).then(function () { return signInWithEmailAndPassword(_this.auth, email, password); });
        }
    };
    AuthService.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, signOut(this.auth)];
            });
        });
    };
    // @TODO Add logic to protect page routes
    // Check if user is logged in
    AuthService.prototype.isUserLoggedIn = function () {
        var user = this.auth.currentUser;
        return user !== null;
    };
    // Protect page routes
    // Protect page routes
    AuthService.prototype.protectRoute = function (route) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, callback, fallback;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _b = (_a = console).log;
                        _d = { route: route, routes: this.routes };
                        return [4 /*yield*/, this.isUserLoggedIn()];
                    case 1:
                        _b.apply(_a, [(_d.isUserLoggedIn = _e.sent(), _d)]);
                        if (this.routes[route]) {
                            _c = this.routes[route], callback = _c.callback, fallback = _c.fallback;
                            if (this.isUserLoggedIn()) {
                                callback();
                            }
                            else {
                                fallback();
                            }
                        }
                        else {
                            console.error("Route ".concat(route, " is not defined."));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
var SAASController = /** @class */ (function () {
    function SAASController() {
        console.log('Initializing SAAS Controller');
        this.app = initializeApp(firebaseConfig);
        // Initialize Firebase Authentication and get a reference to the service
        this.authService = new AuthService(this.app);
        this.analytics = getAnalytics(this.app);
    }
    return SAASController;
}());
export default new SAASController();
