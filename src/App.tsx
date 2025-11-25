import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Todo from './pages/Todo'
import './App.css'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import AuthRoutes from './components/AuthRoutes'

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<ProtectedRoute>
         <Home />
      </ProtectedRoute>} />
      <Route path="/auth/login" element={<AuthRoutes><Login /></AuthRoutes>} />
      <Route path="/auth/signup" element={<AuthRoutes><Signup /></AuthRoutes>} />
      <Route path="/todo" element={<ProtectedRoute><Todo /></ProtectedRoute> } />
      </Routes>
    </>
  )
}

export default App
