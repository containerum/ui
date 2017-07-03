import {
    SUPPORT_REQUEST,
    SUPPORT_SUCCESS,
    SUPPORT_FAILURE
} from '../constants/SupportConstants';

export default function SupportReducer(state = {
    isFetching: false,
    data: {}
}, action) {
    switch (action.type) {
    case SUPPORT_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case SUPPORT_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case SUPPORT_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    default:
        return state;
    }
}
