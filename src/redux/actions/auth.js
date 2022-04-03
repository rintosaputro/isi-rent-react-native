import http from '../../helper/http';
import qs from 'qs';

export const authLogin = (username, password) => {
  return async dispatch => {
    dispatch({
      type: 'AUTH_CLEAR_ERR',
    });
    try {
      const input = {username: username, password: password};
      const {data} = await http().post('/auth/login', qs.stringify(input));

      dispatch({
        type: 'AUTH_LOGIN',
        payload: data.results.token,
      });
    } catch (err) {
      let payload = '';
      if (err.response) {
        payload = err.response.data.message;
      } else {
        payload = err.message;
      }
      dispatch({
        type: 'AUTH_ERROR',
        payload: payload,
      });
    }
  };
};
