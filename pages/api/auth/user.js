// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../../lib/prisma";

export default async (req, res) => {
  const { email, image, name } = req.body.data;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        posts: {
          select: {
            author: true,
            authorId: true,
            title: true,
            content: true,
            id: true,
            upLikesFrom: true,
          },
        },
      },
    });
    if (!user) {
      try {
        const response = await prisma.user.create({
          data: { email, image, name },
        });
        return res.status(200).json({ response });
      } catch (e) {
        console.log(e);
        return res.status(500);
      }
    } else {
      try {
        return res.status(200).json({ user });
      } catch (e) {
        console.log(e);
        return res.status(500);
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};
