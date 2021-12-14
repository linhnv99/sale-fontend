import axiosInstance from "./request";

export const login = async (username, password) => {
  try {
    return axiosInstance.post("/users/login", {
      username,
      password,
    });
  } catch (error) {
    console.log("Error Login service: ", error);
  }
};

export const logout = (history) => {
  localStorage.clear();
  history.push("/login")
}