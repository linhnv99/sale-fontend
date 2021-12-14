import React, { useEffect, useState } from "react";
import services from "../apis";
import { useHistory } from "react-router";
import { credential } from "../apis/request";
import Footer from "./Footer";
import Navbar from "./Navbar";

function DefaultLayout(props) {
  const history = useHistory();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!credential.getToken()) history.push("/login");
    const getData = async () => {
      const response = await services.getProfile();
      if (response?.data.status === 200) {
        setUser(response.data.data);
        return;
      }
      if (response?.data.status === 401) {
        // xử lý call api refresh token
      }
      localStorage.clear();
      history.push("/login");
    };
    getData();
  }, []);

  const onLogout = () => {
    services.logout(history);
  };

  return (
    <React.Fragment>
      <Navbar user={user} onLogout={onLogout} />
      {props.children}
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default DefaultLayout;
