import { Outlet, useNavigate } from "react-router";
import { TodoBox } from "./Components/TodoBox"
import { IoMdAdd } from "react-icons/io";
import { FetchTodos } from "../../Hooks/FetchTodos";
import { useContext, useEffect, useState } from "react";
import { Todo } from "../../Interfaces/ITodos";
import { AiOutlineOrderedList } from "react-icons/ai";
import { AuthContext } from "../../Context/AuthContext";
import { BearerToken } from "../../Hooks/BearerToken";
import { LoginHook } from "../../Hooks/LoginHook";
const HomePage = () => {
    const { getAllTodos } = FetchTodos()
    const {logOut} = LoginHook()
    const [todos, setTodos] = useState<Todo[] | []>([])
    const [search, setSearch] = useState<string>("")
    const token = BearerToken()
    const [filteredTodos, setFilteredTodos] = useState<Todo[] | []>([])
    const [refreshTodos, setRefreshTodos] = useState<boolean>(true)
    const [ordered, setOrdered] = useState<boolean>(false)
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    useEffect(() => {
        const getTodos = async() => {
            const data = await getAllTodos(token)
            setTodos(data)
        }
        getTodos()
    },[refreshTodos])
    useEffect(() => {
       const filterTodos = todos.filter(p => p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
       if(ordered){
            const orderedTodos = filterTodos.sort((a,b) => a.order - b.order)
            setFilteredTodos(orderedTodos)
       }else{
            setFilteredTodos(filterTodos)
       }
    },[search,ordered,todos])
    const logout = async() => {
        const response = await logOut(token)
        if(response){
            authContext?.setIsAuth(false)
            authContext?.setUser(null)
            localStorage.removeItem('bearer')
            navigate('/login')
        }
    }
    return(
        <div className="w-screen h-screen">
            <nav className="w-screen h-16 bg-sky-300 flex justify-end items-center pr-3">
                <button onClick={() => logout()} className="bg-white w-1/4 h-10 text-sky-300 font-extrabold rounded-xl hover:bg-sky-400 hover:text-white">Log Out</button>
            </nav>
            <section className="min-h-36 flex justify-center items-center h-20">
                <h1 className="text-sky-300 w-full text-6xl text-center font-extrabold">{`Your ToDo's \n ${authContext?.user?.name}`}</h1>
            </section>
            <section className="w-full h-3/4 p-4 flex flex-col gap-4">
                <div className="flex justify-between gap-2">
                    <input placeholder="Search" className="w-full pl-2 rounded-xl text-2xl"
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className=" text-sky-600 hover:text-sky-400" onClick={() => setOrdered(!ordered)}>
                        <AiOutlineOrderedList className="w-12 h-12"/>
                    </button>
                    <button className=" text-sky-600 hover:text-sky-400" onClick={() => navigate('add')}>
                        <IoMdAdd className="w-12 h-12"/>
                    </button>
                </div>
                <div className="w-full overflow-y-auto flex flex-col gap-4">
                    {filteredTodos.map((todo, i) => (
                        <TodoBox key={i} setRefreshTodos={setRefreshTodos} refreshTodos={refreshTodos} title={todo.title} order={todo.order} done={todo.done} id={todo.id}/>
                    ))}
                </div>
            </section>
            <Outlet/>
        </div>
    )
}

export {HomePage}