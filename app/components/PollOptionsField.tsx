import { useEffect, useState } from "react"

const PollOptionsField = ({ onPollOptionsChanged }: { onPollOptionsChanged: any }) => {
    const [pollOptions, setPollOptions] = useState(["", ""])
    const isDeletable = (key: number) => {
        if (key > 1) {
            return true
        }
        return false
    }
    const handleInputChange = (key: number, newValue: string) => {
        const newOptions = pollOptions.map((v: string, i: number) => {
            if (i == key) {
                return newValue
            } else {
                return v
            }
        })
        setPollOptions(newOptions)
    }
    const handleAddOptionClicked = () => {
        setPollOptions([...pollOptions, ""])
    }
    const handleOptionDeleted = (index: number) => {
        setPollOptions(
            pollOptions.filter((poll, i) => {
                return i !== index
            })
        )
    }

    useEffect(() => {
        onPollOptionsChanged(pollOptions)
    }, [pollOptions, onPollOptionsChanged])
    return (
        <div className="p-4 border-2 border-orange-100 rounded">
            <div className="flex flex-col">
                <div className="flex justify-between items-center">
                    <label className="text-white block text-md font-bold mb-2">Options</label>
                    <button
                        onClick={handleAddOptionClicked}
                        className="w-8 h-8 rounded-full 
                       bg-blue-700 text-white font-bold flex justify-center items-center"
                    >
                        +
                    </button>
                </div>
                {pollOptions.map((value, key) => (
                    <div key={key} className="flex items-center justify-between mt-4 pt-4">
                        <div className="flex-1 pr-4">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder={`Option ${key + 1}`}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                                value={pollOptions[key]}
                            />
                        </div>
                        <div className="flex justify-center items-center">
                            {isDeletable(key) ? (
                                <button
                                    onClick={() => handleOptionDeleted(key)}
                                    className="w-4 h-4 rounded-full 
                           bg-red-700 text-white font-bold flex justify-center items-center font-xxs"
                                >
                                    -
                                </button>
                            ) : (
                                <div className="w-4 h-4"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PollOptionsField
