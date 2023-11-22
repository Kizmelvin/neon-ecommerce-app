import prisma from "@/lib/prisma";

export default async function handleUpdate(req, res) {
  const productId = req.query.id;
  const { productName, productPrice, productImage, publish } = req.body;
  if (req.method === "PUT") {
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name: productName,
        price: productPrice,
        image: productImage,
        publish: publish,
      },
    });
    res.json(product);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
