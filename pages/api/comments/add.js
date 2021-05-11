import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const { comment, userId, id } = req.body;

  try {
    const post = await prisma.post.findUnique({ where: { id: id } });
    if (post) {
      const { authorId } = post;
      try {
        const saveComment = await prisma.comment.create({
          data: {
            authorId,
            comment,
            postId: id,
          },
        });
        const p = await prisma.post.findUnique({
          where: { id: id },
          include: { comments: { include: { author: true } } },
        });
        return res.status(200).send(p);
      } catch (e) {
        console.log(e);
        return res.status(500);
      }
    } else {
      return res.status(404);
    }
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};
