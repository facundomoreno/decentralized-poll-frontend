import { AuthContext } from "@/context/AuthContext"
import { useContext, useEffect } from "react"

const ConnectToMetamaskButton = ({
    onClick
}: {
    onClick: () => void
}) => {
    const authData = useContext(AuthContext)

    return (
        <button
            onClick={onClick}
            className={`font-bold py-2 px-4 rounded-full ${
                authData?.address
                    ? "text-orange-300"
                    : "bg-orange-600 hover:bg-orange-700 text-white "
            }`}
        >
            {authData?.address
                ? `Connected to account ${authData.address}`
                : "Connect to wallet"}
        </button>
    )
}

export default ConnectToMetamaskButton
