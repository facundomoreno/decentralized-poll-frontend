import { useEffect, useState } from "react"
import usePollContract from "./usePollContract"
import { PollContract } from "../types/abis/PollContractAbi"

const POLLS_LIMIT = 20

const useGetPolls = () => {
    const contract = usePollContract()
    const [isLoading, setLoading] = useState(false)
    const [errorLoadingPolls, setErrorLoadingPolls] = useState<any>(undefined)

    const [polls, setPolls] = useState<PollContract.PollStruct[] | null>(null)

    useEffect(() => {
        if (!contract) return

        let mounted = true
        setLoading(true)

        const getPolls = async () => {
            try {
                let limit = POLLS_LIMIT
                const pollsToFill: PollContract.PollStruct[] = []
                const pollsCount = await contract.getPollsCount()
                for (var i = Number(pollsCount.toString()) - 1; i >= 0; i--) {
                    if (limit > 0) {
                        const pollToPush = await contract.getPollById(i)
                        pollsToFill.push(pollToPush[0])
                        limit--
                    }
                }
                setPolls(pollsToFill)
            } catch (e) {
                setErrorLoadingPolls(e)
                throw e
            } finally {
                setLoading(false)
            }
        }

        if (mounted) {
            getPolls()
        }

        return () => {
            mounted = false
        }
    }, [contract])
    return { errorLoadingPolls, polls, isLoading }
}

export default useGetPolls
