"use client"

const PollNotFound = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl text-white font-bold">POLL NOT FOUND!</h1>
            <p className="text-white text-sm mt-4">
                The poll you searched don't exist or you need connection to a Metamask account
            </p>
        </div>
    )
}

export default PollNotFound
