// import { root } from './globals';
// import SAASController from './interfaces/SAASController';
// import SASSController from './interfaces/SAASController';
// import "./styles.scss"

import { Form, SubmissionForm } from "../interfaces/OsForm";
import { Validator } from "../utils/validation/OsValidator"; // local validator
import "./components/os-form-input/index"
import "./components/os-form/index"
import "./components/os-form-button/index"

// console.log({document: document.location.pathname})
// SAASController.authService.protectRoute(document.location.pathname)

// document.getElementById('logout')?.addEventListener('click', () => {
//     // Handle logout logic here
//     console.log('User logged out');
//     sayGoodbye()
//     .then(() => SASSController.authService.logout())
//     .then(() => {
//         window.location.href = root + '/';
//     })
// });

// async function sayGoodbye(){
//     return new Promise((res, rej) => {
//         (document.querySelector('#goodbye') as HTMLElement).style.display = 'block'
//         setTimeout(() => {
//             res(null)
//         },4000)
//     })
// }

// import './styles.scss';
// import {setUXEventListeners, setFormSubmitListeners, writeFriendlyMessage} from './eventListeners'
// import LoginForm from './forms/LoginForm';
// import SignupForm from './forms/SignupForm';
// import SignupForm from './forms/SignupForm'
// Class has already been instantiated
// import SAASController from './interfaces/SAASController';




// console.log({loginForm, signupForm})
// console.log('test')


// // Various listeners 
// setUXEventListeners();
// // Writes random entry in the cover slides
// writeFriendlyMessage();

// // Various listeners for form submits
// setFormSubmitListeners();

/*
This file contains a single class that can be used to add this login-signup-form into a workflow.

Some requirements: A user must be willing to pair with Firebase SAAS unless the coupling in SAASController is updated to be customized. 

The styles and the html are going to be hard coded.

I want to be able to pass is via custom component.
<script>
    import OsForm from 'os-ui-components/form'
    new OsForm("signup", {
        firebaseConfig: 'Points to file',
        recaptcha: clientKey 
    })

</script>

<div class="os-dual-form" data-primary="login"> 
    <os-form id="signup">
        <os-form-input></os-form-input>
        <os-form-input></os-form-input>
        <os-form-input></os-form-input>
        <os-form-recaptcha></os-form-recaptcha>
    </os-form>
    <os-form id="login">
      <os-form-input></os-form-input>
        <os-form-input></os-form-input>
        <os-form-input></os-form-input>
        <os-form-button></os-form-button>
    </os-form>
</div>
*/
// console.log("HI")
// 

// This Class is like signup/login
// This is a class that the client can use to do the following:
// 1. Define the form by passing in the form selector
// 2. Define validation for the form



class OsForm implements SubmissionForm{
        formClass: Form;
        validatorCallback: Function;
        constructor(formSelector: string, validator: Validator){
            // super(formSelector);
            this.formClass = new Form(formSelector)
            //@ts-ignore
            this.formClass.form.OsForm = this;
            console.log("init form", {formClass: this.formClass})
            this.formClass.validator = validator;
        }
        // The user should forced to make a submit function at some point in the workflow
        submit(formData: any){
            this.formClass.validator.clearErrors();
            this.validatorCallback(formData)
            const errors = this.formClass.validator.getErrors();
            console.log("Submitted form - from osForm", {formData, errors})

            if (Object.keys(errors).length === 0) {
                console.log("Form submitted successfully!");
            //     return SAASController.authService.createUser(formData.email,formData.password) // Promise
            } else {
                console.log("Form submission failed: ", errors);
                this.formClass.displayErrors(errors);
                // throw new Error("Form submission failed"); // Should be caught by calling code
            }

        }

        // This might be a function better suited to be defined in the Form Class, becuase it can be "under the hood"
        
        defineComponents(){ // not used
            // Components are defined as html components on load
        }

        setValidation(validationFunction: Function){
            console.log("setValidation",{validationFunction})
            this.validatorCallback = validationFunction
        }

         // Method to set a custom validation function
        setInputValidation(selector:string, validationFunction: Function) {

           const input =  this.formClass.form.querySelector(`[fieldName="${selector}"]`) 
           //@ts-ignore
           input.setInputValidation(validationFunction)
           console.log({input, formClass: this.formClass})
        }

}

document.addEventListener("DOMContentLoaded", () => {
    // @ts-ignore
    window.OsForm = OsForm
    // @ts-ignore
    window.OsValidator = Validator
    console.log({window})
})

/**
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
 */


// const timmy= new OsForm("#TestForm")
// console.log("hi, {}", {OsForm, timmy})
// export default timmy;

// export const test = 1234

// text = 2312321