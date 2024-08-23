
import { Toaster } from 'react-hot-toast'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import { AuthContext, useAuthContext } from './context/AuthContext'
function App() {
  const {authUser}=useAuthContext();
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Router>
        <Routes>
          <Route path='/' element={authUser?<Home/>:<Navigate to="/login"/>}/>
          <Route path='/login' element={authUser?<Navigate to="/"/>:<Login/>}/>
          <Route path='/signup' element={authUser?<Navigate to="/"/>:<SignUp/>}/>
        </Routes>
        <Toaster/>
      </Router>
    </div>
  )
}

export default App
