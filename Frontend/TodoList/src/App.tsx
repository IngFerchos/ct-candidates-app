import { Route, Routes } from 'react-router'
import './App.css'
import { HashRouter } from 'react-router-dom'
import { Layer } from './Global/Layer/Index';
import { HomePage } from './Pages/Home/Index';
import { EditTodoForm } from './Pages/Home/Components/EditTodo';
import { AddTodoForm } from './Pages/Home/Components/AddTodo';
import { LoginPage } from './Pages/Login/Index';
import { SignInPage } from './Pages/SignIn/Index';
import { AuthContextProvider, AuthRoutes } from './Context/AuthContext';
import { NotFoundPage } from './Pages/NotFound/Index';


function App() {
  return (
    <>
      <HashRouter basename='/'>
        <AuthContextProvider>
          <Routes>
            <Route path={"/"} element={<Layer/>}>
              <Route path='login' element={<LoginPage/>}/>
              <Route path='signin' element={<SignInPage/>}/>
              <Route path='/home' element={
                <AuthRoutes>
                  <HomePage/>
                </AuthRoutes>
              }>
                <Route path='add' element={<AddTodoForm/>}/>
                <Route path='edit/:id' element={<EditTodoForm/>}/>
              </Route>
              <Route path='*' element={<NotFoundPage/>}/>
            </Route>
          </Routes>
        </AuthContextProvider>
      </HashRouter>
    </>
  )
}

export default App
