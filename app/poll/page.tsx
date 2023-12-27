"use client"
export default function Poll() {
    const options = [
        "Alan Crack",
        "Juan",
        "Julieta Venegas",
        "Pedro Sánchez",
        "Facundo",
        "Big Pera",
        "Bruce Willis"
    ]

    const isMultipleSelect = false
    const isPollClosed = true
    return (
        <div className="min-h-screen p-20">
            <div className="lg:w-1/4">
                <div className="flex justify-between items-center">
                    <h1 className="text-white text-3xl font-bold underline underline-offset-8">
                        Quien Ganará en gran hermano?
                    </h1>
                    <p className="text-white">
                        {"Created a few seconds ago"}
                    </p>
                </div>
                {/* acá pongo un contador hasta que termine la encuesta */}
                <p className="mt-4 text-red-300">
                    {isPollClosed
                        ? "Poll closed"
                        : "Poll closing in 3 days"}
                </p>
                <p className="text-white mt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Aliquam voluptate cum iste vero velit ea
                    nobis id quisquam ullam veniam et repellat
                    voluptatum maxime magni harum animi praesentium,
                    delectus nostrum.
                </p>
                <div className="mt-8 p-4 border-2 border-orange-100 rounded w-full">
                    <p className="text-white mb-8">
                        {isMultipleSelect
                            ? "Select one or more options:"
                            : "Select one option:"}
                    </p>
                    {options.map((option, key) => (
                        <div className="w-full">
                            <div className="flex justify-between items-center">
                                <p className="text-white">{option}</p>
                                <div className="pl-4">
                                    {/* falta poner algo en el item del ganador (en caso de que haya cerrado) y en el item que el usuario activo votó */}
                                    {isPollClosed ? (
                                        <p className="text-white">
                                            0.0%
                                        </p>
                                    ) : (
                                        <>
                                            {isMultipleSelect ? (
                                                <input
                                                    type="checkbox"
                                                    className="lg:translate-y-[1px] shadow border rounded h-4 w-4 accent-blue-600"
                                                    onChange={() => {}}
                                                    checked={false}
                                                />
                                            ) : (
                                                <input
                                                    type="radio"
                                                    className="lg:translate-y-[1px] shadow border rounded h-4 w-4 accent-blue-600"
                                                    onChange={() => {}}
                                                    checked={false}
                                                />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            {options.length !== key + 1 ? (
                                <div className="w-full h-[0.2px] bg-white my-6"></div>
                            ) : (
                                <></>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-end items-center">
                    {isPollClosed ? (
                        <></>
                    ) : (
                        <button className="w-full px-32 py-4 mt-12 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                            Send Vote
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
