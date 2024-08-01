import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { Account} from "../../Interfaces/IAccount"
import { LoginHook } from "../../Hooks/LoginHook"
import { AuthContext } from "../../Context/AuthContext"

const SignInPage = () => {
    const [credentials, setCredentials] = useState<Account>({email: "", name: "", password:""})
    const {signIn} = LoginHook()
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const submitLogin = async() => {
        const response = await signIn(credentials)
        if(response){
            const stringifyAccess = JSON.stringify(response)
            localStorage.setItem('bearer', stringifyAccess)
            authContext?.setIsAuth(true)
            authContext?.setUser(response.user)
            navigate('/home')
        }
    }
    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <section className="w-screen flex justify-center items-center flex-col gap-5">
                <div>
                    <h1 className="text-sky-300 w-full text-6xl text-center font-extrabold">Todo List</h1>
                </div>
                <form onSubmit={submitLogin} className="bg-sky-200 w-3/4 min-h-20 rounded-2xl px-4 py-8 flex flex-col gap-5 max-w-fit">
                    <div>
                        <h1 className="text-sky-900 w-full text-4xl text-center font-extrabold">Sign in</h1>
                    </div>
                    <div className="flex justify-center gap-4">
                        <span className="text-sky-900 font-bold text-xl">Name: </span>
                        <input type="text" className="rounded-xl p-2" 
                        value={credentials.name}
                        onChange={(e) => setCredentials({...credentials, name:e.target.value})}
                        />
                    </div>
                    <div className="flex justify-center gap-4">
                        <span className="text-sky-900 font-bold text-xl">E-mail: </span>
                        <input type="text" className="rounded-xl p-2" 
                        value={credentials.email}
                        onChange={(e) => setCredentials({...credentials, email:e.target.value})}
                        />
                    </div>
                    <div className="flex justify-center gap-4">
                        <span className="text-sky-900 font-bold text-xl">Password: </span>
                        <input type="password" className="rounded-xl p-2 w-1/2" 
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password:e.target.value})}
                        />
                    </div>

                    <div className="w-full flex justify-center gap-10">
                        <button className="bg-white w-1/2 h-10 text-sky-300 font-extrabold rounded-xl hover:scale-110" type="submit">
                            Sign in
                        </button>
                    </div>
                    <div onClick={() => navigate('/login')} className="text-sky-900 hover:text-white cursor-pointer text-sm">
                        <p className=" text-center ">Do you have an account? Log in here!</p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export {SignInPage}