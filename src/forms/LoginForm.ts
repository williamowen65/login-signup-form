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
            this.logUserIn(formData).then((response) => {
                console.log("Log in response", { response });
                // Redirect to Welcome page
                // window.location.href = "welcome.html";
            }).catch((err) => {
                console.error("Error logging in:", err);
                this.displayErrors({ "login-error": "Failed to log in. Please try again." });
                throw new Error(err.message)
            });
        } else {
            console.log("Form submission failed:", {errors});
            this.displayErrors(errors);
            // passing this error up to the calling code for custom handling
            throw new Error("Something went wrong", )
        }
    }

    async logUserIn(formData: FormData) {
        // Use SAASController to create user
       return await SAASController.loginUser(formData["email-login"],formData["password-login"])
       
    }
   
}