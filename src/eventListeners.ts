import authMessages from './authFormWelcomes.json'
import LoginForm from './forms/LoginForm'
import SignupForm from './forms/SignupForm'

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

export function setFormSubmitListeners() {
    // Setup signup form
    const signupForm = new SignupForm();
    document.getElementById('signup').addEventListener('submit', (e) => {
        console.log('submitting')
        e.preventDefault();
        const formData = {
            firstname: (document.getElementById('firstname') as HTMLInputElement).value,
            lastname: (document.getElementById('lastname') as HTMLInputElement).value,
            username: (document.getElementById('username') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            password: (document.getElementById('password') as HTMLInputElement).value,
            confirm_password: (document.getElementById('confirm_password') as HTMLInputElement).value
        }
        signupForm.submit(formData)
    })

    // Setup login form
    const loginForm = new LoginForm();
    document.getElementById('login').addEventListener('submit', (e) => {
        console.log('submitting login')
        e.preventDefault();
        const formData = {
            "username-or-email": (document.getElementById('username-or-email') as HTMLInputElement).value,
            "password-login": (document.getElementById('password-login') as HTMLInputElement).value
        }
        loginForm.submit(formData)
    })
}