import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import services from "../apis";
import DefaultLayout from "../components/DefaultLayout";
import {addToCart} from '../store/actions/cart';

const Home = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  console.log(dispatch)
  useEffect(() => {
    const execute = async () => {
      const response = await services.getAll();
      if (response?.data.status === 200) {
        setData(response.data.data.data);
      }
    };
    execute();
  }, []);

  return (
    <DefaultLayout>
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5">
          {data &&
            data.map((it) => (
              <div className="col-md-4 mb-5" key={it.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h2 className="card-title">{it.name}</h2>
                    <p className="card-text">{it.description}</p>
                  </div>
                  <div className="card-footer">
                    <button className="btn btn-primary btn-sm" onClick={() => {
                      dispatch(addToCart(it))
                    }}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
