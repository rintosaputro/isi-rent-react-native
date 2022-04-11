export const addFavourite = data => {
  return dispatch => {
    dispatch({
      type: 'ADD_FAV',
      payload: data,
    });
  };
};

export const deleteFavourite = data => {
  return dispatch => {
    dispatch({
      type: 'DEL_FAV',
      payload: data,
    });
  };
};
