import {
    GET_VOLUMES_BY_NS_REQUEST,
    GET_VOLUMES_BY_NS_SUCCESS,
    GET_VOLUMES_BY_NS_FAILURE
} from '../../constants/VolumesConstants';

export default function VolumesByNSReducer(state = {
    isFetching: false,
    data: [],
    errorMessage: ''
}, action) {
    switch (action.type) {
    case GET_VOLUMES_BY_NS_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: [],
            errorMessage: ''
        });
    case GET_VOLUMES_BY_NS_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data
        });
    case GET_VOLUMES_BY_NS_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message
        });
    default:
        return state;
    }
}
