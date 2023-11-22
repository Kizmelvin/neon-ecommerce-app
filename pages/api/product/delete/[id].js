import prisma from "@/lib/prisma";

export default async function handleDelete(req, res) {
  const productId = req.query.id;
  if (req.method === "DELETE") {
    const product = await prisma.product.delete({
      where: { id: productId },
    });
    res.json(product);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
