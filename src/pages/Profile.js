import React, { useEffect, useState } from "react";
import services from "../apis";

import DefaultLayout from "../components/DefaultLayout";

const Profile = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdited, setIsEdited] = useState(true);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    const getData = async () => {
      const response = await services.getProfile();
      if (response?.data.status === 200) {
        const userResponse = response.data.data;
        setUser({
          name: userResponse.name,
          username: userResponse.username,
          email: userResponse.email,
          avatar: userResponse.avatar,
        });
        return;
      }
    };
    getData();
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (typeof file == "undefined") return;

    const getData = async () => {
      const response = await services.upload(file);
      setUser({
        ...user,
        avatar: response.data.data.fileInfos[0].url,
      });
    };

    getData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const getData = async () => {
      const response = await services.update(user);
      if (response.data.status === 200) {
        // xử lý thông báo cho user update thành công
        setIsEdited(true);
        setIsDisabled(true);
      }
    };

    getData();
  };

  return (
    <DefaultLayout>
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Name</label>
              <input
                disabled={isDisabled}
                value={user.name}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.target.value,
                  })
                }
                type="name"
                className="form-control"
                id="name"
                placeholder="Name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Username</label>
              <input
                disabled
                value={user.username}
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Email</label>
            <input
              disabled={isDisabled}
              value={user.email ? user.email : ""}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              type="email"
              className="form-control"
              id="inputAddress"
              placeholder="abc@gmail.com"
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">Avatar</label>
              <input
                disabled={isDisabled}
                onChange={handleUpload}
                type="file"
                className="form-control"
                id="inputCity"
              />
            </div>
            <div className="form-group col-md-4">
              <div className="avatar">
                <img
                  width="200"
                  height="200"
                  alt="avatar"
                  src={`${
                    user.avatar
                      ? user.avatar
                      : "https://i.stack.imgur.com/l60Hf.png"
                  }`}
                />
              </div>
            </div>
          </div>
          {isEdited && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setIsEdited(false);
                setIsDisabled(false);
              }}
            >
              Edit
            </button>
          )}

          {!isEdited && (
            <div>
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={() => {
                  setIsEdited(true);
                  setIsDisabled(true);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="ml-3 btn btn-success">
                Ok
              </button>
            </div>
          )}
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
