"use client"
import useGetPollById from "@/hooks/useGetPollById"
import PollList from "./components/PollList"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { PollContract } from "@/types/abis/PollContractAbi"
import { encodeForLongerUrl } from "@/utils/hash"

export default function Home() {
    const router = useRouter()
    const [inputValue, setInputValue] = useState<string>("")

    const handleSearchPollClicked = async () => {
        router.push(`/poll/${encodeForLongerUrl(inputValue)}`)
    }

    return (
        <main className="min-h-screen p-20 pt-12 px-8 sm:px-8 md:px-12 lg:px-20">
            <div className="flex flex-col lg:items-center">
                <div className="lg:w-1/2 flex flex-col">
                    <label htmlFor="idSearch" className="text-white block text-md font-bold mb-2">
                        Search by poll id
                    </label>
                    <div className="flex lg:items-center">
                        <input
                            id="idSearch"
                            type="number"
                            placeholder="e.g: 1"
                            className="h-12 shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button
                            onClick={handleSearchPollClicked}
                            className="ml-4 flex items-center justify-center h-12 px-8 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded"
                        >
                            Go
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col pb-20 pt-16">
                <p className="text-white">Latest polls uploaded</p>
                <div className="mt-4">
                    <PollList />
                </div>
            </div>
            <div className="p-4 sm:p-6 md:p-12 lg:p-20 fixed bottom-0 right-0 ">
                <button
                    onClick={() => {
                        router.push("/create-poll")
                    }}
                    className="p-2 rounded
                       bg-blue-700 hover:bg-blue-800 text-white font-bold flex justify-center items-center px-8 py-4"
                >
                    Upload new poll
                </button>
            </div>
        </main>
    )
}
