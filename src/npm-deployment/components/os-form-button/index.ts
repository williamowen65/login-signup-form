import { capitalizeFirstLetter } from "../../../utils/stringMethods";
import { createCustomElement } from "../../utils/custom-element";
//@ts-ignore
import cssContent from "./style.scss";

const html =

createCustomElement('os-form-button',function() {
    document.addEventListener("DOMContentLoaded", () => {
        const type = this.getAttribute("type") || "button"; // Alt: provide submit 

       this.shadowRoot.querySelector('div').innerHTML = 
       `
        <button type="${type}">
            <slot><div style="">Unnamed Button</div><slot>
        </button>`;


    })

}, "<div></div>", cssContent);

  