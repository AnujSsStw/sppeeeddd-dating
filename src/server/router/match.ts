import { createRouter } from "./context";
import { z } from "zod";
import { tokenGen } from "../agora";

export const matchRouter = createRouter()
  .mutation("setFeedback", {
    input: z.object({
      feedBack: z.string(),
      userId: z.string(),
      matchId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.match.findUnique({
        where: {
          id: input.matchId,
        },
      });

      const isSinkUser = user?.sinkUserId === input.userId;

      await ctx.prisma.match.update({
        where: {
          id: input.matchId,
        },
        data: {
          [isSinkUser ? "sinkFeedback" : "sourceFeedback"]: input.feedBack,
          status: "onGoing",
        },
      });
    },
  })
  .query("getMatch", {
    input: z.object({
      matchId: z.string(),
    }),
    async resolve({ input, ctx }) {
      const match = await ctx.prisma.match.findUnique({
        where: {
          id: input.matchId,
        },
        include: {
          sinkUser: true,
          sourceUser: true,
        },
      });

      return match;
    },
  })
  .query("getToken", {
    input: z.object({
      matchId: z.string(),
      userId: z.string(),
    }),
    async resolve({ input, ctx }) {
      return tokenGen(input.matchId, input.userId);
    },
  });
