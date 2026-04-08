
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
  description:string
  status:string
  timestamp: number
    children?: React.ReactNode;
        property: any;

  onClick?: () => void          // click handler
  className?: string            // extra css class
  style?: React.CSSProperties   // inline styles
  showBuyButton?: boolean       // toggle features per use case
}