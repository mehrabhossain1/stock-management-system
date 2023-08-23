"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      let rjson = await response.json();
      setProducts(rjson.products);
    };
    fetchProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productForm),
      });

      if (response.ok) {
        console.log("Product added successfully");
        toast("Product added successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
        setProductForm({});
        // Reset the form or perform other actions as needed
      } else {
        const errorData = await response.json();
        console.error("Failed to add product:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />

      <div className='container mx-auto'>
        {/* Search Product */}
        <div className='p-8 w-full bg-white rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold mb-4'>Search Product</h1>
          <div className='flex space-x-4 mb-4'>
            <input
              type='text'
              placeholder='Enter Product Name'
              className='flex-grow p-2 border rounded'
            />
            <select className='w-1/4 p-2 border rounded'>
              <option value=''>All</option>
              <option value='category1'>Category 1</option>
              <option value='category2'>Category 2</option>
              <option value='category3'>Category 3</option>
            </select>
            <button className='w-1/4 py-2 bg-teal-600 hover:bg-teal-700 rounded text-white'>
              Search
            </button>
          </div>
        </div>

        {/* Display Current Stock */}
        <div className='p-8 w-full bg-white rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold mb-4'>Add Product</h1>
          <form>
            <div className='mb-4'>
              <input
                value={productForm?.slug || ""}
                name='slug'
                onChange={handleChange}
                type='text'
                placeholder='Product Slug'
                className='w-full p-2 border rounded'
              />
            </div>
            <div className='mb-4'>
              <input
                value={productForm?.quantity || ""}
                name='quantity'
                onChange={handleChange}
                type='number'
                placeholder='Quantity'
                className='w-full p-2 border rounded'
              />
            </div>
            <div className='mb-4'>
              <input
                value={productForm?.price || ""}
                name='price'
                onChange={handleChange}
                type='number'
                step='0.01'
                placeholder='Price'
                className='w-full p-2 border rounded'
              />
            </div>
            <button
              onClick={addProduct}
              className='w-full py-2 bg-teal-600 hover:bg-teal-700 rounded text-white'
            >
              Add Product
            </button>
          </form>

          {/* Current Stock */}
          <div className='my-14'>
            <h1 className='text-2xl font-bold mb-4'>Current Stock</h1>
            <table className='w-full border'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='p-2'>#</th>
                  <th className='p-2'>Product Name</th>
                  <th className='p-2'>Quantity</th>
                  <th className='p-2'>Price</th>
                </tr>
              </thead>
              <tbody>
                {/* mapped the products */}
                {products.map((product, index) => {
                  return (
                    <tr key={product.slug} className='bg-gray-50'>
                      <td className='p-2'>{index + 1}</td>
                      <td className='p-2'>{product.slug}</td>
                      <td className='p-2'>{product.quantity}</td>
                      <td className='p-2'>${product.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
