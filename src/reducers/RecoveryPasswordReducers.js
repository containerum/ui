import {
    RECOVERY_PASSWORD_REQUEST,
    RECOVERY_PASSWORD_SUCCESS,
    RECOVERY_PASSWORD_FAILURE
} from '../constants/RecoveryPasswordConstants';

export default function RecoveryPasswordReducer(state = {
    isFetching: false,
    status: 0
}, action) {
    switch (action.type) {
    case RECOVERY_PASSWORD_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case RECOVERY_PASSWORD_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            status: action.status
        });
    case RECOVERY_PASSWORD_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            status: action.status
        });
    default:
        return state;
    }
}
