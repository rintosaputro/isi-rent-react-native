import http from '../../helper/http';

export const getProfile = token => {
  return async dispatch => {
    dispatch({
      type: 'GET_PROFILE_LOADING',
    });
    try {
      const {data} = await http(token).get('profile');
      dispatch({
        type: 'GET_PROFILE',
        payload: data.results,
      });
    } catch (err) {
      dispatch({
        type: 'GET_PROFILE_ERR',
        payload: err.response.data.message,
      });
    }
  };
};
