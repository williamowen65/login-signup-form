import { Form } from "../interfaces/Form";
import { Validator } from "../utils/Validator";
import SAASController from "../interfaces/SAASController";


type FormData = {
    firstname: any; 
    lastname: any; 
    username: any; 
    email: any; 
    password: any; 
    confirm_password: any;
}
export default class SignupForm extends Form {
    validator: Validator
    constructor() {
        super('#signup');
        this.validator = new Validator();
        super.registerReCAPTCHA()
    }
    async submit(formData: FormData) {
        this.validator.clearErrors();
        this.clearErrors(formData);
        // Define what validation to perform
        this.validator.isRequired(formData.firstname, "firstname", {
            alias: "First Name"
        });
        this.validator.isRequired(formData.lastname, "lastname", {
            alias: "Last Name"
        });
        this.validator.isRequired(formData.username, "username");
        this.validator.isValidLength(formData.username, "username", 8, 20);
        this.validator.isRequired(formData.email, "email");
        this.validator.isEmail(formData.email, "email");
        this.validator.isRequired(formData.password, "password");
        this.validator.isValidLength(formData.password, "password", 8, 100);
        this.validator.isMatchingPassword(formData.password, formData.confirm_password, "confirm_password", {
            alias: "Passwords"
        });

        const errors = this.validator.getErrors();
        if (Object.keys(errors).length === 0) {
            console.log("Form submitted successfully!");
            return SAASController.authService.createUser(formData.email,formData.password) // Promise
        } else {
            console.log("Form submission failed:");
            this.displayErrors(errors);
            throw new Error("Form submission failed"); // Should be caught by calling code
        }
    }

 

   

}