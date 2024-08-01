import { useNavigate } from "react-router"

const NotFoundPage = () => {
    const navigate = useNavigate()
    return(
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-2">
            <h1 className="text-4xl text-center text-sky-400">Did you get lost? =C ?</h1>
            <h2 
            onClick={() => navigate('/login')}
            className="text-2xl text-center text-sky-400 hover:text-sky-600 cursor-pointer">
                Don't worry :D return here!
            </h2>
        </div>
    )
}
export {NotFoundPage}