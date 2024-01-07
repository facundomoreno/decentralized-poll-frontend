"use client"

import useGetMyVoteInPoll from "@/hooks/useGetMyVoteInPoll"
import useGetPollById from "@/hooks/useGetPollById"
import useVotePoll from "@/hooks/useVotePoll"
import { PollContract } from "@/types/abis/PollContractAbi"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Countdown from "react-countdown"
import { MetaMaskAvatar } from "react-metamask-avatar"

export default function Poll() {
    dayjs.extend(relativeTime)
    const params = usePathname()
    const pollId = Number(params.slice(6, params.length))

    const { pollData, isLoading } = useGetPollById(pollId)

    const { voteData, isGetVoteLoading } = useGetMyVoteInPoll(pollId)

    const [totalNumberOfVotes, setTotalNumberOfVotes] = useState<number>(0)

    const [selectedOptionsIds, setSelectedOptionsIds] = useState<number[]>([])

    const { votePoll, isUploading } = useVotePoll()

    const isPollOpen = (date: any) => {
        if (dayjs.unix(Number(date.toString())).isAfter(dayjs())) {
            return true
        } else {
            return false
        }
    }

    const handleOptionSelected = (optionId: number, isMultipleSelect: boolean, checked?: boolean) => {
        if (isMultipleSelect) {
            if (checked) {
                setSelectedOptionsIds([...selectedOptionsIds, optionId])
            } else {
                setSelectedOptionsIds(
                    selectedOptionsIds.filter((oId, i) => {
                        return oId !== optionId
                    })
                )
            }
        } else {
            setSelectedOptionsIds([optionId])
        }
    }

    const handleSubmitVoteClicked = () => {
        if (selectedOptionsIds.length > 1 && pollData) {
            try {
                votePoll({ pollId: Number(pollData[0].id.toString()), optionsVotedIds: selectedOptionsIds })
            } catch (e) {
                throw e
            } finally {
                alert("Succesfully voted")
            }
        }
    }

    const hasVoted = (address: string) => {
        return !/^0x0+$/.test(address)
    }

    const isOptionInOptionsVoted = (optionId: number, options: PollContract.OptionStruct[]) => {
        console.log(options, optionId)
        return options.filter((o) => Number(o.optionId.toString()) === optionId).length > 0
    }

    useEffect(() => {
        if (pollData && !isLoading) {
            let count = 0
            for (var i = 0; i < pollData[1].length; i++) {
                count = count + Number(pollData[1][i].numberOfVotes.toString())
            }
            setTotalNumberOfVotes(count)
        }
    }, [pollData])

    return (
        <div className="min-h-screen px-20 pt-16 pb-16">
            <div className="flex justify-center">
                {pollData && voteData && !isLoading && !isGetVoteLoading && (
                    <div className="lg:w-1/2">
                        <div className="flex justify-between items-center">
                            <h1 className="text-white text-3xl font-bold underline underline-offset-8">
                                {pollData[0].name}
                            </h1>
                            <p className="text-white">{`Uploaded ${dayjs(
                                dayjs.unix(Number(pollData[0].createdAt.toString()))
                            ).from(dayjs())}`}</p>
                        </div>
                        <div className="inline-block mt-4">
                            <div className="flex items-center">
                                <p className="text-white ml-2 mr-[10px] -translate-y-[1px]">By: </p>
                                <MetaMaskAvatar address={pollData[0].creator.toString()} size={18} />
                                <p className="text-white ml-2 text-xs">{pollData[0].creator.toString()}</p>
                            </div>
                        </div>
                        {/* acá pongo un contador hasta que termine la encuesta */}
                        <p className="text-white mt-6">{pollData[0].description}</p>
                        <div className="mt-8 p-4 border-2 border-white rounded w-full">
                            <p className="text-white mb-8">
                                {pollData[0].allowMultipleOptionsSelected
                                    ? "Select one or more options:"
                                    : "Select one option:"}
                            </p>
                            {pollData[1].map((option, key) => (
                                <div className="w-full">
                                    <div className="flex justify-between items-center">
                                        <p
                                            className={`${
                                                hasVoted(voteData.voter.toString()) &&
                                                isOptionInOptionsVoted(
                                                    Number(option.optionId.toString()),
                                                    voteData.optionsVoted
                                                )
                                                    ? "text-blue-500 font-bold"
                                                    : "text-white"
                                            }`}
                                        >
                                            {option.name}
                                        </p>
                                        <div className="pl-4">
                                            <p className="text-white">{`${
                                                Number(pollData[2].toString()) != 0
                                                    ? (Number(
                                                          pollData[1][Number(option.optionId)].numberOfVotes.toString()
                                                      ) /
                                                          totalNumberOfVotes) *
                                                      100
                                                    : 0
                                            }%`}</p>

                                            {isPollOpen(pollData[0].closesAt) &&
                                                !hasVoted(voteData.voter.toString()) && (
                                                    <>
                                                        {pollData[0].allowMultipleOptionsSelected ? (
                                                            <input
                                                                type="checkbox"
                                                                className="lg:translate-y-[1px] shadow border rounded h-4 w-4 accent-blue-600"
                                                                onChange={(e) => {
                                                                    handleOptionSelected(
                                                                        Number(option.optionId.toString()),
                                                                        true,
                                                                        e.target.checked
                                                                    )
                                                                }}
                                                                checked={selectedOptionsIds.includes(
                                                                    Number(option.optionId.toString())
                                                                )}
                                                            />
                                                        ) : (
                                                            <input
                                                                type="radio"
                                                                className="lg:translate-y-[1px] shadow border rounded h-4 w-4 accent-blue-600"
                                                                onChange={(e) => {
                                                                    handleOptionSelected(
                                                                        Number(option.optionId.toString()),
                                                                        false
                                                                    )
                                                                }}
                                                                checked={selectedOptionsIds.includes(
                                                                    Number(option.optionId.toString())
                                                                )}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                        </div>
                                    </div>
                                    {pollData[1].length !== key + 1 && (
                                        <div className="w-full h-[0.2px] bg-white my-6"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {isPollOpen(pollData[0].closesAt) ? (
                            <p className="text-orange-500 font-bold mt-6">
                                Closes in{" "}
                                <span>
                                    <Countdown date={dayjs.unix(Number(pollData[0].closesAt.toString())).toDate()}>
                                        <p className="text-orange-500 font-bold">Closed</p>
                                    </Countdown>
                                </span>
                            </p>
                        ) : (
                            <p className="text-orange-500 font-bold mt-6">Closed</p>
                        )}

                        <div className="flex justify-end items-center">
                            {!isPollOpen(pollData[0].closesAt) ? (
                                <></>
                            ) : (
                                <>
                                    {hasVoted(voteData.voter.toString()) ? (
                                        <div>
                                            <p className="text-white mt-4">
                                                You Already voted for
                                                {voteData.optionsVoted.map((option: PollContract.OptionStruct, key) => (
                                                    <span className="text-blue-500 font-bold">{` ${option.name}${
                                                        key == voteData.optionsVoted.length - 1 ? "" : ","
                                                    }`}</span>
                                                ))}{" "}
                                                !
                                            </p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleSubmitVoteClicked}
                                            className={`w-full px-32 py-4 mt-4 text-white font-bold rounded bg-orange-600 hover:bg-orange-700`}
                                        >
                                            Send vote
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
