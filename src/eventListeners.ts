import { signInWithEmailAndPassword } from 'firebase/auth'
import authMessages from './authFormWelcomes.json'
import SAASController from './interfaces/SAASController'
import Button from './utils/classes/Button'
import { root } from './globals'
import LoginForm from './forms/LoginForm'
import SignupForm from './forms/SignupForm'


    // Setup login form
export const loginForm = new LoginForm();
    // Setup signup form
  export const signupForm = new SignupForm();

export function setUXEventListeners() {

    // Change form from signup to login
    const dividerEl = document.querySelector('#auth-container')
    document.querySelectorAll('.toggleAuthType').forEach((el) => {
        el.addEventListener('click', (e) => {
            e.stopPropagation()
            dividerEl.getAttribute('auth-mode') === 'login' ? dividerEl.setAttribute('auth-mode', 'signup') : dividerEl.setAttribute('auth-mode', 'login')
            writeFriendlyMessage();
        })
    })


    // Set listeners on all inputs for the label to float
    document.querySelectorAll('input').forEach((el) => {
        el.addEventListener('focus', (e) => {
            const target = e.target as HTMLInputElement;
            target.closest('label').classList.add('moveLabel')
        })
        el.addEventListener('blur', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.value === '') {
                target.closest('label').classList.remove('moveLabel')
            }
        })
        el.addEventListener('change', (e) => {
            const target = e.target as HTMLInputElement;
            if (target.value === '') {
                target.closest('label').classList.remove('moveLabel')
            } else {
                target.closest('label').classList.add('moveLabel')
            }
        })
    })


    // Set listeners on toggle password visibility
    document.querySelectorAll('.password-toggle').forEach((el) => {
        el.addEventListener('click', (e) => {
            console.log('clicked')
            const target = e.target as HTMLElement;
            const label = target.closest('label')
            const input = label.querySelector('input') as HTMLInputElement;
            const isShowingPassword = label.getAttribute('password-toggle') == "hide" ? true : false
            if (isShowingPassword) {
                input.type = 'text';
                label.setAttribute('password-toggle', "show")
            } else {
                input.type = 'password';
                label.setAttribute('password-toggle', "hide")
            }
        })
    })

}

// Write a friendly message to the user
export function writeFriendlyMessage() {
    const loginMessage = authMessages['login-messages'][Math.floor(Math.random() * authMessages['login-messages'].length)]
    const signupMessage = authMessages['signup-messages'][Math.floor(Math.random() * authMessages['signup-messages'].length)]
    document.querySelectorAll('.login h2, .signup h2').forEach((el) => el.remove())
    document.querySelector('.login').insertAdjacentHTML('afterbegin', `<h2>${loginMessage}</h2>`)
    document.querySelector('.signup').insertAdjacentHTML('afterbegin', `<h2>${signupMessage}</h2>`)
}

export function setFormSubmitListeners(options = {}) {
 
    const signupEl = document.getElementById('signup')
    signupEl.addEventListener('submit', (e) => {
        console.log('submitting')
        e.preventDefault();
        const formData = {
            firstname: (document.getElementById('firstname') as HTMLInputElement).value,
            lastname: (document.getElementById('lastname') as HTMLInputElement).value,
            username: (document.getElementById('username') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            password: (document.getElementById('password') as HTMLInputElement).value,
            confirm_password: (document.getElementById('confirm_password') as HTMLInputElement).value,
            signup: true, // Adding this so the form is aware of this field
            //@ts-ignore
            recaptcha: document.body?.data?.recaptcha || null

        }
        signupForm.clearErrors(formData);
        const button = new Button(signupEl.querySelector('button'));
        button.awaitButton(); // <-- Show loading spinner "Loading..."
        // This set timeout is to simulate a loading time
        setTimeout(() => {
            signupForm.submit(formData).then(() => {
                console.log("Form submitted successfully!");
                SAASController.authService.pushToHistory({page: 'welcome'}, 'Welcome Page', root + '/welcome.html'); 
                button.resetButton();
            }).catch(err => {
                console.log("(client) Signup Error: ", { err })
                signupForm.displayErrors({ "signup": ["Failed to signup. Please try again."] });
                button.resetButton();
            })
        }, 2000)

        
    })


    const loginEl = document.getElementById('login')
    loginEl.addEventListener('submit', (e) => {
        console.log('submitting login')
        e.preventDefault();
        const formData = {
            "email-login": (document.getElementById('email-login') as HTMLInputElement).value,
            "password-login": (document.getElementById('password-login') as HTMLInputElement).value,
            "login": true,
            "remember-me": (document.getElementById('remember-me') as HTMLInputElement).checked
        }
        loginForm.clearErrors(formData);
        try {
            // show spinner while submission loads (SImulate loading)
            const button = new Button(loginEl.querySelector('button'));
            button.awaitButton();
            setTimeout(() => {
                loginForm.submit(formData).then((user) => {
                    console.log("Form submitted successfully!", { user });
                    SAASController.authService.pushToHistory({page: 'welcome'}, 'Welcome Page', root + '/welcome.html'); 
                    button.resetButton();
                }).catch(err => {
                    console.log("(client) login error: ", { err })
                    button.resetButton();
                    // Display error 
                    loginForm.displayErrors({ "login": ["Failed to log in. Please try again."] });
                })
            }, 2000)

        } catch (error) {

        }
    })

    // Set up analytics
}