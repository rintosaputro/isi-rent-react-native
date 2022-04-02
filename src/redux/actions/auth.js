export const authLogin = (email, password) => {
  return dispatch => {
    dispatch({
      type: 'AUTH_CLEAR_ERR',
    });
    if (email === 'test@mail.com' && password === '1234') {
      dispatch({
        type: 'AUTH_LOGIN',
        payload: 'iniTokenTest',
      });
    } else {
      dispatch({
        type: 'AUTH_ERROR',
        payload: 'Wrong username or password',
      });
    }
  };
};
