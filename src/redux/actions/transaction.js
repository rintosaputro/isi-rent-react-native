import http from '../../helper/http';

export const myOrder = idVehicle => {
  return dispatch => {
    dispatch({
      type: 'GET_ORDER',
      payload: {
        idVehicle,
      },
    });
  };
};
