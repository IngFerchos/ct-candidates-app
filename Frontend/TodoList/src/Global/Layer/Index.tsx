import { Outlet } from "react-router"
import { Background } from "./Background"

const Layer = () => {
    return(
        <>
            <Background>
               <Outlet/> 
            </Background>
            
        </>

    )
}

export {Layer}