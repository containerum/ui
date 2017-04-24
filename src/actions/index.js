export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
export const NOT_VALIDATE_EMAIL = 'NOT_VALIDATE_EMAIL';
export const VALIDATE_PASSWORD = 'VALIDATE_PASSWORD';
export const NOT_VALIDATE_PASSWORD = 'NOT_VALIDATE_PASSWORD';

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('id_token');
        dispatch(receiveLogout())
    }
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

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
