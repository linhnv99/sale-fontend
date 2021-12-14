import { ADD_TO_CART, REMOVE_BOOK } from "../../constants";

export const addToCart = (book) => (dispatch) => {
  // xử lý call api
  dispatch({
    type: ADD_TO_CART,
    payload: book,
  });
};

export const removeBook = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_BOOK,
    payload: id,
  });
};
