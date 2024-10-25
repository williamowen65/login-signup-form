import { Validator } from "../utils/Validator";


export abstract class Form {
    validator: Validator;
    // @ts-ignore
    submit(formData) {};
    // @ts-ignore
    displayErrors(errors) {
        console.log("Display Errors: ", {errors})
        for (let field in errors) {
            const inputElement = document.querySelector(`#${field}`);
            const errorElement = document.querySelector(`#${field}-error`);

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
        for (let field in formData) {
            const inputElement = document.querySelector(`#${field}`);
            const errorElement = document.querySelector(`#${field}-error`);

            if (errorElement) {
                errorElement.innerHTML = "";
            }

            if (inputElement) {
                inputElement.classList.remove("input-error");
            }
        }
    }
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