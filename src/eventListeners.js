import authMessages from './authFormWelcomes.json';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import SAASController from './interfaces/SAASController';
import Button from './utils/classes/Button';
export function setUXEventListeners() {
    // Change form from signup to login
    var dividerEl = document.querySelector('#auth-container');
    document.querySelectorAll('.toggleAuthType').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.stopPropagation();
            dividerEl.getAttribute('auth-mode') === 'login' ? dividerEl.setAttribute('auth-mode', 'signup') : dividerEl.setAttribute('auth-mode', 'login');
            writeFriendlyMessage();
        });
    });
    // Set listeners on all inputs for the label to float
    document.querySelectorAll('input').forEach(function (el) {
        el.addEventListener('focus', function (e) {
            var target = e.target;
            target.closest('label').classList.add('moveLabel');
        });
        el.addEventListener('blur', function (e) {
            var target = e.target;
            if (target.value === '') {
                target.closest('label').classList.remove('moveLabel');
            }
        });
        el.addEventListener('change', function (e) {
            var target = e.target;
            if (target.value === '') {
                target.closest('label').classList.remove('moveLabel');
            }
            else {
                target.closest('label').classList.add('moveLabel');
            }
        });
    });
    // Set listeners on toggle password visibility
    document.querySelectorAll('.password-toggle').forEach(function (el) {
        el.addEventListener('click', function (e) {
            console.log('clicked');
            var target = e.target;
            var label = target.closest('label');
            var input = label.querySelector('input');
            var isShowingPassword = label.getAttribute('password-toggle') == "hide" ? true : false;
            if (isShowingPassword) {
                input.type = 'text';
                label.setAttribute('password-toggle', "show");
            }
            else {
                input.type = 'password';
                label.setAttribute('password-toggle', "hide");
            }
        });
    });
}
// Write a friendly message to the user
export function writeFriendlyMessage() {
    var loginMessage = authMessages['login-messages'][Math.floor(Math.random() * authMessages['login-messages'].length)];
    var signupMessage = authMessages['signup-messages'][Math.floor(Math.random() * authMessages['signup-messages'].length)];
    document.querySelectorAll('.login h2, .signup h2').forEach(function (el) { return el.remove(); });
    document.querySelector('.login').insertAdjacentHTML('afterbegin', "<h2>".concat(loginMessage, "</h2>"));
    document.querySelector('.signup').insertAdjacentHTML('afterbegin', "<h2>".concat(signupMessage, "</h2>"));
}
export function setFormSubmitListeners(options) {
    if (options === void 0) { options = {}; }
    // Setup signup form
    var signupForm = new SignupForm();
    var signupEl = document.getElementById('signup');
    signupEl.addEventListener('submit', function (e) {
        console.log('submitting');
        e.preventDefault();
        var formData = {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirm_password: document.getElementById('confirm_password').value,
            signup: true,
        };
        signupForm.clearErrors(formData);
        var button = new Button(signupEl.querySelector('button'));
        button.awaitButton();
        setTimeout(function () {
            signupForm.submit(formData).then(function () {
                console.log("Form submitted successfully!");
                SAASController.authService.pushToHistory({ page: 'welcome' }, 'Welcome Page', '/dist/welcome.html');
                button.resetButton();
            }).catch(function (err) {
                console.log("(client) Signup Error: ", { err: err });
                signupForm.displayErrors({ "signup": ["Failed to signup. Please try again."] });
                button.resetButton();
            });
        }, 2000);
    });
    // Setup login form
    var loginForm = new LoginForm();
    var loginEl = document.getElementById('login');
    loginEl.addEventListener('submit', function (e) {
        console.log('submitting login');
        e.preventDefault();
        var formData = {
            "email-login": document.getElementById('email-login').value,
            "password-login": document.getElementById('password-login').value,
            "login": true,
            "remember-me": document.getElementById('remember-me').checked
        };
        loginForm.clearErrors(formData);
        try {
            // show spinner while submission loads (SImulate loading)
            var button_1 = new Button(loginEl.querySelector('button'));
            button_1.awaitButton();
            setTimeout(function () {
                loginForm.submit(formData).then(function (user) {
                    console.log("Form submitted successfully!", { user: user });
                    SAASController.authService.pushToHistory({ page: 'welcome' }, 'Welcome Page', '/dist/welcome.html');
                    button_1.resetButton();
                }).catch(function (err) {
                    console.log("(client) login error: ", { err: err });
                    button_1.resetButton();
                    // Display error 
                    loginForm.displayErrors({ "login": ["Failed to log in. Please try again."] });
                });
            }, 2000);
        }
        catch (error) {
        }
    });
    // Set up analytics
}
