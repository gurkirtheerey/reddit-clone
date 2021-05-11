import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const data = req.body.data;
  if (data) {
    const { email } = data;
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (user) {
        const { id } = user;
        try {
          const response = await prisma.post.create({
            data: {
              authorId: id,
              title: data.title,
              content: data.content,
              published: false,
            },
          });
          return res.status(200).send(response);
        } catch (e) {
          console.log(e);
          return res.status(500);
        }
      }
    } catch (e) {
      return res.status(500).send("Internal Server Error", e.message);
    }
  }
};
