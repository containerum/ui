import {
    POD_REQUEST,
    POD_SUCCESS,
    POD_FAILURE
} from '../constants/PodConstants';

export default function PodReducer(state = {
    isFetching: false,
    data: {},
    errorMessage: ''
}, action) {
    switch (action.type) {
    case POD_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case POD_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case POD_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state
    }
}