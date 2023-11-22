import prisma from "@/lib/prisma";

export default async function handleActive(req, res) {
  const productId = req.query.id;
  const { publish } = req.body;
  const product = await prisma.product.update({
    where: { id: productId },
    data: { publish: !publish },
  });
  res.json(product);
}
