import { capitalizeFirstLetter } from "../../../utils/stringMethods";
import { createCustomElement } from "../../utils/custom-element";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEyeSlash);

//@ts-ignore
import cssContent from "./style.scss";

/* IMPORTANT NOTE: Validation is set on the inputs via the src\npm-deployment\components\os-form\index.ts */
createCustomElement('os-form-input', function () {
    // dom.watch();


        let inputType = this.getAttribute('type') || 'text';
        let fieldName = this.getAttribute("fieldname") || ""
        let alias = this.getAttribute("alias") || "";
        console.log({ this: this, fieldName })

        if (inputType == 'password') {
            this.shadowRoot.querySelector('div').innerHTML = `
        <label for="${fieldName}" password-toggle="hide" >
          <small class="text" part="labelText">${alias || capitalizeFirstLetter(fieldName)}</small>
          
          <div class="password-container">
            <input type="password" id="${fieldName}" name="${fieldName}" />
            <div id="${fieldName}-error" class="error-message"></div>
            <div class="password-strength"></div>
            <i class="password-toggle show-password fa-solid fa-eye-slash"></i>
            <i class="password-toggle hide-password fa-solid fa-eye"></i>
          </div>
        </label>        
        `

            setPasswordVisibilityListener.bind(this)()
        } else {

            this.shadowRoot.querySelector('div').innerHTML = `
        <label for="${fieldName}" >
        <small class="text" part="labelText">${alias || capitalizeFirstLetter(fieldName)}</small>
        <input type="text" id="${fieldName}" name="${fieldName}" />
        <div id="${fieldName}-error" class="error-message"></div>
        </label>
        `
        }

        // Manually trigger Font Awesome icon replacement within the Shadow DOM
        dom.i2svg({ node: this.shadowRoot });

        // Set listeners on all inputs for the label to float
        this.shadowRoot.querySelectorAll('input').forEach((el: HTMLInputElement) => {
            el.addEventListener('focus', (e) => {
                const target = e.target as HTMLInputElement;
                target.closest('label').classList.add('moveLabel');
                target.closest('label').querySelector('[part]').setAttribute('part', 'labelText moveLabel');
            })
            el.addEventListener('blur', (e) => {
                const target = e.target as HTMLInputElement;
                if (target.value === '') {
                    target.closest('label').classList.remove('moveLabel')
                    target.closest('label').querySelector('[part]').setAttribute('part', 'labelText');
                }
            })
            el.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement;
                if (target.value === '') {
                    target.closest('label').classList.remove('moveLabel');
                    target.closest('label').querySelector('[part]').setAttribute('part', 'labelText');
                } else {
                    target.closest('label').classList.add('moveLabel');
                    target.closest('label').querySelector('[part]').setAttribute('part', 'labelText moveLabel');
                }
            })



            this.value = function () {
                return this.shadowRoot.querySelector("input").value;
            }




        })


        function setPasswordVisibilityListener() {
            setTimeout(() => {

            // Ensure elements exist before adding event listeners
            const passwordToggles = this.shadowRoot.querySelectorAll('.password-toggle');
            if (passwordToggles.length > 0) {
                //@ts-ignore
                passwordToggles.forEach((el) => {
                    console.log("assign password toggle ", { el });
                    //@ts-ignore
                    el.addEventListener('click', (e) => {
                        console.log('clicked');
                        const target = e.target as HTMLElement;
                        const label = target.closest('label');
                        if (label) {
                            const input = label.querySelector('input') as HTMLInputElement;
                            const isShowingPassword = label.getAttribute('password-toggle') === "hide";
                            if (isShowingPassword) {
                                input.type = 'text';
                                label.setAttribute('password-toggle', "show");
                            } else {
                                input.type = 'password';
                                label.setAttribute('password-toggle', "hide");
                            }
                        }
                    });
                });
            } else {
                console.log("error?: ", { passwordToggles, s: this.shadowRoot });
                console.error('No elements with class "password-toggle" found.');
            }
        }, 100)

        }

        // // Set listeners on toggle password visibility
        // //@ts-ignore
        // this.shadowRoot.querySelectorAll('.password-toggle').forEach((el) => {
        //     console.log("assign password toggle ", { el })
        //     //@ts-ignore
        //     el.addEventListener('click', (e) => {
        //         console.log('clicked')
        //         const target = e.target as HTMLElement;
        //         const label = target.closest('label')
        //         const input = label.querySelector('input') as HTMLInputElement;
        //         const isShowingPassword = label.getAttribute('password-toggle') == "hide" ? true : false
        //         if (isShowingPassword) {
        //             input.type = 'text';
        //             label.setAttribute('password-toggle', "show")
        //         } else {
        //             input.type = 'password';
        //             label.setAttribute('password-toggle', "hide")
        //         }
        //     })
        // })


}, `  <div></div>`, cssContent);

