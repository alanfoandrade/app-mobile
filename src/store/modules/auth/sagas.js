import { Alert } from 'react-native';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { cpf, password } = payload;

    const response = yield call(api.post, '/sessions', {
      cpf,
      password,
    });

    const { token, user } = response.data;
    const authLevel = user.auth_level;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, authLevel, user));
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      err?.response?.data
        ? String(
            err?.response?.data.map((validation) => {
              return validation.message;
            })
          )
        : 'Verifique os dados, tente novamente'
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
