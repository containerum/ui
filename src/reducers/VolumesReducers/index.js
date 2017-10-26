import {
    VOLUMES_REQUEST,
    VOLUMES_SUCCESS,
    VOLUMES_FAILURE
} from '../../constants/VolumesConstants';

export default function VolumesReducer(state = {
    isFetching: false,
    data: [],
    errorMessage: ''
}, action) {
    switch (action.type) {
    case VOLUMES_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: [],
            errorMessage: ''
        });
    case VOLUMES_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case VOLUMES_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
