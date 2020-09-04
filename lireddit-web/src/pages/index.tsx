import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useGetPostsQuery } from "../generated/graphql";
import NextLink from "next/link";
import { Link } from "@chakra-ui/core";

const Index = () => {
  const [{ data, fetching }] = useGetPostsQuery();
  return (
    <Layout>
      <NextLink href="/create-post">
        <Link>Create Post</Link>
      </NextLink>
      <br />
      <br />
      {fetching && <div>Loading</div>}
      {!fetching &&
        data &&
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
