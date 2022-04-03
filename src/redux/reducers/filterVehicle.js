const initialState = {
  results: [],
  pageInfo: {},
  keywoard: '',
  isError: false,
  errMessage: '',
  isLoading: false,
};

const filterVehicle = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SEARCH_LOADING': {
      return {
        ...state,
        results: [],
        pageInfo: {},
        keywoard: '',
        isError: false,
        errMessage: '',
        isLoading: true,
      };
    }
    case 'GET_SEARCH': {
      const data = action.payload;
      state.results = data.results;
      state.pageInfo = data.pageInfo;
      return {
        ...state,
        keywoard: action.keywoard,
        isError: false,
        isLoading: false,
        errMessage: '',
      };
    }
    case 'GET_SEARCH_ERR': {
      return {
        ...state,
        results: [],
        pageInfo: {},
        keywoard: '',
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

export default filterVehicle;
