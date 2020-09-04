import { useRouter } from "next/router";
import { useWhoAmIQuery } from "../generated/graphql";
import { useEffect } from "react";

export const useIsAuth = () => {
  const router = useRouter();
  const [{ data, fetching }] = useWhoAmIQuery();

  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login");
    }
  }, [data, fetching, router]);
};
