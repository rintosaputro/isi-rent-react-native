const initialState = {
  results: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  errMessage: '',
};

const bike = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BIKE_LOADING': {
      return {
        ...state,
        results: [],
        isSuccess: false,
        isError: false,
        errMessage: '',
        isLoading: true,
      };
    }
    case 'GET_BIKE': {
      return {
        ...state,
        results: action.payload,
        isSuccess: true,
        isLoading: false,
        isError: false,
        errMessage: '',
      };
    }
    case 'GET_BIKE_ERR': {
      return {
        ...state,
        results: [],
        isSuccess: false,
        isLoading: false,
        isError: true,
        errMessage: action.payload,
      };
    }
    default: {
      return {...state};
    }
  }
};

export default bike;
