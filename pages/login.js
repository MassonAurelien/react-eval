import Head from "next/head";
import { Layout } from "antd";
import Login from "../components/Session/Login";

export default function LoginPage() {
  return (
    <Layout>
      <Head>
        <title>Connexion</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </Layout>
  );
}
