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
            
            <div id="user-details" className="user">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1VAa-SGNQjJvwBs2oasQVuOZ5KetZb1hUQ&s" alt="User avartar" />
                <div>
                    {/* <b>{address}</b> */}
                    <span>Tier 1</span>
                </div>
            </div>

            <div id="user-details"
            //  className={activeView === "overview" ? "active" : ""}
             style ={path === "/Dashboard/overview" ? {padding: "7px 10px", backgroundColor:"#60697c33", borderLeft:"3px solid #fbbf24", borderRadius:"0 20px 20px 0"}:null}
          onClick={() => {
            navigate(`/Dashboard/overview`)
          }
          
          }>
            <span>                <MenuSquare />
</span>
                <span>Overview</span>
            </div>
            <div id="user-details"
          //   className={activeView === "properties" ? "active" : ""}
             style ={path === "/Dashboard/properties" ? {padding: "7px 10px", backgroundColor:"#60697c33", borderLeft:"3px solid #fbbf24", borderRadius:"0 20px 20px 0"}:null}
          onClick={() => {
            navigate(`/Dashboard/properties`)
          }}
>
    <span>                <HousePlug />
</span>
                <span>Properties</span>
            </div>
            <div id="user-details"
              // className={activeView === "transactions" ? "active" : ""}
              //         style ={activeView === "transactions" ? {padding: "7px 10px", backgroundColor:"#60697c33", borderLeft:"3px solid #fbbf24", borderRadius:"0 20px 20px 0"}:null}

             style ={path === "/Dashboard/transaction" ? {padding: "7px 10px", backgroundColor:"#60697c33", borderLeft:"3px solid #fbbf24", borderRadius:"0 20px 20px 0"}:null}
          onClick={() => {
            navigate(`/Dashboard/transaction`)
          }}>
                            <span><ArrowLeftRightIcon /></span>
                <span>Transaction</span>
            </div> 
            <div id="user-details"
            //   className={activeView === "settings" ? "active" : ""}
            // style ={activeView === "settings" ? {padding: "7px 10px", backgroundColor:"#60697c33", borderLeft:"3px solid #fbbf24", borderRadius:"0 20px 20px 0"}:null}
             style ={path === "/Dashboard/settings" ? {padding: "7px 10px", backgroundColor:"#60697c33", borderLeft:"3px solid #fbbf24", borderRadius:"0 20px 20px 0"}:null}
          onClick={() => {
            navigate(`/Dashboard/settings`)
          }}>            <span>                <Settings    />
</span>
                <span>Settings</span>
            </div> 
              </aside>
    </>)
}

export default Sidebar