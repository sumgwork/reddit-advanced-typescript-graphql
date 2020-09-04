import { MiddlewareFn } from "type-graphql";
import { MyContext } from "src/types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const { req } = context;
  if (!req.session?.userId) {
    throw new Error("Not authenticated");
  }
  return next();
};
