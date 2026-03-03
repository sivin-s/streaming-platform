import { useEffect, useState } from 'react';
import { AuthCreateContext } from '../../context/auth/AuthCreateContext';
import type { UserType } from '../../types/UserType'
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export const AuthUserProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
            setUser(firebaseUser)
            setIsLoading(false)
        })

        return () => unsubscribe();  // clean up listener (onAuthStateChanged)
    }, [])

    return (
        <>
            <AuthCreateContext.Provider value={{ user, setUser, isLoading, setIsLoading }} >
                {children}
            </AuthCreateContext.Provider>
        </>
    )
}