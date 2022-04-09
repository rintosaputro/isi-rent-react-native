import http from '../../helper/http';
import RNFetchBlob from 'rn-fetch-blob';
const BACKEND_URL = 'http://192.168.43.195:5000';

export const getCategory = (category, page = 1) => {
  return async dispatch => {
    dispatch({
      type: `GET_${category}_LOADING`,
    });
    try {
      const {data} = await http().get(
        `/vehicles/category/?search=${category}&limit=5&page=${page}`,
      );
      if (page > 1) {
        dispatch({
          type: `GET_NEXT_${category}`,
          payload: data,
        });
      } else {
        dispatch({
          type: `GET_${category}`,
          payload: data,
        });
      }
    } catch (err) {
      dispatch({
        type: 'GET_CARS_ERR',
        payload: err.response.data.message,
      });
    }
  };
};

export const getFilter = (search, maximum, minimum, location, page = 1) => {
  return async dispatch => {
    dispatch({
      type: 'GET_SEARCH_LOADING',
    });
    try {
      const filterKey = [search, maximum, minimum, location];
      const query = ['search', 'maximum', 'minimum', 'location'];
      let apiUrl = `/vehicles/category/?limit=5&page=${page}`;
      let keywoard = '';
      for (let i = 0; i < filterKey.length; i++) {
        if (filterKey[i]) {
          apiUrl += `&${query[i]}=${filterKey[i]}`;
          keywoard += `${filterKey[i]}-`;
        }
      }
      console.log('testt', apiUrl);
      const {data} = await http().get(apiUrl);
      // const {data} = await http().get(
      //   `/vehicles/category/?search=${search}&location=${location}&maximum=${maximum}&minimum=${minimum}&limit=100&page=${page}`,
      // );
      // const keywoard = `${search}-${location}-${maximum}-${minimum}`;
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

export const addVehicle = (
  id_category,
  brand,
  image,
  capacity,
  location,
  price,
  qty,
  token,
) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_VEHICLE_LOADING',
    });
    try {
      const {data} = await RNFetchBlob.fetch(
        'POST',
        `${BACKEND_URL}/vehicles`,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'image',
            filename: image.fileName,
            type: image.type,
            data: RNFetchBlob.wrap(image.uri),
          },
          {name: 'id_category', data: String(id_category)},
          {name: 'brand', data: brand},
          {name: 'capacity', data: String(capacity)},
          {name: 'location', data: location},
          {name: 'price', data: String(price)},
          {name: 'qty', data: String(qty)},
        ],
      );

      dispatch({
        type: 'ADD_VEHICLE',
        payload: JSON.parse(data).results,
      });
      // if (data.success) {
      //   dispatch({
      //     type: 'ADD_VEHICLE',
      //     payload: data.results,
      //   });
      // } else {
      //   dispatch({
      //     type: 'ADD_VEHICLE_ERR',
      //     payload: data.message,
      //   });
      // }
    } catch (err) {
      dispatch({
        type: 'ADD_VEHICLE_ERR',
        payload: err.data,
      });
    }
  };
};
