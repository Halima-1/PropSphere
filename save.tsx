// import CreateProperty from "../components/CreateProperty"
// import "../styles/dashboard.scss"
// // import { useCreateProperty } from "../hooks/useCreateProperty"
// import Overview from "../pages/Overview"
// import UserProperties from "../pages/UserProperties"
// import UserTransaction from "../components/UserTransaction"
// // import Sidebar, { type SidebarProps } from "../components/layout/SideBar"
// import { useState } from "react"
// import Settings from "../pages/Settings"
// import Sidebar from "../components/layout/SideBar"

// const Dashboard= () =>{const [dashboardView, setDashboardView] =useState("overview");
    
// const renderView = () => {
//     switch (dashboardView) {
//       case "overview":
//         return  <Overview />
        
//       case "properties":
//         return <UserProperties />
//       case "transactions":
//         return <UserTransaction />
//          case "settings":
//         return <Settings />
//       case "create":
//         return <CreateProperty
//         onClose={() => setDashboardView("overview")} 
//         />
//       default:
//         return <Overview />
//     }
//   }

// return (
//         <section className="dbContainer">
       
//         <Sidebar
//         activeView={dashboardView}
//         onNavigate={setDashboardView}
//         />

//       <div className="db">
//              <div className="db-btn"
//               style ={dashboardView === "create" ? {display:"none"}: null}
//              >
//               <span></span>
//               <button 
//                            className="ml-button"

//           onClick={() => setDashboardView("create")}

//                 >+ List new property</button>
//              </div>
//                         {renderView()}


//             </div>

//         </section>
//     )
// }

// export default Dashboard