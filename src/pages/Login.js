import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import services from "../apis";

const Login = () => {
  const history = useHistory();
  // const [error, setError] = useState({  
  //   isError: false,
  //   message: "",
  // });
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await services.login(login.username, login.password);

    if (response.status === 200) {
        localStorage.setItem("token", response.data.data.accessToken);
        history.push("/home");
    }else {
        console.log("Error Login")
    }
  };

  return (
    <React.Fragment>
      <section className="vh-100">
        <div className="container mt-5 py-5 h-100" style={{ width: "500px" }}>
          <form onSubmit={handleLogin}>
            <div className="form-outline mb-4">
              <input
                value={login.username}
                onChange={(e) =>
                  setLogin({
                    ...login,
                    username: e.target.value,
                  })
                }
                type="text"
                id="username"
                className="form-control form-control-lg"
              />
              <label className="form-label" htmlFor="username">
                Username
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                value={login.password}
                onChange={(e) =>
                  setLogin({
                    ...login,
                    password: e.target.value,
                  })
                }
                type="password"
                id="password"
                className="form-control form-control-lg"
              />
              <label className="form-label" htmlFor="password">
                Password
              </label>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">
              Sign in
            </button>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Login;
