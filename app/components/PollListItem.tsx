"use client"
import moment from "moment"
import { useRouter } from "next/navigation"

type Poll = {
    id: number
    name: string
    createdAt: Date
    closesAt: Date
}

const PollListItem = ({ item }: { item: Poll }) => {
    const router = useRouter()
    return (
        <div
            key={item.id}
            className="flex flex-col relative bg-white rounded p-8 justify-between"
        >
            <div className="flex flex-1 pb-4 text-gray-400">
                <p>{`Uploaded ${moment(
                    item.createdAt,
                    "YYYYMMDD"
                ).fromNow()}`}</p>
            </div>
            <div className="flex-1">
                <h1 className="font-bold">{item.name}</h1>
            </div>
            <div className="p-2 flex flex-1 justify-end mt-4">
                <button
                    onClick={() => {
                        router.push(`/poll/${1}`)
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
