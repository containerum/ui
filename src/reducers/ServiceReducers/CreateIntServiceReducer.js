import {
    CREATE_INT_SERVICE_REQUEST,
    CREATE_INT_SERVICE_SUCCESS,
    CREATE_INT_SERVICE_FAILURE
} from '../../constants/CreateServiceConstants';

export default function CreateIntServiceReducer(state = {
	isFetching: false,
	data: {},
	status: '',
	idServ: '',
	errorMessage: ''
}, action) {
	switch (action.type) {
		case CREATE_INT_SERVICE_REQUEST:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: {},
				errorMessage: '',
				status: '',
				idServ: ''
			});
		case CREATE_INT_SERVICE_SUCCESS:
			return Object.assign({}, state, {
				isFetching: action.isFetching,
				data: action.data,
				status: action.status,
				idServ: action.idServ
			});
		case CREATE_INT_SERVICE_FAILURE:
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
