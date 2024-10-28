import { capitalizeFirstLetter } from "../../../utils/stringMethods";
import { createCustomElement } from "../../utils/custom-element";
//@ts-ignore
import cssContent from "./style.scss";


createCustomElement('os-form',function() {
    document.addEventListener("DOMContentLoaded", () => {
        // let fieldName = this.getAttribute("fieldname") || "" 
        // console.log({this: this, fieldName})

        // this.shadowRoot.querySelector('div').innerHTML = `
        // <form>
        //     <slot></slot>
        // </form>
        // `
 



    })

}, "<form><slot></slot></form>", cssContent);

  