import prisma from "../../../lib/prisma";

export default async (req, res) => {
  try {
    const postdata = await prisma.post.findMany({
      include: { author: true, comments: true, subthread: true },
    });
    if (postdata) {
      try {
        const subthreads = await prisma.subthread.findMany();
        if (subthreads && postdata) {
          return res.status(200).send({ postdata, subthreads });
        } else {
          return res.status(500).send();
        }
      } catch (e) {
        console.log(e);
        return res.status(500).send(e.message);
      }
    } else {
      return res.status(200).json({ message: "Seems empty in here..." });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
