"use client"
import { AuthContext } from "@/context/AuthContext"
import PollListItem from "./PollListItem"
import useGetPolls from "@/hooks/useGetPolls"
import { PollContract } from "@/types/abis/PollContractAbi"
import { ThreeDots } from "react-loader-spinner"
import { useContext } from "react"

const PollList = () => {
    const { errorLoadingPolls, polls, isLoading } = useGetPolls()
    const authData = useContext(AuthContext)

    return (
        <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {!isLoading && polls && !errorLoadingPolls ? (
                    <>
                        {polls.map((poll: PollContract.PollStruct, key: number) => (
                            <PollListItem key={key} item={poll} />
                        ))}
                    </>
                ) : (
                    <>
                        {!errorLoadingPolls && authData && (
                            <ThreeDots
                                visible={true}
                                height="40"
                                width="40"
                                color="white"
                                radius="9"
                                ariaLabel="three-dots-loading"
                            />
                        )}
                    </>
                )}
            </div>
            {!authData || errorLoadingPolls ? (
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl text-white font-bold">POLLS COULDN'T LOAD</h1>
                    <p className="text-white text-sm mt-4">Try connecting your wallet account</p>
                </div>
            ) : (
                <></>
            )}
        </>
    )
}

export default PollList
