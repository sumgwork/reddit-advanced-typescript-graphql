import { withUrqlClient } from "next-urql";
import { Navbar } from "../components/Navbar";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => (
  <div>
    <Navbar />
  </div>
);

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);