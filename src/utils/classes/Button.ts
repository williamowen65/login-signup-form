export default class Button {
    
    constructor(private button: HTMLElement) {
    }

    awaitButton(){
        this.button.setAttribute('disabled', 'true')
        this.button.innerHTML = 'Loading...'
    }

    resetButton(){
        this.button.removeAttribute('disabled')
        this.button.innerHTML = 'Submit'
    }
}