import prisma from "../../../lib/prisma";

export default async (req, res) => {
  try {
    const data = await prisma.post.findMany({ include: { author: true } });
    if (data) {
      return res.status(200).send(data);
    } else {
      return res.status(200).json({ message: "Seems empty in here..." });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
