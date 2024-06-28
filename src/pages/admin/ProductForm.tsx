import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Product } from "../../interface/product";
import { instance } from "../../api";

type Prop = {
  onProduct: (data: Product) => void;
};

const ProductForm = ({ onProduct }: Prop) => {
  const { id } = useParams<{ id: string }>(); // Explicitly specify the type of useParams

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Product>();

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`/products/${id}`);
          reset(data); // Reset form values when data is fetched from the server
        } catch (error) {
          console.error("Error fetching product!", error);
        }
      })();
    }
  }, [id, reset]);
  const onSubmit: SubmitHandler<Product> = (data) => {
    const stringId = id ? `${id}` : undefined;
    onProduct({ ...data, id: stringId });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{id ? "Edit Product" : "Add Product"}</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            {...register("title", { required: true })}
          />
          {errors.title && <p className="text-danger">Title is required</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price", { required: true })}
          />
          {errors.price && <p className="text-danger">Price is required</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="text-danger">Description is required</p>
          )}
        </div>
        <div className="mb-3">
          <button className="btn btn-primary w-100" type="submit">
            {id ? "Edit Product" : "Add Product"}
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;
