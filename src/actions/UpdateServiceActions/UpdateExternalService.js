import axios from 'axios';
import { browserHistory } from 'react-router';

import {
    UPDATE_EXT_SERVICE_REQUEST,
    UPDATE_EXT_SERVICE_SUCCESS,
    UPDATE_EXT_SERVICE_FAILURE
} from '../../constants/UpdateServiceConstants';

import {
    WEB_API
} from '../../constants/WebApi';

export function getUpdateExtService(idName, idService, data) {
    return dispatch => {
        dispatch(requestUpdateExtService());
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
	    let idServ = idName;
        return axios.put(
            WEB_API + `/api/namespaces/${idName}/services/${idService}`,
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
	        // console.log(response.config);
            if (response.status === 202) {
		        // console.log(response.data);
		        idServ = `External service ${response.data.name}`;
		        dispatch(receiveUpdateExtService(response.data, response.status, response.config.method, idServ));
		        if (typeof window !== 'undefined') {
			        browserHistory.push('/Namespaces');
		        }
            } else if (response.status === 401) {
		        localStorage.removeItem('id_token');
		        browserHistory.push('/Login');
            } else {
                console.log(response);
                dispatch(failUpdateExtService(response.data.message, response.status, idServ));
            }
        }).catch(err => {dispatch(failUpdateExtService(err.toString(), 503, idServ)); console.log(err)});
    };
}

function requestUpdateExtService() {
    return {
        type: UPDATE_EXT_SERVICE_REQUEST,
        isFetching: true
    };
}

function receiveUpdateExtService(data, status, method, idServ) {
    return {
        type: UPDATE_EXT_SERVICE_SUCCESS,
        isFetching: false,
        data,
	    status,
	    method,
	    idServ
    };
}

function failUpdateExtService(message, status, idServ) {
    return {
        type: UPDATE_EXT_SERVICE_FAILURE,
        isFetching: false,
	    message,
	    status,
	    idServ
    };
}
