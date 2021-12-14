import { GET_PROFILE, UPDATE_PROFILE } from "../../constants";

const initState = {
  name: "",
  username: "",
  email: "",
  avatar: "",
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        name: action.payload.name,
        username: action.payload.username,
        email: action.payload.email,
        avatar: action.payload.avatar,
      };
    default:
      return state;
  }
};

export default userReducer;
