import { ADD_TO_CART, REMOVE_BOOK } from "../../constants";

const initState = {
  user: {
    receiver: "",
    phone: "",
    address: "",
  },
  books: [],
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case REMOVE_BOOK:
      const newBooks = [...state.books];
      const index = newBooks.findIndex((it) => it.id === action.payload);
      newBooks.splice(index, 1);
      return {
        ...state,
        books: newBooks,
      };
    default:
      return state;
  }
};

export default cartReducer;
