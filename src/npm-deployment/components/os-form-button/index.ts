import { capitalizeFirstLetter } from "../../../utils/stringMethods";
import { createCustomElement } from "../../utils/custom-element";
//@ts-ignore
import cssContent from "./style.scss";


//@ts-ignore
function getValue(shadowDom){
    return shadowDom.value()
}

createCustomElement('os-form-button',function() {
    document.addEventListener("DOMContentLoaded", () => {
        const type = this.getAttribute("type") || "button"; // Alt: provide submit 

       this.shadowRoot.querySelector('div').innerHTML = 
       `<button type="${type}">
            <slot><div style="">Unnamed Button</div><slot>
        </button>
        <div id="button-error" class="error-message"></div>
        `;

        this.shadowRoot.querySelector('button').addEventListener('click', () => {
            // Dispatch a custom submit event from os-form-button
            console.log("Get the form data for the form event")
            // You have to manually do this because of the custom component architecture of shadowDOM/shadowScope.
            
            this.dispatchEvent(new CustomEvent('formSubmit', { bubbles: true, composed: true }));
        });
    })

}, "<div></div>", cssContent);

  