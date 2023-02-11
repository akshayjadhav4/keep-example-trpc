import Head from "next/head";
import { Form } from "ui";
import { trpc } from "../utils/trpc";
export default function Web() {
  const hello = trpc.hello.sayHello.useQuery({ text: "Keep Project" });

  return (
    <>
      <Head>
        <title>Keep</title>
      </Head>
      <div>
        <Form />
        {!hello.error && hello.data ? <h1>{hello.data.greeting}</h1> : null}
      </div>
    </>
  );
}
