import React from "react";
import { Archive } from "./Icons/Archive";
import { Bulb } from "./Icons/Bulb";
import { Tag } from "./Icons/Tag";
import { Trash } from "./Icons/Trash";

type Props = {};

export const Sidebar = (props: Props) => {
  return (
    <div className="pt-2">
      <div className="mx-3 my-3 h-9 w-9">
        <div className="grid h-11 w-11 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700">
          <Bulb height="h-6" width="h-6" isDynamicStroke={true} />
        </div>
      </div>
      <div className="mx-3 my-3 h-9 w-9">
        <div className="grid h-11 w-11 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700">
          <Tag />
        </div>
      </div>
      <div className="mx-3 my-3 h-9 w-9">
        <div className="grid h-11 w-11 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700">
          <Archive />
        </div>
      </div>
      <div className="mx-3 my-3 h-9 w-9">
        <div className="grid h-11 w-11 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700">
          <Trash />
        </div>
      </div>
    </div>
  );
};
