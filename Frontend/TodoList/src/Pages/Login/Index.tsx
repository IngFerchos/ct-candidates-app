import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { LoginHook } from "../../Hooks/LoginHook"
import { Credential } from "../../Interfaces/IAccount"
import { AuthContext } from "../../Context/AuthContext"

const LoginPage = () => {
    const [credentials, setCredentials] = useState<Credential>({email: "", password:""})
    const {logIn} = LoginHook()
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const submitLogin = async() => {
        const response = await logIn(credentials)
        if(response.token){
            const stringifyAccess = JSON.stringify(response)
            localStorage.setItem('bearer', stringifyAccess)
            authContext?.setIsAuth(true)
            authContext?.setUser(response.user)
            navigate('/home')
        }
    }
    useEffect(() => {
        if(authContext?.isAuth){
            navigate('/home')
        }
    },[])
    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <section className="w-screen flex justify-center items-center flex-col gap-5">
                <div>
                    <h1 className="text-sky-300 w-full text-6xl text-center font-extrabold">Todo List</h1>
                </div>
                <form onSubmit={submitLogin} className="bg-sky-200 w-3/4 min-h-20 rounded-2xl px-4 py-8 flex flex-col gap-5 max-w-fit">
                    <div>
                        <h1 className="text-sky-900 w-full text-4xl text-center font-extrabold">Log in</h1>
                    </div>
                    <div className="flex justify-center gap-4">
                        <span className="text-sky-900 font-bold text-xl">E-mail: </span>
                        <input type="text" className="rounded-xl p-2" 
                        value={credentials.email}
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                        />
                    </div>
                    <div className="flex justify-center gap-4">
                        <span className="text-sky-900 font-bold text-xl">Password: </span>
                        <input type="password" className="rounded-xl p-2 w-1/2" 
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                        />
                    </div>
                    <div className="w-full flex justify-center gap-10">
                        <button className="bg-white w-1/2 h-10 text-sky-300 font-extrabold rounded-xl hover:scale-110" type="submit">
                            Log in
                        </button>
                    </div>
                    <div onClick={() => navigate('/signin')} className="text-sky-900 hover:text-white cursor-pointer">
                        <p className=" text-center ">Sign in here!</p>
                    </div>
                </form>
            </section>
        </div>
    )
} 

export {LoginPage}