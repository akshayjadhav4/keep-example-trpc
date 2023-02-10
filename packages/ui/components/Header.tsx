import { useState } from "react";

import { Bulb } from "../Icons/Bulb";
import { Menu } from "../Icons/Menu";
import { Refresh } from "../Icons/Refresh";
import { Search } from "../Icons/Search";
import { Settings } from "../Icons/Settings";

export const Header = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <div className="w-full p-2">
      <div className="flex h-12 items-center justify-between">
        {/* start left Header content */}
        <div className=" flex  items-center">
          <button>
            <div className="mx-1 h-12 w-12 p-3 hover:rounded-full hover:bg-slate-100  hover:dark:bg-neutral-700">
              <Menu />
            </div>
          </button>
          <div className="mr-2 grid h-10 w-10 place-items-center rounded-md bg-yellow-300">
            <Bulb />
          </div>
          <h1 className="ml-1 font-sans text-2xl font-normal text-neutral-800 dark:text-white">
            Keep
          </h1>
        </div>
        {/* end left Header content */}
        {/* start center Header content */}
        <div className=" ml-3 mr-8 flex h-12 flex-1 items-center rounded-md bg-gray-100 dark:bg-zinc-500">
          <div className="mx-1 h-12 w-12 p-3 hover:rounded-full hover:bg-slate-100  hover:dark:bg-neutral-700">
            <Search />
          </div>
          <input
            type="text"
            className="ml-4 mr-9 h-12 w-full bg-gray-100 outline-none dark:bg-zinc-500"
            placeholder="Search"
          />
        </div>
        {/* start center Header content */}
        {/* start right Header content */}
        <div className=" flex  items-center">
          <button
            onClick={() => setIsRefreshing((isRefreshing) => !isRefreshing)}
            disabled={isRefreshing}
          >
            <div className="mx-1 h-12 w-12 p-3 hover:rounded-full hover:bg-slate-100  hover:dark:bg-neutral-700">
              <Refresh isRefreshing={isRefreshing} />
            </div>
          </button>
          <div className="mx-1 h-12 w-12 p-3 hover:rounded-full hover:bg-slate-100  hover:dark:bg-neutral-700">
            <Settings />
          </div>
        </div>
        {/* end right Header content */}
      </div>
    </div>
  );
};
