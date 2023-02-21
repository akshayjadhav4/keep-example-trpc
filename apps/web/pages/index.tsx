import Head from "next/head";
import { useCallback, useState } from "react";
import { Form, Keep, KeepCard, Modal } from "ui";
import Loader from "ui/components/Loader";
import { Refresh } from "ui/Icons/Refresh";
import { trpc } from "../utils/trpc";

export default function Web() {
  const [reset, setReset] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editKeep, setEditKeep] = useState<Keep | null>(null);

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
  const updateKeepMutation = trpc.keep.updateKeep.useMutation({
    onSuccess: () => {
      refetch();
      setIsOpen(false);
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

  const updateKeep = useCallback(
    (keep: {
      id: number;
      title: string;
      note: string | null;
      todos?: {
        id: string;
        todo: string;
        isCompleted: boolean;
      }[];
      tags?: { id: number }[];
    }) => {
      updateKeepMutation.mutate({
        id: keep.id,
        title: keep.title,
        note: keep.note || "",
        tags: keep.tags,
        todos: keep?.todos,
      });
    },
    [updateKeepMutation]
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
                <div
                  key={keep.id}
                  onClick={() => {
                    setIsOpen(true);
                    setEditKeep(keep);
                  }}
                >
                  <KeepCard
                    keep={keep}
                    deleteKeep={deleteKeep}
                    isDeleting={deleteKeepMutation?.isLoading}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
      <Modal
        isOpen={isOpen}
        editKeep={editKeep}
        setIsOpen={(isOpen) => setIsOpen(isOpen)}
        allTags={tagsData?.tags}
        isProcessing={updateKeepMutation?.isLoading}
        updateKeep={updateKeep}
      />
    </>
  );
}
