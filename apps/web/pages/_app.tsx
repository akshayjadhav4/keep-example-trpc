import type { AppProps } from "next/app";
import "../styles/main.css";
import Layout from "./components/Layout";
import { trpc } from "../utils/trpc";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default trpc.withTRPC(MyApp);
