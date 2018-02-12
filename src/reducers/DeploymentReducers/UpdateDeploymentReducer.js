import {
	UPDATE_DEPLOYMENT_REQUEST,
	UPDATE_DEPLOYMENT_SUCCESS,
	UPDATE_DEPLOYMENT_FAILURE
} from '../../constants/UpdateDeploymentConstants';

export default function UpdateDeploymentReducer(state = {
	isFetching: false,
	data: {},
	status: '',
	method: '',
	idDep: '',
	errorMessage: ''
}, action) {
	switch (action.type) {
		case UPDATE_DEPLOYMENT_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: {},
				errorMessage: '',
				status: '',
				method: '',
				idDep: ''
			});
		case UPDATE_DEPLOYMENT_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: action.data,
				status: action.status,
				method: action.method,
				idDep: action.idDep
			});
		case UPDATE_DEPLOYMENT_FAILURE:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				errorMessage: action.message,
				status: action.status,
				idDep: action.idDep
			});
		default:
			return state;
	}
}
