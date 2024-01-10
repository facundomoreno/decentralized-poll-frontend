import { Contract } from "ethers"
import { useContext, useMemo } from "react"
import { AuthContext } from "../context/AuthContext"
import pollContractAbi from "../abis/PollContract.abi.json"

const address = process.env.NEXT_PUBLIC_POLL_CONTRACT_ADDRESS

const usePollContract = () => {
    const state = useContext(AuthContext)

    return useMemo(() => state?.signer && new Contract(address!, pollContractAbi, state?.signer), [state?.signer])
}

export default usePollContract
