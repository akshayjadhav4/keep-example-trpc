import Head from "next/head";
import React from "react";
import CreateTag from "ui/components/CreateTag";

export default function ManageTagsPage() {
  return (
    <>
      <Head>
        <title>Keep | Manage Tags</title>
      </Head>
      <div>
        <CreateTag />
      </div>
    </>
  );
}
