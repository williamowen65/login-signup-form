import './styles.scss';
import { setUXEventListeners, setFormSubmitListeners, writeFriendlyMessage } from './eventListeners';
import SAASController from './interfaces/SAASController';
setUXEventListeners();
writeFriendlyMessage();
setFormSubmitListeners();
console.log({ pathname: document.location.pathname,
    protectRoute: SAASController.authService.protectRoute
});
// SAASController.authService.protectRoute(document.location.pathname)
