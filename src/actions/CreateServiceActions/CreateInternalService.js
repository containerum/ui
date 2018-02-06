import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    CREATE_INT_SERVICE_REQUEST,
    CREATE_INT_SERVICE_SUCCESS,
    CREATE_INT_SERVICE_FAILURE
} from '../../constants/CreateServiceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getCreateIntService(idName, data) {
    return dispatch => {
        dispatch(requestCreateIntService());
        let token = '';
        let browser = '';
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            token = localStorage.getItem('id_token');
            browser = localStorage.getItem('id_browser');
        }

        let intObj = {
	        deployment_name: data.currentDeployment,
	        ports: [],
	        external: "false"
        };
	    data.internalServObj.map(item => {
		    intObj.ports.push({
			    name: item.internalServName,
			    port: item.internalServPort,
			    targetPort: item.internalServTargetPort,
			    protocol: item.intServiceType,
		    })
	    });
	    let idServ = idName;
        return axios.post(
            WEB_API + '/api/namespaces/' + idName + '/services',
	        intObj,
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
		        // console.log(response.data);
		        idServ = `Internal service ${response.data.name} for ${intObj.deployment_name}`;
		        dispatch(receiveCreateIntService(response.data, response.status, idServ));
		        if (typeof window !== 'undefined') {
			        browserHistory.push('/Namespaces');
		        }
	        } else if (response.status === 401) {
		        localStorage.removeItem('id_token');
		        browserHistory.push('/Login');
	        } else {
                dispatch(failCreateIntService(response.data.message, response.status, idServ));
            }
        }).catch(err => {dispatch(failCreateIntService(err.toString(), 503, idServ)); console.log(err)});
    };
}

function requestCreateIntService() {
    return {
        type: CREATE_INT_SERVICE_REQUEST,
        isFetching: true
    };
}

function receiveCreateIntService(data, status, idServ) {
    return {
        type: CREATE_INT_SERVICE_SUCCESS,
        isFetching: false,
        data,
	    status,
	    idServ
    };
}

function failCreateIntService(message, status, idServ) {
    return {
        type: CREATE_INT_SERVICE_FAILURE,
        isFetching: false,
	    message,
	    status,
	    idServ
    };
}
