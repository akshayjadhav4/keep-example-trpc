import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState, KeyboardEvent } from "react";
import { Close, Keep, Tag, Todo } from "ui";
import { Plus } from "../../Icons/Plus";
import { uuid } from "uuidv4";
import { Refresh } from "../../Icons/Refresh";
import { Tag as TagIcon } from "../../Icons/Tag";

export const Modal = ({
  isOpen,
  setIsOpen,
  editKeep,
  allTags,
  isProcessing,
  updateKeep,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editKeep: Keep | null;
  allTags: Tag[] | undefined;
  isProcessing: boolean;
  updateKeep: (keep: {
    id: number;
    title: string;
    note: string;
    todos?: {
      id: string;
      todo: string;
      isCompleted: boolean;
    }[];
    tags?: { id: number }[];
  }) => void;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoValue, setTodoValue] = useState<string>("");
  const [showTags, setShowTags] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  function closeModal() {
    setIsOpen(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event?.key === "Enter") {
      setTodos([
        ...todos,
        {
          id: `${uuid()}`,
          isCompleted: false,
          todo: todoValue,
          keepId: editKeep?.id,
        },
      ]);
      setTodoValue("");
    }
  }

  useEffect(() => {
    if (isOpen) {
      setShowTags(false);
      setTitle(editKeep?.title || "");
      setNote(editKeep?.note || "");
      setTodos(editKeep?.todos || []);
      setSelectedTags(editKeep?.tags || []);
      setTags(allTags || []);
    }
  }, [editKeep, isOpen, allTags]);

  useEffect(() => {
    // dynamic height textarea
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef?.current?.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, note]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            if (!isProcessing) {
              closeModal();
            }
          }}
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg border border-neutral-300 bg-white p-4 text-left align-middle shadow-xl transition-all dark:border-neutral-500 dark:bg-neutral-800">
                  {/* Title start */}
                  <div className="mb-3">
                    <input
                      className="h-7 w-full outline-none dark:bg-neutral-800 dark:text-white"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </div>
                  {/* Title end */}

                  {/* Note start */}
                  <div className="my-3">
                    <textarea
                      ref={textAreaRef}
                      rows={1}
                      value={note}
                      onChange={(
                        event: React.ChangeEvent<HTMLTextAreaElement>
                      ) => setNote(event?.target?.value)}
                      className="h-auto w-full  text-sm outline-none dark:bg-neutral-800 dark:text-white"
                    />
                  </div>
                  {/* Note end */}

                  {/* TODOs start */}
                  {todos?.length > 0 ? (
                    <div className="mb-3 mt-1 w-full">
                      {todos?.map((todo) => {
                        const id = todos.findIndex(
                          (item) => item.id === todo.id
                        );
                        return (
                          <div key={todo?.id} className="px-5 py-1">
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
                                      todo: (event.target as HTMLInputElement)
                                        .value,
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
                                      (currentTodo) =>
                                        currentTodo.id !== todo.id
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
                  {/* TODOs end */}

                  {/* Add TODO UI start */}
                  <div className="mb-2">
                    <div className="px-5 py-1">
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
                  {/* Add TODO UI end */}

                  {/* selected tags start */}
                  {selectedTags?.length > 0 ? (
                    <div className="flex items-center px-4 py-1">
                      {selectedTags?.map((selectedTag) => (
                        <div
                          key={selectedTag.id}
                          className="mr-1 grid h-6 place-content-center rounded-full border border-neutral-300 px-4 py-2 dark:border-neutral-600"
                        >
                          <p className="text-xs dark:text-white">
                            {selectedTag.tag}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {/* selected tags end */}

                  {/* add tags start */}
                  {tags && tags?.length > 0 && showTags ? (
                    <div className="flex flex-col px-4 py-2">
                      {tags?.map((tag) => {
                        const isTagSelected = selectedTags.findIndex(
                          (selectedTag) => selectedTag.id === tag.id
                        );

                        return (
                          <div
                            className="my-1 mr-2 flex items-center"
                            key={tag.id}
                          >
                            <input
                              type="checkbox"
                              defaultChecked={isTagSelected !== -1}
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
                      <button onClick={() => setShowTags(!showTags)}>
                        <div className="mx-2 grid h-8 w-8 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700">
                          <TagIcon showTags={showTags} />
                        </div>
                      </button>
                    </div>
                    <button
                      className="mr-4 rounded-md px-6 py-2 hover:bg-slate-100 disabled:bg-neutral-500 hover:dark:bg-neutral-700"
                      disabled={isProcessing}
                      onClick={() => {
                        if (title && note && editKeep?.id) {
                          updateKeep({
                            id: editKeep?.id,
                            title,
                            note,
                            tags: selectedTags.map((tag) => {
                              return {
                                id: tag.id,
                              };
                            }),
                            todos: todos,
                          });
                        }
                      }}
                    >
                      <span className="text-sm font-medium dark:text-white">
                        {isProcessing ? <Refresh isRefreshing /> : "Save"}
                      </span>
                    </button>
                  </div>
                  {/* action buttons footer end */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
