import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

const ConnectToMetamaskButton = ({ onClick }: { onClick: () => void }) => {
    const authData = useContext(AuthContext)

    return (
        <button
            onClick={onClick}
            className={`mt-6 sm:mt-6 md:mt-0 lg:mt-0 text-xs sm:text-xs md:text-sm lg:text-base font-bold py-2 px-4 rounded-full ${
                authData?.address ? "text-orange-400 cursor-default" : "bg-orange-600 hover:bg-orange-700 text-white "
            }`}
        >
            {authData?.address ? `Connected to account ${authData.address.slice(0, 10)}...` : "Connect to wallet"}
        </button>
    )
}

export default ConnectToMetamaskButton
