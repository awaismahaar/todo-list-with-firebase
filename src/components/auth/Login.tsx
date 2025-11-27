import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { db } from '@/lib/firebase'
import { loginEmail } from '@/utils/loginEmail'
import { loginWithGoogle } from '@/utils/loginWithGoogle'
import { IconBrandGoogleFilled } from '@tabler/icons-react'
import { doc, setDoc } from 'firebase/firestore'
import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (!loginData.email || !loginData.password) {
            toast.error('All fields required!')
            return
        }

        try {
            const userCredential = await loginEmail(
                loginData.email,
                loginData.password
            )
            const user = userCredential.user
            if (user) {
                toast.success('Login successfully')
                //  console.log(user);
                navigate('/')
                setLoginData({
                    email: '',
                    password: '',
                })
            }
        } catch (error) {
            const msgError =
                error instanceof Error
                    ? error.message
                    : 'Unknown error occured in signup!'
            toast.error(msgError)
        }
    }

    async function loginWithGoogleProvider() {
        const result = await loginWithGoogle()
        const user = result.user
        if (result) {
            await setDoc(
                doc(db, 'users', user.uid),
                {
                    fullName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    createdAt: new Date(),
                },
                { merge: true }
            )
            navigate('/')
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6">
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    value={loginData.email}
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={loginData.password}
                                    onChange={(e) =>
                                        setLoginData({
                                            ...loginData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button
                            type="submit"
                            className="w-full">
                            Login
                        </Button>
                        <div className="flex items-center justify-between w-full gap-4">
                            <div className="w-1/2 h-px bg-gray-300" />
                            <span className="text-accent-foreground">Or</span>
                            <div className="w-1/2 h-px bg-gray-300" />
                        </div>
                        <Button
                            type="button"
                            onClick={loginWithGoogleProvider}
                            variant="outline"
                            className="w-full flex items-center">
                            <IconBrandGoogleFilled /> Login with Google
                        </Button>
                        <div>
                            <p className="text-accent-foreground">
                                Don't have an account?{' '}
                                <Link
                                    className="underline text-blue-500"
                                    to="/auth/signup">
                                    signup
                                </Link>{' '}
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
