import React from "react";
import { Product } from "../../interface/product";
import { Link } from "react-router-dom";
interface Prop {
  product: Product[];
  OnRemove: (id: any) => void;
}
const Dashboard = ({ product, OnRemove }: Prop) => {
  return (
    <div>
      <Link to={"/admin/product-add"}>Add sản phẩm</Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item) => (
            <tr key={item.id}>
              <th scope="row">{item.id}</th>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => OnRemove(item.id)}
                >
                  Xóa
                </button>
              </td>
              <td>
                <Link to={`/admin/product-edit/${item.id}`}>
                  <button className="btn btn-primary">Sửa</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
