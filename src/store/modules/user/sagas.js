import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import * as RootNavigation from '../../../services/RootNavigation';

import api from '../../../services/api';

import { updateUserSuccess, updateUserFailure } from './actions';

export function* updateUser({ payload }) {
  try {
    const { name, email, cpf, phone, ...rest } = payload.data;

    const user = {
      name,
      email,
      cpf,
      phone,
      ...(rest.password ? rest : {}),
    };

    const response = yield call(api.patch, '/users', user);

    yield put(updateUserSuccess(response.data));

    RootNavigation.navigate('Profile');
  } catch (err) {
    Alert.alert(
      'Falha ao editar funcionário',
      err?.response?.data
        ? String(
            err?.response?.data.map((validation) => {
              return validation.message;
            })
          )
        : 'Verifique os dados, tente novamente'
    );

    yield put(updateUserFailure());
  }
}

export default all([takeLatest('@user/UPDATE_USER_REQUEST', updateUser)]);
