import { capitalizeFirstLetter } from "../../../utils/stringMethods";
import { createCustomElement } from "../../utils/custom-element";
//@ts-ignore
import cssContent from "./style.scss";


createCustomElement('os-form', function () {

    // @ts-ignore
    this.shadowRoot.addEventListener('slotchange', event => {
        console.info(this.nodeName);
        console.info(this.innerHTML);
        const parser = new DOMParser()
        const html = parser.parseFromString(this.innerHTML, "text/html");
        console.log({ TESTING: html })
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
        console.log({ this: this, form, inputs })

        //     form.addEventListener('submit', (e) => {
        //         // e.preventDefault()
        // console.log("submit")
        //     })


        //@ts-ignore
        this.addEventListener('formSubmit', (event) => {
            console.log("formSubmit", {event, form, this: this})
            
            // Get all input values from the form inputs <-- this is a caveat of custom html elements. (The form component is isolated from the inputs.)
            //  The inputs are not directly accessible from the form element.


            let inputs = Array.from(this.querySelectorAll("os-form-input"))
            const values = inputs.map(inputShadowDom => {
                //@ts-ignore
                const input = inputShadowDom.shadowRoot.querySelector("input")
                // maps objects to their values
                return { [input.name]: {
                    value: input.value,
                    type: input.type,
                    //@ts-ignore
                    alias: inputShadowDom.getAttribute("alias"),
                    input
                } }
            })
            console.log({values})

            // event.preventDefault()
            // Handle form submission logic
            // form.submit(event);
        });


        form.addEventListener("submit", (e: Event) => {
            e.preventDefault()
        })


    })

}, "<div></div>", cssContent);

