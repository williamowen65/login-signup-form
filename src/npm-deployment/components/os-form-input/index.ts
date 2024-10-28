import { capitalizeFirstLetter } from "../../../utils/stringMethods";
import { createCustomElement } from "../../utils/custom-element";
//@ts-ignore
import cssContent from "./style.scss";


createCustomElement('os-form-input',function() {
    document.addEventListener("DOMContentLoaded", () => {
        let inputType = this.getAttribute('type') || 'text';
        let fieldName = this.getAttribute("fieldname") || "" 
        console.log({this: this, fieldName})

    if(inputType == 'password'){
        this.shadowRoot.querySelector('div').innerHTML = `
        <label for="${fieldName}" password-toggle="hide">
          <span class="text">${capitalizeFirstLetter(fieldName)}</span>
          <div class="${fieldName}-container">
            <input type="password" id="${fieldName}" name="${fieldName}" />
            <div id="password-error" class="error-message"></div>
            <div class="password-strength"></div>
            <i class="password-toggle show-password fa-solid fa-eye-slash"></i>
            <i class="password-toggle hide-password fa-solid fa-eye"></i>
          </div>
        </label>
        
        `
    } else {

        this.shadowRoot.querySelector('div').innerHTML = `
        <label for="${fieldName}">
        <span class="text">${capitalizeFirstLetter(fieldName)}</span>
        <input type="text" id="${fieldName}" name="${fieldName}" />
        <div id="${fieldName}-error" class="error-message"></div>
        </label>
        `
        }

  // Set listeners on all inputs for the label to float
  this.shadowRoot.querySelectorAll('input').forEach((el: HTMLInputElement ) => {
    el.addEventListener('focus', (e) => {
        const target = e.target as HTMLInputElement;
        target.closest('label').classList.add('moveLabel')
    })
    el.addEventListener('blur', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.value === '') {
            target.closest('label').classList.remove('moveLabel')
        }
    })
    el.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.value === '') {
            target.closest('label').classList.remove('moveLabel')
        } else {
            target.closest('label').classList.add('moveLabel')
        }
    })

    // Set listeners on toggle password visibility
    document.querySelectorAll('.password-toggle').forEach((el) => {
        el.addEventListener('click', (e) => {
            console.log('clicked')
            const target = e.target as HTMLElement;
            const label = target.closest('label')
            const input = label.querySelector('input') as HTMLInputElement;
            const isShowingPassword = label.getAttribute('password-toggle') == "hide" ? true : false
            if (isShowingPassword) {
                input.type = 'text';
                label.setAttribute('password-toggle', "show")
            } else {
                input.type = 'password';
                label.setAttribute('password-toggle', "hide")
            }
        })
    })

})

})

  }, "<div></div>", cssContent);

  