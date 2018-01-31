import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    UPDATE_INT_SERVICE_REQUEST,
    UPDATE_INT_SERVICE_SUCCESS,
    UPDATE_INT_SERVICE_FAILURE
} from '../../constants/UpdateServiceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getUpdateIntService(idName, idService, data) {
    return dispatch => {
        dispatch(requestUpdateIntService());
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
        return axios.put(
            WEB_API + `/api/namespaces/${idName}/services/${idService}`,
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
        	console.log(response.config);
            if (response.status === 202) {
		        // console.log(response.data);
		        idServ = `Internal service ${response.data.name}`;
		        dispatch(receiveUpdateIntService(response.data, response.status, response.config.method, idServ));
		        if (typeof window !== 'undefined') {
			        browserHistory.push('/Namespaces');
		        }
            } else if (response.status === 401) {
		        localStorage.removeItem('id_token');
		        browserHistory.push('/Login');
            } else {
                dispatch(failUpdateIntService(response.data.message, response.status, idServ));
            }
        }).catch(err => {dispatch(failUpdateIntService(err.toString(), 503, idServ)); console.log(err)});
    };
}

function requestUpdateIntService() {
    return {
        type: UPDATE_INT_SERVICE_REQUEST,
        isFetching: true
    };
}

function receiveUpdateIntService(data, status, method, idServ) {
    return {
        type: UPDATE_INT_SERVICE_SUCCESS,
        isFetching: false,
        data,
	    status,
	    method,
	    idServ
    };
}

function failUpdateIntService(message, status, idServ) {
    return {
        type: UPDATE_INT_SERVICE_FAILURE,
        isFetching: false,
	    message,
	    status,
	    idServ
    };
}
