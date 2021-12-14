import axiosInstance from "./request";

export const getAll = async (params) => {
  try {
    return await axiosInstance.get("/books/filters", {
      params
    })
  } catch (error) {
    console.log(error.response);
  }
}

export const del = async (id) => {
  try {
    return await axiosInstance.delete(`/books/${id}`);
  } catch (error) {
    console.log(error.response);
  }
}