import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from '../../constants/LogoutConstants';

// import {
//     WEB_API
// } from '../../constants/WebApi';

export function logoutUser() {
    return dispatch => {
        try {
            dispatch(requestLogout());
            localStorage.removeItem('id_token');
            // localStorage.removeItem('icon_profile');
            // localStorage.removeItem('icon_profile_big');
            dispatch(receiveLogout());
        } catch (e) {
            dispatch(failureLogout(e));
        }
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    };
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    };
}

function failureLogout(message) {
    return {
        type: LOGOUT_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    };
}
