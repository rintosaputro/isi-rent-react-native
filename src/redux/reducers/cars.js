const initialState = {
  results: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  errMessage: '',
};

const cars = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CAR_LOADING': {
      return {
        ...state,
        results: [],
        isSuccess: false,
        isError: false,
        errMessage: '',
        isLoading: true,
      };
    }
    case 'GET_CAR': {
      return {
        ...state,
        results: action.payload,
        isSuccess: true,
        isLoading: false,
        isError: false,
        errMessage: '',
      };
    }
    case 'GET_CAR_ERR': {
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

export default cars;
