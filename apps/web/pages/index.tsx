import Head from "next/head";
import { useCallback, useState } from "react";
import { Form } from "ui";
import Loader from "ui/components/Loader";
import { trpc } from "../utils/trpc";
export default function Web() {
  const [reset, setReset] = useState(false);
  const { data: tagsData, isLoading } = trpc.tags.getAllTags.useQuery();
  const createKeepMutation = trpc.keep.createKeep.useMutation({
    onSuccess: (reset) => setReset(!reset),
  });
  const tags = tagsData?.tags || [];
  const createKeep = useCallback(
    (keep: {
      title: string;
      note: string;
      todos?: {
        id: string;
        todo: string;
        isCompleted: boolean;
      }[];
      tags?: { id: number }[];
    }) => {
      createKeepMutation.mutate({
        title: keep.title,
        note: keep.note,
        tags: keep.tags,
        todos: keep?.todos,
      });
    },
    [createKeepMutation]
  );

  return (
    <>
      <Head>
        <title>Keep</title>
      </Head>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Form
            allTags={tags}
            createKeep={createKeep}
            isProcessing={createKeepMutation.isLoading}
            reset={reset}
          />
          {createKeepMutation?.error ? (
            <p className="text-center text-red-600">
              Something went wrong. Not able create Keep.
            </p>
          ) : null}
        </div>
      )}
    </>
  );
}
