import React, { useState } from "react";
import Layout from "@/components/Layout";
import Router from "next/router";
import ProductForm from "@/components/Product-Form";

const CreateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [publish, setPublish] = useState(false);

  const create = async (e) => {
    e.preventDefault();
    try {
      const body = { productName, productPrice, productImage, publish };
      await fetch("/api/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/p/own");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <ProductForm
        handleSubmit={(e) => create(e)}
        publish={publish}
        setPublish={setPublish}
        productImage={productImage}
        setProductImage={setProductImage}
        productName={productName}
        setProductName={setProductName}
        productPrice={productPrice}
        setProductPrice={setProductPrice}
        handleCancel={() => Router.push("/p/own")}
      />
    </Layout>
  );
};

export default CreateProduct;
