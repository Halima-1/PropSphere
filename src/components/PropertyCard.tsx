import { formatEther } from "ethers"
import { type PropertyCardProps } from "../utils/enumMapper"
import "../styles/dashboard.scss"
import { MapPin, StarIcon } from "lucide-react"
import { RxAvatar } from "react-icons/rx"

const PropertyCard = ({
  title,
  price,
  imageUri,
  propertyType,
  propertyCategory,
  propertyOwner,
  isPropertyListed,
  location,
  description,
  onClick,
  style,
  children
}: PropertyCardProps) => (
  <div onClick={onClick} style={style}>
    <b className="f-listed">{isPropertyListed ? "Listed" : "Not listed"}</b>

    <img  
      src={`https://gateway.pinata.cloud/ipfs/${imageUri.split(",")[0]}`}
      alt={title}
      onError={(e) => {
        e.currentTarget.src = "https://placehold.co/400x300?text=No+Image"
      }}
    />


    <div className="f-about">
            <b className="f-price">{formatEther(price)} ETH</b>

      <h3>{title}</h3>
      <p>{description.slice(0, 20)}...</p>
      <div className="dets">
        <span ><MapPin size={14}/>{location}</span>
        <span><StarIcon size={14}/>{propertyCategory}</span>
        <span><StarIcon size={14}/>{propertyType}</span>
      </div>
              <span><RxAvatar/>{propertyOwner.slice(0, 6)}...{propertyOwner.slice(-4)}</span>

                  {children}

    </div>
   
  </div>
)

export default PropertyCard