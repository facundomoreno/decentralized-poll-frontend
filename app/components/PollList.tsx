"use client"
import { useEffect, useState } from "react"
import PollListItem from "./PollListItem"
import useGetPolls from "@/hooks/useGetPolls"
import { PollContract } from "@/types/abis/PollContractAbi"

const mockPolls = [
    {
        id: 1,
        name: "Quien sale de Gran hermano?",
        createdAt: new Date(),
        closesAt: new Date()
    },
    {
        id: 2,
        name: "Por si o por no, Ford Mustang",
        createdAt: new Date(),
        closesAt: new Date()
    },
    {
        id: 3,
        name: "A quien deberíamos invitar para la próxima entrevista",
        createdAt: new Date(),
        closesAt: new Date()
    },
    {
        id: 4,
        name: "Elecciones presidenciales 2027",
        createdAt: new Date(),
        closesAt: new Date()
    },
    {
        id: 5,
        name: "Bancas las nuevas medidas del gobernador?",
        createdAt: new Date(),
        closesAt: new Date()
    },
    {
        id: 6,
        name: "En que fecha deberíamos tocar el próximo año?",
        createdAt: new Date(),
        closesAt: new Date()
    },
    {
        id: 7,
        name: "Crees en la teoría de la evolución?",
        createdAt: new Date(),
        closesAt: new Date()
    }
]

type Poll = {
    id: number
    name: string
    createdAt: Date
    closesAt: Date
}

const PollList = () => {
    const { polls, isLoading } = useGetPolls()
    const [pollss, setPolls] = useState<Poll[]>(mockPolls)

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-16">
            {!isLoading && polls ? (
                <>
                    {polls.map((poll: PollContract.PollStruct) => (
                        <PollListItem item={poll} />
                    ))}
                </>
            ) : (
                <p>Loading</p>
            )}
        </div>
    )
}

export default PollList
