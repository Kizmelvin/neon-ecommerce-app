import React from "react";
import Router from "next/router";

function Product({ product }) {
  // const formatCurrency = (num) => {
  //   return "#" + Number.parseFloat(num).toFixed();
  // };
  return (
    <div onClick={() => Router.push(`/p/${product.id}`)}>
      <div className="max-w-3xl mt-5 rounded overflow-hidden shadow-lg">
        <img className="w-full" src={product.image} alt="item image" />
        <div className="px-6 py-4">
          <div className="font-bold text-4xl mb-2">{product.name}</div>
          <p className="font-bold mt-4 text-gray-500 text-3xl">
            #{product.price}
          </p>
        </div>
        <div className="flex justify-end px-6 pt-4 pb-2">
          <span className="inline-block bg-orange-200 rounded-lg px-3 py-1 text-xl font-bold text-gray-900 mr-2 mb-2">
            Add to cart
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;
