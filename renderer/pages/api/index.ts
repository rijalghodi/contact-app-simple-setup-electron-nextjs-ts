import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json("Hello World");
}
