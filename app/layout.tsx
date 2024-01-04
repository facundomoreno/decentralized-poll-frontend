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

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    const [accountData, setAccountData] =
        useState<AccountType | null>(null)

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
                alert(
                    `Error connecting to MetaMask: ${
                        error?.message ?? error
                    }`
                )
            }
        } else {
            alert("MetaMask not installed")
        }
    }, [])

    useEffect(() => {
        _connectToMetaMask()
    }, [window.ethereum])

    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <AuthContext.Provider value={accountData}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div className="flex w-full justify-between items-center overflow-auto pt-20 px-20">
                            <h1 className="text-white text-3xl font-bold">
                                Decentralized Polls
                            </h1>
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
