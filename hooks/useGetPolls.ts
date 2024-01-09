import { useEffect, useState } from "react"
import usePollContract from "./usePollContract"
import { PollContract } from "../types/abis/PollContractAbi"

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
                const response = await contract.getPolls()
                setPolls(response)
            } catch (e) {
                setErrorLoadingPolls(e)
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
