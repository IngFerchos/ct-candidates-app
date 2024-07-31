import { Outlet, useNavigate } from "react-router";
import { TodoBox } from "./Components/TodoBox"
import { IoMdAdd } from "react-icons/io";
import { FetchTodos } from "../../Hooks/FetchTodos";
import { useEffect, useState } from "react";
import { Todo } from "../../Interfaces/ITodos";
const HomePage = () => {
    const { getAllTodos } = FetchTodos()
    const [todos, setTodos] = useState<Todo[] | []>([])
    const [refreshTodos, setRefreshTodos] = useState<boolean>(true)
    const navigate = useNavigate()
    useEffect(() => {
        const getTodos = async() => {
            const data = await getAllTodos()
            setTodos(data)
        }
        getTodos()
    },[refreshTodos])
    return(
        <div className="w-screen h-screen">
            <section className="min-h-36 flex justify-center items-center h-1/5">
                <h1 className="text-sky-300 w-full text-6xl text-center font-extrabold">Your ToDo's</h1>
            </section>
            <section className="w-full h-4/5 p-4 flex flex-col gap-2">
                <div className="flex justify-end">
                    <button className=" text-sky-600 hover:text-sky-400" onClick={() => navigate('add')}>
                        <IoMdAdd className="w-16 h-16"/>
                    </button>
                </div>
                <div className="w-full overflow-y-auto flex flex-col gap-4">
                    {todos.map((todo, i) => (
                        <TodoBox key={i} setRefreshTodos={setRefreshTodos} refreshTodos={refreshTodos} title={todo.title} order={todo.order} done={todo.done} id={todo.id}/>
                    ))}
                </div>
            </section>
            <Outlet/>
        </div>
    )
}

export {HomePage}