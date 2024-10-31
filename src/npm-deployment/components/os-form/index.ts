import { capitalizeFirstLetter } from "../../../utils/stringMethods";
import { createCustomElement } from "../../utils/custom-element";
//@ts-ignore
import cssContent from "./style.scss";


createCustomElement('os-form', function () {

    // @ts-ignore
    // this.shadowRoot.addEventListener('slotchange', event => {
    //     console.info(this.nodeName);
    //     console.info(this.innerHTML);
    //     const parser = new DOMParser()
    //     const html = parser.parseFromString(this.innerHTML, "text/html");
    //     console.log({ TESTING: html })
    //     console.info(this);
    // });
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

     

        this.addEventListener("keypress", onClick_ENTER);
        function onClick_ENTER(e: Event) {
            if (e instanceof KeyboardEvent && e.key === 'Enter') {
                this.dispatchEvent(new CustomEvent('formSubmit', { bubbles: true, composed: true }));
            }
        }

        function defineOSInputValues(){
            let inputs = Array.from(this.querySelectorAll("os-form-input"))
            const values = inputs.reduce((acc, inputShadowDom) => {
                //@ts-ignore
                const input = inputShadowDom.shadowRoot.querySelector("input")
                //@ts-ignore
                acc[input.name] = {
                    fieldName: input.name,
                    value: input.value,
                    type: input.type,
                    //@ts-ignore
                    alias: inputShadowDom.getAttribute("alias"),
                    input,
                    //@ts-ignore
                    validation: inputShadowDom.validationFunction
                } 
                // maps objects to their values
                return acc
            }, {})
            return values
        }

        //@ts-ignore
        this.addEventListener('formSubmit', function(event){
            console.log("formSubmit", {event, form, this: this})
            
            // Get all input values from the form inputs <-- this is a caveat of custom html elements. (The form component is isolated from the inputs.)
            //  The inputs are not directly accessible from the form element.
            const values = defineOSInputValues.bind(this)();
            
            console.log({values, OsForm: this})

            const submit = new Event("submit", {
                bubbles: true,
                cancelable: true,
            })
            // Handle form submission logic
            form.dispatchEvent(new CustomEvent('submit', {
                bubbles: true,
                cancelable: true,
                detail: { values }
            }));
        });

        /*
        The submit event is kind of tricky because of the shadow dom. The form element is isolated from the inputs.
        It's possible formSubmit and submit events could be combined... (Check with os-form-button which dispatched the formSubmit event)
        but the actual submit triggers the submit logic in the main form class. OsForm.submit() (index.npm.ts)
        */
        form.addEventListener("submit", (e: Event) => {
            e.preventDefault()
            
            // console.log("Local form submit");
            const eventDetail = (e as CustomEvent).detail;
            console.log("Form values from event:", eventDetail.values);
            // console.log({this:this, "test":this.OsForm})
            this.OsForm.submit(eventDetail.values)
        })


    })

}, "<div></div>", cssContent);

