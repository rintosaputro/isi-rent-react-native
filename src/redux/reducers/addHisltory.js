const initialState = {
  results: {},
  isLoading: false,
  isError: false,
  errMessage: '',
};

const addHistory = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_HISTORY_LOADING': {
      return {
        ...state,
        results: {},
        isLoading: true,
        isError: false,
        errMessage: '',
      };
    }
    case 'ADD_HISTORY': {
      return {
        ...state,
        results: action.payload,
        isLoading: false,
        isError: false,
        errMessage: '',
      };
    }
    case 'ADD_HISTORY_ERR': {
      return {
        ...state,
        results: {},
        isLoading: false,
        isError: true,
        errMessage: action.payload,
      };
    }
    case 'CLEAR_ADD_HISTORY': {
      return {...initialState};
    }
    default: {
      return {...state};
    }
  }
};

export default addHistory;
