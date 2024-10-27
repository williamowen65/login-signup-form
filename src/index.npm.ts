import { root } from './globals';
import SAASController from './interfaces/SAASController';
import SASSController from './interfaces/SAASController';
import "./styles.scss"

// console.log({document: document.location.pathname})
// SAASController.authService.protectRoute(document.location.pathname)

document.getElementById('logout')?.addEventListener('click', () => {
    // Handle logout logic here
    console.log('User logged out');
    sayGoodbye()
    .then(() => SASSController.authService.logout())
    .then(() => {
        window.location.href = root + '/';
    })
});

async function sayGoodbye(){
    return new Promise((res, rej) => {
        (document.querySelector('#goodbye') as HTMLElement).style.display = 'block'
        setTimeout(() => {
            res(null)
        },4000)
    })
}

import './styles.scss';
import {setUXEventListeners, setFormSubmitListeners, writeFriendlyMessage} from './eventListeners'
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
// import SignupForm from './forms/SignupForm'
// Class has already been instantiated
// import SAASController from './interfaces/SAASController';




// console.log({loginForm, signupForm})


// Various listeners 
setUXEventListeners();
// Writes random entry in the cover slides
writeFriendlyMessage();

// Various listeners for form submits
setFormSubmitListeners();