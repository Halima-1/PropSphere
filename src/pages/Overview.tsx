import { ActivityIcon, CardSim, HourglassIcon, TagIcon } from "lucide-react"
import PropertyCard from "../components/PropertyCard"
import { useReadAllProperties } from "../hooks/useGetAllProperties"
import {  useAppKitAccount } from "@reown/appkit/react"
import "../styles/landing.scss"
import Sidebar from "../components/layout/SideBar"
import { useNavigate } from "react-router-dom"
import { useListProperty } from "../hooks/useListProperty"
import { useUnListProperty } from "../hooks/useUnlistProperty"
import { useDeleteProperty } from "../hooks/useDeleteProperty"
const Overview = () => {
    const {address} = useAppKitAccount()
  const properties = useReadAllProperties()
  const navigate = useNavigate()
    const myListings =properties.filter((item:any) => item.propertyOwner === address)
    const listProperty =useListProperty()
            const unlistProperty =useUnListProperty()
            const deleteProperty = useDeleteProperty()
            const activeListing =properties.filter((item:any) => item.soldOut == false)
    
    // const renderView = () => {
    // switch (dashboardView) {
    //   case "overview":
    //     return  <Overview />
    //   case "create":
    //     return <CreateProperty
    //     onClose={() => setDashboardView("overview")} 
    //     />
    //   default:
    //     return <Overview />
    // }
//   }

return (
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
 <section className="Overview">
            
            <div className="intro">

                <div>
                    <h1>My dashboard</h1>
                    <p>Manage your digital real portfolio accross the metaverse</p>
                </div>
                <span>{address?.slice(0,15)}...</span>
            </div>
            <div className="list">
                <div className="list-item">
                    <span>My listed properties</span>
                    <div>
                        <b>{myListings.length}</b>
                        <span><CardSim size={14}/></span>
                    </div>
                </div>
                <div className="list-item">
                    <span>My sold properties</span>
                    <div>
                         <b>2</b>

                        <span><TagIcon size={14}/></span>

                    </div>
                </div>
                <div className="list-item">
                    <span>Total earnings</span>
                    <div>
                        <b>2</b>
                        <span><HourglassIcon size={14}/></span>
                    </div>

                </div>
                <div className="list-item">
                    <span>Active listings</span>
 <div>
                        <b>{activeListing.length}</b>
                        <span><ActivityIcon size={14}/></span>
                    </div>
                </div>
            </div>

            <div className="overview-list">
                <div className="list-nav">
                    <b className="my">My listing</b>
                    <b>My sales</b>
                </div>
                <span></span>
            </div>
            <div className="f-listings">
                {properties.length === 0? (<p>You have no property yet</p>):
                properties.map((item:any) =>(
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
    )

    return (<>
       
    </>)
}

export default Overview