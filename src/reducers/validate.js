import {
    VALIDATE_EMAIL, NOT_VALIDATE_EMAIL, VALIDATE_PASSWORD, NOT_VALIDATE_PASSWORD
} from '../actions';

const initialState = {
    isValidEmail: false,
    isValidPassword: false,
    emailUser: '',
    passUser: ''
};

export default function validate(state = initialState, action) {
    switch (action.type) {
    case VALIDATE_EMAIL:
        return {
            ...state,
            isValidEmail: action.isValidEmail,
            emailUser: action.emailUser
        };
    case NOT_VALIDATE_EMAIL:
        return { ...state, isValidEmail: action.isValidEmail };
    case VALIDATE_PASSWORD:
        return {
            ...state,
            isValidPassword: action.isValidPassword,
            passUser: action.passUser
        };
    case NOT_VALIDATE_PASSWORD:
        return { ...state, isValidPassword: action.isValidPassword };
    default:
        return state;
    }
}
