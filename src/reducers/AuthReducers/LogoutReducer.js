import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from '../../constants/LogoutConstants';

let isExistToken = false;
if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    isExistToken = !!localStorage.getItem('id_token');
}
export default function LogoutReducer(state = {
    isFetching: false,
    isAuthenticated: isExistToken
}, action) {
    switch (action.type) {
    case LOGOUT_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isAuthenticated: action.isAuthenticated
        });
    case LOGOUT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isAuthenticated: action.isAuthenticated
        });
    case LOGOUT_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            isAuthenticated: action.isAuthenticated,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
