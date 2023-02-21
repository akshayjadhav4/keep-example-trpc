import React, { KeyboardEvent, useEffect, useReducer, useRef } from "react";
import { uuid } from "uuidv4";
import { CheckIcon } from "../Icons/CheckIcon";
import { Close } from "../Icons/Close";
import { Plus } from "../Icons/Plus";
import { Refresh } from "../Icons/Refresh";
import { Tag as TagIcon } from "../Icons/Tag";
import { Action, Tag, TodoInput } from "../types";

type Props = {
  allTags: Tag[];
  createKeep: (keep: Keep) => void;
  isProcessing: boolean;
  reset: boolean;
};
interface Keep {
  title: string;
  note: string;
  todos?: {
    id: string;
    todo: string;
    isCompleted: boolean;
  }[];
  tags?: { id: number }[];
}

interface State {
  isFormExpanded: boolean;
  title: string;
  note: string;
  showCheckboxes: boolean;
  todos: TodoInput[];
  showTags: boolean;
  tags: Tag[];
  selectedTags: Tag[];
  todoValue: string;
}

const initialState: State = {
  isFormExpanded: false,
  title: "",
  note: "",
  showCheckboxes: false,
  todos: [],
  showTags: false,
  tags: [],
  selectedTags: [],
  todoValue: "",
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_IS_FORM_EXPANDED":
      return { ...state, isFormExpanded: action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_NOTE":
      return { ...state, note: action.payload };
    case "SET_SHOW_CHECKBOXES":
      return { ...state, showCheckboxes: action.payload };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "SET_TAGS":
      return { ...state, tags: action.payload };
    case "SET_TODO_VALUE":
      return { ...state, todoValue: action.payload };
    case "UPDATE_TODO":
      const id = state.todos.findIndex((item) => item.id === action.payload.id);
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, id),
          action.payload,
          ...state.todos.slice(id + 1),
        ],
      };
    case "REMOVE_TODO":
      const updatedTodos = state.todos.filter(
        (currentTodo) => currentTodo.id !== action.payload
      );
      return { ...state, todos: updatedTodos };
    case "ADD_SELECTED_TAG":
      return {
        ...state,
        selectedTags: [...state.selectedTags, action.payload],
      };
    case "REMOVE_SELECTED_TAG":
      const updatedTags = state.tags.filter(
        (currentTag) => currentTag.id !== action.payload
      );
      return { ...state, selectedTags: updatedTags };
    case "SET_SHOW_TAGS":
      return { ...state, showTags: action.payload };
    case "RESET":
      return { ...initialState };
    default:
      return initialState;
  }
}
export const Form = ({ allTags, createKeep, isProcessing, reset }: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isFormExpanded,
    title,
    note,
    showCheckboxes,
    todos,
    showTags,
    tags,
    selectedTags,
    todoValue,
  } = state;

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event?.key === "Enter") {
      dispatch({
        type: "ADD_TODO",
        payload: {
          id: `${uuid()}`,
          isCompleted: false,
          todo: todoValue,
        },
      });
      dispatch({ type: "SET_TODO_VALUE", payload: "" });
    }
  }

  function resetForm() {
    dispatch({ type: "RESET" });
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
        resetForm();
      }
    }
    // attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // remove the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formContainerRef, isFormExpanded]);

  useEffect(() => {
    resetForm();
  }, [reset]);

  useEffect(() => {
    dispatch({ type: "SET_TAGS", payload: allTags });
  }, [allTags, isFormExpanded]);

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
          onFocus={() =>
            dispatch({ type: "SET_IS_FORM_EXPANDED", payload: true })
          }
          value={title}
          onChange={(event) =>
            dispatch({ type: "SET_TITLE", payload: event.target.value })
          }
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
                dispatch({ type: "SET_NOTE", payload: event?.target?.value })
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
                            const updatedTodo: TodoInput = {
                              ...todos[id],
                              isCompleted: !todo?.isCompleted,
                            };
                            dispatch({
                              type: "UPDATE_TODO",
                              payload: updatedTodo,
                            });
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
                            const updatedTodo: TodoInput = {
                              ...todos[id],
                              todo: (event.target as HTMLInputElement).value,
                            };
                            dispatch({
                              type: "UPDATE_TODO",
                              payload: updatedTodo,
                            });
                          }
                        }}
                      />
                      <div className="ml-4">
                        <button
                          className="mx-2 grid h-8 w-8 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700"
                          onClick={() => {
                            dispatch({ type: "REMOVE_TODO", payload: todo.id });
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
                    onChange={(event) =>
                      dispatch({
                        type: "SET_TODO_VALUE",
                        payload: event.target.value,
                      })
                    }
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
                          dispatch({ type: "ADD_SELECTED_TAG", payload: tag });
                          return;
                        }
                        dispatch({
                          type: "REMOVE_SELECTED_TAG",
                          payload: tag.id,
                        });
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
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_SHOW_CHECKBOXES",
                    payload: !showCheckboxes,
                  })
                }
              >
                <div className="mx-2 grid h-8 w-8 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700">
                  <CheckIcon showCheckboxes={showCheckboxes} />
                </div>
              </button>
              <button
                onClick={() =>
                  dispatch({ type: "SET_SHOW_TAGS", payload: !showTags })
                }
              >
                <div className="mx-2 grid h-8 w-8 place-items-center  hover:rounded-full hover:bg-slate-100 hover:dark:bg-neutral-700">
                  <TagIcon showTags={showTags} />
                </div>
              </button>
            </div>
            <button
              className="mr-4 rounded-md px-6 py-2 hover:bg-slate-100 disabled:bg-neutral-500 hover:dark:bg-neutral-700"
              disabled={isProcessing}
              onClick={() => {
                if (title && note) {
                  createKeep({
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
        </div>
      ) : null}
    </div>
  );
};
