import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    CREATE_EXT_SERVICE_REQUEST,
    CREATE_EXT_SERVICE_SUCCESS,
    CREATE_EXT_SERVICE_FAILURE
} from '../../constants/CreateServiceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getCreateExtService(idName, data) {
    return dispatch => {
        dispatch(requestGetCreateService());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

	    let extObj = {
		    deployment_name: data.currentDeployment,
		    ports: [],
		    external: "true"
	    };
	    data.externalServObj.map(item => {
		    extObj.ports.push({
			    name: item.externalServName,
			    targetPort: item.externalServPort,
			    protocol: item.extServiceType,
		    })
	    });
        return axios.post(
            WEB_API + '/api/namespaces/' + idName + '/services',
	        extObj,
            {
                headers: {
                    'Authorization': token,
                    'User-Client': browser,
                    'Access-Control-Allow-Origin': '*'
                },
                validateStatus: (status) => status >= 200 && status <= 505
            }
        )
        .then(response => {
	        if (response.status === 201) {
		        console.log(response.data);
		        dispatch(receiveGetCreateService(response.data, response.status, idName));
		        if (typeof window !== 'undefined') {
			        browserHistory.push('/Namespaces');
		        }
	        } else if (response.status === 401) {
		        localStorage.removeItem('id_token');
		        browserHistory.push('/Login');
	        } else {
                console.log(response);
                dispatch(failGetCreateService(response.data.message, response.status, idName));
            }
        }).catch(err => {dispatch(failGetCreateService(err.toString(), 503, idName)); console.log(err)});
    };
}

function requestGetCreateService() {
    return {
        type: CREATE_EXT_SERVICE_REQUEST,
        isFetching: true
    };
}

function receiveGetCreateService(data, status, idName) {
    return {
        type: CREATE_EXT_SERVICE_SUCCESS,
        isFetching: false,
        data,
	    status,
	    idName
    };
}

function failGetCreateService(message, status, idName) {
    return {
        type: CREATE_EXT_SERVICE_FAILURE,
        isFetching: false,
	    message,
	    status,
	    idName
    };
}
