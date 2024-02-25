import { Query } from "./Query/Query";
import { PrismaClient } from "@prisma/client";

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const resolvers = {
  Query,
};
