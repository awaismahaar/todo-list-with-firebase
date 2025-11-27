import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB_y4b3jcdoQB4qwk_uVgs_WLI30Jcb2KY',
    authDomain: 'todo-list-83364.firebaseapp.com',
    projectId: 'todo-list-83364',
    storageBucket: 'todo-list-83364.firebasestorage.app',
    messagingSenderId: '552493084954',
    appId: '1:552493084954:web:0e19b055ad0a3447ec3ca3',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
