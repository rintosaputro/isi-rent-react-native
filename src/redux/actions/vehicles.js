import http from '../../helper/http';

export const getCategory = (category, page = 1) => {
  return async dispatch => {
    dispatch({
      type: `GET_${category}_LOADING`,
    });
    try {
      const {data} = await http().get(
        `/vehicles/category/?search=${category}&limit=100&page=${page}`,
      );
      dispatch({
        type: `GET_${category}`,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: 'GET_CARS_ERR',
        payload: err.response.data.message,
      });
    }
  };
};

export const getFilter = (
  key = '',
  maximum = '',
  minimum = '',
  location = '',
  page = 1,
) => {
  return async dispatch => {
    dispatch({
      type: 'GET_SEARCH_LOADING',
    });
    try {
      const {data} = await http().get(
        `/vehicles/category/?search=${key}&location=${location}&maximum=${maximum}&minimum=${minimum}&limit=100&page=${page}`,
      );
      const keywoard = `${key}-${location}-${maximum}-${minimum}`;
      dispatch({
        type: 'GET_SEARCH',
        payload: data,
        keywoard: keywoard,
      });
    } catch (err) {
      dispatch({
        type: 'GET_SEARCH_ERR',
        payload: err.response.data.message,
      });
    }
  };
};

export const getDetailVehicle = id => {
  return async dispatch => {
    dispatch({
      type: 'GET_DETAIL_VEHICLE_LOADING',
    });
    try {
      const {data} = await http().get(`/vehicles/${id}`);
      dispatch({
        type: 'GET_DETAIL_VEHICLE',
        payload: data.results,
      });
    } catch (err) {
      dispatch({
        type: 'GET_DETAIL_VEHICLE_ERR',
        payload: err.response.data.message,
      });
    }
  };
};
