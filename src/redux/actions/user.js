import http from '../../helper/http';
import RNFetchBlob from 'rn-fetch-blob';
import BACKEND_URL from '../../helper/BackendUrl';

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

export const updateProfile = (token, dataInput) => {
  return async dispatch => {
    dispatch({
      type: 'UPD_PROFILE_LOADING',
    });
    try {
      let dataChanged = [];
      if (dataInput.image) {
        dataChanged.push({
          name: `${dataInput}`,
          filename: dataInput.image.filName,
          type: dataInput.image.type,
          data: RNFetchBlob.wrap(dataInput.image.uri),
        });
      }
      Object.keys(dataInput).forEach(item => {
        if (item) {
          dataChanged.push({name: `${item}`, data: dataInput[item]});
        }
      });

      const {data} = await RNFetchBlob.fetch(
        'PATCH',
        `${BACKEND_URL}/profile`,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        dataChanged,
      );
      dispatch({
        type: 'UPD_PROFILE',
        payload: JSON.parse(data).results,
      });
    } catch (err) {
      dispatch({
        type: 'UPD_PROFILE_ERR',
        payload: err,
      });
    }
  };
};
