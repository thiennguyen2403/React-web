import React, { useEffect, useState } from "react";
import { Product } from "../../interface/product";
import { instance } from "../../api";
interface Prop {
  product: Product[];
  onRemove: (id: any) => void;
}
const Dashboard = ({ product, onRemove }: Prop) => {
  return (
    <div>
      <h1>Hello Amin</h1>
      <table className="table table-striped">
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
                  onClick={() => onRemove(item.id)}
                >
                  Xóa
                </button>
              </td>
              <td>
                <button className="btn btn-primary">Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
