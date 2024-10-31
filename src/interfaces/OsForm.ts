import { Validator } from "../utils/validation/Validator";

export interface SubmissionForm {
    
    formClass: Form;
    // @ts-ignore
    submit(formData);

}

export class Form  {
    validator: Validator;
    form: HTMLFormElement;
    
    constructor(formSelector: string){
        this.form = document.querySelector(formSelector) as HTMLFormElement
    }


    
    // @ts-ignore
    displayErrors(errors) {
        console.log("Display Errors: ", {errors})
        for (let field in errors) {
            // Get access to shadow dom of custom element
            const osElement = document.querySelector(`os-form-input[fieldname="${field}"]`);

            const inputElement = osElement.shadowRoot.querySelector(`#${field}`);
            const errorElement = osElement.shadowRoot.querySelector(`#${field}-error`);

            if (errorElement) {
                errorElement.innerHTML = `<small>${errors[field][0]}</small>`
            }

            if (inputElement) {
                inputElement.classList.add("input-error");
            }
        }
    }

    // @ts-ignore
    clearErrors(formData) {
        this.validator.clearErrors();
        for (let field in formData) {
            // Attempt to locate the os-form-input element with the specific fieldname
            const osElement = document.querySelector(`os-form-input[fieldname="${field}"]`);
            
            if (osElement && osElement.shadowRoot) {  // Ensure osElement and shadowRoot are available
                const inputElement = osElement.shadowRoot.querySelector(`#${field}`);
                const errorElement = osElement.shadowRoot.querySelector(`#${field}-error`);
                
                console.log("Clear Errors: ", {field, formData, osElement, inputElement, errorElement});
                
                if (errorElement) {
                    console.log("clearing error");
                    errorElement.innerHTML = "";
                    console.log("clearing error", {html: errorElement.innerHTML});
                } else {
                    console.warn(`Error element not found for field: ${field}`);
                }
    
                if (inputElement) {
                    inputElement.classList.remove("input-error");
                } else {
                    console.warn(`Input element not found for field: ${field}`);
                }
            } else {
                console.warn(`os-form-input element or shadowRoot not found for field: ${field}`);
            }
        }
    }
    
     // @ts-ignore
    // clearErrors(formData) {
    //     for (let field in formData) {
    //         // Get access to shadow dom of custom element
    //         const osElement = document.querySelector(`os-form-input[fieldname="${field}"]`);
            
    //         const inputElement = osElement.shadowRoot.querySelector(`#${field}`);
    //         const errorElement = osElement.shadowRoot.querySelector(`#${field}-error`);
            
    //         console.log("Clear Errors: ", {field, formData, osElement, inputElement, errorElement})
    //         if (errorElement) {
    //             console.log("clearing error")
    //             errorElement.innerHTML = "";
    //         }

    //         if (inputElement) {
    //             inputElement.classList.remove("input-error");
    //         }
    //     }
    // }



   
}

/*
EXAMPLE

class RegistrationForm implements Form {
    constructor() {
        this.validator = new Validator();
    }

    submit(formData) {
        this.validator.clearErrors();

        this.validator.isRequired(formData.username, "Username");
        this.validator.isEmail(formData.email, "Email");
        this.validator.isInRange(formData.age, 18, 100, "Age");

        const errors = this.validator.getErrors();
        if (Object.keys(errors).length === 0) {
            console.log("Form submitted successfully!");
        } else {
            console.log("Form submission failed:");
            this.displayErrors(errors);
        }
    }

    displayErrors(errors) {
        for (let field in errors) {
            const inputElement = document.querySelector(`#${field}`);
            const errorElement = document.querySelector(`#${field}-error`);

            if (errorElement) {
                errorElement.innerHTML = errors[field].join("<br>");
            }

            if (inputElement) {
                inputElement.classList.add("input-error");
            }
        }
    }
}

*/