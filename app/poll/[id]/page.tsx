"use client"

import useGetMyVoteInPoll from "@/hooks/useGetMyVoteInPoll"
import useGetPollById from "@/hooks/useGetPollById"
import useVotePoll from "@/hooks/useVotePoll"
import { PollContract } from "@/types/abis/PollContractAbi"
import { getIdFromEncodedUrl } from "@/utils/hash"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Countdown from "react-countdown"
import { ThreeDots } from "react-loader-spinner"
import { MetaMaskAvatar } from "react-metamask-avatar"
import ShareIcon from "@/public/ShareIcon"
import PollNotFound from "@/app/components/PollNotFound"

export default function Poll() {
    dayjs.extend(relativeTime)
    const params = usePathname()
    const pollId = Number(getIdFromEncodedUrl(params.slice(6, params.length)))

    const { errorLoadingPoll, pollData, isLoading } = useGetPollById(pollId)

    const { voteData, isGetVoteLoading } = useGetMyVoteInPoll(pollId)

    const [totalNumberOfVotes, setTotalNumberOfVotes] = useState<number>(0)

    const [selectedOptionsIds, setSelectedOptionsIds] = useState<number[]>([])

    const [forcedClose, setForcedClose] = useState<boolean>(false)
    const [forcedVote, setForcedVote] = useState<boolean>(false)

    const [copiedLink, setCopiedLink] = useState<boolean>(false)

    const { votePoll, isUploading } = useVotePoll()

    const isPollOpen = (date: any) => {
        if (dayjs.unix(Number(date.toString())).isAfter(dayjs())) {
            return true
        } else {
            return false
        }
    }

    const hasVoted = (address: string) => {
        return !/^0x0+$/.test(address)
    }

    const isAddressEmpty = (address: string) => {
        return /^0x0+$/.test(address)
    }

    const isOptionInOptionsVoted = (optionId: number, options: PollContract.OptionStruct[]) => {
        return options.filter((o) => Number(o.optionId.toString()) === optionId).length > 0
    }

    const handleSharePoll = (id: number) => {
        navigator.clipboard.writeText(`${window.location.origin}${params}`)
        setCopiedLink(true)
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
        if (selectedOptionsIds.length > 0 && pollData) {
            votePoll({ pollId: Number(pollData[0].id.toString()), optionsVotedIds: selectedOptionsIds })
                .then(() => {
                    setForcedVote(true)
                    window.location.reload()
                })
                .catch((e) => {
                    alert("Something ocurred while voting in poll. Please check your Metamask connection")
                    throw e
                })
        } else {
            alert("Select option/s")
        }
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

    useEffect(() => {
        if (copiedLink) {
            setTimeout(function () {
                setCopiedLink(false)
            }, 1000) // wait 5 seconds, then reset to false
        }
    }, [copiedLink])

    return (
        <div className="min-h-screen pb-16 p-20 pt-8 px-8 sm:px-8 md:px-12 lg:px-20">
            <div className="flex justify-center">
                {pollData && voteData && !isLoading && !isGetVoteLoading && (
                    <>
                        {!isAddressEmpty(pollData[0].creator.toString()) ? (
                            <div className="w-full md:w-2/3 lg:w-1/2">
                                <div className="flex items-center inline-block mt-4">
                                    <p className="text-sm md:text-base text-white mr-[6px]">Poll id: </p>
                                    <p className="text-white text-sm translate-y-[1px]">{pollData[0].id.toString()}</p>
                                    <div className="pl-[6px] cursor-pointer" onClick={() => handleSharePoll(pollId)}>
                                        <ShareIcon />
                                    </div>
                                    {copiedLink && <p className="text-gray-600 text-xs ml-2">copied to clipboard</p>}
                                </div>
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex w-fit items-center pr-4">
                                        <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold underline underline-offset-8">
                                            {pollData[0].name}
                                        </h1>
                                    </div>
                                    <p className="text-white text-xs sm:text-xs lg:text-base">{`Uploaded ${dayjs(
                                        dayjs.unix(Number(pollData[0].createdAt.toString()))
                                    ).from(dayjs())}`}</p>
                                </div>

                                <div className="inline-block mt-6">
                                    <div className="flex items-center">
                                        <p className="text-white mr-[10px] -translate-y-[1px]">By: </p>
                                        <MetaMaskAvatar address={pollData[0].creator.toString()} size={18} />
                                        <p className="text-white ml-2 text-xs break-all">
                                            {pollData[0].creator.toString()}
                                        </p>
                                    </div>
                                </div>
                                {isPollOpen(pollData[0].closesAt) && !forcedClose ? (
                                    <p className="text-orange-500 font-bold mt-6">
                                        Closes in{" "}
                                        <span>
                                            <Countdown
                                                onComplete={() => {
                                                    setForcedClose(true)
                                                    window.location.reload()
                                                }}
                                                date={dayjs.unix(Number(pollData[0].closesAt.toString())).toDate()}
                                            />
                                        </span>
                                    </p>
                                ) : (
                                    <p className="text-orange-500 font-bold mt-6">Closed poll</p>
                                )}

                                <p className="text-white mt-6 break-words">{pollData[0].description}</p>

                                <div className="mt-8 p-4 border-2 border-white rounded w-full">
                                    <p className="text-white mb-8">
                                        {pollData[0].allowMultipleOptionsSelected
                                            ? "Select one or more options:"
                                            : "Select one option:"}
                                    </p>
                                    {pollData[1].map((option, key) => (
                                        <div key={key} className="w-full">
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
                                                    {hasVoted(voteData.voter.toString()) ||
                                                    !isPollOpen(pollData[0].closesAt) ? (
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
                                                        >{`${
                                                            Number(pollData[2].toString()) != 0
                                                                ? (Number(
                                                                      pollData[1][
                                                                          Number(option.optionId)
                                                                      ].numberOfVotes.toString()
                                                                  ) /
                                                                      totalNumberOfVotes) *
                                                                  100
                                                                : 0
                                                        }%`}</p>
                                                    ) : (
                                                        <></>
                                                    )}

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
                                <p className="text-white text-xs mt-4">{`Total votes: ${pollData[2].toString()}`}</p>

                                <div className="flex justify-end items-center">
                                    {hasVoted(voteData.voter.toString()) && (
                                        <div>
                                            <p className="text-white mt-4">
                                                You voted for
                                                {voteData.optionsVoted.map((option: PollContract.OptionStruct, key) => (
                                                    <span className="text-blue-500 font-bold">{` ${option.name}${
                                                        key == voteData.optionsVoted.length - 1 ? "" : ","
                                                    }`}</span>
                                                ))}{" "}
                                                !
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {isPollOpen(pollData[0].closesAt) &&
                                    !hasVoted(voteData.voter.toString()) &&
                                    !forcedClose && (
                                        <button
                                            onClick={handleSubmitVoteClicked}
                                            className={`flex items-center justify-center w-full px-0 sm:px-16 md:px-28 lg:px-32 py-4 mt-12 text-white font-bold rounded ${
                                                isUploading || forcedVote
                                                    ? "bg-gray-700"
                                                    : "bg-orange-600 hover:bg-orange-700"
                                            }`}
                                        >
                                            {isUploading || forcedVote ? (
                                                <ThreeDots
                                                    visible={true}
                                                    height="40"
                                                    width="40"
                                                    color="#ffd4a3"
                                                    radius="9"
                                                    ariaLabel="three-dots-loading"
                                                />
                                            ) : (
                                                <p>Send vote</p>
                                            )}
                                        </button>
                                    )}
                            </div>
                        ) : (
                            <PollNotFound />
                        )}
                    </>
                )}
                {errorLoadingPoll && <PollNotFound />}
            </div>

            {isLoading || isGetVoteLoading ? (
                <div className="flex justify-center items-center h-[30svh]">
                    <ThreeDots
                        visible={true}
                        height="40"
                        width="40"
                        color="white"
                        radius="9"
                        ariaLabel="three-dots-loading"
                    />
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}
