"use client"

import { createContext, useContext } from "react"
import { UserType } from "../lib/types/user.type"

const UserContext = createContext<UserType | null>(null)

export function UserProvider({user,children}:{user:UserType, children:React.ReactNode}) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export  function useUser(){
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("err context user")
    }
    return context
}
