import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import { Product } from "./interface/product";
import { instance } from "./api";

function App() {
  // const [product, setProduct] = useState<Product[]>([]);
  // useEffect(() => {
  //   (async () => {
  //     const { data } = await instance.get(`/products`);
  //     setProduct(data);
  //   })();
  // }, []);
  // const handleRemove = async (id: any) => {
  //   if (confirm("Ban co muon xoa khong?")) {
  //     await instance.delete(`/products/${id}`);
  //     setProduct(product.filter((item) => item.id != id));
  //   }
  // };
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      setProduct(data);
    })();
  }, []);
  const handleRemove = async (id: any) => {
    if (confirm("Ban co muon xoa khong?")) {
      await instance.delete(`/products/${id}`);
      setProduct(product.filter((item) => item.id != id));
    }
  };
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/admin"
          element={<Dashboard product={product} onRemove={handleRemove} />}
        />
      </Routes>
    </>
  );
}

export default App;
