import {
    VALIDATE_EMAIL, NOT_VALIDATE_EMAIL, VALIDATE_PASSWORD, NOT_VALIDATE_PASSWORD
} from '../../constants/ValudateEmailConstaints';

export function validateEmail(emailUser) {
    return {
        type: VALIDATE_EMAIL,
        isValidEmail: true,
        emailUser
    }
}

export function notValidateEmail() {
    return {
        type: NOT_VALIDATE_EMAIL,
        isValidEmail: false
    }
}

export function validatePassword(passUser) {
    return {
        type: VALIDATE_PASSWORD,
        isValidPassword: true,
        passUser
    }
}

export function notValidatePassword() {
    return {
        type: NOT_VALIDATE_PASSWORD,
        isValidPassword: false
    }
}
