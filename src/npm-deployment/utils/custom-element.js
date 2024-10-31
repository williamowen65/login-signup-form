export async function createCustomElement(name, onload, html, css) {
    // create an HTML template element
    const template = document.createElement('template')


    template.innerHTML = `
    
    <style>
        ${css}
    </style>
    ${html}
    `

    class customElementType extends HTMLElement {
        validationFunction = [];
        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
            this.shadowRoot.appendChild(template.content.cloneNode(true))
        }
        connectedCallback() {
            onload.bind(this)()
            // TODO. Create method... 
            // getAttributes => object of attribute and values
            // use getAttributeNames() (https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttributeNames)
        }

        // Method to set a custom validation function
        setInputValidation(validationFunction) {
            this.validationFunction.push(validationFunction);
        }
    }

    customElements.define(name, customElementType)

}