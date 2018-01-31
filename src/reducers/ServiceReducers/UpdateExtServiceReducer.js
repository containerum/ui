import {
    UPDATE_EXT_SERVICE_REQUEST,
    UPDATE_EXT_SERVICE_SUCCESS,
    UPDATE_EXT_SERVICE_FAILURE
} from '../../constants/UpdateServiceConstants';

export default function UpdateExtServiceReducer(state = {
	isFetching: false,
	data: {},
	status: '',
	idServ: '',
	method: '',
	errorMessage: ''
}, action) {
	switch (action.type) {
		case UPDATE_EXT_SERVICE_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: {},
				errorMessage: '',
				status: '',
				method: '',
				idServ: ''
			});
		case UPDATE_EXT_SERVICE_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: action.data,
				status: action.status,
				method: action.method,
				idServ: action.idServ
			});
		case UPDATE_EXT_SERVICE_FAILURE:
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
