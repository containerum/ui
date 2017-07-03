import {
    DELETE_POD_REQUEST,
    DELETE_POD_SUCCESS,
    DELETE_POD_FAILURE
} from '../../constants/PodConstants';

export default function DeletePodReducer(state = {
    isFetching: false,
    errorMessage: '',
    podName: '',
    status: 0
}, action) {
    switch (action.type) {
    case DELETE_POD_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: ''
        });
    case DELETE_POD_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            podName: action.podName,
            status: action.status
        });
    case DELETE_POD_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
