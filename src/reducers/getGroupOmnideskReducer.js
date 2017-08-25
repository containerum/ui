import {
    GET_GROUP_OMNIDESK_REQUEST,
    GET_GROUP_OMNIDESK_SUCCESS,
    GET_GROUP_OMNIDESK_FAILURE
} from '../constants/SupportConstants';

export default function GroupOmnideskReducer(state = {
    isFetching: false,
    data: [],
    error: ''
}, action) {
    switch (action.type) {
    case GET_GROUP_OMNIDESK_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case GET_GROUP_OMNIDESK_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case GET_GROUP_OMNIDESK_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            error: action.error
        });
    default:
        return state;
    }
}
