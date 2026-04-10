// import { useAppKitAccount } from "@reown/appkit/react"
import { ArrowLeftRightIcon, HousePlug, MenuSquare, Settings } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
export type SidebarProps = {
  activeView: string
  onNavigate: (view: string) => void
style?: React.CSSProperties   // inline styles

}
const Sidebar = () => {
  const path = window.location.pathname
const navigate = useNavigate()
    return (<>
        <aside className="sideBar">
            
            <div className="user-details user">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1VAa-SGNQjJvwBs2oasQVuOZ5KetZb1hUQ&s" alt="User avartar" />
                <div>
                    {/* <b>{address}</b> */}
                    <span>Tier 1</span>
                </div>
            </div>

            <div 
              className={`user-details ${path === "/dashboard/overview" ? "active" : ""}`}
              onClick={() => navigate(`/dashboard/overview`)}>
                <span><MenuSquare /></span>
                <span>Overview</span>
            </div>
            <div 
              className={`user-details ${path === "/dashboard/properties" ? "active" : ""}`}
              onClick={() => navigate(`/dashboard/properties`)}>
                <span><HousePlug /></span>
                <span>Properties</span>
            </div>
            <div 
              className={`user-details ${path === "/dashboard/transaction" ? "active" : ""}`}
              onClick={() => navigate(`/dashboard/transaction`)}>
                <span><ArrowLeftRightIcon /></span>
                <span>Transaction</span>
            </div> 
            <div 
              className={`user-details ${path === "/dashboard/settings" ? "active" : ""}`}
              onClick={() => navigate(`/dashboard/settings`)}>
                <span><Settings /></span>
                <span>Settings</span>
            </div> 
              </aside>
    </>)
}

export default Sidebar