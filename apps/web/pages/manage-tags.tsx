import Head from "next/head";
import React, { useCallback } from "react";
import CreateTag from "ui/components/CreateTag";
import Loader from "ui/components/Loader";
import NoTags from "ui/components/NoTags";
import { trpc } from "../utils/trpc";

export default function ManageTagsPage() {
  const { data, isLoading, refetch, isError } = trpc.tags.getAllTags.useQuery();
  const createTagMutation = trpc.tags.createTag.useMutation({
    mutationKey: ["createTag"],
    onSuccess: () => refetch(),
  });

  const deleteTagMutation = trpc.tags.deleteTag.useMutation({
    mutationKey: ["deleteTag"],
    onSuccess: () => refetch(),
  });

  const createTag = useCallback(
    (tag: string) => {
      createTagMutation.mutate({
        tag,
      });
    },
    [createTagMutation]
  );

  const deleteTag = useCallback(
    (id: number) => {
      deleteTagMutation.mutate({
        id,
      });
    },
    [deleteTagMutation]
  );

  if (
    isLoading ||
    createTagMutation?.isLoading ||
    deleteTagMutation?.isLoading
  ) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>Keep | Manage Tags</title>
      </Head>
      <CreateTag createTag={createTag} />
      <div className="w-full">
        {data?.error || isError ? (
          <p className="text-center text-red-600">
            {isError ? "Failed to load Tags" : data?.error}
          </p>
        ) : null}
        {data?.tags && data?.tags?.length < 1 ? <NoTags /> : null}
        <h1 className="my-4 text-xl text-gray-400">Your Tags</h1>
        <div className="flex w-full flex-wrap items-center py-1 pr-4">
          {data?.tags?.map((tag) => (
            <button
              className="mr-2 grid h-6 place-content-center rounded-full border border-neutral-300 px-8 py-4 hover:bg-slate-100 dark:border-neutral-600 hover:dark:bg-neutral-700"
              key={tag.id}
              onClick={() => deleteTag(tag?.id)}
            >
              <p className="text-xs dark:text-white">{tag.tag}</p>
            </button>
          ))}
        </div>
        <p className="my-2 text-center text-sm text-gray-400">
          You can click on Tag to delete it.
        </p>
      </div>
    </>
  );
}
