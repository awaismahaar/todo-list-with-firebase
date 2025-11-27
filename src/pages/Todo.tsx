import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import TodoUI from '@/components/todo/TodoUI'
import { useAuth } from '@/context/AuthContextProvider'

export interface TodoItem {
    id: string
    text: string
    completed: boolean
    createdAt: Date
}
const Todo = () => {
    const searchInput = useRef<HTMLInputElement>(null)
    const [tasks, setTasks] = useState<TodoItem[]>([])
    const [editId, setEditId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    const { user } = useAuth()

    useEffect(() => {
        if (!user?.uid) return
        // console.log('user',user);

        const q = query(
            collection(db, 'users', user.uid, 'todos'),
            orderBy('createdAt', 'asc')
        )

        const unsub = onSnapshot(q, (snapshot) => {
            const todos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setTasks(todos as TodoItem[])
            setLoading(false)
        })

        return () => unsub()
    }, [user])

    async function addOrUpdateTodoInList() {
        const value = searchInput.current?.value.trim()
        if (!value) {
            toast.error('Please write something!')
            return
        }
        if (!user) return
        if (editId) {
            const ref = doc(db, 'users', user?.uid, 'todos', editId)
            try {
                await updateDoc(ref, { text: value })
                toast.success('Todo updated Successfully!')
                setEditId(null)
                if (searchInput.current) {
                    searchInput.current.value = ''
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            const newTodo = {
                text: value,
                completed: false,
                createdAt: new Date(),
            }
            try {
                const docRef = await addDoc(
                    collection(db, 'users', user?.uid, 'todos'),
                    newTodo
                )
                if (docRef.id) {
                    toast.success('Todo successfully created!')
                }
                if (searchInput.current) {
                    searchInput.current.value = ''
                }
            } catch (e) {
                const msgError =
                    e instanceof Error
                        ? e.message
                        : 'Unknown error occur in addTodo'
                toast.error('Todo not added!')
                console.error('Error adding document: ', msgError)
            }
        }
    }

    async function deleteTodo(id: string) {
        if (!user) return
        try {
            await deleteDoc(doc(db, 'users', user?.uid, 'todos', id))
            toast.success('Todo deleted Successfully!')
        } catch (error) {
            console.log(error)
        }
    }

    async function toggleTodo(id: string) {
        if (!user) return
        const todoItem = tasks.find((task) => task.id === id)
        const ref = doc(db, 'users', user?.uid, 'todos', id)
        try {
            await updateDoc(ref, { completed: !todoItem?.completed })
        } catch (error) {
            console.log(error)
        }
    }

    function editTodo(task: TodoItem) {
        setEditId(task.id)
        if (searchInput.current) {
            searchInput.current.value = task.text
        }
    }

    return (
        <TodoUI
            addOrUpdateTodoInList={addOrUpdateTodoInList}
            loading={loading}
            deleteTodo={deleteTodo}
            editId={editId}
            editTodo={editTodo}
            searchInput={searchInput}
            tasks={tasks}
            toggleTodo={toggleTodo}
        />
    )
}

export default Todo
