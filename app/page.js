import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
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
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Product Name'
              className='w-full p-2 border rounded'
            />
          </div>
          <div className='mb-4'>
            <input
              type='number'
              placeholder='Quantity'
              className='w-full p-2 border rounded'
            />
          </div>
          <div className='mb-4'>
            <input
              type='number'
              step='0.01'
              placeholder='Price'
              className='w-full p-2 border rounded'
            />
          </div>
          <button className='w-full py-2 bg-teal-600 hover:bg-teal-700 rounded text-white'>
            Add Product
          </button>

          {/* Current Stock */}
          <div className='mt-6'>
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
                <tr className='bg-gray-50'>
                  <td className='p-2'>1</td>
                  <td className='p-2'>Product A</td>
                  <td className='p-2'>100</td>
                  <td className='p-2'>$50.00</td>
                </tr>
                <tr>
                  <td className='p-2'>2</td>
                  <td className='p-2'>Product B</td>
                  <td className='p-2'>50</td>
                  <td className='p-2'>$30.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
