import { Search } from "lucide-react"
import PropertyCard from "../components/PropertyCard"
import { useReadAllProperties } from "../hooks/useGetAllProperties"
import "../styles/marketPlace.scss"

const MarketPlace = () => {
    const allProperties = useReadAllProperties()
    const listedProperties =allProperties.filter((prop:any) => prop.isPropertyListed === true)
    return (
        <>
            <section className="market-place">
                <div className="mp-intro">
                    <div>
                        <h1>Market Place</h1>
                        <span>{ }10 listings</span>
                    </div>
                    <p>Discover property listed for sale on-chain. Verified real estate assets powered by Lisk Sepolia</p>
                </div>
                <div className="search-bar">
                    <div className="search">
                        <span>                        <Search />
</span>
                        <input type="text" value={""} placeholder="Search by title or location..." />
                    </div>
                    {/* <input type="text" /> */}
                    <select name="filter" id="">
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                        <option value=""></option>
                    </select>
                    <select name="category" id="category">
                        <option value="0">All properties</option>
                        <option value="1">Land</option>
                        <option value="2">House</option>
                        <option value="3">Vehicle</option>
                        <option value="4">Jewelry</option>
                        <option value="5">Electrical device</option>
                    </select>

                    <p className="count">Showing {} of {} properties</p>
                </div>
                <section className="prop-listing f-listings">
                   {listedProperties.length === 0? 
                   (<p>No property has been listed</p>):
                   listedProperties.map((item:any) =>(
                     <PropertyCard
                     key={item.id}
                    {...item}>
                        <button>Buy property</button>
                        </PropertyCard>
                   ))
                }
                </section>

            </section>
        </>
    )
}

export default MarketPlace