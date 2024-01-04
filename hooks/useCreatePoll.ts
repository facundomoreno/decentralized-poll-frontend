import { useState } from "react"
import usePollContract from "./usePollContract"

interface CreatePollArgs {
    name: string
    description: string
    allowMultipleOptionsSelected: boolean
    closesAt: number
    options: string[]
}

const useCreatePoll = () => {
    const contract = usePollContract()
    const [isLoading, setLoading] = useState(false)

    const createPoll = async ({
        name,
        description,
        allowMultipleOptionsSelected,
        closesAt,
        options
    }: CreatePollArgs) => {
        if (!contract) return

        setLoading(true)

        try {
            const transaction = await contract.createPoll(
                name,
                description,
                allowMultipleOptionsSelected,
                closesAt,
                options
            )

            await transaction.wait()
        } catch {
        } finally {
            setLoading(false)
        }
    }

    return { createPoll, isLoading }
}

export default useCreatePoll
