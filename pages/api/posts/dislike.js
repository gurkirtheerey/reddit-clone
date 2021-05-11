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

      const down = d.downLikesFrom;
      const up = d.upLikesFrom;
      const idx = up.indexOf(user.id);
      if (idx >= 0) {
        up.splice(idx, 1);
      }
      if (!down.includes(user.id)) {
        down.push(user.id);

        const like = await prisma.post.update({
          data: {
            upLikesFrom: { set: up },
            downLikesFrom: { set: down },
          },
          where: {
            id: post.id,
          },
        });
        return res.status(200).send(like);
      } else {
        let index = down.indexOf(user.id);
        if (index > -1) {
          down.splice(index, 1);
        }
        const data = await prisma.post.update({
          data: {
            downLikesFrom: { set: down },
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
