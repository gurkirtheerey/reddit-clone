import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const data = req.body;
  if (data) {
    const { email, post } = data;
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      const d = await prisma.post.findUnique({
        where: { id: post.id },
      });

      const arr = d.upLikesFrom;
      if (!arr.includes(user.id)) {
        arr.push(user.id);

        const like = await prisma.post.update({
          data: {
            upLikesFrom: { set: arr },
          },
          where: {
            id: post.id,
          },
        });
        return res.status(200).send(like);
      } else {
        let index = arr.indexOf(user.id);
        if (index > -1) {
          arr.splice(index, 1);
        }
        const data = await prisma.post.update({
          data: {
            upLikesFrom: { set: arr },
          },
          where: {
            id: post.id,
          },
        });
        return res.status(200).send(data);
      }
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  }
};
