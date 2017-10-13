import {
    EMAIL_UPDATE_REQUEST,
    EMAIL_UPDATE_SUCCESS,
    EMAIL_UPDATE_FAILURE
} from '../../constants/UpdateEmailConstains';

export default function EmailUpdateReducer(state = {
    isFetching: false,
    errorMessage: '',
    data: ''
}, action) {
    switch (action.type) {
    case EMAIL_UPDATE_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: '',
            data: ''
        });
    case EMAIL_UPDATE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case EMAIL_UPDATE_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
