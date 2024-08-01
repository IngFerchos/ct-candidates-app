export interface Todo {
    id: number;
    title: string,
    order: number,
    done: boolean
}

export interface PostTodo extends Pick<Todo, 'title' | 'order'> {}

export interface EditTodo extends Partial<PostTodo>{}