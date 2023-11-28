import React from "react";

function ProductForm({
  productName,
  productPrice,
  productImage,
  publish,
  setProductName,
  setProductPrice,
  setProductImage,
  setPublish,
  handleSubmit,
  handleCancel,
}) {
  const checkHandler = (e) => {
    e.preventDefault();
    setPublish(!publish);
  };
  return (
    <>
      <div className=" flex ">
        <form className=" w-full max-w-6xl" onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2"
                htmlFor="product-name"
              >
                Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="product-name"
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Product title"
                required
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2"
                htmlFor="product-price"
              >
                Price
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="product-price"
                type="text"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder={productPrice ? `${productPrice}` : "Amount"}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2"
                htmlFor="product-image"
              >
                Product URL
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="product-image"
                type="text"
                value={productImage}
                onChange={(e) => setProductImage(e.target.value)}
                placeholder="Image URL"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="md:flex-auto md:items-center mb-6">
              <div className="md:w-1/3"></div>
              <label className="md:w-2/3 block text-gray-500 font-bold">
                <input
                  className="mr-2 leading-tight"
                  type="checkbox"
                  checked={publish}
                  onChange={checkHandler}
                />
                <span className="text-xl">Publish Immediately?</span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <input
                className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Submit"
              />

              <button
                onClick={handleCancel}
                type="button"
                class="bg-transparent p-3 hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProductForm;
