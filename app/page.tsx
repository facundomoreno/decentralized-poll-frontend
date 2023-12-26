import ConnectToMetamaskButton from "@/app/components/ConnectToMetamaskButton"
import PollList from "./components/PollList"

export default function Home() {
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
        </main>
    )
}
