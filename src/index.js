import './styles.scss';
import { setUXEventListeners, setFormSubmitListeners, writeFriendlyMessage } from './eventListeners';
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
// SAASController.authService.protectRoute(document.location.pathname)
