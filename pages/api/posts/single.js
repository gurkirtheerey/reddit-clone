import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const { id } = req.body.data;
  if (id !== "undefined") {
    try {
      const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: {
          author: true,
          comments: {
            select: { comment: true, author: true, id: true, postId: true },
          },
          subthread: true,
        },
      });
      return res.status(200).send(post);
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  } else {
    return res.status(500);
  }
};
