"use client"
import { Inter } from "next/font/google"
import "./globals.css"
import ConnectToMetamaskButton from "./components/ConnectToMetamaskButton"
import { useCallback, useEffect, useState } from "react"
import { AccountType, AuthContext } from "@/context/AuthContext"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ethers } from "ethers"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [accountData, setAccountData] = useState<AccountType | null>(null)

    const _connectToMetaMask = useCallback(async () => {
        const ethereum = window.ethereum
        if (typeof ethereum !== "undefined") {
            try {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts"
                })
                const address = accounts[0]
                const provider = new ethers.BrowserProvider(ethereum)
                const balance = await provider.getBalance(address)
                const network = await provider.getNetwork()
                const signer = await provider.getSigner()

                setAccountData({
                    address,
                    signer,
                    balance: ethers.formatEther(balance),
                    chainId: network.chainId.toString(),
                    network: network.name
                })
            } catch (error: Error | any) {
                alert(`Error connecting to MetaMask: ${error?.message ?? error}`)
            }
        } else {
            alert("MetaMask not installed")
        }
    }, [])

    useEffect(() => {
        if (typeof window.ethereum === "undefined") return

        window.ethereum.on("accountsChanged", (accounts: string[]) => {
            setAccountData({ ...accountData!, address: accounts[0] })
            window.location.reload()
        })

        return () => {
            window.ethereum.removeAllListeners()
        }
    }, [accountData])

    useEffect(() => {
        _connectToMetaMask()
    }, [window.ethereum])

    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <AuthContext.Provider value={accountData}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="flex w-full justify-between items-center overflow-auto pt-20 px-20">
                            <div className="cursor-pointer flex justify-center items-center bg-gradient-to-r from-orange-500 to-blue-600 px-6 py-2 rounded">
                                <h1 className="text-white text-xl font-bold italic ">Decentralized Polls</h1>
                            </div>
                            <ConnectToMetamaskButton
                                onClick={() => {
                                    _connectToMetaMask()
                                }}
                            />
                        </div>
                        {children}
                    </LocalizationProvider>
                </AuthContext.Provider>
            </body>
        </html>
    )
}
