export function signInRequest(cpf, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { cpf, password },
  };
}

export function signInSuccess(token, authLevel, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, authLevel, user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
