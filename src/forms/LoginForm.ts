import { Form } from "../interfaces/Form";
import SAASController from "../interfaces/SAASController";
import { Validator } from "../utils/Validator";


type FormData = {
    "email-login": any; 
    "password-login": any; 
}
export default class LoginForm extends Form {
    validator: Validator
    constructor() {
        super();
        this.validator = new Validator();
    }
    // @ts-ignore
    async submit(formData: FormData) {

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
            return SAASController.authService.loginUser(formData["email-login"],formData["password-login"])
        } else {
            console.log("Form submission failed:", {errors});
            this.displayErrors(errors);
            // passing this error up to the calling code for custom handling
            throw new Error("Something went wrong", )
        }

        
    }

  
   
}