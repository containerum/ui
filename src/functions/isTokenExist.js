/* @flow */

import { push } from 'react-router-redux';

import type { Dispatch } from '../types';

const isTokenExist = (token: string) => async (dispatch: Dispatch) => {
  if (!token) {
    dispatch(push('/login'));
  }
};

export default isTokenExist;
