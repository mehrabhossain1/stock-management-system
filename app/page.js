"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [dropdown, setDropdown] = useState([
    {
      _id: "64e63f9b43ff9b5c9544828e",
      slug: "Jeans",
      quantity: "12",
      price: "120",
    },
    {
      _id: "64e63f9b43ff9b5c9544828e",
      slug: "Jeans2",
      quantity: "12",
      price: "120",
    },
    {
      _id: "64e63f9b43ff9b5c9544828e",
      slug: "chocolate",
      quantity: "12",
      price: "120",
    },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/product");
      let rjson = await response.json();
      setProducts(rjson.products);
    };
    fetchProducts();
  }, []);

  const buttonAction = async (action, slug, initialQuantity) => {
    // Immediately change the quantity of the product with the given slug in Product
    let index = products.findIndex((item) => item.slug == slug);
    let newProducts = JSON.parse(JSON.stringify(products));

    if (action == "plus") {
      newProducts[index].quantity = parseInt(initialQuantity) + 1;
    } else {
      newProducts[index].quantity = parseInt(initialQuantity) - 1;
    }
    setProducts(newProducts);

    // Immediately change the quantity of the product with the given slug in Dropdown
    let indexDrop = dropdown.findIndex((item) => item.slug == slug);
    console.log(indexDrop, "parse");
    let newDropdown = JSON.parse(JSON.stringify(dropdown));

    if (action == "plus") {
      newDropdown[indexDrop].quantity = parseInt(initialQuantity) + 1;
    } else {
      newDropdown[indexDrop].quantity = parseInt(initialQuantity) - 1;
    }
    setDropdown(newDropdown);

    console.log(action, slug);
    setLoadingAction(true);
    const response = await fetch("/api/action", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action, slug, initialQuantity }),
    });
    let r = await response.json();
    console.log(r);
    setLoadingAction(false);
  };

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

  const onDropdownEdit = async (e) => {
    setQuery(e.target.value);
    if (query.length > 3) {
      setLoading(true);
      setDropdown([]);
      const response = await fetch("/api/search?query=" + query);
      let rjson = await response.json();
      setDropdown(rjson.products);
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className='container mx-auto'>
        {/* Search Product */}
        <div className='p-8 w-full bg-white rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold mb-4'>Search Product</h1>
          <div className='flex space-x-4 mb-1'>
            <input
              onChange={onDropdownEdit}
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
          {loading && (
            <div className='flex justify-center items-center'>
              <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900'></div>
            </div>
          )}
          <div className='dropcontainer absolute w-[70vw] border-1 bg-teal-100 rounded-md'>
            {dropdown.map((item, index) => {
              return (
                <div
                  key={index}
                  className='container flex justify-between p-2 my-1 border-b-2'
                >
                  <span className='slug'>
                    {item.slug} ({item.quantity} available for ${item.price})
                  </span>
                  <div className='mx-5'>
                    <button
                      onClick={() => {
                        buttonAction("minus", item.slug, item.quantity);
                      }}
                      disabled={loadingAction}
                      className='subtract inline-block px-3 cursor-pointer py-1 bg-teal-500 text-white font-semibold rounded-lg shadow-md disabled:bg-teal-200'
                    >
                      -
                    </button>
                    <span className='quantity inline-block w-3 mx-3'>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        buttonAction("plus", item.slug, item.quantity);
                      }}
                      disabled={loadingAction}
                      className='add inline-block px-3 cursor-pointer py-1 bg-teal-500 text-white font-semibold rounded-lg shadow-md disabled:bg-teal-200'
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
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
