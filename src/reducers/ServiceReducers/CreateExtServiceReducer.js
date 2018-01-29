import {
    CREATE_EXT_SERVICE_REQUEST,
    CREATE_EXT_SERVICE_SUCCESS,
    CREATE_EXT_SERVICE_FAILURE
} from '../../constants/CreateServiceConstants';

export default function CreateExtServiceReducer(state = {
	isFetching: false,
	data: {},
	status: '',
	idServ: '',
	errorMessage: ''
}, action) {
	switch (action.type) {
		case CREATE_EXT_SERVICE_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: {},
				errorMessage: '',
				status: '',
				idServ: ''
			});
		case CREATE_EXT_SERVICE_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: action.data,
				status: action.status,
				idServ: action.idServ
			});
		case CREATE_EXT_SERVICE_FAILURE:
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
