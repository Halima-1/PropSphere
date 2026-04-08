import { useAppKitAccount } from "@reown/appkit/react"
import { useReadAllProperties } from "../hooks/useGetAllProperties"
import PropertyCard from ".././components/PropertyCard"
import { useListProperty } from "../hooks/useListProperty"
import { useUnListProperty } from "../hooks/useUnlistProperty"
import { useDeleteProperty } from "../hooks/useDeleteProperty"
import Sidebar from "../components/layout/SideBar"
import { useNavigate } from "react-router-dom"
// import { Sidebar } from "lucide-react"
const UserProperties= () =>{
    const {address} = useAppKitAccount()
    const listProperty =useListProperty()
        const unlistProperty =useUnListProperty()
        const deleteProperty = useDeleteProperty()
  const navigate = useNavigate()


  const properties = useReadAllProperties()

    const myListings =properties.filter((item:any) => item.propertyOwner === address)
    return(<>
    <section className="dbContainer">
       
        <Sidebar
        // activeView={dashboardView}
        // onNavigate={setDashboardView}
        />

      <div className="db">
             <div className="db-btn"
             >
              <p></p>
              <button 
                           className="ml-button"

 onClick={() => {
            navigate(`/Dashboard/create-property`)
          }}
                >+ List new property</button>
             </div>
    <section className="user-prop Overview">
        <div className="intro overview-list">

                <div>
                    <h1>My properties</h1>
                    <p>Manage your real estate and monitor their status on-chain</p>
                </div>
                <span>{address?.slice(0,15)}...</span>

            </div>
 {/* {showCreateForm && (
        <CreateProperty 
                    style={showCreateForm? {display:"none"}: {display:"block"}}
        onClose={() => setShowCreateForm(false)} />
      )} */}
            <div className="f-listings">
                {myListings.length === 0? (<p>You have no listed items yet</p>):
                myListings.map((item:any) =>(
                    
                <PropertyCard
                 key={item.id}
                    // property={property}
                {...item}
                >
                    <div className="propCard-btn">
                        <button onClick={item.isPropertyListed?()=>unlistProperty(item.id) : ()=>listProperty(item.id) }>{item.isPropertyListed? "Unlist" : "List"}</button>
                    <button onClick={()=>deleteProperty(item.id)}>Delete</button>
                    </div>

                </PropertyCard>
                ))
                }
            </div>
    </section>
                 </div>
    </section>

    </>)
}

export default UserProperties