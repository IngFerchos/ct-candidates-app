import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";
import { FetchTodos } from "../../../Hooks/FetchTodos";
import { BearerToken } from "../../../Hooks/BearerToken";

interface ComponentProps {
    id: number,
    title: string,
    order: number,
    done: boolean,
    setRefreshTodos: React.Dispatch<React.SetStateAction<boolean>>,
    refreshTodos: boolean
}

const TodoBox: React.FC<ComponentProps> = ({id, title, order, done, setRefreshTodos, refreshTodos}) => {
    const navigate = useNavigate()
    const token = BearerToken()
    const {finishTodo} = FetchTodos()
    const checkingTodo = async() => {
        await finishTodo(id, done, token)
        setRefreshTodos(!refreshTodos)
    }
    return(
        <div
        className="bg-sky-200 rounded-2xl min-w-full min-h-32 p-4 flex items-center justify-between"
        >
            <button 
            onClick={() => navigate(`edit/${id}`)}
            className="w-full"
            >
                <h1 className="text-2xl text-start">{`#${order} ${title}`}</h1>
            </button>
            <button 
            className="h-full" 
            onClick={() => checkingTodo()}
            >
                {(done)? <FaCheck className="w-10 h-full text-emerald-400"/>: <FaCheck className="w-10 h-full text-white"/>}
            </button>
        </div>
    )
}

export{TodoBox}