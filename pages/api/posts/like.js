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

      const up = d.upLikesFrom;
      const down = d.downLikesFrom;
      if (down.indexOf(user.id) >= 0) {
        down.splice(down.indexOf(user.id), 1);
      }
      if (!up.includes(user.id)) {
        up.push(user.id);

        const like = await prisma.post.update({
          data: {
            downLikesFrom: { set: down },
            upLikesFrom: { set: up },
          },
          include: { comments: { include: { author: true } } },
          where: {
            id: post.id,
          },
        });
        return res.status(200).send(like);
      } else {
        let index = up.indexOf(user.id);
        if (index > -1) {
          up.splice(index, 1);
        }
        const data = await prisma.post.update({
          data: {
            upLikesFrom: { set: up },
          },

          include: { comments: { include: { author: true } } },
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
