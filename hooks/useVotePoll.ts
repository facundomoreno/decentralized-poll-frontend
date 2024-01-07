import { useState } from "react"
import usePollContract from "./usePollContract"

interface VotePollArgs {
    pollId: number
    optionsVotedIds: number[]
}

const useVotePoll = () => {
    const contract = usePollContract()
    const [isUploading, setUploading] = useState(false)

    const votePoll = async ({ pollId, optionsVotedIds }: VotePollArgs) => {
        if (!contract) return

        setUploading(true)

        try {
            const transaction = await contract.votePoll(pollId, optionsVotedIds)

            await transaction.wait()
        } catch {
        } finally {
            setUploading(false)
        }
    }

    return { votePoll, isUploading }
}

export default useVotePoll
