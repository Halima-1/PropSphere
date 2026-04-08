import CreateProperty from "../components/CreateProperty"
import Sidebar from "../components/layout/SideBar"

const AddNewProperty = () => {


    return (<>
        <section className="dbContainer">

            <Sidebar
            // activeView={dashboardView}
            // onNavigate={setDashboardView}
            />

            <div className="db">
              
                <section className="UserTransaction">
                   <CreateProperty/>
                </section>
            </div>
        </section>

    </>)
}

export default AddNewProperty