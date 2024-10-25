import SAASController from '../../interfaces/SAASController';
import SASSController from '../../interfaces/SAASController';
import "./styles.scss"

SAASController.authService.protectRoute(document.location.pathname)

document.getElementById('logout')?.addEventListener('click', () => {
    // Handle logout logic here
    console.log('User logged out');
    SASSController.authService.logout()
    .then(sayGoodbye)
    .then(() => {
        window.location.href = '/dist/';
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