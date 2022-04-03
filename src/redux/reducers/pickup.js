const initialState = {
  results: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  errMessage: '',
};

const pickup = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PICKUP_LOADING': {
      return {
        ...state,
        results: [],
        isSuccess: false,
        isError: false,
        errMessage: '',
        isLoading: true,
      };
    }
    case 'GET_PICKUP': {
      return {
        ...state,
        results: action.payload,
        isSuccess: true,
        isLoading: false,
        isError: false,
        errMessage: '',
      };
    }
    case 'GET_PICKUP_ERR': {
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

export default pickup;
