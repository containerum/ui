import {
    CREATE_SERVICE_REQUEST,
    CREATE_SERVICE_SUCCESS,
    CREATE_SERVICE_FAILURE
} from '../../constants/CreateServiceConstants';

export default function CreateDeploymentReducer(state = {
	isFetching: false
}, action) {
	switch (action.type) {
		case CREATE_SERVICE_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching
			});
		case CREATE_SERVICE_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching
			});
		case CREATE_SERVICE_FAILURE:
			return Object.assign({}, state, {
				isFetching: action.isFetching
			});
		default:
			return state;
	}
}
