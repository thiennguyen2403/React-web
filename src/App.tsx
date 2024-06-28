import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Client/Home";
import Dashboard from "./pages/admin/Dashboard";
import axios from "axios";
import NotFound from "./pages/NotFound";
import ProductForm from "./pages/admin/ProductForm";
import { Product } from "./interface/product";
import { instance } from "./api";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await instance.get("/products");
      setProducts(data);
    } catch (error) {
      console.error("Có lỗi xảy ra khi tải sản phẩm!", error);
    }
  };

  const handleRemove = async (id: string | undefined) => {
    if (window.confirm("Bạn có muốn xóa không?")) {
      try {
        await instance.delete(`/products/${id}`);
        setProducts((prevProducts) =>
          prevProducts.filter((item) => item.id !== id)
        );
      } catch (error) {
        console.error("Có lỗi xảy ra khi xóa sản phẩm!", error);
      }
    }
  };

  const handleSubmitForm = async (data: Product) => {
    try {
      if (data.id) {
        await instance.patch(`/products/${data.id}`, data);
      } else {
        const res = await instance.post("/products", data);
        data.id = res.data.id;
      }
      await fetchProducts();
      navigate("/admin");
    } catch (error) {
      console.error("Có lỗi xảy ra khi gửi dữ liệu sản phẩm!", error);
    }
  };

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/admin"
          element={<Dashboard product={products} OnRemove={handleRemove} />}
        />
        <Route
          path="/admin/product-add"
          element={<ProductForm onProduct={handleSubmitForm} />}
        />
        <Route
          path="/admin/product-edit/:id"
          element={<ProductForm onProduct={handleSubmitForm} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
