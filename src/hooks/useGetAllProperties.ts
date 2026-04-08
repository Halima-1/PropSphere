import { useEffect, useState } from "react";
import { PropsphereContract } from "../constants/contracts";
import { readProvider } from "../constants/provider";
import { ErrorDecoder } from "ethers-decode-error";
import abi from "../constants/abi.json";
import { customError } from "../utils/errorHandler";
import {
  Category,
  PropertyType,
  Warranty,PropertyStatus
} from "../utils/enumMapper";
import toast from "react-hot-toast";
// import { formatEther, parseUnits } from "ethers";

export const useReadAllProperties = () => {
  const [data, setData] = useState([]);

  const getAllProperty = async () => {
    try {
      const contract = PropsphereContract(readProvider);
      const properties = await contract.getAllProperties();
      const allProperties = properties.map((prop: any) => ({
        id: Number(prop.id),
        title: prop.title,
        imageUri: prop.imgUri,
        price: prop.amount,
        location:prop.location,
        propertyType: PropertyType[Number(prop.propType)],
        propertyCategory:Category[Number(prop.category)],
        propertyWaranty: Warranty[Number(prop.warranty)],
        status:PropertyStatus[Number(prop.status)],
        description:prop.description,
        propertyOwner: prop.propertyOwner,
        timeStamp:prop.timeStamp,
        isPropertyListed: prop.listed,
        soldOut:prop.soldOut,
        // propertyTotalSales: Number(prop.totalSales),
      }));
      setData(allProperties);
    } catch (error) {
      const decodeError = ErrorDecoder.create([abi]);
      const decodedErrorFromContract = await decodeError.decode(error);
      const errorToDisplay = customError(decodedErrorFromContract);
      toast.error(errorToDisplay);
    }
  };

  useEffect(() => {
    getAllProperty();
  }, []);
  return data;
};
