import {
    CREATE_VOLUME_REQUEST,
    CREATE_VOLUME_SUCCESS,
    CREATE_VOLUME_FAILURE
} from '../../constants/VolumeConstants';

export default function CreateVolumeReducer(state = {
    isFetching: false,
    data: {},
    status: '',
    idVolume: '',
    errorMessage: ''
}, action) {
    switch (action.type) {
    case CREATE_VOLUME_REQUEST:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: {},
            errorMessage: '',
            status: '',
            idVolume: ''
        });
    case CREATE_VOLUME_SUCCESS:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            data: action.data,
            status: action.status,
            idVolume: action.idVolume
        });
    case CREATE_VOLUME_FAILURE:
        return Object.assign({}, state, {
            isFetching: action.isFetching,
            errorMessage: action.message,
            status: action.status,
            idVolume: action.idVolume
        });
    default:
        return state;
    }
}
