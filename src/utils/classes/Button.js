var Button = /** @class */ (function () {
    function Button(button) {
        this.button = button;
    }
    Button.prototype. = function () {
        this.button.setAttribute('disabled', 'true');
        this.button.innerHTML = 'Loading...';
    };
    Button.prototype.resetButton = function () {
        this.button.removeAttribute('disabled');
        this.button.innerHTML = 'Submit';
    };
    return Button;
}());
export default Button;
