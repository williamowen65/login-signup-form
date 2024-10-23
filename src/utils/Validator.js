
import {capitalizeFirstLetter} from './stringMethods';

export class Validator{
    constructor(){
        this.errors = [];   
    }
    isRequired(value, fieldName, options ={}){
        if(!value || value.length === 0){
            this.addError(fieldName, `${options.alias || capitalizeFirstLetter(fieldName)} is required`);
            return false;
        }
        return true;
    }
    isEmail(value, fieldName){
        const emailPattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        if(!emailPattern.test(value)){
            this.addError(fieldName, `${capitalizeFirstLetter(fieldName)} is not a valid email`);
            return false;
        }
        return true;
    }
    isValidLength(value, fieldName, min, max){
        if(value.length < min || value.length > max){
            this.addError(fieldName, `${capitalizeFirstLetter(fieldName)} must be between <br> ${min} and ${max} characters`);
            return false;
        }
        return true;
    }
    isMatchingPassword(value1, value2, fieldName, options = {}){
        if(value1 !== value2){
            this.addError(fieldName, `${options.alias || capitalizeFirstLetter(fieldName)} do not match`);
            return false;
        }
        return true;
    }

    addError(fieldName, message){
        if(!this.errors[fieldName]){
            this.errors[fieldName] = [];
        }
        this.errors[fieldName].push(message);
    }
    getErrors(){
        return this.errors;
    }
    clearErrors(){
        this.errors = {};
    }
    
}