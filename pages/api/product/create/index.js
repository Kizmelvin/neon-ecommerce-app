import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const { productName, productPrice, productImage, publish } = req.body;
  if (session) {
    const result = await prisma.product.create({
      data: {
        name: productName,
        price: productPrice,
        image: productImage,
        publish: publish,
        productOwner: {
          connectOrCreate: {
            where: {
              email: session.user.email,
            },
            create: {
              email: session.user.email,
              name: session.user.name,
            },
          },
        },
      },
    });
    res.json(result);
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
