import Head from "next/head";
import React, { useCallback } from "react";
import CreateTag from "ui/components/CreateTag";
import Loader from "ui/components/Loader";
import { trpc } from "../utils/trpc";

export default function ManageTagsPage() {
  const { data, isLoading, refetch } = trpc.tags.getAllTags.useQuery();
  const createTagMutation = trpc.tags.createTag.useMutation({
    mutationKey: ["getAllTags"],
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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>Keep | Manage Tags</title>
      </Head>
      <div>
        <CreateTag createTag={createTag} />
      </div>
    </>
  );
}
