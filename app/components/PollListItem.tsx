"use client"
import { PollContract } from "@/types/abis/PollContractAbi"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useRouter } from "next/navigation"
import { MetaMaskAvatar } from "react-metamask-avatar"

const PollListItem = ({ item }: { item: PollContract.PollStruct }) => {
    dayjs.extend(relativeTime)
    const router = useRouter()

    const determinePollStatus = () => {
        console.log(dayjs.unix(Number(item.closesAt.toString())).toDate())
        if (dayjs.unix(Number(item.closesAt.toString())).isAfter(dayjs())) {
            return `Closes ${dayjs().to(dayjs.unix(Number(item.closesAt.toString())))}`
        } else {
            return `Closed`
        }
    }

    return (
        <div key={item.id} className="flex flex-col relative bg-white rounded p-8 justify-between">
            <div className="flex justify-between items-center flex-1 pb-4 text-gray-400">
                <p>{`Uploaded ${dayjs(dayjs.unix(Number(item.createdAt.toString()))).from(dayjs())}`}</p>
                <div className="flex items-center">
                    <p className="text-xs mr-2">{`${item.creator.toString().slice(0, 8)}...`}</p>
                    <MetaMaskAvatar address={item.creator.toString()} size={30} />
                </div>
            </div>
            <div className="flex-1">
                <h1 className="font-bold">{item.name}</h1>
            </div>
            <p className="mt-4">{`${item.description.slice(0, 42)}...`}</p>
            <div className="p-2 flex flex-1 items-center justify-between mt-6">
                <p className="text-orange-500 font-bold">{determinePollStatus()}</p>
                <button
                    onClick={() => {
                        router.push(`/poll/${item.id}`)
                    }}
                    className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Vote
                </button>
            </div>
        </div>
    )
}

export default PollListItem
