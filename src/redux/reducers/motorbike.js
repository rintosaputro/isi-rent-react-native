const initialState = {
  results: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  errMessage: '',
};

const motorbike = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MOTORBIKE_LOADING': {
      return {
        ...state,
        results: [],
        isSuccess: false,
        isError: false,
        errMessage: '',
        isLoading: true,
      };
    }
    case 'GET_MOTORBIKE': {
      return {
        ...state,
        results: action.payload,
        isSuccess: true,
        isLoading: false,
        isError: false,
        errMessage: '',
      };
    }
    case 'GET_MOTORBIKE_ERR': {
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

export default motorbike;
