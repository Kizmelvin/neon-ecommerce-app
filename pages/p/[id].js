import React, { useState } from "react";
import Router from "next/router";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import Product from "@/components/Product";
import prisma from "@/lib/prisma";
import ProductForm from "@/components/Product-Form";

export const getServerSideProps = async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      productOwner: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: product,
  };
};

//Delete Product
async function deleteProduct(id) {
  if (confirm("Delete this product?")) {
    await fetch(`/api/product/delete/${id}`, {
      method: "DELETE",
    });
    Router.push("/p/own");
  } else {
    Router.push(`/p/${id}`);
  }
}

const handleProducts = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [published, setPublished] = useState(false);

  const { id, publish } = props;

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.productOwner?.email;

  async function handlePublish(id) {
    const body = { publish };
    await fetch(`/api/product/publish/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    await Router.push("/p/own");
  }

  const updateProduct = async () => {
    try {
      const body = { productName, productPrice, productImage, published };
      await fetch(`/api/product/update/${id}`, {
        method: "PUT",
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
      <div>
        <div>
          <Product product={props} />

          {userHasValidSession &&
            postBelongsToUser &&
            (!props.publish ? (
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
                onClick={() => handlePublish(id)}
              >
                Publish
              </button>
            ) : (
              <button
                className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
                onClick={() => handlePublish(id)}
              >
                Unpublish
              </button>
            ))}
          {userHasValidSession && postBelongsToUser && (
            <div className="inline-flex mt-5 py-3">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded-l"
                onClick={() => deleteProduct(id)}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                onClick={() => setIsVisible(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <div>
          {isVisible && (
            <ProductForm
              handleSubmit={() => updateProduct()}
              publish={published}
              setPublish={setPublished}
              productImage={productImage}
              setProductImage={setProductImage}
              productName={productName}
              setProductName={setProductName}
              productPrice={productPrice}
              setProductPrice={setProductPrice}
              handleCancel={() => setIsVisible(false)}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default handleProducts;
