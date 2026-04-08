import { Contract } from "ethers";
import abi from "./abi.json";

export const PropsphereContract = (signerOrProvider: any) => new Contract(
    import.meta.env.VITE_CONTRACT_ADDRESS,
    abi,
    signerOrProvider,
);
