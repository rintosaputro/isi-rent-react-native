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
