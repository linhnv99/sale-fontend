import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { REMOVE_BOOK } from "../constants";
const Order = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <DefaultLayout>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.books &&
              cart.books.map((it) => (
                <tr key={it.id}>
                  <th>{it.avatar}</th>
                  <th>{it.name}</th>
                  <td>{it.description}</td>
                  <td>{it.price}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        dispatch({
                          type: REMOVE_BOOK,
                          payload: it.id,
                        })
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {cart.books.length === 0 ? (
          <p>Không có sản phẩm trong giỏ hàng!</p>
        ) : (
          ""
        )}
        {cart.books.length !== 0 ? (
          <Link className="btn btn-primary float-right mt-3 mr-5" to="/checkout">
            Checkout
          </Link>
        ) : (
          ""
        )}
      </div>
    </DefaultLayout>
  );
};

export default Order;
