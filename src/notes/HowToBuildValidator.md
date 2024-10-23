For JavaScript, you can create a `Validator` class that associates error messages directly with specific input fields. This way, you can show the error messages next to the corresponding inputs. Here's how you could structure it:

### Step 1: Create the `Validator` Class

```javascript
class Validator {
    constructor() {
        this.errors = {};
    }

    isRequired(value, fieldName) {
        if (!value || value.trim() === '') {
            this.addError(fieldName, `${fieldName} is required.`);
            return false;
        }
        return true;
    }

    isEmail(value, fieldName) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            this.addError(fieldName, `${fieldName} must be a valid email address.`);
            return false;
        }
        return true;
    }

    isInRange(value, min, max, fieldName) {
        if (value < min || value > max) {
            this.addError(fieldName, `${fieldName} must be between ${min} and ${max}.`);
            return false;
        }
        return true;
    }

    isValidLength(value, minLength, maxLength, fieldName) {
        if (value.length < minLength || value.length > maxLength) {
            this.addError(fieldName, `${fieldName} must be between ${minLength} and ${maxLength} characters.`);
            return false;
        }
        return true;
    }

    addError(fieldName, message) {
        if (!this.errors[fieldName]) {
            this.errors[fieldName] = [];
        }
        this.errors[fieldName].push(message);
    }

    getErrors() {
        return this.errors;
    }

    clearErrors() {
        this.errors = {};
    }
}
```

### Step 2: Using the `Validator` Class

Here's an example of how to use the `Validator` class in your form handling:

```javascript
class RegistrationForm {
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
```

### Step 3: Example HTML and Usage

```html
<form id="registration-form">
    <div>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username">
        <div id="username-error" class="error-message"></div>
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="text" id="email" name="email">
        <div id="email-error" class="error-message"></div>
    </div>
    <div>
        <label for="age">Age:</label>
        <input type="number" id="age" name="age">
        <div id="age-error" class="error-message"></div>
    </div>
    <button type="submit">Submit</button>
</form>

<script>
    const form = new RegistrationForm();

    document.getElementById("registration-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            age: parseInt(document.getElementById("age").value, 10)
        };

        form.submit(formData);
    });
</script>
```

### Explanation

1. **Validator Class**:
    - **Errors Object**: Stores errors associated with field names.
    - **Methods**: Different validation checks.
    - **`addError` Method**: Associates error messages directly with field names.

2. **Form Handling**:
    - Use the `Validator` to validate each input.
    - Collect and display errors by matching `id` attributes for inputs and error message elements.
    - Style invalid inputs using a CSS class like `.input-error`.

3. **HTML Structure**:
    - Ensure each input field has a corresponding error message `<div>` identified by `id` (e.g., `username-error`).

This approach makes it easy to show validation messages next to the relevant inputs on the form.