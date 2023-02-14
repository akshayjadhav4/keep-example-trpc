import Head from "next/head";
import { Form } from "ui";
import Loader from "ui/components/Loader";
import { trpc } from "../utils/trpc";
export default function Web() {
  const { data: tagsData, isLoading } = trpc.tags.getAllTags.useQuery();
  const createKeepMutation = trpc.keep.createKeep.useMutation();
  const tags = tagsData?.tags || [];
  function createKeep(keep: {
    title: string;
    note: string;
    todos?: {
      id: string;
      todo: string;
      isCompleted: boolean;
    }[];
    tags?: { id: number }[];
  }) {
    createKeepMutation.mutate({
      title: keep.title,
      note: keep.note,
      tags: keep.tags,
      todos: keep?.todos,
    });
  }
  return (
    <>
      <Head>
        <title>Keep</title>
      </Head>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Form allTags={tags} createKeep={createKeep} />
        </div>
      )}
    </>
  );
}
