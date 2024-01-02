"use client"

import ConnectToMetamaskButton from "@/app/components/ConnectToMetamaskButton"
import PollList from "./components/PollList"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { ethers } from "ethers"
import { AccountType, AuthContext } from "@/context/AuthContext"

export default function Home() {
    const router = useRouter()

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
                setAccountData({
                    address,
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

    return (
        <AuthContext.Provider value={accountData}>
            <main className="min-h-screen p-20">
                <div className="flex w-full justify-between items-center overflow-auto">
                    <h1 className="text-white text-3xl font-bold">
                        Decentralized Polls
                    </h1>
                    <ConnectToMetamaskButton
                        onClick={() => {
                            _connectToMetaMask()
                        }}
                    />
                </div>
                <div>
                    <PollList />
                </div>
                <div className="p-20 fixed bottom-0 right-0 ">
                    <button
                        onClick={() => {
                            router.push("/create-poll")
                        }}
                        className="w-24 h-24 p-2 rounded-full 
                       bg-blue-700 hover:bg-blue-800 text-white font-bold flex justify-center items-center"
                    >
                        New poll
                    </button>
                </div>
            </main>
        </AuthContext.Provider>
    )
}
