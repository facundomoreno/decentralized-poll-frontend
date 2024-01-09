import { useEffect, useState } from "react"
import usePollContract from "./usePollContract"
import { PollContract } from "../types/abis/PollContractAbi"

const useGetPollById = (pollId: number) => {
    const contract = usePollContract()
    const [isLoading, setLoading] = useState(false)

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
                if (!/^0x0+$/.test(response[0].creator.toString())) {
                    setPoll(response)
                } else {
                    setPoll(undefined)
                }
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
