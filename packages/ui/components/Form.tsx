import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { CheckIcon } from "../Icons/CheckIcon";
import { Close } from "../Icons/Close";
import { Plus } from "../Icons/Plus";
import { Tag } from "../Icons/Tag";

type Props = {
  allTags: Tags[];
};

interface Todo {
  id: string;
  todo: string;
  isCompleted: boolean;
}

interface Tags {
  id: number;
  tag: string;
}

const testTags = [
  {
    id: "1",
    tag: "Important",
  },
  {
    id: "2",
    tag: "Personal",
  },
];

export const Form = ({ allTags }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const [isFormExpanded, setIsFormExpanded] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [showCheckboxes, setShowCheckboxes] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showTags, setShowTags] = useState<boolean>(false);
  const [tags, setTags] = useState<Tags[]>(allTags);
  const [selectedTags, setSelectedTags] = useState<Tags[]>([]);

  const [todoValue, setTodoValue] = useState<string>("");
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event?.key === "Enter") {
      setTodos([
        ...todos,
        {
          id: `${Math.random()}`,
          isCompleted: false,
          todo: todoValue,
        },
      ]);
      setTodoValue("");
    }
  }

  useEffect(() => {
    // dynamic height textarea
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef?.current?.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, note]);

  useEffect(() => {
    // detect clicks outside form container
    function handleClickOutside(event: MouseEvent) {
      if (
        formContainerRef.current &&
        !formContainerRef.current.contains(event.target as Node) &&
        isFormExpanded
      ) {
        setIsFormExpanded(false);
        setShowCheckboxes(false);
        setTitle("");
        setNote("");
        setTodoValue("");
        setTodos([]);
        setShowTags(false);
      }
    }
    // attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // remove the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formContainerRef, isFormExpanded]);

  return (
    <div
      ref={formContainerRef}
      className="mx-auto my-8 max-w-2xl  rounded-md border border-neutral-300 dark:border-neutral-600"
    >
      {/* title input start */}
      <div className="px-4 py-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full text-base font-semibold outline-none dark:bg-neutral-800 dark:text-white"
          onFocus={() => setIsFormExpanded(true)}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      {/* title input end */}
      {/* form expanded */}
      {isFormExpanded ? (
        <div>
          {/* note input start */}
          <div className="px-4 py-3">
            <textarea
              ref={textAreaRef}
              placeholder="Take a note..."
              rows={1}
              value={note}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                setNote(event?.target?.value)
              }
              className="h-auto w-full  text-sm outline-none dark:bg-neutral-800 dark:text-white"
            />
          </div>
          {/* note input end */}

          {/* todos list start */}
          {todos?.length > 0 ? (
            <div className="mt-2">
              {todos?.map((todo) => {
                const id = todos.findIndex((item) => item.id === todo.id);
                return (
                  <div
                    key={todo?.id}
                    className="border-t border-b border-neutral-300 px-9 py-1 dark:border-neutral-600"
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        <input
                          type="checkbox"
                          checked={todo?.isCompleted}
                          onChange={() => {
                            const updatedTodo: Todo = {
                              ...todos[id],
                              isCompleted: !todo?.isCompleted,
                            };

                            setTodos([
                              ...todos.slice(0, id),
                              updatedTodo,
                              ...todos.slice(id + 1),
                            ]);
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        className="h-5 w-full text-sm font-normal outline-none dark:bg-neutral-800 dark:text-white"
                        placeholder="List Item"
                        defaultValue={todo?.todo}
                        onKeyDown={(
                          event: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          if (event.key === "Enter") {
                            const updatedTodo: Todo = {
                              ...todos[id],
                              todo: (event.target as HTMLInputElement).value,
                            };

                            setTodos([
                              ...todos.slice(0, id),
                              updatedTodo,
                              ...todos.slice(id + 1),
                            ]);
                          }
                        }}
                      />
                      <div className="ml-4">
                        <button
                          className="mx-2 grid h-8 w-8 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700"
                          onClick={() => {
                            const updatedTodos = todos.filter(
                              (currentTodo) => currentTodo.id !== todo.id
                            );
                            setTodos(updatedTodos);
                          }}
                        >
                          <Close />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
          {/* todos list end */}

          {/* checkbox form start */}
          {showCheckboxes ? (
            <div className="mb-2">
              <div className="border-t border-b border-neutral-300 px-9 py-1 dark:border-neutral-600">
                <div className="flex items-center">
                  <div className="mr-4">
                    <Plus />
                  </div>
                  <input
                    type="text"
                    className="h-5 w-full text-sm font-normal outline-none dark:bg-neutral-800 dark:text-white"
                    placeholder="List Item"
                    value={todoValue}
                    onKeyDown={(event) => onKeyDown(event)}
                    onChange={(event) => setTodoValue(event.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : null}
          {/* checkbox form end */}

          {/* selected tags start */}
          {selectedTags?.length > 0 ? (
            <div className="flex items-center px-4 py-1">
              {selectedTags?.map((selectedTag) => (
                <div
                  key={selectedTag.id}
                  className="mr-1 grid h-6 place-content-center rounded-full border border-neutral-300 px-8 py-4 dark:border-neutral-600"
                >
                  <p className="text-xs dark:text-white">{selectedTag.tag}</p>
                </div>
              ))}
            </div>
          ) : null}
          {/* selected tags end */}

          {/* No tages message start */}
          {tags?.length < 1 && showTags ? (
            <div className="px-4 py-2">
              <p className="text-xs text-red-500">
                No Tags available. Please create Tag first.
              </p>
            </div>
          ) : null}
          {/* No tages message end */}

          {/* add tags start */}
          {tags?.length > 0 && showTags ? (
            <div className="flex flex-col px-4 py-2">
              {tags?.map((tag) => {
                const isTagSelected = selectedTags.findIndex(
                  (selectedTag) => selectedTag.id === tag.id
                );

                return (
                  <div className="my-1 mr-2 flex items-center" key={tag.id}>
                    <input
                      type="checkbox"
                      value={isTagSelected}
                      className="mr-2"
                      onChange={() => {
                        if (isTagSelected === -1) {
                          setSelectedTags([...selectedTags, tag]);
                          return;
                        }
                        const updatedSelectedTags = selectedTags.filter(
                          (selectedTag) => selectedTag.id !== tag.id
                        );

                        setSelectedTags(updatedSelectedTags);
                      }}
                    />
                    <p className="text-xs dark:text-white">{tag.tag}</p>
                  </div>
                );
              })}
            </div>
          ) : null}
          {/* add tags end */}

          {/* action buttons footer start */}
          <div className="my-1 flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => setShowCheckboxes(!showCheckboxes)}>
                <div className="mx-2 grid h-8 w-8 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700">
                  <CheckIcon showCheckboxes={showCheckboxes} />
                </div>
              </button>
              <button onClick={() => setShowTags(!showTags)}>
                <div className="mx-2 grid h-8 w-8 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700">
                  <Tag showTags={showTags} />
                </div>
              </button>
            </div>
            <button className="mr-4 rounded-md px-6 py-2 hover:bg-slate-100 hover:dark:bg-neutral-700">
              <span className="text-sm font-medium dark:text-white">Save</span>
            </button>
          </div>
          {/* action buttons footer end */}
        </div>
      ) : null}
    </div>
  );
};
