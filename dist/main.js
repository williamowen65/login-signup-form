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

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ \"./src/styles.scss\");\n/* harmony import */ var _authFormWelcomes_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authFormWelcomes.json */ \"./src/authFormWelcomes.json\");\n\n\nconsole.log(\"Hello World!d\", { authMessages: _authFormWelcomes_json__WEBPACK_IMPORTED_MODULE_1__ });\nwriteFriendlyMessage();\nvar dividerEl = document.querySelector('#auth-container');\ndocument.querySelectorAll('.toggleAuthType').forEach(function (el) {\n    el.addEventListener('click', function () {\n        dividerEl.getAttribute('auth-mode') === 'login' ? dividerEl.setAttribute('auth-mode', 'signup') : dividerEl.setAttribute('auth-mode', 'login');\n        writeFriendlyMessage();\n    });\n});\nfunction writeFriendlyMessage() {\n    var loginMessage = _authFormWelcomes_json__WEBPACK_IMPORTED_MODULE_1__[\"login-messages\"][Math.floor(Math.random() * _authFormWelcomes_json__WEBPACK_IMPORTED_MODULE_1__[\"login-messages\"].length)];\n    var signupMessage = _authFormWelcomes_json__WEBPACK_IMPORTED_MODULE_1__[\"signup-messages\"][Math.floor(Math.random() * _authFormWelcomes_json__WEBPACK_IMPORTED_MODULE_1__[\"signup-messages\"].length)];\n    document.querySelector('.login').innerHTML = \"<h2>\".concat(loginMessage, \"</h2>\");\n    document.querySelector('.signup').innerHTML = \"<h2>\".concat(signupMessage, \"</h2>\");\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

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