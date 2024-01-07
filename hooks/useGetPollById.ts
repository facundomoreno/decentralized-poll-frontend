import { useEffect, useState } from "react"
import usePollContract from "./usePollContract"
import { PollContract } from "../types/abis/PollContractAbi"

const useGetPollById = (pollId: number) => {
    const contract = usePollContract()
    const [isLoading, setLoading] = useState(false)

    const [pollData, setPoll] = useState<[PollContract.PollStruct, PollContract.OptionStruct[], number] | null>(null)

    useEffect(() => {
        if (!contract) return

        let mounted = true
        setLoading(true)

        const getPoll = async () => {
            try {
                const response = await contract.getPollById(pollId)
                setPoll(response)
            } catch {
            } finally {
                setLoading(false)
            }
        }

        if (mounted) {
            getPoll()
        }

        return () => {
            mounted = false
        }
    }, [contract, pollId])
    return { pollData, isLoading }
}

export default useGetPollById
