import {
    UPDATE_INT_SERVICE_REQUEST,
    UPDATE_INT_SERVICE_SUCCESS,
    UPDATE_INT_SERVICE_FAILURE
} from '../../constants/UpdateServiceConstants';

export default function UpdateIntServiceReducer(state = {
	isFetching: false,
	data: {},
	status: '',
	method: '',
	idServ: '',
	errorMessage: ''
}, action) {
	switch (action.type) {
		case UPDATE_INT_SERVICE_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: {},
				errorMessage: '',
				status: '',
				method: '',
				idServ: ''
			});
		case UPDATE_INT_SERVICE_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: action.data,
				status: action.status,
				method: action.method,
				idServ: action.idServ
			});
		case UPDATE_INT_SERVICE_FAILURE:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				errorMessage: action.message,
				status: action.status,
				idServ: action.idServ
			});
		default:
			return state;
	}
}
