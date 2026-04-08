import { PropsphereContract } from "../constants/contracts";
import abi from "../constants/abi.json";
import { getReadWriteProvider } from "../constants/provider";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork, useAppKitProvider } from "@reown/appkit/react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { ErrorDecoder } from "ethers-decode-error";
import { customError } from "../utils/errorHandler";
import { useReadAllProperties } from "./useGetAllProperties";
export const useCreateProperty = () => {
     const { isConnected } = useAppKitAccount()
    const { chainId } = useAppKitNetwork()
    const {walletProvider} = useAppKitProvider("eip155")
    const properties = useReadAllProperties()
    return useCallback(async (
        _amount: bigint | number,
        _category: number,
        _propType: number,
        _status: number,
        _warranty: number,
        _imgUri: string,
        _location: string,
        _title: string,
        _description: string
    ) => {
        if (!isConnected) {
            toast.error("Connect a wallet")
            return
        }

        const provider = getReadWriteProvider(walletProvider)
        const signer = await provider.getSigner()
        const contract = PropsphereContract(signer)
        const loading = toast.loading("Creating property...")

        try {
            // The contract addProperty now takes 9 arguments based on updated ABI:
            // uint256 _amount, Category _category, Type _propType, Status _status, Warranty _warranty, 
            // string _imgUri, string _location, string _title, string _description
            
            const tx = await contract.addProperty(
                _amount,
                Number(_category),
                Number(_propType),
                Number(_status),
                Number(_warranty),
                _imgUri,
                _location,
                _title,
                _description
            )
            const receipt = await tx.wait()
            
            toast.remove(loading)
            if (receipt.status === 1) {
                toast.success("Property added")
                                console.log(properties)

            } else {
                toast.error("Transaction failed")
            }
                                            console.log(properties)

        }
        catch (error: any) {
            console.error(error)
            const decodeError = ErrorDecoder.create([abi])
            const contractError = await decodeError.decode(error)
            const errorTODisplay = customError(contractError)
            toast.remove(loading)
            toast.error(errorTODisplay || error.message || "Something went wrong")
        }

    },
        [isConnected, chainId, walletProvider]
    )
}