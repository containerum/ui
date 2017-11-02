import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE
} from '../../constants/ChangePasswordConstaints';

export default function ChangePasswordReducer(state = {
    isFetching: false,
    data: '',
    errorMessage: '',
    status: '',
    method: '',
    password: ''
}, action) {
    switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: '',
            errorMessage: '',
            status: '',
            method: '',
            password: ''
        });
    case CHANGE_PASSWORD_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data,
            status: action.status,
            method: action.method,
            password: action.password
        });
    case CHANGE_PASSWORD_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message,
            status: action.status,
            password: action.password
        });
    default:
        return state;
    }
}
