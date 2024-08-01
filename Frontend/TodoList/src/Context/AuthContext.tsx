import { createContext, useState, useEffect, useContext, ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { Account } from "../Interfaces/IAccount";

interface AuthContextType {
    isAuth: boolean | null;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
    user: Account | null,
    setUser: React.Dispatch<React.SetStateAction<Account | null>>;
  }
const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface PropsComponent {
    children: ReactNode
}
const AuthContextProvider: React.FC<PropsComponent> = ({children}) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null)
    const [user, setUser] = useState<Account | null>(null)
    useEffect(() => {
        const storage = localStorage.getItem('bearer')
        const checkTokenLocalStorage = () => {
            if (storage === null) {
                return ''
            }else {
                const parseStorage = JSON.parse(storage)
                const {token} = parseStorage
                return token
            }
        }
        const token = checkTokenLocalStorage()
        const checkLogging = async () => {
            await fetch('http://localhost:8000/api/islogged',{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => {
                if(res.status != 200){
                    setIsAuth(false)
                }else{
                    setIsAuth(true)
                    if(storage){
                    const user = JSON.parse(storage).user
                    setUser(user) 
                }
                }

                }
            )
            .catch((err) => { setIsAuth(false); console.log(err) })
        }
        checkLogging()
    },[])
    return (
        <AuthContext.Provider value={{isAuth, setIsAuth, setUser, user}}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthRoutes:React.FC<PropsComponent> = ({children}) => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('AuthContext must be used within an AuthContextProvider');
      }
    if(context.isAuth === null){
        return(
            <>
            <h1>Cargando</h1>
            </>
        )
    }else if(context.isAuth === false){
        return (<Navigate to="/login"/>)
    }else if (context.isAuth){
        // eslint-disable-next-line react/prop-types
        return <>{children}</>
    }

}

export {AuthContext, AuthContextProvider, AuthRoutes}