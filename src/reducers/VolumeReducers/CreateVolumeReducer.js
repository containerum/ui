import {
    CREATE_VOLUME_REQUEST,
    CREATE_VOLUME_SUCCESS,
    CREATE_VOLUME_FAILURE
} from '../../constants/VolumeConstants';

export default function CreateVolumeReducer(state = {
    isFetching: false
}, action) {
    switch (action.type) {
    case CREATE_VOLUME_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case CREATE_VOLUME_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    case CREATE_VOLUME_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching
        });
    default:
        return state;
    }
}
