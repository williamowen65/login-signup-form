import { Form } from "../interfaces/Form";
import { Validator } from "../utils/Validator";

export default class SignupForm extends Form {
    validator: Validator
    constructor() {
        super();
        this.validator = new Validator();
    }
    submit(formData) {
        console.log({formData})
        this.validator.clearErrors();
        // Define what validation to perform
        this.validator.isRequired(formData.username, "username");
        this.validator.isEmail(formData.email, "email");
        this.validator.isValidLength(formData.password,"password", 8, 100);
        this.validator.isMatchingPassword(formData.password, formData.confirm_password, "confirm_password", {
            alias: "Passwords"
        });

        const errors = this.validator.getErrors();
        if (Object.keys(errors).length === 0) {
            console.log("Form submitted successfully!");
        } else {
            console.log("Form submission failed:");
            this.displayErrors(errors);
        }

    }
   
}