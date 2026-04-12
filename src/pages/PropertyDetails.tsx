import { useParams } from "react-router-dom"
import { type Property, useReadAllProperties } from "../hooks/useGetAllProperties"
import "../styles/propDetails.scss"
import { useState } from "react"
import { Calendar1Icon, Heart, MapPin } from "lucide-react"
import { HiNumberedList } from "react-icons/hi2"
import { GrCurrency } from "react-icons/gr"
import { MdClass } from "react-icons/md"
// import { useBuyProperty } from "../hooks/useBuyProperty"
const PropertyDetails = () => {
    const allProperties = useReadAllProperties()
    const param = useParams()
    const idd = param.id
    const propertyy: Property | undefined = allProperties.find((item: Property) => item.id == Number(idd))
    console.log(propertyy)
    // const pricee =formatEther(propertyy?.price)
    const [imageIndex, setImageIndex] = useState(0)

    const date = new Date(Number(propertyy?.timeStamp) * 1000);
    const formattedDate = (date).toDateString()
    // const dateCreated = Numer(formattedDate);
    return (
        <>
            <p className="head">Market place {` > ${propertyy?.title}`}</p>
            <section className="details-container">
                <div className="images">
                    <div className="cover-img">
                        <img
                            src={`https://gateway.pinata.cloud/ipfs/${propertyy?.imageUri?.split(",")[imageIndex]}`}
                            alt={propertyy?.title}
                            onError={(e) => {
                                e.currentTarget.src = "https://placehold.co/400x300?text=No+Image"
                            }}
                        />
                    </div>
                    <div className="other-imgs">
                        {propertyy?.imageUri?.split(",").map((image: string, index: any) => (
                            <img key={index}
                                onClick={() => setImageIndex(index)}
                                src={`https://gateway.pinata.cloud/ipfs/${image}`}
                                alt="" />
                        ))}
                    </div>
                </div>
                <div className="details">
                    <div>
                        <span className="avail">{propertyy?.soldOut == true ? "Sold" : "Available"}</span>
                        <Heart />
                    </div>
                    <div className="titl">
                        <h3>{propertyy?.title}</h3>
                        <p> <MapPin size={14} style={{ color: "#fbbf24" }} />{propertyy?.location} </p>
                    </div>
                    <div>
                        <span>Seller:</span>
                        <span style={{ color: "#fbbf24" }}>{propertyy?.propertyOwner.slice(0, 8) + "..." + propertyy?.propertyOwner.slice(30, 42)}</span>
                    </div>
                    <div>
                        <span>Date listed:</span>
                        <span>{formattedDate}</span>
                    </div>
                    <p className="description">{propertyy?.description}</p>
                    <div className="price">
                        <span>List price</span>
                        <h1>{Number(propertyy?.price) / 1e18} ETH</h1>
                    </div>
                    <button
                    // onClick={() => buyProperty(propertyy?.id)}
                    >Buy property</button>
                </div>
            </section>

            <section className="more-info">
                <div>
                    <span style={{ color: "#fbbf24" }}><HiNumberedList /></span>
                    <span>Property Id</span>
                    <b>PSP0{propertyy?.id}ss</b>
                </div>
                <div>
                    <span style={{ color: "#fbbf24" }}><GrCurrency /></span>
                    <span>PRICE (ETH)</span>
                    <b>{Number(propertyy?.price) / 1e18}.00 ETH</b>
                </div>
                <div>
                    <span style={{ color: "#fbbf24" }}><MdClass /></span>
                    <span>TYPE</span>
                    <b>{propertyy?.propertyType}</b>
                </div>

                <div>
                    <span style={{ color: "#fbbf24" }}><Calendar1Icon /></span>
                    <span>LISTED ON</span>
                    <b>{formattedDate}</b>
                </div>
            </section>
        </>
    )
}

export default PropertyDetails