/* @flow */

import { push } from 'react-router-redux';

import { routerLinks } from '../config';
import type { Dispatch } from '../types';

const isTokenExist = (token: string) => async (dispatch: Dispatch) => {
  if (!token) {
    dispatch(push(routerLinks.login));
  }
};

export default isTokenExist;
