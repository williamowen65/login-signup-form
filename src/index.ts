import './styles.scss';
import {setUXEventListeners, setFormSubmitListeners, writeFriendlyMessage} from './eventListeners'
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
// import SignupForm from './forms/SignupForm'
// Class has already been instantiated
// import SAASController from './interfaces/SAASController';




// console.log({loginForm, signupForm})


setUXEventListeners();
writeFriendlyMessage();

setFormSubmitListeners();


// SAASController.authService.protectRoute(document.location.pathname)




