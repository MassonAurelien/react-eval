import Head from "next/head";
import { Layout } from "antd";

import Signup from "../components/Session/Signup";

export default function SignupPage() {
  return (
    <Layout>
      <Head>
        <title>Inscription</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Signup />
    </Layout>
  );
}
