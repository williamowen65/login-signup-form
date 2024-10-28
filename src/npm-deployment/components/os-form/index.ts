import { capitalizeFirstLetter } from "../../../utils/stringMethods";
import { createCustomElement } from "../../utils/custom-element";
//@ts-ignore
import cssContent from "./style.scss";


createCustomElement('os-form',function() {

    // @ts-ignore
    this.shadowRoot.addEventListener('slotchange', event => {
        console.info(this.nodeName);
        console.info(this.innerHTML);
        const parser = new DOMParser()
       const html = parser.parseFromString(this.innerHTML, "text/html");
       console.log({TESTING :html})
        console.info(this);
    });
    document.addEventListener("DOMContentLoaded", () => {
        // let fieldName = this.getAttribute("fieldname") || "" 
        // console.log({this: this, fieldName})

        this.shadowRoot.querySelector('div').innerHTML = `
        <form>
            <slot></slot>
        </form>
        `

        const form = this.shadowRoot.querySelector('form');
        // const inputs = form.querySelector("os-form-input")
        const inputs = this.shadowRoot.querySelector("os-form-input")
        console.log({this: this, form, inputs})
 
    //     form.addEventListener('submit', (e) => {
    //         // e.preventDefault()
    // console.log("submit")
    //     })



    })

}, "<div></div>", cssContent);

  