import { dedupExchange, fetchExchange } from "urql";
import {
  LogoutMutation,
  WhoAmIQuery,
  WhoAmIDocument,
  LoginMutation,
  RegisterUserMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange } from "@urql/exchange-graphcache";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, WhoAmIQuery>(
              cache,
              { query: WhoAmIDocument },
              _result as LogoutMutation,
              () => ({ me: null })
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, WhoAmIQuery>(
              cache,
              { query: WhoAmIDocument },
              _result as LoginMutation,
              (result, query) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return { me: result.login.user };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterUserMutation, WhoAmIQuery>(
              cache,
              { query: WhoAmIDocument },
              _result as RegisterUserMutation,
              (result, query) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return { me: result.register.user };
                }
              }
            );
          },
        },
      },
    }),
    ssrExchange,
    fetchExchange,
  ],
});
