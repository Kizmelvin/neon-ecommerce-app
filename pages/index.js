import prisma from "@/lib/prisma";
import Layout from "@/components/Layout";
import Product from "@/components/Product";

export const getStaticProps = async () => {
  const products = await prisma.product.findMany({
    where: { publish: true },
    include: {
      productOwner: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: { products },
    revalidate: 10,
  };
};

const Products = (props) => {
  return (
    <>
      <Layout>
        <div className="grid grid-cols-3 gap-2">
          {props.products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Products;
