
export const PropertyType = [
        "Residential",    
        "Commercial",     
        "Industrial",     
        "Domestic",        
    ]

export const Category = [
        "Vehicle",         
        "Land",     
        "House",       
        "Jewelry",       
        "Clothe", 
        "ElectricalDevice"    
    ]

export const  Warranty = [
        "None",           
        "Basic"            
    ]

    export const  PropertyStatus = [
        "New",           
        "Fairly used" ,"Old"          
    ]


     

export type PropertyCardProps = {
  id: number
  title: string
  price: bigint
  imageUri: string
  propertyType: string
  propertyCategory: string
  propertyOwner: string
  isPropertyListed: boolean
  warranty:string
  location:string
  soldOut:boolean
  description:string
  status:string
  timeStamp: number
    children?: React.ReactNode;
        propertyy: any;
  onClick?: () => void          
  className?: string            
  style?: React.CSSProperties   
  showBuyButton?: boolean      }