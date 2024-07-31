import { EditTodo, PostTodo, Todo } from "../Interfaces/ITodos"

const FetchTodos = () => {
    const url = "http://localhost:8000/api/todos"
    async function getAllTodos():Promise<Todo[]> {
        try {
            const response = await fetch(`${url}`)
            const todos:Todo[] = await response.json();
            return todos
        } catch (error) {
            throw new Error()
        }
    }
    async function getOneTodo(id:string):Promise<Todo> {
        try {
            const response = await fetch(`${url}/${id}`)
            const todos:Todo = await response.json();
            return todos
        } catch (error) {
            throw new Error()
        }
    }
    async function finishTodo(id:number, done:boolean){
        const data = JSON.stringify({done: !done})
        try {
                await fetch(`${url}/${id}`,{
                method: 'PATCH',
                body: data,
                headers:{
                    "Content-type": "aplication/json"
                }
            })
        } catch (error) {
            throw new Error()
        }
    }
    async function createTodo(data: PostTodo){
        const dataStringify = JSON.stringify(data)
        try {
            await fetch(`${url}`,{
                method: 'POST',
                body: dataStringify,
                headers:{
                    "Content-type": "aplication/json"
                }
            })
        } catch (error) {
            throw new Error()
        }
    }
    async function editTodo(id:string, data: EditTodo){
        const todoEdited = JSON.stringify(data)
        try {
                await fetch(`${url}/${id}`,{
                method: 'PATCH',
                body: todoEdited,
                headers:{
                    "Content-type": "aplication/json"
                }
            })
        } catch (error) {
            throw new Error()
        }
    }
    async function deleteTodo(id:string){
        try {
                await fetch(`${url}/${id}`,{
                method: 'DELETE'
            })
        } catch (error) {
            throw new Error()
        }
    }
    return {getAllTodos, finishTodo, createTodo, editTodo, getOneTodo, deleteTodo}
}

export{FetchTodos}