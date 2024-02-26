import bcrypt from "bcrypt";
import config from "../../config";
import { jwtHealper } from "../../utils/jwtHealper";

type userInfo = {
  name: string;
  email: string;
  password: string;
  bio?: string;
};

export const authResolvers = {
  signup: async (parent: any, args: userInfo, { prisma }: any) => {
    const hassPass = await bcrypt.hash(args.password, 12);
    console.log(args, hassPass);

    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hassPass,
      },
    });
    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }

    const token = await jwtHealper.genarateToken(
      { userId: newUser.id },
      config.jwt.secret as string
    );

    console.log(token);

    return { token };
  },
  signin: async (parent: any, args: any, { prisma }: any) => {
    console.log(args, "args");

    const user = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    console.log(user, "user");
    if (!user) {
      console.log("111");

      return {
        userError: "user not found",
        token: null,
      };
    }
    const correctPass = await bcrypt.compare(args.password, user?.password);
    if (!correctPass) {
      return {
        userError: "incorrect password",
        token: null,
      };
    }

    const token = await jwtHealper.genarateToken(
      { userId: user.id },
      config.jwt.secret as string
    );

    console.log(token, "token");

    return {
      userError: null,
      token,
    };
  },
};
