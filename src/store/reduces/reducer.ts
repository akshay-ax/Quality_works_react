import * as actionTypes from "../actions/actionTypes";

const initialState: any = {
  data: [],
};

const Analayticsreducer = (state = initialState, { type, payload }) => {
  console.log(type, payload);
  switch (type) {
    case actionTypes.FETCH_ANALATIC_DATA:
      return {
        ...state,
        data: payload,
      };
  }
  return state;
};

export default Analayticsreducer;