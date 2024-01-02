import { createContext } from "react"

export interface AccountType {
    address?: string
    balance?: string
    chainId?: string
    network?: string
}

export const AuthContext = createContext<AccountType | null>(null)
