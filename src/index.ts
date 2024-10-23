import './styles.scss';
import authMessages from  './authFormWelcomes.json'

console.log("Hello World!d", {authMessages});

writeFriendlyMessage()

const dividerEl = document.querySelector('#auth-container')
document.querySelectorAll('.toggleAuthType').forEach((el) => {
    el.addEventListener('click', () => {
        dividerEl.getAttribute('auth-mode') === 'login' ? dividerEl.setAttribute('auth-mode', 'signup') : dividerEl.setAttribute('auth-mode', 'login')
        writeFriendlyMessage();
    })    
})

function writeFriendlyMessage(){
    const loginMessage = authMessages['login-messages'][Math.floor(Math.random() * authMessages['login-messages'].length)] 
    const signupMessage = authMessages['signup-messages'][Math.floor(Math.random() * authMessages['signup-messages'].length)] 
    document.querySelector('.login').innerHTML = `<h2>${loginMessage}</h2>`
    document.querySelector('.signup').innerHTML = `<h2>${signupMessage}</h2>`
}


