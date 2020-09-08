import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useGetPostsQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Link, Stack, Heading, Box, Text, Flex, Button } from "@chakra-ui/core";

const Index = () => {
  const [{ data, fetching }] = useGetPostsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout>
      <Flex align="center">
        <Heading>Reddit</Heading>
        <NextLink href="/create-post">
          <Link ml="auto">Create Post</Link>
        </NextLink>
      </Flex>
      <br />
      {fetching && <div>Loading</div>}
      {!fetching && data && (
        <Stack spacing={8}>
          {data.posts.map((post) => (
            <Box p={5} shadow="md" borderWidth="1px" key={post.id}>
              <Heading fontSize="xl">{post.title}</Heading>
              <Text mt={4}>{post.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {!fetching && data && (
        <Flex>
          <Button m="auto" my={8}>
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
