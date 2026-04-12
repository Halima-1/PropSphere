import { useAppKitAccount, useAppKitNetwork, useAppKitProvider } from "@reown/appkit/react";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { supportedChain } from "../utils/supportedChains";
import { getReadWriteProvider } from "../constants/provider";
import { PropsphereContract } from "../constants/contracts";
import { customError } from "../utils/errorHandler";
import { ErrorDecoder } from "ethers-decode-error";
import abi from "../constants/abi.json";
export const useUnListProperty = () => {
    const { isConnected } = useAppKitAccount();
    const { chainId } = useAppKitNetwork();
    const { walletProvider } = useAppKitProvider("eip155");

    return useCallback(
        async (
            _id: Number,
        ) => {
            if (!isConnected) {
                toast.error("Please connect wallet");
                return;
            }

            if (chainId !== supportedChain) {
                toast.error("switch to lisk sepolia chain");
                return;
            }

            if (!walletProvider) {
                toast.error("No Wallet detected");
                return;
            }
            const provider = getReadWriteProvider(walletProvider);
            const signer = await provider.getSigner();
            const contract = PropsphereContract(signer);
            const loading = toast.loading("Unlisting Property...");

            try {
                await contract.UnlistedProperty.staticCall(
                    _id
                );
                const estimatedGas = await contract.UnlistedProperty.estimateGas(
                    _id
                );

                const estimatedGasPlusBuffer = (120n * estimatedGas) / 100n;

                const tx = await contract.UnlistedProperty(
                    _id,
                    {
                        gasLimit: estimatedGasPlusBuffer,
                    },
                );
                const receipt = await tx.wait();
                const txStatus = await receipt.status;
                toast.remove(loading);
                if (txStatus === 1) {
                    toast.success("Property Unlisted Successfully");
                }
            } catch (error) {
                const decodeError = ErrorDecoder.create([abi]);
                const decodedErrorFromContract = await decodeError.decode(error);
                const errorToDisplay = customError(decodedErrorFromContract);
                toast.remove(loading);
                toast.error(errorToDisplay);
            }
        },
        [isConnected, chainId, walletProvider],
    );
};