import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export interface User {
    uid: string
    fullName: string
    email: string
    photoURL: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthContextType {
    user: User | null
    setUser: (user: User | null) => void
    loading: boolean
}
export default function AuthContextProvider({
    children,
}: {
    children: ReactNode
}) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const unsub = auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log('user', user)
                const snap = await getDoc(doc(db, 'users', user.uid))
                if (snap.exists()) {
                    const data = snap.data() as User
                    console.log('data', data)
                    setUser({ ...data, uid: user.uid })
                    setLoading(false)
                }
            } else {
                setUser(null)
                setLoading(false)
            }
        })
        return () => unsub()
    }, [])
    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
