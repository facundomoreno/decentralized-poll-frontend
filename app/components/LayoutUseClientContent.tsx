"use client"
import ConnectToMetamaskButton from "./ConnectToMetamaskButton"
import { ReactNode, useCallback, useEffect, useState } from "react"
import { AccountType, AuthContext } from "@/context/AuthContext"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ethers } from "ethers"
import { useRouter } from "next/navigation"
import Image from "next/image"

const LayoutUseClientContent = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const [accountData, setAccountData] = useState<AccountType | null>(null)

    const _connectToMetaMask = useCallback(async () => {
        if (typeof window !== undefined) {
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
                    alert(`Error connecting to wallet: ${error?.message ?? error}`)
                }
            } else {
                alert("Wallet not installed")
            }
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
    }, [])

    return (
        <AuthContext.Provider value={accountData}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {!accountData && (
                    <div className="w-full fixed bg-gray-800 flex items-center justify-center p-2">
                        <p className="pr-2 text-white">Connect your wallet to the Sepolia testnet</p>
                        <Image src={"/sepolia_logo.png"} width={20} height={20} alt="sepolia_logo" />
                    </div>
                )}
                <div className="flex w-full justify-between items-center overflow-auto pt-20 flex-col px-4 sm:px-8 sm:flex-col-8 md:px-12 md:flex-row lg:px-20 lg:flex-row">
                    <div
                        onClick={() => router.push("/")}
                        className="cursor-pointer whitespace-nowrap w-fit flex justify-center items-center bg-gradient-to-r from-orange-500 to-blue-600 px-6 py-2 rounded"
                    >
                        <h1 className="text-white text-xl font-bold italic">Decentralized Polls</h1>
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
    )
}

export default LayoutUseClientContent
