import Head from "next/head";
import { Form, Header, Sidebar } from "ui";
export default function Web() {
  return (
    <>
      <Head>
        <title>Keep</title>
      </Head>
      <div className="min-h-screen dark:bg-neutral-800">
        <Header />
        <hr className="h-px border-0 bg-gray-200 dark:bg-neutral-600" />
        <div className="flex min-h-screen">
          <div className="w-28">
            <Sidebar />
          </div>
          <div className="flex-1">
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}
