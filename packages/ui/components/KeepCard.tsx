import React from "react";
import { Trash } from "../Icons/Trash";

export interface Keeps {
  keeps: Keep[];
}

export interface Keep {
  id: number;
  title: string;
  note: string | null;
  tags: Tag[] | [];
  todos: Todo[] | [];
}

export interface Tag {
  id: number;
  tag: string;
}

export interface Todo {
  id: string;
  isCompleted: boolean;
  todo: string;
  keepId: number;
}

export const KeepCard = ({
  keep,
  deleteKeep,
  isDeleting,
}: {
  keep: Keep;
  deleteKeep: (id: number) => void;
  isDeleting: boolean;
}) => {
  return (
    <div
      key={keep.id}
      className="group mb-5 cursor-pointer break-inside-avoid rounded-lg border border-neutral-300 py-3 px-4 shadow-md dark:border-neutral-600"
    >
      <>
        <h3 className="text-base font-medium dark:text-white">{keep.title}</h3>
        <p className="pb-3 pt-1 text-lg font-normal dark:text-white">
          {keep.note}
        </p>
        {keep?.todos && keep?.todos?.length > 0 ? (
          <div className="my-3">
            {keep?.todos?.map((todo) => (
              <div key={todo.id} className="flex items-center">
                <input
                  className="mr-4 "
                  type="checkbox"
                  checked={todo?.isCompleted}
                  onChange={() => {
                    //
                  }}
                />

                <p className="text-sm font-normal dark:text-white">
                  {todo.todo}
                </p>
              </div>
            ))}
          </div>
        ) : null}
        {keep?.tags && keep?.tags?.length > 0 ? (
          <div className="my-3 flex flex-wrap items-center">
            {keep?.tags?.map((tag) => (
              <div
                key={tag.id}
                className="mr-1 grid h-6 place-content-center rounded-full border border-neutral-300 px-4 py-2 dark:border-neutral-600"
              >
                <p className="text-xs dark:text-white">{tag.tag}</p>
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex justify-end">
          <button
            onClick={() => deleteKeep(keep?.id)}
            disabled={isDeleting}
            className="grid h-7 w-7 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700"
          >
            <span className="hidden group-hover:block">
              <Trash height="h-4" width="w-4" />
            </span>
          </button>
        </div>
      </>
    </div>
  );
};
