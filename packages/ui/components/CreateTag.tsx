import { useState } from "react";
import { Plus } from "../Icons/Plus";

interface CreateTagProps {
  createTag: (tag: string) => void;
}
export default function CreateTag({ createTag }: CreateTagProps) {
  const [tag, setTag] = useState("");
  return (
    <div className="mx-auto my-8 max-w-2xl  rounded-md border border-neutral-300 dark:border-neutral-600">
      <div className="flex items-center px-4 py-3">
        <input
          type="text"
          placeholder="Create new label"
          className="w-full text-base font-semibold outline-none dark:bg-neutral-800 dark:text-white"
          value={tag}
          onChange={(event) => setTag(event.target.value)}
        />
        <button
          onClick={() => {
            createTag(tag);
            setTag("");
          }}
        >
          <div className="mx-2 grid h-8 w-8 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700">
            <Plus />
          </div>
        </button>
      </div>
    </div>
  );
}
