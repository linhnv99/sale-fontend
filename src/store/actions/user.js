import services from "../../apis";
import { GET_PROFILE, UPDATE_PROFILE } from "../../constants";

export const getProfile = (dispatch) => {
  const getData = async () => {
    const response = await services.getProfile();
    if (response?.data.status === 200) {
      const userResponse = response.data.data;
      dispatch({
        type: GET_PROFILE,
        payload: {
          name: userResponse.name,
          username: userResponse.username,
          email: userResponse.email,
          avatar: userResponse.avatar,
        },
      });
    }
  };
  getData();
};
