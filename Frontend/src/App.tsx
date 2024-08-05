import { Route, Routes } from 'react-router-dom'
import NotFound from './Components/NotFound/NotFoud'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Todos from './Components/Todos/Todos'

function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route path='/' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Todos' element={<Todos />} />
      </Route>
    /*Not found*/
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
