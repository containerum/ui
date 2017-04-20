import {
    VALIDATE_EMAIL, NOT_VALIDATE_EMAIL
} from '../actions';

const initialState = {
    isValidEmail: false,
    emailUser: ''
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
    default:
        return state;
    }
}
