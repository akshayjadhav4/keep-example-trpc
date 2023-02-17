import Head from "next/head";
import { useCallback, useState } from "react";
import { Form, KeepCard } from "ui";
import Loader from "ui/components/Loader";
import { Refresh } from "ui/Icons/Refresh";
import { trpc } from "../utils/trpc";
export default function Web() {
  const [reset, setReset] = useState(false);
  const { data: tagsData, isLoading } = trpc.tags.getAllTags.useQuery();
  const {
    data: keepsData,
    isLoading: isKeepsLoading,
    refetch,
  } = trpc.keep.getAllKeeps.useQuery();

  const createKeepMutation = trpc.keep.createKeep.useMutation({
    onSuccess: () => {
      refetch();
      setReset((reset) => !reset);
    },
  });
  const deleteKeepMutation = trpc.keep.deleteKeep.useMutation({
    onSuccess: () => refetch(),
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
  const deleteKeep = useCallback(
    (id: number) => {
      deleteKeepMutation.mutate({
        id: id,
      });
    },
    [deleteKeepMutation]
  );

  return (
    <>
      <Head>
        <title>Keep</title>
      </Head>
      {isLoading || isKeepsLoading ? (
        <Loader />
      ) : (
        <div className="mx-4">
          <Form
            allTags={tags}
            createKeep={createKeep}
            isProcessing={createKeepMutation.isLoading}
            reset={reset}
          />
          {createKeepMutation?.error ? (
            <p className=" my-4 text-center text-red-600">
              Something went wrong. Not able create Keep.
            </p>
          ) : null}
          <div className="my-2 flex justify-center">
            {deleteKeepMutation?.isLoading ? <Refresh isRefreshing /> : null}
          </div>
          {keepsData?.keeps && keepsData?.keeps?.length > 0 ? (
            <div className="mb-4 columns-1 gap-6 md:columns-2 lg:columns-3 xl:columns-4">
              {keepsData?.keeps.map((keep) => (
                <KeepCard
                  key={keep.id}
                  keep={keep}
                  deleteKeep={deleteKeep}
                  isDeleting={deleteKeepMutation?.isLoading}
                />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
