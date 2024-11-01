//@ts-nocheck
 class ReCaptchaController{
    constructor(){
        console.log("ReCaptchaController")
    }
    init(){
        console.log("ReCaptchaController.init")
    }
    render(){
        console.log("ReCaptchaController.render")
        
document.addEventListener("DOMContentLoaded", () => {

    const script = document.createElement('script');
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    const script2 = document.createElement('script');
    script2.src = "https://www.google.com/recaptcha/api.js?onload=OsReCaptchaCallback&render=explicit";
    script2.async = true;
    script2.defer = true;
    document.body.appendChild(script2);
    })
    
    
    
    var widgetId1;
    window.OsReCaptchaCallback = function () {
    
        // 
        // Renders the HTML element with id 'example1' as a reCAPTCHA widget.
        // The id of the reCAPTCHA widget is assigned to 'widgetId1'.
        
        widgetId1 = grecaptcha.render('reCAPTCHA', {
            'sitekey': '6Le7AG0qAAAAAFv2tJ7qSFBI6uCtP1XbDbGjL_lc',
            'theme': 'light',
            "callback": (response) => {
                console.log("VerifyCallback: Call google function for reCAPTCHA", { response })
                // Firebase functions defined in functions folder
                // fetch("https://us-central1-login-signup-form-2024.cloudfunctions.net/checkRecaptcha", {
                fetch("https://checkrecaptcha-njqpalarya-uc.a.run.app", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `secret=${encodeURIComponent("6Le7AG0qAAAAAKHJD25jUAIc5PSw2lBAqlWFk4JI")}&response=${encodeURIComponent(response)}`
                })
                    .then(res => res.json()) // Parse the JSON response
                    .then(data => {
                        if (!document.body.data) document.body.data = {}
                        document.body.data.recaptcha = data
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
    
            }
        })
    };
    }
    destroy(){
        console.log("ReCaptchaController.destroy")
    }
}

new ReCaptchaController().render()