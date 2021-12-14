import { login } from "./loginService";
import { getProfile } from "./userService";
import { upload } from "./userService";
import { update } from "./userService";
import { logout } from "./loginService";
import { getAll, del } from "./bookService";


const services = {
  login,
  logout,
  getProfile,
  upload,
  update,
  getAll,
  del
};

export default services;
