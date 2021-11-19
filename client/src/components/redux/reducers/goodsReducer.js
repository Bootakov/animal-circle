import { SET_ALL_GOODS } from "../types/itemType";

const goodsReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_ALL_GOODS: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default goodsReducer;
