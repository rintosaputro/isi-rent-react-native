import http from '../../helper/http';
import qs from 'qs';

export const verify = (username, code, password) => {
  return async dispatch => {
    try {
      const input = {username, code, password};
      const {data} = await http().post(
        '/auth/verification',
        qs.stringify(input),
      );
      dispatch({
        type: 'VERIFY_CODE',
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'VERIFY_ERROR',
        payload: err.response.data.message,
      });
    }
  };
};
