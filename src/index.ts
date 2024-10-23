import './styles.scss';
import authMessages from './authFormWelcomes.json'

console.log("Hello World!d", { authMessages });

writeFriendlyMessage()

const dividerEl = document.querySelector('#auth-container')
document.querySelectorAll('.toggleAuthType').forEach((el) => {
    el.addEventListener('click', () => {
        dividerEl.getAttribute('auth-mode') === 'login' ? dividerEl.setAttribute('auth-mode', 'signup') : dividerEl.setAttribute('auth-mode', 'login')
        writeFriendlyMessage();
    })
})

function writeFriendlyMessage() {
    const loginMessage = authMessages['login-messages'][Math.floor(Math.random() * authMessages['login-messages'].length)]
    const signupMessage = authMessages['signup-messages'][Math.floor(Math.random() * authMessages['signup-messages'].length)]
    document.querySelector('.login').innerHTML = `<h2>${loginMessage}</h2>`
    document.querySelector('.signup').innerHTML = `<h2>${signupMessage}</h2>`
}

// Set listeners on all inputs for the label to float
document.querySelectorAll('input').forEach((el) => {
    el.addEventListener('focus', (e) => {
        const target = e.target as HTMLInputElement;
        target.closest('label').classList.add('moveLabel')
     })
    el.addEventListener('blur', (e) => {
        const target = e.target as HTMLInputElement;
        if(target.value === '') {
            target.closest('label').classList.remove('moveLabel')
        } 
     })
    el.addEventListener('change', (e) => { 
        const target = e.target as HTMLInputElement;
        if(target.value === '') {
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
        if(isShowingPassword) {
            input.type = 'text';
            label.setAttribute('password-toggle', "show")
        } else {
            input.type = 'password';
            label.setAttribute('password-toggle', "hide")
        }
        
      
    })
})
