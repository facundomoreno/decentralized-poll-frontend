"use client"
import PollListItem from "./PollListItem"
import useGetPolls from "@/hooks/useGetPolls"
import { PollContract } from "@/types/abis/PollContractAbi"

const PollList = () => {
    const { polls, isLoading } = useGetPolls()

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {!isLoading && polls ? (
                <>
                    {polls.map((poll: PollContract.PollStruct) => (
                        <PollListItem item={poll} />
                    ))}
                </>
            ) : (
                <p>Loading</p>
            )}
        </div>
    )
}

export default PollList
