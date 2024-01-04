import { Contract } from "ethers"
import { useContext, useMemo } from "react"
import { AuthContext } from "../context/AuthContext"
import pollContractAbi from "../abis/PollContract.abi.json"

const address = "0x2E9d8A6c168054B297724Ff5137576e8B47aA013"

const usePollContract = () => {
    const state = useContext(AuthContext)

    return useMemo(
        () =>
            state?.signer &&
            new Contract(address, pollContractAbi, state?.signer),
        [state?.signer]
    )
}

export default usePollContract
