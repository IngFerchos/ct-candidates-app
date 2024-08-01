import { IoIosRefresh } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { FetchTodos } from "../../../Hooks/FetchTodos";
import { useEffect, useState } from "react";
import { EditTodo} from "../../../Interfaces/ITodos";
import { parseNumber } from "../../../utils/parseNumber";
import { BearerToken } from "../../../Hooks/BearerToken";

const EditTodoForm = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const token = BearerToken()
    const [todo, setTodo] = useState<EditTodo | null>(null)
    const {editTodo, getOneTodo, deleteTodo} = FetchTodos()
    useEffect(() => {
        if(id){
            const getTodo = async() => {
                const response = await getOneTodo(id, token)
                setTodo(response)
            }
            getTodo()
        }
        
    },[])
    const submitEditedTodo = async() => {
        if(id && todo){
            await editTodo(id, todo, token)
            navigate("/home")
            window.location.reload()
        }
    }
    const onDeleteTodo = async() => {
        if(id && todo){
            await deleteTodo(id, token)
            navigate("/home")
            window.location.reload()
        }
    }
    return(
        <>
            <div onClick={() => navigate(-1)} className="bg-black opacity-50 absolute w-screen top-0 h-screen"/>
            <section className="w-screen flex justify-center items-center absolute top-1/3">
                <form onSubmit={submitEditedTodo} className="bg-sky-200 w-3/4 min-h-20 rounded-2xl p-4 flex flex-col gap-10 max-w-fit">
                    <h1 className="text-center text-3xl text-sky-900 font-extrabold">Edit Todo</h1>
                    <div className="flex justify-center gap-4">
                        <span className="text-sky-900 font-bold text-2xl">Title: </span>
                        <input type="text" className="rounded-xl p-2 text-center" 
                        value={todo?.title || ""}
                        onChange={(e) => setTodo({...todo, title: e.target.value})}
                        />
                    </div>
                    <div className="flex justify-center gap-4">
                        <span className="text-sky-900 font-bold text-2xl">Order: </span>
                        <input type="number" className="rounded-xl p-2 min-w-1/2 text-center" 
                        value={todo?.order || ""}
                        onChange={(e) => setTodo({...todo, order: parseNumber(e.target.value)})}
                        />
                    </div>

                    <div className="w-full flex justify-center gap-10">
                        <button type="submit">
                            <IoIosRefresh className="w-10 h-10 text-white hover:text-emerald-700"/>
                        </button>
                        <button onClick={() => onDeleteTodo()}>
                            <MdDelete className="w-10 h-10 text-white hover:text-red-500"/>
                        </button>
                    </div>
                </form>
            </section>
            
        </>
    )
}

export {EditTodoForm}