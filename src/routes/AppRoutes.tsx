import Login from '@/components/auth/Login'
import Signup from '@/components/auth/Signup'
import AuthRoutes from '@/components/AuthRoutes'
import ProtectedRoute from '@/components/ProtectedRoute'
import Home from '@/pages/Home'
import Todo from '@/pages/Todo'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/auth/login"
                element={
                    <AuthRoutes>
                        <Login />
                    </AuthRoutes>
                }
            />
            <Route
                path="/auth/signup"
                element={
                    <AuthRoutes>
                        <Signup />
                    </AuthRoutes>
                }
            />
            <Route
                path="/todo"
                element={
                    <ProtectedRoute>
                        <Todo />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes
