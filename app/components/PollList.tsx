"use client"
import { time } from "console"
import { useState } from "react"
import PollListItem from "./PollListItem"

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
    const [polls, setPolls] = useState<Poll[]>(mockPolls)
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-16">
            {polls.map((poll: Poll) => (
                <PollListItem item={poll} />
            ))}
        </div>
    )
}

export default PollList
