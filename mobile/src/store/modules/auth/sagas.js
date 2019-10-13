import { takeLatest, call, put, all } from 'redux-saga/effects';

import { Alert } from 'react-native';
// import history from '../../../services/history';
import api from '~/services/api';

import {
  signInSuccess,
  signFailure,
  editAuthSuccess,
  editAuthFailure,
} from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });
    const { token, user } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (err) {
    if (err.message === 'Network Error') {
      console.tron.warn(`Erro: ${err.message}`);
    } else {
      console.tron.warn(err);
    }

    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    Alert.alert(`Usuário ${name} cadastrado`);
    // history.push('/');
  } catch (err) {
    Alert.alert('Falha ao criar conta.');
    yield put(signFailure());
  }
}

export function signOut() {
  // history.push('/');
}

export function* editAuth({ payload }) {
  try {
    console.tron.log(payload);
    // const { name, email, password, password_new, password_confirm } = payload;
    const response = yield call(api.put, 'users', payload);
    Alert.alert('Usuário atualizado com sucesso!');
    yield put(editAuthSuccess(response.data));
  } catch (err) {
    if (err.message === 'Network Error') {
      console.tron.warn(`Erro: ${err.message}`);
    } else {
      console.tron.warn(err);
    }
    Alert.alert('Erro ao atualizar usuário, confira seus dados!');
    yield put(editAuthFailure());
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
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/EDIT_AUTH_REQUEST', editAuth),
]);
