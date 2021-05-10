import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const { id } = req.body.data;
  console.log("ID ", id);
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: { author: true },
    });
    return res.status(200).send(post);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};
