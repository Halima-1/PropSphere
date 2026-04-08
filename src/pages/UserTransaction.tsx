import { useNavigate } from "react-router-dom"
import Sidebar from "../components/layout/SideBar"

const UserTransaction = () => {
  const navigate = useNavigate()


    return (<>
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
                <section className="UserTransaction">
                    <div>
                        Transaction
                    </div>
                </section>
            </div>
        </section>

    </>)
}

export default UserTransaction