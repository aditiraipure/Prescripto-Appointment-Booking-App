import AdminApp from "../../../Admin/src/App.jsx";
import AdminContextProvider from "../../../Admin/src/context/AdminContext.jsx";
import DoctorContextProvider from "../../../Admin/src/context/DoctorContext.jsx";
import AdminAppContextProvider from "../../../Admin/src/context/AppContext.jsx";

const AdminPortal = () => (
  <AdminContextProvider>
    <DoctorContextProvider>
      <AdminAppContextProvider>
        <AdminApp />
      </AdminAppContextProvider>
    </DoctorContextProvider>
  </AdminContextProvider>
);

export default AdminPortal;
