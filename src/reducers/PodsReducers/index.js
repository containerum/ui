import {
    PODS_REQUEST,
    PODS_SUCCESS,
    PODS_FAILURE
} from '../../constants/PodsConstants';

export default function PodsReducer(state = {
    isFetching: false,
    data: [],
    errorMessage: ''
}, action) {
    switch (action.type) {
    case PODS_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: [],
            errorMessage: ''
        });
    case PODS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case PODS_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
