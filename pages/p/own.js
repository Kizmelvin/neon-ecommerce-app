import React from "react";
import Layout from "@/components/Layout";
import Product from "@/components/Product";
import prisma from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    res.statusCode = 403;
    return { props: { ownProducts: [] } };
  }
  const ownProducts = await prisma.product.findMany({
    where: {
      productOwner: { email: session.user.email },
    },
    include: {
      productOwner: {
        select: { name: true },
      },
    },
  });
  return {
    props: { ownProducts },
  };
};

export default function Userproducts(props) {
  if (!props.ownProducts.length) {
    return (
      <Layout>
        <h1>You have no product yet</h1>
        <Link legacyBehavior href="/p/create">
          <button className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
            Create product
          </button>
        </Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-2">
        {props.ownProducts.map((product) => (
          <div key={product.id} className="post">
            <Product product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
}
