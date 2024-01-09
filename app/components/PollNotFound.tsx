"use client"

const PollNotFound = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl text-white font-bold">POLL NOT FOUND!</h1>
            <p className="text-white text-sm mt-4">
                Check if they shared with you the correct link or if you searched for a valid ID from the main screen
            </p>
        </div>
    )
}

export default PollNotFound
