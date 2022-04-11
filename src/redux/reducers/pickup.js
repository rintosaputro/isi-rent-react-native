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
        // results: [],
        // isSuccess: false,
        isError: false,
        errMessage: '',
        isLoading: true,
      };
    }
    case 'GET_PICKUP': {
      // state.results.push(...action.payload.results);
      state.results = action.payload.results;
      state.pageInfo = action.payload.pageInfo;
      return {
        ...state,
        isSuccess: true,
        isLoading: false,
        isError: false,
        errMessage: '',
      };
    }
    case 'GET_NEXT_PICKUP': {
      state.isLoading = false;
      state.results.push(...action.payload.results);
      state.pageInfo = action.payload.pageInfo;
      // state.dataNext = action.payload.results;
      return {...state};
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
