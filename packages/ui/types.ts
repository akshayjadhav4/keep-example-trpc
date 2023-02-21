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
  keepId: number | undefined;
}

export interface TodoInput {
  id: string;
  isCompleted: boolean;
  todo: string;
}

export type Action =
  | { type: "SET_IS_FORM_EXPANDED"; payload: boolean }
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_NOTE"; payload: string }
  | { type: "SET_TODO_VALUE"; payload: string }
  | { type: "SET_SHOW_CHECKBOXES"; payload: boolean }
  | { type: "ADD_TODO"; payload: TodoInput }
  | { type: "REMOVE_TODO"; payload: string }
  | { type: "SET_SHOW_TAGS"; payload: boolean }
  | { type: "SET_TAGS"; payload: Tag[] }
  | { type: "ADD_SELECTED_TAG"; payload: Tag }
  | { type: "REMOVE_SELECTED_TAG"; payload: number }
  | { type: "UPDATE_TODO"; payload: TodoInput }
  | { type: "RESET" };
