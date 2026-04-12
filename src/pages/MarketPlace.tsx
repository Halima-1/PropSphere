import { Search } from "lucide-react"
import PropertyCard from "../components/PropertyCard"
import { useReadAllProperties } from "../hooks/useGetAllProperties"
import "../styles/marketPlace.scss"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const MarketPlace = () => {
    const navigate = useNavigate()
    const allProperties = useReadAllProperties()
    const listedProperties = allProperties.filter((prop:any) => prop.isPropertyListed === true)

    // Local state for searching, sorting, and filtering
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] = useState("newest")
    const [categoryFilter, setCategoryFilter] = useState("All properties")

    const filteredAndSortedProperties = listedProperties
        .filter((prop: any) => {
            const query = searchQuery.toLowerCase()
            const matchSearch = 
                (prop.title && prop.title.toLowerCase().includes(query)) ||
                (prop.location && prop.location.toLowerCase().includes(query))
            
            const matchCategory = 
                categoryFilter === "All properties" || 
                prop.propertyCategory === categoryFilter ||
                (categoryFilter === "Electrical device" && prop.propertyCategory === "ElectricalDevice") ||
                (categoryFilter === "Clothe" && prop.propertyCategory === "Clothe")

            return matchSearch && matchCategory
        })
        .sort((a: any, b: any) => {
            // Priority 3: Sort Order (Newest = highest ID first)
            const idA = Number(a.id) || 0;
            const idB = Number(b.id) || 0;
            
            if (sortOrder === "newest") {
                return idB - idA;
            } else if (sortOrder === "oldest") {
                return idA - idB;
            }
            return 0; 
        });

    return (
        <>
            <section className="market-place">
                <div className="mp-intro">
                    <div className="mp-intro1">
                        <h1>Market Place</h1>
                        <span>{listedProperties.length} listings</span>
                    </div>
                    <p>Discover property listed for sale on-chain. Verified real estate assets powered by Lisk Sepolia</p>
                </div>
                
                <div className="search-bar">
                    <div className="search">
                        <span><Search /></span>
                        <input 
                            type="text" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            placeholder="Search by title or location..." 
                        />
                    </div>

                   <div className="select">
                     <select name="filter" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </select>

                    <select name="category" id="category" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                        <option value="All properties">All properties</option>
                        <option value="Land">Land</option>
                        <option value="House">House</option>
                        <option value="Vehicle">Vehicle</option>
                        <option value="Jewelry">Jewelry</option>
                        <option value="Clothe">Clothe</option>
                        <option value="Electrical device">Electrical device</option>
                    </select>

                   </div>
                    <p className="count">Showing {filteredAndSortedProperties.length} of {listedProperties.length} properties</p>
                </div>

                <section className="prop-listing f-listings">
                   {filteredAndSortedProperties.length === 0 ? 
                   (
                     <p style={{ gridColumn: "1 / -1", textAlign: "center", width: "100%", padding: "20px" }}>
                       No properties match your current search and filter criteria.
                     </p>
                   ) :
                   filteredAndSortedProperties.map((item:any) =>(
                     <PropertyCard
                       key={item.id}
                       {...item}
                     >
                        <button onClick={() => navigate(`/market-place/${item.id}`)}>
                            View details
                        </button>
                     </PropertyCard>
                   ))
                }
                </section>
            </section>
        </>
    )
}

export default MarketPlace