const initialState = {
  isSuccess: false,
  isError: false,
  errMessage: '',
};

const verify = (state = initialState, action) => {
  switch (action.type) {
    case 'VERIFY_CODE': {
      state.isError = false;
      state.errMessage = '';
      state.isSuccess = true;
      return {...state};
    }
    case 'VERIFY_ERROR': {
      state.isError = true;
      state.errMessage = action.payload;
      state.isSuccess = false;
      return {...state};
    }
    default: {
      return {...state};
    }
  }
};

export default verify;
