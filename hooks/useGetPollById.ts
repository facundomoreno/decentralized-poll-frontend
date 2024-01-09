import { useEffect, useState } from "react"
import usePollContract from "./usePollContract"
import { PollContract } from "../types/abis/PollContractAbi"

const useGetPollById = (pollId: number) => {
    const contract = usePollContract()
    const [isLoading, setLoading] = useState(false)
    const [errorLoadingPoll, setErrorLoadingPoll] = useState<any>(undefined)

    const [pollData, setPoll] = useState<
        [PollContract.PollStruct, PollContract.OptionStruct[], number] | null | undefined
    >(undefined)

    useEffect(() => {
        if (!contract) return

        let mounted = true
        setLoading(true)

        const getPoll = async () => {
            try {
                const response: [PollContract.PollStruct, PollContract.OptionStruct[], number] =
                    await contract.getPollById(pollId)
                setPoll(response)
            } catch (e) {
                console.log(e)
                setErrorLoadingPoll(e)
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
    return { errorLoadingPoll, pollData, isLoading }
}

export default useGetPollById
