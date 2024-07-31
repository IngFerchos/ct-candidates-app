import { Route, Routes } from 'react-router'
import './App.css'
import { HashRouter } from 'react-router-dom'
import { Layer } from './Global/Layer/Index';
import { HomePage } from './Pages/Home/Index';
import { EditTodoForm } from './Pages/Home/Components/EditTodo';
import { AddTodoForm } from './Pages/Home/Components/AddTodo';


function App() {
  return (
    <>
      <HashRouter basename='/'>
        <Routes>
          <Route path={"/"} element={<Layer/>}>
            <Route path='home' element={<HomePage/>}>
              <Route path='add' element={<AddTodoForm/>}/>
              <Route path='edit/:id' element={<EditTodoForm/>}/>
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
