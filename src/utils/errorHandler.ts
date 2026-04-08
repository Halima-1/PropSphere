import type { DecodedError } from "ethers-decode-error";

export const customError =({name, args, reason} : DecodedError):string =>{
  
    switch(
        name
    ){
        case "NOT_THE_OWNER":
            return "Unauthorized"
        case "PROPERTY_NOT_FOUND":
            return "Property does not exist, please check and try agaain"
        case "INVALID_PROPERTY":
            return "Property does not exist, please check and try agaain"
        case "SOLD_OUT":
            return "Property has been sold"
        case "ZERO_AMOUNT":
            return "Amount can not be 0"
        case "NOT_LISTED":
        return `Propery ${args[0]} has not been listed`
        case "ALREADY_LISTED":
        return `Propery ${args[0]} has been listed`
        case "INSUFFICIENT_ALLOWANCE":
            return `Insufficient fund to buy property ${args[0]}`
        case "PROPERTY_DOES_NOT_EXIST":
            return `Property ${args[0]} does not exist, please check and try again`
        case "NOT_PROPERTY_OWNER":
            return "This action is restricted to only the property owner"
        case "BUYING_OWN_PROPERTY_NOT_ALLOWED":
            return "You can not buy your own property"
            default:
                return reason?? "An error has occured"
    }
}