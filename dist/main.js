/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-webpack-project/./src/styles.scss?");

/***/ }),

/***/ "./src/eventListeners.ts":
/*!*******************************!*\
  !*** ./src/eventListeners.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setFormSubmitListeners: () => (/* binding */ setFormSubmitListeners),\n/* harmony export */   setUXEventListeners: () => (/* binding */ setUXEventListeners),\n/* harmony export */   writeFriendlyMessage: () => (/* binding */ writeFriendlyMessage)\n/* harmony export */ });\n/* harmony import */ var _authFormWelcomes_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authFormWelcomes.json */ \"./src/authFormWelcomes.json\");\n/* harmony import */ var _forms_LoginForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forms/LoginForm */ \"./src/forms/LoginForm.ts\");\n/* harmony import */ var _forms_SignupForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forms/SignupForm */ \"./src/forms/SignupForm.ts\");\n\n\n\nfunction setUXEventListeners() {\n    // Change form from signup to login\n    var dividerEl = document.querySelector('#auth-container');\n    document.querySelectorAll('.toggleAuthType').forEach(function (el) {\n        el.addEventListener('click', function (e) {\n            e.stopPropagation();\n            dividerEl.getAttribute('auth-mode') === 'login' ? dividerEl.setAttribute('auth-mode', 'signup') : dividerEl.setAttribute('auth-mode', 'login');\n            writeFriendlyMessage();\n        });\n    });\n    // Set listeners on all inputs for the label to float\n    document.querySelectorAll('input').forEach(function (el) {\n        el.addEventListener('focus', function (e) {\n            var target = e.target;\n            target.closest('label').classList.add('moveLabel');\n        });\n        el.addEventListener('blur', function (e) {\n            var target = e.target;\n            if (target.value === '') {\n                target.closest('label').classList.remove('moveLabel');\n            }\n        });\n        el.addEventListener('change', function (e) {\n            var target = e.target;\n            if (target.value === '') {\n                target.closest('label').classList.remove('moveLabel');\n            }\n            else {\n                target.closest('label').classList.add('moveLabel');\n            }\n        });\n    });\n    // Set listeners on toggle password visibility\n    document.querySelectorAll('.password-toggle').forEach(function (el) {\n        el.addEventListener('click', function (e) {\n            console.log('clicked');\n            var target = e.target;\n            var label = target.closest('label');\n            var input = label.querySelector('input');\n            var isShowingPassword = label.getAttribute('password-toggle') == \"hide\" ? true : false;\n            if (isShowingPassword) {\n                input.type = 'text';\n                label.setAttribute('password-toggle', \"show\");\n            }\n            else {\n                input.type = 'password';\n                label.setAttribute('password-toggle', \"hide\");\n            }\n        });\n    });\n}\n// Write a friendly message to the user\nfunction writeFriendlyMessage() {\n    var loginMessage = _authFormWelcomes_json__WEBPACK_IMPORTED_MODULE_0__[\"login-messages\"][Math.floor(Math.random() * _authFormWelcomes_json__WEBPACK_IMPORTED_MODULE_0__[\"login-messages\"].length)];\n    var signupMessage = _authFormWelcomes_json__WEBPACK_IMPORTED_MODULE_0__[\"signup-messages\"][Math.floor(Math.random() * _authFormWelcomes_json__WEBPACK_IMPORTED_MODULE_0__[\"signup-messages\"].length)];\n    document.querySelectorAll('.login h2, .signup h2').forEach(function (el) { return el.remove(); });\n    document.querySelector('.login').insertAdjacentHTML('afterbegin', \"<h2>\".concat(loginMessage, \"</h2>\"));\n    document.querySelector('.signup').insertAdjacentHTML('afterbegin', \"<h2>\".concat(signupMessage, \"</h2>\"));\n}\nfunction setFormSubmitListeners() {\n    // Setup signup form\n    var signupForm = new _forms_SignupForm__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    document.getElementById('signup').addEventListener('submit', function (e) {\n        console.log('submitting');\n        e.preventDefault();\n        var formData = {\n            firstname: document.getElementById('firstname').value,\n            lastname: document.getElementById('lastname').value,\n            username: document.getElementById('username').value,\n            email: document.getElementById('email').value,\n            password: document.getElementById('password').value,\n            confirm_password: document.getElementById('confirm_password').value\n        };\n        signupForm.submit(formData);\n    });\n    // Setup login form\n    var loginForm = new _forms_LoginForm__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n    document.getElementById('login').addEventListener('submit', function (e) {\n        console.log('submitting login');\n        e.preventDefault();\n        var formData = {\n            \"username-or-email\": document.getElementById('username-or-email').value,\n            \"password-login\": document.getElementById('password-login').value\n        };\n        loginForm.submit(formData);\n    });\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/eventListeners.ts?");

/***/ }),

/***/ "./src/forms/LoginForm.ts":
/*!********************************!*\
  !*** ./src/forms/LoginForm.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _interfaces_Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interfaces/Form */ \"./src/interfaces/Form.ts\");\n/* harmony import */ var _utils_Validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Validator */ \"./src/utils/Validator.js\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar LoginForm = /** @class */ (function (_super) {\n    __extends(LoginForm, _super);\n    function LoginForm() {\n        var _this = _super.call(this) || this;\n        _this.validator = new _utils_Validator__WEBPACK_IMPORTED_MODULE_1__.Validator();\n        return _this;\n    }\n    // @ts-ignore\n    LoginForm.prototype.submit = function (formData) {\n        this.validator.clearErrors();\n        this.clearErrors(formData);\n        // Define what validation to perform\n        this.validator.isRequired(formData[\"username-or-email\"], \"username-or-email\", {\n            alias: \"Username or Email\"\n        });\n        this.validator.isRequired(formData['password-login'], \"password-login\", {\n            alias: \"Password\"\n        });\n        var errors = this.validator.getErrors();\n        if (Object.keys(errors).length === 0) {\n            console.log(\"Form submitted successfully!\");\n        }\n        else {\n            console.log(\"Form submission failed:\");\n            this.displayErrors(errors);\n        }\n    };\n    return LoginForm;\n}(_interfaces_Form__WEBPACK_IMPORTED_MODULE_0__.Form));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginForm);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/forms/LoginForm.ts?");

/***/ }),

/***/ "./src/forms/SignupForm.ts":
/*!*********************************!*\
  !*** ./src/forms/SignupForm.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _interfaces_Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interfaces/Form */ \"./src/interfaces/Form.ts\");\n/* harmony import */ var _utils_Validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Validator */ \"./src/utils/Validator.js\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        if (typeof b !== \"function\" && b !== null)\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar SignupForm = /** @class */ (function (_super) {\n    __extends(SignupForm, _super);\n    function SignupForm() {\n        var _this = _super.call(this) || this;\n        _this.validator = new _utils_Validator__WEBPACK_IMPORTED_MODULE_1__.Validator();\n        return _this;\n    }\n    SignupForm.prototype.submit = function (formData) {\n        this.validator.clearErrors();\n        this.clearErrors(formData);\n        // Define what validation to perform\n        this.validator.isRequired(formData.firstname, \"firstname\", {\n            alias: \"First Name\"\n        });\n        this.validator.isRequired(formData.lastname, \"lastname\", {\n            alias: \"Last Name\"\n        });\n        this.validator.isRequired(formData.username, \"username\");\n        this.validator.isValidLength(formData.username, \"username\", 8, 20);\n        this.validator.isRequired(formData.email, \"email\");\n        this.validator.isEmail(formData.email, \"email\");\n        this.validator.isRequired(formData.password, \"password\");\n        this.validator.isValidLength(formData.password, \"password\", 8, 100);\n        this.validator.isMatchingPassword(formData.password, formData.confirm_password, \"confirm_password\", {\n            alias: \"Passwords\"\n        });\n        var errors = this.validator.getErrors();\n        if (Object.keys(errors).length === 0) {\n            console.log(\"Form submitted successfully!\");\n        }\n        else {\n            console.log(\"Form submission failed:\");\n            this.displayErrors(errors);\n        }\n    };\n    return SignupForm;\n}(_interfaces_Form__WEBPACK_IMPORTED_MODULE_0__.Form));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SignupForm);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/forms/SignupForm.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./src/styles.scss\");\n/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./eventListeners */ \"./src/eventListeners.ts\");\n\n\n(0,_eventListeners__WEBPACK_IMPORTED_MODULE_1__.setUXEventListeners)();\n(0,_eventListeners__WEBPACK_IMPORTED_MODULE_1__.writeFriendlyMessage)();\n(0,_eventListeners__WEBPACK_IMPORTED_MODULE_1__.setFormSubmitListeners)();\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ }),

/***/ "./src/interfaces/Form.ts":
/*!********************************!*\
  !*** ./src/interfaces/Form.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Form: () => (/* binding */ Form)\n/* harmony export */ });\nvar Form = /** @class */ (function () {\n    function Form() {\n    }\n    // @ts-ignore\n    Form.prototype.submit = function (formData) { };\n    ;\n    // @ts-ignore\n    Form.prototype.displayErrors = function (errors) {\n        for (var field in errors) {\n            var inputElement = document.querySelector(\"#\".concat(field));\n            var errorElement = document.querySelector(\"#\".concat(field, \"-error\"));\n            if (errorElement) {\n                errorElement.innerHTML = \"<small>\".concat(errors[field][0], \"</small>\");\n            }\n            if (inputElement) {\n                inputElement.classList.add(\"input-error\");\n            }\n        }\n    };\n    // @ts-ignore\n    Form.prototype.clearErrors = function (formData) {\n        for (var field in formData) {\n            var inputElement = document.querySelector(\"#\".concat(field));\n            var errorElement = document.querySelector(\"#\".concat(field, \"-error\"));\n            if (errorElement) {\n                errorElement.innerHTML = \"\";\n            }\n            if (inputElement) {\n                inputElement.classList.remove(\"input-error\");\n            }\n        }\n    };\n    return Form;\n}());\n\n/*\nEXAMPLE\n\nclass RegistrationForm implements Form {\n    constructor() {\n        this.validator = new Validator();\n    }\n\n    submit(formData) {\n        this.validator.clearErrors();\n\n        this.validator.isRequired(formData.username, \"Username\");\n        this.validator.isEmail(formData.email, \"Email\");\n        this.validator.isInRange(formData.age, 18, 100, \"Age\");\n\n        const errors = this.validator.getErrors();\n        if (Object.keys(errors).length === 0) {\n            console.log(\"Form submitted successfully!\");\n        } else {\n            console.log(\"Form submission failed:\");\n            this.displayErrors(errors);\n        }\n    }\n\n    displayErrors(errors) {\n        for (let field in errors) {\n            const inputElement = document.querySelector(`#${field}`);\n            const errorElement = document.querySelector(`#${field}-error`);\n\n            if (errorElement) {\n                errorElement.innerHTML = errors[field].join(\"<br>\");\n            }\n\n            if (inputElement) {\n                inputElement.classList.add(\"input-error\");\n            }\n        }\n    }\n}\n\n*/ \n\n\n//# sourceURL=webpack://my-webpack-project/./src/interfaces/Form.ts?");

/***/ }),

/***/ "./src/utils/stringMethods.ts":
/*!************************************!*\
  !*** ./src/utils/stringMethods.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   capitalizeFirstLetter: () => (/* binding */ capitalizeFirstLetter)\n/* harmony export */ });\n// Method to capitalize first letter of a string\nvar capitalizeFirstLetter = function (string) {\n    return string.charAt(0).toUpperCase() + string.slice(1);\n};\n\n\n//# sourceURL=webpack://my-webpack-project/./src/utils/stringMethods.ts?");

/***/ }),

/***/ "./src/utils/Validator.js":
/*!********************************!*\
  !*** ./src/utils/Validator.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Validator: () => (/* binding */ Validator)\n/* harmony export */ });\n/* harmony import */ var _stringMethods__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stringMethods */ \"./src/utils/stringMethods.ts\");\n\n\n\nclass Validator{\n    constructor(){\n        this.errors = [];   \n    }\n    isRequired(value, fieldName, options ={}){\n        if(!value || value.length === 0){\n            this.addError(fieldName, `${options.alias || (0,_stringMethods__WEBPACK_IMPORTED_MODULE_0__.capitalizeFirstLetter)(fieldName)} is required`);\n            return false;\n        }\n        return true;\n    }\n    isEmail(value, fieldName){\n        const emailPattern = new RegExp(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/);\n        if(!emailPattern.test(value)){\n            this.addError(fieldName, `${(0,_stringMethods__WEBPACK_IMPORTED_MODULE_0__.capitalizeFirstLetter)(fieldName)} is not a valid email`);\n            return false;\n        }\n        return true;\n    }\n    isValidLength(value, fieldName, min, max){\n        if(value.length < min || value.length > max){\n            this.addError(fieldName, `${(0,_stringMethods__WEBPACK_IMPORTED_MODULE_0__.capitalizeFirstLetter)(fieldName)} must be between <br> ${min} and ${max} characters`);\n            return false;\n        }\n        return true;\n    }\n    isMatchingPassword(value1, value2, fieldName, options = {}){\n        if(value1 !== value2){\n            this.addError(fieldName, `${options.alias || (0,_stringMethods__WEBPACK_IMPORTED_MODULE_0__.capitalizeFirstLetter)(fieldName)} do not match`);\n            return false;\n        }\n        return true;\n    }\n\n    addError(fieldName, message){\n        if(!this.errors[fieldName]){\n            this.errors[fieldName] = [];\n        }\n        this.errors[fieldName].push(message);\n    }\n    getErrors(){\n        return this.errors;\n    }\n    clearErrors(){\n        this.errors = {};\n    }\n    \n}\n\n//# sourceURL=webpack://my-webpack-project/./src/utils/Validator.js?");

/***/ }),

/***/ "./src/authFormWelcomes.json":
/*!***********************************!*\
  !*** ./src/authFormWelcomes.json ***!
  \***********************************/
/***/ ((module) => {

eval("module.exports = /*#__PURE__*/JSON.parse('{\"login-messages\":[\"Welcome back! We\\'ve missed you. Please log in to continue.\",\"Good to see you again! Log in to pick up where you left off.\",\"Welcome back! Ready to dive back in? Log in below.\",\"Hey there, [Username]! Welcome back. Log in to get started.\",\"Welcome back, [Username]! We\\'ve got your spot saved.\",\"Good to see you again, [Username]! Log in to continue.\",\"Welcome back! We hope you\\'re ready for another great session.\",\"We\\'re glad you\\'re here! Log in and let\\'s get started.\",\"It\\'s good to see you! Log in to access your account.\",\"Welcome back! Please log in to your account.\",\"Log in to continue.\",\"Hello again! Please enter your details to log in.\",\"Welcome back! Your account is safe with us. Please log in to continue.\",\"For your security, please log in to access your account.\"],\"signup-messages\":[\"Join us today! Create your account to get started.\",\"Welcome! We\\'re excited to have you on board. Sign up to begin.\",\"Hey there! Ready to join the [App Name] community? Sign up now!\",\"Create your account and discover what [App Name] has to offer!\",\"Your journey starts here! Sign up to get started.\",\"New here? Sign up and be part of something amazing!\",\"Sign up for free and get access to [feature/benefit].\",\"Create your account and enjoy [benefit 1], [benefit 2], and more!\",\"Join [App Name] and unlock exclusive features tailored just for you.\",\"Create a new account.\",\"Sign up to get started.\",\"New to [App Name]? Sign up now!\",\"Welcome! We’re thrilled to have you here. Let’s get you set up.\",\"Hello! Ready to create your account? We’re glad to have you.\",\"Be part of our community! Sign up to start your journey.\"]}');\n\n//# sourceURL=webpack://my-webpack-project/./src/authFormWelcomes.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;