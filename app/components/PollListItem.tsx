"use client"
import { PollContract } from "@/types/abis/PollContractAbi"
import { encodeForLongerUrl } from "@/utils/hash"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useRouter } from "next/navigation"
import { MetaMaskAvatar } from "react-metamask-avatar"

const PollListItem = ({ item }: { item: PollContract.PollStruct }) => {
    dayjs.extend(relativeTime)
    const router = useRouter()

    const determinePollStatus = () => {
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
                <div className="flex items-center pl-4">
                    <p className="text-xs mr-2">{`${item.creator.toString().slice(0, 12)}...`}</p>
                    <MetaMaskAvatar address={item.creator.toString()} size={30} />
                </div>
            </div>
            <div className="flex-1">
                <h1 className="font-bold break-words">{item.name}</h1>
            </div>
            <p className="mt-4 break-words">{`${item.description.slice(0, 42)}...`}</p>
            <div className="p-2 flex flex-1 items-start md:items-center lg:items-center justify-between mt-6 flex-col sm:flex-col md:flex-row lg:flex-row">
                <p className="text-orange-500 font-bold">{determinePollStatus()}</p>
                <button
                    onClick={() => {
                        router.push(`/poll/${encodeForLongerUrl(item.id.toString())}`)
                    }}
                    className="w-full mt-4 md:w-fit md:mt-0 lg:w-fit lg:mt-0 bg-black hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                >
                    Vote
                </button>
            </div>
        </div>
    )
}

export default PollListItem
