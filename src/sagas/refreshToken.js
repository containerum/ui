/* @flow */

import cookie from 'react-cookies';
import axios from 'axios';

import { webApi } from '../config';

function* fetchRefreshToken() {
  const browser = cookie.load('browser');
  return yield axios.put(
    `${webApi}/token/${cookie.load('refreshToken')}`,
    {},
    {
      headers: {
        'User-Client': browser
      },
      validateStatus: status => status >= 200 && status <= 505
    }
  );
}

export default fetchRefreshToken;
