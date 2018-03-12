import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';

import { fetchGetNamespaces } from '../namespacesActions/getNamespaces';
import {
  GET_NAMESPACES_REQUESTING,
  GET_NAMESPACES_FAILURE,
  GET_NAMESPACES_SUCCESS
} from '../../constants/namespacesConstants/getNamespaces';

const host = 'http://localhost';

axios.defaults.host = host;
axios.defaults.adapter = httpAdapter;

const mockStore = configureMockStore([thunk]);

describe('fetch namespaces data', () => {
  const response = [{ id: '1', name: 'Welly' }];
  const errorMessage = 'Request failed with status code 404';

  afterEach(() => {
    nock.disableNetConnect();
  });

  test('creates GET_NAMESPACES_SUCCESS when fetching users has been done', () => {
    nock(host)
      .get('/test')
      .reply(200, response);

    const expectedActions = [
      { type: GET_NAMESPACES_REQUESTING },
      { type: GET_NAMESPACES_SUCCESS, data: response }
    ];
    const store = mockStore({ list: null });

    store.dispatch(fetchGetNamespaces(axios, `${host}/test`)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('creates GET_NAMESPACES_FAILURE when fail to fetch users', () => {
    nock(host)
      .get('/test')
      .replyWithError(errorMessage);

    const expectedActions = [
      { type: GET_NAMESPACES_REQUESTING },
      { type: GET_NAMESPACES_FAILURE, err: errorMessage }
    ];
    const store = mockStore({ err: null });

    store.dispatch(fetchGetNamespaces(axios, `${host}/test`)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
