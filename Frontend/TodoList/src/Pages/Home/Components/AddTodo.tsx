import { VscDiffAdded } from "react-icons/vsc";
import { useNavigate } from "react-router";
import { FetchTodos } from "../../../Hooks/FetchTodos";
import { useState } from "react";
import { parseNumber } from "../../../utils/parseNumber";
import { BearerToken } from "../../../Hooks/BearerToken";
const AddTodoForm = () => {
    const navigate = useNavigate()
    const {createTodo} = FetchTodos()
    const token = BearerToken()
    const [newTodo, setNewTodo] = useState({title: "", order: 1})
    const submitTodo = async() => {
        await createTodo(newTodo, token)
        navigate("/home")
        window.location.reload()
    }
    return(
        <>
            <div onClick={() => navigate(-1)} className="bg-black opacity-50 absolute w-screen top-0 h-screen"/>
            <section className="w-screen flex justify-center items-center absolute top-1/3">
                <form onSubmit={submitTodo} className="bg-sky-200 w-3/4 min-h-20 rounded-2xl p-4 flex flex-col gap-10 max-w-fit">
                    <h1 className="text-center text-3xl text-sky-900 font-extrabold">Create Todo</h1>
                    <div className="flex justify-center gap-4">
                        <span className="text-sky-900 font-bold text-2xl">Title: </span>
                        <input type="text" className="rounded-xl p-2 text-center" 
                        onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                        />
                    </div>
                    <div className="flex justify-center gap-4">
                        <span className="text-sky-900 font-bold text-2xl">Order: </span>
                        <input type="number" className="rounded-xl p-2 min-w-1/2 text-center"
                        onChange={(e) => setNewTodo({...newTodo, order: parseNumber(e.target.value)})}
                        />
                    </div>
                    <div className="w-full flex justify-center">
                        <button type="submit">
                            <VscDiffAdded className="w-14 h-14 text-white hover:text-emerald-700"/>
                        </button>
                    </div>
                </form>
            </section>
            
        </>
    )
}

export {AddTodoForm}