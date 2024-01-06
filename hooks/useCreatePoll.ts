import { useState } from "react"
import usePollContract from "./usePollContract"

interface CreatePollArgs {
    name: string
    description: string
    allowMultipleOptions: boolean
    closesAt: number
    options: string[]
}

const useCreatePoll = () => {
    const contract = usePollContract()
    const [isUploading, setUploading] = useState(false)

    const createPoll = async ({ name, description, allowMultipleOptions, closesAt, options }: CreatePollArgs) => {
        if (!contract) return

        setUploading(true)

        try {
            const transaction = await contract.createPoll(name, description, allowMultipleOptions, closesAt, options)

            await transaction.wait()
        } catch {
        } finally {
            setUploading(false)
        }
    }

    return { createPoll, isUploading }
}

export default useCreatePoll
