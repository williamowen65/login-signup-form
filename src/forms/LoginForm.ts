import { Form } from "../interfaces/Form";
import SAASController from "../interfaces/SAASController";
import { Validator } from "../utils/Validator";


type FormData = {
    email: any; 
    password: any; 
}
export default class LoginForm extends Form {
    validator: Validator
    constructor() {
        super();
        this.validator = new Validator();
    }
    // @ts-ignore
    submit(formData: FormData) {
        this.validator.clearErrors();
        this.clearErrors(formData);
        // Define what validation to perform
        this.validator.isRequired(formData["email-login"], "email-login", {
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

    async logUserIn(formData: FormData) {
        // Use SAASController to create user
       return SAASController.createUser(formData.email,formData.password)
        .then((response: any) => {
            console.log("User account created successfully:", response);
        }).catch((error: any) => {
            console.error("Error creating user account:", error);
        });   
    }
   
}