import prisma from "../../../lib/prisma";
export default async (req, res) => {
  try {
    const subthreads = await prisma.subthread.findMany();
    if (subthreads) {
      return res.status(200).send(subthreads);
    } else {
      return res.status(400).send(subthreads);
    }
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};
