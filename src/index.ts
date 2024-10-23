import './styles.scss';

console.log("Hello World!d");
const dividerEl = document.querySelector('#auth-container')

document.querySelectorAll('.toggleAuthType').forEach((el) => {
    el.addEventListener('click', () => {
        dividerEl.getAttribute('auth-mode') === 'login' ? dividerEl.setAttribute('auth-mode', 'signup') : dividerEl.setAttribute('auth-mode', 'login')
    })    
})
