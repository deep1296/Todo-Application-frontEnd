import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route , Link, Navigate} from 'react-router-dom'
import './App.css'
import { Home } from './Components/Home'
import { Login } from './Components/Login'
import { Navbar } from './Components/Navbar'
import { Signup } from './Components/Signup'
import { TodosCreact } from './Components/TodosCreact'
import { TodosEdit } from './Components/TodosEdit'

function App() {
  
  // if isAuthenticated is true, then show the TodosCreact component
  const PrivateRoute = ({isAuthenticated,children})=>{
    return isAuthenticated ? children : <Navigate to="/login"/>
  }

   
  
  //take isAthenticated from the redux store
  const {isAuthenticated} = useSelector(state => state.login)

  // const isAuthenticated = true
  
  return (
    <div className="App">
      <div>
        {/* <Link to="/">Home</Link> <span> </span>
        <Link to="/todos-create">Todos</Link> */}
      
        <Navbar/>
      </div>
     <Routes>
        <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}><Home/></PrivateRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/todos-create" element={<PrivateRoute isAuthenticated={isAuthenticated}><TodosCreact/></PrivateRoute>} />
        <Route path='/todos/:id/edit' element={<PrivateRoute isAuthenticated={isAuthenticated}><TodosEdit/></PrivateRoute>} />
     </Routes>
    </div>
  )
}

export default App