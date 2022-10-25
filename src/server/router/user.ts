import { createRouter } from "./context";
import { z } from "zod";
import { tokenGen } from "../agora";

export const userRouter = createRouter()
  .mutation("createUser", {
    input: z.object({
      name: z.string(),
      contactInfo: z.string(),
    }),
    async resolve({ input, ctx }) {
      const newUser = await ctx.prisma.registerUser.create({
        data: input,
      });

      return newUser;
    },
  })
  .mutation("changeStatus", {
    input: z.object({
      userId: z.string(),
      status: z.string(),
    }),
    async resolve({ input, ctx }) {
      await ctx.prisma.registerUser.update({
        where: {
          id: input.userId,
        },
        data: {
          status: input.status,
        },
      });
    },
  })
  .query("findUserForMatch", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const matchUser = await ctx.prisma.registerUser.findFirst({
        where: {
          status: "waiting",
          NOT: {
            id: input.userId,
          },
        },
      });

      if (!matchUser) return null;

      const match = await ctx.prisma.match.create({
        data: {
          sourceUserId: input.userId,
          sinkUserId: matchUser.id,
          status: "waiting",
          endsON: `${Date.now() + 1000 * 20}`,
        },
      });

      return match;
    },
  })
  .query("checkIfyouAssignMatch", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const match = await ctx.prisma.match.findFirst({
        where: {
          sinkUserId: input.userId,
          NOT: {
            status: "onGoing",
          },
        },
      });

      return match;
    },
  })
  .query("findUserById", {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.registerUser.findUnique({
        where: {
          id: input.userId,
        },
      });

      return user;
    },
  });
