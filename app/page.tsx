"use client"

import ConnectToMetamaskButton from "@/app/components/ConnectToMetamaskButton"
import PollList from "./components/PollList"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()
    return (
        <main className="min-h-screen p-20">
            <div className="flex w-full justify-between items-center overflow-auto">
                <h1 className="text-white text-3xl font-bold">
                    Decentralized Polls
                </h1>
                <ConnectToMetamaskButton />
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
    )
}
