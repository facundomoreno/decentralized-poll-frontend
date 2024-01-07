import { useEffect, useState } from "react"
import usePollContract from "./usePollContract"
import { PollContract } from "../types/abis/PollContractAbi"

const useGetMyVoteInPoll = (pollId: number) => {
    const contract = usePollContract()
    const [isGetVoteLoading, setLoading] = useState(false)

    const [voteData, setVoteData] = useState<PollContract.VoteStruct | null>(null)

    useEffect(() => {
        if (!contract) return

        let mounted = true
        setLoading(true)

        const getMyVoteInPoll = async () => {
            try {
                const response = await contract.getMyVoteInPoll(pollId)
                setVoteData(response)
            } catch {
            } finally {
                setLoading(false)
            }
        }

        if (mounted) {
            getMyVoteInPoll()
        }

        return () => {
            mounted = false
        }
    }, [contract, pollId])
    return { voteData, isGetVoteLoading }
}

export default useGetMyVoteInPoll
