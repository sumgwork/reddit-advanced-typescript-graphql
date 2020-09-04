import React from "react";
import { Box, Link, Flex, Button, CircularProgress } from "@chakra-ui/core";
import NextLink from "next/link";
import { useWhoAmIQuery, useLogoutMutation } from "../generated/graphql";
import { useRouter } from "next/router";
import { isServer } from "../utils/isServer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useWhoAmIQuery({
    pause: isServer(),
  });
  // pause as 'true' will not run the query on ssr

  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let body = null;

  if (fetching) {
    body = <CircularProgress value={80} />;
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="black" mr={4}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="black">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          isLoading={logoutFetching}
          variant="link"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tan" p={4} position="sticky" top={0} zIndex={1}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
