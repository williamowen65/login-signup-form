import { Form } from "../interfaces/Form";
import { Validator } from "../utils/Validator";

export default class LoginForm extends Form {
    validator: Validator
    constructor() {
        super();
        this.validator = new Validator();
    }
    // @ts-ignore
    submit(formData) {
        this.validator.clearErrors();
        this.clearErrors(formData);
        // Define what validation to perform
        this.validator.isRequired(formData["username-or-email"], "username-or-email", {
            alias: "Username or Email"
        });
        this.validator.isRequired(formData['password-login'],"password-login",{
            alias: "Password"
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