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
