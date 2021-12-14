import axiosInstance from "./request";

export const getProfile = async () => {
  try {
    return await axiosInstance.get("/users/profiles");
  } catch (error) {
    console.log(error);
  }
};

export const upload = async (file) => {
  try {
    const formData = new FormData();
    formData.append("files", file);
    return await axiosInstance.post("/files/uploads", formData);
  } catch (error) {
    console.log(error.response);
  }
};

export const update = async (user) => {
  console.log(user)
  try {
    return await axiosInstance.put("/users/profiles", user);
  } catch (error) {
    console.log(error.response);
  }
};
