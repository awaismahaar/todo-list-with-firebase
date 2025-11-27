import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './context/AuthContextProvider'
import AppRoutes from './routes/AppRoutes'

function App() {
    return (
        <AuthContextProvider>
            <AppRoutes />
            <Toaster />
        </AuthContextProvider>
    )
}

export default App
