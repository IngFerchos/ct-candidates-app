import { EditTodo, PostTodo, Todo } from "../Interfaces/ITodos"

const FetchTodos = () => {
    const url = "http://localhost:8000/api/todos"
    async function getAllTodos(token: string):Promise<Todo[]> {
        try {
            const response = await fetch(`${url}`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            const todos:Todo[] = await response.json();
            return todos
        } catch (error) {
            throw new Error()
        }
    }
    async function getOneTodo(id:string, token:string):Promise<Todo> {
        try {
            const response = await fetch(`${url}/${id}`,{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            const todos:Todo = await response.json();
            return todos
        } catch (error) {
            throw new Error()
        }
    }
    async function finishTodo(id:number, done:boolean, token:string){
        const data = JSON.stringify({done: !done})
        try {
                await fetch(`${url}/${id}`,{
                method: 'PATCH',
                body: data,
                headers:{
                    "Content-type": "aplication/json",
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (error) {
            throw new Error()
        }
    }
    async function createTodo(data: PostTodo, token:string){
        const dataStringify = JSON.stringify(data)
        try {
            await fetch(`${url}`,{
                method: 'POST',
                body: dataStringify,
                headers:{
                    "Content-type": "aplication/json",
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (error) {
            throw new Error()
        }
    }
    async function editTodo(id:string, data: EditTodo, token:string){
        const todoEdited = JSON.stringify(data)
        try {
                await fetch(`${url}/${id}`,{
                method: 'PATCH',
                body: todoEdited,
                headers:{
                    "Content-type": "aplication/json",
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (error) {
            throw new Error()
        }
    }
    async function deleteTodo(id:string, token:string){
        try {
                await fetch(`${url}/${id}`,{
                method: 'DELETE',
                headers:{
                    "Content-type": "aplication/json",
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (error) {
            throw new Error()
        }
    }
    return {getAllTodos, finishTodo, createTodo, editTodo, getOneTodo, deleteTodo}
}

export{FetchTodos}