import * as actionTypes from "../actions/actionTypes";

const initialState: any = {
  data: {},
};

const FilterReducer = (
  state = initialState,
  { type, payload }
): ArticleState => {
  console.log(type, payload);
  switch (type) {
    case actionTypes.SET_FILTER_DATA:
      return {
        ...state,
        data: payload,
      };
  }
  return state;
};

export default FilterReducer;
