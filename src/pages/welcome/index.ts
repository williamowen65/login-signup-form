import SASSController from '../../interfaces/SAASController';

document.getElementById('logout')?.addEventListener('click', () => {
    // Handle logout logic here
    console.log('User logged out');
    SASSController.logout()
    .then(sayGoodbye)
    .then(() => {
        window.location.href = '/dist/';
    })
});

async function sayGoodbye(){
    return new Promise((res, rej) => {
        
        setTimeout(() => {
            res(null)
        },4000)
    })
}