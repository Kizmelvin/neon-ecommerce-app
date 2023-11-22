import React from "react";
import { useSession, getSession } from "next-auth/react";
import Layout from "@/components/Layout";
import Product from "@/components/Product";
import prisma from "@/lib/prisma";

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { ownTodos: [] } };
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

const UserTodos = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
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
};

export default UserTodos;
