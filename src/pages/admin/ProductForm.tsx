import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Product } from "../../interface/product";
import { instance } from "../../api";

type Prop = {
  onProduct: (data: Product) => void;
};

const ProductForm = ({ onProduct }: Prop) => {
  const { id } = useParams<{ id: string }>();

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
          reset(data);
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
            {...register("title", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.title && errors.title.type === "required" && (
            <p className="text-danger">Title is required</p>
          )}
          {errors.title && errors.title.type === "minLength" && (
            <p className="text-danger">
              Title must be at least 6 characters long
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            {...register("price", {
              required: true,
              min: 0,
            })}
          />
          {errors.price && errors.price.type === "required" && (
            <p className="text-danger">Price is required</p>
          )}
          {errors.price && errors.price.type === "min" && (
            <p className="text-danger">Price cannot be negative</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            {...register("description", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.description && errors.description.type === "required" && (
            <p className="text-danger">Description is required</p>
          )}
          {errors.description && errors.description.type === "maxLength" && (
            <p className="text-danger">
              Description cannot exceed 30 characters
            </p>
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
