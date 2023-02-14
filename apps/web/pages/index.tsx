import Head from "next/head";
import { Form } from "ui";
import Loader from "ui/components/Loader";
import { trpc } from "../utils/trpc";
export default function Web() {
  const { data: tagsData, isLoading } = trpc.tags.getAllTags.useQuery();

  const tags = tagsData?.tags || [];

  return (
    <>
      <Head>
        <title>Keep</title>
      </Head>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Form allTags={tags} />
        </div>
      )}
    </>
  );
}
