import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'

const signUpEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export default signUpEmail
