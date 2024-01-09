"use client"
import PollListItem from "./PollListItem"
import useGetPolls from "@/hooks/useGetPolls"
import { PollContract } from "@/types/abis/PollContractAbi"
import { ThreeDots } from "react-loader-spinner"

const PollList = () => {
    const { errorLoadingPolls, polls, isLoading } = useGetPolls()

    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {!isLoading && polls && !errorLoadingPolls ? (
                    <>
                        {polls.map((poll: PollContract.PollStruct) => (
                            <PollListItem item={poll} />
                        ))}
                    </>
                ) : (
                    <ThreeDots
                        visible={true}
                        height="40"
                        width="40"
                        color="white"
                        radius="9"
                        ariaLabel="three-dots-loading"
                    />
                )}
            </div>
            {errorLoadingPolls && (
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl text-white font-bold">POLLS COULDN'T LOAD</h1>
                    <p className="text-white text-sm mt-4">Your Metamask account may not be connected</p>
                </div>
            )}
        </>
    )
}

export default PollList
