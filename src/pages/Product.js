import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";
import DefaultLayout from "../components/DefaultLayout";
import services from "../apis";

const Product = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    totalPage: 1,
    totalRecord: 0,
    totalInPage: 0,
    limit: 5,
    search: "",
  });

  useEffect(() => {
    const params = {
      page: filter.page,
      limit: filter.limit,
      sort: isSort ? "subject_desc" : "subject_asc",
      subject: filter.search,
    };
    const getData = async () => {
      const response = await services.getAll(params);
      if (response?.data.status === 200) {
        const rs = response?.data.data;
        setData(rs.data);
        setFilter({
          ...filter,
          page: rs.page,
          totalPage: rs.totalPage,
          totalRecord: rs.totalRecord,
          totalInPage: rs.totalInPage,
          limit: rs.limit,
        });
        setIsDelete(false);
      }
    };
    getData();
  }, [filter.search, filter.page, filter.limit, isDelete, isSort]);

  const handleDelete = (id) => {
    let confirm = window.confirm("Are u sure del item?");
    if (!confirm) return;

    const execute = async () => {
      const response = await services.del(id);
      if (response?.data.status === 200) setIsDelete(true);
    };
    execute();
  };

  return (
    <DefaultLayout>
      <div className="container pt-5">
        <DebounceInput
          debounceTimeout={500}
          value={filter.search}
          onChange={(e) => {
            setFilter({
              ...filter,
              search: e.target.value,
              page: 1,
            });
          }}
        />
        <div className="float-right">
          <button
            className="btn btn-success mr-3"
            onClick={() => history.push("/add-article")}
          >
            Add
          </button>
          <select
            className="custom-select  "
            style={{ width: "100px" }}
            onChange={(e) =>
              setFilter({
                ...filter,
                limit: e.target.value,
                page: 1,
              })
            }
          >
            <option selected={filter.limit === 2} value="2">
              2
            </option>
            <option selected={filter.limit === 5} value="5">
              5
            </option>
            <option selected={filter.limit === 10} value="10">
              10
            </option>
            <option selected={filter.limit === 15} value="15">
              15
            </option>
          </select>
        </div>

        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">Avatar</th>
              <th
                scope="col "
                className="text-danger "
                style={{ cursor: "pointer" }}
                onClick={() => setIsSort(!isSort)}
              >
                Name
              </th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item) => (
                <tr key={item.id}>
                  <th>{item.avatar}</th>
                  <th>{item.name}</th>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      onClick={() => history.push("/edit-article/" + item.id)}
                      type="button"
                      className="btn btn-primary mr-2"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <small>
          Có <b>{filter.totalInPage}</b> trên tổng số{" "}
          <b>{filter.totalRecord}</b> bản ghi.
        </small>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                disabled={filter.page === 1 || filter.totalRecord === 0}
                className={`page-link ${
                  filter.page === 1 ? "text-secondary" : ""
                }`}
                onClick={() => {
                  setFilter({
                    ...filter,
                    page: filter.page - 1,
                  });
                }}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </button>
            </li>

            {Array.from({ length: filter.totalPage }, (_, i) => i + 1).map(
              (page) => {
                return (
                  <li key={page} className="page-item">
                    <button
                      value={page}
                      className={`page-link ${
                        page === filter.page
                          ? "text-danger font-weight-bold"
                          : ""
                      }`}
                      onClick={(e) =>
                        setFilter({
                          ...filter,
                          page: e.target.value,
                        })
                      }
                    >
                      {page}
                    </button>
                  </li>
                );
              }
            )}

            <li className="page-item">
              <button
                disabled={
                  filter.page === filter.totalPage || filter.totalPage === 0
                }
                className={`page-link ${
                  filter.page === filter.totalPage || filter.totalPage === 0
                    ? "text-secondary"
                    : ""
                }`}
                aria-label="Next"
                onClick={() => {
                  setFilter({
                    ...filter,
                    page: filter.page + 1,
                  });
                }}
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </DefaultLayout>
  );
};

export default Product;
